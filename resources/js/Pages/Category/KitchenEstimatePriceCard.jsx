import React, { useState } from "react";
import Welcome from "../Welcome";

export default function KitchenEstimatePriceCard({
  subtotal = 0,
  gst = 0,
  total = 0,
  material = [],
  clusters,
}) {
  const [showDetails, setShowDetails] = useState(false);

  // 🔹 Safely parse backend material array
  const layout = material?.[0] ?? null;
  const cabinetMaterial = material?.[1] ?? null;
  const shutterMaterial = material?.[2] ?? null;
  const backendSubtotal = material?.[3] ?? 0;
  const cabinets = Array.isArray(material?.[4]) ? material[4] : [];

  // 🔹 Layout → Image map
  const layoutImages = {
    "L-Shaped Kitchen": "/storage/modular_kitchen/l_shaped.jpg",
    "U-Shaped Kitchen": "/storage/modular_kitchen/u_shaped.jpg",
    "Parallel Kitchen": "/storage/modular_kitchen/h_shaped.jpg",
    "Straight Kitchen": "/storage/modular_kitchen/straight.jpg",
  };

  // 🔹 Cabinet image map
  const CABINET_IMAGE_MAP = {
    "tandum drawer": "/storage/cabinets/tandum-drawer.jpg",
    "bottle pull out": "/storage/cabinets/bpo.jpeg",
    "corner cabinet": "/storage/cabinets/corner.jpg",
    "wire basket drawer": "/storage/cabinets/wire-basket.jpeg",
    "sink cabinet": "/storage/cabinets/sink.jpeg",
    "door cabinet": "/storage/cabinets/door.jpg",
    "lift up cabinet": "/storage/cabinets/liftup.jpg",
    "profile door cabinet": "/storage/cabinets/profile-dooor.png",
    "chimney cabinet": "/storage/cabinets/chimney.jpg",
  };

  const finalSubtotal = Math.round(subtotal || backendSubtotal || 0);

  function getCabinetImage(cabinet) {
    if (!cabinet) return null;
    if (cabinet.image) return cabinet.image;
    if (cabinet.image_key) return `/storage/cabinets/${cabinet.image_key}`;
    const nameKey = cabinet.cabinet_name?.toLowerCase().trim();
    return CABINET_IMAGE_MAP[nameKey] || null;
  }

  return (
    <Welcome clusters={clusters}>
      <div className="mx-auto max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
        {/* 🔹 Layout Image */}
        {layoutImages[layout] && (
          <div className="bg-gray-50 p-6 flex justify-center">
            <img
              src={layoutImages[layout]}
              alt={layout}
              className="w-full max-w-sm rounded-xl shadow-md"
            />
          </div>
        )}

        {/* 🔹 Header */}
        <div className="px-6 pt-6 pb-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <p className="text-xs uppercase tracking-widest text-gray-300">
            Estimated Price
          </p>

          <p className="text-3xl font-extrabold mt-1">
            ₹{finalSubtotal.toLocaleString("en-IN")}
            <span className="text-sm font-medium text-gray-300">*</span>
          </p>

          {/* 🔹 Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {layout && (
              <span className="px-3 py-1 text-xs rounded-full bg-gray-700">
                {layout}
              </span>
            )}
            {cabinetMaterial && (
              <span className="px-3 py-1 text-xs rounded-full bg-gray-700">
                {cabinetMaterial}
              </span>
            )}
            {shutterMaterial && (
              <span className="px-3 py-1 text-xs rounded-full bg-gray-700">
                {shutterMaterial}
              </span>
            )}
          </div>
        </div>

        {/* 🔹 Cabinets & Hardware */}
        <div className="bg-gray-50 border-t">
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            aria-expanded={showDetails}
            className="w-full px-6 py-4 flex justify-between items-center text-sm font-semibold text-gray-800 hover:bg-gray-100 transition"
          >
            <span>Included Cabinets & Hardware</span>
            <span
              className={`transition-transform ${
                showDetails ? "rotate-180" : ""
              }`}
            >
              ⌄
            </span>
          </button>

          {showDetails && (
            <div className="px-6 pb-6 space-y-4">
              {cabinets.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  No cabinet details available.
                </p>
              )}

              {cabinets.map((cabinet, idx) => {
                const cabinetImage = getCabinetImage(cabinet);

                return (
                  <div
                    key={idx}
                    className="flex gap-4 p-5 bg-white border rounded-xl hover:shadow-md transition"
                  >
                    {/* 🔹 Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      {cabinetImage ? (
                        <img
                          src={cabinetImage}
                          alt={cabinet?.cabinet_name || "Cabinet"}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* 🔹 Details */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {cabinet?.cabinet_name || "Unnamed Cabinet"}
                      </p>

                      {Array.isArray(cabinet?.hardware) &&
                      cabinet.hardware.length > 0 ? (
                        <ul className="mt-2 space-y-1 text-xs text-gray-600">
                          {cabinet.hardware.map((h, i) => (
                            <li
                              key={i}
                              className="flex justify-between"
                            >
                              <span>{h?.name}</span>
                              <span className="font-medium">
                                × {h?.quantity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-500 italic mt-1">
                          No hardware included
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 🔹 Footer */}
        <div className="bg-gray-50 px-5 py-4 text-center border-t">
          <p className="text-[11px] text-gray-400">
            *Prices are indicative and subject to final site measurements.
          </p>
        </div>
      </div>
    </Welcome>
  );
}
