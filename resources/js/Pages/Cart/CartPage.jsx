import useGeolocation from '../Index/useGeolocation';
import React, { useMemo, useCallback } from 'react';

import Welcome from "../Welcome";
import CartDisplay from './CartDisplay'; // Import the new CartDisplay component
import { router, usePage } from '@inertiajs/react'; // Import router for page reloads and usePage for auth
import { useCart } from '@/Context/CartContext';



/**
 * CartPage Component
 * This component is responsible for fetching and managing cart data from the backend.
 * It receives 'itemData' (the cart items) as a prop from the backend via Inertia.
 * All cart modification actions trigger backend updates, and then the page is reloaded
 * to reflect the latest cart state from the server.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.itemData - An array of cart item objects provided directly from the backend.
 * Each item is expected to have:
 * - {string} id: Unique ID from the Ccart model (backend primary key).
 * - {number} product_id: Database ID of the product.
 * - {number|null} varient_id: Database ID of the varient. // Changed to varient_id
 * - {object|null} varient: Eager-loaded varient object { id, name } or null. // Changed to varient
 * - {number|null} design_id: Database ID of the design.
 * - {object|null} design: Eager-loaded design object { id, name } or null.
 * - {number|null} size_id: Database ID of the size.
 * - {object|null} size: Eager-loaded size object { id, name } or null.
 * - {number} quantity: Quantity of this item in the cart.
 * - {string} price: Price of the item.
 * - {string} mrp: MRP of the item.
 * @param {Array<object>} props.clusters - An array of cluster objects, passed to the Welcome component.
 */
