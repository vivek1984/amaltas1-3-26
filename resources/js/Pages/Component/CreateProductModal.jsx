import { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function CreateProductModal({
    isOpen,
    onClose,
    storeUrl,
    onProductCreated,
    onCreateError,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        shippable: 0,
        thumbnail: null,
        small_image: null,
    });

    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [smallImagePreview, setSmallImagePreview] = useState(null);

    const thumbnailInputRef = useRef(null);
    const smallImageInputRef = useRef(null);

    /* ================= CLEANUP OBJECT URLS ================= */
    useEffect(() => {
        return () => {
            if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
            if (smallImagePreview) URL.revokeObjectURL(smallImagePreview);
        };
    }, [thumbnailPreview, smallImagePreview]);

    /* ================= HANDLERS ================= */

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setData(name, type === 'checkbox' ? Number(checked) : value);
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files?.[0] || null;

        setData(field, file);

        const setPreview =
            field === 'thumbnail'
                ? setThumbnailPreview
                : setSmallImagePreview;

        setPreview(file ? URL.createObjectURL(file) : null);
    };

    const clearForm = () => {
        reset();
        setThumbnailPreview(null);
        setSmallImagePreview(null);
        if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
        if (smallImageInputRef.current) smallImageInputRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(storeUrl, {
            preserveScroll: true,
            onSuccess: (page) => {
                clearForm();
                onClose();
                onProductCreated?.(page);
            },
            onError: (errs) => {
                onCreateError?.(errs);
            },
        });
    };

    /* ================= DO NOT RENDER IF CLOSED ================= */
    if (!isOpen) return null;

    return (
        <div
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl
                       max-h-[90vh] overflow-y-auto p-6 sm:p-8"
            role="dialog"
            aria-modal="true"
        >
            {/* CLOSE BUTTON */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600
                           text-2xl leading-none"
                aria-label="Close modal"
            >
                &times;
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Create New Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* PRODUCT NAME */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                        className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2
                            ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                </div>

                {/* SHIPPABLE */}
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        name="shippable"
                        checked={!!data.shippable}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300"
                    />
                    Shippable
                </label>

                {/* SMALL IMAGE */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Small Image
                    </label>
                    <input
                        type="file"
                        ref={smallImageInputRef}
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'small_image')}
                        className={`block w-full text-sm rounded-lg border
                            ${errors.small_image ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.small_image && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.small_image}
                        </p>
                    )}

                    {smallImagePreview && (
                        <img
                            src={smallImagePreview}
                            alt="Preview"
                            className="mt-3 h-24 object-contain rounded border"
                        />
                    )}
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full rounded-lg py-3 font-semibold text-white transition
                        ${processing
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {processing ? 'Creating…' : 'Create Product'}
                </button>
            </form>
        </div>
    );
}