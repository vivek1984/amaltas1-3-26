// resources/js/Pages/Category/ProductPage.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Head, router } from "@inertiajs/react";
import ImageGallery from "./ImageGallery"; // same folder
import { useCart } from '@/Context/CartContext';

/**
 * ProductPage - Layout B (wider gallery focus)
 * Expects `product` prop shaped like the sample you shared.
 */
export default function ProductPage({ product }) {

  // --- Basic guard
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        Product data not available.
      </div>
    );
  }

  // --- Cart context
  const { addItemToCart, fetchCartItemsFromBackend } = useCart();

  // --- Selection state
  const [selectedVarient, setSelectedVarient] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // --- UI state
  const [flashMessage, setFlashMessage] = useState(null);
  const [flashType, setFlashType] = useState("success");
  const flashRef = useRef(null);

  const addToCartBtnRef = useRef(null);
  const flyRef = useRef(null);

  const showFlash = (msg, type = "success") => {
    setFlashMessage(msg);
    setFlashType(type);
    if (flashRef.current) clearTimeout(flashRef.current);
    flashRef.current = setTimeout(() => {
      setFlashMessage(null);
      flashRef.current = null;
    }, 4500);
  };

  // --- URL helpers (preserves variant/design/size query params)
const readSelectionFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    variant: params.get("variant"),
    design: params.get("design"),
    size: params.get("size"),
  };
};

const updateSelectionInUrl = ({ v, d, s }) => {
  const params = new URLSearchParams(window.location.search);

  if (v) params.set("variant", v);
  else params.delete("variant");

  if (d) params.set("design", d);
  else params.delete("design");

  if (s) params.set("size", s);
  else params.delete("size");

  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );
};

const animateAddToCart = () => {
  const flyEl = flyRef.current;
  const btnEl = addToCartBtnRef.current;
  const cartEl =
    document.querySelector("#cart-icon") ||
    document.querySelector("[data-cart-icon]");

  if (!flyEl || !btnEl || !cartEl) return;

  const btnRect = btnEl.getBoundingClientRect();
  const cartRect = cartEl.getBoundingClientRect();

  const scrollX = window.scrollX || window.pageXOffset;
const scrollY = window.scrollY || window.pageYOffset;

const startX = btnRect.left + btnRect.width / 2 + scrollX;
const startY = btnRect.top + scrollY;
const endX = cartRect.left + cartRect.width / 2 + scrollX;
const endY = cartRect.top + cartRect.height / 2 + scrollY;


  flyEl.style.left = `${startX}px`;
  flyEl.style.top = `${startY}px`;
  flyEl.style.opacity = "1";
  flyEl.style.transition = "none";
  flyEl.style.transform = "translate(-50%, -50%) scale(1)";

  requestAnimationFrame(() => {
    flyEl.style.transition =
  "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 2.4s";

    flyEl.style.transform = `translate(${endX - startX}px, ${
      endY - startY
    }px) scale(0.5)`;
    flyEl.style.opacity = "0";
  });

  // Cart icon bounce
  cartEl.classList.add("cart-bounce");
  setTimeout(() => cartEl.classList.remove("cart-bounce"), 400);
};



  // --- Initialize default selections when product changes
  useEffect(() => {
  const { variant, design, size } = readSelectionFromUrl();

  let v =
    product.varients?.find(x => String(x.id) === String(variant)) ||
    product.varients?.[0] ||
    null;

  setSelectedVarient(v);

  if (v && design) {
    const d = v.designs?.find(x => String(x.id) === String(design)) || null;
    setSelectedDesign(d);

    if (d && size) {
      const s = d.sizes?.find(x => String(x.id) === String(size)) || null;
      setSelectedSize(s);
    } else {
      setSelectedSize(null);
    }
  } else {
    setSelectedDesign(null);
    setSelectedSize(null);
  }

  setQuantity(1);
}, [product]);

