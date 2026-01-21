import { useState } from 'react';
import { useForm } from '@inertiajs/react'; // Import useForm

export default function FormForAddingCluster({ formFor, urlFor  }) {



               // Initialize form state using Inertia's useForm hook
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        image: null, // Stores the File object
    });

    // State for image preview (still managed locally as it's UI-specific)
    const [imagePreview, setImagePreview] = useState(null);

    // Handle file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            setData('image', file); // Set the file using Inertia's setData
            setImagePreview(URL.createObjectURL(file)); // Create URL for preview
        } else {
            setData('image', null);
            setImagePreview(null);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Use Inertia's post method to submit the form data
        // The first argument is the URL your backend route will handle (e.g., /items)
        // The second argument is an options object.
        post(`/${urlFor}`, { // Adjust this URL to your actual backend route for storing items
            onSuccess: () => {
                console.log('Upload successful!');
                reset(); // Reset the form fields after successful submission
                setImagePreview(null); // Clear image preview
            },
            onError: (formErrors) => {
                console.error('Validation errors:', formErrors);
                // Errors are automatically available via the `errors` object from useForm
            },
            onFinish: () => {
                console.log('Form submission finished (success or error).');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add a {formFor} Item
                </h2>

                {/* Name Field */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name} // Use data.name
                        onChange={(e) => setData('name', e.target.value)} // Use setData
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                            errors.name ? 'border-red-500' : '' // Apply error styling
                        }`}
                        placeholder={` Enter ${formFor} name `}
                        required
                    />
                    {errors.name && ( // Display error message
                        <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
                    )}
                </div>

                {/* Description Field */}
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={data.description} // Use data.description
                        onChange={(e) => setData('description', e.target.value)} // Use setData
                        rows="4"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y ${
                            errors.description ? 'border-red-500' : '' // Apply error styling
                        }`}
                        placeholder={` Describe ${formFor}  `}
                        required
                    ></textarea>
                    {errors.description && ( // Display error message
                        <p className="text-red-500 text-xs italic mt-1">{errors.description}</p>
                    )}
                </div>

                {/* Image Upload Field */}
                <div className="mb-6">
                    <label
                        htmlFor="image"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Image:
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*" // Restrict to image files
                        onChange={handleImageChange} // Use handleImageChange
                        className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                            errors.image ? 'border-red-500' : '' // Apply error styling
                        }`}
                    />
                    {imagePreview && (
                        <div className="mt-4 flex flex-col items-center">
                            <p className="text-gray-600 text-sm mb-2">Image Preview:</p>
                            <img
                                src={imagePreview}
                                alt="Image Preview"
                                className="max-w-xs max-h-48 object-contain rounded-md shadow-sm"
                            />
                        </div>
                    )}
                    {errors.image && ( // Display error message
                        <p className="text-red-500 text-xs italic mt-1">{errors.image}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={processing} // Disable button when submitting
                    className={`w-full bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out ${
                        processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700' // Styling for processing state
                    }`}
                >
                    {processing ? 'Uploading...' : 'Upload Item'} {/* Change text when processing */}
                </button>
            </form>
        </div>
    );



}



