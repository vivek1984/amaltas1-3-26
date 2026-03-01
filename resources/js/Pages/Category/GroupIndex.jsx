import { Link } from "@inertiajs/react";
import Welcome from "../Welcome";

export default function GroupIndex({ group = null, clusters = [] }) {
  const products = Array.isArray(group?.products) ? group.products : [];

  function getPriceStrip(product) {
    const variant = Array.isArray(product?.varients)
      ? product.varients[0]
      : null;

    if (!variant) return null;

    return (
      <div className="mt-1 text-xs">
        <div className="flex justify-between">
          <span className="text-red-600 line-through">
            ₹{variant.mrp}
          </span>
          <span className="text-green-700 font-semibold">
            ₹{variant.price}
          </span>
          <span className="text-gray-600">
            {Math.round(
              ((variant.mrp - variant.price) * 100) / variant.mrp
            )}
            % OFF
          </span>
        </div>
      </div>
    );
  }

  /* ---------- SEO ---------- */
  const pageTitle = group?.name
    ? `${group.name} | Amaltas Furniture & Modular Kitchens`
    : "Furniture Category | Amaltas";

  const pageDescription = group?.description
    ? `${group.description} – Explore premium quality furniture at Amaltas Furniture & Modular Kitchens, GMS Road, Dehradun.`
    : "Explore premium furniture categories at Amaltas Furniture, Dehradun.";

  return (
    <Welcome
      clusters={clusters}
      title={pageTitle}
      description={pageDescription}
      ogImage={group?.image ? `/storage/${group.image}` : undefined}
    >
      {/* ---------------- GROUP WITH PRODUCTS ---------------- */}
      {group && products.length > 0 && (
        <section className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2 text-center">
            {group.name}
          </h1>

          {group.description && (
            <p className="text-center text-sm text-gray-600 mb-6">
              {group.description}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/${product.slug}`}
                data={{ id: "product" }}
                className="block rounded-xl overflow-hidden border p-4 hover:shadow-lg transition"
              >
                <img
                  src={`/storage/${product.small_image}`}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-md mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/300x200/E0E0E0/A0A0A0?text=Product";
                  }}
                />

                <h2 className="text-sm font-semibold text-gray-800 mb-1">
                  {product.name}
                </h2>

                {getPriceStrip(product)}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- GROUP WITHOUT PRODUCTS ---------------- */}
      {group && products.length === 0 && (
        <section className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">
            {group.name}
          </h1>

          {group.description && (
            <p className="text-sm text-gray-600 mb-6">
              {group.description}
            </p>
          )}

          <p className="text-gray-700">
            New products are being added in this category.
            Please check back later or explore other categories.
          </p>
        </section>
      )}
    </Welcome>
  );
}