useEffect(() => {
  const onPopState = () => {
    const { variant, design, size } = readSelectionFromUrl();

    let v =
      product.varients?.find(x => String(x.id) === String(variant)) ||
      product.varients?.[0] ||
      null;

    setSelectedVarient(v);

    if (v && design) {
      const d = v.designs?.find(x => String(x.id) === String(design)) || null;
      setSelectedDesign(d);

      if (d && size) {
        const s = d.sizes?.find(x => String(x.id) === String(size)) || null;
        setSelectedSize(s);
      } else {
        setSelectedSize(null);
      }
    } else {
      setSelectedDesign(null);
      setSelectedSize(null);
    }
  };

  window.addEventListener("popstate", onPopState);
  return () => window.removeEventListener("popstate", onPopState);
}, [product]);


  // --- Helpers
  const extractYouTubeId = (youtube) => {
    if (!youtube) return null;
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/;
    const m = youtube.match(regExp);
    if (m && m[1]) return m[1];
    const maybe = youtube.split("?")[0].split("#")[0].slice(-11);
    return /^[A-Za-z0-9_-]{11}$/.test(maybe) ? maybe : null;
  };

  // --- Build stable image list
  // Each entry: { id, type: 'image'|'youtube'|'placeholder', name, thumbnail_url, url }
  const mainProductImages = useMemo(() => {
    const images = [];
    const seen = new Set();

    const add = (id, obj) => {
        if (!obj?.name) return;
        if (seen.has(obj.name)) return;
        seen.add(obj.name);
        images.push({ id, ...obj });
    };

    // --- A) GLOBAL PRODUCT IMAGES (but NOT thumbnail) ---
    // Keep product.images[] only
    if (Array.isArray(product.images)) {
        product.images.forEach(img => {
            add(`p-img-${img.id ?? img.name}`, {
                type: "image",
                name: img.name,
                thumbnail_url: img.thumbnail_url ?? img.name,
            });
        });
    }

    // Do NOT include product.thumbnail ❌
    // Do NOT include "product-thumbnail"

    // If you also want to REMOVE small_image, remove this block too.
    if (product.small_image) {
        add("p-small-img", {
            type: "image",
            name: product.small_image,
            thumbnail_url: product.small_image,
        });
    }

    // --- B) VARIANT IMAGES ---
    if (selectedVarient) {
        // variant.images[]
        if (Array.isArray(selectedVarient.images)) {
            selectedVarient.images.forEach(img => {
                add(`v-img-${selectedVarient.id}-${img.id ?? img.name}`, {
                    type: "image",
                    name: img.name,
                    thumbnail_url: img.thumbnail_url ?? img.name,
                });
            });
        }

        // variant size_image
        if (selectedVarient.size_image) {
            add(`v-size-${selectedVarient.id}`, {
                type: "image",
                name: selectedVarient.size_image,
                thumbnail_url: selectedVarient.size_image,
            });
        }
    }

    // --- C) DESIGN SIZE IMAGE ---
    if (selectedDesign?.size_image) {
        add(`d-size-${selectedDesign.id}`, {
            type: "image",
            name: selectedDesign.size_image,
            thumbnail_url: selectedDesign.size_image,
        });
    }

    // --- D) SIZE SIZE IMAGE ---
    if (selectedSize?.size_image) {
        add(`s-size-${selectedSize.id}`, {
            type: "image",
            name: selectedSize.size_image,
            thumbnail_url: selectedSize.size_image,
        });
    }

    // --- E) YouTube ---
    const yt = extractYouTubeId(product.youtube);
    if (yt) {
        add(`yt-${yt}`, {
            type: "youtube",
            name: yt,
            thumbnail_url: `https://img.youtube.com/vi/${yt}/hqdefault.jpg`,
            url: `https://www.youtube.com/embed/${yt}?rel=0`,
        });
    }

    // --- F) Fallback placeholder ---
    if (images.length === 0) {
        add("placeholder", {
            type: "placeholder",
            name: "https://placehold.co/800x800?text=No+Image",
            thumbnail_url: "https://placehold.co/100x100?text=No+Image",
        });
    }

    return images;
}, [product, selectedVarient, selectedDesign, selectedSize]);

  // --- Active option derived for price
  const activeOption = selectedSize || selectedDesign || selectedVarient;
  const displayedMRP = activeOption?.mrp;
  const displayedPrice = activeOption?.price;

  // --- Build productForCart (composite id)
  const productForCart = useMemo(() => {
    if (!product || !selectedVarient) return null;
    const opt = activeOption || selectedVarient;
    const compositeId = [
      `p${product.id}`,
      `v${selectedVarient?.id}`,
      selectedDesign ? `d${selectedDesign.id}` : null,
      selectedSize ? `s${selectedSize.id}` : null,
    ]
      .filter(Boolean)
      .join("-");

    const mainImage = mainProductImages.find((i) => i.type === "image")?.name || product.thumbnail || null;

    return {
      id: compositeId,
      product_id: product.id,
      name: product.name,
      varient_id: selectedVarient?.id || null,
      design_id: selectedDesign?.id || null,
      size_id: selectedSize?.id || null,
      price: opt?.price ?? null,
      mrp: opt?.mrp ?? null,
      quantity: Number(quantity) || 1,
      image: mainImage,
    };
  }, [product, selectedVarient, selectedDesign, selectedSize, quantity, mainProductImages, activeOption]);

    const activeDetails = useMemo(() => {
  const src = selectedVarient ?? product;

  return {
    description: src.description || "",
    feature1: src.feature1 || "",
    feature2: src.feature2 || "",
    feature3: src.feature3 || "",
    material: src.material || "",
    size: src.size || "",
  };
}, [product, selectedVarient]);

  // --- CSRF & post helper
  const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : null;
  };

  const postJson = async (url, payload) => {
    const csrf = getCsrfToken();
    if (!csrf) {
      showFlash("Security error: CSRF token missing. Refresh the page.", "warning");
      return false;
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": csrf },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        showFlash(data.message || "Server error while updating cart", "warning");
        return false;
      }
      return true;
    } catch (err) {
      console.error("Network error:", err);
      showFlash("Network error. Please check your connection.", "warning");
      return false;
    }
  };

  // --- Add to cart
  const handleAddToCart = async () => {
    if (!selectedVarient) {
      showFlash("Please select a variant.", "warning");
      return;
    }
    const hasDesigns = Array.isArray(selectedVarient.designs) && selectedVarient.designs.length > 0;
    if (hasDesigns && !selectedDesign) {
      showFlash("Please select a design.", "warning");
      return;
    }
    const hasSizes = selectedDesign && Array.isArray(selectedDesign.sizes) && selectedDesign.sizes.length > 0;
    if (hasSizes && !selectedSize) {
      showFlash("Please select a size.", "warning");
      return;
    }
    if (!productForCart) {
      showFlash("Invalid selection.", "warning");
      return;
    }

    const payload = {
      product_id: productForCart.product_id,
      varient_id: productForCart.varient_id,
      design_id: productForCart.design_id,
      size_id: productForCart.size_id,
      quantity: productForCart.quantity,
      price: productForCart.price,
      mrp: productForCart.mrp,
    };

    const ok = await postJson("/cart/add-item", payload);
    if (ok) {
        animateAddToCart();
      addItemToCart(productForCart, productForCart.quantity);
      await fetchCartItemsFromBackend();
      showFlash("Added to cart.", "success");
    }
  };

  // --- Buy now (add and redirect)
  const handleBuyNow = async () => {
    if (!selectedVarient) {
      showFlash("Please select a variant.", "warning");
      return;
    }
    const hasDesigns = Array.isArray(selectedVarient.designs) && selectedVarient.designs.length > 0;
    if (hasDesigns && !selectedDesign) {
      showFlash("Please select a design.", "warning");
      return;
    }
    const hasSizes = selectedDesign && Array.isArray(selectedDesign.sizes) && selectedDesign.sizes.length > 0;
    if (hasSizes && !selectedSize) {
      showFlash("Please select a size.", "warning");
      return;
    }
    if (!productForCart) {
      showFlash("Invalid selection.", "warning");
      return;
    }

    const payload = {
      product_id: productForCart.product_id,
      varient_id: productForCart.varient_id,
      design_id: productForCart.design_id,
      size_id: productForCart.size_id,
      quantity: productForCart.quantity,
      price: productForCart.price,
      mrp: productForCart.mrp,
    };

    const ok = await postJson("/cart/add-item", payload);
    if (ok) {
      addItemToCart(productForCart, productForCart.quantity);
      await fetchCartItemsFromBackend();
      router.visit("/cart");
    }
  };

  const calculateDiscountPercentage = (mrp, price) => {
    if (typeof mrp === "number" && typeof price === "number" && mrp > 0) {
      return Math.round(((mrp - price) / mrp) * 100);
    }
    return 0;
  };

  const active = selectedSize || selectedDesign || selectedVarient;

