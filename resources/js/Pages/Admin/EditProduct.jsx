import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import EditProductField from "../Component/EditProductField";
import ImageUploader from "../Component/ImageUploder";
import { FaCirclePlus } from "react-icons/fa6";
import Modal from "@/Components/Modal";
import FormForAddingVarient from "../Component/FormForAddingVarient";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";

export default function EditProduct({ product }) {


    const [showInputField, setShowInputField] = useState({
        slug: null,
        field: null,
    });

    function handleShowInputField(slug, field) {
        setShowInputField({
            ...showInputField,
            slug: slug,
            field: field,
        });
    }

    const [showModal, setShowModal] = useState({ open: false, modalType: "" });

    function closeModal() {
        setShowModal(false);
    }
    function openModal(modalFor) {
        setShowModal({
            open: true,
            modalType: modalFor,
        });
    }

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Product
                    </h2>
                }
            >
                <Head title="Products" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="grid grid-cols-2 mb-10 bg-gray-300 p-3">
                                    <div className="columns-[20%]">
                                        Product Name :
                                        <MdEdit
                                            className="inline-block mb-2"
                                            onClick={() =>
                                                handleShowInputField(
                                                    product.slug,
                                                    "name"
                                                )
                                            }
                                        />
                                        {showInputField.slug == product.slug &&
                                            showInputField.field == "name" && (
                                                <EditProductField
                                                    inputType="input"
                                                    modelId={product.id}
                                                    modelName="product"
                                                    modelField="name"
                                                    fieldValue={product.name}
                                                />
                                            )}
                                    </div>
                                    <h1 className="items-end columns-[80%]">
                                        {" "}
                                        {product.name}
                                    </h1>
                                </div>
                                <div className="grid grid-cols-2 mb-10 bg-gray-300 p-3">
                                    <div className="columns-[20%]">
                                        Shippable :
                                        <MdEdit
                                            className="inline-block mb-2"
                                            onClick={() =>
                                                handleShowInputField(
                                                    product.slug,
                                                    "shippable"
                                                )
                                            }
                                        />
                                        {showInputField.slug == product.slug &&
                                            showInputField.field ==
                                                "shippable" && (
                                                <EditProductField
                                                    inputType="input"
                                                    modelId={product.id}
                                                    modelName="product"
                                                    modelField="shippable"
                                                    fieldValue={
                                                        product.shippable
                                                    }
                                                />
                                            )}
                                    </div>
                                    <h1 className="items-end columns-[80%]">
                                        {" "}
                                        {product.shippable}
                                    </h1>
                                </div>

                                <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                    <span>
                                                        Description:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    product.slug,
                                                                    "description"
                                                                )
                                                            }
                                                        />
                                                        {showInputField.slug ==
                                                            product.slug &&
                                                            showInputField.field ==
                                                                "description" && (
                                                                <EditProductField
                                                                    inputType="textarea"
                                                                    modelId={
                                                                        product.id
                                                                    }
                                                                    modelName="product"
                                                                    modelField="description"
                                                                    fieldValue={
                                                                        product.description
                                                                    }
                                                                />
                                                            )}
                                                    </span>{" "}
                                                    <span>
                                                        {product.description}
                                                    </span>
                                                </div>

                                           <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                    <span>
                                                        Feature 1:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    product.slug,
                                                                    "feature1"
                                                                )
                                                            }
                                                        />
                                                        {showInputField.slug ==
                                                            product.slug &&
                                                            showInputField.field ==
                                                                "feature1" && (
                                                                <EditProductField
                                                                    inputType="input"
                                                                    modelId={
                                                                        product.id
                                                                    }
                                                                    modelName="product"
                                                                    modelField="feature1"
                                                                    fieldValue={
                                                                        product.feature1
                                                                    }
                                                                />
                                                            )}
                                                    </span>
                                                    <span>
                                                        {product.feature1}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                    <span>
                                                        Feature 2:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    product.slug,
                                                                    "feature2"
                                                                )
                                                            }
                                                        />
                                                        {showInputField.slug ==
                                                            product.slug &&
                                                            showInputField.field ==
                                                                "feature2" && (
                                                                <EditProductField
                                                                    inputType="input"
                                                                    modelId={
                                                                        product.id
                                                                    }
                                                                    modelName="product"
                                                                    modelField="feature2"
                                                                    fieldValue={
                                                                        product.feature2
                                                                    }
                                                                />
                                                            )}
                                                    </span>
                                                    <span>
                                                        {product.feature2}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                    <span>
                                                        YouTube Link:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    product.slug,
                                                                    "youtube"
                                                                )
                                                            }
                                                        />
                                                        {showInputField.slug ==
                                                            product.slug &&
                                                            showInputField.field ==
                                                                "youtube" && (
                                                                <EditProductField
                                                                    inputType="input"
                                                                    modelId={
                                                                        product.id
                                                                    }
                                                                    modelName="product"
                                                                    modelField="youtube"
                                                                    fieldValue={
                                                                        product.youtube
                                                                    }
                                                                />
                                                            )}
                                                    </span>
                                                    <span>
                                                        {product.youtube}
                                                    </span>
                                                </div>
                                <div className="grid grid-cols-2 mb-10 bg-gray-300 p-3">
                                    <div className="columns-2 flex items-center">
                                        Thumbnail:
                                        <MdEdit
                                            className="inline-block mb-2"
                                            onClick={() =>
                                                handleShowInputField(
                                                    product.slug,
                                                    "thumbnail"
                                                )
                                            }
                                        />
                                        {showInputField.slug == product.slug &&
                                            showInputField.field ==
                                                "thumbnail" && (
                                                <ImageUploader
                                                    uploadUrl="edit_product_image"
                                                    identifier={{
                                                        model: "product",
                                                        field: "thumbnail",
                                                        id: product.id,
                                                    }}
                                                />
                                            )}
                                    </div>

                                    <img
                                        src={`/storage/${product.thumbnail}`}
                                        className="columns-6 h-12 w-12 ml-10"
                                    />
                                </div>
                                <div className="grid grid-cols-2 mb-10 bg-gray-300 p-3">
                                    <div className="columns-2 flex items-center">
                                        Small Image:
                                        <MdEdit
                                            className="inline-block mb-2"
                                            onClick={() =>
                                                handleShowInputField(
                                                    product.slug,
                                                    "small_image"
                                                )
                                            }
                                        />
                                        {showInputField.slug == product.slug &&
                                            showInputField.field ==
                                                "small_image" && (
                                                <ImageUploader
                                                    uploadUrl="edit_product_image"
                                                    identifier={{
                                                        model: "product",
                                                        field: "small_image",
                                                        id: product.id,
                                                    }}
                                                />
                                            )}
                                    </div>
                                    <img
                                        src={`/storage/${product.small_image}`}
                                        className="columns-6h-48 w-48 ml-10"
                                    />
                                </div>

                                <div className="grid grid-cols-2 mb-10 bg-gray-300 p-3">
                                    <div className=" flex items-center align-middle bg">
                                        Varients:
                                        <Link
                                            href="/admin_create_varient"
                                            data={{ product: product.id }}
                                        >
                                            <FaCirclePlus className="ml-6 text-4xl hover:cursor-pointer" />
                                        </Link>
                                    </div>
                                    <div>
                                        {product.varients.map((varient) => (
                                            <div key={varient.id} className="">
                                                <div className="grid grid-cols-3 bg-gray-800 text-gray-100 mt-10 p-3 mb-1">
                                                    <span>
                                                        Name:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    varient.slug,
                                                                    "name"
                                                                )
                                                            }
                                                        />
                                                        {showInputField.slug ==
                                                            varient.slug &&
                                                            showInputField.field ==
                                                                "name" && (
                                                                <EditProductField
                                                                    inputType="input"
                                                                    modelId={
                                                                        varient.id
                                                                    }
                                                                    modelName="varient"
                                                                    modelField="name"
                                                                    fieldValue={
                                                                        varient.name
                                                                    }
                                                                />
                                                            )}
                                                    </span>{" "}
                                                    <span>
                                                        <Link href='varient_images' data={{ id: varient.id }}>
                                                        <span className="bg-sky-600 text-white p-1 rounded">Edit Images</span>
                                                        </Link>
                                                    </span>
                                                    <span>{varient.name}</span>
                                                </div>
                                                <div className="grid grid-cols-2 bg-gray-800 text-gray-100 mt-10 p-3 mb-1">
                                                    <span>
                                                        Size Image:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    varient.slug,
                                                                    "size_image"
                                                                )
                                                            }
                                                        />

                                                            {showInputField.slug == varient.slug &&
                                                                showInputField.field ==
                                                                "size_image" && (
                                                                <ImageUploader
                                                                uploadUrl="edit_varient_small_image"
                                                                identifier={{
                                                                model: "varient",
                                                                field: "size_image",
                                                                id: varient.id,
                                                                }}
                                                            />
                                                            )}



                                                    </span>
                                                    <img
                                                    src={`/storage/${varient.size_image}`}
                                                    className="columns-6 h-48 w-48 ml-10"
                                                        />
                                                </div>




                                                <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                    <span>
                                                        Material
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    varient.slug,
                                                                    "material"
                                                                )
                                                            }
                                                        />
                                                        {showInputField.slug ==
                                                            varient.slug &&
                                                            showInputField.field ==
                                                                "material" && (
                                                                <EditProductField
                                                                    inputType="input"
                                                                    modelId={
                                                                        varient.id
                                                                    }
                                                                    modelName="varient"
                                                                    modelField="material"
                                                                    fieldValue={
                                                                        varient.material
                                                                    }
                                                                />
                                                            )}
                                                    </span>
                                                    <span>
                                                        {varient.material}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                    <span>
                                                        MRP:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    varient.slug,
                                                                    "mrp"
                                                                )
                                                            }
                                                        />
                                                        {showInputField.slug ==
                                                            varient.slug &&
                                                            showInputField.field ==
                                                                "mrp" && (
                                                                <EditProductField
                                                                    inputType="input"
                                                                    modelId={
                                                                        varient.id
                                                                    }
                                                                    modelName="varient"
                                                                    modelField="mrp"
                                                                    fieldValue={
                                                                        varient.mrp
                                                                    }
                                                                />
                                                            )}
                                                    </span>
                                                    <span>{varient.mrp}</span>
                                                </div>
                                                <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                    <span>
                                                        Price:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    varient.slug,
                                                                    "price"
                                                                )
                                                            }
                                                        />
                                                        {showInputField.slug ==
                                                            varient.slug &&
                                                            showInputField.field ==
                                                                "price" && (
                                                                <EditProductField
                                                                    inputType="input"
                                                                    modelId={
                                                                        varient.id
                                                                    }
                                                                    modelName="varient"
                                                                    modelField="price"
                                                                    fieldValue={
                                                                        varient.price
                                                                    }
                                                                />
                                                            )}
                                                    </span>
                                                    <span>{varient.price}</span>
                                                </div>
                                                <p className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                    <span>
                                                        Shipping Fees:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    varient.slug,
                                                                    "shipping_fee"
                                                                )
                                                            }
                                                        />
                                                        {showInputField.slug ==
                                                            varient.slug &&
                                                            showInputField.field ==
                                                                "shipping_fee" && (
                                                                <EditProductField
                                                                    inputType="input"
                                                                    modelId={
                                                                        varient.id
                                                                    }
                                                                    modelName="varient"
                                                                    modelField="shipping_fee"
                                                                    fieldValue={
                                                                        varient.shipping_fee
                                                                    }
                                                                />
                                                            )}
                                                    </span>
                                                    <span>
                                                        {varient.shipping_fee}
                                                    </span>
                                                </p>

