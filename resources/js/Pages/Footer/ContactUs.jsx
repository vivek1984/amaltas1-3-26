import React, { useState, useEffect } from "react";
import { router, Head } from "@inertiajs/react";
import Welcome from "../Welcome";
import PremiumPopup from "@/Components/PremiumPopup";

export default function ContactUs({ clusters }) {
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // Load reCAPTCHA v3
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();

        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: "submit" })
                .then((token) => {
                    const payload = { ...form, recaptcha_token: token };

                    router.post("/contact-submit", payload, {
                        onSuccess: () => {
                            setShowPopup(true);
                            setStatus("success");
                            setForm({ name: "", mobile: "", email: "", message: "" });
                        },
                        onError: () => {
                            setStatus("error");
                        },
                    });
                });
        });
    };

    return (
        <>
            {/* SEO + OG Tags */}
            <Head>
                <title>Contact Us | Amaltas Furniture Dehradun</title>

                <meta
                    name="description"
                    content="Contact Amaltas Furniture & Modular Kitchens in Dehradun. Have questions or custom furniture needs? Reach out by phone, WhatsApp, email, or submit our contact form."
                />

                <link rel="canonical" href="https://www.amaltasfurniture.com/contact-us" />

                {/* Open Graph */}
                <meta property="og:title" content="Contact Us | Amaltas Furniture" />
                <meta
                    property="og:description"
                    content="Reach out to Amaltas Furniture for enquiries, support, or custom furniture requirements."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.amaltasfurniture.com/contact-us" />
                <meta
                    property="og:image"
                    content="https://www.amaltasfurniture.com/images/showroom.jpg"
                />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us | Amaltas Furniture" />
                <meta
                    name="twitter:description"
                    content="Have questions? Contact Amaltas Furniture & Modular Kitchens today."
                />
                <meta
                    name="twitter:image"
                    content="https://www.amaltasfurniture.com/images/showroom.jpg"
                />
            </Head>

            {/* Premium Success Popup */}
            <PremiumPopup
                show={showPopup}
                title="Message Sent!"
                message="Thank you for contacting us. Our team will get back to you shortly."
                autoClose={true}
                autoCloseTime={3500}
                onClose={() => setShowPopup(false)}
            />

            <Welcome clusters={clusters}>
                <section className="bg-white py-10 px-4 sm:px-6 lg:px-12 font-inter">

                    {/* Heading */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Contact Us</h1>
                        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                            Have questions? Need assistance? We're here to help.
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <Card title="📍 Address">
                            Amaltas Furniture & Modular Kitchens<br />
                            GMS Road, Near Chaudhary Farm House, Balliwala<br />
                            Dehradun, Uttarakhand – 248001
                        </Card>

                        <Card title="📞 Call Us | Whatsapp Us">
                            <a href="tel:9368330915" className="text-lg font-medium hover:text-[#800000]">
                                93683 30915
                            </a>
                        </Card>

                        <Card title="✉️ Email">
                            <a href="mailto:amaltasfurniture@gmail.com" className="hover:text-[#800000]">
                                amaltasfurniture@gmail.com
                            </a>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-xl border shadow-sm mb-12 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            Send us a Message
                        </h2>

                        {status === "error" && (
                            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                                Something went wrong. Please try again.
                            </div>
                        )}

                        <form onSubmit={submitForm} className="space-y-5">
                            <Input label="Name" name="name" value={form.name} onChange={handleChange} required />

                            <Input label="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} required />

                            <Input
                                label="Email (optional)"
                                name="email"
                                value={form.email}
                                type="email"
                                onChange={handleChange}
                            />

                            <Textarea
                                label="Message"
                                name="message"
                                value={form.message}
                                required
                                rows="4"
                                onChange={handleChange}
                            />

                            <button
                                type="submit"
                                className="w-full bg-[#800000] text-white py-3 rounded-lg font-medium hover:bg-[#6d0000] transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* WhatsApp CTA */}
                    <div className="text-center mb-12">
                        <a
                            href="https://wa.me/919368330915"
                            target="_blank"
                            className="inline-flex items-center bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow hover:bg-green-800 transition"
                        >
                            <svg width="24" height="24" fill="currentColor">
                                <path d="M20.52 3.48A11.8 11.8 0 0 0 12.04 0C5.46 0 .14 5.32.14 11.9c0 2.1.54 4.16 1.57 5.98L0 24l6.29-1.64a11.84 11.84 0 0 0 5.75 1.47h.01c6.58 0 11.9-5.32 11.9-11.9a11.82 11.82 0 0 0-3.43-8.45Z"/>
                            </svg>
                            <span className="ml-2">Chat with Us on WhatsApp</span>
                        </a>
                    </div>

                    {/* MAP */}
                    <div className="rounded-xl overflow-hidden shadow-lg border h-[350px] sm:h-[450px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.142130800362!2d78.00996437470369!3d30.318474805536866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b983165a919%3A0x23ad9186b8e28c4!2sAmaltas%20Furniture%20Studio%20%26%20Modular%20Kitchens!5e0!3m2!1sen!2sin!4v1765131571811!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                        ></iframe>
                    </div>
                </section>
            </Welcome>
        </>
    );
}

/* -----------------------------------------------------------
   Reusable UI Components
----------------------------------------------------------- */

function Card({ title, children }) {
    return (
        <div className="p-6 rounded-xl border shadow-sm bg-gray-50">
            <h3 className="font-bold text-lg text-[#800000] mb-2">{title}</h3>
            <p className="text-gray-700 leading-relaxed">{children}</p>
        </div>
    );
}

function Input({ label, name, type = "text", value, onChange, required }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-[#800000] focus:border-[#800000]"
            />
        </div>
    );
}

function Textarea({ label, name, value, rows, onChange, required }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <textarea
                name={name}
                value={value}
                rows={rows}
                required={required}
                onChange={onChange}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-[#800000] focus:border-[#800000]"
            ></textarea>
        </div>
    );
}
