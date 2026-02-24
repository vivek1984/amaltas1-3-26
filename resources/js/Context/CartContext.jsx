// import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';

// // 1. Create the Cart Context
// const CartContext = createContext();

// // Custom hook to consume the cart context
// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (!context) {
//         // This error indicates the component using useCart is not wrapped by CartProvider
//         throw new Error('useCart must be used within a CartProvider');
//     }
//     return context;
// };

// // Helper function to create the composite ID, matching ProductPage.jsx logic
// // Note: The parameter name 'variantId' is fine here as it's a local variable,
// // but ensure the *value* passed to it comes from 'item.varient_id' from the backend.
// const createCompositeId = (varientId, designId, sizeId) => { // Changed parameter name for clarity
//     const idParts = [`v${varientId}`]; // Using varientId
//     if (designId) {
//         idParts.push(`d${designId}`);
//     }
//     if (sizeId) {
//         idParts.push(`s${sizeId}`);
//     }
//     return idParts.join('-');
// };

// // 2. Create the Cart Provider Component
// // Now accepts an initialCartItems prop to hydrate the cart state from the server
// export const CartProvider = ({ children, initialCartItems }) => {
//     // This cartItems state will primarily serve the header cart icon's total count.
//     // The main CartPage will now get its data directly from Inertia props.
//     const [cartItems, setCartItems] = useState(() => {
//         try {
//             const storedCartItems = localStorage.getItem('cartItems');
//             return storedCartItems ? JSON.parse(storedCartItems) : [];
//         } catch (error) {
//             console.error("Failed to parse cart items from localStorage:", error);
//             return []; // Return empty array on error to prevent app crash
//         }
//     });

//     // Helper to get CSRF token
//     const getCsrfToken = () => {
//         const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
//         return csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : null;
//     };