export default function CartPage ({ itemData, clusters }) {

    const { userLocation, locationStatus, locationError } = useGeolocation();
    console.log(userLocation, locationStatus, locationError);
    const loc = userLocation;
    const { removeItemFromCart, updateItemQuantity, clearCart,  fetchCartItemsFromBackend } = useCart();
    // ADDED: Get auth object from Inertia page props
    const { auth } = usePage().props;
    const user = auth.user; // Get the logged-in user object (will be null if not logged in)

    // Helper function to create the composite ID (must match ProductPage.jsx and CartContext's logic)
    // This is used to create a stable 'id' for frontend rendering, even if backend 'id' is different.
    const createCompositeId = (productId, varientId, designId, sizeId) => { // Changed parameter name to varientId
        const idParts = [`v${productId + varientId}`];
        if (designId) {
            idParts.push(`d${designId}`);
        }
        if (sizeId) {
            idParts.push(`s${sizeId}`);
        }
        return idParts.join('-');
    };

    // Transform itemData from backend format to frontend display format
    // This ensures consistency in 'id' for React's `key` prop and consistent data structure.
    const transformedCartItems = useMemo(() => {
        if (!itemData) return [];
        return itemData.map(item => ({
            // Use the composite ID as the primary identifier for frontend rendering
            // This is crucial for React's reconciliation and consistent keying.
            id: createCompositeId(item.product_id,item.varient_id, item.design_id, item.size_id), // Changed to item.varient_id
            // Keep original backend IDs for backend communication
            product_id: item.product_id,
            varient_id: item.varient_id, // Changed to varient_id
            design_id: item.design_id,
            size_id: item.size_id,
            quantity: item.quantity,
            price: parseFloat(item.price), // Ensure price is a number
            mrp: parseFloat(item.mrp),     // Ensure MRP is a number
            // Pass through eager-loaded relations for display
            product: item.product,
            varient: item.varient, // Changed to varient
            design: item.design,
            size: item.size,
        }));
    }, [itemData]);


    // Calculate totalItems based on the transformed cartItems
    const totalItems = useMemo(() => {
        return transformedCartItems.reduce((total, item) => total + item.quantity, 0);
    }, [transformedCartItems]);

    // Calculate totalPrice based on the transformed cartItems
    const totalPrice = useMemo(() => {
        return transformedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [transformedCartItems]);

    // Helper function to get CSRF token
    const getCsrfToken = () => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        return csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : null;
    };

    // Helper function to send specific cart updates to the backend
    const sendSpecificCartUpdate = useCallback(async (endpoint, payload) => {
        const csrfToken = getCsrfToken();
        if (!csrfToken) {
            console.error('CSRF token meta tag not found. Cannot send cart data securely.');
            alert('Security error: CSRF token missing. Please refresh the page.');
            return false;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Failed to update cart via ${endpoint}:`, response.status, errorData);
                alert(`Failed to update cart: ${errorData.message || 'An error occurred.'}`);
                return false;
            } else {
                console.log(`Cart update via ${endpoint} successful!`);
                return true;
            }
        } catch (error) {
            console.error(`Network error while updating cart via ${endpoint}:`, error);
            alert('Network error. Please check your connection.');
            return false;
        }
    }, []);


    // Action: Remove an item from the cart
    const handleRemoveItem = useCallback(async (compositeProductId) => {
        // Find the original item data (with backend IDs) from the current itemData prop
        const itemToRemove = itemData.find(item =>
            createCompositeId(item.product_id,item.varient_id, item.design_id, item.size_id) === compositeProductId // Changed to item.varient_id
        );

        if (!itemToRemove) {
            console.warn("Attempted to remove non-existent item:", compositeProductId);
            return;
        }

        const payload = {
            product_id: itemToRemove.product_id,
            varient_id: itemToRemove.varient_id || null, // Changed to varient_id
            design_id: itemToRemove.design_id || null,
            size_id: itemToRemove.size_id || null,
        };

        console.log('Sending removeItem payload to backend:', payload);
        const success = await sendSpecificCartUpdate('/api/cart/remove-item', payload);
        if (success) {
            removeItemFromCart(compositeProductId);
            router.reload({ only: ['itemData'] }); // Reload to get fresh data from backend
        }
    }, [itemData, sendSpecificCartUpdate]);

    // Action: Update quantity of an item
    const handleUpdateQuantity = useCallback(async (compositeProductId, newQuantity) => {

        const itemToUpdate = itemData.find(item =>
            createCompositeId(item.product_id,item.varient_id, item.design_id, item.size_id) === compositeProductId // Changed to item.varient_id
        );

        if (!itemToUpdate) {
            console.warn("Attempted to update quantity for non-existent item:", compositeProductId);
            return;
        }
        fetchCartItemsFromBackend();
        const payload = {
            product_id: itemToUpdate.product_id,
            varient_id: itemToUpdate.varient_id || null, // Changed to varient_id
            design_id: itemToUpdate.design_id || null,
            size_id: itemToUpdate.size_id || null,
            quantity: newQuantity,

        };

        console.log('Sending updateItemQuantity payload to backend:', payload);
        const success = await sendSpecificCartUpdate('/api/cart/update-quantity', payload);
        if (success) {
            updateItemQuantity(compositeProductId, newQuantity);
            router.reload({ only: ['itemData'] });
        }
    }, [itemData, sendSpecificCartUpdate]);

    // Action: Clear the entire cart
    const handleClearCart = useCallback(async () => {
        console.log('Sending clearCart request to backend.');
        const success = await sendSpecificCartUpdate('/api/cart/clear', {}); // No specific payload needed for clear
        if (success) {
            clearCart();
            router.reload({ only: ['itemData'] });
        }
    }, [sendSpecificCartUpdate]);

    // Action: Proceed to Checkout
    const handleProceedToCheckout = useCallback(() => {
        if (!user) {
            // User is not logged in, redirect to signup page with a redirect_to parameter
            alert('Please sign up or log in to proceed to checkout.'); // Use a custom modal in production
            router.visit(route('register', { redirect_to: '/checkout' })); // Pass intended URL
            return;
        }

        // If the user is logged in, proceed with the existing checkout logic
        const checkoutPayload = itemData.map(item => ({
            product_id: item.product_id,
            varient_id: item.varient_id || null,
            design_id: item.design_id || null,
            size_id: item.size_id || null,
            quantity: item.quantity,
            price: item.price,
            mrp: item.mrp,

        }));

        const requestData = {
            cart_contents: checkoutPayload,
            latitude: null, // Explicitly initialize to null
            longitude: null, // Explicitly initialize to null
        };

        // --- START ENHANCED DEBUGGING LOGS FOR LOCATION ---
        console.log('--- handleProceedToCheckout: Location Debugging ---');
        console.log('Current locationStatus:', locationStatus);
        console.log('Current userLocation (loc):', userLocation);
        console.log('Current locationError:', locationError);
        // --- END ENHANCED DEBUGGING LOGS FOR LOCATION ---

        // Add location data to the payload if available and granted
        if (locationStatus === 'granted' && userLocation) {
            requestData.latitude = userLocation.latitude;
            requestData.longitude = userLocation.longitude;
            console.log('Sending location data with checkout payload:', userLocation);
        }



        // CRITICAL FIX: Change router.get to router.post and target the 'checkout.prepare' route
        router.get(route('checkout.show'), requestData, {
            onStart: () => console.log('Initiating checkout...'),
            onSuccess: (page) => {
                console.log('Checkout initiated successfully! Redirecting to confirmation page.', page);
                // Backend (prepareCheckout) is expected to redirect to the actual checkout page here
            },
            onError: (errors) => {
                console.error('Failed to initiate checkout:', errors);
                alert('Failed to proceed to checkout. Please try again.');
            },
            onFinish: () => {
                console.log('Checkout request finished.');
            }
        });
    }, [itemData, user]);


    return (
        <Welcome clusters={clusters}>
            <CartDisplay
                cartItems={transformedCartItems}
                totalItems={totalItems}
                totalPrice={totalPrice}
                onRemoveItem={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
                onClearCart={handleClearCart}
                onProceedToCheckout={handleProceedToCheckout}
            />
        </Welcome>
    );
};