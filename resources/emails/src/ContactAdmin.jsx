import * as React from "react";

/**
 * Renders a report card for a custom furniture enquiry,
 * displaying key-value pairs from the `data` prop in a stylized table.
 *
 * @param {Object} props - Component props.
 * @param {Object<string, string>} props.data - The data object containing the enquiry details.
 */
export default function ContactAdmin({ data }) {

    // Utility function to ensure the value is a renderable string
    const renderValue = (value) => {
        if (value === null || value === undefined || value === '') {
            return "-";
        }

        // This is the core fix: Safely converting objects/arrays to strings.
        if (typeof value === 'object') {
            try {
                // Use JSON.stringify for a safe, printable representation of the object/array
                return JSON.stringify(value, null, 2);
            } catch (e) {
                return "[Unprintable Object]";
            }
        }

        return value;
    };

    // Filter out unwanted keys before rendering the entries
    const filteredEntries = Object.entries(data).filter(([key]) =>
        // Exclude the recaptcha_token field from the report
        key !== 'recaptcha_token'
    );

    return (
        <div className="p-6 md:p-10 bg-gray-50 shadow-2xl rounded-xl max-w-4xl mx-auto my-10 font-sans border border-gray-100">
            <h2 className="mb-6 text-3xl font-bold text-indigo-700 border-b-4 border-indigo-100 pb-3">
                New Custom Furniture Enquiry
            </h2>

            <table
                className="w-full border-collapse text-base border-spacing-0"
            >
                <tbody>
                    {/* Map over the filtered data entries to create table rows */}
                    {filteredEntries.map(([key, value], index) => (
                        <tr key={key} className={index % 2 === 0 ? 'bg-indigo-50/50' : 'bg-white'}>
                            {/* Key Column (Field Name) - Enhanced styling for a "label" look */}
                            <td
                                className="px-4 py-3 font-semibold capitalize w-1/3 text-indigo-800 border-b border-gray-200 border-r border-indigo-100/50 rounded-l-lg"
                            >
                                {/* Format the key: replace underscores with spaces and capitalize */}
                                {key.replace(/_/g, " ")}
                            </td>

                            {/* Value Column (Data Content) - Clean styling for the actual data */}
                            <td
                                className="px-4 py-3 text-gray-700 border-b border-gray-200 whitespace-pre-wrap rounded-r-lg"
                            >
                                {/* Use the safe renderValue function to prevent rendering errors */}
                                {renderValue(value)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
