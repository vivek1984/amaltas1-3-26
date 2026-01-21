import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useMemo } from "react";
import { Head, router } from "@inertiajs/react";

// The component accepts 'material' and 'cabinetTypes' props.
export default function Calculator({ material = [], cabinetTypes = [] }) {
  // =========================================================================
  // --- Section 1: State Management ---

  // 1. Client Info & Material Specs (Section 1 & 2)
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    address: "",
    bodyMaterial: "",
    bodyLaminate: "",
    backMaterial: "",
    backLaminate: "",
    shutterMaterial: "",
    shutterLaminate: "",
  });

  // 2. Cabinets Storage (Section 3 & 4)
  const [lowerCabinets, setLowerCabinets] = useState([]);
  const [upperCabinets, setUpperCabinets] = useState([]);
  const [cabinetInputErrors, setCabinetInputErrors] = useState({}); // Validation for cabinet inputs

  // Current cabinet row input state (stores the ID of the selected CabinetType)
  const [cabinetInput, setCabinetInput] = useState({
    lowerCabinetTypeId: "",
    lowerWidth: "",
    lowerHeight: "",
    lowerHardware: [],
    upperCabinetTypeId: "",
    upperWidth: "",
    upperHeight: "",
    upperHardware: [],
  });

  // 3. Add-Ons Storage (Section 5)
  const [addOns, setAddOns] = useState([]);
  const [newAddOn, setNewAddOn] = useState({
    itemName: "",
    description: "",
    amount: "",
  });
  const [isAddOnFormVisible, setIsAddOnFormVisible] = useState(false);

  // 4. Submission Status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // =========================================================================
  // --- Section 2: Utility & Memoized Logic ---

  const getMaterialById = (id) => material.find((m) => m.id == id);
  const getCabinetTypeById = (id) => cabinetTypes.find((t) => t.id == id);

  /**
   * Checks if the selected material requires a laminate (mica field value is 1).
   * @param {string | number} materialId - The ID of the core material.
   * @returns {boolean} True if mica is 1, false otherwise.
   */
  const getMaterialMicaStatus = (materialId) => {
    const mat = getMaterialById(materialId);
    return mat && mat.mica === 1;
  };

  // Categorize Materials using useMemo for efficiency
  const categorizedMaterials = useMemo(() => {
    const filterBy = (categoryName) => material.filter((m) => (m.categories || []).some((c) => c.name === categoryName));
    return {
      bodyOptions: filterBy("Cabinet Body"),
      backOptions: filterBy("Back of Cabinet"),
      shutterOptions: filterBy("Doors"),
      laminateOptions: filterBy("Laminate"),
      hardwareOptions: filterBy("Hardware"),
    };
  }, [material]);

  const { hardwareOptions, bodyOptions, backOptions, shutterOptions, laminateOptions } = categorizedMaterials;

  // Laminate Enable/Disable Checks (Derived state)
  const isBodyLaminateEnabled = getMaterialMicaStatus(formData.bodyMaterial);
  const isBackLaminateEnabled = getMaterialMicaStatus(formData.backMaterial);
  const isShutterLaminateEnabled = getMaterialMicaStatus(formData.shutterMaterial);

  // Hardware Filtering Logic
  const getFilteredHardware = (cabinetTypeId) => {
    if (!cabinetTypeId) return [];
    const selectedCabinetType = getCabinetTypeById(cabinetTypeId);

    if (!selectedCabinetType || !selectedCabinetType.materials) return [];

    // Get the IDs of compatible hardware from the selected CabinetType's materials relationship
    const compatibleHardwareIds = selectedCabinetType.materials
                                    .filter(m => (m.categories || []).some(c => c.name === "Hardware"))
                                    .map(m => m.id);

    // Filter the general hardware list based on the compatible IDs
    return hardwareOptions.filter(h => compatibleHardwareIds.includes(h.id));
  };

  // =========================================================================
  // --- Section 3: Handlers ---

  // Client Info & Material Specs Handler (Section 1 & 2)
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newState = { [name]: value };

    // MICA LOGIC: Clear laminate if the core material does not require it
    if (["bodyMaterial", "backMaterial", "shutterMaterial"].includes(name)) {
        if (!getMaterialMicaStatus(value)) {
            if (name === "bodyMaterial") newState.bodyLaminate = "";
            if (name === "backMaterial") newState.backLaminate = "";
            if (name === "shutterMaterial") newState.shutterLaminate = "";
        }
    }

    setFormData((s) => ({ ...s, ...newState }));
  };

  // Cabinet Row Input Handler
  const handleCabinetInputChange = (e) => {
    const { name, value } = e.target;

    // Clear hardware when CabinetType changes
    if (name === 'lowerCabinetTypeId') {
        setCabinetInput((s) => ({ ...s, lowerCabinetTypeId: value, lowerHardware: [] }));
    } else if (name === 'upperCabinetTypeId') {
        setCabinetInput((s) => ({ ...s, upperCabinetTypeId: value, upperHardware: [] }));
    } else {
        setCabinetInput((s) => ({ ...s, [name]: value }));
    }
  };

  // Cabinet Hardware Handlers
  const toggleCabinetHardware = (section, hardwareId, checked) => {
    const key = section === "lower" ? "lowerHardware" : "upperHardware";
    const current = cabinetInput[key];

    if (checked) {
      setCabinetInput((s) => ({
        ...s,
        [key]: [...current, { id: hardwareId, qty: 1 }],
      }));
    } else {
      setCabinetInput((s) => ({
        ...s,
        [key]: current.filter((h) => h.id !== hardwareId),
      }));
    }
  };

  const updateCabinetHardwareQty = (section, hardwareId, qty) => {
    const key = section === "lower" ? "lowerHardware" : "upperHardware";
    setCabinetInput((s) => ({
      ...s,
      [key]: s[key].map((h) =>
        h.id === hardwareId ? { ...h, qty: Number(qty) } : h
      ),
    }));
  };

  // Cabinet Validation Helper
  const validateCabinetInput = (type) => {
    let isValid = true;
    let errors = {};
    const typeIdKey = `${type}CabinetTypeId`;
    const widthKey = `${type}Width`;
    const heightKey = `${type}Height`;

    if (!cabinetInput[typeIdKey]) {
        errors[typeIdKey] = "Cabinet Type is required.";
        isValid = false;
    }
    if (!cabinetInput[widthKey] || Number(cabinetInput[widthKey]) <= 0) {
        errors[widthKey] = "Width must be > 0.";
        isValid = false;
    }
    if (!cabinetInput[heightKey] || Number(cabinetInput[heightKey]) <= 0) {
        errors[heightKey] = "Height must be > 0.";
        isValid = false;
    }

    setCabinetInputErrors(prev => ({ ...prev, ...errors }));
    return isValid;
  };

  // Add/Remove Cabinet Handlers
  const addLowerCabinet = () => {
    setCabinetInputErrors({});
    if (!validateCabinetInput('lower')) return;

    const { lowerCabinetTypeId, lowerWidth, lowerHeight, lowerHardware } = cabinetInput;
    setLowerCabinets((prev) => [
      ...prev,
      { cabinet_type_id: lowerCabinetTypeId, width: lowerWidth, height: lowerHeight, hardware: lowerHardware },
    ]);
    // Reset inputs
    setCabinetInput((s) => ({
      ...s,
      lowerCabinetTypeId: "", lowerWidth: "", lowerHeight: "", lowerHardware: [],
    }));
  };

  const addUpperCabinet = () => {
    setCabinetInputErrors({});
    if (!validateCabinetInput('upper')) return;

    const { upperCabinetTypeId, upperWidth, upperHeight, upperHardware } = cabinetInput;
    setUpperCabinets((prev) => [
      ...prev,
      { cabinet_type_id: upperCabinetTypeId, width: upperWidth, height: upperHeight, hardware: upperHardware },
    ]);
    // Reset inputs
    setCabinetInput((s) => ({
      ...s,
      upperCabinetTypeId: "", upperWidth: "", upperHeight: "", upperHardware: [],
    }));
  };

  const removeCabinet = (section, index) => {
    if (section === "lower") {
      setLowerCabinets((prev) => prev.filter((_, i) => i !== index));
    } else {
      setUpperCabinets((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Add-On Handlers (Section 5)
  const handleAddOnInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddOn((s) => ({ ...s, [name]: value }));
  };

  const addAddOn = () => {
    // Basic validation
    const amount = Number(newAddOn.amount);
    if (!newAddOn.itemName || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid Item Name and a positive Amount.");
      return;
    }

    setAddOns((prev) => [
      ...prev,
      {
        id: Date.now(),
        itemName: newAddOn.itemName,
        description: newAddOn.description,
        amount: amount,
      },
    ]);

    // Reset and hide the form
    setNewAddOn({ itemName: "", description: "", amount: "" });
    setIsAddOnFormVisible(false);
  };

  const removeAddOn = (id) => {
    setAddOns((prev) => prev.filter((a) => a.id !== id));
  };

  // Final Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      lowerCabinets,
      upperCabinets,
      addOns, // Include the new addOns state
    };

    // Use your actual Inertia router post logic here:
    router.post("/calculator", payload);
    // console.log("[FORM SUBMITTED] Payload:", payload); // Keep for debugging if needed

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // =========================================================================
  // --- Section 4: Reusable Components ---

  // Custom styled Select component
  const SelectField = ({ name, label, value, options, onChange, disabled = false }) => (
    <div>
        <label className={`block mb-1 font-semibold text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`border rounded-lg w-full px-4 py-2 text-gray-800 shadow-sm transition duration-150 ${
                disabled
                    ? 'bg-gray-200 border-gray-300 cursor-not-allowed text-gray-500'
                    : 'bg-white border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            }`}
        >
            <option value="">{disabled ? 'N/A (Pre-finished)' : 'Select'}</option>
            {options.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
            ))}
        </select>
    </div>
  );

  // =========================================================================
  // --- Section 5: JSX Render ---
  return (
    <AuthenticatedLayout header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kitchen Estimate Calculator
                </h2>
            }>


      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-white shadow-xl rounded-xl space-y-10">

          {/* Submission Confirmation Message */}
          {isSubmitted && (
              <div className="fixed top-4 right-4 z-50 p-4 bg-green-500 text-white rounded-lg shadow-2xl flex items-center transform transition-opacity duration-300">
                  <span className="mr-2 text-xl">✔️</span>
                  Configuration Submitted!
              </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Section 1: Client Info */}
            <section className="border-b pb-8">
              <h3 className="text-xl font-extrabold mb-5 text-indigo-600 border-b-2 border-indigo-100 inline-block pb-1">Client Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <input type="text" placeholder="Client Name" name="clientName" value={formData.clientName} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" required />
                <input type="text" placeholder="Phone" name="clientPhone" value={formData.clientPhone} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" required />
                <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" required />
              </div>
            </section>

            {/* Section 2: Material Selection */}
            <section className="border-b pb-8">
              <h3 className="text-xl font-extrabold mb-5 text-teal-600 border-b-2 border-teal-100 inline-block pb-1">Material Selection</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <SelectField label="Body Material" name="bodyMaterial" value={formData.bodyMaterial} options={bodyOptions} onChange={handleChange} />
                <SelectField label="Body Laminate" name="bodyLaminate" value={formData.bodyLaminate} options={laminateOptions} onChange={handleChange} disabled={!isBodyLaminateEnabled} />
                <div className="col-span-1"></div>

                <SelectField label="Back Material" name="backMaterial" value={formData.backMaterial} options={backOptions} onChange={handleChange} />
                <SelectField label="Back Laminate" name="backLaminate" value={formData.backLaminate} options={laminateOptions} onChange={handleChange} disabled={!isBackLaminateEnabled} />
                <div className="col-span-1"></div>

                <SelectField label="Shutter Material" name="shutterMaterial" value={formData.shutterMaterial} options={shutterOptions} onChange={handleChange} />
                <SelectField label="Shutter Laminate" name="shutterLaminate" value={formData.shutterLaminate} options={laminateOptions} onChange={handleChange} disabled={!isShutterLaminateEnabled} />
              </div>
            </section>

            {/* Section 3 & 4: Cabinets */}
            <section className="border-b pb-8">
              <h3 className="text-xl font-extrabold mb-6 text-purple-600 border-b-2 border-purple-100 inline-block pb-1">Cabinet Units</h3>
              <div className="flex flex-col lg:flex-row gap-8">

                {/* Lower Cabinets Panel */}
                <div className="w-full lg:w-1/2 p-4 border border-gray-200 rounded-xl shadow-lg bg-gray-50">
                    <h4 className="font-bold text-lg mb-4 text-purple-800 flex items-center"><span className="mr-2">📦</span> Lower/Base Units</h4>

                    {/* Display List */}
                    <div className="space-y-3 mb-6">
                        {lowerCabinets.length === 0 && <p className="text-sm text-gray-500 italic p-3 border-dashed border-gray-300 border rounded-lg text-center">No lower cabinets added yet.</p>}
                        {lowerCabinets.map((cab, idx) => {
                            const cabinetType = getCabinetTypeById(cab.cabinet_type_id);
                            return (
                                <div key={idx} className="border border-purple-200 p-4 rounded-lg bg-white transition hover:shadow-md">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <strong className="text-base text-gray-800">{cabinetType ? cabinetType.name : `Cabinet ID: ${cab.cabinet_type_id}`}</strong>{" "}
                                            <span className="text-sm text-gray-500 block">Size: {cab.width} W × {cab.height} H (mm)</span>
                                            {cab.hardware.length > 0 && (
                                                <div className="text-xs text-gray-700 mt-2 p-1 bg-purple-50 rounded">
                                                    **Hardware:**{" "}
                                                    {cab.hardware.map((h) => {
                                                        const hw = hardwareOptions.find((opt) => opt.id == h.id);
                                                        return hw ? `${hw.name} (x${h.qty})` : "";
                                                    }).join(", ")}
                                                </div>
                                            )}
                                        </div>
                                        <button type="button" onClick={() => removeCabinet("lower", idx)} className="text-red-500 hover:text-red-700 p-1 rounded-full transition font-semibold" title="Remove Cabinet">X</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Input Row with Validation styles */}
                    <div className="space-y-4 p-4 border border-dashed border-purple-400 rounded-lg bg-purple-50">
                        <div className="flex gap-2 items-end">
                            <select
                                name="lowerCabinetTypeId"
                                value={cabinetInput.lowerCabinetTypeId}
                                onChange={handleCabinetInputChange}
                                className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500 ${cabinetInputErrors.lowerCabinetTypeId ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Select Cabinet Type</option>
                                {cabinetTypes.filter(t => t.type !== 'upper').map((type) => (<option key={type.id} value={type.id}>{type.name}</option>))}
                            </select>
                            <input
                                type="number"
                                placeholder="W (mm)"
                                name="lowerWidth"
                                value={cabinetInput.lowerWidth}
                                onChange={handleCabinetInputChange}
                                className={`w-20 border rounded-lg px-2 py-2 text-sm text-center focus:ring-purple-500 ${cabinetInputErrors.lowerWidth ? 'border-red-500' : 'border-gray-300'}`}
                                min="1"
                            />
                            <input
                                type="number"
                                placeholder="H (mm)"
                                name="lowerHeight"
                                value={cabinetInput.lowerHeight}
                                onChange={handleCabinetInputChange}
                                className={`w-20 border rounded-lg px-2 py-2 text-sm text-center focus:ring-purple-500 ${cabinetInputErrors.lowerHeight ? 'border-red-500' : 'border-gray-300'}`}
                                min="1"
                            />
                            <button type="button" onClick={addLowerCabinet} className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition shadow-md" title="Add Cabinet">+</button>
                        </div>

                        {(cabinetInputErrors.lowerCabinetTypeId || cabinetInputErrors.lowerWidth || cabinetInputErrors.lowerHeight) && (
                            <div className="text-red-500 text-xs mt-1">
                                Please fill out all required fields with valid values.
                            </div>
                        )}

                        {/* CONDITIONAL/FILTERED HARDWARE SELECTION */}
                        {cabinetInput.lowerCabinetTypeId && (
                            <div className="flex flex-col gap-2 border-t pt-3 mt-3 border-purple-200">
                                <p className="text-xs font-bold text-purple-700">Compatible Hardware:</p>
                                {getFilteredHardware(cabinetInput.lowerCabinetTypeId).map((h) => {
                                    const selected = cabinetInput.lowerHardware.find((hw) => hw.id == h.id);
                                    return (
                                        <div key={h.id} className="flex items-center gap-2">
                                            <input id={`lower-hw-${h.id}`} type="checkbox" checked={!!selected} onChange={(e) => toggleCabinetHardware("lower", h.id, e.target.checked)} className="rounded text-purple-600 focus:ring-purple-500 border-gray-300"/>
                                            <label htmlFor={`lower-hw-${h.id}`} className="text-sm flex-1 cursor-pointer">{h.name}</label>
                                            {selected && (<input type="number" min="1" value={selected.qty} onChange={(e) => updateCabinetHardwareQty("lower", h.id, e.target.value)} className="w-16 border rounded-lg px-2 py-1 text-xs text-center focus:ring-purple-500"/>)}
                                        </div>
                                    );
                                })}
                                {getFilteredHardware(cabinetInput.lowerCabinetTypeId).length === 0 && (<p className="text-sm text-gray-500 italic">No specific hardware defined for this cabinet type.</p>)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Upper Cabinets Panel */}
                <div className="w-full lg:w-1/2 p-4 border border-gray-200 rounded-xl shadow-lg bg-gray-50">
                    <h4 className="font-bold text-lg mb-4 text-purple-800 flex items-center"><span className="mr-2">📦</span> Upper/Wall Units</h4>

                    {/* Display List */}
                    <div className="space-y-3 mb-6">
                        {upperCabinets.length === 0 && <p className="text-sm text-gray-500 italic p-3 border-dashed border-gray-300 border rounded-lg text-center">No upper cabinets added yet.</p>}
                        {upperCabinets.map((cab, idx) => {
                            const cabinetType = getCabinetTypeById(cab.cabinet_type_id);
                            return (
                                <div key={idx} className="border border-purple-200 p-4 rounded-lg bg-white transition hover:shadow-md">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <strong className="text-base text-gray-800">{cabinetType ? cabinetType.name : `Cabinet ID: ${cab.cabinet_type_id}`}</strong>{" "}
                                            <span className="text-sm text-gray-500 block">Size: {cab.width} W × {cab.height} H (mm)</span>
                                            {cab.hardware.length > 0 && (
                                                <div className="text-xs text-gray-700 mt-2 p-1 bg-purple-50 rounded">
                                                    **Hardware:**{" "}
                                                    {cab.hardware.map((h) => {
                                                        const hw = hardwareOptions.find((opt) => opt.id == h.id);
                                                        return hw ? `${hw.name} (x${h.qty})` : "";
                                                    }).join(", ")}
                                                </div>
                                            )}
                                        </div>
                                        <button type="button" onClick={() => removeCabinet("upper", idx)} className="text-red-500 hover:text-red-700 p-1 rounded-full transition font-semibold" title="Remove Cabinet">X</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Input Row with Validation styles */}
                    <div className="space-y-4 p-4 border border-dashed border-purple-400 rounded-lg bg-purple-50">
                        <div className="flex gap-2 items-end">
                            <select
                                name="upperCabinetTypeId"
                                value={cabinetInput.upperCabinetTypeId}
                                onChange={handleCabinetInputChange}
                                className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500 ${cabinetInputErrors.upperCabinetTypeId ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Select Cabinet Type</option>
                                {cabinetTypes.filter(t => t.type !== 'lower').map((type) => (<option key={type.id} value={type.id}>{type.name}</option>))}
                            </select>
                            <input
                                type="number"
                                placeholder="W (mm)"
                                name="upperWidth"
                                value={cabinetInput.upperWidth}
                                onChange={handleCabinetInputChange}
                                className={`w-20 border rounded-lg px-2 py-2 text-sm text-center focus:ring-purple-500 ${cabinetInputErrors.upperWidth ? 'border-red-500' : 'border-gray-300'}`}
                                min="1"
                            />
                            <input
                                type="number"
                                placeholder="H (mm)"
                                name="upperHeight"
                                value={cabinetInput.upperHeight}
                                onChange={handleCabinetInputChange}
                                className={`w-20 border rounded-lg px-2 py-2 text-sm text-center focus:ring-purple-500 ${cabinetInputErrors.upperHeight ? 'border-red-500' : 'border-gray-300'}`}
                                min="1"
                            />
                            <button type="button" onClick={addUpperCabinet} className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition shadow-md" title="Add Cabinet">+</button>
                        </div>

                        {(cabinetInputErrors.upperCabinetTypeId || cabinetInputErrors.upperWidth || cabinetInputErrors.upperHeight) && (
                            <div className="text-red-500 text-xs mt-1">
                                Please fill out all required fields with valid values.
                            </div>
                        )}

                        {/* CONDITIONAL/FILTERED HARDWARE SELECTION */}
                        {cabinetInput.upperCabinetTypeId && (
                            <div className="flex flex-col gap-2 border-t pt-3 mt-3 border-purple-200">
                                <p className="text-xs font-bold text-purple-700">Compatible Hardware:</p>
                                {getFilteredHardware(cabinetInput.upperCabinetTypeId).map((h) => {
                                    const selected = cabinetInput.upperHardware.find((hw) => hw.id == h.id);
                                    return (
                                        <div key={h.id} className="flex items-center gap-2">
                                            <input id={`upper-hw-${h.id}`} type="checkbox" checked={!!selected} onChange={(e) => toggleCabinetHardware("upper", h.id, e.target.checked)} className="rounded text-purple-600 focus:ring-purple-500 border-gray-300"/>
                                            <label htmlFor={`upper-hw-${h.id}`} className="text-sm flex-1 cursor-pointer">{h.name}</label>
                                            {selected && (<input type="number" min="1" value={selected.qty} onChange={(e) => updateCabinetHardwareQty("upper", h.id, e.target.value)} className="w-16 border rounded-lg px-2 py-1 text-xs text-center focus:ring-purple-500"/>)}
                                        </div>
                                    );
                                })}
                                {getFilteredHardware(cabinetInput.upperCabinetTypeId).length === 0 && (<p className="text-sm text-gray-500 italic">No specific hardware defined for this cabinet type.</p>)}
                            </div>
                        )}
                    </div>
                </div>
                </div>
            </section>

            {/* Section 5: Add On's */}
            <section className="border-b pb-8">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-xl font-extrabold text-orange-600 border-b-2 border-orange-100 inline-block pb-1">Add On's</h3>
                    <button
                        type="button"
                        onClick={() => setIsAddOnFormVisible(true)}
                        className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition shadow-md flex items-center"
                        title="Add New Add-On Item"
                    >
                        <span className="text-xl font-bold">+</span>
                    </button>
                </div>

                {/* Add-On Input Form (Conditional Display) */}
                {isAddOnFormVisible && (
                    <div className="p-4 border border-dashed border-orange-400 rounded-lg bg-orange-50 mb-6 space-y-3">
                        <h4 className="font-semibold text-md text-orange-800">New Add-On Item</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                type="text"
                                placeholder="Item Name (e.g., Handles, Countertop)"
                                name="itemName"
                                value={newAddOn.itemName}
                                onChange={handleAddOnInputChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-orange-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Description (Optional)"
                                name="description"
                                value={newAddOn.description}
                                onChange={handleAddOnInputChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-orange-500"
                            />
                            <input
                                type="number"
                                placeholder="Amount (e.g., 5000)"
                                name="amount"
                                value={newAddOn.amount}
                                onChange={handleAddOnInputChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-orange-500"
                                min="0.01"
                                step="any"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setNewAddOn({ itemName: "", description: "", amount: "" });
                                    setIsAddOnFormVisible(false);
                                }}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={addAddOn}
                                className="px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                            >
                                Save Add-On
                            </button>
                        </div>
                    </div>
                )}

                {/* Display List of Added Add-Ons */}
                <div className="space-y-2">
                    {addOns.length === 0 && !isAddOnFormVisible && (
                        <p className="text-sm text-gray-500 italic p-3 border-dashed border-gray-300 border rounded-lg text-center">Click '+' to add items like handles, lighting, or specific appliances.</p>
                    )}
                    {addOns.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 rounded-lg bg-white border border-orange-200 shadow-sm transition hover:shadow-md">
                            <div>
                                <strong className="text-gray-800">{item.itemName}</strong>
                                {item.description && <span className="text-sm text-gray-500 ml-3 italic">({item.description})</span>}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-orange-700">₹{item.amount.toLocaleString('en-IN')}</span>
                                <button
                                    type="button"
                                    onClick={() => removeAddOn(item.id)}
                                    className="text-red-500 hover:text-red-700 font-semibold text-sm"
                                    title="Remove Add-On"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* Final Submit */}
            <div className="pt-6 border-t border-gray-200">
                <button
                type="submit"
                className="w-full px-4 py-3 flex items-center justify-center bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition shadow-xl transform hover:scale-[1.005]"
                >
                <span className="text-xl mr-2">✅</span>
                Submit Project Configuration
                </button>
            </div>
            </form>
        </div>
      </main>
    </AuthenticatedLayout>
  );
}
