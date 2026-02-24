import { Link, router } from "@inertiajs/react";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Modal from "@/Components/Modal";
import ClusterSelectionForm from "./ClusterSelectionForm";
import MapWithEdit from "./MapWithEdit";

export default function MapProducts({
    collection,
    postUrl,
    arrowTrue,
    currentCluster,
    clusters,
    groups
}) {
    const [clusterEdit, setClusterEdit] = useState("");
    const [showModal, setShowModal] = useState({
        open: false,
        current_product_id: 0,
        modelFor: ''
    });

    function handleClusterEdit(id, name) {
        setClusterEdit(id);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    function inputChanged(e, id) {
        const value = {
            id: id,
            name: e.target.value,
        };
        router.post(`/${postUrl}`, value);
        closeModal();
    }

    function handleLinking(id) {
        const value = {
            id: id,
            name: currentCluster,
        };
        router.post("/link_cluster_group", value);
        window.location.reload();
    }

    function openModal(id, forCollection) {
        setShowModal({
            ...showModal,
            open: true,
            current_product_id: id,
            modelFor: forCollection
        });
    }
    function closeModal() {
        setShowModal({
            ...showModal,
            open: false
        });
    }

    const productList = collection.map((cluster) => (
        <div
            key={cluster.id}
            className="grid grid-cols-6 bg-gray-300 p-6 mb-1 text-center"
        >
            <div>{cluster.id}</div>
            <div>
                <img
                    src={`/storage/${cluster.thumbnail}`}
                    width="50px"
                    className="inline-block m-2"
                />
            </div>

            {/* ...Start... */}

            <div className="text-left">
                {" "}
                <Link href="/admin_edit_product" data={{ product: cluster.id }}>

                    {clusterEdit != cluster.id && cluster.name}
                    {clusterEdit == cluster.id && (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="cluster-name"
                                onBlur={() => inputChanged(event, cluster.id)}
                                defaultValue={cluster.name}
                                className="rounded h-1 w-32"
                            />
                        </form>
                    )}
                    {clusterEdit != cluster.id && (
                        <MdEdit
                            onClick={() =>
                                handleClusterEdit(cluster.id, cluster.name)
                            }
                            className="inline-block text-[12px] mb-2 ml-2 text-red-700"
                        />
                    )}

                    <p className="block ">
                        {cluster.varients.map((varient) => (
                            <span
                                className="text-left text-orange-600 block ml-2"
                                key={varient.id}
                            >
                                <span>{varient.name}</span>

                                {varient.designs.map((design) => (
                                    <span
                                        className="text-green-600 block text-left ml-4"
                                        key={design.id}
                                    >
                                        <span>{design.name}</span>
                                        {design.sizes.map((size) => (
                                            <span
                                                className="text-blue-400 block ml-6"
                                                key={size.id}
                                            >
                                                {size.name}
                                            </span>
                                        ))}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </p>
                </Link>
            </div>

            {/* ...End... */}
            <div>
                {cluster.clusters.map((cluster) => (
                    <ul key={cluster.id}>
                    <li>{cluster.name}</li>
                    </ul>
                ))}
            </div>
            <div>
                {cluster.groups.map((group) => (
                    <ul key={group.id}>
                    <li>{group.name}</li>
                    </ul>
                ))}
            </div>
            <div>
                <div
                    onClick={() => openModal(cluster.id, 'forCluster')}
                    className="bg-sky-700 text-center hover:bg-sky-800 hover:cursor-pointer text-gray-200 block rounded-md m-1 px-3 py-1"
                >
                    Edit Cluster
                </div>
                <div onClick={() => openModal(cluster.id, 'forGroup')}
                className="bg-rose-800 text-center hover:bg-rose-900 hover:cursor-pointer text-gray-200 block rounded-md m-1 px-3 py-1">
                    Edit Group
                </div>
            </div>
        </div>
    ));

    return (
        <>
            <div className="grid grid-cols-6 font-bold mb-2 text-center bg-gray-300 p-6 ">
                <div>Id</div>
                <div>Image</div>
                <div>Product Name</div>
                <div>Cluster</div>
                <div>Group</div>
                <div>Action</div>
            </div>

            {productList}
            <Modal show={showModal.open} onClose={closeModal}>
            <div class="flex">
                <button onClick={closeModal} className="ml-auto  bg-red-600 text-white px-4 py-2">X</button>
            </div>
                {showModal.modelFor === 'forCluster' &&
                <ClusterSelectionForm heading='Clusters' urlTo='edit_product_clusters' clusters = {clusters} onClose={closeModal} products = {collection} currentProduct = {showModal.current_product_id}/>
                }
                {showModal.modelFor === 'forGroup' &&
                <ClusterSelectionForm heading = 'Groups' urlTo='edit_product_groups' clusters = {groups} onClose={closeModal} products = {collection} currentProduct = {showModal.current_product_id}/>
                }
            </Modal>
        </>
    );
}
