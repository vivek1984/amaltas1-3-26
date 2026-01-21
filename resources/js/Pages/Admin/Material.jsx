import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { FaCirclePlus } from "react-icons/fa6";
import { useState } from "react";
import MapWithEditProduct from "../Component/MapWithEditProduct";
import Modal from "@/Components/Modal";
import FormForAddingMaterial from "../Component/FormForAddingMaterial";

// ⬅️ ACCEPT THE NEW PROP HERE
export default function Material({ materials, material_categories, cabinet_types }) {
    const [showModal, setShowModal] = useState({ open: false, modalType: "" });

    // The single function to close the modal
    function closeModal() {
        setShowModal({ open: false, modalType: "" });
    }

    function openModal(modalFor) {
        setShowModal({
            open: true,
            modalType: modalFor,
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Material Management
                </h2>
            }
        >
            <Head title="Admin-Material" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className=" bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl text-center font-bold mb-6">Materials List</h1>

                            <div className="grid grid-cols-1 gap-4">
                                <ul>
                                    {/* Editable Material List */}
                                    <MapWithEditProduct
                                        collection={materials}
                                        postUrl="edit_material"
                                        arrowTrue={false}
                                        allCategories={material_categories}
                                        allCabinetTypes={cabinet_types} // ⬅️ PASS TO EDITING COMPONENT
                                        editableFields={[
                                            "name",
                                            "rate",
                                            "description",
                                            "level",
                                            'mica'
                                        ]}
                                    />
                                    <li>
                                        <FaCirclePlus
                                            className="ml-6 mt-4 text-4xl text-blue-600 hover:text-blue-800 cursor-pointer transition"
                                            title="Add New Material"
                                            onClick={() =>
                                                openModal("materialModal")
                                            }
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Adding New Material */}
            <Modal show={showModal.open} onClose={closeModal}>
                {showModal.modalType === "materialModal" && (
                    <FormForAddingMaterial
                        urlFor="create_material"
                        categories={material_categories}
                        cabinetTypes={cabinet_types} // ⬅️ PASS TO ADD FORM COMPONENT
                        onClose={closeModal} // ⬅️ PASS CLOSE HANDLER
                    />
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
