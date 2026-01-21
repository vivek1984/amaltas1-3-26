<?php

namespace App\Http\Controllers;

use App\Models\Ccart;
use App\Models\Cluster;
use App\Models\Design;
use App\Models\Location;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Size;
use App\Models\User;
use App\Models\Varient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Cashfree\Cashfree; // Correct: This is the main SDK class



class CheckoutController extends Controller
{

    /**
     * Display the checkout page.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function showCheckoutPage(Request $request)
    {
        // dd($request->all());
        Log::info('showCheckoutPage: Method called.');

        $userId = Auth::id();
        $user = null;
        $userAddresses = collect(); // Initialize as collection

        if ($userId) {
            $user = User::with('addresses')->find($userId);
            if ($user) {
                $userAddresses = $user->addresses;
                Log::info("showCheckoutPage: User {$userId} authenticated. Found " . $userAddresses->count() . " addresses.");
            } else {
                Log::warning("showCheckoutPage: Authenticated user {$userId} not found in database.");
            }
        } else {
            Log::info('showCheckoutPage: User not authenticated.');
        }

        // Fetch cart items from the database for the checkout page
        $cartItems = collect();
        if ($userId) {
            $cartItems = Ccart::where('user_id', $userId)->get();
        } else {
            $cartItems = Ccart::where('user_ip', $request->ip())->whereNull('user_id')->get();
        }

        $cartItems->load([
            'product:id,name,small_image',
            'varient:id,name',
            'design:id,name',
            'size:id,name'
        ]);

        Log::info("showCheckoutPage: Fetched " . $cartItems->count() . " cart items.");

        $clusters = Cluster::with(['groups'])->get();

        return Inertia::render('Cart/Checkout', [
            'itemData' => $cartItems,
            'clusters' => $clusters,
            'user' => $user,
            'userAddresses' => $userAddresses,
            'userLocation' => [
                'latitude' => $request->session()->get('user_latitude'),
                'longitude' => $request->session()->get('user_longitude'),
            ],
        ]);
    }

    /**
     * Private helper method to get the current cart items for the user/IP.
     * This method is generally used when we need to fetch the *current* state of the cart
     * from the Ccart table, not from a POST request payload.
     *
     * @param int|null $userId
     * @param string $userIp
     * @return \Illuminate\Support\Collection
     */
    private function getCurrentCartItems($userId, $userIp)
    {
        if ($userId) {
            return Ccart::where('user_id', $userId)->get();
        }
        return Ccart::where('user_ip', $userIp)->whereNull('user_id')->get();
    }

