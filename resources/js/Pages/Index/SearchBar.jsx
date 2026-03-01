import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react'; // For navigating to result pages

/**
 * SearchBar Component
 * Implements a real-time search bar that sends a request to the backend
 * after the user types at least 3 characters and pauses. It displays results
 * from various models (Cluster, Group, Product, Variant).
 *
 * @param {object} props - The component props.
 * @param {string} props.searchUrl - The backend URL for the search API (e.g., '/search').
 * @param {number} [props.debounceTime=300] - The delay in milliseconds before sending the search request.
 * @param {number} [props.minQueryLength=3] - Minimum characters required to trigger a search.
 */
const SearchBar = ({ searchUrl, debounceTime = 300, minQueryLength = 3, classes }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false); // Controls visibility of the results dropdown

    const searchTimeoutRef = useRef(null); // Ref to hold the debounce timeout
    const wrapperRef = useRef(null); // Ref for click-outside detection

    // Effect for handling debounced search requests
    useEffect(() => {
        // Clear previous timeout if user types again quickly
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Only search if query meets minimum length and is not empty
        if (query.length >= minQueryLength) {
            setLoading(true); // Set loading true while waiting for debounce
            setError(null);   // Clear previous errors

            searchTimeoutRef.current = setTimeout(async () => {
                try {
                    // Make the XHR request to the backend
                    const response = await fetch(`${searchUrl}?q=${encodeURIComponent(query)}`);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();

                    setResults(data);
                    setShowResults(true); // Show results only if data is fetched
                } catch (e) {
                    console.error("Search failed:", e);
                    setError("Failed to fetch search results. Please try again.");
                    setResults([]); // Clear results on error
                    setShowResults(true); // Still show the results container, but with error
                } finally {
                    setLoading(false); // Loading finished
                }
            }, debounceTime);
        } else {
            // If query is too short, hide and clear results/errors
            setResults([]);
            setLoading(false);
            setError(null);
            setShowResults(false);
        }

        // Cleanup function for when component unmounts or effect re-runs
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [query, searchUrl, debounceTime, minQueryLength]);

    // Effect for handling clicks outside the search bar to close results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value.length >= minQueryLength) {
            setShowResults(true); // Show results container as soon as query is long enough
        } else {
            setShowResults(false); // Hide results if query is too short
        }
    };

    const handleResultClick = () => {
        setQuery(''); // Clear query after clicking a result
        setResults([]); // Clear results
        setShowResults(false); // Hide results dropdown
    };

    return (
        <div className="relative " ref={wrapperRef}>
            <input
                type="text"
                className= {classes}
                placeholder="Search Products"
                value={query}
                onChange={handleInputChange}
                onFocus={() => { if (query.length >= minQueryLength) setShowResults(true); }}
            />
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {/* Search Results Dropdown */}
            {showResults && (query.length >= minQueryLength || loading || error) && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 overflow-hidden max-h-80 overflow-y-auto">
                    {loading && (
                        <div className="p-4 text-center text-gray-500">Loading...</div>
                    )}

                    {error && (
                        <div className="p-4 text-center text-red-500">{error}</div>
                    )}

                    {!loading && !error && results.length === 0 && query.length >= minQueryLength && (
                        <div className="p-4 text-center text-gray-500">No results found for "{query}".</div>
                    )}

                    {!loading && !error && results.length > 0 && (
                        <ul>
                            {results.map((item) => (
                                // Use clean slug URLs (no query params)
                                <li key={`${item.type}-${item.id}`} className="border-b border-gray-100 last:border-b-0">
                                    <Link
                                        href={`/${item.slug}`}
                                        className="flex items-center p-3 hover:bg-gray-50 transition-colors duration-200"
                                        onClick={handleResultClick}
                                    >
                                        <div className="flex-shrink-0 mr-3">
                                            {item.image && ( // Display image if available
                                                <img src={`storage/${item.image}`} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                                            )}
                                            {!item.image && ( // Placeholder if no image
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                                    {item.type[0].toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800">{item.name}</div>
                                            {item.description && (
                                                <div className="text-xs text-gray-400 mt-1 truncate">{item.description}</div>
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
