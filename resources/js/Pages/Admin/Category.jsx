import Dropdown from "@/Components/Dropdown";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import MapWithEdit from "../Component/MapWithEdit";
import { TbCirclesRelation } from "react-icons/tb";
import { FaMinusCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import Modal from "@/Components/Modal";
import FormForAddingCluster from "../Component/FormForAddingCluster";

export default function Category({
    clusters,
    groups,
    related_groups,
    cluster_name,
}) {
    const [selectedCluster, setSelectedCluster] = useState("");

    function getClusterName(event) {
        setSelectedCluster(event.target.innerText);
    }

    const clusterDropdown = clusters.map((cluster) => (
        <Dropdown.Link
            key={cluster.id}
            onClick={getClusterName}
            href={route("admin-category")}
            data={{ id: cluster.id, name: cluster.name }}
        >
            {" "}
            {cluster.name}{" "}
        </Dropdown.Link>
    ));

    function detachGroup(id) {
        const value = {
            id: id,
            name: cluster_name,
        };
        router.post("/detach_group", value);
        window.location.reload();
    }

    const [showModal, setShowModal] = useState({ open: false, modalType: "" });

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
                    Category
                </h2>
            }
        >
            <Head title="Admin-Category" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className=" bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl text-center">Category</h1>
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <h2 className="text-2xl underline">
                                        Cluster
                                    </h2>
                                    <ul>
                                        <MapWithEdit
                                            collection={clusters}
                                            postUrl="admin-category"
                                            arrowTrue={false}
                                        />
                                        <li>
                                            <FaCirclePlus
                                                className="ml-6 mt-4 text-3xl"
                                                onClick={() =>
                                                    openModal("clusterModal")
                                                }
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="text-2xl underline">
                                        Group
                                    </h2>
                                    <ul>
                                        <MapWithEdit
                                            collection={groups}
                                            postUrl="admin-group"
                                            arrowTrue={true}
                                            currentCluster={cluster_name}
                                        />
                                        <li>
                                            <FaCirclePlus
                                                className="ml-6 mt-4 text-3xl"
                                                onClick={() =>
                                                    openModal("groupModal")
                                                }
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-2xl underline font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                >
                                                    <p> Select Cluster </p>

                                                    <svg
                                                        className="-me-0.5 ms-2 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            {clusterDropdown}
                                        </Dropdown.Content>
                                    </Dropdown>

                                    <p className="text-xl text-gray-300 bg-gray-700 rounded text-center">
                                        {cluster_name}{" "}
                                        <TbCirclesRelation className="inline-block" />
                                    </p>
                                    {cluster_name && <p></p>}
                                    {related_groups &&
                                        related_groups.map((grp) => (
                                            <p key={grp.id}>
                                                {" "}
                                                {grp.name}{" "}
                                                <FaMinusCircle
                                                    className="inline-block"
                                                    onClick={() =>
                                                        detachGroup(grp.id)
                                                    }
                                                />
                                            </p>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <Modal show={showModal.open} onClose={closeModal}>
                    {showModal.modalType == "clusterModal" && (
                        <FormForAddingCluster
                            formFor="Cluster"
                            urlFor="create_cluster"
                        />
                    )}

                    {showModal.modalType == "groupModal" && (
                        <FormForAddingCluster
                            formFor="Group"
                            urlFor="create_group"
                        />
                    )}

                    <div className="flex justify-center">
                        <button
                            onClick={closeModal}
                            className="bg-red-700 mb-7 w-48 text-center rounded-md text-white"
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
