import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function FormForAddingMaterial({ urlFor, categories = [], cabinetTypes = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        rate: "",
        length: "",
        width: "",
        description: "",
        image: null,
        level: "",
        category_ids: [],
        cabinet_type_ids: [],
        mica: false,
    });

    const [preview, setPreview] = useState(null);

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    }

    function toggleCabinetType(id, checked) {
        if (checked) {
            setData("cabinet_type_ids", [...data.cabinet_type_ids, id]);
        } else {
            setData(
                "cabinet_type_ids",
                data.cabinet_type_ids.filter((c) => c !== id)
            );
        }
    }

    function toggleCategory(id, checked) {
        if (checked) {
            setData("category_ids", [...data.category_ids, id]);
        } else {
            setData(
                "category_ids",
                data.category_ids.filter((c) => c !== id)
            );
        }
    }

    function submit(e) {
        e.preventDefault();

        // 🔑 Ensure only clean numeric IDs go in the payload
        const payload = {
            ...data,
            category_ids: data.category_ids.map((id) => parseInt(id, 10)),
            cabinet_type_ids: data.cabinet_type_ids.map((id) => parseInt(id, 10)), // ⬅️ CLEAN NEW ARRAY
        };

        post(urlFor, {
            data: payload,
            onSuccess: () => {
                reset();
                setPreview(null);
            },
        });
    }

    return (
        <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-center mb-6">
                Add New Material
            </h2>

            <form
                onSubmit={submit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                encType="multipart/form-data"
            >
                {/* Name */}
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Rate */}
                <div>
                    <label className="block text-gray-700">Rate</label>
                    <input
                        type="number"
                        value={data.rate}
                        onChange={(e) => setData("rate", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.rate && <p className="text-red-500 text-sm">{errors.rate}</p>}
                </div>

                {/* Length */}
                <div>
                    <label className="block text-gray-700">Length</label>
                    <input
                        type="number"
                        value={data.length}
                        onChange={(e) => setData("length", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.length && <p className="text-red-500 text-sm">{errors.length}</p>}
                </div>

                {/* Width */}
                <div>
                    <label className="block text-gray-700">Width</label>
                    <input
                        type="number"
                        value={data.width}
                        onChange={(e) => setData("width", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.width && <p className="text-red-500 text-sm">{errors.width}</p>}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
                <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">Cabinet Types</label>
            <div className="flex gap-4 flex-wrap border p-3 rounded-md bg-gray-50">
                {cabinetTypes.map((type) => (
                    <label key={type.id} className="flex items-center gap-2 cursor-pointer hover:bg-white p-1 rounded">
                        <input
                            type="checkbox"
                            value={type.id}
                            checked={data.cabinet_type_ids.includes(type.id)}
                            onChange={(e) => toggleCabinetType(type.id, e.target.checked)}
                            className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="capitalize text-sm">{type.name}</span>
                    </label>
                ))}
            </div>
            {errors.cabinet_type_ids && <p className="text-red-500 text-sm">{errors.cabinet_type_ids}</p>}
        </div>

                {/* Level */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Level</label>
                    <select
                        name="level"
                        value={data.level}
                        onChange={(e) => setData("level", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Select Level</option>
                        <option value="strong_lovely">Strong & Lovely</option>
                        <option value="strong_awesome">Strong & Awesome</option>
                        <option value="vstrong_luxurious">Very Strong & Luxurious</option>
                    </select>
                </div>

                {/* Categories */}
                <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Categories</label>
                    <div className="flex gap-4 flex-wrap">
                        {categories.map((cat) => (
                            <label key={cat.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={cat.id}
                                    checked={data.category_ids.includes(cat.id)}
                                    onChange={(e) => toggleCategory(cat.id, e.target.checked)}
                                    className="rounded border-gray-300"
                                />
                                <span className="capitalize">{cat.name}</span>
                            </label>
                        ))}
                    </div>
                    {errors.category_ids && <p className="text-red-500 text-sm">{errors.category_ids}</p>}
                </div>

                {/* Mica */}
                <div>
                    <label className="block text-gray-700">Mica</label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={data.mica}
                            onChange={(e) => setData("mica", e.target.checked)}
                            className="rounded border-gray-300"
                        />
                        <span>{data.mica ? "Yes (Requires Mica)" : "No ( PreLaminated)"}</span>
                    </label>
                    {errors.mica && <p className="text-red-500 text-sm">{errors.mica}</p>}
                </div>

                {/* Image */}
                <div>
                    <label className="block text-gray-700">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-cover rounded"
                        />
                    )}
                    {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                </div>

                {/* Submit */}
                <div className="md:col-span-2 flex justify-center">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? "Saving..." : "Save Material"}
                    </button>
                </div>
            </form>
        </div>
    );
}
