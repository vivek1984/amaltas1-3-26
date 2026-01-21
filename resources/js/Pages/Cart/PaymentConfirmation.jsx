import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { usePage, router } from '@inertiajs/react';
import Welcome from '../Welcome';
import { useCart } from '../Category/CartContext';

/**
 * PaymentConfirmation Component
 * This component displays a summary of the user's order and shipping details,
 * and provides two payment options via Cashfree:
 * - "Pay Online" (full amount)
 * - "Partial COD" (10% of total)
 *
 * The order is assumed to have been created in the backend (by CheckoutController@showPaymentConfirmation)
 * before this page is rendered.
 *
 * It receives:
 * - `clusters`: For the main layout.
 * - `cartItems`: The items in the created order for display.
 * - `totalAmount`: The total calculated amount for the order.
 * - `shippingDetails`: The user's shipping information from the created order.
 * - `userLocation`: The user's geolocation from the created order.
 * - `orderId`: The ID of the order already created in the backend.
 */
const PaymentConfirmation = ({ clusters, cartItems, totalAmount, shippingDetails, userLocation, orderId }) => {
    console.log(userLocation);
    const { flash } = usePage().props;
    const initialSuccessMessage = flash?.successMessage;

    const { fetchCartItemsFromBackend } = useCart();

    // Cashfree States
    const [loadingCashfreeScript, setLoadingCashfreeScript] = useState(true);
    const [cashfreeDetails, setCashfreeDetails] = useState(null);
    const [cashfreePaymentInitiated, setCashfreePaymentInitiated] = useState(false);
    const [cashfreeInstance, setCashfreeInstance] = useState(null); // To store Cashfree SDK instance

    // General Payment States
    const [fetchingPaymentDetails, setFetchingPaymentDetails] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [currentMessage, setCurrentMessage] = useState(initialSuccessMessage || 'Review your order and choose a payment option.');
    const [messageType, setMessageType] = useState(initialSuccessMessage ? 'success' : 'info');


    // Helper to get CSRF token
    const getCsrfToken = useCallback(() => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        return csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : null;
    }, []);

    // --- Cashfree SDK Loading ---
    const loadCashfreeScript = useCallback(() => {
        console.log('Cashfree Script: Attempting to load Cashfree SDK.');
        return new Promise((resolve) => {
            if (typeof window.Cashfree !== 'undefined') {
                console.log('Cashfree Script: Cashfree SDK already loaded.');
                setCashfreeInstance(new window.Cashfree());
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            // Using the recommended v3 SDK URL from Cashfree documentation
            script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
            script.onload = () => {
                console.log('Cashfree Script: Cashfree SDK loaded successfully.');
                setCashfreeInstance(new window.Cashfree()); // Initialize Cashfree instance
                resolve(true);
            };
            script.onerror = () => {
                console.error('Cashfree Script: Cashfree SDK failed to load.');
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }, []);

    useEffect(() => {
        const loadScript = async () => {
            setLoadingCashfreeScript(true);
            const scriptLoaded = await loadCashfreeScript();
            if (!scriptLoaded) {
                setPaymentError('Cashfree SDK failed to load. Please check your internet connection.');
            }
            setLoadingCashfreeScript(false);
        };
        loadScript();
    }, [loadCashfreeScript]);


    // --- Cashfree Popup Logic ---
    const openCashfreePopup = useCallback(() => {
        console.log('openCashfreePopup: Called.');
        if (!cashfreeDetails || !cashfreeInstance || cashfreePaymentInitiated) {
            console.error('openCashfreePopup: Conditions not met to open Cashfree popup. Details:', {
                cashfreeDetailsPresent: !!cashfreeDetails,
                cashfreeInstancePresent: !!cashfreeInstance,
                paymentAlreadyInitiated: cashfreePaymentInitiated
            });
            if (!cashfreeDetails) {
                setPaymentError('Payment details not received from server. Please try again.');
            } else if (!cashfreeInstance) {
                setPaymentError('Cashfree SDK is not loaded. Please refresh the page.');
            }
            return;
        }

        setCashfreePaymentInitiated(true); // Prevent multiple popups

        const checkoutOptions = {
            paymentSessionId: cashfreeDetails.payment_session_id,
            redirectTarget: "_self", // Use "_self" to redirect within the current window/iframe
            mode: "redirect" // Required parameter for redirect flow
        };

        // --- ENHANCED DEBUGGING FOR CASHFREE REDIRECTION ---
        console.log('openCashfreePopup: --- Initiating Cashfree Checkout ---');
        console.log('openCashfreePopup: cashfreeInstance:', cashfreeInstance);
        console.log('openCashfreePopup: checkoutOptions:', checkoutOptions);
        console.log('openCashfreePopup: Payment Session ID being used:', cashfreeDetails.payment_session_id);

        // Assertions to quickly identify missing values
        console.assert(cashfreeInstance, "Cashfree instance is null/undefined before checkout!");
        console.assert(cashfreeDetails.payment_session_id, "Payment Session ID is null/empty before checkout!");

        try {
            cashfreeInstance.checkout(checkoutOptions).then(function(result) {
                // For redirect flows, this 'then' block might not always be hit
                // as the browser navigates away.
                console.log('Cashfree checkout result (might be undefined for redirect flow):', result);
                if (result && result.error) {
                    console.error('Cashfree checkout failed with error in result:', result.error);
                    setPaymentError(result.error.message || 'Cashfree payment failed to initiate (result error).');
                    setCurrentMessage(result.error.message || 'Cashfree payment failed to initiate.');
                    setMessageType('error');
                    setCashfreePaymentInitiated(false); // Allow retrying
                    router.visit(route('cart.index'), { preserveScroll: true, preserveState: false, replace: true, data: { flash: { error: result.error.message || 'Cashfree payment failed to initiate.' } } });
                }
            }).catch(function(error) {
                // This catch block handles errors that occur during the checkout() call itself
                // or if the promise rejects for other reasons.
                console.error('Cashfree checkout failed (Promise rejected):', error);
                setPaymentError(error.message || 'Cashfree payment failed to initiate. Please try again.');
                setCurrentMessage(error.message || 'Cashfree payment failed to initiate.');
                setMessageType('error');
                setCashfreePaymentInitiated(false); // Allow retrying
                router.visit(route('cart.index'), { preserveScroll: true, preserveState: false, replace: true, data: { flash: { error: error.message || 'Cashfree payment failed to initiate.' } } });
            });
            console.log('openCashfreePopup: cashfreeInstance.checkout() was called.');
        } catch (syncError) {
            // This catch block handles any synchronous errors thrown by cashfreeInstance.checkout()
            console.error('openCashfreePopup: Synchronous error calling cashfreeInstance.checkout():', syncError);
            setPaymentError(syncError.message || 'A critical error occurred during Cashfree payment initiation.');
            setCurrentMessage(syncError.message || 'A critical error occurred during Cashfree payment initiation.');
            setMessageType('error');
            setCashfreePaymentInitiated(false); // Allow retrying
            router.visit(route('cart.index'), { preserveScroll: true, preserveState: false, replace: true, data: { flash: { error: syncError.message || 'A critical error occurred during Cashfree payment initiation.' } } });
        }
        // --- END ENHANCED DEBUGGING ---

    }, [cashfreeDetails, cashfreeInstance, cashfreePaymentInitiated, router]);

    // Effect to open Cashfree popup once cashfreeDetails are received from backend
    useEffect(() => {
        console.log('useEffect (cashfreeDetails change): Triggered. States:', {
            cashfreeDetailsPresent: !!cashfreeDetails,
            cashfreePaymentInitiated,
            loadingCashfreeScript,
            fetchingPaymentDetails, // Use combined fetching state
            cashfreeInstancePresent: !!cashfreeInstance
        });
        if (cashfreeDetails && cashfreeInstance && !cashfreePaymentInitiated && !loadingCashfreeScript && !fetchingPaymentDetails) {
            console.log('useEffect (cashfreeDetails change): Conditions met, calling openCashfreePopup.');
            openCashfreePopup();
        }
    }, [cashfreeDetails, cashfreeInstance, cashfreePaymentInitiated, loadingCashfreeScript, fetchingPaymentDetails, openCashfreePopup]);


    // --- Unified Payment Initiation Handler ---
    const handleProceedToPayment = async (paymentType) => {
        console.log(`handleProceedToPayment: Button clicked. Payment type: ${paymentType}`);
        if (fetchingPaymentDetails || loadingCashfreeScript || cashfreePaymentInitiated) {
            console.warn('handleProceedToPayment: Preventing multiple clicks or premature action. States:', { fetchingPaymentDetails, loadingCashfreeScript, cashfreePaymentInitiated });
            return;
        }

        if (!cartItems || cartItems.length === 0 || !orderId || totalAmount === undefined) {
            console.error('handleProceedToPayment: Order details missing, cannot proceed.');
            setPaymentError('Order details are missing. Please go back to your cart to initiate checkout.');
            setCurrentMessage('Order details are missing. Please go back to your cart to initiate checkout.');
            setMessageType('error');
            return;
        }

        setFetchingPaymentDetails(true); // Set common loading state
        setPaymentError(null);
        setCurrentMessage(`Preparing for Cashfree ${paymentType === 'full' ? 'online payment' : 'partial COD payment'}...`);
        setMessageType('info');

        const csrfToken = getCsrfToken();
        if (!csrfToken) {
            console.error('handleProceedToPayment: CSRF token missing.');
            setPaymentError('Security error: CSRF token missing. Please refresh the page.');
            setCurrentMessage('Security error: CSRF token missing. Please refresh the page.');
            setMessageType('error');
            setFetchingPaymentDetails(false);
            return;
        }

        let amountToPay = totalAmount; // Default to full amount
        if (paymentType === 'partial_cod') {
            const partialAmount = totalAmount * 0.10; // 10%
            amountToPay = Math.round(partialAmount / 1000) * 1000; // Round to nearest thousand
            if (amountToPay < 100 && amountToPay > 0) { // Cashfree minimum is typically INR 1 (100 paisa)
                amountToPay = 100;
            } else if (amountToPay <= 0) {
                amountToPay = 0;
            }
        }
        console.log(`handleProceedToPayment: Calculated amountToPay for Cashfree ${paymentType}: ${amountToPay}`);

        try {
            const response = await fetch(route('checkout.get-cashfree-details'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                body: JSON.stringify({ order_id: orderId, payment_type: paymentType, amount_to_pay: amountToPay }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`handleProceedToPayment: API call failed for Cashfree details:`, errorData);
                setPaymentError(errorData.message || `Failed to prepare Cashfree payment. Please try again.`);
                setCurrentMessage(errorData.message || `Failed to prepare Cashfree payment. Please try again.`);
                setMessageType('error');
                return;
            }

            const data = await response.json();
            console.log(`handleProceedToPayment: API call successful for Cashfree. Received details:`, data);
            setCashfreeDetails(data.cashfreeDetails);
            setCurrentMessage(data.message || `Cashfree gateway ready. Redirecting...`);
            setMessageType('success');
            // The respective useEffect will now trigger the popup
        } catch (error) {
            console.error(`handleProceedToPayment: Network error during Cashfree details fetch:`, error);
            setPaymentError('Network error. Please check your connection and try again.');
            setCurrentMessage('Network error. Please check your connection and try again.');
            setMessageType('error');
        } finally {
            setFetchingPaymentDetails(false);
            console.log('handleProceedToPayment: API call finished.');
        }
    };

    // Calculate partial COD amount for display
    const partialCodAmount = useMemo(() => {
        if (totalAmount === undefined || totalAmount <= 0) return 0;
        const amount = totalAmount * 0.10; // 10%
        let roundedAmount = Math.round(amount / 1000) * 1000; // Round to nearest thousand

        if (roundedAmount > 0 && roundedAmount < 100) {
            roundedAmount = 100;
        } else if (roundedAmount <= 0) {
            roundedAmount = 0;
        }
        return roundedAmount;
    }, [totalAmount]);


    // Display a message if no cart items or total amount are provided (e.g., direct access)
    if (!cartItems || cartItems.length === 0 || totalAmount === undefined || !orderId) {
        console.warn('PaymentConfirmation: Missing critical props on initial render. Redirecting to cart.index.');
        return (
            <Welcome clusters={clusters}>
                <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Confirmation</h1>
                        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Information:</strong>
                            <span className="block sm:inline"> Order details are missing. Please go back to your cart to initiate checkout.</span>
                        </div>
                        <button
                            onClick={() => router.visit(route('cart.index'))}
                            className="mt-6 bg-maroon-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-maroon-700 transition-colors duration-200"
                        >
                            Go to Cart
                        </button>
                    </div>
                </div>
            </Welcome>
        );
    }

    // Determine if any payment is currently being processed or loaded
    const isPaymentProcessing = fetchingPaymentDetails || loadingCashfreeScript || cashfreePaymentInitiated;

    return (
        <Welcome clusters={clusters}>
            <div className="min-h-screen bg-gray-100 p-4 flex items-start justify-center">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Order Confirmation</h1>

                    {/* Order Summary Section */}
                    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 text-left">
                        <h2 className="text-xl font-bold text-gray-800 mb-3">Your Order Items</h2>
                        <ul className="space-y-3">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex items-center text-sm text-gray-700 border-b pb-3 last:border-b-0 last:pb-0">
                                    {item.product?.small_image && (
                                        <img
                                            src={`/storage/${item.product.small_image}`}
                                            alt={item.product?.name}
                                            className="w-16 h-16 object-cover rounded mr-3 flex-shrink-0"
                                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/E0E0E0/A0A0A0?text=P`; }}
                                        />
                                    )}
                                    <div className="flex-grow">
                                        <span className="font-medium text-base">{item.product?.name}</span>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {item.varient?.name && <span>Varient: {item.varient.name}</span>}
                                            {item.design?.name && <span className="ml-1">Design: {item.design.name}</span>}
                                            {item.size?.name && <span className="ml-1">Size: {item.size.name}</span>}
                                        </div>
                                        <span className="text-sm">Quantity: {item.quantity}</span>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="font-semibold text-base">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                                        {parseFloat(item.mrp) > parseFloat(item.price) && (
                                            <p className="text-xs text-red-500 line-through">MRP: ₹{(parseFloat(item.mrp) * item.quantity).toFixed(2)}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-gray-300 pt-3 mt-4">
                            <div className="flex justify-between font-bold text-gray-800 text-lg">
                                <span>Shipping Cost:</span>
                                <span>₹{userLocation.shipping_fee}</span>

                            </div>

                        </div>

                        <div className="border-t border-gray-300 pt-3 mt-4">
                            <div className="flex justify-between font-bold text-gray-800 text-lg">
                                <span>Total Amount:</span>
                                <span>₹{totalAmount.toFixed(2)}</span>

                            </div>
                            <div>
                                {userLocation.dehradun == 'yes' && <p className='text-red-600'> + Actual Shipping Charges will be Payable Cash.</p> }
                            </div>
                        </div>
                    </div>

                    {/* Shipping Details Section */}
                    {shippingDetails && (
                        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 text-left">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Shipping Address</h2>
                            <p className="text-gray-700"><span className="font-semibold">Name:</span> {shippingDetails.name}</p>
                            <p className="text-gray-700"><span className="font-semibold">Address:</span> {shippingDetails.address_line1}, {shippingDetails.address_line2}</p>
                            <p className="text-gray-700"><span className="font-semibold">City:</span> {shippingDetails.city}</p>
                            <p className="text-gray-700"><span className="font-semibold">State:</span> {shippingDetails.state}</p>
                            <p className="text-gray-700"><span className="font-semibold">Pincode:</span> {shippingDetails.pincode}</p>
                            <p className="text-gray-700"><span className="font-semibold">Mobile:</span> {shippingDetails.mobile}</p>

                        </div>
                    )}


                    {/* Status Messages */}
                    {isPaymentProcessing && (
                        <div className="flex flex-col items-center mb-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-600 mb-4"></div>
                            <p className="text-gray-700 text-lg text-center">{currentMessage}</p>
                            <p className="text-gray-500 text-sm mt-2 text-center">Please do not close this window.</p>
                        </div>
                    )}

                    {paymentError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {paymentError}</span>
                            <p className="text-sm mt-2">You will be redirected to your cart shortly.</p>
                        </div>
                    )}

                    {!isPaymentProcessing && !paymentError && !cashfreePaymentInitiated && (
                        <div className={`mb-4 px-4 py-3 rounded relative text-center
                            ${messageType === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-blue-100 border border-blue-400 text-blue-700'}`} role="alert">
                            <span className="block sm:inline">{currentMessage}</span>
                        </div>
                    )}

                    {/* Payment Option Buttons */}
                    {!isPaymentProcessing && !paymentError && !cashfreePaymentInitiated && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {/* Cashfree Full Payment */}
                            <button
                                onClick={() => handleProceedToPayment('full')}
                                disabled={!cartItems || cartItems.length === 0 || !orderId || totalAmount === undefined}
                                className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/></svg>
                                <span>Pay Online: ₹{totalAmount?.toFixed(2)} </span>
                            </button>

                            {/* Cashfree Partial COD */}
                            {partialCodAmount > 0 && (
                                <button
                                    onClick={() => handleProceedToPayment('partial_cod')}
                                    disabled={!cartItems || cartItems.length === 0 || !orderId || totalAmount === undefined}
                                    className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM12 6a6 6 0 00-6 6h2a4 4 0 014-4V6z"/></svg>
                                    <span>Partial COD: ₹{partialCodAmount?.toFixed(2)} </span>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Welcome>
    );
};

export default PaymentConfirmation;
