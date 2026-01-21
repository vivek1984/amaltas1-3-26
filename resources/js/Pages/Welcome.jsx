import { Head } from "@inertiajs/react";
import TopStrip from "./Index/TopStrip";
import SecondStrip from "./Index/SecondStrip";
import CategoryMenu from "./Index/CategoryMenu";
import Footer from "./Index/Footer";
import ShareButton from "@/Components/ShareButton";

export default function Welcome({ clusters, children, title, description }) {

    return (

        <>
        <div className="fixed bottom-5 right-5 z-50">
            <ShareButton className="bg-maroon-200 ring-8 ring-maroon-200 shadow-lg" />
        </div>
            {/* ----- GLOBAL SEO DEFAULTS (Override per page) ----- */}
            <Head>
                <title>{title || "Amaltas Furniture & Modular Kitchens | Dehradun"}</title>

                <meta
                    name="description"
                    content={
                        description ||
                        "Premium modular kitchens, wardrobes, wooden furniture, and home interior solutions. Visit our showroom on GMS Road, Dehradun."
                    }
                />

                <link rel="canonical" href="https://www.amaltasfurniture.com/" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.amaltasfurniture.com/" />
                <meta
                    property="og:title"
                    content={title || "Amaltas Furniture & Modular Kitchens | Dehradun"}
                />
                <meta
                    property="og:description"
                    content={
                        description ||
                        "Premium Home Furniture, modular kitchens, wardrobes, wooden furniture, and home interior solutions in Dehradun."
                    }
                />
                <meta
                    property="og:image"
                    content="https://www.amaltasfurniture.com/storage/images/ban1.png"
                />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title || "Amaltas Furniture & Modular Kitchens"} />
                <meta name="twitter:description" content={description || "Premium furniture & modular kitchens in Dehradun."} />
                <meta name="twitter:image" content="https://www.amaltasfurniture.com/storage/images/ban1.png" />

                {/* Local SEO */}
                <meta name="geo.region" content="IN-UT" />
                <meta name="geo.placename" content="Dehradun" />
                <meta name="geo.position" content="30.3165;78.0322" />
                <meta name="ICBM" content="30.3165, 78.0322" />

                {/* Robots */}
                <meta name="robots" content="index, follow" />
            </Head>

            {/* -------- Actual Page Layout -------- */}
            <TopStrip />
            <div className="hidden md:block">
                <SecondStrip />
            </div>
            <CategoryMenu clusters={clusters} />
            <main>{children}</main>
            <Footer />

            {/* ----- Structured Data (LocalBusiness) ----- */}
            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "FurnitureStore",
                    "name": "Amaltas Furniture & Modular Kitchens",
                    "image": "https://www.amaltasfurniture.com/storage/images/ban1.png",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "GMS Road",
                        "addressLocality": "Dehradun",
                        "addressRegion": "Uttarakhand",
                        "postalCode": "248001",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 30.3165,
                        "longitude": 78.0322
                    },
                    "url": "https://www.amaltasfurniture.com",
                    "telephone": "+919368330915",
                    "openingHours": "Mo-Su 10:00-20:00",
                    "priceRange": "₹₹₹",
                    "sameAs": [
                        "https://www.instagram.com/amaltasfurniture/",
                        "https://www.facebook.com/amaltasfurniture/",
                        "https://www.google.com/maps/place/Amaltas+Furniture/"
                    ]
                }
                `}
            </script>
        </>
    );
}
