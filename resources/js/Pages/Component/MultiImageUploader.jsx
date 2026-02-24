// File: src/components/MultipleImageUploader.jsx
import React, { useRef, useState } from 'react';
import { router } from '@inertiajs/react';

export default function MultiImageUploader({ images, variantId }) {

  const [imageList, setImageList] = useState(images);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const handleDelete = (imageId) => {
    router.post(
      '/images/delete',
      { id: imageId },
      {
        preserveScroll: true,
        onSuccess: () => {
          setImageList((prev) => prev.filter((img) => img.id !== imageId));
        },
      }
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('variant_id', variantId);

    router.visit('/images/upload', {
      method: 'post',
      data: formData,
      forceFormData: true,
      preserveScroll: true,
      onSuccess: (page) => {
        setImageList(page.props.images);
        setPreviewImage(null);
        fileInputRef.current.value = '';
      },
    });
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4 mt-10 justify-stretch">
        {imageList.map((image) => (
          <div key={image.id} className="relative group">
            <img
                src={`/storage/${image.name}`}
                alt="Uploaded"
              className=" h-48 object-cover rounded border"
                />

            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-80 hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}


      </div>
      <hr className="h-px my-8 bg-gray-200 border-2 dark:bg-gray-900"></hr>
      <div className='mt-10 mb-36'>
      {previewImage && (
          <div className="relative group">
            <img
              src={previewImage}
              alt="Preview"
              className=" h-32 object-cover rounded border border-dashed border-blue-400"
            />
          </div>
        )}
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
        className="space-y-2"
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      </div>
    </div>
  );
}
