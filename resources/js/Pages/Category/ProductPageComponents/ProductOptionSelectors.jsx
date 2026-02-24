export default function ProductOptionSelectors({
  product,
  selectedVarient,
  selectedDesign,
  selectedSize,
  onVariantChange,
  onDesignChange,
  onSizeChange,
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {product.varients?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Variant</h3>
          <div className="flex gap-3 flex-wrap">
            {product.varients.map((variant) => (
              <button
                key={variant.id}
                onClick={() => onVariantChange(variant)}
                className={`px-3 py-2 rounded-md border text-sm ${
                  selectedVarient?.id === variant.id
                    ? "bg-maroon-600 text-white border-maroon-600"
                    : "bg-white border-gray-300 hover:border-maroon-300"
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedVarient?.designs?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Design</h3>
          <div className="flex gap-3 flex-wrap">
            {selectedVarient.designs.map((design) => (
              <button
                key={design.id}
                onClick={() => onDesignChange(design)}
                className={`px-3 py-2 rounded-md border text-sm ${
                  selectedDesign?.id === design.id
                    ? "bg-maroon-600 text-white border-maroon-600"
                    : "bg-white border-gray-300 hover:border-maroon-300"
                }`}
              >
                {design.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDesign?.sizes?.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Size</h3>
          <div className="flex gap-3 flex-wrap">
            {selectedDesign.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => onSizeChange(size)}
                className={`px-3 py-2 rounded-md border text-sm ${
                  selectedSize?.id === size.id
                    ? "bg-maroon-600 text-white border-maroon-600"
                    : "bg-white border-gray-300 hover:border-maroon-300"
                }`}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
