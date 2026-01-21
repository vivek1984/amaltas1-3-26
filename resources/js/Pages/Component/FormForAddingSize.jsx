import React, { useState, useEffect, useRef } from 'react'; // Import useRef for file input
import { useForm } from '@inertiajs/react';

/**
 * FormForAddingSize Component
 * A React component for creating a new product size, associated with a specific design.
 * It provides a dropdown to select an existing design and input fields for size attributes.
 * The form fields are conditionally rendered only after a design is selected.
 * Uses Inertia.js for form submission and error handling, styled with Tailwind CSS.
 *
 * @param {object} props - The component props.
 * @param {string} props.storeUrl - The backend URL where the size data should be POSTed.
 * @param {Array<object>} props.availableDesigns - An array of design objects for the dropdown.
 * Each design object should have at least `id` and `name` properties.
 * Example: [{ id: 1, name: 'Floral Pattern for Red T-Shirt' }, { id: 2, name: 'Geometric Abstract for Blue Jeans' }]
 * @param {function} [props.onSizeCreated] - Callback function executed on successful size creation.
 * @param {function} [props.onCreateError] - Callback function executed on creation error (e.g., validation).
 */
const FormForAddingSize = ({ storeUrl, availableDesigns, onSizeCreated, onCreateError }) => {
    // --- DEBUGGING LOG: Check availableDesigns prop on render ---
    console.log('FormForAddingSize: availableDesigns prop:', availableDesigns);

    // Determine the initial selected design ID.
    // Ensure availableDesigns is an array before accessing its length or elements.
    const initialDesignId = (availableDesigns && availableDesigns.length > 0) ? availableDesigns[0].id : '';

    // Initialize Inertia form state with default values for all size fields.
    const { data, setData, post, processing, errors, reset } = useForm({
        design_id: initialDesignId, // The ID of the selected design (crucial for association)
        name: '',
        description: '',
        mrp: 0,
        price: 0,
        shipping: 0,
        qty: 0,
        size_image: null, // New field for the size image
    });

    // Local state for client-side error messages (e.g., for missing design selection)
    const [clientError, setClientError] = useState(null);
    // Local state for image preview for size_image
    const [sizeImagePreview, setSizeImagePreview] = useState(null);
    // Ref for the size_image file input to clear it programmatically
    const sizeImageInputRef = useRef(null);

    // --- DEBUGGING LOG: Track data.design_id changes ---
    useEffect(() => {
        console.log('FormForAddingSize: Current data.design_id in useEffect:', data.design_id);
    }, [data.design_id]);

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
        const { name, value, type } = e.target; // 'checked' is not needed for these fields.

        // --- DEBUGGING LOG: Log input change ---
        console.log(`handleChange: Input '${name}' changed. Type: ${type}, Value: ${value}`);

        setData(
            name,
            type === 'number' // Convert to number if it's a number input
                ? Number(value)
                : value
        );
        // Clear client-side error when user interacts with the form, specifically for design_id
        if (clientError && name === 'design_id') {
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
     * Uses Inertia's post method to send the size data to the specified URL.
     * @param {Event} e - The form submission event object.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setClientError(null); // Clear any previous client-side errors

        // Basic client-side check: Ensure a design is selected if available.
        if (availableDesigns.length > 0 && !data.design_id) {
            console.error("Please select a design.");
            setClientError("Please select a design before submitting."); // Display message in UI
            return;
        }

        // Submit the form data using Inertia's post method.
        post(storeUrl, {
            onSuccess: (page) => {
                console.log('Size created successfully!', page);
                reset(); // Reset all form fields to their initial state
                // Re-initialize design_id to the first available design if any
                setData('design_id', (availableDesigns && availableDesigns.length > 0) ? availableDesigns[0].id : '');
                // Clear image preview and file input value
                setSizeImagePreview(null);
                if (sizeImageInputRef.current) sizeImageInputRef.current.value = '';

                if (onSizeCreated) {
                    onSizeCreated(page); // Call parent's success callback
                }
            },
            onError: (formErrors) => {
                console.error('Size creation failed:', formErrors);
                if (onCreateError) {
                    onCreateError(formErrors); // Call parent's error callback
                }
            },
            onFinish: () => {
                console.log('Size creation submission finished.');
            }
        });
    };

    // Conditional rendering: If no designs are available, show a message.
    if (!availableDesigns || availableDesigns.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
                    <p className="text-red-600 text-lg font-semibold">
                        Please add a Design before adding a size.
                    </p>
                    <p className="text-gray-600 mt-2">
                        Sizes must be associated with an existing product design.
                    </p>
                </div>
            </div>
        );
    }

    // Render the form container and design selection dropdown
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Create New Product Size
                </h2>

                {/* Design Dropdown - ALWAYS VISIBLE if designs exist */}
                <div className="md:col-span-2 mb-6"> {/* Span full width */}
                    <label htmlFor="design_id" className="block text-gray-700 text-sm font-bold mb-2">
                        Select Design:
                    </label>
                    <select
                        id="design_id"
                        name="design_id"
                        value={data.design_id}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                            errors.design_id || clientError ? 'border-red-500' : '' // Apply error border for client-side too
                        }`}
                        required
                    >
                        {/* Option to prompt selection if current design_id is empty */}
                        {data.design_id === '' && (
                            <option value="" disabled>-- Select a Design --</option>
                        )}
                        {availableDesigns.map((design) => (
                            <option key={design.id} value={design.id}>
                                {design.name} {/* Assuming design object has a 'name' field */}
                                {/* You might want to combine fields for more descriptive options like {design.name} ({design.color}, {design.size}) */}
                            </option>
                        ))}
                    </select>
                    {errors.design_id && <p className="text-red-500 text-xs italic mt-1">{errors.design_id}</p>}
                    {clientError && <p className="text-red-500 text-xs italic mt-1">{clientError}</p>} {/* Display client-side error */}
                </div>

                {/* Conditional rendering for the rest of the form fields */}
                {data.design_id ? ( // This condition controls the visibility of the main form fields
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Name (for the Size) */}
                            <div>
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                    Size Name:
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
                                    placeholder="e.g., Small, Medium, Large, 32"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
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
                                <label htmlFor="shipping" className="block text-gray-700 text-sm font-bold mb-2">
                                    Shipping Fee:
                                </label>
                                <input
                                    type="number"
                                    id="shipping"
                                    name="shipping"
                                    value={data.shipping}
                                    onChange={handleChange}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                                        errors.shipping ? 'border-red-500' : ''
                                    }`}
                                    placeholder="Shipping Cost"
                                    required
                                    min="0"
                                />
                                {errors.shipping && <p className="text-red-500 text-xs italic mt-1">{errors.shipping}</p>}
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
                                placeholder="Detailed description of this size/SKU"
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
                            {processing ? 'Creating Size...' : 'Create Size'}
                        </button>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-lg">
                            Please select a design from the dropdown above to add a size.
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default FormForAddingSize;
