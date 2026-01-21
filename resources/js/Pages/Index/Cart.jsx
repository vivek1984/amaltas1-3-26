import React from 'react';
import { Link } from '@inertiajs/react'; // Assuming you use Inertia's Link for navigation
import { LuShoppingCart } from "react-icons/lu"; // Using the icon you provided
import { useCart } from '../Category/CartContext'; // Import the useCart hook to access cart items

/**
 * Cart Component
 * Displays a shopping cart icon and the number of items in the cart.
 * Designed to be used in navigation bars or headers.
 *
 * @param {object} props - The component props.
 * @param {string} [props.linkTo="/cart"] - The URL to navigate to when the cart button is clicked.
 */
export default function Cart({ linkTo = "/cart" }) {
    // Access cartItems and totalItems from the CartContext
    const { cartItems, totalItems } = useCart(); // Use totalItems from context

    // Function to send data to the backend when the cart is clicked
    const handleCartClick = async () => {
        // Only send data if there are items in the cart
        if (cartItems.length === 0) {
            console.log('Cart is empty on frontend, no data to sync with backend.');
            return; // Do not proceed if cart is empty
        }

        // Map frontend cart item structure (snake_case IDs) to backend expected payload structure (camelCase IDs)
        const mappedCartContents = cartItems.map(item => ({
            productId: item.product_id,
            varientId: item.varient_id || null, // Changed to varientId to match backend
            designId: item.design_id || null,
            sizeId: item.size_id || null,
            quantity: item.quantity,
            price: item.price,
            mrp: item.mrp,
        }));

        const payload = {
            cart_contents: mappedCartContents,
        };

        // Safely get the CSRF token from the meta tag
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : null;

        if (!csrfToken) {
            console.error('CSRF token meta tag not found. Cannot send cart data securely.');
            // Optionally, show a user-friendly message or prevent the fetch request
            return;
        }

        // try {
        //     // Send the mapped cart data to the backend's saveCart endpoint
        //     const response = await fetch('/api/cart/save', { // This URL should map to your CartController@saveCart
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'X-CSRF-TOKEN': csrfToken, // Include the CSRF token for Laravel POST requests
        //         },
        //         body: JSON.stringify(payload),
        //     });

        //     if (!response.ok) {
        //         const errorData = await response.json();
        //         console.error('Failed to save cart data to backend:', response.status, errorData);
        //         // You might want to show a flash message to the user here (e.g., "Failed to sync cart")
        //     } else {
        //         // Data sent successfully
        //         console.log('Cart data successfully synced with backend!', payload);
        //         // Optionally, show a success flash message (e.g., "Cart synced with server")
        //     }
        // } catch (error) {
        //     console.error('Network error while saving cart data:', error);
        //     // You might want to show a flash message for network errors
        // }
    };

    return (
        <Link
            href={linkTo} // Link to the cart page
            className="relative p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            aria-label="Shopping Cart"
            onClick={handleCartClick} // Call the function to save cart data when the link is clicked
        >
            {/* Shopping cart icon */}
            <LuShoppingCart className="text-3xl" id='cart-icon' />

            {/* Display item count only if greater than 0, using totalItems from context */}
            {totalItems > 0 && (
                <span className="absolute top-[8px] right-[8px] px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full leading-none transform translate-x-1/2 -translate-y-1/2">
                    {totalItems}
                </span>
            )}
        </Link>
    );
}
