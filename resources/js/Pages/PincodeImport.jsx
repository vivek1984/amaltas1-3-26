import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Welcome from './Welcome'; // Adjust path if your Welcome component is elsewhere

/**
 * PincodeImport Component
 * Provides a form to upload an Excel or CSV file for importing pincode data.
 * Displays success or error messages from the backend.
 */
export default function PincodeImport({ clusters }) {
    // useForm hook for handling form data, file uploads, and Inertia.js interactions
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null, // To store the selected file
    });

    // Access flash messages (success/error) passed from the backend
    // Use optional chaining for 'flash' to prevent errors if it's undefined
    const { flash } = usePage().props;

    // State to display the selected file name
    const [selectedFileName, setSelectedFileName] = useState('');

    // Handle file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setData('file', selectedFile);
        setSelectedFileName(selectedFile ? selectedFile.name : '');
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.file) {
            alert('Please select a file to upload.');
            return;
        }

        // Post the form data to the import route
        post(route('pincodes.import'), {
            onSuccess: () => {
                reset('file'); // Clear the file input after successful upload
                setSelectedFileName('');
                // Success message will be displayed via flash.success
            },
            onError: (formErrors) => {
                console.error('Import errors:', formErrors);
                // Errors are automatically populated into the 'errors' object
            },
        });
    };

    return (
        <Welcome clusters={clusters}>
            <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Import Pincode Data</h1>

                    {/* Flash Messages - Now using optional chaining for robustness */}
                    {flash?.success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Success!</strong>
                            <span className="block sm:inline"> {flash.success}</span>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {flash.error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                                Upload Excel/CSV File:
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={handleFileChange}
                                className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none ${
                                    errors.file ? 'border-red-500' : ''
                                }`}
                            />
                            {selectedFileName && (
                                <p className="mt-2 text-sm text-gray-600">Selected file: <span className="font-semibold">{selectedFileName}</span></p>
                            )}
                            {errors.file && <p className="text-red-500 text-xs italic mt-1">{errors.file}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full bg-maroon-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out
                                ${processing
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-maroon-700'
                                }`}
                        >
                            {processing ? 'Importing...' : 'Import Pincodes'}
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-gray-500 text-center">
                        * Supported formats: .xlsx, .xls, .csv. Max file size: 20MB.
                        <br/>
                        * Ensure your file has a header row with columns like 'Pincode', 'OfficeName', 'District', 'State', etc.
                    </p>
                </div>
            </div>
        </Welcome>
    );
}
