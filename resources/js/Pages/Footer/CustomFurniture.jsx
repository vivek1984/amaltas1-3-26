import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import Welcome from "../Welcome";
import PremiumPopup from "@/Components/PremiumPopup";
import { Head } from '@inertiajs/react'


export default function CustomFurniture({ clusters }) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        furnitureType: "",
        dimensions: "",
        material: "",
        budget: "",
        description: "",
        file: null,
    });

    const [showPopup, setShowPopup] = useState(false);

    // Load reCAPTCHA v3 script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({
            ...form,
            [name]: files ? files[0] : value,
        });
    };

    // Handle submit with reCAPTCHA v3
    const handleSubmit = (e) => {
        e.preventDefault();

        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: "submit" })
                .then((token) => {
                    const formData = new FormData();

                    for (const key in form) {
                        formData.append(key, form[key]);
                    }

                    formData.append("recaptcha_token", token);

                    router.post("/custom-furniture", formData, {
                        forceFormData: true,
                        onSuccess: () => {
                            setShowPopup(true);

                            setForm({
                                name: "",
                                phone: "",
                                email: "",
                                address: "",
                                furnitureType: "",
                                dimensions: "",
                                material: "",
                                budget: "",
                                description: "",
                                file: null,
                            });
                        },
                    });
                });
        });
    };

    return (
<>
        <Head>
    <title>Custom Furniture in Dehradun | Amaltas Furniture</title>

    <meta
        name="description"
        content="Get premium custom-made furniture in Dehradun. Share your size, design, material, and requirements — Amaltas Furniture creates bespoke furniture tailored to your space."
    />

    <meta
        name="keywords"
        content="custom furniture Dehradun, bespoke furniture Dehradun, modular kitchen Dehradun, wardrobe design, furniture design, made to order furniture, Amaltas Furniture"
    />

    {/* Canonical URL */}
    <link rel="canonical" href="https://www.amaltasfurniture.com/custom-furniture" />

    {/* Open Graph Tags */}
    <meta property="og:title" content="Custom Furniture in Dehradun | Amaltas Furniture" />
    <meta
        property="og:description"
        content="Premium custom furniture crafted to match your space and style. Submit your requirements online and our team will contact you."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.amaltasfurniture.com/custom-furniture" />
    <meta property="og:image" content="https://www.amaltasfurniture.com/images/custom-furniture-og.jpg" />
    <meta property="og:site_name" content="Amaltas Furniture" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Custom Furniture in Dehradun | Amaltas Furniture" />
    <meta
        name="twitter:description"
        content="Get tailor-made furniture for your home or office in Dehradun. Modern, durable, and crafted with precision."
    />
    <meta name="twitter:image" content="https://www.amaltasfurniture.com/images/custom-furniture-og.jpg" />

    {/* Optional JSON-LD (Improves SEO strongly) */}
    <script type="application/ld+json">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Custom Furniture",
            "provider": {
                "@type": "LocalBusiness",
                "name": "Amaltas Furniture",
                "image": "https://www.amaltasfurniture.com/images/custom-furniture-og.jpg",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Dehradun",
                    "addressRegion": "Uttarakhand",
                    "addressCountry": "India"
                }
            },
            "url": "https://www.amaltasfurniture.com/custom-furniture",
            "description":
                "Made-to-order custom furniture including wardrobes, kitchens, sofas, and modular units in Dehradun.",
        })}
    </script>
</Head>

        <Welcome clusters={clusters}>

            {/* Popup */}
            <PremiumPopup
                show={showPopup}
                title="Request Received!"
                message="Thank you for submitting your custom furniture request. Our team will contact you shortly."
                onClose={() => setShowPopup(false)}
                autoClose={true}
                autoCloseTime={3500}
            />

            {/* Page Content */}
            <div className="min-h-screen bg-[#f8f5f1] flex flex-col items-center py-12 px-4">

                {/* Hero */}
                <div className="max-w-4xl text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 tracking-tight">
                        Custom Furniture Request
                    </h1>
                    <p className="text-gray-600 mt-4 text-lg">
                        Tailored to your space. Designed to your style.
                    </p>
                </div>

                {/* Form Container */}
                <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-gray-200">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Name / Phone / Email / Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <Input label="Name" name="name" value={form.name} onChange={handleChange} required />

                            <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required />

                            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />

                            <Select
                                label="Furniture Type"
                                name="furnitureType"
                                value={form.furnitureType}
                                onChange={handleChange}
                                options={[
                                    "Sofa",
                                    "Bed",
                                    "Wardrobe",
                                    "Modular Kitchen",
                                    "TV Unit",
                                    "Table",
                                    "Office Furniture",
                                    "Other",
                                ]}
                            />
                        </div>

                        {/* Address */}
                        <Textarea
                            label="Full Address"
                            name="address"
                            value={form.address}
                            required
                            placeholder="House No., Street, City, Pincode"
                            onChange={handleChange}
                        />

                        {/* Dimensions */}
                        <Input
                            label="Dimensions (if known)"
                            name="dimensions"
                            placeholder="Example: 6ft x 3ft x 2ft"
                            value={form.dimensions}
                            onChange={handleChange}
                        />

                        {/* Material */}
                        <Select
                            label="Preferred Material"
                            name="material"
                            value={form.material}
                            onChange={handleChange}
                            options={[
                                "Premium Ply + Laminate",
                                "HDHMR",
                                "Solid Wood",
                                "MDF",
                                "Not Sure",
                            ]}
                        />

                        {/* Budget */}
                        <Input
                            label="Estimated Budget"
                            name="budget"
                            placeholder="Example: ₹30,000 – ₹60,000"
                            value={form.budget}
                            onChange={handleChange}
                        />

                        {/* Description */}
                        <Textarea
                            label="Describe Your Requirement"
                            name="description"
                            value={form.description}
                            rows={4}
                            onChange={handleChange}
                        />

                        {/* File Upload */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Upload Drawing / Sketch / Map / Floor Plan
                            </label>
                            <input
                                type="file"
                                name="file"
                                accept="image/*,.pdf"
                                className="w-full p-3 border rounded-lg bg-white"
                                onChange={handleChange}
                            />
                            <p className="text-gray-500 text-sm mt-1">
                                Accepted: JPG, PNG, PDF — up to 10 MB
                            </p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
                        >
                            Submit Request
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            Protected by Google reCAPTCHA — Privacy Policy & Terms apply.
                        </p>
                    </form>
                </div>
            </div>
        </Welcome>
        </>
    );
}

/* -----------------------------------------------------------
   REUSABLE INPUT COMPONENTS
----------------------------------------------------------- */

function Input({ label, name, value, onChange, required = false, type = "text", placeholder = "" }) {
    return (
        <div>
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
                type={type}
                name={name}
                required={required}
                placeholder={placeholder}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-700"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

function Textarea({ label, name, value, onChange, rows = 3, required = false, placeholder = "" }) {
    return (
        <div>
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <textarea
                name={name}
                rows={rows}
                required={required}
                placeholder={placeholder}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-700"
                value={value}
                onChange={onChange}
            ></textarea>
        </div>
    );
}

function Select({ label, name, value, onChange, options = [] }) {
    return (
        <div>
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <select
                name={name}
                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-gray-700"
                value={value}
                onChange={onChange}
            >
                <option value="">Select</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}
