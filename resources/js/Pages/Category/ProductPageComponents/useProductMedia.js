import { useMemo } from "react";

const extractYouTubeId = (youtube) => {
  if (!youtube) return null;
  const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/;
  const match = youtube.match(regExp);
  if (match && match[1]) return match[1];
  const maybe = youtube.split("?")[0].split("#")[0].slice(-11);
  return /^[A-Za-z0-9_-]{11}$/.test(maybe) ? maybe : null;
};

export default function useProductMedia({ product, selectedVarient, selectedDesign, selectedSize, activeOption }) {
  const mainProductImages = useMemo(() => {
    const images = [];
    const seen = new Set();

    const add = (id, obj) => {
      if (!obj?.name) return;
      if (seen.has(obj.name)) return;
      seen.add(obj.name);
      images.push({ id, ...obj });
    };

    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        add(`p-img-${img.id ?? img.name}`, {
          type: "image",
          name: img.name,
          thumbnail_url: img.thumbnail_url ?? img.name,
        });
      });
    }

    if (product.small_image) {
      add("p-small-img", {
        type: "image",
        name: product.small_image,
        thumbnail_url: product.small_image,
      });
    }

    if (selectedVarient) {
      if (Array.isArray(selectedVarient.images)) {
        selectedVarient.images.forEach((img) => {
          add(`v-img-${selectedVarient.id}-${img.id ?? img.name}`, {
            type: "image",
            name: img.name,
            thumbnail_url: img.thumbnail_url ?? img.name,
          });
        });
      }

      if (selectedVarient.size_image) {
        add(`v-size-${selectedVarient.id}`, {
          type: "image",
          name: selectedVarient.size_image,
          thumbnail_url: selectedVarient.size_image,
        });
      }
    }

    if (selectedDesign?.size_image) {
      add(`d-size-${selectedDesign.id}`, {
        type: "image",
        name: selectedDesign.size_image,
        thumbnail_url: selectedDesign.size_image,
      });
    }

    if (selectedSize?.size_image) {
      add(`s-size-${selectedSize.id}`, {
        type: "image",
        name: selectedSize.size_image,
        thumbnail_url: selectedSize.size_image,
      });
    }

    const yt = extractYouTubeId(product.youtube);
    if (yt) {
      add(`yt-${yt}`, {
        type: "youtube",
        name: yt,
        thumbnail_url: `https://img.youtube.com/vi/${yt}/hqdefault.jpg`,
        url: `https://www.youtube.com/embed/${yt}?rel=0`,
      });
    }

    if (images.length === 0) {
      add("placeholder", {
        type: "placeholder",
        name: "https://placehold.co/800x800?text=No+Image",
        thumbnail_url: "https://placehold.co/100x100?text=No+Image",
      });
    }

    return images;
  }, [product, selectedVarient, selectedDesign, selectedSize]);

  const productJsonLd = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const href = typeof window !== "undefined" ? window.location.href : "";

    return {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: mainProductImages
        .filter((img) => img.type === "image")
        .map((img) => `${origin}/storage/${img.name}`),
      description: activeOption?.description || product.description || "",
      sku: `VAR-${activeOption?.id || product.id}`,
      mpn: `${activeOption?.id || product.id}`,
      brand: {
        "@type": "Brand",
        name: product.brand || "Amaltas",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: activeOption?.price ?? 0,
        availability:
          activeOption?.qty > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        url: href,
      },
    };
  }, [product, mainProductImages, activeOption]);

  return { mainProductImages, productJsonLd };
}
