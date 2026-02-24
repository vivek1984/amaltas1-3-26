export default function HowWeWork() {
    return (
        <>

        {/* How We Work – Premium Redesign with Softer Maroon */}
        <section className="my-12 px-4">
            <div className="bg-white rounded-2xl p-6 max-w-6xl mx-auto">

                {/* Accent */}
                <div className="w-20 h-1.5 bg-[#800000] mx-auto mb-5 rounded-full"></div>

                {/* Heading */}
                <h2 className="text-3xl font-extrabold text-[#800000] text-center tracking-wide mb-10">
                    How We Work
                </h2>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {[
                        { step: "1", title: "Visit Showroom", text: "Explore our products and discuss your requirements with our experts." },
                        { step: "2", title: "Measurement", text: "Our team visits your home for accurate site measurements." },
                        { step: "3", title: "Design & Finalization", text: "Choose materials, finishes & layouts that match your vision and lifestyle." },
                        { step: "4", title: "Manufacturing & Installation", text: "Precision manufacturing followed by professional installation on time." },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="p-6 bg-[#993333] text-white rounded-xl shadow-md
                                       hover:shadow-xl hover:scale-[1.03] transition-all duration-300
                                       flex flex-col items-center"
                        >

                            {/* Step Number */}
                            <div className="text-4xl font-extrabold opacity-95 mb-3 text-amber-300">
                                {item.step}
                            </div>

                            {/* Title */}
                            <h3 className="font-semibold text-xl text-center mb-3 leading-snug">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm leading-relaxed text-justify px-1">
                                {item.text}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>

        </>
    );
};
