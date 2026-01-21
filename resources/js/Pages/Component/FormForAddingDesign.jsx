import React, { useState, useEffect, useRef } from 'react'; // Import useRef for file input
import { useForm } from '@inertiajs/react';

/**
 * FormForAddingDesign Component
 * A React component for creating a new product design, associated with a specific variant.
 * It provides input fields for essential design attributes and a dropdown
 * to select an existing variant.
 * Uses Inertia.js for form submission and error handling, styled with Tailwind CSS.
 *
 * @param {object} props - The component props.
 * @param {string} props.storeUrl - The backend URL where the design data should be POSTed.
 * @param {Array<object>} props.availableVariants - An array of variant objects for the dropdown.
 * Each variant object should have at least `id` and `name` properties.
 * Example: [{ id: 1, name: 'Floral Pattern for Red T-Shirt' }, { id: 2, name: 'Geometric Abstract for Blue Jeans' }]
 * @param {function} [props.onDesignCreated] - Callback function executed on successful design creation.
 * @param {function} [props.onCreateError] - Callback function executed on creation error (e.g., validation).
 */
const FormForAddingDesign = ({ storeUrl, availableVariants, onDesignCreated, onCreateError }) => {
    // --- DEBUGGING LOG: Check availableVariants prop on render ---
    console.log('FormForAddingDesign: availableVariants prop:', availableVariants);

    // Determine the initial selected variant ID.
    const initialVariantId = (availableVariants && availableVariants.length > 0) ? availableVariants[0].id : '';

    // Initialize Inertia form state with only the required design fields.
    const { data, setData, post, processing, errors, reset } = useForm({
        variant_id: initialVariantId, // The ID of the selected variant (crucial for association)
        name: '',
        mrp: 0,
        price: 0,
        shipping_fee: 0, // Corrected from 'shipping' to 'shipping_fee' to match previous definitions
        description: '',
        size_image: null, // New field for the size image
    });

    // Local state for client-side error messages (e.g., for missing variant selection)
    const [clientError, setClientError] = useState(null);
    // Local state for image preview for size_image
    const [sizeImagePreview, setSizeImagePreview] = useState(null);
    // Ref for the size_image file input to clear it programmatically
    const sizeImageInputRef = useRef(null);


    // --- DEBUGGING LOG: Track data.variant_id changes ---
    useEffect(() => {
        console.log('FormForAddingDesign: Current data.variant_id in useEffect:', data.variant_id);
    }, [data.variant_id]);

    // Effect to clean up the sizeImagePreview URL when component unmounts or file changes
    useEffect(() => {
        return () => {
            if (sizeImagePreview) {
                URL.revokeObjectURL(sizeImagePreview);
            }
        };
    }, [sizeImagePreview]);


    /**
     * Handles changes for all input fields (text, number, textarea, select).
     * @param {Event} e - The change event object.
     */
    const handleChange = (e) => {
        const { name, value, type } = e.target; // 'checked' is no longer needed as 'shippable' is removed

        // --- DEBUGGING LOG: Log input change ---
        console.log(`handleChange: Input '${name}' changed. Type: ${type}, Value: ${value}`);

        setData(
            name,
            type === 'number'
                ? Number(value)
                : value
        );
        // Clear client-side error when user interacts with the form, specifically for variant_id
        if (clientError && name === 'variant_id') {
            setClientError(null);
        }
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
     * Uses Inertia's post method to send the design data to the specified URL.
     * @param {Event} e - The form submission event object.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setClientError(null); // Clear any previous client-side errors

        // Basic client-side check: Ensure a variant is selected if available.
        if (availableVariants.length > 0 && !data.variant_id) {
            console.error("Please select a variant.");
            setClientError("Please select a variant before submitting."); // Display message in UI
            return;
        }

        // Submit the form data using Inertia's post method.
        post(storeUrl, {
            onSuccess: (page) => {
                console.log('Design created successfully!', page);
                reset(); // Reset all form fields to their initial state
                // Re-initialize variant_id to the first available variant if any
                setData('variant_id', (availableVariants && availableVariants.length > 0) ? availableVariants[0].id : '');
                // Clear image preview and file input value
                setSizeImagePreview(null);
                if (sizeImageInputRef.current) sizeImageInputRef.current.value = '';

                if (onDesignCreated) {
                    onDesignCreated(page); // Call parent's success callback
                }
            },
            onError: (formErrors) => {
                console.error('Design creation failed:', formErrors);
                if (onCreateError) {
                    onCreateError(formErrors); // Call parent's error callback
                }
            },
            onFinish: () => {
                console.log('Design creation submission finished.');
            }
        });
    };

    // Conditional rendering for the form based on variant availability
    if (!availableVariants || availableVariants.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
                    <p className="text-red-600 text-lg font-semibold">
                        Please add a variant before adding a design.
                    </p>
                    <p className="text-gray-600 mt-2">
                        Designs must be associated with an existing product variant.
                    </p>
                </div>
            </div>
        );
    }

    // Render the form container and variant selection dropdown
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Create New Product Design
                </h2>

                {/* Variant Dropdown - ALWAYS VISIBLE if variants exist */}
                <div className="md:col-span-2 mb-6"> {/* Span full width */}
                    <label htmlFor="variant_id" className="block text-gray-700 text-sm font-bold mb-2">
                        Select Variant:
                    </label>
                    <select
                        id="variant_id"
                        name="variant_id"
                        value={data.variant_id}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                            errors.variant_id || clientError ? 'border-red-500' : '' // Apply error border for client-side too
                        }`}
                        required
                    >
                        {/* Option to prompt selection if current variant_id is empty */}
                        {data.variant_id === '' && ( // Check data.variant_id, not initialVariantId
                            <option value="" disabled>-- Select a Variant --</option>
                        )}
                        {availableVariants.map((variant) => (
                            <option key={variant.id} value={variant.id}>
                                {variant.name} {/* Assuming variant object has a 'name' field */}
                                {/* You might want to combine fields for more descriptive options like {variant.name} ({variant.color}, {variant.size}) */}
                            </option>
                        ))}
                    </select>
                    {errors.variant_id && <p className="text-red-500 text-xs italic mt-1">{errors.variant_id}</p>}
                    {clientError && <p className="text-red-500 text-xs italic mt-1">{clientError}</p>} {/* Display client-side error */}
                </div>

                {/* Conditional rendering for the rest of the form fields */}
                {data.variant_id ? ( // This condition controls the visibility of the main form fields
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Design Name */}
                            <div>
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                    Design Name:
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
                                    placeholder="e.g., Floral Pattern, Geometric Abstract"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
                            </div>

                            {/* MRP */}
                            <div>
                                <label htmlFor="mrp" className="block text-gray-700 text-sm font-bold mb-2">
                                    MRP (Max. Retail Price):
                                    {/* You might want to make this optional if it's derived from design/variant */}
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
                                    {/* You might want to make this optional if it's derived from design/variant */}
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
                        </div> {/* CLOSING DIV FOR THE GRID */}

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
                                placeholder="Detailed description of the design"
                                required
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-xs italic mt-1">{errors.description}</p>}
                        </div>

                        {/* Size Image Upload */}
                        <div className="mb-6">
                            <label htmlFor="size_image" className="block text-gray-700 text-sm font-bold mb-2">
                                Size Image:
                            </label>
                            <input
                                type="file"
                                id="size_image"
                                name="size_image"
                                ref={sizeImageInputRef} // Attach ref
                                accept="image/*"
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
                            {processing ? 'Creating Design...' : 'Create Design'}
                        </button>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-lg">
                            Please select a design from the dropdown above to add a design.
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default FormForAddingDesign;
