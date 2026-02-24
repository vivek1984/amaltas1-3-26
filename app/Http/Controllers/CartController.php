<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Pincode;
use Illuminate\Http\Request;
use App\Models\Ccart; // Assuming your Ccart model is in App\Models
use App\Models\Cluster; // Assuming Cluster model is in App\Models
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;   // For database transactions
use Illuminate\Support\Facades\Log;  // For logging
use Inertia\Inertia; // Import Inertia facade

class CartController extends Controller
{
    /**
     * Display the user's cart.
     * Fetches cart items from the database based on user ID or IP
     * and passes them to the Inertia frontend.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Inertia\Response
     */
    public function index(Request $request)
    {

        $userId = Auth::id();
        $userIp = $request->ip();
        $clusters = Cluster::with(['groups'])->get(); // Fetch cluster data

        $cartItems = collect(); // Initialize an empty collection

        if ($userId) {
            // Fetch cart items for authenticated user
            $cartItems = Ccart::where('user_id', $userId)->get();
            Log::info("Fetched cart for user ID: {$userId}");
        } else {
            // Fetch cart items for guest user based on IP
            $cartItems = Ccart::where('user_ip', $userIp)->whereNull('user_id')->get();
            Log::info("Fetched guest cart for IP: {$userIp}");
        }

        // Eager load relationships for product, varient, design, and size,
        // specifically selecting only the 'id' and 'name' columns for each.
        $cartItems->load([
            'product:id,name,small_image',
            'varient:id,name',
            'design:id,name',
            'size:id,name'
        ]);

        // Return as JSON for API requests (e.g., fetch calls from JavaScript),
        // or return an Inertia response for page loads/navigations.
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Cart contents retrieved successfully.',
                'cart_items' => $cartItems,
                'clusters' => $clusters
            ], 200);
        } else {
            // Return an Inertia response for a full page load or Inertia navigation
            return Inertia::render('Cart/CartPage', [
                'itemData' => $cartItems,
                'clusters' => $clusters
            ]);
        }
    }

    public function indexJson(Request $request)
    {
        $userId = Auth::id();
        $userIp = $request->ip();
        $clusters = Cluster::with(['groups'])->get(); // Fetch cluster data

        $cartItems = collect(); // Initialize an empty collection

        if ($userId) {
            // Fetch cart items for authenticated user
            $cartItems = Ccart::where('user_id', $userId)->get();
            Log::info("Fetched cart for user ID: {$userId}");
        } else {
            // Fetch cart items for guest user based on IP
            $cartItems = Ccart::where('user_ip', $userIp)->whereNull('user_id')->get();
            Log::info("Fetched guest cart for IP: {$userIp}");
        }

        // Eager load relationships for product, varient, design, and size,
        // specifically selecting only the 'id' and 'name' columns for each.
        $cartItems->load([
            'product:id,name,small_image',
            'varient:id,name',
            'design:id,name',
            'size:id,name'
        ]);

        // Return as JSON for API requests (e.g., fetch calls from JavaScript),
        // or return an Inertia response for page loads/navigations.

            return response()->json([
                'message' => 'Cart contents retrieved successfully.',
                'cart_items' => $cartItems,
                'clusters' => $clusters
            ], 200);

    }

    /**
     * Private helper method to get the current cart items for the user/IP.
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
     * Private helper method to synchronize the cart in the database
     * with a given array of cart items. This replaces the entire cart.
     *
     * @param int|null $userId
     * @param string $userIp
     * @param array $cartItemsData
     * @return array The newly persisted cart items.
     */
    private function syncCart($userId, $userIp, array $cartItemsData)
    {

        // Clear existing cart items for the current user/IP
        if ($userId) {
            Ccart::where('user_id', $userId)->delete();
            Log::info("Cleared existing cart for user ID: {$userId} for sync.");
        } else {
            Ccart::where('user_ip', $userIp)->whereNull('user_id')->delete();
            Log::info("Cleared existing guest cart for IP: {$userIp} for sync.");
        }

        $persistedCartItems = [];
        foreach ($cartItemsData as $itemData) {
            $newCartItem = Ccart::create([
                'user_id' => $userId,
                'user_ip' => $userIp,
                'product_id' => $itemData['product_id'],
                'varient_id' => $itemData['varient_id'] ?? null,
                'design_id' => $itemData['design_id'] ?? null,
                'size_id' => $itemData['size_id'] ?? null,
                'quantity' => $itemData['quantity'],
                'price' => $itemData['price'],
                'mrp' => $itemData['mrp'],
            ]);
            $persistedCartItems[] = $newCartItem;
        }
        return $persistedCartItems;
    }

    /**
     * Validates common cart item fields.
     *
     * @param string $prefix
     * @return array
     */
    private function getCartItemValidationRules(string $prefix = '')
    {
        return [
            $prefix . 'product_id' => 'required|integer|exists:products,id',
            $prefix . 'varient_id' => 'nullable|integer|exists:varients,id',
            $prefix . 'design_id' => 'nullable|integer|exists:designs,id',
            $prefix . 'size_id' => 'nullable|integer|exists:sizes,id',
            $prefix . 'quantity' => 'required|integer|min:1',
            $prefix . 'price' => 'required|numeric|min:0',
            $prefix . 'mrp' => 'required|numeric|min:0',
        ];
    }

    /**
     * Saves the current state of the cart from the frontend to the database.
     * This method clears existing cart entries for the user/IP and then
     * creates new entries based on the provided cart_contents.
     * This is the primary method for full cart synchronization.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveCart(Request $request) {
        // We can safely remove the call to deleteCartAssociatedWithCurrentIp here
        // as the transaction below will handle the clearing of the current user's/IP's cart.

        // Start a database transaction to ensure that all operations (delete and create)
        // are treated as a single atomic unit. If any part fails, everything is rolled back.
        DB::beginTransaction();

        try {
            // Get the authenticated user's ID. If no user is logged in, this will be null.
            $userId = Auth::id();
            // Get the user's IP address. This is used for identifying guest carts.
            $userIp = $request->ip();

            // Validate the incoming request data.
            $request->validate([
                'cart_contents' => 'required|array',
                'cart_contents.*.productId' => 'required|integer|exists:products,id',
                'cart_contents.*.varientId' => 'nullable|integer|exists:varients,id',
                'cart_contents.*.designId' => 'nullable|integer|exists:designs,id',
                'cart_contents.*.sizeId' => 'nullable|integer|exists:sizes,id',
                'cart_contents.*.quantity' => 'required|integer|min:1',
                'cart_contents.*.price' => 'required|numeric|min:0',
                'cart_contents.*.mrp' => 'required|numeric|min:0',
            ]);

            // Get the validated cart items data from the request.
            $cartItemsData = $request->input('cart_contents');

            // --- Clear Existing Cart Items for the current user/IP within the transaction ---
            if ($userId) {
                Ccart::where('user_id', $userId)->delete();
            } else {
                Ccart::where('user_ip', $userIp)->whereNull('user_id')->delete();
            }

            $persistedCartItems = []; // Array to store the newly created Ccart models

            // --- Persist New Cart Items ---
            foreach ($cartItemsData as $itemData) {
                $newCartItem = Ccart::create([
                    'user_id' => $userId,        // Will be null for guest users
                    'user_ip' => $userIp,        // Always set, even for logged-in users
                    'product_id' => $itemData['productId'],
                    'varient_id' => $itemData['varientId'] ?? null,
                    'design_id' => $itemData['designId'] ?? null,
                    'size_id' => $itemData['sizeId'] ?? null,
                    'quantity' => $itemData['quantity'],
                    'price' => $itemData['price'],
                    'mrp' => $itemData['mrp'],
                ]);
                $persistedCartItems[] = $newCartItem;
            }

            // Commit the transaction if all operations were successful.
            DB::commit();

            // Return a success JSON response with the newly persisted cart items.
            return response()->json([
                'message' => 'Cart items persisted successfully.',
                'cart_contents' => $persistedCartItems,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::warning('Cart persistence validation failed: ' . json_encode($e->errors()));
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error persisting cart items: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all(),
            ]);
            return response()->json([
                'message' => 'An unexpected error occurred while persisting cart items.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Adds an item to the cart or updates its quantity if it already exists.
     * Now returns a JSON response, which is a better practice for AJAX calls.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
public function addItem(Request $request)
{
    DB::beginTransaction();
    try {
        $userId = Auth::id();
        $userIp = $request->ip();

        // Validate input
        $validatedData = $request->validate($this->getCartItemValidationRules());

        // Try to find existing cart item with the same product/variant/design/size
        $cartItem = Ccart::where('user_id', $userId)
            ->where('user_ip', $userIp)
            ->where('product_id', $validatedData['product_id'])
            ->where('varient_id', $validatedData['varient_id'] ?? null)
            ->where('design_id', $validatedData['design_id'] ?? null)
            ->where('size_id', $validatedData['size_id'] ?? null)
            ->first();

        if ($cartItem) {
            // Increment quantity if it exists
            $cartItem->increment('quantity', $validatedData['quantity']);
        } else {
            // Otherwise, create a new cart item
            $cartItem = Ccart::create([
                'user_id'    => $userId,
                'user_ip'         => $userIp,
                'product_id' => $validatedData['product_id'],
                'varient_id' => $validatedData['varient_id'] ?? null,
                'design_id'  => $validatedData['design_id'] ?? null,
                'size_id'    => $validatedData['size_id'] ?? null,
                'quantity'   => $validatedData['quantity'],
                'price'      => $validatedData['price'],
                'mrp'        => $validatedData['mrp'],
            ]);
        }

        // Get latest persisted cart for this user/IP
        $persistedCartItems = $this->getCurrentCartItems($userId, $userIp);

        // Commit transaction
        DB::commit();
        Log::info("Item added/updated in cart for user: {$userId} (IP: {$userIp})");

        return response()->json([
            'message'       => 'Item added/updated successfully.',
            'cart_contents' => $persistedCartItems,
            'cart_count'    => $persistedCartItems->sum('quantity'),
            'cart_total'    => $persistedCartItems->sum(fn($item) => $item->price * $item->quantity),
        ], 200);

    } catch (\Illuminate\Validation\ValidationException $e) {
        DB::rollBack();
        Log::warning('Add item validation failed: ' . json_encode($e->errors()));
        return response()->json([
            'message' => 'Validation failed.',
            'errors'  => $e->errors(),
        ], 422);

    } catch (\Exception $e) {
        DB::rollBack();
        Log::error('Error adding item to cart: ' . $e->getMessage(), [
            'exception'    => $e,
            'request_data' => $request->all(),
        ]);
        return response()->json([
            'message' => 'An unexpected error occurred while adding item to cart.',
            'error'   => $e->getMessage(),
        ], 500);
    }
}

    // public function addItem(Request $request)
    // {
    //     // Removed the dd() statement as it's for debugging only.
    //     DB::beginTransaction();
    //     try {
    //         $userId = Auth::id();
    //         $userIp = $request->ip();

    //         $validatedData = $request->validate($this->getCartItemValidationRules());

    //         $newItemData = $validatedData;

    //         $currentCartItems = $this->getCurrentCartItems($userId, $userIp)->toArray();

    //         $found = false;
    //         foreach ($currentCartItems as &$item) {
    //             if ($item['product_id'] == $newItemData['product_id'] &&
    //                 (($item['varient_id'] ?? null) == ($newItemData['varient_id'] ?? null)) &&
    //                 (($item['design_id'] ?? null) == ($newItemData['design_id'] ?? null)) &&
    //                 (($item['size_id'] ?? null) == ($newItemData['size_id'] ?? null)) ) {
    //                 $item['quantity'] += $newItemData['quantity'];
    //                 $found = true;
    //                 break;
    //             }
    //         }
    //         unset($item);

    //         if (!$found) {
    //             $currentCartItems[] = [
    //                 'product_id' => $newItemData['product_id'],
    //                 'varient_id' => $newItemData['varient_id'] ?? null,
    //                 'design_id' => $newItemData['design_id'] ?? null,
    //                 'size_id' => $newItemData['size_id'] ?? null,
    //                 'quantity' => $newItemData['quantity'],
    //                 'price' => $newItemData['price'],
    //                 'mrp' => $newItemData['mrp'],
    //             ];
    //         }

    //         $persistedCartItems = $this->syncCart($userId, $userIp, $currentCartItems);

    //         DB::commit();
    //         Log::info("Item added/updated in cart for user: {$userId} (IP: {$userIp})");

    //         return response()->json([
    //             'message' => 'Item added/updated successfully.',
    //             'cart_contents' => $persistedCartItems,
    //         ], 200);

    //     } catch (\Illuminate\Validation\ValidationException $e) {
    //         DB::rollBack();
    //         Log::warning('Add item validation failed: ' . json_encode($e->errors()));
    //         return response()->json([
    //             'message' => 'Validation failed.',
    //             'errors' => $e->errors(),
    //         ], 422);
    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         Log::error('Error adding item to cart: ' . $e->getMessage(), [
    //             'exception' => $e,
    //             'request_data' => $request->all(),
    //         ]);
    //         return response()->json([
    //             'message' => 'An unexpected error occurred while adding item to cart.',
    //             'error' => $e->getMessage(),
    //         ], 500);
    //     }
    // }

    /**
     * Removes an item from the cart.
     * Now returns a JSON response.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeItem(Request $request)
    {
        DB::beginTransaction();
        try {
            $userId = Auth::id();
            $userIp = $request->ip();

            $validatedData = $request->validate([
                'product_id' => 'required|integer',
                'varient_id' => 'nullable|integer',
                'design_id' => 'nullable|integer',
                'size_id' => 'nullable|integer',
            ]);

            $itemToRemove = $validatedData;

            $currentCartItems = $this->getCurrentCartItems($userId, $userIp)->toArray();

            $filteredCartItems = array_filter($currentCartItems, function ($item) use ($itemToRemove) {
                return !(
                    $item['product_id'] == $itemToRemove['product_id'] &&
                    (($item['varient_id'] ?? null) == ($itemToRemove['varient_id'] ?? null)) &&
                    (($item['design_id'] ?? null) == ($itemToRemove['design_id'] ?? null)) &&
                    (($item['size_id'] ?? null) == ($itemToRemove['size_id'] ?? null))
                );
            });

            $persistedCartItems = $this->syncCart($userId, $userIp, array_values($filteredCartItems));

            DB::commit();
            Log::info("Item removed from cart for user: {$userId} (IP: {$userIp})");

            return response()->json([
                'message' => 'Item removed from cart successfully.',
                'cart_contents' => $persistedCartItems,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::warning('Remove item validation failed: ' . json_encode($e->errors()));
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error removing item from cart: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all(),
            ]);
            return response()->json([
                'message' => 'An unexpected error occurred while removing item from cart.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Updates the quantity of an item in the cart.
     * Now returns a JSON response.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateItemQuantity(Request $request)
    {
        DB::beginTransaction();
        try {
            $userId = Auth::id();
            $userIp = $request->ip();

            $validatedData = $request->validate([
                'product_id' => 'required|integer',
                'varient_id' => 'nullable|integer',
                'design_id' => 'nullable|integer',
                'size_id' => 'nullable|integer',
                'quantity' => 'required|integer|min:0', // Quantity can be 0 to remove item
            ]);

            $itemToUpdate = $validatedData;
            $newQuantity = $validatedData['quantity'];

            $currentCartItems = $this->getCurrentCartItems($userId, $userIp)->toArray();
            $updatedCartItems = [];
            $itemFound = false;

            foreach ($currentCartItems as $item) {
                if ($item['product_id'] == $itemToUpdate['product_id'] &&
                    (($item['varient_id'] ?? null) == ($itemToUpdate['varient_id'] ?? null)) &&
                    (($item['design_id'] ?? null) == ($itemToUpdate['design_id'] ?? null)) &&
                    (($item['size_id'] ?? null) == ($itemToUpdate['size_id'] ?? null)) ) {
                    $itemFound = true;
                    if ($newQuantity > 0) {
                        $item['quantity'] = $newQuantity;
                        $updatedCartItems[] = $item;
                    }
                } else {
                    $updatedCartItems[] = $item;
                }
            }

            if (!$itemFound) {
                DB::rollBack();
                Log::warning('Attempted to update quantity for a non-existent cart item.', $itemToUpdate);
                return response()->json([
                    'message' => 'Cart item not found.',
                ], 404);
            }

            $persistedCartItems = $this->syncCart($userId, $userIp, $updatedCartItems);

            DB::commit();
            Log::info("Item quantity updated in cart for user: {$userId} (IP: {$userIp})");

            return response()->json([
                'message' => 'Item quantity updated successfully.',
                'cart_contents' => $persistedCartItems,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::warning('Update item quantity validation failed: ' . json_encode($e->errors()));
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating item quantity in cart: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all(),
            ]);
            return response()->json([
                'message' => 'An unexpected error occurred while updating item quantity.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Clears all items from the user's cart.
     * Now returns a JSON response.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function clearCart(Request $request)
    {
        DB::beginTransaction();
        try {
            $userId = Auth::id();
            $userIp = $request->ip();

            $persistedCartItems = $this->syncCart($userId, $userIp, []); // Sync with an empty array

            DB::commit();
            Log::info("Cart cleared for user: {$userId} (IP: {$userIp})");

            return response()->json([
                'message' => 'Cart cleared successfully.',
                'cart_contents' => $persistedCartItems,
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error clearing cart: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all(),
            ]);
            return response()->json([
                'message' => 'An unexpected error occurred while clearing the cart.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Deletes all guest cart entries associated with a given IP address.
     * This is typically used for cleanup or when a guest user logs in.
     *
     * @param string $ip The IP address of the user.
     * @return void
     */
    private function deleteCartAssociatedWithCurrentIp($ip) {
        // Delete cart entries where user_ip matches and user_id is NULL (indicating a guest cart)
        $deletedCount = Ccart::where('user_ip', $ip)->whereNull('user_id')->delete();
        Log::info("Cleaned up {$deletedCount} old guest cart entries for IP: {$ip}");
    }

   public function restoreCart(Request $request)
{
    $userId = Auth::id();
    $userIp = $request->ip();

    $order = Order::findOrFail($request->orderId);

    // Assuming 'items' is a hasMany relation on Order
    $orderItems = $order->items;

    foreach ($orderItems as $item) {
        Ccart::create([
            'user_id'    => $userId,
            'user_ip'    => $userIp,
            'product_id' => $item->product_id,
            'varient_id' => $item->varient_id ?? null,
            'design_id'  => $item->design_id ?? null,
            'size_id'    => $item->size_id ?? null,
            'quantity'   => $item->quantity, // fixed typo
            'price'      => $item->price,
            'mrp'        => $item->mrp,
        ]);
    }
    $order->items()->delete();
    $order->delete();

    return response()->redirectTo('/cart');
}
}
