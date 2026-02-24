import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, Link } from '@inertiajs/react';

export default function SiteUrlMapping({ urls }) {

    const updateNewUrl = (id, value) => {
        // Change router.put -> router.post
        router.post(
            route('site-urls.update', id),
            {
                _method: 'put',        // ✅ This tells Laravel: "Treat this as a PUT"
                new_url: value || null, 
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Site URL Mapping
                </h2>
            }
        >
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">
                    URL Mapping ({urls.total} found)
                </h1>

                <div className="overflow-x-auto">
                    <table className="w-full border bg-white shadow-sm rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="border p-3 text-left w-1/2">Old URL</th>
                                <th className="border p-3 text-left w-1/2">New Target</th>
                            </tr>
                        </thead>

                        <tbody>
                            {urls.data.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    <td className="border p-3 text-sm text-gray-600 break-all">
                                        {row.url}
                                    </td>

                                    <td className="border p-3">
                                        <input
                                            type="text"
                                            // ✅ Safe Null handling
                                            defaultValue={row.new_url || ''}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                            placeholder="/products/new-sofa-name"
                                            onBlur={(e) => updateNewUrl(row.id, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ✅ FIXED PAGINATION LOGIC */}
                <div className="mt-4 flex flex-wrap gap-1 justify-center">
                    {urls.links.map((link, index) => {
                        // 1. Common classes for both active and inactive links
                        const baseClasses = "px-3 py-1 border rounded text-sm";
                        
                        // 2. Active State (Current Page)
                        if (link.active) {
                            return (
                                <span
                                    key={index}
                                    className={`${baseClasses} bg-blue-600 text-white border-blue-600`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        }

                        // 3. Disabled State (Null URL - e.g. "Previous" on Page 1)
                        // CRITICAL FIX: Render a <span> instead of <Link> to prevent crash
                        if (!link.url) {
                            return (
                                <span
                                    key={index}
                                    className={`${baseClasses} bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        }

                        // 4. Standard Link (Clickable)
                        return (
                            <Link
                                key={index}
                                href={link.url}
                                className={`${baseClasses} bg-white text-gray-700 border-gray-300 hover:bg-gray-100`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}