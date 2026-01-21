import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function ClusterSelectionForm({ clusters, onClose, products, currentProduct, urlTo, heading }) {

    const product_current = products.find(p => p.id === currentProduct);

    const list_of_clusters = product_current?.clusters ?? [];
    const ids = list_of_clusters.map(cluster => cluster.id);



  const { data, setData, post, processing, errors } = useForm({
    items: ids,
    product: currentProduct
  });

  const handleCheckboxChange = (e) => {
    const value = parseInt(e.target.value); // Ensure ID is a number (if IDs are numeric)
    if (e.target.checked) {
      setData('items', [...data.items, value]);
    } else {
      setData('items', data.items.filter((id) => id !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(urlTo); // your Laravel route
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 m-3">
      <h2 className="text-lg font-semibold">Select {heading}:</h2>

      {clusters.map((cluster) => (
        <label key={cluster.id} className="block">
          <input
            type="checkbox"
            value={cluster.id}
            checked={data.items.includes(cluster.id)}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          {cluster.name}
        </label>
      ))}

      {errors.items && <div className="text-red-500">{errors.items}</div>}

      <button type="submit" disabled={processing} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Submit
      </button>

    </form>
  );
}
