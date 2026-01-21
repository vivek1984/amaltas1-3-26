// resources/js/Pages/Checkout.jsx

import React, { useEffect, useMemo, useState } from "react";
import { useForm, Link, router } from "@inertiajs/react";
import Welcome from "../Welcome";
import { useCart } from "../Category/CartContext";

export default function Checkout({ itemData, clusters, user, userAddresses, userLocation }) {

    const { clearCart, fetchCartItemsFromBackend } = useCart();

    // ----------------------------
    // Inertia Form State
    // ----------------------------
    const { data, setData, post, processing, errors, reset } = useForm({
        name: user?.name || "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        pincode: user?.pincode || "",
        mobile: user?.mobile || "",
        latitude: userLocation?.latitude || null,
        longitude: userLocation?.longitude || null,
        cart_contents: [],
    });

    const [selectedAddressId, setSelectedAddressId] = useState("");

    // ----------------------------
    // Transform incoming cart items
    // ----------------------------
    const transformedCartItems = useMemo(() => {
        if (!itemData) return [];

        return itemData.map((item) => ({
            id: `v${item.varient_id}${
                item.design_id ? `-d${item.design_id}` : ""
            }${item.size_id ? `-s${item.size_id}` : ""}`,
            product_id: item.product_id,
            varient_id: item.varient_id,
            design_id: item.design_id,
            size_id: item.size_id,
            quantity: item.quantity,
            price: parseFloat(item.price),
            mrp: parseFloat(item.mrp),
            product: item.product,
            varient: item.varient,
            design: item.design,
            size: item.size,
        }));
    }, [itemData]);

    const totalPrice = useMemo(() => {
        return transformedCartItems.reduce(
            (t, i) => t + i.price * i.quantity,
            0
        );
    }, [transformedCartItems]);

    const discount = (mrp, price) => {
        if (!mrp || !price) return 0;
        return Math.round(((mrp - price) / mrp) * 100);
    };

    // ----------------------------
    // Autofill address on load
    // ----------------------------
    useEffect(() => {
        if (userAddresses?.length > 0 && selectedAddressId === "") {
            const first = userAddresses[0];
            setSelectedAddressId(first.id);

            setData((d) => ({
                ...d,
                address_line1: first.address_line1 || "",
                address_line2: first.address_line2 || "",
                city: first.city || "",
                state: first.state || "",
            }));
        }
    }, [userAddresses, selectedAddressId]);

    const handleAddressSelect = (e) => {
        const id = e.target.value;
        setSelectedAddressId(id);

        if (id === "new_address") {
            setData((d) => ({
                ...d,
                address_line1: "",
                address_line2: "",
                city: "",
                state: "",
            }));
            return;
        }

        const selected = userAddresses?.find((a) => a.id == id);
        if (selected) {
            setData((d) => ({
                ...d,
                address_line1: selected.address_line1,
                address_line2: selected.address_line2 || "",
                city: selected.city,
                state: selected.state,
            }));
        }
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    // ----------------------------
    //  SUBMIT FORM — FIXED VERSION
    // ----------------------------
    const handleSubmit = (e) => {
        e.preventDefault();

        if (transformedCartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const payload = transformedCartItems.map((item) => ({
            product_id: item.product_id,
            varient_id: item.varient_id,
            design_id: item.design_id,
            size_id: item.size_id,
            quantity: item.quantity,
            price: item.price,
            mrp: item.mrp,
        }));

        setData((d) => ({
            ...d,
            cart_contents: payload,
        }));

        post(route("checkout.confirm"), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Checkout → Confirmation page loaded");
            },
            onError: (errs) => {
                console.error(errs);
                alert("Please correct highlighted errors.");
            },
        });
    };

    // ----------------------------
    //  RENDER COMPONENT
    // ----------------------------
    return (
        <Welcome clusters={clusters}>
            <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">

                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Checkout
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* ---------------------- */}
                        {/* LEFT: SHIPPING FORM    */}
                        {/* ---------------------- */}
                        <section className="lg:w-2/3">

                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                Shipping Address
                            </h2>

                            <form onSubmit={handleSubmit}>

                                {/* Saved Address Dropdown */}
                                {userAddresses?.length > 0 && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Select Saved Address:
                                        </label>

                                        <select
                                            value={selectedAddressId}
                                            onChange={handleAddressSelect}
                                            className="border rounded w-full p-2"
                                        >
                                            <option value="new_address">
                                                -- Enter New Address --
                                            </option>

                                            {userAddresses.map((a) => (
                                                <option key={a.id} value={a.id}>
                                                    {a.address_line1}, {a.city},{" "}
                                                    {a.state}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Name & Mobile */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="text-sm font-bold">
                                            Full Name:
                                        </label>
                                        <input
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            className="border p-2 w-full rounded"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-xs">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold">
                                            Mobile:
                                        </label>
                                        <input
                                            name="mobile"
                                            value={data.mobile}
                                            onChange={handleChange}
                                            className="border p-2 w-full rounded"
                                        />
                                        {errors.mobile && (
                                            <p className="text-red-500 text-xs">
                                                {errors.mobile}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Address Fields */}
                                <div className="mb-6">
                                    <label className="text-sm font-bold">
                                        Address Line 1:
                                    </label>
                                    <input
                                        name="address_line1"
                                        value={data.address_line1}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                    />
                                    {errors.address_line1 && (
                                        <p className="text-red-500 text-xs">
                                            {errors.address_line1}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="text-sm font-bold">
                                        Address Line 2 (Optional):
                                    </label>
                                    <input
                                        name="address_line2"
                                        value={data.address_line2}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                    />
                                </div>

                                {/* Pincode / City / State */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div>
                                        <label className="text-sm font-bold">
                                            Pincode:
                                        </label>
                                        <input
                                            name="pincode"
                                            value={data.pincode}
                                            onChange={handleChange}
                                            className="border p-2 w-full rounded"
                                            maxLength="6"
                                        />
                                        {errors.pincode && (
                                            <p className="text-red-500 text-xs">
                                                {errors.pincode}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold">
                                            City:
                                        </label>
                                        <input
                                            name="city"
                                            value={data.city}
                                            onChange={handleChange}
                                            className="border p-2 w-full rounded"
                                        />
                                        {errors.city && (
                                            <p className="text-red-500 text-xs">
                                                {errors.city}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold">
                                            State:
                                        </label>
                                        <input
                                            name="state"
                                            value={data.state}
                                            onChange={handleChange}
                                            className="border p-2 w-full rounded"
                                        />
                                        {errors.state && (
                                            <p className="text-red-500 text-xs">
                                                {errors.state}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full bg-maroon-600 text-white py-3 rounded-lg font-bold ${
                                        processing
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-maroon-700"
                                    }`}
                                >
                                    {processing
                                        ? "Processing..."
                                        : "Proceed to Payment"}
                                </button>
                            </form>
                        </section>

                        {/* ---------------------- */}
                        {/* RIGHT: ORDER SUMMARY   */}
                        {/* ---------------------- */}
                        <section className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md border">

                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Order Summary
                            </h2>

                            {transformedCartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center border-b py-4"
                                >
                                    <img
                                        src={
                                            item.product?.small_image
                                                ? `/storage/${item.product.small_image}`
                                                : "https://placehold.co/60"
                                        }
                                        className="w-16 h-16 rounded object-cover mr-3"
                                    />

                                    <div className="flex-grow">
                                        <p className="font-semibold">
                                            {item.product?.name}
                                        </p>
                                        {item.varient && (
                                            <p className="text-xs">
                                                Variant: {item.varient.name}
                                            </p>
                                        )}
                                        {item.design && (
                                            <p className="text-xs">
                                                Design: {item.design.name}
                                            </p>
                                        )}
                                        {item.size && (
                                            <p className="text-xs">
                                                Size: {item.size.name}
                                            </p>
                                        )}
                                        <p className="text-sm">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="font-bold">
                                        ₹{(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </p>
                                </div>
                            ))}

                            <div className="pt-4 mt-4 border-t">
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>₹{totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Welcome>
    );
}
