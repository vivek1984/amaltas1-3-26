import React from "react";
import { Head } from "@inertiajs/react";
import Welcome from "../Welcome";

export default function ReturnPolicy({ clusters }) {
    return (
        <>
            {/* SEO + OG Tags */}
            <Head>
                <title>Return & Cancellation Policy | Amaltas Furniture</title>

                <meta
                    name="description"
                    content="Amaltas Furniture offers customer-friendly return, exchange, and cancellation policies. Damaged items, lost shipments, and delivery delays are fully protected by our guarantee."
                />

                <link rel="canonical" href="https://www.amaltasfurniture.com/return-policy" />

                {/* Open Graph */}
                <meta property="og:title" content="Return & Cancellation Policy | Amaltas Furniture" />
                <meta
                    property="og:description"
                    content="Learn about our 10-day exchange policy, cancellation terms, damage replacement, and 100% money-back guarantee for undelivered products."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.amaltasfurniture.com/return-policy" />
                <meta
                    property="og:image"
                    content="https://www.amaltasfurniture.com/images/return-policy-og.jpg"
                />
            </Head>

            <Welcome clusters={clusters}>
                <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">

                    {/* HEADER */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl font-bold text-gray-900">Return & Cancellation Policy</h1>
                        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                            At Amaltas Furniture, customer satisfaction is our highest priority.
                            Below are our transparent and customer-friendly policies for cancellations,
                            returns, exchanges, and delivery issues.
                        </p>
                    </div>

                    {/* POLICY SECTIONS */}
                    <div className="space-y-8 max-w-4xl mx-auto">

                        {/* ORDER CANCELLATION */}
                        <PolicyCard title="Order Cancellation">
                            Orders can be cancelled <strong>before they are shipped</strong>.
                            Simply send us a cancellation email at:<br />
                            <a href="mailto:amaltasfurniture@gmail.com" className="text-[#800000] font-medium">
                                amaltasfurniture@gmail.com
                            </a>
                            <br /><br />
                            Your total amount will be refunded <strong>without any deductions</strong>.
                        </PolicyCard>

                        {/* DAMAGED PRODUCT */}
                        <PolicyCard title="Damaged Product Received">
                            If you receive a damaged product, please notify us immediately upon delivery.
                            We will replace the product or the damaged part — whichever is necessary —
                            at <strong>no extra cost</strong>.
                        </PolicyCard>

                        {/* PACKAGE LOST */}
                        <PolicyCard title="Package Lost in Transit">
                            In the rare case that your package is lost during transit, we will send you
                            a <strong>brand new replacement</strong> at no additional cost.
                            <br /><br />
                            If only part of the package is lost, we will replace the missing part promptly.
                        </PolicyCard>

                        {/* RETURN & EXCHANGE POLICY */}
                        <PolicyCard title="Return Policy (10-Day Exchange)">
                            If you find some problem in the product, you are eligible for a
                            <strong> 10-day exchange</strong>.
                            <br /><br />
                            Please note:
                            <ul className="list-disc ml-6 mt-2 text-gray-700">
                                <li>No refunds will be issued.</li>
                                <li>Only exchange is permitted.</li>
                                <li>Return shipping or exchange costs are to be borne by the customer.</li>
                            </ul>
                        </PolicyCard>

                        {/* MONEY BACK GUARANTEE */}
                        <PolicyCard title="100% Money-Back Guarantee">
                            If you do not receive your product within a reasonable timeframe,
                            we guarantee a <strong>100% Money-Back Refund</strong>.
                        </PolicyCard>

                        {/* CLOSING NOTE */}
                        <PolicyCard title="Our Commitment to You">
                            Our endeavor is to make you a lifelong customer.
                            We take utmost care to ensure your satisfaction and protect your interests at every step.
                            <br /><br />
                            For any assistance, complaints, or feedback, please reach us at:<br />
                            <a href="mailto:amaltasfurniture@gmail.com" className="text-[#800000] font-medium">
                                amaltasfurniture@gmail.com
                            </a>
                        </PolicyCard>

                    </div>

                </section>
            </Welcome>
        </>
    );
}

/* -------------------- Reusable Policy Card --------------------- */

function PolicyCard({ title, children }) {
    return (
        <div className="p-8 bg-white border rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h2>
            <p className="text-gray-700 leading-relaxed">{children}</p>
        </div>
    );
}