const productJsonLd = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": product.name,
  "image": mainProductImages
    .filter(img => img.type === "image")
    .map(img => `${window.location.origin}/storage/${img.name}`),

  "description": active?.description || product.description || "",

  "sku": `VAR-${active?.id || product.id}`,
  "mpn": `${active?.id || product.id}`,
  "brand": {
    "@type": "Brand",
    "name": product.brand || "Amaltas"
  },

  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": active?.price ?? 0,
    "availability": active?.qty > 0
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    "url": window.location.href
  }
};




  // --- Render
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <Head title={`${product.name} | Amaltas Furniture`}>
      
      {/* Open Graph Tags */}
  <meta property="og:title" content={`${product.name} | Amaltas Furniture`} />
  <meta property="og:description" content={activeDetails?.description || product.description || "Check out this product"} />
  <meta property="og:type" content="product" />
  <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
  
  {/* Add the primary product image for the link preview */}
  {mainProductImages.filter(img => img.type === "image").length > 0 && (
    <meta 
      property="og:image" 
      content={`${typeof window !== 'undefined' ? window.location.origin : ''}/storage/${mainProductImages.filter(img => img.type === "image")[0].name}`} 
    />
  )}
  
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
{/* Fly to cart animation element */}
<div
  ref={flyRef}
  className="fixed pointer-events-none z-[9999]
    flex items-center justify-center
    bg-maroon-800 text-white
    font-extrabold
    text-lg md:text-xl
    w-10 h-10 md:w-12 md:h-12
    rounded-full
    shadow-lg
    opacity-0"
  style={{ transform: "translate(-50%, -50%)" }}