<div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
    <span>
        Description:
        <MdEdit
            className="inline-block mb-2"
            onClick={() =>
                handleShowInputField(varient.slug, "description")
            }
        />
        {showInputField.slug === varient.slug &&
            showInputField.field === "description" && (
                <EditProductField
                    inputType="textarea"
                    modelId={varient.id}
                    modelName="varient"
                    modelField="description"
                    fieldValue={varient.description}
                />
            )}
    </span>
    <span>{varient.description}</span>
</div>
<div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
    <span>
        Feature 1:
        <MdEdit
            className="inline-block mb-2"
            onClick={() =>
                handleShowInputField(varient.slug, "feature1")
            }
        />
        {showInputField.slug === varient.slug &&
            showInputField.field === "feature1" && (
                <EditProductField
                    inputType="input"
                    modelId={varient.id}
                    modelName="varient"
                    modelField="feature1"
                    fieldValue={varient.feature1}
                />
            )}
    </span>
    <span>{varient.feature1}</span>
</div>
<div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
    <span>
        Feature 2:
        <MdEdit
            className="inline-block mb-2"
            onClick={() =>
                handleShowInputField(varient.slug, "feature2")
            }
        />
        {showInputField.slug === varient.slug &&
            showInputField.field === "feature2" && (
                <EditProductField
                    inputType="input"
                    modelId={varient.id}
                    modelName="varient"
                    modelField="feature2"
                    fieldValue={varient.feature2}
                />
            )}
    </span>
    <span>{varient.feature2}</span>
