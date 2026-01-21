import React, { useState, useMemo, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

export default function ImageGallery({ images = [], productName }) {
  /* ---------- MOBILE DETECTION ---------- */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------- ORDER: IMAGE → YOUTUBE → REST ---------- */
  const orderedImages = useMemo(() => {
    if (!Array.isArray(images)) return [];
    const yt = images.find(i => i.type === "youtube");
    const imgs = images.filter(i => i.type !== "youtube");
    if (!yt || imgs.length === 0) return images;
    return [imgs[0], yt, ...imgs.slice(1)];
  }, [images]);

  /* ---------- STATE ---------- */
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const active = orderedImages[index];
  const hasMultiple = orderedImages.length > 1;

  /* ---------- HELPERS ---------- */
  const resolveImage = (img) => {
    if (!img) return "";
    if (img.type === "placeholder") return img.name;
    return `/storage/${img.name}`;
  };

  const resolveThumb = (img) => {
    if (img.type === "youtube" || img.type === "placeholder")
      return img.thumbnail_url;
    return `/storage/${img.thumbnail_url}`;
  };

  const prev = () =>
    setIndex(index === 0 ? orderedImages.length - 1 : index - 1);

  const next = () =>
    setIndex(index === orderedImages.length - 1 ? 0 : index + 1);

  /* ---------- RENDER ---------- */
  return (
    <>
      {/* ================= MAIN VIEW ================= */}
      <div className="flex items-center gap-2 mb-4">
        {/* LEFT ARROW */}
        {hasMultiple && (
          <button
            onClick={prev}
            className="shrink-0 w-6 h-6 rounded-full
                       bg-black/60 text-white text-sm
                       flex items-center justify-center"
            aria-label="Previous"
          >
            ‹
          </button>
        )}

        {/* MEDIA FRAME */}
        <div className="flex-1 bg-black rounded-lg overflow-hidden">
          {active?.type === "youtube" ? (
            <div
              className={`w-full ${
                isMobile
                  ? "aspect-[9/16] max-h-[80vh]"
                  : "aspect-video"
              }`}
            >
              <iframe
                src={`${active.url}?playsinline=1&controls=1&modestbranding=1&rel=0`}
                title="Product Video"
                className="w-full h-full"
                allow="accelerometer; encrypted-media; picture-in-picture"
              />
            </div>
          ) : (
            <img
              src={resolveImage(active)}
              alt={productName}
              className="w-full object-cover cursor-pointer"
              onClick={() => setOpen(true)}
            />
          )}
        </div>

        {/* RIGHT ARROW */}
        {hasMultiple && (
          <button
            onClick={next}
            className="shrink-0 w-6 h-6 rounded-full
                       bg-black/60 text-white text-sm
                       flex items-center justify-center"
            aria-label="Next"
          >
            ›
          </button>
        )}
      </div>

      {/* ================= THUMBNAILS ================= */}
      <div className="flex gap-2 overflow-x-auto">
        {orderedImages.map((img, i) => (
          <div
            key={img.id}
            onClick={() => setIndex(i)}
            className={`w-16 h-16 rounded border cursor-pointer ${
              i === index ? "border-maroon-600" : "border-gray-300"
            }`}
          >
            <img
              src={resolveThumb(img)}
              alt="thumb"
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* ================= FULLSCREEN (IMAGES ONLY) ================= */}
      {open && active?.type !== "youtube" && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* CLOSE BUTTON (FIXED, LARGE, CLICKABLE) */}
          <button
            onClick={() => setOpen(false)}
            className="
              fixed top-4 right-4
              z-[9999]
              w-14 h-14
              text-6xl
              flex items-center justify-center
              text-white
              bg-black/50
              rounded-full
              pointer-events-auto
            "
            aria-label="Close"
          >
            ×
          </button>

          <Swiper
            modules={[Navigation, Pagination, Zoom, Keyboard]}
            initialSlide={index}
            navigation
            pagination={{ type: "fraction" }}
            keyboard={{ enabled: true }}
            zoom
            className="w-full h-full"
          >
            {orderedImages
              .filter(i => i.type !== "youtube")
              .map((img) => (
                <SwiperSlide key={img.id}>
                  <div className="swiper-zoom-container flex items-center justify-center h-full">
                    <img
                      src={resolveImage(img)}
                      alt={productName}
                      className="max-w-[90vw] max-h-[90vh] object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