>
  +{quantity}
</div>



      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{product.name}</h1>

        </div>

        {/* Two-column area: Gallery (left) / Details (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Gallery (left) - 7/12 => wide gallery */}
          <div className="lg:col-span-7">
            <ImageGallery images={mainProductImages} productName={product.name} />
          </div>

          {/* Details (right) - 5/12 */}
          <div className="lg:col-span-5 space-y-6">
            {/* Price block */}
            <div className="bg-white p-4 rounded-lg shadow">
              {typeof displayedMRP === "number" && typeof displayedPrice === "number" ? (
                <div>
                  <div className="text-gray-500 line-through">MRP: ₹{displayedMRP}</div>
                  <div className="text-3xl font-extrabold text-maroon-700">₹{displayedPrice}</div>
                  <div className="text-sm text-blue-600">
                    {calculateDiscountPercentage(displayedMRP, displayedPrice)}% OFF
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-semibold">Price on selection</div>
              )}

              {/* Quantity and actions */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700">Qty</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setQuantity(Number.isFinite(v) && v > 0 ? v : 1);
                    }}
                    className="w-20 p-2 border rounded text-center"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    ref={addToCartBtnRef}
                    className="bg-maroon-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-maroon-700 transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition"
                  >
                    Buy Now
                  </button>
                </div>
                {/* Flash */}
                </div>
        {flashMessage && (
          <div className={`mt-6 p-3 rounded-md text-white text-center ${flashType === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {flashMessage}
          </div>
        )}

            </div>

            {/* Variant / design / size selectors */}
            <div className="bg-white p-4 rounded-lg shadow">
              {/* Variants */}
              {product.varients?.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Variant</h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.varients.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                            setSelectedVarient(v);
                            setSelectedDesign(null);
                            setSelectedSize(null);
                            updateSelectionInUrl({ v: v.id });
                            }}
                        className={`px-3 py-2 rounded-md border text-sm ${selectedVarient?.id === v.id
                          ? "bg-maroon-600 text-white border-maroon-600"
                          : "bg-white border-gray-300 hover:border-maroon-300"
                          }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Designs */}
              {selectedVarient?.designs?.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Design</h3>
                  <div className="flex gap-3 flex-wrap">
                    {selectedVarient.designs.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
  setSelectedDesign(d);
  setSelectedSize(null);
  updateSelectionInUrl({
    v: selectedVarient.id,
    d: d.id,
  });
}}

                        className={`px-3 py-2 rounded-md border text-sm ${selectedDesign?.id === d.id
                          ? "bg-maroon-600 text-white border-maroon-600"
                          : "bg-white border-gray-300 hover:border-maroon-300"
                          }`}
                      >
                        {d.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {selectedDesign?.sizes?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Size</h3>
                  <div className="flex gap-3 flex-wrap">
                    {selectedDesign.sizes.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
  setSelectedSize(s);
  updateSelectionInUrl({
    v: selectedVarient.id,
    d: selectedDesign.id,
    s: s.id,
  });
}}

                        className={`px-3 py-2 rounded-md border text-sm ${selectedSize?.id === s.id
                          ? "bg-maroon-600 text-white border-maroon-600"
                          : "bg-white border-gray-300 hover:border-maroon-300"
                          }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-white p-4 rounded-lg shadow text-sm text-gray-700">
              <p className="font-semibold mb-2">Product Details</p>
              {activeDetails.description && (
  <p className="mb-2 text-gray-700">{activeDetails.description}</p>
)}

{activeDetails.feature1 && <p>• {activeDetails.feature1}</p>}
{activeDetails.feature2 && <p>• {activeDetails.feature2}</p>}
{activeDetails.feature3 && <p>• {activeDetails.feature3}</p>}
{activeDetails.material &&
<div className="flex align-middle mt-3">
<p className="font-semibold">Material: </p>
<p className="ml-1">{ activeDetails.material}</p>
</div>
}
{activeDetails.size &&
<div className="flex align-middle mt-3">
<p className="font-semibold">Size: </p>
<p className="ml-1">{ activeDetails.size}</p>
</div>
}

            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
