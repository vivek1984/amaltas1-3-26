import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Welcome from "../Welcome";

export default function AboutUs({clusters}) {

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <Welcome clusters={clusters}>
      <Head title="About Us | Amaltas Furniture & Modular Kitchens, Dehradun" />

      <div className="pb-20 space-y-20">

        {/* -------------------- HERO -------------------- */}
        <section className="px-4 pt-10">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center">

            {/* Text */}
            <div data-aos="fade-up">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Crafting Beautiful Homes
              </h1>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Amaltas is a Dehradun-based furniture brand inspired by the
                Amaltas Tree — a tree known for its elegant golden bloom.
                Just like the flower, our purpose is to bring beauty, warmth,
                and harmony into every home we design for.
                <br /><br />
                We specialize in premium wooden furniture, modular kitchens,
                wardrobes, sofas, and complete interior solutions — all
                manufactured in-house for superior quality and reliability.
              </p>
            </div>

            {/* Image */}
            <div data-aos="fade-left" className="w-full">
              <img
                src="/images/building.png"
                className="rounded-xl w-full shadow-md"
                alt="Amaltas Furniture Studio"
              />
            </div>
          </div>
        </section>

        {/* -------------------- OUR VALUES -------------------- */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-2xl md:text-4xl font-bold text-center mb-10"
              data-aos="fade-up"
            >
              What We Stand For
            </h2>

            <div className="grid gap-6 md:grid-cols-3">

              {[
                {
                  title: "Quality First",
                  text: "Every product is made using the best materials — teak wood, sheesham wood, HDHMR, branded hardware, and premium polishes."
                },
                {
                  title: "Honest Pricing",
                  text: "Because we manufacture in-house, you receive factory-direct prices without compromising on craftsmanship."
                },
                {
                  title: "Customization",
                  text: "Every home is unique. You choose the size, finish, colors, and functionality — we build exactly what fits your lifestyle."
                }
              ].map((v, i) => (
                <div
                  key={i}
                  className="bg-maroon-900 rounded-xl shadow-sm border p-6 text-center"
                  data-aos="fade-up"
                >
                  <h3 className="font-bold text-xl mb-2 text-white">{v.title}</h3>
                  <p className=" text-sm text-maroon-200">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------- SHOWROOM -------------------- */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center">

            <div data-aos="fade-right">
              <img
                src="/images/showroom.jpg"
                className="rounded-xl shadow-md"
                alt="Showroom Dehradun"
              />
            </div>

            <div data-aos="fade-up">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Visit Our 10000 Sq.ft Showroom
              </h2>

              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Explore a wide range of sofas, beds, dining tables, Modular Kitchens, wardrobes,
                TV units, office furniture and décor — all displayed in live,
                realistic settings so you can experience comfort and finish
                quality before buying.
                <br /><br />
                Our team guides you through materials, polish shades, fabric
                choices, layouts, and durability options so you make confident
                decisions.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------- WHAT WE MANUFACTURE -------------------- */}
<section className="bg-gray-50 py-16 px-4">
  {/* MASTER CARD STYLING APPLIED HERE */}
  <div className="max-w-6xl mx-auto text-center bg-white p-8 shadow-xl rounded-xl" data-aos="fade-up">

    <h2 className="text-2xl md:text-4xl font-bold mb-6">
      What We Manufacture
    </h2>

    <p className="text-gray-700 max-w-3xl mx-auto mb-10 text-base md:text-lg">
      Every product is custom-built in our Dehradun factory. From raw
      wood to final polish, everything is done under one roof.
    </p>

    {/* Equal Height Sub-Cards Container */}
    <div className="flex flex-wrap gap-4">

      {[
        "Sofas & Reclinable Sofas",
        "Beds (Teak, Sheesham, Upholstered)",
        "Modular Kitchens (L-shaped, Parallel, U-Shaped)",
        "Wardrobes (Sliding, Hinged, Walk-in)",
        "Dining Sets (Stone Top / Wooden Top)",
        "Office Furniture & Study Units"
      ].map((item, i) => (
        <div
          key={i}
          // ADDED: flex, items-center, justify-center
          // The text color is also updated to text-gray-200 based on your snippet.
          className="p-4 bg-maroon-800 h-[5em] rounded-lg border shadow-sm text-gray-200 w-full md:w-[calc(33.333%-10.66px)] flex items-center justify-center"
          data-aos="fade-up"
        >
          {item}
        </div>
      ))}
    </div>
  </div>
</section>

        {/* -------------------- MANUFACTURING -------------------- */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center">

            <div data-aos="fade-right">
              <img
                src="/images/factory.jpg"
                className="rounded-xl shadow-md"
                alt="Manufacturing"
              />
            </div>

            <div data-aos="fade-up">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Built in Our Own Factory
              </h2>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Our production team includes experienced carpenters, polish
                masters, upholsterers, designers and helpers who bring every
                idea to life with precision.
                <br /><br />
                In-house manufacturing means:
              </p>

              <ul className="list-disc pl-5 text-gray-700 text-base md:text-lg space-y-1">
                <li>Better quality control</li>
                <li>Customization without limitations</li>
                <li>Faster delivery timelines</li>
                <li>Affordable pricing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------- FOUNDER -------------------- */}
        <section className="px-4 py-10">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center">

            <div data-aos="fade-left">
              <img
                src="/images/vbsmall.jpg"
                className="rounded-xl shadow-md"
                alt="Founder"
              />
            </div>

            <div data-aos="fade-up">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Meet Our Founder
              </h2>

              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Amaltas Furniture Studio was founded by{" "}
                <strong>Vivek Bansal</strong>, a NIFT Delhi graduate with a
                passion for materials, design, and innovation.
                <br /><br />
                His experience helps Amaltas stay updated with the latest in
                decorative laminates, PU finishes, polish techniques, hardware
                improvements and furniture technology.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------- CTA -------------------- */}
        <section className="bg-[#800000] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center" data-aos="zoom-in">

            <h3 className="text-2xl md:text-4xl font-bold mb-4">
              Ready to Upgrade Your Home?
            </h3>

            <p className="text-white/90 max-w-2xl mx-auto text-base md:text-lg mb-8">
              Visit our showroom, explore materials and meet our team.
              Let’s build furniture that perfectly fits your home and lifestyle.
            </p>

            <a
              href="https://maps.app.goo.gl/nJXkZEFjrTgMWpne7"
              target="_blank"
              className="inline-block bg-white text-[#800000] font-semibold px-8 py-3 rounded-lg shadow hover:bg-gray-200 transition"
            >
              📍 Locate Us on Google Maps
            </a>

          </div>
        </section>

      </div>
    </Welcome>
  );
}
