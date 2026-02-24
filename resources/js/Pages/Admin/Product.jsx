import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

import MapProducts from '../Component/MapProducts';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import CreateProductModal from '../Component/CreateProductModal';
import ClusterSelectionForm from '../Component/ClusterSelectionForm';
import ProductSearch from '../Component/ProductSearch';

export default function Product ({products, clusters, groups}) {

    const [showModal, setShowModal] = useState({'product': false, 'cluster': false});
    function addProduct() {
        setShowModal({
            ...showModal,
            'product': true
        });
    }
    function addCluster() {
        setShowModal({
            ...showModal,
            'cluster': true
        });
    }
    function onClose() {
        setShowModal({
            ...showModal,
            'product': false,
            'cluster': false
        });

    }

    return (
        <>

        <AuthenticatedLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 flex justify-between">
                            Products
                            <ProductSearch  />
                            <PrimaryButton onClick={addProduct}>Add a Product</PrimaryButton>
                        </h2>

                    }
                >
                    <Head title="Products" />

                    <div className="py-12">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                <MapProducts groups = {groups} collection={ products.data } postUrl= "admin-product" clusters={clusters}/>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                    {products.links.map((link, index) =>
                        link.url ? (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-3 py-1 rounded border text-sm ${
                            link.active
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                        ) : (
                        <span
                            key={index}
                            className="px-3 py-1 rounded border text-sm text-gray-400 bg-gray-100 cursor-not-allowed"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                        )
                    )}
                    </div>



                        </div>

                    </div>






                    <div className='py-12'>
                    <Modal show= {showModal.product}>
                            <CreateProductModal storeUrl='create_product' isOpen={showModal} onClose={onClose} />
                    </Modal>


                    </div>
                </AuthenticatedLayout>
                    <div>

                    </div>
        </>
    );
};


