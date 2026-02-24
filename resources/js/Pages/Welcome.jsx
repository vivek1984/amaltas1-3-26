


import { Head, Link } from "@inertiajs/react";
import TopStrip from "./Index/TopStrip";
import SecondStrip from "./Index/SecondStrip";
import CategoryMenu from "./Index/CategoryMenu";
import Footer from "./Index/Footer";
import ShareButton from "@/Components/ShareButton";

export default function Welcome({ clusters, children, title, description }) {
    return (
        <>
            {/* ================= SEO META (HEAD ONLY) ================= */}
            <Head>
                <title>{title || "Amaltas Furniture & Modular Kitchens | Dehradun"}</title>

                <meta
                    name="description"
                    content={
                        description ||
                        "Premium modular kitchens, wardrobes, wooden furniture, and home interior solutions. Visit our showroom on GMS Road, Dehradun."
                    }
                />

                <meta name="robots" content="index, follow" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-103104998-2"></script>
                <link
                    rel="canonical"
                    href="https://amaltasfurniture.com/"
                />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://amaltasfurniture.com/" />
                <meta
                    property="og:title"
                    content={title || "Amaltas Furniture & Modular Kitchens | Dehradun"}
                />
                <meta
                    property="og:description"
                    content={
                        description ||
                        "Premium home furniture, modular kitchens, wardrobes, and interiors in Dehradun."
                    }
                />
                <meta
                    property="og:image"
                    content="https://amaltasfurniture.com/storage/images/ban1.png"
                />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={title || "Amaltas Furniture & Modular Kitchens"}
                />
                <meta
                    name="twitter:description"
                    content={
                        description ||
                        "Premium furniture & modular kitchens in Dehradun."
                    }
                />
                <meta
                    name="twitter:image"
                    content="https://amaltasfurniture.com/storage/images/ban1.png"
                />

                {/* Local SEO */}
                <meta name="geo.region" content="IN-UT" />
                <meta name="geo.placename" content="Dehradun" />
                <meta name="geo.position" content="30.3165;78.0322" />
                <meta name="ICBM" content="30.3165, 78.0322" />
            </Head>

            {/* ================= SEO / CRAWLER NAV (BODY ONLY) ================= */}
            {/* Hidden from users, visible to SSR + crawlers */}
            <nav style={{ display: "none" }}>
                <Link href="/sofas?id=cluster">Sofas</Link>
                <Link href="/bedroom?id=cluster">Bedroom</Link>
                <Link href="/dining?id=cluster">Dining</Link>
                <Link href="/wardrobes?id=cluster">Wardrobes</Link>
                <Link href="/modular-kitchens?id=cluster">Kitchens</Link>
            </nav>

            {/* ================= SHARE BUTTON (CLIENT ONLY) ================= */}
            <div className="fixed bottom-5 right-5 z-50">
                <ShareButton className="bg-maroon-200 ring-8 ring-maroon-200 shadow-lg" />
            </div>

            {/* ================= PAGE UI ================= */}
            <TopStrip />

            <div className="hidden md:block">
                <SecondStrip />
            </div>

            <CategoryMenu clusters={clusters} />

            <main>{children}</main>

            <Footer />

            {/* ================= STRUCTURED DATA ================= */}
            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "FurnitureStore",
                    "name": "Amaltas Furniture & Modular Kitchens",
                    "image": "https://amaltasfurniture.com/storage/images/ban1.png",
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
                    "url": "https://amaltasfurniture.com",
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