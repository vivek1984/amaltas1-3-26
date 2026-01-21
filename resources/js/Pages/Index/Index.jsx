import QuestionPrompt from "../Component/QuestionPrompt";
import useQuestionOnScroll from "../Component/useQuestionOnScroll";
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


export default function Index ({clusters, products}) {
    const bannerData = [
        {
            src: '/storage/images/ban1.png', // Correct path to your image
            alt: 'Wooden furniture', // Alt text as requested
            link: '/' // Optional: link where this banner leads
        },
        {
            src: '/storage/images/ban2.png',
            alt: 'Modular Kitchens', // Assuming alt text
            link: '/' // Optional: link where this banner leads
        },
        {
            src: '/storage/images/ban3.png',
            alt: 'In house Manufacturing', // Assuming alt text
            link: '/' // Optional: link where this banner leads
        }
    ];

    const [showPrompt, setShowPrompt] = useQuestionOnScroll();

     const handleAnswer = (answer) => {
    // Save locally
    localStorage.setItem("locationQuestionAnswered", answer);

    // Send to backend
    fetch("/store-location-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
      body: JSON.stringify({ answer }),
    });

    setShowPrompt(false);
  };

    return (
        <>

        {/* {showPrompt && (
        <QuestionPrompt
          question="Are you from Dehradun or within 50 km radius?"
          onAnswer={handleAnswer}
        />
      )} */}

        <Welcome clusters={clusters}>
            <BannerSwiper banners = {bannerData}/>
            <PopularCategories clusters={clusters} />
            <ShowroomImage />
            <HotSellerProducts products={products}/>
            <AboutUs />
            <WhyUs />
            <HowWeWork />
            <LongSeo />
            <Faq />
            <GoogleReviews reviewsApiUrl="/api/google-reviews" maxReviews={10} />
        </Welcome>
        </>
    );
};
