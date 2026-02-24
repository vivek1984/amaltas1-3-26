export default function AddToCartFlyBadge({ flyRef, quantity }) {
  return (
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
  );
}
