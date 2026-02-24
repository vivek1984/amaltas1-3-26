import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`border rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
      {...props}
    />
  );
}