    /**
     * Handles the checkout form submission, creates the order, moves cart items to order items,
     * clears the cart, and then renders the payment confirmation page.
     * This method now receives all data directly from the frontend POST request.
     *
     * @param Request $request
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function showPaymentConfirmation(Request $request)
    {

        $possibleDeliveryLocations = $this->nearDehradun($request->city);
        $clusters = Cluster::with(['groups'])->get();
        if ($possibleDeliveryLocations) {


        Log::info('showPaymentConfirmation: Method called (direct POST from Checkout.jsx).');
        Log::debug('showPaymentConfirmation: Incoming request data:', $request->all());

        DB::beginTransaction();

        try {
            $userId = Auth::id();
            $userIp = $request->ip();
            $clusters = Cluster::with(['groups'])->get();

            // 1. Validate incoming request data (all data for order creation)
            $validatedData = $request->validate([

                'name' => 'required|string|max:255',
                'address_line1' => 'required|string|max:255',
                'address_line2' => 'nullable|string|max:255',
                'email' => 'string|max:255',
                'city' => 'required|string|max:255',
                'state' => 'required|string|max:255',
                'pincode' => 'required|string|digits:6',
                'mobile' => 'required|string|max:15',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
            ]);

            Log::debug('showPaymentConfirmation: Validated Data:', $validatedData);

            $preparedCartItems = Ccart::where('user_id', $userId)->get();
            $preparedTotalAmount = collect($preparedCartItems)->sum(function ($item) {
                return ($item['price'] * $item['quantity']) + $this->getShipping($item['varient_id']);
            });

            // 2. Store that data in Order and OrderItem tables
            $order = Order::create([
                'user_id' => $userId,
                'user_ip' => $userIp,
                'shipping_name' => $validatedData['name'],
                'shipping_address_line1' => $validatedData['address_line1'],
                'shipping_address_line2' => $validatedData['address_line2'],
                'shipping_city' => $validatedData['city'],
                'shipping_state' => $validatedData['state'],
                'shipping_pincode' => $validatedData['pincode'],
                'shipping_mobile' => $validatedData['mobile'],
                'latitude' => $validatedData['latitude'],
                'longitude' => $validatedData['longitude'],
                'total_amount' => $preparedTotalAmount,
                'status' => 'pending', // Initial status
            ]);

            Log::info("showPaymentConfirmation: New Order created with ID: {$order->id}");
            Log::debug("showPaymentConfirmation: Order details after creation:", $order->toArray());
            $shipping_cost = 0;
            $enrichedOrderItems = collect();
            foreach ($preparedCartItems as $itemData) {
                $product = Product::find($itemData['product_id']);
                $varient = isset($itemData['varient_id']) ? Varient::find($itemData['varient_id']) : null;
                $design = isset($itemData['design_id']) ? Design::find($itemData['design_id']) : null;
                $size = isset($itemData['size_id']) ? Size::find($itemData['size_id']) : null;
                $shipping_cost = $shipping_cost + $this->getShipping($itemData['varient_id']);

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $itemData['product_id'],
                    'varient_id' => $itemData['varient_id'] ?? null,
                    'design_id' => $itemData['design_id'] ?? null,
                    'size_id' => $itemData['size_id'] ?? null,
                    'quantity' => $itemData['quantity'],
                    'price' => $itemData['price'],
                    'mrp' => $itemData['mrp'],
                ]);

                $enrichedOrderItems->push([
                    'id' => uniqid(), // Temporary unique ID for React key
                    'product_id' => $itemData['product_id'],
                    'varient_id' => $itemData['varient_id'] ?? null,
                    'design_id' => $itemData['design_id'] ?? null,
                    'size_id' => $itemData['size_id'] ?? null,
                    'quantity' => $itemData['quantity'],
                    'price' => floatval($itemData['price']),
                    'mrp' => floatval($itemData['mrp']),
                    'product' => $product ? ['name' => $product->name, 'small_image' => $product->small_image] : null,
                    'varient' => $varient ? ['name' => $varient->name] : null,
                    'design' => $design ? ['name' => $design->name] : null,
                    'size' => $size ? ['name' => $size->name] : null,
                ]);
            }
            Log::info("showPaymentConfirmation: Created " . $enrichedOrderItems->count() . " order items.");

            // 3. Delete from Ccart (based on the current Ccart items, not the POSTed ones)
            // It's safer to delete the actual Ccart entries that were *just* moved to the order.
            // We can re-fetch them or rely on the fact that the POSTed cart_contents
            // should match the current Ccart for the user.
            // For robustness, let's fetch current cart items to ensure we delete exactly what's there.
            $currentCcartItems = $this->getCurrentCartItems($userId, $userIp);
            if ($userId) {
                Ccart::where('user_id', $userId)->delete();
                Log::info("showPaymentConfirmation: Cleared Ccart for user ID: {$userId} after order creation.");
            } else {
                Ccart::where('user_ip', $userIp)->whereNull('user_id')->delete();
                Log::info("showPaymentConfirmation: Cleared guest Ccart for IP: {$userIp} after order creation.");
            }


            DB::commit();

            Log::info("showPaymentConfirmation: Order {$order->id} created successfully for user: {$userId} (IP: {$userIp}). Rendering PaymentConfirmation page.");
            $this->updateUserInformation($userId, $validatedData);

            // 4. Render Cart/PaymentConfirmation.jsx, passing data directly from the created Order
            return Inertia::render('Cart/PaymentConfirmation', [
                'clusters' => $clusters,
                'cartItems' => $enrichedOrderItems, // These are the items derived from the POSTed cart_contents
                'totalAmount' => floatval($order->total_amount),
                'shippingDetails' => [
                    'name' => $order->shipping_name,
                    'address_line1' => $order->shipping_address_line1,
                    'address_line2' => $order->shipping_address_line2,
                    'city' => $order->shipping_city,
                    'state' => $order->shipping_state,
                    'pincode' => $order->shipping_pincode,
                    'mobile' => $order->shipping_mobile,
                ],
                'userLocation' => [
                    'dehradun' => 'dehradun',
                    'shipping_fee' => $shipping_cost,
                ],
                'orderId' => $order->id, // Pass the new order ID to the frontend
            ]);

        } catch (ValidationException $e) {
            DB::rollBack();
            Log::warning('showPaymentConfirmation: Validation failed during order creation: ' . json_encode($e->errors()));
            // Return validation errors back to the checkout form
            return redirect()->back()->withErrors($e->errors())->withInput($request->all());
        }
        catch (\Exception $e) {
            DB::rollBack();
            Log::error('showPaymentConfirmation: Error creating order and showing payment confirmation: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all(),
            ]);
            return redirect()->route('cart.index')->with('error', 'An error occurred while processing your order. Please try again.');
        }
        } //end if

        else {

            $cart = Ccart::where('user_id', Auth::id())->first();
            $product = Product::where('id', $cart->product_id)->first();

            return Inertia::render('Cart/OutsideDoon', [
                'clusters' => $clusters,
                'slug' => $product->slug
            ]);
        }
    }

    public function nearDehradun($location)
    {
    if (!$location || empty($location->city)) {
        return false;
    }

    $city = strtolower(trim($location->city));

    // Correct spellings
    $valid = ['dehradun', 'dehra dun', 'doon'];

    // Check exact match
    if (in_array($city, $valid)) {
        return true;
    }

    // Fuzzy match (80% similarity or >= 2 letter difference allowed)
    foreach ($valid as $v) {
        similar_text($city, $v, $percent);
        if ($percent >= 75) {   // you can adjust 75
            return true;
        }
    }

    // Levenshtein distance (allows 1-3 spelling mistakes)
    foreach ($valid as $v) {
        if (levenshtein($city, $v) <= 3) {
            return true;
        }
    }

    return false;
    }



    private function getShipping($varient_id) {
        $varient = Varient::findOrFail($varient_id);
        return $varient->shipping_fee;
    }
    private function dehradun($location) {
        if($location->dehradun == 'yes') return true;
        else {


        $user_id = Auth::id();
        $items = Ccart::where('user_id', $user_id)->get();
        foreach($items as $item) {
            $product = Product::find($item->product_id);
            if($product->shippable == 0) return false;
        }
         return true;
    }

    }


    private function updateUserInformation($userId, $data) {
        $user = User::find($userId);
        $address = $user->addresses()->first();
        if($address) {
            $address->address_line1 = $data['address_line1'];
            $address->address_line2 = $data['address_line2'];
            $address->city = $data['city'];
            $address->state = $data['state'];
            $address->save();
        }
        else {
            $user->addresses()->create([
                'address_line1' => $data['address_line1'],
                'address_line2' => $data['address_line2'],
                'city' => $data['city'],
                'state' => $data['state'],
            ]);
        }

        $user->mobile = $data['mobile'];
        $user->name = $data['name'];
        $user->pincode = $data['pincode'];
        $user->save();


    }

    /**
     * Generates RazorPay order details for an existing order based on payment type.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    /**
     * Verifies the RazorPay payment signature.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */


