import { Head } from "@inertiajs/react";

export default function ProductMetaHead({ product, mainProductImages, productJsonLd }) {
  const primaryImage = mainProductImages.find((img) => img.type === "image");
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <Head title={`${product.name} | Amaltas Furniture`}>
      {primaryImage && <meta property="og:image" content={`${origin}/storage/${primaryImage.name}`} />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      ></script>

      <style>{`
  .cart-bounce {
    animation: cartBounce 0.4s ease;
  }

  @keyframes cartBounce {
    0% { transform: scale(1); }
    30% { transform: scale(1.15); }
    60% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }
`}</style>
    </Head>
  );
}
