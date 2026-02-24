import React from "react";
import Welcome from "../Welcome";

import AboutUs from "./AboutUs";
import BannerSwiper from "./BannerSwiper";
import Faq from "./Faq";
import GoogleReviews from "./GoogleReviews";
import HotSellerProducts from "./HotSellerProducts";
import HowWeWork from "./HowWeWork";
import LongSeo from "./LongSeo";
import PopularCategories from "./PopularCategories";
import ShowroomImage from "./ShowroomImage";
import WhyUs from "./WhyUs";

export default function Index({ clusters, products }) {
    /* ---------------- STATIC DATA ---------------- */
    const bannerData = [
        {
            src: "/storage/images/ban1.webp",
            alt: "Wooden furniture",
            link: "/",
        },
        {
            src: "/storage/images/ban2.webp",
            alt: "Modular Kitchens",
            link: "/",
        },
        {
            src: "/storage/images/ban3.webp",
            alt: "In house Manufacturing",
            link: "/",
        },
    ];

    /* ---------------- RENDER ---------------- */
    return (
        <Welcome clusters={clusters}>
            <BannerSwiper banners={bannerData} />
            <PopularCategories clusters={clusters} />
            <ShowroomImage />
            <HotSellerProducts products={products} />
            <AboutUs />
            <WhyUs />
            <HowWeWork />
            <LongSeo />
            <Faq />
            <GoogleReviews
                reviewsApiUrl="/api/google-reviews"
                maxReviews={10}
            />
        </Welcome>
    );
}