</div>
<div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
    <span>
        Feature 3:
        <MdEdit
            className="inline-block mb-2"
            onClick={() =>
                handleShowInputField(varient.slug, "feature3")
            }
        />
        {showInputField.slug === varient.slug &&
            showInputField.field === "feature3" && (
                <EditProductField
                    inputType="input"
                    modelId={varient.id}
                    modelName="varient"
                    modelField="feature3"
                    fieldValue={varient.feature3}
                />
            )}
    </span>
    <span>{varient.feature3}</span>
</div>





                                                <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                    <span>
                                                        Product Size:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    varient.slug,
                                                                    "size"
                                                                )
                                                            }
                                                        />
                                                        {showInputField.slug ==
                                                            varient.slug &&
                                                            showInputField.field ==
                                                                "size" && (
                                                                <EditProductField
                                                                    inputType="input"
                                                                    modelId={
                                                                        varient.id
                                                                    }
                                                                    modelName="varient"
                                                                    modelField="size"
                                                                    fieldValue={
                                                                        varient.size
                                                                    }
                                                                />
                                                            )}
                                                    </span>
                                                    <span>{varient.size}</span>
                                                </div>
                                                <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                    <span>
                                                        Quantity:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    varient.slug,
                                                                    "qty"
                                                                )
                                                            }
                                                        />
                                                        {showInputField.slug ==
                                                            varient.slug &&
                                                            showInputField.field ==
                                                                "qty" && (
                                                                <EditProductField
                                                                    inputType="input"
                                                                    modelId={
                                                                        varient.id
                                                                    }
                                                                    modelName="varient"
                                                                    modelField="qty"
                                                                    fieldValue={
                                                                        varient.qty
                                                                    }
                                                                />
                                                            )}
                                                    </span>
                                                    <span>{varient.qty}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mb-10 bg-gray-300 p-3">
                                    <div className="columns-2 flex items-center">
                                        Designs

                                        <Link
                                            href="/admin_create_design"
                                            data={{ product: product.id }}
                                        >
                                            <FaCirclePlus className="ml-6 text-4xl hover:cursor-pointer" />
                                        </Link>
                                    </div>
                                    <div>
                                        {product.varients.map((varient) => (
                                            <span key={varient.id}>
                                                {varient.designs.map(
                                                    (design) => (
                                                        <span key={design.id}>
                                                            <div className="grid grid-cols-2 bg-gray-800 text-gray-100 mt-10 p-3 mb-1">
                                                                <span>
                                                                    Name:
                                                                    <MdEdit
                                                                        className="inline-block mb-2"
                                                                        onClick={() =>
                                                                            handleShowInputField(
                                                                                design.slug,
                                                                                "name"
                                                                            )
                                                                        }
                                                                    />
                                                                    {showInputField.slug ==
                                                                        design.slug &&
                                                                        showInputField.field ==
                                                                            "name" && (
                                                                            <EditProductField
                                                                                inputType="input"
                                                                                modelId={
                                                                                    design.id
                                                                                }
                                                                                modelName="design"
                                                                                modelField="name"
                                                                                fieldValue={
                                                                                    design.name
                                                                                }
                                                                            />
                                                                        )}
                                                                </span>{" "}
                                                                <span>
                                                                    {
                                                                        design.name
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 bg-gray-800 text-gray-100 mt-10 p-3 mb-1">
                                                    <span>
                                                        Size Image:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    design.slug,
                                                                    "size_image"
                                                                )
                                                            }
                                                        />

                                                            {showInputField.slug == design.slug &&
                                                                showInputField.field ==
                                                                "size_image" && (
                                                                <ImageUploader
                                                                uploadUrl="edit_varient_small_image"
                                                                identifier={{
                                                                model: "design",
                                                                field: "size_image",
                                                                id: design.id,
                                                                }}
                                                            />
                                                            )}



                                                    </span>
                                                    <img
                                                    src={`/storage/${design.size_image}`}
                                                    className="columns-6 h-48 w-48 ml-10"
                                                        />
                                                </div>


                                                            <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                <span>
                                                                    Description:
                                                                    <MdEdit
                                                                        className="inline-block mb-2"
                                                                        onClick={() =>
                                                                            handleShowInputField(
                                                                                design.slug,
                                                                                "description"
                                                                            )
                                                                        }
                                                                    />
                                                                    {showInputField.slug ==
                                                                        design.slug &&
                                                                        showInputField.field ==
                                                                            "description" && (
                                                                            <EditProductField
                                                                                inputType="textarea"
                                                                                modelId={
                                                                                    design.id
                                                                                }
                                                                                modelName="design"
                                                                                modelField="description"
                                                                                fieldValue={
                                                                                    design.description
                                                                                }
                                                                            />
                                                                        )}
                                                                </span>{" "}
                                                                <span>
                                                                    {
                                                                        design.description
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                <span>
                                                                    Feature 1:
                                                                    <MdEdit
                                                                        className="inline-block mb-2"
                                                                        onClick={() =>
                                                                            handleShowInputField(
                                                                                design.slug,
                                                                                "feature1"
                                                                            )
                                                                        }
                                                                    />
                                                                    {showInputField.slug ==
                                                                        design.slug &&
                                                                        showInputField.field ==
                                                                            "feature1" && (
                                                                            <EditProductField
                                                                                inputType="input"
                                                                                modelId={
                                                                                    design.id
                                                                                }
                                                                                modelName="design"
                                                                                modelField="feature1"
                                                                                fieldValue={
                                                                                    design.feature1
                                                                                }
                                                                            />
                                                                        )}
                                                                </span>
                                                                <span>
                                                                    {
                                                                        design.feature1
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                <span>
                                                                    Feature 2:
                                                                    <MdEdit
                                                                        className="inline-block mb-2"
                                                                        onClick={() =>
                                                                            handleShowInputField(
                                                                                design.slug,
                                                                                "feature2"
                                                                            )
                                                                        }
                                                                    />
                                                                    {showInputField.slug ==
                                                                        design.slug &&
                                                                        showInputField.field ==
                                                                            "feature2" && (
                                                                            <EditProductField
                                                                                inputType="input"
                                                                                modelId={
                                                                                    design.id
                                                                                }
                                                                                modelName="design"
                                                                                modelField="feature2"
                                                                                fieldValue={
                                                                                    design.feature2
                                                                                }
                                                                            />
                                                                        )}
                                                                </span>
                                                                <span>
                                                                    {
                                                                        design.feature2
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                <span>
                                                                    Feature 3:
                                                                    <MdEdit
                                                                        className="inline-block mb-2"
                                                                        onClick={() =>
                                                                            handleShowInputField(
                                                                                design.slug,
                                                                                "feature3"
                                                                            )
                                                                        }
                                                                    />
                                                                    {showInputField.slug ==
                                                                        design.slug &&
                                                                        showInputField.field ==
                                                                            "feature3" && (
                                                                            <EditProductField
                                                                                inputType="input"
                                                                                modelId={
                                                                                    design.id
                                                                                }
                                                                                modelName="design"
                                                                                modelField="feature3"
                                                                                fieldValue={
                                                                                    design.feature3
                                                                                }
                                                                            />
                                                                        )}
                                                                </span>
                                                                <span>
                                                                    {
                                                                        design.feature3
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                <span>
                                                                    Material
                                                                    <MdEdit
                                                                        className="inline-block mb-2"
                                                                        onClick={() =>
                                                                            handleShowInputField(
                                                                                design.slug,
                                                                                "material"
                                                                            )
                                                                        }
                                                                    />
                                                                    {showInputField.slug ==
                                                                        design.slug &&
                                                                        showInputField.field ==
                                                                            "material" && (
                                                                            <EditProductField
                                                                                inputType="input"
                                                                                modelId={
                                                                                    design.id
                                                                                }
                                                                                modelName="material"
                                                                                modelField="name"
                                                                                fieldValue={
                                                                                    design.material
                                                                                }
                                                                            />
                                                                        )}
                                                                </span>
                                                                <span>
                                                                    {
                                                                        design.material
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                <span>
                                                                    MRP:
                                                                    <MdEdit
                                                                        className="inline-block mb-2"
                                                                        onClick={() =>
                                                                            handleShowInputField(
                                                                                design.slug,
                                                                                "mrp"
                                                                            )
                                                                        }
                                                                    />
                                                                    {showInputField.slug ==
                                                                        design.slug &&
                                                                        showInputField.field ==
                                                                            "mrp" && (
                                                                            <EditProductField
                                                                                inputType="input"
                                                                                modelId={
                                                                                    design.id
                                                                                }
                                                                                modelName="design"
                                                                                modelField="mrp"
                                                                                fieldValue={
                                                                                    design.mrp
                                                                                }
                                                                            />
                                                                        )}
                                                                </span>
                                                                <span>
                                                                    {design.mrp}
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                <span>
                                                                    Price:
                                                                    <MdEdit
                                                                        className="inline-block mb-2"
                                                                        onClick={() =>
                                                                            handleShowInputField(
                                                                                design.slug,
                                                                                "price"
                                                                            )
                                                                        }
                                                                    />
                                                                    {showInputField.slug ==
                                                                        design.slug &&
                                                                        showInputField.field ==
                                                                            "price" && (
                                                                            <EditProductField
                                                                                inputType="input"
                                                                                modelId={
                                                                                    design.id
                                                                                }
                                                                                modelName="design"
                                                                                modelField="price"
                                                                                fieldValue={
                                                                                    design.price
                                                                                }
                                                                            />
                                                                        )}
                                                                </span>
                                                                <span>
                                                                    {
                                                                        design.price
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                <span>
                                                                    Shipping
                                                                    Fees:
                                                                    <MdEdit
                                                                        className="inline-block mb-2"
                                                                        onClick={() =>
                                                                            handleShowInputField(
                                                                                design.slug,
                                                                                "shipping_fee"
                                                                            )
                                                                        }
                                                                    />
                                                                    {showInputField.slug ==
                                                                        design.slug &&
                                                                        showInputField.field ==
                                                                            "shipping_fee" && (
                                                                            <EditProductField
                                                                                inputType="input"
                                                                                modelId={
                                                                                    design.id
                                                                                }
                                                                                modelName="design"
                                                                                modelField="shipping_fee"
                                                                                fieldValue={
                                                                                    design.shipping_fee
                                                                                }
                                                                            />
                                                                        )}
                                                                </span>
                                                                <span>
                                                                    {
                                                                        design.shipping_fee
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                <span>
                                                                    Product
                                                                    Size:
                                                                    <MdEdit
                                                                        className="inline-block mb-2"
                                                                        onClick={() =>
                                                                            handleShowInputField(
                                                                                design.slug,
                                                                                "size"
                                                                            )
                                                                        }
                                                                    />
                                                                    {showInputField.slug ==
                                                                        design.slug &&
                                                                        showInputField.field ==
                                                                            "size" && (
                                                                            <EditProductField
                                                                                inputType="input"
                                                                                modelId={
                                                                                    design.id
                                                                                }
                                                                                modelName="design"
                                                                                modelField="size"
                                                                                fieldValue={
                                                                                    design.size
                                                                                }
                                                                            />
                                                                        )}
                                                                </span>
                                                                <span>
                                                                    {
                                                                        design.size
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                <span>
                                                                    Quantity:
                                                                    <MdEdit
                                                                        className="inline-block mb-2"
                                                                        onClick={() =>
                                                                            handleShowInputField(
                                                                                design.slug,
                                                                                "qty"
                                                                            )
                                                                        }
                                                                    />
                                                                    {showInputField.slug ==
                                                                        design.slug &&
                                                                        showInputField.field ==
                                                                            "qty" && (
                                                                            <EditProductField
                                                                                inputType="input"
                                                                                modelId={
                                                                                    design.id
                                                                                }
                                                                                modelName="design"
                                                                                modelField="qty"
                                                                                fieldValue={
                                                                                    design.qty
                                                                                }
                                                                            />
                                                                        )}
                                                                </span>
                                                                <span>
                                                                    {design.qty}
                                                                </span>
                                                            </div>
                                                        </span>
                                                    )
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mb-10 bg-gray-300 p-3">
                                    <div>Sizes:
                                    <Link
                                            href="/admin_create_size"
                                            data={{ product: product.id }}
                                        >
                                            <FaCirclePlus className="ml-6 text-4xl hover:cursor-pointer" />
                                        </Link>

                                    </div>
                                    <div>
                                        {product.varients.map((varient) => (
                                            <span key={varient.id}>
                                                {varient.designs.map(
                                                    (design) => (
                                                        <span key={design.id}>
                                                            {design.sizes.map(
                                                                (size) => (
                                                                    <span
                                                                        key={
                                                                            size.id
                                                                        }
                                                                    >
                                                                        <p className="grid grid-cols-2 bg-gray-800 text-gray-100 mt-10 p-3 mb-1">
                                                                            <span>
                                                                                Name:
                                                                                <MdEdit
                                                                                    className="inline-block mb-2"
                                                                                    onClick={() =>
                                                                                        handleShowInputField(
                                                                                            size.slug,
                                                                                            "name"
                                                                                        )
                                                                                    }
                                                                                />
                                                                                {showInputField.slug ==
                                                                                    size.slug &&
                                                                                    showInputField.field ==
                                                                                        "name" && (
                                                                                        <EditProductField
                                                                                            inputType="input"
                                                                                            modelId={
                                                                                                size.id
                                                                                            }
                                                                                            modelName="size"
                                                                                            modelField="name"
                                                                                            fieldValue={
                                                                                                size.name
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                            </span>{" "}
                                                                            <span>
                                                                                {
                                                                                    size.name
                                                                                }
                                                                            </span>
                                                                        </p>

                                                                        <div className="grid grid-cols-2 bg-gray-800 text-gray-100 mt-10 p-3 mb-1">
                                                    <span>
                                                        Size Image:
                                                        <MdEdit
                                                            className="inline-block mb-2"
                                                            onClick={() =>
                                                                handleShowInputField(
                                                                    size.slug,
                                                                    "size_image"
                                                                )
                                                            }
                                                        />

                                                            {showInputField.slug == size.slug &&
                                                                showInputField.field ==
                                                                "size_image" && (
                                                                <ImageUploader
                                                                uploadUrl="edit_varient_small_image"
                                                                identifier={{
                                                                model: "size",
                                                                field: "size_image",
                                                                id: size.id,
                                                                }}
                                                            />
                                                            )}



                                                    </span>
                                                    <img
                                                    src={`/storage/${size.size_image}`}
                                                    className="columns-6 h-48 w-48 ml-10"
                                                        />
                                                </div>

                                                                        <p className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                            <span>
                                                                                Description:
                                                                                <MdEdit
                                                                                    className="inline-block mb-2"
                                                                                    onClick={() =>
                                                                                        handleShowInputField(
                                                                                            size.slug,
                                                                                            "description"
                                                                                        )
                                                                                    }
                                                                                />
                                                                                {showInputField.slug ==
                                                                                    size.slug &&
                                                                                    showInputField.field ==
                                                                                        "description" && (
                                                                                        <EditProductField
                                                                                            inputType="textarea"
                                                                                            modelId={
                                                                                                size.id
                                                                                            }
                                                                                            modelName="size"
                                                                                            modelField="description"
                                                                                            fieldValue={
                                                                                                size.description
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                            </span>{" "}
                                                                            <span>
                                                                                {
                                                                                    size.description
                                                                                }
                                                                            </span>
                                                                        </p>

                                                                        <p className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                            <span>
                                                                                MRP:
                                                                                <MdEdit
                                                                                    className="inline-block mb-2"
                                                                                    onClick={() =>
                                                                                        handleShowInputField(
                                                                                            size.slug,
                                                                                            "mrp"
                                                                                        )
                                                                                    }
                                                                                />
                                                                                {showInputField.slug ==
                                                                                    size.slug &&
                                                                                    showInputField.field ==
                                                                                        "mrp" && (
                                                                                        <EditProductField
                                                                                            inputType="input"
                                                                                            modelId={
                                                                                                size.id
                                                                                            }
                                                                                            modelName="size"
                                                                                            modelField="mrp"
                                                                                            fieldValue={
                                                                                                size.mrp
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    size.mrp
                                                                                }
                                                                            </span>
                                                                        </p>

                                                                        <p className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                            <span>
                                                                                Price:
                                                                                <MdEdit
                                                                                    className="inline-block mb-2"
                                                                                    onClick={() =>
                                                                                        handleShowInputField(
                                                                                            size.slug,
                                                                                            "price"
                                                                                        )
                                                                                    }
                                                                                />
                                                                                {showInputField.slug ==
                                                                                    size.slug &&
                                                                                    showInputField.field ==
                                                                                        "price" && (
                                                                                        <EditProductField
                                                                                            inputType="input"
                                                                                            modelId={
                                                                                                size.id
                                                                                            }
                                                                                            modelName="size"
                                                                                            modelField="price"
                                                                                            fieldValue={
                                                                                                size.price
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    size.price
                                                                                }
                                                                            </span>
                                                                        </p>
                                                                        <p className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                            <span>
                                                                                Shipping
                                                                                Fees:
                                                                                <MdEdit
                                                                                    className="inline-block mb-2"
                                                                                    onClick={() =>
                                                                                        handleShowInputField(
                                                                                            size.slug,
                                                                                            "shipping"
                                                                                        )
                                                                                    }
                                                                                />
                                                                                {showInputField.slug ==
                                                                                    size.slug &&
                                                                                    showInputField.field ==
                                                                                        "shipping" && (
                                                                                        <EditProductField
                                                                                            inputType="input"
                                                                                            modelId={
                                                                                                size.id
                                                                                            }
                                                                                            modelName="size"
                                                                                            modelField="shipping"
                                                                                            fieldValue={
                                                                                                size.shipping
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    size.shipping
                                                                                }
                                                                            </span>
                                                                        </p>
                                                                        <p className="grid grid-cols-2 bg-gray-200 p-3 mb-1">
                                                                            <span>
                                                                                Quantity:
                                                                                <MdEdit
                                                                                    className="inline-block mb-2"
                                                                                    onClick={() =>
                                                                                        handleShowInputField(
                                                                                            size.slug,
                                                                                            "qty"
                                                                                        )
                                                                                    }
                                                                                />
                                                                                {showInputField.slug ==
                                                                                    size.slug &&
                                                                                    showInputField.field ==
                                                                                        "qty" && (
                                                                                        <EditProductField
                                                                                            inputType="input"
                                                                                            modelId={
                                                                                                size.id
                                                                                            }
                                                                                            modelName="size"
                                                                                            modelField="qty"
                                                                                            fieldValue={
                                                                                                size.qty
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    size.qty
                                                                                }
                                                                            </span>
                                                                        </p>
                                                                    </span>
                                                                )
                                                            )}
                                                        </span>
                                                    )
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-12">
                    <Modal show={showModal.open} onClose={closeModal}>
                        {showModal.modalType == "varientModal" && (
                            <FormForAddingVarient
                                formFor="Varient"
                                urlFor="create_varient"
                            />
                        )}

                        {showModal.modalType == 'designModal' &&
                                <FormForAddingDesign formFor='Design' urlFor = 'create_group' /> }

                                                    <div className='flex justify-center'>
                                                    <button onClick={closeModal} className='bg-red-700 mb-7 w-48 text-center rounded-md text-white'>Close</button>
                                                    </div>
                    </Modal>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
