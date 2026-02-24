export default function ProductPricingActions({
  displayedMRP,
  displayedPrice,
  calculateDiscountPercentage,
  quantity,
  setQuantity,
  handleAddToCart,
  handleBuyNow,
  addToCartBtnRef,
  flashMessage,
  flashType,
}) {
  return (
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

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Qty</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value);
              setQuantity(Number.isFinite(value) && value > 0 ? value : 1);
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
      </div>

      {flashMessage && (
        <div
          className={`mt-6 p-3 rounded-md text-white text-center ${
            flashType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {flashMessage}
        </div>
      )}
    </div>
  );
}
