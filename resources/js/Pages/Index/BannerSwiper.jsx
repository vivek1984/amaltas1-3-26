import React, { useState, useEffect } from 'react';

/**
 * BannerSwiper Component
 * A responsive image carousel (swiper) for displaying banners.
 * It features auto-play, navigation arrows, and pagination dots.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.banners - An array of banner objects.
 * Each object should have:
 * - {string} src: The URL of the banner image.
 * - {string} alt: The alt text for the banner image.
 * - {string} [link]: Optional URL to navigate to when the banner is clicked.
 * @param {number} [props.interval=5000] - Time in milliseconds between auto-slides. Set to 0 to disable auto-play.
 * @param {boolean} [props.showNavigation=true] - Whether to show next/previous arrows.
 * @param {boolean} [props.showPagination=true] - Whether to show pagination dots.
 */
const BannerSwiper = ({ banners, interval = 5000, showNavigation = true, showPagination = true }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Effect for auto-play functionality
    useEffect(() => {
        if (interval > 0 && banners.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
            }, interval);
            return () => clearInterval(timer); // Cleanup on component unmount or dependency change
        }
    }, [banners, interval]);

    // Go to the next slide
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    };

    // Go to the previous slide
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + banners.length) % banners.length);
    };

    // Go to a specific slide (used by pagination dots)
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    if (!banners || banners.length === 0) {
        return (
            <div className="w-full bg-gray-200 flex items-center justify-center py-12 rounded-lg text-gray-500 text-lg min-h-[200px] md:min-h-[300px]">
                No banners to display.
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden rounded-lg shadow-xl aspect-video md:aspect-[16/6] bg-gray-100">
            {/* Image Container */}
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {banners.map((banner, index) => (
                    <div key={index} className="w-full flex-shrink-0 h-full">
                        {banner.link ? (
                            <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                <img
                                    src={banner.src}
                                    alt={banner.alt}
                                    className="w-full object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/1200x400/E0E0E0/A0A0A0?text=Error`; }}
                                />
                            </a>
                        ) : (
                            <img
                                src={banner.src}
                                alt={banner.alt}
                                className="w-full object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/1200x400/E0E0E0/A0A0A0?text=Error`; }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {showNavigation && banners.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all focus:outline-none"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all focus:outline-none"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </>
            )}

            {/* Pagination Dots */}
            {showPagination && banners.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                currentSlide === index ? 'bg-white' : 'bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BannerSwiper;
