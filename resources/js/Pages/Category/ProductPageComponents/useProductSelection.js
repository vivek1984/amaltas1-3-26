import { useEffect, useMemo, useState } from "react";
import {
  readSelectionFromUrl,
  resolveSelection,
  updateSelectionInUrl,
} from "./productSelectionUtils";

export default function useProductSelection(product) {
  const [selectedVarient, setSelectedVarient] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const next = resolveSelection(product, readSelectionFromUrl());
    setSelectedVarient(next.selectedVarient);
    setSelectedDesign(next.selectedDesign);
    setSelectedSize(next.selectedSize);
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const onPopState = () => {
      const next = resolveSelection(product, readSelectionFromUrl());
      setSelectedVarient(next.selectedVarient);
      setSelectedDesign(next.selectedDesign);
      setSelectedSize(next.selectedSize);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [product]);

  const activeOption = selectedSize || selectedDesign || selectedVarient;

  const activeDetails = useMemo(() => {
    const src = selectedVarient ?? product;

    return {
      description: src?.description || "",
      feature1: src?.feature1 || "",
      feature2: src?.feature2 || "",
      feature3: src?.feature3 || "",
      material: src?.material || "",
      size: src?.size || "",
    };
  }, [product, selectedVarient]);

  const handleVariantChange = (variant) => {
    setSelectedVarient(variant);
    setSelectedDesign(null);
    setSelectedSize(null);
    updateSelectionInUrl({ v: variant.id });
  };

  const handleDesignChange = (design) => {
    if (!selectedVarient) return;
    setSelectedDesign(design);
    setSelectedSize(null);
    updateSelectionInUrl({
      v: selectedVarient.id,
      d: design.id,
    });
  };

  const handleSizeChange = (size) => {
    if (!selectedVarient || !selectedDesign) return;
    setSelectedSize(size);
    updateSelectionInUrl({
      v: selectedVarient.id,
      d: selectedDesign.id,
      s: size.id,
    });
  };

  return {
    selectedVarient,
    selectedDesign,
    selectedSize,
    quantity,
    setQuantity,
    activeOption,
    activeDetails,
    handleVariantChange,
    handleDesignChange,
    handleSizeChange,
  };
}
