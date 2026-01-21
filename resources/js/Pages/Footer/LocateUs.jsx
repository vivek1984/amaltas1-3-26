import Welcome from "../Welcome";

export default function LocateUs({ clusters }) {
    // FINAL VERIFIED GOOGLE MAPS PLACE ID (matches your iframe)
    const placeId = "ChIJG5MYOZm5ODkRxcSigryRnaQ";

    // Button URL → Opens Google Maps app / browser correctly
    const mapsButtonUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

    return (
        <Welcome clusters={clusters}>
            <section className="bg-white py-10 px-4 sm:px-6 lg:px-12 font-inter">

                {/* Page Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Locate Us
                    </h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Visit our showroom on GMS Road and explore premium furniture & modular kitchens.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* LEFT CONTENT */}
                    <div className="space-y-6">

                        {/* Address Block */}
                        <div className="p-6 rounded-xl border shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Showroom Address</h2>

                            <p className="text-gray-700 leading-relaxed">
                                <strong>Amaltas Furniture & Modular Kitchens</strong><br />
                                GMS Road, Near Chaudhary Farm House, Balliwala<br />
                                Dehradun, Uttarakhand – 248001
                            </p>

                            <div className="mt-4 space-y-2">
                                <a href="tel:9368330915" className="block text-gray-700 hover:text-[#800000]">
                                    📞 93683 30915
                                </a>
                                <a href="mailto:support@amaltasfurniture.com" className="block text-gray-700 hover:text-[#800000]">
                                    📧 support@amaltasfurniture.com
                                </a>
                            </div>
                        </div>

                        {/* Timings */}
                        <div className="p-6 rounded-xl border shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Showroom Timings</h2>
                            <p className="text-gray-700">
                                <strong>Monday – Sunday:</strong> 10:30 AM – 8:00 PM<br />
                                We are open all 7 days.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={mapsButtonUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-[#800000] text-white px-6 py-3 rounded-lg shadow hover:bg-[#6e0000] transition"
                            >
                                📍 Open in Google Maps
                            </a>

                            <a
                                href="https://wa.me/919368330915"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 border border-[#800000] text-[#800000] px-6 py-3 rounded-lg hover:bg-[#800000] hover:text-white transition"
                            >
                                💬 WhatsApp Us
                            </a>
                        </div>
                    </div>

                    {/* RIGHT SIDE MAP */}
                    <div className="rounded-xl overflow-hidden shadow-lg border h-[350px] sm:h-[450px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.142130800362!2d78.00996437470369!3d30.318474805536866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b983165a919%3A0x23ad9186b8e28c4!2sAmaltas%20Furniture%20Studio%20%26%20Modular%20Kitchens!5e0!3m2!1sen!2sin!4v1765131571811!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* SEO TEXT */}
                <div className="mt-12 text-center text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Visit our GMS Road showroom to explore wooden furniture, modular kitchens, wardrobes,
                    dining sets, and custom interior solutions — all crafted in-house in Dehradun.
                </div>
            </section>
        </Welcome>
    );
}
