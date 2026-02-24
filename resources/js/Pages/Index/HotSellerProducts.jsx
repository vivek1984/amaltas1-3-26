export default function HotSellerProducts({ products = [] }) {
    return (
        <>

        {/* Hot Seller Products Section */}
        <section className="my-12 px-4">
            <div className="bg-white rounded-2xl p-8 shadow-md max-w-7xl mx-auto">

                {/* Accent Bar */}
                <div className="w-24 h-1.5 bg-[#993333] mx-auto mb-5 rounded-full"></div>

                {/* Heading */}
                <h2 className="text-3xl font-extrabold text-[#993333] text-center tracking-wide mb-10">
                    Hot-seller Products
                </h2>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">

                    {products.slice(0, 20).map((product, index) => (
                        <a
                            key={index}
                           href={`${product.slug}?id=product`}

                            className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl
                                       transition-all hover:scale-[1.03] duration-300"
                        >
                            {/* Large Product Image */}
                            <div className="w-full h-44 sm:h-52 md:h-56 bg-gray-100">
                                <img
                                    src={`/storage/${product.small_image}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/500x500/E0E0E0/888?text=Image";
                                    }}
                                />
                            </div>

                            {/* Product Name */}
                            <div className="p-3">
                                <h3 className="font-semibold text-sm text-gray-800 text-center leading-snug">
                                    {product.name}
                                </h3>

                                {/* Price Strip */}
                                {product.varients?.length > 0 && (
                                    <div className="text-center mt-2 text-sm">
                                        <span className="text-red-600 line-through">
                                            ₹{product.varients[0].mrp}
                                        </span>{" "}
                                        <span className="text-green-700 font-semibold">
                                            ₹{product.varients[0].price}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </a>
                    ))}

                </div>
            </div>
        </section>

        </>
    );
};