export const readSelectionFromUrl = () => {
  if (typeof window === "undefined") {
    return { variant: null, design: null, size: null };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    variant: params.get("variant"),
    design: params.get("design"),
    size: params.get("size"),
  };
};

export const updateSelectionInUrl = ({ v, d, s }) => {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);

  if (v) params.set("variant", v);
  else params.delete("variant");

  if (d) params.set("design", d);
  else params.delete("design");

  if (s) params.set("size", s);
  else params.delete("size");

  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;

  window.history.replaceState({}, "", nextUrl);
};

export const resolveSelection = (product, { variant, design, size }) => {
  const selectedVarient =
    product?.varients?.find((x) => String(x.id) === String(variant)) ||
    product?.varients?.[0] ||
    null;

  if (!selectedVarient || !design) {
    return {
      selectedVarient,
      selectedDesign: null,
      selectedSize: null,
    };
  }

  const selectedDesign =
    selectedVarient.designs?.find((x) => String(x.id) === String(design)) || null;

  if (!selectedDesign || !size) {
    return {
      selectedVarient,
      selectedDesign,
      selectedSize: null,
    };
  }

  const selectedSize =
    selectedDesign.sizes?.find((x) => String(x.id) === String(size)) || null;

  return {
    selectedVarient,
    selectedDesign,
    selectedSize,
  };
};
