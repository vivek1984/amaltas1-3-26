import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { router } from '@inertiajs/react'

export default function SiteUrlMapping({ urls }) {

  const updateNewUrl = (id, value) => {
    router.put(
      route('site-urls.update', id),
      {
        new_url: value || null,
      },
      {
        preserveScroll: true,
        preserveState: true,
      }
    )
  }

  return (
    <AuthenticatedLayout header={
                            <h2 className="text-xl font-semibold leading-tight text-gray-800 flex justify-between">
                                Site URL Mapping
                            </h2>

                        }
                    >
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">URL Mapping</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Old URL</th>
            <th className="border p-2">New URL</th>
          </tr>
        </thead>

        <tbody>
          {urls.data.map((row) => (
            <tr key={row.id}>
              <td className="border p-2 break-all">
                {row.url}
              </td>

              <td className="border p-2">
                <input
                  type="text"
                  defaultValue={row.new_url ?? ''}
                  className="w-full border px-2 py-1"
                  placeholder="Enter new URL"
                  onBlur={(e) =>
                    updateNewUrl(row.id, e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AuthenticatedLayout>
  )
}