//     // NEW: Function to fetch cart items from the backend and update context state
//     const fetchCartItemsFromBackend = useCallback(async () => {
//         try {
//             const response = await fetch('/cart-json', { // This endpoint maps to CartController@index
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // No CSRF token typically needed for GET requests
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch cart from backend: ${response.statusText}`);
//             }

//             const data = await response.json();
//             // Assuming the backend's CartController@index returns a JSON object with a 'cart_items' key
//             const backendCartItems = data.cart_items;

//             const transformedBackendItems = backendCartItems.map(item => {
//                 const compositeId = createCompositeId(item.varient_id, item.design_id, item.size_id);
//                 return {
//                     id: compositeId,
//                     product_id: item.product_id,
//                     name: item.product?.name,
//                     selectedVariantName: item.varient?.name,
//                     selectedDesignName: item.design?.name,
//                     selectedSizeName: item.size?.name,
//                     price: parseFloat(item.price),
//                     mrp: parseFloat(item.mrp),
//                     quantity: item.quantity,
//                     image: item.product?.small_image ? `storage/${item.product.small_image}` : (item.product?.name.charAt(0) || 'P'),
//                     slug: item.product?.slug,
//                     product: item.product,
//                     varient: item.varient,
//                     design: item.design,
//                     size: item.size,
//                 };
//             });

//             // Only update state if the data is actually different to prevent unnecessary re-renders
//             if (JSON.stringify(transformedBackendItems) !== JSON.stringify(cartItems)) {
//                 setCartItems(transformedBackendItems);
//                 localStorage.setItem('cartItems', JSON.stringify(transformedBackendItems)); // Also update local storage
//                 console.log("CartContext: Fetched and updated cart items from backend.");
//             }
//         } catch (error) {
//             console.error("CartContext: Error fetching cart items from backend:", error);
//         }
//     }, [cartItems]); // Include cartItems in dependency array because it's used in the comparison

//     // Effect 1: Synchronize cartItems state with initialCartItems prop from the server.
//     // This effect should ONLY depend on `initialCartItems`.
//     // It's responsible for hydrating the frontend state from the backend's authoritative data
//     // when the CartProvider is initially loaded or when Inertia provides new initial props.
//     useEffect(() => {
//         if (initialCartItems) {
//             const transformedInitialItems = initialCartItems.map(item => {
//                 // IMPORTANT: Changed 'item.variant_id' to 'item.varient_id' to match backend migration
//                 const compositeId = createCompositeId(item.varient_id, item.design_id, item.size_id);
//                 return {
//                     id: compositeId,
//                     product_id: item.product_id,
//                     name: item.product?.name,
//                     selectedVariantName: item.varient?.name, // Assuming varient object is available
//                     selectedDesignName: item.design?.name,
//                     selectedSizeName: item.size?.name,
//                     price: parseFloat(item.price),
//                     mrp: parseFloat(item.mrp),
//                     quantity: item.quantity,
//                     image: item.product?.small_image ? `storage/${item.product.small_image}` : (item.product?.name.charAt(0) || 'P'),
//                     slug: item.product?.slug,
//                     product: item.product,
//                     varient: item.varient, // Ensure this matches the backend relationship name
//                     design: item.design,
//                     size: item.size,
//                 };
//             });

//             // Perform a deep comparison to prevent unnecessary state updates and re-renders.
//             // This is crucial because Inertia might pass the same data with a new object reference.
//             if (JSON.stringify(transformedInitialItems) !== JSON.stringify(cartItems)) {
//                 setCartItems(transformedInitialItems);
//                 console.log("CartContext: Hydrated cart items from initial props.");
//             }
//         } else if (initialCartItems && initialCartItems.length === 0 && cartItems.length > 0) {
//             // If initialCartItems becomes explicitly empty (e.g., after a clear cart action from backend), clear local state
//             setCartItems([]);
//             console.log("CartContext: Cleared local cart as initial props were empty.");
//         }
//     }, [initialCartItems]); // CRITICAL: Only initialCartItems as a dependency here.

//     // Effect 2: Save cart items to localStorage whenever cartItems state changes.
//     // This effect is separate and correctly depends on `cartItems`.
//     useEffect(() => {
//         try {
//             localStorage.setItem('cartItems', JSON.stringify(cartItems));
//         } catch (error) {
//             console.error("Failed to save cart items to localStorage:", error);
//         }
//     }, [cartItems]);

//     // Function to add an item to the cart or update its quantity if it already exists
//     const addItemToCart = useCallback((product, quantity = 1) => {
//         if (!product || !product.product_id || quantity <= 0) {
//             console.warn("Attempted to add invalid product or quantity to cart.");
//             return;
//         }

//         setCartItems(prevItems => {
//             const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
//             let updatedCart;

//             if (existingItemIndex > -1) {
//                 updatedCart = [...prevItems];
//                 updatedCart[existingItemIndex] = {
//                     ...updatedCart[existingItemIndex],
//                     quantity: updatedCart[existingItemIndex].quantity + quantity
//                 };
//             } else {
//                 updatedCart = [...prevItems, { ...product, quantity }];
//             }
//             return updatedCart;
//         });
//     }, []);

//     // removeItemFromCart: updates local state only
//     const removeItemFromCart = useCallback((compositeProductId) => {
//         setCartItems(prevItems => prevItems.filter(item => item.id !== compositeProductId));
//     }, []);

//     // updateItemQuantity: updates local state only
//     const updateItemQuantity = useCallback((compositeProductId, newQuantity) => {
//         setCartItems(prevItems => {
//             if (newQuantity <= 0) {
//                 return prevItems.filter(item => item.id !== compositeProductId);
//             } else {
//                 return prevItems.map(item =>
//                     item.id === compositeProductId ? { ...item, quantity: newQuantity } : item
//                 );
//             }
//         });
//     }, []);

//     // clearCart: updates local state only
//     const clearCart = useCallback(() => {
//         setCartItems([]);
//     }, []);


//     // Calculate total quantity of items in the cart (for header icon)
//     const totalItems = useMemo(() => {
//         const count = cartItems.reduce((total, item) => total + item.quantity, 0);
//         return count;
//     }, [cartItems]);

//     // Calculate total price of items in the cart (for header icon, if needed)
//     const totalPrice = useMemo(() => {
//         const price = cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
//         return price;
//     }, [cartItems]);

//     // Value object to be provided by the context
//     const cartContextValue = useMemo(() => ({
//         cartItems,
//         totalItems,
//         totalPrice,
//         addItemToCart,
//         removeItemFromCart,
//         updateItemQuantity,
//         clearCart,
//         fetchCartItemsFromBackend, // EXPORT THE NEW FUNCTION
//     }), [cartItems, totalItems, totalPrice, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart, fetchCartItemsFromBackend]);

//     return (
//         <CartContext.Provider value={cartContextValue}>
//             {children}
//         </CartContext.Provider>
//     );
// };


import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */

const isBrowser = typeof window !== "undefined";

/* -------------------------------------------------------
   Context
------------------------------------------------------- */

const CartContext = createContext(null);

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return ctx;
};

/* -------------------------------------------------------
   Provider
------------------------------------------------------- */

export const CartProvider = ({ children, initialCartItems = [] }) => {
    /* ---------------- STATE ---------------- */

    const [cartItems, setCartItems] = useState(() => {
        if (!isBrowser) return [];

        try {
            const stored = localStorage.getItem("cartItems");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    /* ---------------- EFFECTS ---------------- */

    // Hydrate from backend-provided props (safe for SSR)
    useEffect(() => {
        if (!initialCartItems || !Array.isArray(initialCartItems)) return;

        setCartItems(initialCartItems);
    }, [initialCartItems]);

    // Persist to localStorage (browser only)
    useEffect(() => {
        if (!isBrowser) return;

        try {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } catch {}
    }, [cartItems]);

    /* ---------------- ACTIONS ---------------- */

    const addItemToCart = useCallback((product, quantity = 1) => {
        if (!product || quantity <= 0) return;

        setCartItems((prev) => {
            const idx = prev.findIndex((i) => i.id === product.id);
            if (idx !== -1) {
                const next = [...prev];
                next[idx] = {
                    ...next[idx],
                    quantity: next[idx].quantity + quantity,
                };
                return next;
            }
            return [...prev, { ...product, quantity }];
        });
    }, []);

    const removeItemFromCart = useCallback((id) => {
        setCartItems((prev) => prev.filter((i) => i.id !== id));
    }, []);

    const updateItemQuantity = useCallback((id, qty) => {
        setCartItems((prev) =>
            qty <= 0
                ? prev.filter((i) => i.id !== id)
                : prev.map((i) =>
                      i.id === id ? { ...i, quantity: qty } : i
                  )
        );
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    /* ---------------- DERIVED ---------------- */

    const totalItems = useMemo(
        () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
        [cartItems]
    );

    const totalPrice = useMemo(
        () =>
            cartItems.reduce(
                (sum, i) => sum + Number(i.price || 0) * i.quantity,
                0
            ),
        [cartItems]
    );

    /* ---------------- CONTEXT VALUE ---------------- */

    const value = useMemo(
        () => ({
            cartItems,
            totalItems,
            totalPrice,
            addItemToCart,
            removeItemFromCart,
            updateItemQuantity,
            clearCart,
        }),
        [
            cartItems,
            totalItems,
            totalPrice,
            addItemToCart,
            removeItemFromCart,
            updateItemQuantity,
            clearCart,
        ]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};