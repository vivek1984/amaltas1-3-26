import React, { useEffect, useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import _ from 'lodash'; // make sure lodash is installed

export default function ProductSearch({ initialQuery = '' }) {
  const [search, setSearch] = useState(initialQuery);

  // Ref to track if it's the initial mount of the component
  const isInitialMount = useRef(true);

  // Debounced search function
  const debouncedSearch = React.useRef(
    _.debounce((query) => {
      router.get(route('admin-product'), { search: query }, {
        preserveScroll: true,
        preserveState: true,
        replace: true,
      });
    }, 500)
  ).current;

  // Trigger search on input change, but not on initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      debouncedSearch(search);
    }
  }, [search, debouncedSearch]); // Include debouncedSearch in dependency array to satisfy ESLint

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search products..."
      className="border px-4 py-2 rounded mb-4"
    />
  );
}
