import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';

/**
 * CreateProductModal Component
 * A modal component containing a form to create a new product.
 * It takes inputs for name, shippable status, thumbnail image, and small image.
 * Uses Inertia.js for form handling and Tailwind CSS for styling.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - Callback function to close the modal.
 * @param {string} props.storeUrl - The backend URL where the product data should be POSTed.
 * @param {function} [props.onProductCreated] - Callback function executed on successful product creation.
 * @param {function} [props.onCreateError] - Callback function executed on creation error.
 */
const CreateProductModal = ({ isOpen, onClose, storeUrl, onProductCreated, onCreateError }) => {
    // Initialize Inertia form state with default values
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        shippable: 0, // Sending 0 or 1 as requested
        thumbnail: null, // Will hold the File object
        small_image: null, // Will hold the File object
    });

    // Local state for image previews
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [smallImagePreview, setSmallImagePreview] = useState(null);

    // Refs for file inputs to clear them programmatically if needed
    const thumbnailInputRef = useRef(null);
    const smallImageInputRef = useRef(null);

    // Effect to create and revoke object URLs for image previews.
    // Cleans up memory when component unmounts or image files change.
    useEffect(() => {
        // Thumbnail preview cleanup
        return () => {
            if (thumbnailPreview) {
                URL.revokeObjectURL(thumbnailPreview);
            }
            if (smallImagePreview) {
                URL.revokeObjectURL(smallImagePreview);
            }
        };
    }, [thumbnailPreview, smallImagePreview]);

    // Handle general text/number/boolean inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(
            name,
            type === 'checkbox'
                ? Number(checked) // Convert true/false to 1/0
                : value
        );
    };

    // Handle file input changes
    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            setData(fieldName, file);
            const previewUrl = URL.createObjectURL(file);
            if (fieldName === 'thumbnail') {
                setThumbnailPreview(previewUrl);
            } else if (fieldName === 'small_image') {
                setSmallImagePreview(previewUrl);
            }
        } else {
            setData(fieldName, null);
            if (fieldName === 'thumbnail') {
                setThumbnailPreview(null);
            } else if (fieldName === 'small_image') {
                setSmallImagePreview(null);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(storeUrl, {
            onSuccess: (page) => {
                console.log('Product created successfully!', page);
                reset(); // Reset form data
                setThumbnailPreview(null); // Clear image previews
                setSmallImagePreview(null);
                if (thumbnailInputRef.current) thumbnailInputRef.current.value = ''; // Clear file input value
                if (smallImageInputRef.current) smallImageInputRef.current.value = ''; // Clear file input value
                onClose(); // Close the modal
                if (onProductCreated) {
                    onProductCreated(page); // Callback for parent component
                }
            },
            onError: (formErrors) => {
                console.error('Product creation failed:', formErrors);
                if (onCreateError) {
                    onCreateError(formErrors); // Callback for parent component
                }
            },
            onFinish: () => {
                console.log('Product creation submission finished.');
            }
        });
    };

    if (!isOpen) return null; // Don't render if modal is not open

    return (

            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Create New Product
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Product Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Product Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                errors.name ? 'border-red-500' : ''
                            }`}
                            placeholder="e.g., Apple iPhone 15"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
                    </div>

                    {/* Shippable Checkbox */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="shippable"
                            name="shippable"
                            checked={!!data.shippable} // Ensure checkbox reflects 0/1 correctly
                            onChange={handleChange}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="shippable" className="text-gray-700 text-sm font-bold">
                            Shippable (Can this product be shipped?)
                        </label>
                        {errors.shippable && <p className="text-red-500 text-xs italic mt-1">{errors.shippable}</p>}
                    </div>



                    {/* Small Image Upload */}
                    <div className="mb-6">
                        <label htmlFor="small_image" className="block text-gray-700 text-sm font-bold mb-2">
                            Small Image:
                        </label>
                        <input
                            type="file"
                            id="small_image"
                            name="small_image"
                            ref={smallImageInputRef}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'small_image')}
                            className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                                errors.small_image ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.small_image && <p className="text-red-500 text-xs italic mt-1">{errors.small_image}</p>}
                        {smallImagePreview && (
                            <div className="mt-2 text-center">
                                <p className="text-gray-600 text-xs mb-1">Preview:</p>
                                <img src={smallImagePreview} alt="Small Image Preview" className="max-w-full h-24 object-contain rounded-md shadow-sm border border-gray-200 inline-block" />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out
                            ${processing
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-blue-700'
                            }`}
                    >
                        {processing ? 'Creating Product...' : 'Create Product'}
                    </button>
                </form>
            </div>

    );
};

export default CreateProductModal;
