import React from "react";
import { Head } from "@inertiajs/react";
import Welcome from "../Welcome";

export default function ShippingPolicy({ clusters }) {
    return (
        <>
            {/* SEO + OG Tags */}
            <Head>
                <title>Shipping Policy | Amaltas Furniture Dehradun</title>

                <meta
                    name="description"
                    content="Learn about Amaltas Furniture's shipping policy. We provide free delivery within Dehradun and nearby areas. For outside locations, shipping and wooden crate packing charges apply."
                />

                <link rel="canonical" href="https://www.amaltasfurniture.com/shipping-policy" />

                {/* Open Graph */}
                <meta property="og:title" content="Shipping Policy | Amaltas Furniture" />
                <meta
                    property="og:description"
                    content="Free delivery in Dehradun. Shipping outside Dehradun requires additional freight and wooden crate packing charges."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.amaltasfurniture.com/shipping-policy" />
                <meta
                    property="og:image"
                    content="https://www.amaltasfurniture.com/images/shipping-policy-og.jpg"
                />
            </Head>

            <Welcome clusters={clusters}>
                <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">

                    {/* HEADER */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl font-bold text-gray-900">Shipping Policy</h1>
                        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                            At Amaltas Furniture, we ensure safe and reliable delivery of all products.
                            Please read our shipping guidelines below.
                        </p>
                    </div>

                    {/* POLICY SECTIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                        {/* Free Shipping */}
                        <div className="p-8 bg-white border rounded-xl shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                 Shipping in Dehradun
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                We offer <strong>delivery</strong> within Dehradun city
                                and nearby areas. Our team ensures smooth and safe handling during local delivery.
                            </p>
                        </div>

                        {/* Outside Shipping Charges */}
                        <div className="p-8 bg-white border rounded-xl shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Shipping Outside Dehradun
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                If the delivery location is <strong>outside Dehradun</strong>,
                                actual shipping or courier charges will be payable by the customer.
                                Charges vary based on distance, weight, and mode of transport.
                            </p>
                        </div>

                        {/* Wooden Crate Packing */}
                        <div className="p-8 bg-white border rounded-xl shadow-sm md:col-span-2">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Wooden Crate Packing (For Courier Shipping)
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                When items are shipped through courier or transport services,
                                they must be packed securely inside a <strong>custom wooden crate </strong>
                                to prevent damage during transit.
                            </p>

                            <p className="text-gray-700 mt-3 leading-relaxed">
                                The crate packing process involves material, labor, and handling,
                                therefore <strong>packing charges will also apply</strong>.
                            </p>
                        </div>

                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16">
                        <a
                            href="/contact-us"
                            className="inline-block bg-[#800000] text-white py-3 px-10 rounded-lg text-lg font-semibold shadow hover:bg-[#6d0000] transition"
                        >
                            Contact Us for Delivery Queries
                        </a>
                    </div>

                </section>
            </Welcome>
        </>
    );
}
