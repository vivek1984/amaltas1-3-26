export default function WhyUs() {
    return (
        <>

        {/* Why Choose Us – Clean White Section */}
        <section className="my-12 px-4">
            <div className="bg-white rounded-2xl p-6 max-w-6xl mx-auto">


{/* Accent */}
                <div className="w-20 h-1.5 bg-[#993333] mx-auto mb-5 rounded-full"></div>

                {/* Heading */}
                <h2 className="text-3xl font-extrabold text-[#800000] text-center mb-8 tracking-wide">
                    Why Choose Amaltas?
                </h2>

                {/* USP Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {[
                        { title: "In-House Manufacturing", text: "Precision-built furniture from our own production facility ensures consistent quality." },
                        { title: "Factory-Direct Pricing", text: "Premium furniture at genuine prices with zero middleman margins." },
                        { title: "Customization Options", text: "Tailor-made finishes, materials, and dimensions that fit your home perfectly." },
                        { title: "Premium Hardware", text: "Soft-close channels, quality hinges, and durable fittings for long-lasting build." },
                        { title: "Fast Delivery & Installation", text: "Efficient timelines with expert installation teams for a seamless experience." },
                        { title: "Trusted by 1000+ Families", text: "A reputation built on quality, craftsmanship, and reliable service in Dehradun." },
                    ].map((usp, index) => (
                        <div
                            key={index}
                            className="p-6 bg-amber-100 text-white rounded-xl shadow-md
                                       hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                        >
                            <h3 className="font-semibold text-xl text-center mb-3 leading-snug text-maroon-900">
                                {usp.title}
                            </h3>

                            <p className="text-sm leading-relaxed text-justify px-1 text-maroon-700">
                                {usp.text}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>

        </>
    );
};
