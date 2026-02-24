import React from 'react';

export default function CartDisplay({
    cartItems,
    totalItems,
    totalPrice,
    onRemoveItem,
    onUpdateQuantity,
    onClearCart,
    onProceedToCheckout,
}) {
    // Helper to calculate discount percentage
    const calculateDiscountPercentage = (mrp, price) => {
        if (typeof mrp === 'number' && typeof price === 'number' && mrp > 0) {
            const discount = mrp - price;
            const percentage = (discount / mrp) * 100;
            return Math.round(percentage);
        }
        return 0;
    };

    return (
        <div className="container mx-auto px-4 py-8 font-inter">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Your Shopping Cart</h1>

            {cartItems && cartItems.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Items ({totalItems})</h2>
                        {cartItems.map((item, index) => (
                            <div key={item.row_id ?? `${item.id}-${index}`} className="flex flex-col sm:flex-row items-center border-b border-gray-200 py-4 last:border-b-0">
                                {/* Product Image */}
                                <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden mb-4 sm:mb-0 sm:mr-4">
                                    <img
                                        src={`/storage/${item.product?.small_image}`}
                                        alt={item.product?.name || 'Product'}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/96x96/FF0000/FFFFFF?text=Error`; }}
                                    />
                                </div>

                                {/* Item Details */}
                                <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
                                    <h3 className="text-lg font-semibold text-gray-900">{item.product?.name || 'Unknown Product'}</h3>
                                    {item.variant && <p className="text-sm text-gray-600">Variant: {item.variant.name}</p>}
                                    {item.design && <p className="text-sm text-gray-600">Design: {item.design.name}</p>}
                                    {item.size && <p className="text-sm text-gray-600">Size: {item.size.name}</p>}
                                    <div className="flex items-baseline justify-center sm:justify-start mt-2">
                                        <p className="text-gray-500 text-sm line-through mr-2">MRP: ₹{parseFloat(item.mrp).toFixed(2)}</p>
                                        <p className="text-lg font-bold text-maroon-700">₹{parseFloat(item.price).toFixed(2)}</p>
                                        <p className="text-sm text-blue-600 ml-2">({calculateDiscountPercentage(parseFloat(item.mrp), parseFloat(item.price))}% Off)</p>
                                    </div>
                                </div>

                                {/* Quantity Controls + Remove */}
                                <div className="flex flex-col items-center sm:items-end sm:ml-auto">
                                    <div className="flex items-center mb-2">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="px-3 py-1 bg-gray-200 rounded-l-md text-lg font-bold hover:bg-gray-300"
                                        >
                                            −
                                        </button>
                                        <div className="w-14 text-center border-t border-b border-gray-300 py-1">
                                            {item.quantity}
                                        </div>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 bg-gray-200 rounded-r-md text-lg font-bold hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => onRemoveItem(item.id)}
                                        className="text-red-600 hover:text-red-800 text-sm font-semibold transition-colors duration-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal ({totalItems} items)</span>
                                <span>₹{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3 mt-3">
                                <span>Order Total</span>
                                <span>₹{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            onClick={onProceedToCheckout}
                            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            onClick={onClearCart}
                            className="w-full mt-4 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-300 transition-colors duration-200 shadow-md"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <p className="text-gray-600 text-xl">Your cart is empty.</p>
                    <p className="text-gray-500 mt-2">Start shopping to add items!</p>
                </div>
            )}
        </div>
    );
}




// import React, { useMemo } from 'react';

// /**
//  * CartDisplay Component
//  * A purely presentational component that displays the contents of the shopping cart.
//  * It receives all necessary data and action handlers as props.
//  * It does NOT directly interact with CartContext.
//  *
//  * @param {object} props - The component props.
//  * @param {Array<object>} props.cartItems - An array of cart item objects.
//  * Each item should have:
//  * - {string} id: Unique composite ID (e.g., v1-d10-s100).
//  * - {object} product: Eager-loaded product object { id, name, small_image }.
//  * - {object|null} variant: Eager-loaded variant object { id, name } or null.
//  * - {object|null} design: Eager-loaded design object { id, name } or null.
//  * - {object|null} size: Eager-loaded size object { id, name } or null.
//  * - {number} quantity: Quantity of this item in the cart.
//  * - {string} price: Price of the item.
//  * - {string} mrp: MRP of the item.
//  * @param {number} props.totalItems - Total count of items in the cart.
//  * @param {number} props.totalPrice - Total price of items in the cart.
//  * @param {function} props.onRemoveItem - Callback function to remove an item. (compositeProductId: string) => void
//  * @param {function} props.onUpdateQuantity - Callback function to update item quantity. (compositeProductId: string, newQuantity: number) => void
//  * @param {function} props.onClearCart - Callback function to clear the entire cart. () => void
//  * @param {function} props.onProceedToCheckout - Callback function to proceed to checkout. () => void
//  */
// export default function CartDisplay({
//     cartItems,
//     totalItems,
//     totalPrice,
//     onRemoveItem,
//     onUpdateQuantity,
//     onClearCart,
//     onProceedToCheckout,
// }) {
//     // Helper to calculate discount percentage
//     const calculateDiscountPercentage = (mrp, price) => {
//         if (typeof mrp === 'number' && typeof price === 'number' && mrp > 0) {
//             const discount = mrp - price;
//             const percentage = (discount / mrp) * 100;
//             return Math.round(percentage);
//         }
//         return 0;
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 font-inter">
//             <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Your Shopping Cart</h1>

//             {cartItems && cartItems.length > 0 ? (
//                 <div className="flex flex-col lg:flex-row gap-8">
//                     {/* Cart Items List */}
//                     <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
//                         <h2 className="text-2xl font-bold text-gray-800 mb-6">Items ({totalItems})</h2>
//                         {cartItems.map((item) => (
//                             <div key={item.id} className="flex flex-col sm:flex-row items-center border-b border-gray-200 py-4 last:border-b-0">
//                                 {/* Product Image */}
//                                 <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden mb-4 sm:mb-0 sm:mr-4">
//                                     <img
//                                         src={`/storage/${item.product?.small_image}`}
//                                         alt={item.product?.name || 'Product'}
//                                         className="w-full h-full object-cover"
//                                         onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/96x96/FF0000/FFFFFF?text=Error`; }}
//                                     />
//                                 </div>

//                                 {/* Item Details */}
//                                 <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
//                                     <h3 className="text-lg font-semibold text-gray-900">{item.product?.name || 'Unknown Product'}</h3>
//                                     {item.variant && <p className="text-sm text-gray-600">Variant: {item.variant.name}</p>}
//                                     {item.design && <p className="text-sm text-gray-600">Design: {item.design.name}</p>}
//                                     {item.size && <p className="text-sm text-gray-600">Size: {item.size.name}</p>}
//                                     <div className="flex items-baseline justify-center sm:justify-start mt-2">
//                                         <p className="text-gray-500 text-sm line-through mr-2">MRP: ₹{parseFloat(item.mrp).toFixed(2)}</p>
//                                         <p className="text-lg font-bold text-maroon-700">₹{parseFloat(item.price).toFixed(2)}</p>
//                                         <p className="text-sm text-blue-600 ml-2">({calculateDiscountPercentage(parseFloat(item.mrp), parseFloat(item.price))}% Off)</p>
//                                     </div>
//                                 </div>

//                                 {/* Quantity and Remove Button */}
//                                 <div className="flex flex-col items-center sm:items-end sm:ml-auto">
//                                     <div className="flex items-center mb-2">
//                                         <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
//                                         <input
//                                             type="number"
//                                             id={`quantity-${item.id}`}
//                                             value={item.quantity}
//                                             onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
//                                             min="1"
//                                             className="w-20 p-2 border border-gray-300 rounded-md text-center focus:ring-maroon-500 focus:border-maroon-500"
//                                         />
//                                     </div>
//                                     <button
//                                         onClick={() => onRemoveItem(item.id)}
//                                         className="text-red-600 hover:text-red-800 text-sm font-semibold transition-colors duration-200"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
//                         <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
//                         <div className="space-y-3 mb-6">
//                             <div className="flex justify-between text-gray-700">
//                                 <span>Subtotal ({totalItems} items)</span>
//                                 <span>₹{totalPrice.toFixed(2)}</span>
//                             </div>
//                             <div className="flex justify-between text-gray-700">
//                                 <span>Shipping</span>
//                                 <span>Calculated at checkout</span>
//                             </div>
//                             <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3 mt-3">
//                                 <span>Order Total</span>
//                                 <span>₹{totalPrice.toFixed(2)}</span>
//                             </div>
//                         </div>
//                         <button
//                             onClick={onProceedToCheckout}
//                             className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
//                         >
//                             Proceed to Checkout
//                         </button>
//                         <button
//                             onClick={onClearCart}
//                             className="w-full mt-4 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-300 transition-colors duration-200 shadow-md"
//                         >
//                             Clear Cart
//                         </button>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="bg-white p-8 rounded-lg shadow-md text-center">
//                     <p className="text-gray-600 text-xl">Your cart is empty.</p>
//                     <p className="text-gray-500 mt-2">Start shopping to add items!</p>
//                     {/* You might add a link to your products page here */}
//                 </div>
//             )}
//         </div>
//     );
// }
