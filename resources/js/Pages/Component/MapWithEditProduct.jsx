import { router } from "@inertiajs/react";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

export default function MapWithEditProduct({
    collection,
    postUrl,
    allCategories,
    allCabinetTypes, // ⬅️ 1. ACCEPT NEW PROP
    editableFields = ["name", "rate", "level", "length", "width", "description", "mica"],
    showImage = true,
    imageField = "image",
}) {
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});

    // State for Many-to-Many relationships, storing names
    const [categoryData, setCategoryData] = useState([]);
    const [cabinetTypeData, setCabinetTypeData] = useState([]); // ⬅️ 2. NEW STATE FOR CABINET TYPES

    function startEdit(item) {
        setEditingId(item.id);
        setFormData(item);
        // Initialize with associated relationship names
        setCategoryData(item.categories?.map((c) => c.name) || []);
        setCabinetTypeData(item.cabinet_types?.map((t) => t.name) || []); // ⬅️ 3. INITIALIZE NEW STATE
    }

    function cancelEdit() {
        setEditingId(null);
        setFormData({});
        setCategoryData([]);
        setCabinetTypeData([]); // ⬅️ 4. RESET NEW STATE
    }

    function handleChange(field, value) {
        setFormData({
            ...formData,
            [field]: value,
        });
    }

    // Reusable function to toggle relationship items by name
    function handleRelationshipToggle(dataArray, setDataFunction, itemName) {
        if (dataArray.includes(itemName)) {
            setDataFunction(dataArray.filter((n) => n !== itemName));
        } else {
            setDataFunction([...dataArray, itemName]);
        }
    }

    function saveEdit() {
        const payload = { id: editingId };

        editableFields.forEach((f) => {
            payload[f] = formData[f];
        });

        payload.categories = categoryData;
        payload.cabinet_types = cabinetTypeData; // ⬅️ 5. ADD NEW DATA TO PAYLOAD

        router.post(`/${postUrl}`, payload, {
            onSuccess: () => setEditingId(null),
        });
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        {showImage && <th className="border px-4 py-2">Image</th>}
                        {editableFields.map((field) => (
                            <th key={field} className="border px-4 py-2 capitalize">
                                {field.replace('_', ' ')}
                            </th>
                        ))}
                        <th className="border px-4 py-2">Categories</th>
                        <th className="border px-4 py-2">Cabinet Types</th> {/* ⬅️ 6. NEW COLUMN HEADER */}
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {collection.map((item) => (
                        <tr key={item.id}>
                            {/* Image Cell (Unchanged) */}
                            {showImage && (
                                <td className="border px-4 py-2">
                                    {item[imageField] ? (
                                        <img
                                            src={`/storage/${item[imageField]}`}
                                            alt={item.name ?? "image"}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 flex items-center justify-center bg-gray-50 text-xs text-gray-500 rounded">
                                            No image
                                        </div>
                                    )}
                                </td>
                            )}

                            {/* Editable Fields Cells (Unchanged) */}
                            {editableFields.map((field) => (
                                <td key={field} className="border px-4 py-2">
                                    {editingId === item.id ? (
                                        field === "level" ? (
                                            <select
                                                value={formData[field] ?? ""}
                                                onChange={(e) => handleChange(field, e.target.value)}
                                                className="border rounded px-2 py-1 w-full"
                                            >
                                                <option value="">-- Select Level --</option>
                                                <option value="strong_lovely">Strong & Lovely</option>
                                                <option value="strong_awesome">Strong & Awesome</option>
                                                <option value="vstrong_luxurious">
                                                    Very Strong & Luxurious
                                                </option>
                                            </select>
                                        ) : field === "mica" ? (
                                            <input
                                                type="checkbox"
                                                checked={!!formData[field]}
                                                onChange={(e) =>
                                                    handleChange(field, e.target.checked)
                                                }
                                                className="form-checkbox h-5 w-5"
                                            />
                                        ) : (
                                            <input
                                                type={
                                                    ["rate", "length", "width"].includes(field)
                                                        ? "number"
                                                        : "text"
                                                }
                                                value={formData[field] ?? ""}
                                                onChange={(e) =>
                                                    handleChange(field, e.target.value)
                                                }
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        )
                                    ) : (
                                        <span className="text-gray-700">
                                            {field === "mica"
                                                ? item[field]
                                                    ? "✅ Yes"
                                                    : "❌ No"
                                                : item[field] ?? (
                                                      <em className="text-gray-400">—</em>
                                                  )}
                                        </span>
                                    )}
                                </td>
                            ))}

                            {/* Categories Column (Refactored to use generic toggle) */}
                            <td className="border px-4 py-2">
                                {editingId === item.id ? (
                                    <div className="flex flex-col gap-1">
                                        {allCategories.map((c) => (
                                            <label key={c.id} className="inline-flex items-center gap-1">
                                                <input
                                                    type="checkbox"
                                                    checked={categoryData.includes(c.name)}
                                                    onChange={() =>
                                                        handleRelationshipToggle(categoryData, setCategoryData, c.name)
                                                    }
                                                    className="form-checkbox"
                                                />
                                                <span>{c.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-gray-700">
                                        {item.categories?.map((c) => c.name).join(", ") || (
                                            <em className="text-gray-400">—</em>
                                        )}
                                    </span>
                                )}
                            </td>

                            {/* ⬅️ 7. NEW CABINET TYPES COLUMN */}
                            <td className="border px-4 py-2">
                                {editingId === item.id ? (
                                    <div className="flex flex-col gap-1">
                                        {allCabinetTypes.map((t) => (
                                            <label key={t.id} className="inline-flex items-center gap-1">
                                                <input
                                                    type="checkbox"
                                                    checked={cabinetTypeData.includes(t.name)}
                                                    onChange={() =>
                                                        handleRelationshipToggle(cabinetTypeData, setCabinetTypeData, t.name)
                                                    }
                                                    className="form-checkbox"
                                                />
                                                <span>{t.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-gray-700">
                                        {/* Display associated CabinetType names, joined by comma */}
                                        {item.cabinet_types?.map((t) => t.name).join(", ") || (
                                            <em className="text-gray-400">—</em>
                                        )}
                                    </span>
                                )}
                            </td>

                            {/* Action Column (Unchanged) */}
                            <td className="border px-4 py-2 text-center">
                                {editingId === item.id ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <FaCheck
                                            className="text-green-600 cursor-pointer text-xl"
                                            onClick={saveEdit}
                                            title="Save"
                                        />
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="text-sm text-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <MdEdit
                                        className="text-red-700 cursor-pointer text-lg"
                                        onClick={() => startEdit(item)}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
