import { Link, usePage } from "@inertiajs/react";
import Welcome from "../Welcome";

export default function ClusterIndex({ cluster, clusters }) {
    const { url } = usePage();
    const pathname = url.split('?')[0];
    const isModularKitchenPath = pathname.includes('modular-kitchens');


    function getPriceStrip(product) {
        const firstVariant = product.varients?.[0];
        if (!firstVariant) return null;

        return (
            <span key={firstVariant.id} className="block mt-1 text-xs">
                <span className="flex justify-between">
                    <span className="text-red-600 line-through">₹{firstVariant.mrp}</span>
                    <span className="text-green-700 font-semibold">₹{firstVariant.price}</span>
                    <span className="text-gray-600">
                        {Math.round(((firstVariant.mrp - firstVariant.price) * 100) / firstVariant.mrp)}% OFF
                    </span>
                </span>
            </span>
        );
    }

    if (!cluster) {
        return (
            <div className="text-gray-600 p-8 text-center bg-white rounded-lg shadow-md">
                No cluster data provided.
            </div>
        );
    }

    const { name, description, groups, products } = cluster;

    // ------------------ SEO META ------------------
    const pageTitle = `${name} | Amaltas Furniture & Modular Kitchens`;
    const pageDescription =
        description ||
        `Explore premium ${name.toLowerCase()} at Amaltas Furniture & Modular Kitchens, Dehradun. Factory-direct pricing with in-house manufacturing.`;

    return (
        <Welcome
            clusters={clusters}
            title={pageTitle}
            description={pageDescription}
        >
            <div className="min-h-screen font-inter">

                {/* ---------- CLUSTER HEADER ---------- */}
                <header className="bg-white rounded-lg mt-4 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{name}</h1>
                    <p className="text-gray-600 text-lg mx-auto">{description}</p>
                </header>

                                {/* ---------- MODULAR KITCHEN CTA ---------- */}
                {isModularKitchenPath && (
                    <div className="bg-gradient-to-r from-maroon-700 to-maroon-500  shadow-md p-6 mb-6 text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Get Estimate for Your Kitchen
                        </h2>
                        <p className="text-white/90 mb-4">
                            Design your modular kitchen with factory-direct pricing.
                        </p>

                        <Link
                            href={route('kitchen-cost-calculator')}
                            className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
                        >
                            Get Free Estimate
                        </Link>
                    </div>
                )}

                {/* ---------- GROUPS SECTION ---------- */}
                {groups && groups.length > 0 && (
                    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
                            Explore {name} Categories
                        </h2>

                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            {groups.map((group) => (
                                <Link
                                    key={group.slug}
                                    href={`/${group.slug}`}
                                    data={{ id: "group" }}
                                    className="flex flex-col items-center group transform transition duration-200 hover:scale-105 p-2"
                                >
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-gray-300 group-hover:border-blue-500 shadow-md transition-colors duration-200">
                                        <img
                                            src={`/storage/${group.image}`}
                                            alt={`${group.name} category - ${name}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://placehold.co/112x112/E0E0E0/A0A0A0?text=${group.name.charAt(0)}`;
                                            }}
                                        />
                                    </div>
                                    <p className="mt-3 text-base font-medium text-gray-700 group-hover:text-blue-700 text-center px-2">
                                        {group.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* ---------- PRODUCTS SECTION ---------- */}
                {products && products.length > 0 && (
                    <section className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                            {name} Products
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                            {products.map((product) => (
                                <Link
                                    key={product.slug}
                                    href={`/${product.slug}`}
                                    data={{ id: "product" }}
                                    className="block rounded-lg overflow-hidden shadow-xl hover:shadow-lg transition duration-200 border p-4"
                                >
                                    <img
                                        src={`/storage/${product.small_image}`}
                                        alt={`${product.name} - ${name}`}
                                        className="h-[80%] object-cover rounded-md mb-4 mx-auto"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://placehold.co/192x192/E0E0E0/A0A0A0?text=Product`;
                                        }}
                                    />

                                    <h3 className="text-sm font-semibold text-gray-800">
                                        {product.name}
                                    </h3>

                                    {getPriceStrip(product)}
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* ---------- EMPTY STATE ---------- */}
                {(!groups || groups.length === 0) &&
                    (!products || products.length === 0) && (
                        <div className="text-gray-600 p-8 text-center bg-white rounded-lg shadow-md">
                            No groups or products available in this category.
                        </div>
                    )}
            </div>
        </Welcome>
    );
}
