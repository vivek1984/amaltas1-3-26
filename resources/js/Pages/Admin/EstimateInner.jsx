export default function EstimateInner (
    costing = [],
  installation = 0,
  estimates = [],
  material = {},
  materials = [],
  addons = [],
  cabinetTypes = [],
) {
    return (
        <>
            <div className="p-6 bg-gray-50 rounded-lg shadow-xl">
        {/* 🔽 Select Estimate */}
        <div className="mb-8 p-4 bg-white border rounded-lg shadow-sm">
          <label className="block text-lg font-medium mb-2">
            Select a Client Estimate:
          </label>
          <select
            value={selectedId}
            onChange={(e) => {
              const id = e.target.value;
              window.location.href = id
                ? `${window.location.pathname}?id=${id}`
                : window.location.pathname;
            }}
            className="w-full border-gray-300 rounded-md"
          >
            <option value="">-- Select a Client --</option>
            {estimatesList.map((e) => (
              <option key={e.id} value={e.id}>
                {e.clientName} (
                {new Date(e.created_at).toLocaleDateString("en-US")})
              </option>
            ))}
          </select>
        </div>

        {/* 🧍 Client Info + Materials */}
        {currentEstimate && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-indigo-50 border rounded-lg">
              <h2 className="font-bold text-indigo-700 mb-2">
                Client Information
              </h2>
              <p><strong>Name:</strong> {currentEstimate.clientName}</p>
              <p><strong>Phone:</strong> {currentEstimate.clientPhone}</p>
              <p><strong>Address:</strong> {currentEstimate.address}</p>
            </div>

            {/* Material Specs */}
            <div className="p-4 bg-yellow-50 border rounded-lg">
              <h2 className="font-bold text-yellow-700 mb-4">
                Material Specifications
              </h2>

              {["body", "back", "shutter"].map((section) => {
                const selectedMat = materialLookup(materialSpecs[`${section}Material`]);
                const showLam = selectedMat && selectedMat.mica === 1;
                const label =
                  section === "body"
                    ? "Body Material"
                    : section === "back"
                    ? "Back Panel"
                    : "Shutter";

                const options =
                  section === "body"
                    ? bodyMaterialObjects
                    : section === "back"
                    ? backMaterialObjects
                    : shutterMaterialObjects;

                return (
                  <div
                    key={section}
                    className="flex items-center justify-between space-x-2 mb-3"
                  >
                    <label className="w-1/3 text-sm font-medium">{label}:</label>

                    {/* Material */}
                    <div className="w-1/3">
                      {editMode[section] ? (
                        <select
                          value={materialSpecs[`${section}Material`]}
                          onChange={(e) =>
                            handleMaterialChange(`${section}Material`, e.target.value)
                          }
                          className="w-full border rounded p-1 text-sm"
                        >
                          {options.map((opt) => (
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

                    {/* Laminate */}
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

                    {/* Edit Toggle */}
                    <button
                      onClick={() => {
                        if (editMode[section]) handleSubmitMaterials();
                        setEditMode((prev) => ({
                          ...prev,
                          [section]: !prev[section],
                        }));
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

        {/* 🔩 Cabinet & Hardware */}
        {hasResults && (
          <div className="overflow-x-auto mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Cabinet and Hardware Costs
            </h2>
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
                  const availableHardware = cabinetTypes
                    .flatMap((ct) => ct.materials || [])
                    .filter((m) => (m.categories || []).some((c) => c.name === "Hardware"));

                  const hardwareTotal = calcHardwareCost(cab.hardware);

                  return (
                    <tr key={cab.id}>
                      <td className="px-6 py-4 font-medium text-gray-900">{cab.name}</td>
                      <td className="px-6 py-4 text-gray-600">{cab.size}</td>
                      <td className="px-6 py-4 text-right font-bold text-green-700">
                        ₹{cab.cost.toFixed(2)}
                      </td>

                      {/* Hardware Editing Section */}
                      <td className="px-6 py-4 text-sm">
                        {hardwareEdit[cab.id] ? (
                          <div>
                            {availableHardware.map((h) => {
                              const selected =
                                hardwareSelections[cab.id]?.[h.name]?.selected || false;
                              const qty =
                                hardwareSelections[cab.id]?.[h.name]?.quantity || 1;
                              const rate =
                                hardwareSelections[cab.id]?.[h.name]?.rate || h.rate || 0;
                              return (
                                <div
                                  key={h.id}
                                  className="flex items-center justify-between mb-1"
                                >
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={selected}
                                      onChange={(e) =>
                                        handleHardwareSelect(
                                          cab.id,
                                          h.name,
                                          h.rate,
                                          e.target.checked
                                        )
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
                                          handleHardwareQuantityChange(
                                            cab.id,
                                            h.name,
                                            e.target.value
                                          )
                                        }
                                        className="border w-16 text-center rounded"
                                      />
                                      <span className="text-xs text-gray-700 ml-2">
                                        ₹{(qty * rate).toFixed(2)}
                                      </span>
                                    </>
                                  )}
                                </div>
                              );
                            })}
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
                                  <li key={i}>
                                    {h.name} × {h.quantity} = ₹
                                    {(h.rate * h.quantity).toFixed(2)}
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

                      <td className="px-6 py-4 text-right font-bold text-green-700">
                        ₹{hardwareTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
        </>
    );
};
