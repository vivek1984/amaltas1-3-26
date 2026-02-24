import React, { useMemo } from "react";
import ImageGallery from "./ImageGallery";
import { useCart } from "@/Context/CartContext";
import ProductMetaHead from "./ProductPageComponents/ProductMetaHead";
import AddToCartFlyBadge from "./ProductPageComponents/AddToCartFlyBadge";
import ProductPricingActions from "./ProductPageComponents/ProductPricingActions";
import ProductOptionSelectors from "./ProductPageComponents/ProductOptionSelectors";
import ProductDetailsCard from "./ProductPageComponents/ProductDetailsCard";
import useProductSelection from "./ProductPageComponents/useProductSelection";
import useProductMedia from "./ProductPageComponents/useProductMedia";
import useProductCartActions, {
  calculateDiscountPercentage,
} from "./ProductPageComponents/useProductCartActions";

/**
 * ProductPage - Layout B (wider gallery focus)
 * Expects `product` prop shaped like the sample you shared.
 */
export default function ProductPage({ product }) {
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        Product data not available.
      </div>
    );
  }

  const { addItemToCart } = useCart();

  const {
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
  } = useProductSelection(product);

  const { mainProductImages, productJsonLd } = useProductMedia({
    product,
    selectedVarient,
    selectedDesign,
    selectedSize,
    activeOption,
  });

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

    const mainImage =
      mainProductImages.find((image) => image.type === "image")?.name ||
      product.thumbnail ||
      null;

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
  }, [
    product,
    selectedVarient,
    selectedDesign,
    selectedSize,
    quantity,
    mainProductImages,
    activeOption,
  ]);

  const { flashMessage, flashType, addToCartBtnRef, flyRef, handleAddToCart, handleBuyNow } =
    useProductCartActions({
      selectedVarient,
      selectedDesign,
      selectedSize,
      productForCart,
      addItemToCart,
    });

  const displayedMRP = activeOption?.mrp;
  const displayedPrice = activeOption?.price;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <ProductMetaHead
        product={product}
        mainProductImages={mainProductImages}
        productJsonLd={productJsonLd}
      />
      <AddToCartFlyBadge flyRef={flyRef} quantity={quantity} />

      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{product.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <ImageGallery images={mainProductImages} productName={product.name} />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <ProductPricingActions
              displayedMRP={displayedMRP}
              displayedPrice={displayedPrice}
              calculateDiscountPercentage={calculateDiscountPercentage}
              quantity={quantity}
              setQuantity={setQuantity}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
              addToCartBtnRef={addToCartBtnRef}
              flashMessage={flashMessage}
              flashType={flashType}
            />

            <ProductOptionSelectors
              product={product}
              selectedVarient={selectedVarient}
              selectedDesign={selectedDesign}
              selectedSize={selectedSize}
              onVariantChange={handleVariantChange}
              onDesignChange={handleDesignChange}
              onSizeChange={handleSizeChange}
            />

            <ProductDetailsCard activeDetails={activeDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}
