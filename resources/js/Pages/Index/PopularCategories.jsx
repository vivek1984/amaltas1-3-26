import React, { useMemo } from 'react';
import { Link } from '@inertiajs/react';

/**
 * PopularCategories Component
 * Displays a grid of categories (Clusters and Groups) with their images and names,
 * linking to their detail pages. It identifies and displays the top 10 most clicked
 * unique categories from the provided cluster and group data. Duplicates are removed
 * and replaced by the next unique most-clicked item.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.clusters - An array of cluster objects.
 * Each cluster object should have:
 * - {string|number} id: Unique identifier for the cluster.
 * - {string} name: The name of the cluster.
 * - {string} image: The path to the cluster's image (relative to /storage/).
 * - {string} slug: The URL slug for the cluster.
 * - {number} [clicks=0]: The number of clicks for the cluster (defaults to 0 if not provided).
 * - {Array<object>} groups: An array of associated group objects.
 * Each group object should have:
 * - {string|number} id: Unique identifier for the group.
 * - {string} name: The name of the group.
 * - {string} image_url: The path to the group's image (relative to /storage/).
 * - {string} slug: The URL slug for the group.
 * - {number} [clicks=0]: The number of clicks for the group (defaults to 0 if not provided).
 */
const PopularCategories = ({ clusters }) => {
    // Use useMemo to perform the data transformation and sorting efficiently.
    // This calculation will only re-run if the 'clusters' prop changes.
    const topCategories = useMemo(() => {
        if (!clusters || clusters.length === 0) {
            return [];
        }

        let allCategories = [];

        // Flatten clusters and their nested groups into a single array
        clusters.forEach(cluster => {
            // Add the cluster itself to the list
            allCategories.push({
                id: cluster.id,
                name: cluster.name,
                image: cluster.image, // Cluster image path
                slug: cluster.slug,
                clicks: cluster.clicks || 0, // Default to 0 if clicks is undefined
                type: 'cluster' // Identifier for dynamic linking
            });

            // Add its associated groups
            if (cluster.groups && Array.isArray(cluster.groups)) {
                cluster.groups.forEach(group => {
                    allCategories.push({
                        id: group.id,
                        name: group.name,
                        image: group.image, // Group uses 'image_url', rename to 'image' for consistency
                        slug: group.slug,
                        clicks: group.clicks || 0, // Default to 0 if clicks is undefined
                        type: 'group' // Identifier for dynamic linking
                    });
                });
            }
        });

        // Sort the combined list by 'clicks' in descending order first
        allCategories.sort((a, b) => b.clicks - a.clicks);

        // --- Deduplication Logic ---
        const uniqueCategories = [];
        const seen = new Set(); // To store unique identifiers like 'cluster-1', 'group-abc'
        const desiredCount = 10; // The desired number of top unique categories to display

        for (const category of allCategories) {
            const uniqueKey = `${category.type}-${category.id}`; // Create a unique key for each item

            if (!seen.has(uniqueKey)) {
                uniqueCategories.push(category);
                seen.add(uniqueKey);
            }

            // Stop if we have collected enough unique categories
            if (uniqueCategories.length >= desiredCount) {
                break;
            }
        }
        // --- End Deduplication Logic ---

        // Return the top 'desiredCount' unique categories.
        // If there are fewer than 'desiredCount' unique categories, it will return all of them.
        return uniqueCategories;

    }, [clusters]); // Dependency array: recalculate only when 'clusters' prop changes


    // Display a message if no categories are found after processing
    if (topCategories.length === 0) {
        return (
            <div className="text-gray-600 p-8 text-center bg-white rounded-lg shadow-md">
                No popular categories to display at the moment.
            </div>
        );
    }

    return (
        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-maroon-900 mb-8 text-center">
                Popular Categories
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 justify-items-center">
                {topCategories.map((category) => (
                    <Link
                        // Create a unique key for each item in the flattened list (type-id)
                        key={`${category.type}-${category.slug}`}
                        // Dynamically build the href based on the category type (e.g., /clusters/slug or /groups/slug)
                        href={category.slug}
                        data = {{ 'id': category.type}}
                        className="flex flex-col items-center group transform transition-transform duration-200 hover:scale-105"
                    >
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-maroon-400 group-hover:border-maroon-600 transition-colors duration-200 shadow-md">
                            <img
                                src={`/storage/${category.image}`} // Use the standardized 'image' property
                                alt={category.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    e.target.onerror = null;
                                    e.target.src = `https://placehold.co/112x112/E0E0E0/A0A0A0?text=${category.name.charAt(0)}`;
                                }}
                            />
                        </div>

                        <p className="mt-3 text-sm sm:text-base font-medium text-gray-700 group-hover:text-maroon-700 text-center px-2">
                            {category.name}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default PopularCategories;
