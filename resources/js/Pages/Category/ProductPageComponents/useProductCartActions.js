import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export const calculateDiscountPercentage = (mrp, price) => {
  if (typeof mrp === "number" && typeof price === "number" && mrp > 0) {
    return Math.round(((mrp - price) / mrp) * 100);
  }
  return 0;
};

export default function useProductCartActions({
  selectedVarient,
  selectedDesign,
  selectedSize,
  productForCart,
  addItemToCart,
  fetchCartItemsFromBackend,
}) {
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

  useEffect(() => {
    return () => {
      if (flashRef.current) clearTimeout(flashRef.current);
    };
  }, []);

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

    cartEl.classList.add("cart-bounce");
    setTimeout(() => cartEl.classList.remove("cart-bounce"), 400);
  };

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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": csrf,
        },
        body: JSON.stringify(payload),
      });

      if (res.redirected && res.url.includes("/login")) {
        router.visit("/cart");
        return false;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        showFlash(data.message || "Server error while updating cart", "warning");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Network error:", error);
      showFlash("Network error. Please check your connection.", "warning");
      return false;
    }
  };

  const validateSelection = () => {
    if (!selectedVarient) return "Please select a variant.";

    const hasDesigns =
      Array.isArray(selectedVarient.designs) && selectedVarient.designs.length > 0;
    if (hasDesigns && !selectedDesign) return "Please select a design.";

    const hasSizes =
      selectedDesign &&
      Array.isArray(selectedDesign.sizes) &&
      selectedDesign.sizes.length > 0;
    if (hasSizes && !selectedSize) return "Please select a size.";

    if (!productForCart) return "Invalid selection.";

    return null;
  };

  const buildPayload = () => ({
    product_id: productForCart.product_id,
    varient_id: productForCart.varient_id,
    design_id: productForCart.design_id,
    size_id: productForCart.size_id,
    quantity: productForCart.quantity,
    price: productForCart.price,
    mrp: productForCart.mrp,
  });

  const handleAddToCart = async () => {
    const validationError = validateSelection();
    if (validationError) {
      showFlash(validationError, "warning");
      return;
    }

    const ok = await postJson("/cart/add-item", buildPayload());
    if (ok) {
      animateAddToCart();
      addItemToCart(productForCart, productForCart.quantity);
      if (typeof fetchCartItemsFromBackend === "function") {
        await fetchCartItemsFromBackend();
      }
      showFlash("Added to cart.", "success");
    }
  };

  const handleBuyNow = async () => {
    const validationError = validateSelection();
    if (validationError) {
      showFlash(validationError, "warning");
      return;
    }

    const ok = await postJson("/cart/add-item", buildPayload());
    if (ok) {
      addItemToCart(productForCart, productForCart.quantity);
      if (typeof fetchCartItemsFromBackend === "function") {
        await fetchCartItemsFromBackend();
      }
      router.visit("/cart");
    }
  };

  return {
    flashMessage,
    flashType,
    addToCartBtnRef,
    flyRef,
    handleAddToCart,
    handleBuyNow,
  };
}
