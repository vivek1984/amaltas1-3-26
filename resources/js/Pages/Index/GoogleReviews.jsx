import React, { useState, useEffect } from 'react';

/**
 * GoogleReviews Component
 * Fetches and displays Google reviews for the website.
 * Designed to be mobile-friendly with responsive styling.
 * It assumes a backend endpoint exists to securely proxy Google Places API requests.
 *
 * @param {object} props - The component props.
 * @param {string} props.reviewsApiUrl - The URL of your Laravel backend endpoint
 * that provides Google reviews data.
 * e.g., '/api/google-reviews'
 * @param {number} [props.maxReviews=10] - The maximum number of reviews to display.
 */
const GoogleReviews = ({ reviewsApiUrl, maxReviews = 10 }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await fetch(reviewsApiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                // Assuming the backend returns an array of reviews
                setReviews((data.reviews || []).slice(0, maxReviews));

            } catch (err) {
                console.error("Failed to fetch Google reviews:", err);
                setError("Failed to load reviews. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [reviewsApiUrl, maxReviews]);

    // Helper to render star ratings
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-4 h-4 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.153c.969 0 1.371 1.24.588 1.81l-3.35 2.434a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.35-2.434a1 1 0 00-1.176 0l-3.35 2.434c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L.595 9.384c-.783-.57-.381-1.81.588-1.81h4.153a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
            );
        }
        return <div className="flex items-center">{stars}</div>;
    };

    if (loading) {
        return (
            <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center rounded-lg shadow-md">
                <p className="text-gray-600 text-lg">Loading reviews...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-red-100 text-red-700 py-12 px-4 sm:px-6 lg:px-8 text-center rounded-lg shadow-md">
                <p className="font-semibold mb-2">Error:</p>
                <p>{error}</p>
                <p className="mt-2 text-sm">Please check your network connection or try again later.</p>
            </section>
        );
    }

    if (reviews.length === 0) {
        return (
            <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center rounded-lg shadow-md">
                <p className="text-gray-600 text-lg">No reviews available at the moment.</p>
            </section>
        );
    }

    // Calculate average rating and total reviews for summary
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 'N/A';
    const totalReviews = reviews.length; // This is actually the count of displayed reviews

    return (
        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-md font-inter">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                What Our Customers Say
            </h2>

            {/* Overall Rating Summary */}
            <div className="text-center mb-10">
                <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">{averageRating}</span>
                    {renderStars(Math.round(averageRating))} {/* Render stars based on rounded average */}
                </div>
                <p className="text-gray-600 text-sm">Based on {totalReviews} Reviews</p>
                {/* You might add a link to "Write a Review" here if desired */}
            </div>


            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
                        <div className="flex items-center mb-4">
                            {review.profile_photo_url ? (
                                <img
                                    src={review.profile_photo_url}
                                    alt={review.author_name}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/CCCCCC/666666?text=${review.author_name.charAt(0)}`; }}
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg mr-4">
                                    {review.author_name ? review.author_name.charAt(0).toUpperCase() : '?'}
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-gray-900">{review.author_name || 'Anonymous'}</p>
                                <p className="text-sm text-gray-500">{review.relative_time_description}</p>
                            </div>
                        </div>
                        <div className="mb-3">
                            {renderStars(review.rating)}
                        </div>
                        <p className="text-gray-700 text-sm flex-grow">"{review.text}"</p>
                        {review.original_language && review.original_language !== 'en' && (
                            <p className="text-xs text-gray-500 mt-2">({review.original_language} original)</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Optional: Link to all reviews or external Google page */}
            {/* <div className="text-center mt-10">
                <a href="YOUR_GOOGLE_REVIEWS_URL" target="_blank" rel="noopener noreferrer"
                   className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
                    Read all reviews on Google
                </a>
            </div> */}
        </section>
    );
};

export default GoogleReviews;
