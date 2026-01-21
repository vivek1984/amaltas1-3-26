import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

export default function Estimate({
  costing = [],
  installation = 0,
  estimates = [],
  material = {},
  materials = [],
  addons = [],
  cabinetTypes = [],
  embedded = false, // 👈 Pass true when rendering inside dashboard to hide admin layout
}) {
    console.log(addons);
  // ---------- Helpers / lookups ----------
  const allMaterials = Array.isArray(materials) ? materials : [];
  const materialLookup = (name) => allMaterials.find((m) => m.name === name);

  const bodyMaterialObjects = allMaterials.filter((m) =>
    (m.categories || []).some((c) => c.name === "Cabinet Body")
  );
  const backMaterialObjects = allMaterials.filter((m) =>
    (m.categories || []).some((c) => c.name === "Back of Cabinet")
  );
  const shutterMaterialObjects = allMaterials.filter((m) =>
    (m.categories || []).some((c) => c.name === "Doors")
  );
  const laminateObjects = allMaterials.filter((m) =>
    (m.categories || []).some((c) => c.name === "Laminate")
  );

  const findCabinetTypeByName = (name) =>
    cabinetTypes.find((ct) => ct.name === name);

  // ---------- State ----------
  const [estimatesList, setEstimatesList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [currentEstimate, setCurrentEstimate] = useState(null);

  const [materialSpecs, setMaterialSpecs] = useState({
    bodyMaterial: "",
    bodyLaminate: "",
    backMaterial: "",
    backLaminate: "",
    shutterMaterial: "",
    shutterLaminate: "",
  });

  const [editMode, setEditMode] = useState({
    body: false,
    back: false,
    shutter: false,
  });

  // hardwareEdit: boolean per cabinet id
  const [hardwareEdit, setHardwareEdit] = useState({});
  // hardwareSelections: { [cabinetId]: { [hardwareName]: { selected, quantity, rate } } }
  const [hardwareSelections, setHardwareSelections] = useState({});

  // ---------- Load estimates + selected client ----------
  useEffect(() => {
    const sorted = [...estimates].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setEstimatesList(sorted);

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      setSelectedId(id);
      const client = sorted.find((e) => String(e.id) === id);
      setCurrentEstimate(client);
    } else {
      setSelectedId("");
      setCurrentEstimate(null);
    }
  }, [estimates]);

  // ---------- Initialize materials ----------
  useEffect(() => {
    if (Object.keys(material).length > 0) {
      const getMat = (key) => materialLookup(material[key]);
      const firstLam = laminateObjects[0]?.name || "";
      const bodyMat = getMat("bodyMaterial");
      const backMat = getMat("backMaterial");
      const shutterMat = getMat("shutterMaterial");

      setMaterialSpecs({
        bodyMaterial: material.bodyMaterial || bodyMaterialObjects[0]?.name || "",
        bodyLaminate:
          bodyMat && bodyMat.mica === 1
            ? material.bodyLaminate || firstLam
            : "",
        backMaterial: material.backMaterial || backMaterialObjects[0]?.name || "",
        backLaminate:
          backMat && backMat.mica === 1
            ? material.backLaminate || firstLam
            : "",
        shutterMaterial:
          material.shutterMaterial || shutterMaterialObjects[0]?.name || "",
        shutterLaminate:
          shutterMat && shutterMat.mica === 1
            ? material.shutterLaminate || firstLam
            : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [material, allMaterials.length]);

  // ---------- Material handlers ----------
  const handleMaterialChange = (name, value) => {
    setMaterialSpecs((prev) => {
      const newState = { ...prev, [name]: value };
      if (name.endsWith("Material")) {
        const newMat = materialLookup(value);
        const laminateKey = name.replace("Material", "Laminate");
        const firstLam = laminateObjects[0]?.name || "";
        newState[laminateKey] = newMat && newMat.mica === 1 ? firstLam : "";
      }
      return newState;
    });
  };

  const handleSubmitMaterials = () => {
    if (!selectedId) return;
    router.post(`/${selectedId}/edit_estimate_material`, materialSpecs, {
      preserveScroll: true,
    });
  };

  // ---------- Hardware: init / toggle / change / save ----------
  /**
   * Create selection state for a cabinet:
   * - available: from cabinetType.materials filtered by "Hardware" category
   * - selected: from cab.hardware (selected items only)
   */
  const initHardwareSelections = (cabinetId, cab) => {
    // Find cabinetType by exact name match
    const cabinetType = findCabinetTypeByName(cab.name);

    // availableHardware from cabinetType (materials with category "Hardware")
    let availableHardware = [];
    if (cabinetType && Array.isArray(cabinetType.materials)) {
      availableHardware = cabinetType.materials.filter((m) =>
        (m.categories || []).some((c) => c.name === "Hardware")
      );
    } else {
      // fallback: if no cabinetType, try to use cab.hardware (rates come from there)
      availableHardware = (cab.hardware || []).map((h) => ({
        id: h.id,
        name: h.name,
        rate: h.rate || 0,
      }));
    }

    // Map selected hardware from the estimate cabinet (cab.hardware)
    const selectedMap = (cab.hardware || []).reduce((acc, h) => {
      acc[h.name] = { quantity: h.quantity || 0, rate: h.rate || 0 };
      return acc;
    }, {});

    // Build selection object
    const selectionObj = availableHardware.reduce((acc, h) => {
      const sel = selectedMap[h.name];
      acc[h.name] = {
        selected: Boolean(sel && sel.quantity > 0),
        quantity: sel ? sel.quantity : 1,
        rate: sel ? sel.rate : h.rate || 0,
      };
      return acc;
    }, {});

    setHardwareSelections((prev) => ({ ...prev, [cabinetId]: selectionObj }));
  };

  const toggleHardwareEdit = (cab) => {
    const editing = Boolean(hardwareEdit[cab.id]);
    // if entering edit mode, initialize selections
    if (!editing) {
      initHardwareSelections(cab.id, cab);
    }
    setHardwareEdit((prev) => ({ ...prev, [cab.id]: !editing }));
  };

  const handleHardwareSelect = (cabinetId, name, rate, checked) => {
    setHardwareSelections((prev) => {
      const cabSel = { ...(prev[cabinetId] || {}) };
      if (checked) {
        cabSel[name] = { selected: true, quantity: cabSel[name]?.quantity || 1, rate: rate || cabSel[name]?.rate || 0 };
      } else {
        // mark unselected but keep quantity & rate in case user toggles back
        cabSel[name] = { ...(cabSel[name] || { quantity: 1, rate: rate || 0 }), selected: false };
      }
      return { ...prev, [cabinetId]: cabSel };
    });
  };

  const handleHardwareQuantityChange = (cabinetId, name, qty) => {
    const numeric = Number(qty) || 0;
    setHardwareSelections((prev) => ({
      ...prev,
      [cabinetId]: {
        ...prev[cabinetId],
        [name]: { ...prev[cabinetId][name], quantity: numeric, selected: numeric > 0 ? prev[cabinetId][name]?.selected ?? true : false },
      },
    }));
  };

  const handleSaveHardware = (cabinetId) => {
    const selObj = hardwareSelections[cabinetId] || {};
    const selectedHardware = Object.entries(selObj)
      .filter(([_, data]) => data.selected)
      .map(([name, data]) => ({
        name,
        quantity: data.quantity,
      }));

    router.post(`/update_hardware/${cabinetId}`, { hardware: selectedHardware }, {
      preserveScroll: true,
    });

    // close editor locally — backend should return a refreshed estimate on navigation/response
    setHardwareEdit((prev) => ({ ...prev, [cabinetId]: false }));
  };

  // ---------- Calculation helpers ----------
  const calcHardwareCost = (hardware) =>
    Array.isArray(hardware)
      ? hardware.reduce((sum, h) => sum + (Number(h.rate) || 0) * (Number(h.quantity) || 1), 0)
      : 0;

  const calcAddonCost = (addons) =>
    Array.isArray(addons) ? addons.reduce((sum, a) => sum + parseFloat(a.amount || 0), 0) : 0;

  // Totals
  const totalCabinets = costing.reduce((t, c) => t + (Number(c.cost) || 0), 0);
  const totalHardware = costing.reduce((t, c) => t + calcHardwareCost(c.hardware), 0);
  const totalAddons = calcAddonCost(addons);
  const installationCost = Number(installation) || 0;
  const subtotal = totalCabinets + totalHardware + totalAddons + installationCost;
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;
  const hasResults = costing.length > 0;

  // ---------- Page content ----------
  const content = (
    <div className="p-6 bg-gray-50 rounded-lg shadow-xl">
      {/* 🔽 Select Estimate */}
      <div className="mb-8 p-4 bg-white border rounded-lg shadow-sm">
        <label className="block text-lg font-medium mb-2">Select a Client Estimate:</label>
        <select
          value={selectedId}
          onChange={(e) => {
            const id = e.target.value;
            // keep same behavior: navigate by updating query param
            window.location.href = id ? `${window.location.pathname}?id=${id}` : window.location.pathname;
          }}
          className="w-full border-gray-300 rounded-md"
        >
          <option value="">-- Select an Estimate --</option>
          {estimatesList.map((e) => (
            <option key={e.id} value={e.id}>
              {e.clientName} ({new Date(e.created_at).toLocaleDateString("en-US")})
            </option>
          ))}
        </select>
      </div>

      {/* 🧍 Client Info + Materials */}
      {currentEstimate && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Client Info */}
          <div className="p-4 bg-indigo-50 border rounded-lg">
            <h2 className="font-bold text-indigo-700 mb-2">Client Information</h2>
            <p><strong>Name:</strong> {currentEstimate.clientName}</p>
            <p><strong>Phone:</strong> {currentEstimate.clientPhone}</p>
            <p><strong>Address:</strong> {currentEstimate.address}</p>
          </div>

          {/* Material Specs */}
          <div className="p-4 bg-yellow-50 border rounded-lg">
            <h2 className="font-bold text-yellow-700 mb-4">Material Specifications</h2>
            {["body", "back", "shutter"].map((section) => {
              const selectedMat = materialLookup(materialSpecs[`${section}Material`]);
              const showLam = selectedMat && selectedMat.mica === 1;
              const labelMap = { body: "Body Material", back: "Back Panel", shutter: "Shutter" };
              const optionsMap = {
                body: bodyMaterialObjects,
                back: backMaterialObjects,
                shutter: shutterMaterialObjects,
              };

              return (
                <div key={section} className="flex items-center justify-between mb-3">
                  <label className="w-1/3 text-sm font-medium">{labelMap[section]}:</label>
                  <div className="w-1/3">
                    {editMode[section] ? (
                      <select
                        value={materialSpecs[`${section}Material`]}
                        onChange={(e) =>
                          handleMaterialChange(`${section}Material`, e.target.value)
                        }
                        className="w-full border rounded p-1 text-sm"
                      >
                        {optionsMap[section].map((opt) => (
                          <option key={opt.name} value={opt.name}>
                            {opt.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-sm font-medium text-gray-800">
                        {materialSpecs[`${section}Material`] || "—"}
                      </p>
                    )}
                  </div>

                  <div className="w-1/3">
                    {showLam ? (
                      editMode[section] ? (
                        <select
                          value={materialSpecs[`${section}Laminate`]}
                          onChange={(e) =>
                            handleMaterialChange(`${section}Laminate`, e.target.value)
                          }
                          className="w-full border rounded p-1 text-sm"
                        >
                          {laminateObjects.map((opt) => (
                            <option key={opt.name} value={opt.name}>
                              {opt.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-sm text-gray-800">
                          {materialSpecs[`${section}Laminate`] || "—"}
                        </p>
                      )
                    ) : (
                      <p className="text-xs italic text-gray-500">Laminate N/A</p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (editMode[section]) handleSubmitMaterials();
                      setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
                    }}
                    className="text-gray-500 hover:text-yellow-700 transition"
                  >
                    {editMode[section] ? "✔️" : "✏️"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 🔩 Cabinet + Hardware Table */}
      {hasResults && (
        <div className="overflow-x-auto mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cabinet and Hardware Costs</h2>
          <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold">Cabinet</th>
                <th className="px-6 py-3 text-left text-xs font-semibold">Size</th>
                <th className="px-6 py-3 text-right text-xs font-semibold">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-semibold">Hardware</th>
                <th className="px-6 py-3 text-right text-xs font-semibold">Hardware Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {costing.map((cab) => {
                // find matching cabinetType by exact name
                const cabinetType = findCabinetTypeByName(cab.name);
                const availableHardware = cabinetType && Array.isArray(cabinetType.materials)
                  ? cabinetType.materials.filter((m) =>
                      (m.categories || []).some((c) => c.name === "Hardware")
                    )
                  : [];

                const hardwareTotal = calcHardwareCost(cab.hardware);

                return (
                  <tr key={cab.id}>
                    <td className="px-6 py-4 font-medium text-gray-900">{cab.name}</td>
                    <td className="px-6 py-4 text-gray-600">{cab.size}</td>
                    <td className="px-6 py-4 text-right font-bold text-green-700">₹{(Number(cab.cost) || 0).toFixed(2)}</td>

                    <td className="px-6 py-4 text-sm">
                      {hardwareEdit[cab.id] ? (
                        <div>
                          {/* Render available hardware (from cabinetType) */}
                          {availableHardware.length ? (
                            availableHardware.map((h) => {
                              const state = hardwareSelections[cab.id]?.[h.name] || {};
                              const selected = typeof state.selected === "boolean" ? state.selected : false;
                              const qty = state.quantity ?? 1;
                              const rate = state.rate ?? h.rate ?? 0;

                              return (
                                <div key={h.id ?? h.name} className="flex items-center justify-between mb-1">
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={selected}
                                      onChange={(e) =>
                                        handleHardwareSelect(cab.id, h.name, rate, e.target.checked)
                                      }
                                    />
                                    {h.name}
                                  </label>

                                  {selected && (
                                    <>
                                      <input
                                        type="number"
                                        min="1"
                                        value={qty}
                                        onChange={(e) =>
                                          handleHardwareQuantityChange(cab.id, h.name, e.target.value)
                                        }
                                        className="border w-16 text-center rounded"
                                      />
                                      <span className="text-xs text-gray-700 ml-2">₹{(Number(qty) * Number(rate)).toFixed(2)}</span>
                                    </>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            // fallback: if there are no availableHardware (shouldn't happen if cabinetTypes is correct)
                            <p className="text-sm text-gray-500">No hardware options available for this cabinet type.</p>
                          )}

                          <div className="text-right mt-2">
                            <button
                              onClick={() => handleSaveHardware(cab.id)}
                              className="bg-green-600 text-white px-3 py-1 text-xs rounded mr-2"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => toggleHardwareEdit(cab)}
                              className="bg-gray-400 text-white px-3 py-1 text-xs rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {cab.hardware?.length ? (
                            <ul className="list-disc list-inside text-xs">
                              {cab.hardware.map((h, i) => (
                                <li key={h.name + i}>
                                  {h.name} × {h.quantity}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-400 italic">No hardware</p>
                          )}

                          <button
                            onClick={() => toggleHardwareEdit(cab)}
                            className="text-blue-600 text-xs underline mt-1"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right font-bold text-green-700">₹{hardwareTotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
            {/* ================= ADDITIONAL ITEMS ================= */}
{addons && addons.length > 0 && (
  <div className="mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Additional Items</h2>

    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2">Item</th>
          <th className="py-2">Description</th>
          <th className="py-2 text-right">Amount (₹)</th>
        </tr>
      </thead>

      <tbody>
        {addons.map(item => (
          <tr key={item.id} className="border-b last:border-none">
            <td className="py-2">{item.item_name}</td>
            <td className="py-2 text-gray-600">{item.description || "-"}</td>
            <td className="py-2 text-right font-medium">
              {Number(item.amount).toLocaleString("en-IN")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


          </div>
        </div>
      )}


      {/* 💰 Totals */}
      {hasResults && (
        <div className="p-6 bg-green-50 border rounded-lg max-w-md ml-auto shadow-md">
          <h2 className="font-bold text-green-800 mb-4">Final Summary</h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between border-b pb-1">
              <span>Cabinet & Material:</span>
              <span>₹{totalCabinets.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Hardware:</span>
              <span>₹{totalHardware.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Add-Ons:</span>
              <span>₹{totalAddons.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Installation:</span>
              <span>₹{installationCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-green-700 pt-2">
              <span>Total Before GST:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-green-300 pt-2">
              <span>GST (18%):</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-extrabold text-green-900 mt-2">
              <span>GRAND TOTAL:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ---------- Layout wrapper ----------
  return embedded ? (
    content
  ) : (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold text-gray-800">
          Estimate from Amaltas Furniture Studio & Modular Kitchens
        </h2>
      }
    >
      {content}
      {/* ================= STATIC INFORMATION ================= */}
<div className="mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
  {/* Warranty Section */}
  <h2 className="text-xl font-semibold mb-3">Warranty</h2>
  <ul className="list-decimal list-inside space-y-2 text-gray-700">
    <li>We use branded components for manufacturing the kitchen. The components along with their brands are mentioned in the estimate.</li>
    <li>Each component is covered under a warranty from its original manufacturer.</li>
    <li><strong>Action Tesa HDHMR</strong> has a warranty of 7 Years, <strong>Action Tesa Boilo</strong> has a warranty of 21 Years.</li>
    <li><strong>Century Club Prime</strong> ply comes with a 25-year warranty against borer & termite attacks. <strong>Vimba Ply</strong> comes with a 15-year warranty.</li>
    <li><strong>Century Sainik 710 Ply</strong> has an 8-year warranty.</li>
    <li><strong>Hettich</strong> provides 2-year warranty on Hinges & Channels, and 5-year warranty on the Innotech Drawer System.</li>
    <li>Service from our side will be free for <strong>two years</strong>. Thereafter it will be chargeable at ₹999 per visit.</li>
    <li>
      Any damage to the kitchen caused by work of <strong>third-party vendors</strong>
      (stone work, civil work, plumbing, electrical, etc.) will <strong>not</strong> be covered under warranty and
      will be chargeable as per actuals.
    </li>
    <li>
      After work completion, we will clean the kitchen before handover.
      Post-handover cleaning <strong>is not covered</strong> under free service warranty.
    </li>
    <li>
      Warranty will be <strong>void</strong> if any other carpenter or technician tampers with
      the kitchen or any components we manufactured.
    </li>
    <li>
      Installation of Stone, Tiles, Chimney, Cooktop, Cylinder, Microwave, Oven, Geyser or
      any other appliance is <strong>not included</strong> unless explicitly mentioned.
    </li>
  </ul>

  {/* Payments Section */}
  <h2 className="text-xl font-semibold mt-8 mb-3">Payments</h2>
  <ul className="list-disc list-inside space-y-2 text-gray-700">
    <li><strong>25% advance payment</strong> at order confirmation.</li>
    <li><strong>25% payment</strong> at Carcase (body cabinet) installation.</li>
    <li><strong>40% payment before installation</strong> of hardware & doors.</li>
    <li><strong>10% after final handover.</strong></li>
  </ul>

  {/* Other Terms Section */}
  <h2 className="text-xl font-semibold mt-8 mb-3">Other Terms</h2>
  <ul className="list-decimal list-inside space-y-2 text-gray-700">
    <li>Our scope of work <strong>does not include civil site preparation</strong> of any kind.</li>
    <li><strong>Goods remain our property</strong> until full payment is received.</li>
    <li>All warranties are applicable only after <strong>final payments</strong> are completed.</li>
    <li>Any change in scope of work or drawing plans will be <strong>charged extra</strong>.</li>
  </ul>
</div>

    </AuthenticatedLayout>
  );
}