    public function getCashfreeDetailsForOrder(Request $request)
    {
        Log::info('getCashfreeDetailsForOrder: Incoming request data:', $request->all());

        if (!Auth::check()) {
            Log::warning('getCashfreeDetailsForOrder: Unauthenticated user attempted to get Cashfree details.');
            return response()->json(['message' => 'Unauthorized. Please log in.'], 401);
        }

        $userId = Auth::id();
        $user = Auth::user();

        try {
            $validatedData = $request->validate([
                'order_id' => 'required|integer|exists:orders,id',
                'payment_type' => 'required|string|in:full,partial_cod',
                'amount_to_pay' => 'nullable|numeric|min:0',
            ]);

            Log::debug('getCashfreeDetailsForOrder: Validated Data:', $validatedData);

            $order = Order::where('user_id', $userId)->find($validatedData['order_id']);

            if (!$order) {
                Log::warning("getCashfreeDetailsForOrder: Order {$validatedData['order_id']} not found or does not belong to user {$userId}.");
                return response()->json(['message' => 'Order not found or access denied.'], 404);
            }

            $finalAmount = 0;
            $paymentDescription = '';

            if ($validatedData['payment_type'] === 'full') {
                $finalAmount = $order->total_amount;
                $paymentDescription = 'Full payment for Order #' . $order->id;
            } elseif ($validatedData['payment_type'] === 'partial_cod') {
                $finalAmount = $validatedData['amount_to_pay'];
                $paymentDescription = 'Partial COD payment for Order #' . $order->id;

                $expectedPartialAmount = round(($order->total_amount * 0.10) / 1000) * 1000;
                if (abs($finalAmount - $expectedPartialAmount) > 1) {
                    Log::warning("getCashfreeDetailsForOrder: Frontend sent partial amount {$finalAmount} which deviates significantly from expected {$expectedPartialAmount} for Order {$order->id}. Using backend calculated amount.");
                    $finalAmount = $expectedPartialAmount;
                }

                if ($finalAmount <= 0) {
                    Log::warning("getCashfreeDetailsForOrder: Calculated partial COD amount is zero or negative for Order {$order->id}.");
                    return response()->json(['message' => 'Invalid payment amount for Partial COD.'], 400);
                }
            }

            $cashfreeAmount = number_format($finalAmount, 2, '.', '');

            $cashfreeApi = new Cashfree(
                env('CASHFREE_API_ENDPOINT'),
                env('CASHFREE_APP_ID'),
                env('CASHFREE_SECRET_KEY'),
                '', // XPartnerApiKey
                '', // XPartnerMerchantId
                '', // XClientSignature
                false // XEnableErrorAnalytics
            );

            $cf_order_id = 'ORDER_' . $order->id . '_' . strtoupper($validatedData['payment_type']) . '_' . uniqid();

            // Generate expiry time with a longer duration and log it for debugging
            $expiryTime = gmdate('Y-m-d\TH:i:s\Z', strtotime('+60 minutes'));
            Log::info("Cashfree order_expiry_time being sent: " . $expiryTime);

            // --- FIX START: Append Cashfree's order_id to return_url and notify_url ---
            $returnUrl = route('checkout.verify-cashfree-payment') . '?order_id=' . $order->id . '&payment_type=' . $validatedData['payment_type'] . '&cf_order_id=' . $cf_order_id;
            $notifyUrl = route('checkout.verify-cashfree-payment') . '?order_id=' . $order->id . '&payment_type=' . $validatedData['payment_type'] . '&cf_order_id=' . $cf_order_id;
            // --- FIX END ---

            $createOrderRequest = [
                "order_id" => $cf_order_id,
                "order_amount" => $cashfreeAmount,
                "order_currency" => "INR",
                "customer_details" => [
                    "customer_id" => 'user_' . (string)$userId, // Ensures alphanumeric and unique
                    "customer_phone" => $order->shipping_mobile,
                    "customer_name" => $order->shipping_name,
                    "customer_email" => $user->email ?? 'guest@example.com',
                ],
                "order_meta" => [
                    "return_url" => $returnUrl, // Use the updated URL
                    "notify_url" => $notifyUrl, // Use the updated URL
                ],
                "order_expiry_time" => $expiryTime,
                "order_note" => "Payment for Order #" . $order->id,
                "order_tags" => [
                    "internal_order_id" => (string)$order->id,
                    "payment_type" => $validatedData['payment_type'],
                    "full_order_amount" => (string)floatval($order->total_amount),
                    "amount_paid_now" => (string)floatval($finalAmount),
                ],
            ];
            // --- END CORRECTED PAYLOAD ---

            Log::debug('getCashfreeDetailsForOrder: Cashfree Order Create Payload (Final Attempt):', $createOrderRequest);
            $apiResponse = $cashfreeApi->PGCreateOrder($createOrderRequest);
            $result = $apiResponse[0]; // Access the OrderEntity object;

            if ($result && $result->getPaymentSessionId()) {
                Log::info("getCashfreeDetailsForOrder: Cashfree order created: {$cf_order_id}, Payment Session ID: {$result->getPaymentSessionId()}");
                return response()->json([
                    'message' => 'Cashfree details generated successfully.',
                    'cashfreeDetails' => [
                        'payment_session_id' => $result->getPaymentSessionId(),
                        'order_id' => $cf_order_id, // This is Cashfree's order_id
                        'amount' => $cashfreeAmount,
                        'currency' => 'INR',
                        'name' => config('app.name'),
                        'description' => $paymentDescription,
                        'customer_name' => $order->shipping_name,
                        'customer_email' => $user->email ?? 'guest@example.com',
                        'customer_phone' => $order->shipping_mobile,
                        'local_order_id' => $order->id, // Your internal order_id
                    ],
                ], 200);
            } else {
                Log::error('getCashfreeDetailsForOrder: Failed to get payment_session_id from Cashfree API. (API error or invalid response)', ['result' => $result]);
                return response()->json(['message' => 'Failed to generate Cashfree payment details. Please try again. (API error)'], 500);
            }

        } catch (ValidationException $e) {
            Log::warning('getCashfreeDetailsForOrder: Cashfree details generation validation failed: ' . json_encode($e->errors()));
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('getCashfreeDetailsForOrder: Error generating Cashfree details: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all(),
            ]);
            return response()->json([
                'message' => 'An unexpected error occurred while generating Cashfree payment details.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function verifyCashfreePayment(Request $request)
    {
        // --- START ENHANCED DEBUGGING ---
        Log::info('verifyCashfreePayment: Incoming Cashfree verification request data (ALL):', $request->all());
        Log::info('verifyCashfreePayment: Incoming Cashfree verification request query params:', $request->query());
        Log::info('verifyCashfreePayment: Incoming Cashfree verification request input (POST/GET):', $request->input());
        // --- END ENHANCED DEBUGGING ---

        $localOrderId = $request->query('order_id') ?? $request->input('order_id');
        // Cashfree typically sends its own order ID as 'orderId' or 'cf_order_id'
        // Let's prioritize 'orderId' from input, then 'cf_order_id' if available.
        $cashfreeOrderId = $request->input('orderId') ?? $request->input('cf_order_id'); // This should now pick up from query string
        $cashfreePaymentId = $request->input('paymentId') ?? $request->input('cf_payment_id');
        $paymentStatus = $request->input('txStatus'); // Transaction status from Cashfree

        Log::info("verifyCashfreePayment: Extracted variables - localOrderId: {$localOrderId}, cashfreeOrderId: {$cashfreeOrderId}, cashfreePaymentId: {$cashfreePaymentId}, paymentStatus: {$paymentStatus}");


        if (!$localOrderId) {
            Log::error('verifyCashfreePayment: No local order_id found in Cashfree callback.');
            return redirect()->route('cart.index')->with('error', 'Payment verification failed: Missing order ID.');
        }

        // Ensure we have Cashfree's order ID to verify
        if (!$cashfreeOrderId) {
            Log::error('verifyCashfreePayment: No Cashfree order ID found in callback for local order: ' . $localOrderId);
            return redirect()->route('cart.index')->with('error', 'Payment verification failed: Missing Cashfree transaction ID.');
        }


        DB::beginTransaction();
        try {
            $order = Order::find($localOrderId);

            if (!$order) {
                Log::warning("verifyCashfreePayment: Local Order {$localOrderId} not found during Cashfree verification.");
                throw new \Exception('Order not found for Cashfree payment verification.');
            }

            $cashfreeApi = new Cashfree(
                env('CASHFREE_API_ENDPOINT'),
                env('CASHFREE_APP_ID'),
                env('CASHFREE_SECRET_KEY'),
                '', // XPartnerApiKey
                '', // XPartnerMerchantId
                '', // XClientSignature
                false // XEnableErrorAnalytics
            );

            // Call Cashfree API to verify the order status
            Log::info("verifyCashfreePayment: Calling Cashfree PGFetchOrder for Cashfree Order ID: {$cashfreeOrderId}");
            // --- FIX START: Changed getOrderDetails to PGFetchOrder based on provided SDK code ---
            $apiResponse = $cashfreeApi->PGFetchOrder($cashfreeOrderId);
            // --- FIX END ---
            $cfResponse = $apiResponse[0]; // Access the response object from the array


            Log::debug('verifyCashfreePayment: Cashfree API response for order verification:', (array) $cfResponse);

            if ($cfResponse && $cfResponse->getOrderStatus() === 'PAID') {
                $order->status = 'paid';
                $order->cashfree_order_id = $cashfreeOrderId;
                $order->cashfree_payment_id = $cashfreePaymentId; // Store payment ID if available
                $order->payment_status = 'paid';
                $order->save();

                DB::commit();
                Log::info("verifyCashfreePayment: Cashfree payment verified and order updated for Order ID: {$order->id}, Cashfree Order ID: {$cashfreeOrderId}");

                return redirect()->route('dashboard')->with('success', 'Payment successful and order confirmed!');

            } else {
                // If status is not PAID, or response is invalid
                $order->status = 'failed'; // Default to failed if not PAID
                $order->cashfree_order_id = $cashfreeOrderId; // Still store the Cashfree ID for debugging
                $order->cashfree_payment_id = $cashfreePaymentId; // Store payment ID if available
                $order->save();
                DB::commit();

                $statusFromCfResponse = $cfResponse ? $cfResponse->getOrderStatus() : 'UNKNOWN_STATUS_NO_RESPONSE';
                Log::warning("verifyCashfreePayment: Cashfree payment verification failed or status not PAID for Order ID: {$order->id}. Status from Cashfree: {$statusFromCfResponse}");
                return redirect()->route('cart.index')->with('error', 'Payment failed or pending. Please check your order status.');
            }

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('verifyCashfreePayment: Error verifying Cashfree payment: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all(),
            ]);
            return redirect()->route('cart.index')->with('error', 'An unexpected error occurred during Cashfree payment verification. Please try again.');
        }
    }

}
