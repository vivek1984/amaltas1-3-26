import React from "react";
import { Head } from "@inertiajs/react";
import Welcome from "../Welcome";

export default function Exports({ clusters }) {
    return (
        <>
            {/* SEO + OG Tags */}
            <Head>
                <title>Exports | Amaltas Furniture & Modular Kitchens</title>

                <meta
                    name="description"
                    content="Amaltas Furniture offers international exports for all furniture categories. Products are shipped in knock-down condition with required manufacturing time. 100% advance payment required. Import duties are borne by the customer."
                />

                <link rel="canonical" href="https://www.amaltasfurniture.com/exports" />

                {/* Open Graph */}
                <meta property="og:title" content="Exports | Amaltas Furniture" />
                <meta
                    property="og:description"
                    content="We export premium furniture worldwide. Knock-down manufacturing, shipping timelines, and export guidelines included."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.amaltasfurniture.com/exports" />
                <meta property="og:image" content="https://www.amaltasfurniture.com/images/showroom.jpg" />
            </Head>

            <Welcome clusters={clusters}>
                <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">

                    {/* HEADER */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl font-bold text-gray-900">Exports</h1>
                        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                            Amaltas Furniture proudly exports high-quality furniture across the globe.
                            Our products are crafted with precision, packed securely, and shipped internationally
                            with complete documentation.
                        </p>
                    </div>

                    {/* CONTENT CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                        {/* Knock-Down Requirement */}
                        <div className="p-8 bg-white border rounded-xl shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Knock-Down (KD) Manufacturing
                                </h2>
                            <p className="text-gray-700 leading-relaxed">
                                All export products are manufactured in a <strong>knock-down (flat-pack)</strong> format.
                                This ensures safe and efficient international shipping.
                                KD manufacturing requires additional planning and engineering,
                                and therefore includes a dedicated production timeline.
                            </p>
                        </div>

                        {/* Manufacturing Time */}
                        <div className="p-8 bg-white border rounded-xl shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Manufacturing Time
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Export orders require dedicated manufacturing time, depending on the product type,
                                quantity, and customization.
                                Once the order is confirmed and advance payment is received,
                                we will provide an estimated production schedule.
                            </p>
                        </div>

                        {/* Shipping Time */}
                        <div className="p-8 bg-white border rounded-xl shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                International Shipping Timeline
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                After manufacturing is completed, we arrange international shipping through
                                reputed logistics partners. Shipping time varies by destination country and
                                method (sea freight or air freight).
                                A tracking number will be provided once the shipment is dispatched.
                            </p>
                        </div>

                        {/* Payment Terms */}
                        <div className="p-8 bg-white border rounded-xl shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Payment Terms
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                For all international export orders, we require
                                <strong> 100% advance payment</strong>.
                                Payments can be made through international bank transfer or any globally accepted
                                online mode. Production begins only after full payment is received.
                            </p>
                        </div>

                        {/* Import Duties */}
                        <div className="p-8 bg-white border rounded-xl shadow-sm md:col-span-2">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Import Duties & Customs Charges
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Any <strong>import duty, customs tax, or additional charges</strong> imposed by the
                                destination country will be borne solely by the customer.
                                These charges depend on the respective country’s regulations and are not included
                                in our export pricing.
                            </p>
                        </div>
                    </div>

                    {/* CONTACT CTA */}
                    <div className="text-center mt-16">
                        <a
                            href="/contact-us"
                            className="inline-block bg-[#800000] text-white py-3 px-10 rounded-lg text-lg font-semibold shadow hover:bg-[#6d0000] transition"
                        >
                            Contact Us for Export Enquiries
                        </a>
                    </div>
                </section>
            </Welcome>
        </>
    );
}
