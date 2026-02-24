export default function ProductDetailsCard({ activeDetails }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-sm text-gray-700">
      <p className="font-semibold mb-2">Product Details</p>

      {activeDetails.description && <p className="mb-2 text-gray-700">{activeDetails.description}</p>}
      {activeDetails.feature1 && <p>• {activeDetails.feature1}</p>}
      {activeDetails.feature2 && <p>• {activeDetails.feature2}</p>}
      {activeDetails.feature3 && <p>• {activeDetails.feature3}</p>}

      {activeDetails.material && (
        <div className="flex align-middle mt-3">
          <p className="font-semibold">Material: </p>
          <p className="ml-1">{activeDetails.material}</p>
        </div>
      )}

      {activeDetails.size && (
        <div className="flex align-middle mt-3">
          <p className="font-semibold">Size: </p>
          <p className="ml-1">{activeDetails.size}</p>
        </div>
      )}
    </div>
  );
}
