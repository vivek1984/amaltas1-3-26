import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

/**
 * ImageUploader Component
 * A reusable React component for uploading a single image using Inertia.js.
 * It provides a file input, an image preview, and handles submission
 * and displaying validation errors.
 *
 * @param {object} props - The component props.
 * @param {string} props.uploadUrl - The backend URL where the image should be POSTed.
 * @param {string} [props.label='Upload Image'] - The label for the file input.
 * @param {function} [props.onUploadSuccess] - Callback function executed on successful upload.
 * @param {function} [props.onUploadError] - Callback function executed on upload error (e.g., validation).
 */
const ImageUploader = ({ uploadUrl, label = 'Upload Image', onUploadSuccess, onUploadError, identifier }) => {
    // Initialize form state using Inertia's useForm hook.
    // The 'image' field will hold the File object selected by the user.
    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,
        value: identifier
    });

    // Local state to manage the image preview URL.
    const [imagePreview, setImagePreview] = useState(null);

    // Effect to clean up the image preview URL when the component unmounts
    // or when a new image is selected/cleared.
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    /**
     * Handles the change event of the file input.
     * Updates the Inertia form data with the selected file and creates a preview URL.
     * @param {Event} e - The change event object.
     */
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            setData('image', file); // Set the file to Inertia form data
            setImagePreview(URL.createObjectURL(file)); // Create a URL for image preview
        } else {
            setData('image', null); // Clear the file from form data
            setImagePreview(null); // Clear the image preview
        }
    };

    /**
     * Handles the form submission.
     * Uses Inertia's post method to send the image to the specified URL.
     * Includes callbacks for success, error, and finish events.
     * @param {Event} e - The form submission event object.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit the form data using Inertia's post method.
        // Inertia automatically handles sending files as 'multipart/form-data'.
        post(uploadUrl, {
            onSuccess: (page) => {
                console.log('Image uploaded successfully!', page);
                reset(); // Reset the form fields (clears the file input)
                setImagePreview(null); // Clear the image preview
                if (onUploadSuccess) {
                    onUploadSuccess(page); // Call parent's success callback
                }
            },
            onError: (formErrors) => {
                console.error('Image upload failed:', formErrors);
                if (onUploadError) {
                    onUploadError(formErrors); // Call parent's error callback
                }
            },
            onFinish: () => {
                // This callback runs whether the submission was successful or not.
                window.location.reload();
                console.log('Image upload submission finished.');
            }
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {label}
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="image-upload"
                        className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
                    >
                        Select Image:
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        name="image"
                        accept="image/*" // Restrict to image files
                        onChange={handleFileChange}
                        className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                            errors.image ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.image}</p>
                    )}
                </div>

                {imagePreview && (
                    <div className="mb-4 flex flex-col items-center">
                        <p className="text-gray-600 text-sm mb-2">Preview:</p>
                        <img
                            src={imagePreview}
                            alt="Image Preview"
                            className="max-w-full h-auto max-h-48 object-contain rounded-md shadow-sm border border-gray-200"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={processing || !data.image} // Disable if processing or no image selected
                    className={`w-full bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out ${
                        processing || !data.image
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-blue-700'
                    }`}
                >
                    {processing ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
};

export default ImageUploader;
