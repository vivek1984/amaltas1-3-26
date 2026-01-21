import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons for navigation
import { Link } from '@inertiajs/react'; // Assuming @inertiajs/react Link for navigation

/**
 * RelatedProducts Component
 * Displays an endless, auto-swiping, and touch-enabled carousel of products.
 * Each product card shows an image, product name, MRP, and price,
 * and is clickable to navigate to the respective product page.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.products - An array of product objects to display in the carousel.
 * Expected product object structure:
 * {
 * id: number,
 * name: string,
 * price: number,
 * mrp: number,
 * main_image_url: string, // URL for the main product image
 * slug?: string // Optional slug for clean URLs
 * }
 * @param {number} [props.autoSlideInterval=3000] - Time in milliseconds between auto-slides.
 * @param {number} [props.itemsToShow=4] - Number of items to show at once on larger screens.
 */
const RelatedProducts = ({ products: initialProducts, autoSlideInterval = 3000, itemsToShow = 4 }) => {
    // Convert the incoming products object (with potential non-sequential keys) into a proper array
    // This is the crucial fix for the data format issue from Laravel backend.
    const products = Object.values(initialProducts);

    // Number of cloned items at each end for the endless effect
    // Ensure CLONE_COUNT is not more than products.length to avoid issues with slice
    const CLONE_COUNT = products.length > 0 ? Math.min(products.length, itemsToShow) : 0;


    // Create the "endless" array by cloning items
    const endlessProducts = products.length > 0
        ? [...products.slice(-CLONE_COUNT), ...products, ...products.slice(0, CLONE_COUNT)]
        : [];

    // State for the current index of the carousel
    // Start at CLONE_COUNT to be on the first actual product
    const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
    // State to control CSS transition (enabled during slide, disabled during jumps)
    const [isTransitioning, setIsTransitioning] = useState(true);

    // Ref for the carousel track element to measure its width for swipe calculations
    const trackRef = useRef(null);
    // Refs for touch events
    const touchStartX = useRef(0);
    const currentTranslateX = useRef(0);

    // Effect for auto-play functionality
    useEffect(() => {
        // Only start auto-slide if there are actually more items than can be shown at once
        if (products.length <= itemsToShow) {
             // If not enough items, reset currentIndex to 0 (no clones needed, no endless loop)
             setCurrentIndex(0);
             return;
        }

        const timer = setInterval(() => {
            setIsTransitioning(true);
            setCurrentIndex(prevIndex => prevIndex + 1);
        }, autoSlideInterval);

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, [products.length, autoSlideInterval, itemsToShow]); // Depend on products.length to restart if data changes

    // Effect for handling the "endless" loop logic (resetting index without visual jump)
    useEffect(() => {
        if (endlessProducts.length === 0 || products.length <= itemsToShow) return; // No endless loop if not enough items

        // If we've slid to the cloned beginning (past the last original item)
        if (currentIndex >= endlessProducts.length - CLONE_COUNT) {
            // After the transition completes, jump back to the actual start
            setTimeout(() => {
                setIsTransitioning(false); // Disable transition for instant jump
                setCurrentIndex(CLONE_COUNT); // Jump back to the beginning of actual products
                // Re-enable transition after a very short delay for next slide
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => setIsTransitioning(true));
                });
            }, 700); // Match this with your CSS transition duration
        }
        // If we've slid to the cloned end (before the first original item)
        else if (currentIndex < CLONE_COUNT && currentIndex !== 0) {
             // This case is primarily for manual reverse swipes
             setTimeout(() => {
                setIsTransitioning(false); // Disable transition for instant jump
                // Jump back to the equivalent position in the original product array (end of actual products)
                setCurrentIndex(products.length); // Corrected to point to the end of the original list
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => setIsTransitioning(true));
                });
            }, 700); // Match this with your CSS transition duration
        }
    }, [currentIndex, endlessProducts.length, CLONE_COUNT, products.length]); // Added products.length to dependencies


    // Calculate the translation value for the carousel
    const getTranslateX = () => {
        if (!trackRef.current || endlessProducts.length === 0) return 0;

        // Get the width of a single item (assuming all items have equal width within the flex container)
        // Ensure trackRef.current.children[0] exists before accessing offsetWidth
        const itemWidth = trackRef.current.children[0]?.offsetWidth || 0;
        // Calculate the total offset
        return -currentIndex * itemWidth;
    };

    // --- Touch Event Handlers for Swiping ---
    const handleTouchStart = (e) => {
        setIsTransitioning(false); // Disable transition during touch/drag
        touchStartX.current = e.touches[0].clientX;
        currentTranslateX.current = getTranslateX(); // Store current visual position
    };

    const handleTouchMove = (e) => {
        const touchCurrentX = e.touches[0].clientX;
        const diffX = touchCurrentX - touchStartX.current;
        // Update the style directly for smooth dragging without re-rendering
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${currentTranslateX.current + diffX}px)`;
        }
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchEndX - touchStartX.current;

        // Determine if a significant swipe occurred
        const swipeThreshold = trackRef.current ? trackRef.current.offsetWidth / (itemsToShow * 4) : 50; // Threshold can be dynamic

        setIsTransitioning(true); // Re-enable transition for snapping

        if (diffX > swipeThreshold) {
            // Swipe right (previous item)
            setCurrentIndex(prevIndex => prevIndex - 1);
        } else if (diffX < -swipeThreshold) {
            // Swipe left (next item)
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            // Not a strong enough swipe, snap back to original position
            // Trigger a re-render to apply the correct currentIndex translateX
            setCurrentIndex(prevIndex => prevIndex); // This is a trick to force re-render with existing index
        }
    };

    // If no products are provided after conversion to array, return null
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="mt-12 py-8 bg-gray-50 rounded-lg shadow-inner overflow-hidden relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Related Products</h3>

            <div className="relative overflow-hidden w-full px-4">
                <div
                    ref={trackRef}
                    // Only apply transition if isTransitioning is true. This allows instant jumps.
                    className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-out' : ''}`}
                    style={{ transform: `translateX(${getTranslateX()}px)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {endlessProducts.map((product, index) => (
                        <div
                            // Using a combination of product.id and index for key to ensure uniqueness even with clones
                            key={`${product.id}-${index}`}
                            // Tailwind classes for responsive item width (e.g., w-1/4 for 4 items, w-1/3 for 3, w-1/2 for 2, w-full for 1)
                            // We use flex-shrink-0 to ensure items don't shrink
                            className={`flex-shrink-0 p-2
                                ${itemsToShow === 1 ? 'w-full' : ''}
                                ${itemsToShow === 2 ? 'w-1/2' : ''}
                                ${itemsToShow === 3 ? 'w-1/2 sm:w-1/3' : ''}
                                ${itemsToShow >= 4 ? 'w-1/2 sm:w-1/3 lg:w-1/4' : ''}
                            `}
                        >
                            <Link
                                href={`/${product.slug}`} // Ensure your slug is correctly formatted for the link
                                data = {{'id': 'product'}} // Passing data for potential backend tracking (Inertia specific)
                                className=" bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col"
                            >
                                {/* Product Image */}
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={`/storage/${product.small_image}`} // Assuming 'small_image' is the property containing the image path
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/256x256/E0E0E0/A0A0A0?text=No+Image`; }}
                                    />
                                </div>
                                <div className="p-4 flex-grow flex flex-col justify-between">
                                    {/* Product Name */}
                                    <h4 className="text-lg font-semibold text-gray-800 truncate mb-2">
                                        {product.name}
                                    </h4>
                                    {/* MRP and Price */}
                                    <div className="flex items-baseline justify-between">
                                        <p className="text-gray-500 text-sm line-through">
                                            MRP: ₹{product.mrp || 'N/A'}
                                        </p>
                                        <p className="text-xl font-bold text-maroon-700">
                                            ₹{product.price || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {/* Navigation Dots (only show if there are enough products to scroll) */}
            {products.length > itemsToShow && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {products.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsTransitioning(true);
                                setCurrentIndex(CLONE_COUNT + index);
                            }}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                // Highlight dot if the current visible item (after accounting for clones) matches
                                // The calculation (currentIndex - CLONE_COUNT) maps the endless index back to the original products array index
                                currentIndex - CLONE_COUNT === index ? 'bg-maroon-600' : 'bg-gray-400'
                            }`}
                            aria-label={`Go to product ${index + 1}`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RelatedProducts;
