export default function Faq() {
    return (
        <>

        {/* FAQ Section – Premium Redesign */}
        <section className="my-12 px-4">
            <div className="bg-white rounded-2xl p-8 shadow-md max-w-5xl mx-auto">

                {/* Accent Bar */}
                <div className="w-20 h-1.5 bg-[#993333] mx-auto mb-5 rounded-full"></div>

                {/* Heading */}
                <h2 className="text-3xl font-extrabold text-[#993333] text-center mb-8 tracking-wide">
                    Frequently Asked Questions
                </h2>

                {/* FAQ List */}
                <div className="space-y-4">

                    {[
                        {
                            q: "Do you provide custom-sized furniture?",
                            a: "Yes, every product including wardrobes, beds, kitchens and cabinets can be customized to your exact measurements."
                        },
                        {
                            q: "How long does a modular kitchen project take?",
                            a: "Typically 20-30 days depending on design, materials and site readiness."
                        },
                        {
                            q: "Do you offer delivery and installation in Dehradun?",
                            a: "Yes, we offer complete delivery and installation services across Dehradun."
                        },
                        {
                            q: "What materials do you use for modular kitchens?",
                            a: "We use high-grade BWP plywood, HDHMR, laminates, acrylic, PU, and branded hardware like Hafele, Hettich, and Godrej."
                        },
                        {
                            q: "Can I visit your showroom?",
                            a: "Yes! We are located on GMS Road, Dehradun with a full display of Home Furniture, Office Furniture, and Modular Kitchens."
                        },
                        {
                            q: "Can I visit your factory?",
                            a: "Yes! You can visit our factory, see how your furniture is being manufactured, and inspect the materials used."
                        }
                    ].map((faq, index) => (
                        <details
                            key={index}
                            className="group border border-[#ecdcdc] rounded-xl p-4 shadow-sm
                                       hover:shadow-md transition-all duration-300"
                        >
                            <summary
                                className="font-semibold text-lg text-[#993333] cursor-pointer flex justify-between items-center
                                           group-open:text-[#771f1f]"
                            >
                                {faq.q}
                                <span className="text-[#993333] group-open:rotate-180 transition-transform duration-300">
                                    ▼
                                </span>
                            </summary>

                            <p className="text-gray-700 text-sm leading-relaxed mt-3 pl-1 pr-2">
                                {faq.a}
                            </p>
                        </details>
                    ))}

                </div>
            </div>
        </section>

        {/* FAQ Schema */}
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do you provide custom-sized furniture?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, every product including wardrobes, beds, kitchens and cabinets can be customized to your exact measurements."
              }
            },
            {
              "@type": "Question",
              "name": "How long does a modular kitchen project take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Typically 20-30 days depending on design, materials and site readiness."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer delivery and installation in Dehradun?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer complete delivery and installation services across Dehradun."
              }
            },
            {
              "@type": "Question",
              "name": "What materials do you use for modular kitchens?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use high-grade BWP plywood, HDHMR, laminates, acrylic, PU, and branded hardware like Hafele, Hettich, Godrej."
              }
            },
            {
              "@type": "Question",
              "name": "Can I visit your showroom?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! We are located on GMS Road, Dehradun with a full display of Home Furniture, Office Furniture, and Modular Kitchens."
              }
            },
            {
              "@type": "Question",
              "name": "Can I visit your factory?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! You can visit our factory, see how your furniture is being manufactured. Check the material used."
              }
            }
          ]
        }
        `}
        </script>

        </>
    );
};
