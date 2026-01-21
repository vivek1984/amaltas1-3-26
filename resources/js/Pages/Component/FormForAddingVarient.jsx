import React, { useState, useEffect, useRef } from 'react'; // Added useState, useEffect, useRef for image handling
import { useForm } from '@inertiajs/react';

/**
 * FormForAddingVarient Component
 * A React component for creating a new product variant.
 * It provides input fields for various product attributes and uses Inertia.js
 * for form submission and error handling, styled with Tailwind CSS.
 *
 * @param {object} props - The component props.
 * @param {string} props.storeUrl - The backend URL where the variant data should be POSTed.
 * @param {function} [props.onVariantCreated] - Callback function executed on successful variant creation.
 * @param {function} [props.onCreatetError] - Callback function executed on creation error (e.g., validation).
 * @param {number} props.id - The ID of the parent product to associate this variant with.
 */
const FormForAddingVarient = ({ storeUrl, onVariantCreated, onCreateError, id }) => {
    // Initialize Inertia form state with default values for all fields.
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        shippable: 0,
        qty: 0,
        mrp: 0,
        price: 0,
        shipping_fee: 0,
        description: '',
        material: '',
        color: '',
        size: '', // Changed to string type for flexibility (e.g., "S", "M", "L")
        feature1: '',
        feature2: '',
        feature3: '',
        product_id: id,
        brand: 'Amaltas', // Default value
        size_image: null, // New field for the size image file
    });

    // Local state for image preview for size_image
    const [sizeImagePreview, setSizeImagePreview] = useState(null);
    // Ref for the size_image file input to clear it programmatically
    const sizeImageInputRef = useRef(null);

    // Effect to clean up the sizeImagePreview URL when component unmounts or file changes
    useEffect(() => {
        return () => {
            if (sizeImagePreview) {
                URL.revokeObjectURL(sizeImagePreview);
            }
        };
    }, [sizeImagePreview]);

    /**
     * Handles changes for all input fields (text, number, textarea, select, checkbox).
     * @param {Event} e - The change event object.
     */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setData(
            name,
            type === 'checkbox'
                ? Number(checked) // Convert true/false to 1/0
                : (type === 'number'
                    ? Number(value)
                    : value
                  )
        );
    };

    /**
     * Handles file input changes.
     * @param {Event} e - The change event object from the file input.
     * @param {string} fieldName - The name of the form field to update (e.g., 'size_image').
     */
    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            setData(fieldName, file);
            const previewUrl = URL.createObjectURL(file);
            if (fieldName === 'size_image') {
                setSizeImagePreview(previewUrl);
            }
        } else {
            setData(fieldName, null);
            if (fieldName === 'size_image') {
                setSizeImagePreview(null);
            }
        }
    };

    /**
     * Handles the form submission.
     * Uses Inertia's post method to send the variant data to the specified URL.
     * @param {Event} e - The form submission event object.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit the form data using Inertia's post method.
        post(storeUrl, {
            onSuccess: (page) => {
                console.log('Variant created successfully!', page);
                reset(); // Reset all form fields to their initial state
                // Clear image preview and file input value
                setSizeImagePreview(null);
                if (sizeImageInputRef.current) sizeImageInputRef.current.value = '';

                if (onVariantCreated) {
                    onVariantCreated(page); // Call parent's success callback
                }
            },
            onError: (formErrors) => {
                console.error('Variant creation failed:', formErrors);
                if (onCreateError) {
                    onCreateError(formErrors); // Call parent's error callback
                }
            },
            onFinish: () => {
                console.log('Variant creation submission finished.');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Create New Product Variant
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Name:
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
                            placeholder="Variant Name"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
                    </div>

                    {/* Brand */}
                    <div>
                        <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">
                            Brand:
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={data.brand}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                errors.brand ? 'border-red-500' : ''
                            }`}
                            placeholder="Brand Name"
                        />
                        {errors.brand && <p className="text-red-500 text-xs italic mt-1">{errors.brand}</p>}
                    </div>

                    {/* Qty */}
                    <div>
                        <label htmlFor="qty" className="block text-gray-700 text-sm font-bold mb-2">
                            Quantity:
                        </label>
                        <input
                            type="number"
                            id="qty"
                            name="qty"
                            value={data.qty}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                errors.qty ? 'border-red-500' : ''
                            }`}
                            placeholder="Available Quantity"
                            required
                            min="0"
                        />
                        {errors.qty && <p className="text-red-500 text-xs italic mt-1">{errors.qty}</p>}
                    </div>

                    {/* MRP */}
                    <div>
                        <label htmlFor="mrp" className="block text-gray-700 text-sm font-bold mb-2">
                            MRP (Max. Retail Price):
                        </label>
                        <input
                            type="number"
                            id="mrp"
                            name="mrp"
                            value={data.mrp}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                errors.mrp ? 'border-red-500' : ''
                            }`}
                            placeholder="Maximum Retail Price"
                            required
                            min="0"
                        />
                        {errors.mrp && <p className="text-red-500 text-xs italic mt-1">{errors.mrp}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                            Selling Price:
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                errors.price ? 'border-red-500' : ''
                            }`}
                            placeholder="Selling Price"
                            required
                            min="0"
                        />
                        {errors.price && <p className="text-red-500 text-xs italic mt-1">{errors.price}</p>}
                    </div>

                    {/* Shipping Fee */}
                    <div>
                        <label htmlFor="shipping_fee" className="block text-gray-700 text-sm font-bold mb-2">
                            Shipping Fee:
                        </label>
                        <input
                            type="number"
                            id="shipping_fee"
                            name="shipping_fee"
                            value={data.shipping_fee}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                errors.shipping_fee ? 'border-red-500' : ''
                            }`}
                            placeholder="Shipping Cost"
                            required
                            min="0"
                        />
                        {errors.shipping_fee && <p className="text-red-500 text-xs italic mt-1">{errors.shipping_fee}</p>}
                    </div>

                    {/* Color */}
                    <div>
                        <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">
                            Color:
                        </label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            value={data.color}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                errors.color ? 'border-red-500' : ''
                            }`}
                            placeholder="e.g., Red, Blue, Black"
                        />
                        {errors.color && <p className="text-red-500 text-xs italic mt-1">{errors.color}</p>}
                    </div>

                    {/* Size (text input for flexibility like S, M, L) */}
                    <div>
                        <label htmlFor="size" className="block text-gray-700 text-sm font-bold mb-2">
                            Size :
                        </label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            value={data.size}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                errors.size ? 'border-red-500' : ''
                            }`}
                            placeholder="e.g., S, M, L or 10, 25, 120"
                        />
                        {errors.size && <p className="text-red-500 text-xs italic mt-1">{errors.size}</p>}
                    </div>

                    {/* Feature 1 */}
                    <div>
                        <label htmlFor="feature1" className="block text-gray-700 text-sm font-bold mb-2">
                            Feature 1:
                        </label>
                        <input
                            type="text"
                            id="feature1"
                            name="feature1"
                            value={data.feature1}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                errors.feature1 ? 'border-red-500' : ''
                            }`}
                            placeholder="Key feature or attribute"
                        />
                        {errors.feature1 && <p className="text-red-500 text-xs italic mt-1">{errors.feature1}</p>}
                    </div>

                    {/* Feature 2 */}
                    <div>
                        <label htmlFor="feature2" className="block text-gray-700 text-sm font-bold mb-2">
                            Feature 2:
                        </label>
                        <input
                            type="text"
                            id="feature2"
                            name="feature2"
                            value={data.feature2}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                errors.feature2 ? 'border-red-500' : ''
                            }`}
                            placeholder="Another key feature"
                        />
                        {errors.feature2 && <p className="text-red-500 text-xs italic mt-1">{errors.feature2}</p>}
                    </div>

                    {/* Feature 3 */}
                    <div>
                        <label htmlFor="feature3" className="block text-gray-700 text-sm font-bold mb-2">
                            Feature 3:
                        </label>
                        <input
                            type="text"
                            id="feature3"
                            name="feature3"
                            value={data.feature3}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                errors.feature3 ? 'border-red-500' : ''
                            }`}
                            placeholder="Additional feature"
                        />
                        {errors.feature3 && <p className="text-red-500 text-xs italic mt-1">{errors.feature3}</p>}
                    </div>

                    {/* Shippable Checkbox */}
                    <div className="md:col-span-2 flex items-center mt-4">
                        <input
                            type="checkbox"
                            id="shippable"
                            name="shippable"
                            checked={!!data.shippable} // Ensure checkbox reflects 0/1 correctly
                            onChange={handleChange}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="shippable" className="text-gray-700 text-sm font-bold">
                            Shippable (Can this item be shipped?)
                        </label>
                        {errors.shippable && <p className="text-red-500 text-xs italic mt-1">{errors.shippable}</p>}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        rows="4"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y ${
                            errors.description ? 'border-red-500' : ''
                        }`}
                        placeholder="Detailed description of the variant"
                        required
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs italic mt-1">{errors.description}</p>}
                </div>

                {/* Material */}
                <div className="mb-6">
                    <label htmlFor="material" className="block text-gray-700 text-sm font-bold mb-2">
                        Material:
                    </label>
                    <textarea
                        id="material"
                        name="material"
                        value={data.material}
                        onChange={handleChange}
                        rows="3"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y ${
                            errors.material ? 'border-red-500' : ''
                        }`}
                        placeholder="Material composition"
                    ></textarea>
                    {errors.material && <p className="text-red-500 text-xs italic mt-1">{errors.material}</p>}
                </div>

                {/* Size Image Upload (New Field) */}
                <div className="mb-6">
                    <label htmlFor="size_image" className="block text-gray-700 text-sm font-bold mb-2">
                        Size Image:
                    </label>
                    <input
                        type="file"
                        id="size_image"
                        name="size_image"
                        ref={sizeImageInputRef} // Attach ref
                        accept="image/*" // Restrict to image files
                        onChange={(e) => handleFileChange(e, 'size_image')} // Use specific handler
                        className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                            errors.size_image ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.size_image && <p className="text-red-500 text-xs italic mt-1">{errors.size_image}</p>}
                    {sizeImagePreview && (
                        <div className="mt-2 text-center">
                            <p className="text-gray-600 text-xs mb-1">Preview:</p>
                            <img src={sizeImagePreview} alt="Size Image Preview" className="max-w-full h-24 object-contain rounded-md shadow-sm border border-gray-200 inline-block" />
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
                    {processing ? 'Creating Variant...' : 'Create Variant'}
                </button>
            </form>
        </div>
    );
};

export default FormForAddingVarient;
