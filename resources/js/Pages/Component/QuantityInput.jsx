import React from "react";

const QuantityInput = ({ value, onChange, min = 1 }) => {
  const updateQuantity = (newValue) => {
    if (newValue < min) return; // prevent going below minimum
    onChange(newValue);
  };

  return (
    <div className="flex items-center border rounded-md w-28">
      {/* Minus button */}
      <button
        type="button"
        className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200 rounded-l-md"
        onClick={() => updateQuantity(value - 1)}
      >
        –
      </button>

      {/* Quantity input field */}
      <input
        type="number"
        value={value}
        min={min}
        onChange={(e) => updateQuantity(Number(e.target.value))}
        className="w-full text-center outline-none"
      />

      {/* Plus button */}
      <button
        type="button"
        className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200 rounded-r-md"
        onClick={() => updateQuantity(value + 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
