import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { Link, usePage, Head, router, useForm, createInertiaApp } from "@inertiajs/react";
import React, { createContext, useState, useContext, useMemo, useRef, useEffect, forwardRef, useImperativeHandle, useCallback, Suspense } from "react";
import { MdEdit } from "react-icons/md";
import { FaArrowAltCircleRight, FaMinusCircle, FaWhatsappSquare, FaRegUser, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import { TbCirclesRelation } from "react-icons/tb";
import { FaCirclePlus, FaCheck, FaLocationPin } from "react-icons/fa6";
import _ from "lodash";
import { IoCallOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom, Keyboard } from "swiper/modules";
import AOS from "aos";
import { IoLogoWhatsapp } from "react-icons/io";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
function ApplicationLogo(props) {
  return /* @__PURE__ */ jsx("img", { src: "/storage/images/logo.png", className: "h-12" });
}
const DropDownContext = createContext();
const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };
  return /* @__PURE__ */ jsx(DropDownContext.Provider, { value: { open, setOpen, toggleOpen }, children: /* @__PURE__ */ jsx("div", { className: "relative", children }) });
};
const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { onClick: toggleOpen, children }),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40",
        onClick: () => setOpen(false)
      }
    )
  ] });
};
const Content = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-white",
  children
}) => {
  const { open, setOpen } = useContext(DropDownContext);
  let alignmentClasses = "origin-top";
  if (align === "left") {
    alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
  } else if (align === "right") {
    alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
  }
  let widthClasses = "";
  if (width === "48") {
    widthClasses = "w-48";
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Transition,
    {
      show: open,
      enter: "transition ease-out duration-200",
      enterFrom: "opacity-0 scale-95",
      enterTo: "opacity-100 scale-100",
      leave: "transition ease-in duration-75",
      leaveFrom: "opacity-100 scale-100",
      leaveTo: "opacity-0 scale-95",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`,
          onClick: () => setOpen(false),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses,
              children
            }
          )
        }
      )
    }
  ) });
};
const DropdownLink = ({ className = "", children, ...props }) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none " + className,
      children
    }
  );
};
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
function NavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " + (active ? "border-indigo-400 text-gray-900 focus:border-indigo-700" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700") + className,
      children
    }
  );
}
function ResponsiveNavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: `flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active ? "border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800" : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800"} text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`,
      children
    }
  );
}
function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsxs("nav", { className: "border-b border-gray-100 bg-white", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx("div", { className: "flex shrink-0 items-center", children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "block h-9 w-auto fill-current text-gray-800" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "hidden sm:-my-px sm:ms-10 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-2", children: [
            /* @__PURE__ */ jsx(
              NavLink,
              {
                href: route("admin-dashboard"),
                active: route().current("admin-dashboard"),
                children: "Dashboard"
              }
            ),
            /* @__PURE__ */ jsx(
              NavLink,
              {
                href: route("admin-category"),
                active: route().current("admin-category"),
                children: "Category"
              }
            ),
            /* @__PURE__ */ jsx(
              NavLink,
              {
                href: route("admin-product"),
                active: route().current("admin-product"),
                children: "Product"
              }
            ),
            /* @__PURE__ */ jsx(
              NavLink,
              {
                href: route("material"),
                active: route().current("material"),
                children: "Material"
              }
            ),
            /* @__PURE__ */ jsx(
              NavLink,
              {
                href: route("calculator"),
                active: route().current("calculator"),
                children: "Calculator"
              }
            ),
            /* @__PURE__ */ jsx(
              NavLink,
              {
                href: route("estimates"),
                active: route().current("estimates"),
                children: "Estimates"
              }
            ),
            /* @__PURE__ */ jsx(
              NavLink,
              {
                href: route("site-urls.index"),
                active: route().current("site-urls.index"),
                children: "Site URLs"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "Estimate " }) }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:ms-6 sm:flex sm:items-center", children: /* @__PURE__ */ jsx("div", { className: "relative ms-3", children: /* @__PURE__ */ jsxs(Dropdown, { children: [
          /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-md", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none",
              children: [
                user.name,
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "-me-0.5 ms-2 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        fillRule: "evenodd",
                        d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                        clipRule: "evenodd"
                      }
                    )
                  }
                )
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsxs(Dropdown.Content, { children: [
            /* @__PURE__ */ jsx(
              Dropdown.Link,
              {
                href: route("profile.edit"),
                children: "Profile"
              }
            ),
            /* @__PURE__ */ jsx(
              Dropdown.Link,
              {
                href: route("logout"),
                method: "post",
                as: "button",
                children: "Log Out"
              }
            )
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "-me-2 flex items-center sm:hidden", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowingNavigationDropdown(
              (previousState) => !previousState
            ),
            className: "inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none",
            children: /* @__PURE__ */ jsxs(
              "svg",
              {
                className: "h-6 w-6",
                stroke: "currentColor",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: !showingNavigationDropdown ? "inline-flex" : "hidden",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M4 6h16M4 12h16M4 18h16"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: showingNavigationDropdown ? "inline-flex" : "hidden",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M6 18L18 6M6 6l12 12"
                    }
                  )
                ]
              }
            )
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1 pb-3 pt-2", children: [
              /* @__PURE__ */ jsx(
                ResponsiveNavLink,
                {
                  href: route("admin-dashboard"),
                  active: route().current("admin-dashboard"),
                  children: "Dashboard"
                }
              ),
              /* @__PURE__ */ jsx(
                ResponsiveNavLink,
                {
                  href: route("admin-category"),
                  active: route().current("admin-category"),
                  children: "Category"
                }
              ),
              /* @__PURE__ */ jsx(
                ResponsiveNavLink,
                {
                  href: route("admin-product"),
                  active: route().current("admin-product"),
                  children: "Product"
                }
              ),
              /* @__PURE__ */ jsx(
                ResponsiveNavLink,
                {
                  href: route("material"),
                  active: route().current("material"),
                  children: "Material"
                }
              ),
              /* @__PURE__ */ jsx(
                ResponsiveNavLink,
                {
                  href: route("calculator"),
                  active: route().current("calculator"),
                  children: "Calculator"
                }
              ),
              /* @__PURE__ */ jsx(
                ResponsiveNavLink,
                {
                  href: route("estimates"),
                  active: route().current("estimates"),
                  children: "Estimates"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pb-1 pt-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "px-4", children: [
                /* @__PURE__ */ jsx("div", { className: "text-base font-medium text-gray-800", children: user.name }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500", children: user.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-1", children: [
                /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("profile.edit"), children: "Profile" }),
                /* @__PURE__ */ jsx(
                  ResponsiveNavLink,
                  {
                    method: "post",
                    href: route("logout"),
                    as: "button",
                    children: "Log Out"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    ] }),
    header && /* @__PURE__ */ jsx("header", { className: "bg-white shadow", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8", children: header }) }),
    /* @__PURE__ */ jsx("main", { children })
  ] });
}
function Calculator({ material = [], cabinetTypes = [] }) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    address: "",
    bodyMaterial: "",
    bodyLaminate: "",
    backMaterial: "",
    backLaminate: "",
    shutterMaterial: "",
    shutterLaminate: ""
  });
  const [lowerCabinets, setLowerCabinets] = useState([]);
  const [upperCabinets, setUpperCabinets] = useState([]);
  const [cabinetInputErrors, setCabinetInputErrors] = useState({});
  const [cabinetInput, setCabinetInput] = useState({
    lowerCabinetTypeId: "",
    lowerWidth: "",
    lowerHeight: "",
    lowerHardware: [],
    upperCabinetTypeId: "",
    upperWidth: "",
    upperHeight: "",
    upperHardware: []
  });
  const [addOns, setAddOns] = useState([]);
  const [newAddOn, setNewAddOn] = useState({
    itemName: "",
    description: "",
    amount: ""
  });
  const [isAddOnFormVisible, setIsAddOnFormVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const getMaterialById = (id) => material.find((m) => m.id == id);
  const getCabinetTypeById = (id) => cabinetTypes.find((t) => t.id == id);
  const getMaterialMicaStatus = (materialId) => {
    const mat = getMaterialById(materialId);
    return mat && mat.mica === 1;
  };
  const categorizedMaterials = useMemo(() => {
    const filterBy = (categoryName) => material.filter((m) => (m.categories || []).some((c) => c.name === categoryName));
    return {
      bodyOptions: filterBy("Cabinet Body"),
      backOptions: filterBy("Back of Cabinet"),
      shutterOptions: filterBy("Doors"),
      laminateOptions: filterBy("Laminate"),
      hardwareOptions: filterBy("Hardware")
    };
  }, [material]);
  const { hardwareOptions, bodyOptions, backOptions, shutterOptions, laminateOptions } = categorizedMaterials;
  const isBodyLaminateEnabled = getMaterialMicaStatus(formData.bodyMaterial);
  const isBackLaminateEnabled = getMaterialMicaStatus(formData.backMaterial);
  const isShutterLaminateEnabled = getMaterialMicaStatus(formData.shutterMaterial);
  const getFilteredHardware = (cabinetTypeId) => {
    if (!cabinetTypeId) return [];
    const selectedCabinetType = getCabinetTypeById(cabinetTypeId);
    if (!selectedCabinetType || !selectedCabinetType.materials) return [];
    const compatibleHardwareIds = selectedCabinetType.materials.filter((m) => (m.categories || []).some((c) => c.name === "Hardware")).map((m) => m.id);
    return hardwareOptions.filter((h) => compatibleHardwareIds.includes(h.id));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newState = { [name]: value };
    if (["bodyMaterial", "backMaterial", "shutterMaterial"].includes(name)) {
      if (!getMaterialMicaStatus(value)) {
        if (name === "bodyMaterial") newState.bodyLaminate = "";
        if (name === "backMaterial") newState.backLaminate = "";
        if (name === "shutterMaterial") newState.shutterLaminate = "";
      }
    }
    setFormData((s) => ({ ...s, ...newState }));
  };
  const handleCabinetInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "lowerCabinetTypeId") {
      setCabinetInput((s) => ({ ...s, lowerCabinetTypeId: value, lowerHardware: [] }));
    } else if (name === "upperCabinetTypeId") {
      setCabinetInput((s) => ({ ...s, upperCabinetTypeId: value, upperHardware: [] }));
    } else {
      setCabinetInput((s) => ({ ...s, [name]: value }));
    }
  };
  const toggleCabinetHardware = (section, hardwareId, checked) => {
    const key = section === "lower" ? "lowerHardware" : "upperHardware";
    const current = cabinetInput[key];
    if (checked) {
      setCabinetInput((s) => ({
        ...s,
        [key]: [...current, { id: hardwareId, qty: 1 }]
      }));
    } else {
      setCabinetInput((s) => ({
        ...s,
        [key]: current.filter((h) => h.id !== hardwareId)
      }));
    }
  };
  const updateCabinetHardwareQty = (section, hardwareId, qty) => {
    const key = section === "lower" ? "lowerHardware" : "upperHardware";
    setCabinetInput((s) => ({
      ...s,
      [key]: s[key].map(
        (h) => h.id === hardwareId ? { ...h, qty: Number(qty) } : h
      )
    }));
  };
  const validateCabinetInput = (type) => {
    let isValid = true;
    let errors = {};
    const typeIdKey = `${type}CabinetTypeId`;
    const widthKey = `${type}Width`;
    const heightKey = `${type}Height`;
    if (!cabinetInput[typeIdKey]) {
      errors[typeIdKey] = "Cabinet Type is required.";
      isValid = false;
    }
    if (!cabinetInput[widthKey] || Number(cabinetInput[widthKey]) <= 0) {
      errors[widthKey] = "Width must be > 0.";
      isValid = false;
    }
    if (!cabinetInput[heightKey] || Number(cabinetInput[heightKey]) <= 0) {
      errors[heightKey] = "Height must be > 0.";
      isValid = false;
    }
    setCabinetInputErrors((prev) => ({ ...prev, ...errors }));
    return isValid;
  };
  const addLowerCabinet = () => {
    setCabinetInputErrors({});
    if (!validateCabinetInput("lower")) return;
    const { lowerCabinetTypeId, lowerWidth, lowerHeight, lowerHardware } = cabinetInput;
    setLowerCabinets((prev) => [
      ...prev,
      { cabinet_type_id: lowerCabinetTypeId, width: lowerWidth, height: lowerHeight, hardware: lowerHardware }
    ]);
    setCabinetInput((s) => ({
      ...s,
      lowerCabinetTypeId: "",
      lowerWidth: "",
      lowerHeight: "",
      lowerHardware: []
    }));
  };
  const addUpperCabinet = () => {
    setCabinetInputErrors({});
    if (!validateCabinetInput("upper")) return;
    const { upperCabinetTypeId, upperWidth, upperHeight, upperHardware } = cabinetInput;
    setUpperCabinets((prev) => [
      ...prev,
      { cabinet_type_id: upperCabinetTypeId, width: upperWidth, height: upperHeight, hardware: upperHardware }
    ]);
    setCabinetInput((s) => ({
      ...s,
      upperCabinetTypeId: "",
      upperWidth: "",
      upperHeight: "",
      upperHardware: []
    }));
  };
  const removeCabinet = (section, index) => {
    if (section === "lower") {
      setLowerCabinets((prev) => prev.filter((_2, i) => i !== index));
    } else {
      setUpperCabinets((prev) => prev.filter((_2, i) => i !== index));
    }
  };
  const handleAddOnInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddOn((s) => ({ ...s, [name]: value }));
  };
  const addAddOn = () => {
    const amount = Number(newAddOn.amount);
    if (!newAddOn.itemName || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid Item Name and a positive Amount.");
      return;
    }
    setAddOns((prev) => [
      ...prev,
      {
        id: Date.now(),
        itemName: newAddOn.itemName,
        description: newAddOn.description,
        amount
      }
    ]);
    setNewAddOn({ itemName: "", description: "", amount: "" });
    setIsAddOnFormVisible(false);
  };
  const removeAddOn = (id) => {
    setAddOns((prev) => prev.filter((a) => a.id !== id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      lowerCabinets,
      upperCabinets,
      addOns
      // Include the new addOns state
    };
    router.post("/calculator", payload);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3e3);
  };
  const SelectField = ({ name, label, value, options, onChange, disabled = false }) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: `block mb-1 font-semibold text-sm ${disabled ? "text-gray-400" : "text-gray-700"}`, children: label }),
    /* @__PURE__ */ jsxs(
      "select",
      {
        name,
        value,
        onChange,
        disabled,
        className: `border rounded-lg w-full px-4 py-2 text-gray-800 shadow-sm transition duration-150 ${disabled ? "bg-gray-200 border-gray-300 cursor-not-allowed text-gray-500" : "bg-white border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"}`,
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: disabled ? "N/A (Pre-finished)" : "Select" }),
          options.map((m) => /* @__PURE__ */ jsx("option", { value: m.id, children: m.name }, m.id))
        ]
      }
    )
  ] });
  return /* @__PURE__ */ jsx(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Kitchen Estimate Calculator" }), children: /* @__PURE__ */ jsx("main", { className: "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 max-w-6xl mx-auto bg-white shadow-xl rounded-xl space-y-10", children: [
    isSubmitted && /* @__PURE__ */ jsxs("div", { className: "fixed top-4 right-4 z-50 p-4 bg-green-500 text-white rounded-lg shadow-2xl flex items-center transform transition-opacity duration-300", children: [
      /* @__PURE__ */ jsx("span", { className: "mr-2 text-xl", children: "✔️" }),
      "Configuration Submitted!"
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-10", children: [
      /* @__PURE__ */ jsxs("section", { className: "border-b pb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-extrabold mb-5 text-indigo-600 border-b-2 border-indigo-100 inline-block pb-1", children: "Client Details" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Client Name", name: "clientName", value: formData.clientName, onChange: handleChange, className: "border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150", required: true }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Phone", name: "clientPhone", value: formData.clientPhone, onChange: handleChange, className: "border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150", required: true }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Address", name: "address", value: formData.address, onChange: handleChange, className: "border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "border-b pb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-extrabold mb-5 text-teal-600 border-b-2 border-teal-100 inline-block pb-1", children: "Material Selection" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsx(SelectField, { label: "Body Material", name: "bodyMaterial", value: formData.bodyMaterial, options: bodyOptions, onChange: handleChange }),
          /* @__PURE__ */ jsx(SelectField, { label: "Body Laminate", name: "bodyLaminate", value: formData.bodyLaminate, options: laminateOptions, onChange: handleChange, disabled: !isBodyLaminateEnabled }),
          /* @__PURE__ */ jsx("div", { className: "col-span-1" }),
          /* @__PURE__ */ jsx(SelectField, { label: "Back Material", name: "backMaterial", value: formData.backMaterial, options: backOptions, onChange: handleChange }),
          /* @__PURE__ */ jsx(SelectField, { label: "Back Laminate", name: "backLaminate", value: formData.backLaminate, options: laminateOptions, onChange: handleChange, disabled: !isBackLaminateEnabled }),
          /* @__PURE__ */ jsx("div", { className: "col-span-1" }),
          /* @__PURE__ */ jsx(SelectField, { label: "Shutter Material", name: "shutterMaterial", value: formData.shutterMaterial, options: shutterOptions, onChange: handleChange }),
          /* @__PURE__ */ jsx(SelectField, { label: "Shutter Laminate", name: "shutterLaminate", value: formData.shutterLaminate, options: laminateOptions, onChange: handleChange, disabled: !isShutterLaminateEnabled })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "border-b pb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-extrabold mb-6 text-purple-600 border-b-2 border-purple-100 inline-block pb-1", children: "Cabinet Units" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 p-4 border border-gray-200 rounded-xl shadow-lg bg-gray-50", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-bold text-lg mb-4 text-purple-800 flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "mr-2", children: "📦" }),
              " Lower/Base Units"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-6", children: [
              lowerCabinets.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 italic p-3 border-dashed border-gray-300 border rounded-lg text-center", children: "No lower cabinets added yet." }),
              lowerCabinets.map((cab, idx) => {
                const cabinetType = getCabinetTypeById(cab.cabinet_type_id);
                return /* @__PURE__ */ jsx("div", { className: "border border-purple-200 p-4 rounded-lg bg-white transition hover:shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-base text-gray-800", children: cabinetType ? cabinetType.name : `Cabinet ID: ${cab.cabinet_type_id}` }),
                    " ",
                    /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500 block", children: [
                      "Size: ",
                      cab.width,
                      " W × ",
                      cab.height,
                      " H (mm)"
                    ] }),
                    cab.hardware.length > 0 && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-700 mt-2 p-1 bg-purple-50 rounded", children: [
                      "**Hardware:**",
                      " ",
                      cab.hardware.map((h) => {
                        const hw = hardwareOptions.find((opt) => opt.id == h.id);
                        return hw ? `${hw.name} (x${h.qty})` : "";
                      }).join(", ")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeCabinet("lower", idx), className: "text-red-500 hover:text-red-700 p-1 rounded-full transition font-semibold", title: "Remove Cabinet", children: "X" })
                ] }) }, idx);
              })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-4 border border-dashed border-purple-400 rounded-lg bg-purple-50", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-end", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    name: "lowerCabinetTypeId",
                    value: cabinetInput.lowerCabinetTypeId,
                    onChange: handleCabinetInputChange,
                    className: `flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500 ${cabinetInputErrors.lowerCabinetTypeId ? "border-red-500" : "border-gray-300"}`,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Select Cabinet Type" }),
                      cabinetTypes.filter((t) => t.type !== "upper").map((type) => /* @__PURE__ */ jsx("option", { value: type.id, children: type.name }, type.id))
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    placeholder: "W (mm)",
                    name: "lowerWidth",
                    value: cabinetInput.lowerWidth,
                    onChange: handleCabinetInputChange,
                    className: `w-20 border rounded-lg px-2 py-2 text-sm text-center focus:ring-purple-500 ${cabinetInputErrors.lowerWidth ? "border-red-500" : "border-gray-300"}`,
                    min: "1"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    placeholder: "H (mm)",
                    name: "lowerHeight",
                    value: cabinetInput.lowerHeight,
                    onChange: handleCabinetInputChange,
                    className: `w-20 border rounded-lg px-2 py-2 text-sm text-center focus:ring-purple-500 ${cabinetInputErrors.lowerHeight ? "border-red-500" : "border-gray-300"}`,
                    min: "1"
                  }
                ),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: addLowerCabinet, className: "bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition shadow-md", title: "Add Cabinet", children: "+" })
              ] }),
              (cabinetInputErrors.lowerCabinetTypeId || cabinetInputErrors.lowerWidth || cabinetInputErrors.lowerHeight) && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: "Please fill out all required fields with valid values." }),
              cabinetInput.lowerCabinetTypeId && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 border-t pt-3 mt-3 border-purple-200", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-purple-700", children: "Compatible Hardware:" }),
                getFilteredHardware(cabinetInput.lowerCabinetTypeId).map((h) => {
                  const selected = cabinetInput.lowerHardware.find((hw) => hw.id == h.id);
                  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("input", { id: `lower-hw-${h.id}`, type: "checkbox", checked: !!selected, onChange: (e) => toggleCabinetHardware("lower", h.id, e.target.checked), className: "rounded text-purple-600 focus:ring-purple-500 border-gray-300" }),
                    /* @__PURE__ */ jsx("label", { htmlFor: `lower-hw-${h.id}`, className: "text-sm flex-1 cursor-pointer", children: h.name }),
                    selected && /* @__PURE__ */ jsx("input", { type: "number", min: "1", value: selected.qty, onChange: (e) => updateCabinetHardwareQty("lower", h.id, e.target.value), className: "w-16 border rounded-lg px-2 py-1 text-xs text-center focus:ring-purple-500" })
                  ] }, h.id);
                }),
                getFilteredHardware(cabinetInput.lowerCabinetTypeId).length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 italic", children: "No specific hardware defined for this cabinet type." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 p-4 border border-gray-200 rounded-xl shadow-lg bg-gray-50", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-bold text-lg mb-4 text-purple-800 flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "mr-2", children: "📦" }),
              " Upper/Wall Units"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-6", children: [
              upperCabinets.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 italic p-3 border-dashed border-gray-300 border rounded-lg text-center", children: "No upper cabinets added yet." }),
              upperCabinets.map((cab, idx) => {
                const cabinetType = getCabinetTypeById(cab.cabinet_type_id);
                return /* @__PURE__ */ jsx("div", { className: "border border-purple-200 p-4 rounded-lg bg-white transition hover:shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-base text-gray-800", children: cabinetType ? cabinetType.name : `Cabinet ID: ${cab.cabinet_type_id}` }),
                    " ",
                    /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500 block", children: [
                      "Size: ",
                      cab.width,
                      " W × ",
                      cab.height,
                      " H (mm)"
                    ] }),
                    cab.hardware.length > 0 && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-700 mt-2 p-1 bg-purple-50 rounded", children: [
                      "**Hardware:**",
                      " ",
                      cab.hardware.map((h) => {
                        const hw = hardwareOptions.find((opt) => opt.id == h.id);
                        return hw ? `${hw.name} (x${h.qty})` : "";
                      }).join(", ")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeCabinet("upper", idx), className: "text-red-500 hover:text-red-700 p-1 rounded-full transition font-semibold", title: "Remove Cabinet", children: "X" })
                ] }) }, idx);
              })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-4 border border-dashed border-purple-400 rounded-lg bg-purple-50", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-end", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    name: "upperCabinetTypeId",
                    value: cabinetInput.upperCabinetTypeId,
                    onChange: handleCabinetInputChange,
                    className: `flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500 ${cabinetInputErrors.upperCabinetTypeId ? "border-red-500" : "border-gray-300"}`,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Select Cabinet Type" }),
                      cabinetTypes.filter((t) => t.type !== "lower").map((type) => /* @__PURE__ */ jsx("option", { value: type.id, children: type.name }, type.id))
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    placeholder: "W (mm)",
                    name: "upperWidth",
                    value: cabinetInput.upperWidth,
                    onChange: handleCabinetInputChange,
                    className: `w-20 border rounded-lg px-2 py-2 text-sm text-center focus:ring-purple-500 ${cabinetInputErrors.upperWidth ? "border-red-500" : "border-gray-300"}`,
                    min: "1"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    placeholder: "H (mm)",
                    name: "upperHeight",
                    value: cabinetInput.upperHeight,
                    onChange: handleCabinetInputChange,
                    className: `w-20 border rounded-lg px-2 py-2 text-sm text-center focus:ring-purple-500 ${cabinetInputErrors.upperHeight ? "border-red-500" : "border-gray-300"}`,
                    min: "1"
                  }
                ),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: addUpperCabinet, className: "bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition shadow-md", title: "Add Cabinet", children: "+" })
              ] }),
              (cabinetInputErrors.upperCabinetTypeId || cabinetInputErrors.upperWidth || cabinetInputErrors.upperHeight) && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: "Please fill out all required fields with valid values." }),
              cabinetInput.upperCabinetTypeId && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 border-t pt-3 mt-3 border-purple-200", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-purple-700", children: "Compatible Hardware:" }),
                getFilteredHardware(cabinetInput.upperCabinetTypeId).map((h) => {
                  const selected = cabinetInput.upperHardware.find((hw) => hw.id == h.id);
                  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("input", { id: `upper-hw-${h.id}`, type: "checkbox", checked: !!selected, onChange: (e) => toggleCabinetHardware("upper", h.id, e.target.checked), className: "rounded text-purple-600 focus:ring-purple-500 border-gray-300" }),
                    /* @__PURE__ */ jsx("label", { htmlFor: `upper-hw-${h.id}`, className: "text-sm flex-1 cursor-pointer", children: h.name }),
                    selected && /* @__PURE__ */ jsx("input", { type: "number", min: "1", value: selected.qty, onChange: (e) => updateCabinetHardwareQty("upper", h.id, e.target.value), className: "w-16 border rounded-lg px-2 py-1 text-xs text-center focus:ring-purple-500" })
                  ] }, h.id);
                }),
                getFilteredHardware(cabinetInput.upperCabinetTypeId).length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 italic", children: "No specific hardware defined for this cabinet type." })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "border-b pb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-extrabold text-orange-600 border-b-2 border-orange-100 inline-block pb-1", children: "Add On's" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsAddOnFormVisible(true),
              className: "p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition shadow-md flex items-center",
              title: "Add New Add-On Item",
              children: /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "+" })
            }
          )
        ] }),
        isAddOnFormVisible && /* @__PURE__ */ jsxs("div", { className: "p-4 border border-dashed border-orange-400 rounded-lg bg-orange-50 mb-6 space-y-3", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-md text-orange-800", children: "New Add-On Item" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Item Name (e.g., Handles, Countertop)",
                name: "itemName",
                value: newAddOn.itemName,
                onChange: handleAddOnInputChange,
                className: "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-orange-500",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Description (Optional)",
                name: "description",
                value: newAddOn.description,
                onChange: handleAddOnInputChange,
                className: "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-orange-500"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                placeholder: "Amount (e.g., 5000)",
                name: "amount",
                value: newAddOn.amount,
                onChange: handleAddOnInputChange,
                className: "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-orange-500",
                min: "0.01",
                step: "any",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setNewAddOn({ itemName: "", description: "", amount: "" });
                  setIsAddOnFormVisible(false);
                },
                className: "px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: addAddOn,
                className: "px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition",
                children: "Save Add-On"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          addOns.length === 0 && !isAddOnFormVisible && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 italic p-3 border-dashed border-gray-300 border rounded-lg text-center", children: "Click '+' to add items like handles, lighting, or specific appliances." }),
          addOns.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 rounded-lg bg-white border border-orange-200 shadow-sm transition hover:shadow-md", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-gray-800", children: item.itemName }),
              item.description && /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500 ml-3 italic", children: [
                "(",
                item.description,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-orange-700", children: [
                "₹",
                item.amount.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeAddOn(item.id),
                  className: "text-red-500 hover:text-red-700 font-semibold text-sm",
                  title: "Remove Add-On",
                  children: "Remove"
                }
              )
            ] })
          ] }, item.id))
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-gray-200", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          className: "w-full px-4 py-3 flex items-center justify-center bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition shadow-xl transform hover:scale-[1.005]",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl mr-2", children: "✅" }),
            "Submit Project Configuration"
          ]
        }
      ) })
    ] })
  ] }) }) });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Calculator
}, Symbol.toStringTag, { value: "Module" }));
function MapWithEdit({ collection, postUrl, arrowTrue, currentCluster }) {
  const [clusterEdit, setClusterEdit] = useState("");
  function handleClusterEdit(id, name) {
    setClusterEdit(id);
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  function inputChanged(e, id) {
    const value = {
      id,
      name: e.target.value
    };
    router.post(`/${postUrl}`, value);
    window.location.reload();
  }
  function handleLinking(id) {
    const value = {
      id,
      name: currentCluster
    };
    router.post("/link_cluster_group", value);
    window.location.reload();
  }
  const clusterList = collection.map((cluster) => /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsx("img", { src: `storage/${cluster.image}`, width: "50px", className: "inline-block m-2" }),
    clusterEdit != cluster.id && cluster.name,
    clusterEdit == cluster.id && /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsx("input", { type: "text", name: "cluster-name", onBlur: () => inputChanged(event, cluster.id), defaultValue: cluster.name, className: "rounded h-1 w-32" }) }),
    clusterEdit != cluster.id && /* @__PURE__ */ jsx(MdEdit, { onClick: () => handleClusterEdit(cluster.id, cluster.name), className: "inline-block text-[12px] mb-2 ml-2 text-red-700" }),
    arrowTrue && /* @__PURE__ */ jsx(FaArrowAltCircleRight, { className: "ml-2 text-xs2 inline-block", onClick: () => handleLinking(cluster.id) })
  ] }, cluster.id));
  return /* @__PURE__ */ jsx(Fragment, { children: clusterList });
}
const __vite_glob_0_45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MapWithEdit
}, Symbol.toStringTag, { value: "Module" }));
function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {
  }
}) {
  const close = () => {
    if (closeable) onClose();
  };
  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { appear: true, show, as: Transition, children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      className: "relative z-50",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "flex min-h-full items-center justify-center p-4", children: /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 scale-95",
            enterTo: "opacity-100 scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 scale-100",
            leaveTo: "opacity-0 scale-95",
            children: /* @__PURE__ */ jsx(
              DialogPanel,
              {
                className: `w-full ${maxWidthClass} transform rounded-lg bg-white shadow-xl transition-all`,
                children: /* @__PURE__ */ jsx("div", { className: "max-h-[80vh] overflow-y-auto p-6", children })
              }
            )
          }
        ) }) })
      ]
    }
  ) });
}
function FormForAddingCluster({ formFor, urlFor }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
    image: null
    // Stores the File object
  });
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("image", file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setData("image", null);
      setImagePreview(null);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/${urlFor}`, {
      // Adjust this URL to your actual backend route for storing items
      onSuccess: () => {
        console.log("Upload successful!");
        reset();
        setImagePreview(null);
      },
      onError: (formErrors) => {
        console.error("Validation errors:", formErrors);
      },
      onFinish: () => {
        console.log("Form submission finished (success or error).");
      }
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "bg-white p-8 rounded-lg shadow-md w-full max-w-md",
      children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-gray-800 mb-6 text-center", children: [
          "Add a ",
          formFor,
          " Item"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "name",
              className: "block text-gray-700 text-sm font-bold mb-2",
              children: "Name:"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "name",
              name: "name",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.name ? "border-red-500" : ""}`,
              placeholder: ` Enter ${formFor} name `,
              required: true
            }
          ),
          errors.name && // Display error message
          /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "description",
              className: "block text-gray-700 text-sm font-bold mb-2",
              children: "Description:"
            }
          ),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "description",
              name: "description",
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              rows: "4",
              className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y ${errors.description ? "border-red-500" : ""}`,
              placeholder: ` Describe ${formFor}  `,
              required: true
            }
          ),
          errors.description && // Display error message
          /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "image",
              className: "block text-gray-700 text-sm font-bold mb-2",
              children: "Image:"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              id: "image",
              name: "image",
              accept: "image/*",
              onChange: handleImageChange,
              className: `block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.image ? "border-red-500" : ""}`
            }
          ),
          imagePreview && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-2", children: "Image Preview:" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imagePreview,
                alt: "Image Preview",
                className: "max-w-xs max-h-48 object-contain rounded-md shadow-sm"
              }
            )
          ] }),
          errors.image && // Display error message
          /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.image })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: `w-full bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out ${processing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`,
            children: [
              processing ? "Uploading..." : "Upload Item",
              " "
            ]
          }
        )
      ]
    }
  ) });
}
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FormForAddingCluster
}, Symbol.toStringTag, { value: "Module" }));
function Category({
  clusters,
  groups,
  related_groups,
  cluster_name
}) {
  const [selectedCluster, setSelectedCluster] = useState("");
  function getClusterName(event2) {
    setSelectedCluster(event2.target.innerText);
  }
  const clusterDropdown = clusters.map((cluster) => /* @__PURE__ */ jsxs(
    Dropdown.Link,
    {
      onClick: getClusterName,
      href: route("admin-category"),
      data: { id: cluster.id, name: cluster.name },
      children: [
        " ",
        cluster.name,
        " "
      ]
    },
    cluster.id
  ));
  function detachGroup(id) {
    const value = {
      id,
      name: cluster_name
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
      modalType: modalFor
    });
  }
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Category" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Admin-Category" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: " bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl text-center", children: "Category" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl underline", children: "Cluster" }),
              /* @__PURE__ */ jsxs("ul", { children: [
                /* @__PURE__ */ jsx(
                  MapWithEdit,
                  {
                    collection: clusters,
                    postUrl: "admin-category",
                    arrowTrue: false
                  }
                ),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                  FaCirclePlus,
                  {
                    className: "ml-6 mt-4 text-3xl",
                    onClick: () => openModal("clusterModal")
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl underline", children: "Group" }),
              /* @__PURE__ */ jsxs("ul", { children: [
                /* @__PURE__ */ jsx(
                  MapWithEdit,
                  {
                    collection: groups,
                    postUrl: "admin-group",
                    arrowTrue: true,
                    currentCluster: cluster_name
                  }
                ),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                  FaCirclePlus,
                  {
                    className: "ml-6 mt-4 text-3xl",
                    onClick: () => openModal("groupModal")
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs(Dropdown, { children: [
                /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-md", children: /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    className: "inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-2xl underline font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none",
                    children: [
                      /* @__PURE__ */ jsx("p", { children: " Select Cluster " }),
                      /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: "-me-0.5 ms-2 h-4 w-4",
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 20 20",
                          fill: "currentColor",
                          children: /* @__PURE__ */ jsx(
                            "path",
                            {
                              fillRule: "evenodd",
                              d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                              clipRule: "evenodd"
                            }
                          )
                        }
                      )
                    ]
                  }
                ) }) }),
                /* @__PURE__ */ jsx(Dropdown.Content, { children: clusterDropdown })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-300 bg-gray-700 rounded text-center", children: [
                cluster_name,
                " ",
                /* @__PURE__ */ jsx(TbCirclesRelation, { className: "inline-block" })
              ] }),
              cluster_name && /* @__PURE__ */ jsx("p", {}),
              related_groups && related_groups.map((grp) => /* @__PURE__ */ jsxs("p", { children: [
                " ",
                grp.name,
                " ",
                /* @__PURE__ */ jsx(
                  FaMinusCircle,
                  {
                    className: "inline-block",
                    onClick: () => detachGroup(grp.id)
                  }
                )
              ] }, grp.id))
            ] })
          ] })
        ] }) }) }) }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs(Modal, { show: showModal.open, onClose: closeModal, children: [
          showModal.modalType == "clusterModal" && /* @__PURE__ */ jsx(
            FormForAddingCluster,
            {
              formFor: "Cluster",
              urlFor: "create_cluster"
            }
          ),
          showModal.modalType == "groupModal" && /* @__PURE__ */ jsx(
            FormForAddingCluster,
            {
              formFor: "Group",
              urlFor: "create_group"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: closeModal,
              className: "bg-red-700 mb-7 w-48 text-center rounded-md text-white",
              children: "Close"
            }
          ) })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Category
}, Symbol.toStringTag, { value: "Module" }));
function MultiImageUploader({ images, variantId }) {
  const [imageList, setImageList] = useState(images);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const handleDelete = (imageId) => {
    router.post(
      "/images/delete",
      { id: imageId },
      {
        preserveScroll: true,
        onSuccess: () => {
          setImageList((prev) => prev.filter((img) => img.id !== imageId));
        }
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
    formData.append("image", file);
    formData.append("variant_id", variantId);
    router.visit("/images/upload", {
      method: "post",
      data: formData,
      forceFormData: true,
      preserveScroll: true,
      onSuccess: (page) => {
        setImageList(page.props.images);
        setPreviewImage(null);
        fileInputRef.current.value = "";
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-4 mb-4 mt-10 justify-stretch", children: imageList.map((image) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: `/storage/${image.name}`,
          alt: "Uploaded",
          className: " h-48 object-cover rounded border"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleDelete(image.id),
          className: "absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-80 hover:opacity-100",
          children: "×"
        }
      )
    ] }, image.id)) }),
    /* @__PURE__ */ jsx("hr", { className: "h-px my-8 bg-gray-200 border-2 dark:bg-gray-900" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 mb-36", children: [
      previewImage && /* @__PURE__ */ jsx("div", { className: "relative group", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: previewImage,
          alt: "Preview",
          className: " h-32 object-cover rounded border border-dashed border-blue-400"
        }
      ) }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          ref: formRef,
          onSubmit: handleFormSubmit,
          encType: "multipart/form-data",
          className: "space-y-2",
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                ref: fileInputRef,
                onChange: handleFileChange,
                className: "block w-full text-sm text-gray-500\n                     file:mr-4 file:py-2 file:px-4\n                     file:rounded-full file:border-0\n                     file:text-sm file:font-semibold\n                     file:bg-blue-50 file:text-blue-700\n                     hover:file:bg-blue-100"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
                children: "Submit"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
const __vite_glob_0_47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MultiImageUploader
}, Symbol.toStringTag, { value: "Module" }));
const FormForAddingDesign$1 = ({ storeUrl, availableVariants, onDesignCreated, onCreateError }) => {
  console.log("FormForAddingDesign: availableVariants prop:", availableVariants);
  const initialVariantId = availableVariants && availableVariants.length > 0 ? availableVariants[0].id : "";
  const { data, setData, post, processing, errors, reset } = useForm({
    variant_id: initialVariantId,
    // The ID of the selected variant (crucial for association)
    name: "",
    mrp: 0,
    price: 0,
    shipping_fee: 0,
    // Corrected from 'shipping' to 'shipping_fee' to match previous definitions
    description: "",
    size_image: null
    // New field for the size image
  });
  const [clientError, setClientError] = useState(null);
  const [sizeImagePreview, setSizeImagePreview] = useState(null);
  const sizeImageInputRef = useRef(null);
  useEffect(() => {
    console.log("FormForAddingDesign: Current data.variant_id in useEffect:", data.variant_id);
  }, [data.variant_id]);
  useEffect(() => {
    return () => {
      if (sizeImagePreview) {
        URL.revokeObjectURL(sizeImagePreview);
      }
    };
  }, [sizeImagePreview]);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(`handleChange: Input '${name}' changed. Type: ${type}, Value: ${value}`);
    setData(
      name,
      type === "number" ? Number(value) : value
    );
    if (clientError && name === "variant_id") {
      setClientError(null);
    }
  };
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setData(fieldName, file);
      const previewUrl = URL.createObjectURL(file);
      {
        setSizeImagePreview(previewUrl);
      }
    } else {
      setData(fieldName, null);
      {
        setSizeImagePreview(null);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setClientError(null);
    if (availableVariants.length > 0 && !data.variant_id) {
      console.error("Please select a variant.");
      setClientError("Please select a variant before submitting.");
      return;
    }
    post(storeUrl, {
      onSuccess: (page) => {
        console.log("Design created successfully!", page);
        reset();
        setData("variant_id", availableVariants && availableVariants.length > 0 ? availableVariants[0].id : "");
        setSizeImagePreview(null);
        if (sizeImageInputRef.current) sizeImageInputRef.current.value = "";
        if (onDesignCreated) {
          onDesignCreated(page);
        }
      },
      onError: (formErrors) => {
        console.error("Design creation failed:", formErrors);
        if (onCreateError) {
          onCreateError(formErrors);
        }
      },
      onFinish: () => {
        console.log("Design creation submission finished.");
      }
    });
  };
  if (!availableVariants || availableVariants.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-red-600 text-lg font-semibold", children: "Please add a variant before adding a design." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "Designs must be associated with an existing product variant." })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-8 text-center", children: "Create New Product Design" }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 mb-6", children: [
          " ",
          /* @__PURE__ */ jsx("label", { htmlFor: "variant_id", className: "block text-gray-700 text-sm font-bold mb-2", children: "Select Variant:" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "variant_id",
              name: "variant_id",
              value: data.variant_id,
              onChange: handleChange,
              className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.variant_id || clientError ? "border-red-500" : ""}`,
              required: true,
              children: [
                data.variant_id === "" && // Check data.variant_id, not initialVariantId
                /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "-- Select a Variant --" }),
                availableVariants.map((variant) => /* @__PURE__ */ jsxs("option", { value: variant.id, children: [
                  variant.name,
                  " "
                ] }, variant.id))
              ]
            }
          ),
          errors.variant_id && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.variant_id }),
          clientError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: clientError }),
          " "
        ] }),
        data.variant_id ? (
          // This condition controls the visibility of the main form fields
          /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-gray-700 text-sm font-bold mb-2", children: "Design Name:" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "name",
                    name: "name",
                    value: data.name,
                    onChange: handleChange,
                    className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.name ? "border-red-500" : ""}`,
                    placeholder: "e.g., Floral Pattern, Geometric Abstract",
                    required: true
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "mrp", className: "block text-gray-700 text-sm font-bold mb-2", children: "MRP (Max. Retail Price):" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    id: "mrp",
                    name: "mrp",
                    value: data.mrp,
                    onChange: handleChange,
                    className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.mrp ? "border-red-500" : ""}`,
                    placeholder: "Maximum Retail Price",
                    required: true,
                    min: "0"
                  }
                ),
                errors.mrp && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.mrp })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "price", className: "block text-gray-700 text-sm font-bold mb-2", children: "Selling Price:" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    id: "price",
                    name: "price",
                    value: data.price,
                    onChange: handleChange,
                    className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.price ? "border-red-500" : ""}`,
                    placeholder: "Selling Price",
                    required: true,
                    min: "0"
                  }
                ),
                errors.price && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.price })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "shipping_fee", className: "block text-gray-700 text-sm font-bold mb-2", children: "Shipping Fee:" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    id: "shipping_fee",
                    name: "shipping_fee",
                    value: data.shipping_fee,
                    onChange: handleChange,
                    className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.shipping_fee ? "border-red-500" : ""}`,
                    placeholder: "Shipping Cost",
                    required: true,
                    min: "0"
                  }
                ),
                errors.shipping_fee && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.shipping_fee })
              ] })
            ] }),
            " ",
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "description", className: "block text-gray-700 text-sm font-bold mb-2", children: "Description:" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "description",
                  name: "description",
                  value: data.description,
                  onChange: handleChange,
                  rows: "4",
                  className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y ${errors.description ? "border-red-500" : ""}`,
                  placeholder: "Detailed description of the design",
                  required: true
                }
              ),
              errors.description && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "size_image", className: "block text-gray-700 text-sm font-bold mb-2", children: "Size Image:" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  id: "size_image",
                  name: "size_image",
                  ref: sizeImageInputRef,
                  accept: "image/*",
                  onChange: (e) => handleFileChange(e, "size_image"),
                  className: `block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.size_image ? "border-red-500" : ""}`
                }
              ),
              errors.size_image && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.size_image }),
              sizeImagePreview && /* @__PURE__ */ jsxs("div", { className: "mt-2 text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs mb-1", children: "Preview:" }),
                /* @__PURE__ */ jsx("img", { src: sizeImagePreview, alt: "Size Image Preview", className: "max-w-full h-24 object-contain rounded-md shadow-sm border border-gray-200 inline-block" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: `w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out
                                ${processing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`,
                children: processing ? "Creating Design..." : "Create Design"
              }
            )
          ] })
        ) : /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg", children: "Please select a design from the dropdown above to add a design." }) })
      ]
    }
  ) });
};
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FormForAddingDesign$1
}, Symbol.toStringTag, { value: "Module" }));
function CreateDesign({ product }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: [
        "Create a Design for ",
        product.name
      ] }),
      children: /* @__PURE__ */ jsxs("div", { className: "flex align-middle justify-center", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(FormForAddingDesign$1, { availableVariants: product.varients, storeUrl: "create_design" }) }),
        /* @__PURE__ */ jsx("div", {})
      ] })
    }
  ) });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateDesign
}, Symbol.toStringTag, { value: "Module" }));
const FormForAddingSize = ({ storeUrl, availableDesigns, onSizeCreated, onCreateError }) => {
  console.log("FormForAddingSize: availableDesigns prop:", availableDesigns);
  const initialDesignId = availableDesigns && availableDesigns.length > 0 ? availableDesigns[0].id : "";
  const { data, setData, post, processing, errors, reset } = useForm({
    design_id: initialDesignId,
    // The ID of the selected design (crucial for association)
    name: "",
    description: "",
    mrp: 0,
    price: 0,
    shipping: 0,
    qty: 0,
    size_image: null
    // New field for the size image
  });
  const [clientError, setClientError] = useState(null);
  const [sizeImagePreview, setSizeImagePreview] = useState(null);
  const sizeImageInputRef = useRef(null);
  useEffect(() => {
    console.log("FormForAddingSize: Current data.design_id in useEffect:", data.design_id);
  }, [data.design_id]);
  useEffect(() => {
    return () => {
      if (sizeImagePreview) {
        URL.revokeObjectURL(sizeImagePreview);
      }
    };
  }, [sizeImagePreview]);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(`handleChange: Input '${name}' changed. Type: ${type}, Value: ${value}`);
    setData(
      name,
      type === "number" ? Number(value) : value
    );
    if (clientError && name === "design_id") {
      setClientError(null);
    }
  };
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setData(fieldName, file);
      const previewUrl = URL.createObjectURL(file);
      {
        setSizeImagePreview(previewUrl);
      }
    } else {
      setData(fieldName, null);
      {
        setSizeImagePreview(null);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setClientError(null);
    if (availableDesigns.length > 0 && !data.design_id) {
      console.error("Please select a design.");
      setClientError("Please select a design before submitting.");
      return;
    }
    post(storeUrl, {
      onSuccess: (page) => {
        console.log("Size created successfully!", page);
        reset();
        setData("design_id", availableDesigns && availableDesigns.length > 0 ? availableDesigns[0].id : "");
        setSizeImagePreview(null);
        if (sizeImageInputRef.current) sizeImageInputRef.current.value = "";
        if (onSizeCreated) {
          onSizeCreated(page);
        }
      },
      onError: (formErrors) => {
        console.error("Size creation failed:", formErrors);
        if (onCreateError) {
          onCreateError(formErrors);
        }
      },
      onFinish: () => {
        console.log("Size creation submission finished.");
      }
    });
  };
  if (!availableDesigns || availableDesigns.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-red-600 text-lg font-semibold", children: "Please add a Design before adding a size." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "Sizes must be associated with an existing product design." })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-8 text-center", children: "Create New Product Size" }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 mb-6", children: [
          " ",
          /* @__PURE__ */ jsx("label", { htmlFor: "design_id", className: "block text-gray-700 text-sm font-bold mb-2", children: "Select Design:" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "design_id",
              name: "design_id",
              value: data.design_id,
              onChange: handleChange,
              className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.design_id || clientError ? "border-red-500" : ""}`,
              required: true,
              children: [
                data.design_id === "" && /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "-- Select a Design --" }),
                availableDesigns.map((design) => /* @__PURE__ */ jsxs("option", { value: design.id, children: [
                  design.name,
                  " "
                ] }, design.id))
              ]
            }
          ),
          errors.design_id && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.design_id }),
          clientError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: clientError }),
          " "
        ] }),
        data.design_id ? (
          // This condition controls the visibility of the main form fields
          /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-gray-700 text-sm font-bold mb-2", children: "Size Name:" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "name",
                    name: "name",
                    value: data.name,
                    onChange: handleChange,
                    className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.name ? "border-red-500" : ""}`,
                    placeholder: "e.g., Small, Medium, Large, 32",
                    required: true
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "qty", className: "block text-gray-700 text-sm font-bold mb-2", children: "Quantity:" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    id: "qty",
                    name: "qty",
                    value: data.qty,
                    onChange: handleChange,
                    className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.qty ? "border-red-500" : ""}`,
                    placeholder: "Available Quantity",
                    required: true,
                    min: "0"
                  }
                ),
                errors.qty && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.qty })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "mrp", className: "block text-gray-700 text-sm font-bold mb-2", children: "MRP (Max. Retail Price):" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    id: "mrp",
                    name: "mrp",
                    value: data.mrp,
                    onChange: handleChange,
                    className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.mrp ? "border-red-500" : ""}`,
                    placeholder: "Maximum Retail Price",
                    required: true,
                    min: "0"
                  }
                ),
                errors.mrp && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.mrp })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "price", className: "block text-gray-700 text-sm font-bold mb-2", children: "Selling Price:" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    id: "price",
                    name: "price",
                    value: data.price,
                    onChange: handleChange,
                    className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.price ? "border-red-500" : ""}`,
                    placeholder: "Selling Price",
                    required: true,
                    min: "0"
                  }
                ),
                errors.price && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.price })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "shipping", className: "block text-gray-700 text-sm font-bold mb-2", children: "Shipping Fee:" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    id: "shipping",
                    name: "shipping",
                    value: data.shipping,
                    onChange: handleChange,
                    className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.shipping ? "border-red-500" : ""}`,
                    placeholder: "Shipping Cost",
                    required: true,
                    min: "0"
                  }
                ),
                errors.shipping && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.shipping })
              ] })
            ] }),
            " ",
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "description", className: "block text-gray-700 text-sm font-bold mb-2", children: "Description:" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "description",
                  name: "description",
                  value: data.description,
                  onChange: handleChange,
                  rows: "4",
                  className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y ${errors.description ? "border-red-500" : ""}`,
                  placeholder: "Detailed description of this size/SKU",
                  required: true
                }
              ),
              errors.description && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "size_image", className: "block text-gray-700 text-sm font-bold mb-2", children: "Size Image:" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  id: "size_image",
                  name: "size_image",
                  ref: sizeImageInputRef,
                  accept: "image/*",
                  onChange: (e) => handleFileChange(e, "size_image"),
                  className: `block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.size_image ? "border-red-500" : ""}`
                }
              ),
              errors.size_image && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.size_image }),
              sizeImagePreview && /* @__PURE__ */ jsxs("div", { className: "mt-2 text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs mb-1", children: "Preview:" }),
                /* @__PURE__ */ jsx("img", { src: sizeImagePreview, alt: "Size Image Preview", className: "max-w-full h-24 object-contain rounded-md shadow-sm border border-gray-200 inline-block" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: `w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out
                                ${processing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`,
                children: processing ? "Creating Size..." : "Create Size"
              }
            )
          ] })
        ) : /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg", children: "Please select a design from the dropdown above to add a size." }) })
      ]
    }
  ) });
};
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FormForAddingSize
}, Symbol.toStringTag, { value: "Module" }));
function CreateSize({ product, designs }) {
  console.log(designs);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: [
        "Create a Size for ",
        product.name
      ] }),
      children: /* @__PURE__ */ jsxs("div", { className: "flex align-middle justify-center", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(FormForAddingSize, { availableDesigns: designs, id: product.id, storeUrl: "create_size" }) }),
        /* @__PURE__ */ jsx("div", {})
      ] })
    }
  ) });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateSize
}, Symbol.toStringTag, { value: "Module" }));
const FormForAddingVarient = ({ storeUrl, onVariantCreated, onCreateError, id }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    shippable: 0,
    qty: 0,
    mrp: 0,
    price: 0,
    shipping_fee: 0,
    description: "",
    material: "",
    color: "",
    size: "",
    // Changed to string type for flexibility (e.g., "S", "M", "L")
    feature1: "",
    feature2: "",
    feature3: "",
    product_id: id,
    brand: "Amaltas",
    // Default value
    size_image: null
    // New field for the size image file
  });
  const [sizeImagePreview, setSizeImagePreview] = useState(null);
  const sizeImageInputRef = useRef(null);
  useEffect(() => {
    return () => {
      if (sizeImagePreview) {
        URL.revokeObjectURL(sizeImagePreview);
      }
    };
  }, [sizeImagePreview]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(
      name,
      type === "checkbox" ? Number(checked) : type === "number" ? Number(value) : value
    );
  };
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setData(fieldName, file);
      const previewUrl = URL.createObjectURL(file);
      {
        setSizeImagePreview(previewUrl);
      }
    } else {
      setData(fieldName, null);
      {
        setSizeImagePreview(null);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(storeUrl, {
      onSuccess: (page) => {
        console.log("Variant created successfully!", page);
        reset();
        setSizeImagePreview(null);
        if (sizeImageInputRef.current) sizeImageInputRef.current.value = "";
        if (onVariantCreated) {
          onVariantCreated(page);
        }
      },
      onError: (formErrors) => {
        console.error("Variant creation failed:", formErrors);
        if (onCreateError) {
          onCreateError(formErrors);
        }
      },
      onFinish: () => {
        console.log("Variant creation submission finished.");
      }
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-8 text-center", children: "Create New Product Variant" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-gray-700 text-sm font-bold mb-2", children: "Name:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "name",
                name: "name",
                value: data.name,
                onChange: handleChange,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.name ? "border-red-500" : ""}`,
                placeholder: "Variant Name",
                required: true
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "brand", className: "block text-gray-700 text-sm font-bold mb-2", children: "Brand:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "brand",
                name: "brand",
                value: data.brand,
                onChange: handleChange,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.brand ? "border-red-500" : ""}`,
                placeholder: "Brand Name"
              }
            ),
            errors.brand && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.brand })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "qty", className: "block text-gray-700 text-sm font-bold mb-2", children: "Quantity:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                id: "qty",
                name: "qty",
                value: data.qty,
                onChange: handleChange,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.qty ? "border-red-500" : ""}`,
                placeholder: "Available Quantity",
                required: true,
                min: "0"
              }
            ),
            errors.qty && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.qty })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "mrp", className: "block text-gray-700 text-sm font-bold mb-2", children: "MRP (Max. Retail Price):" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                id: "mrp",
                name: "mrp",
                value: data.mrp,
                onChange: handleChange,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.mrp ? "border-red-500" : ""}`,
                placeholder: "Maximum Retail Price",
                required: true,
                min: "0"
              }
            ),
            errors.mrp && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.mrp })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "price", className: "block text-gray-700 text-sm font-bold mb-2", children: "Selling Price:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                id: "price",
                name: "price",
                value: data.price,
                onChange: handleChange,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.price ? "border-red-500" : ""}`,
                placeholder: "Selling Price",
                required: true,
                min: "0"
              }
            ),
            errors.price && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.price })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "shipping_fee", className: "block text-gray-700 text-sm font-bold mb-2", children: "Shipping Fee:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                id: "shipping_fee",
                name: "shipping_fee",
                value: data.shipping_fee,
                onChange: handleChange,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.shipping_fee ? "border-red-500" : ""}`,
                placeholder: "Shipping Cost",
                required: true,
                min: "0"
              }
            ),
            errors.shipping_fee && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.shipping_fee })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "color", className: "block text-gray-700 text-sm font-bold mb-2", children: "Color:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "color",
                name: "color",
                value: data.color,
                onChange: handleChange,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.color ? "border-red-500" : ""}`,
                placeholder: "e.g., Red, Blue, Black"
              }
            ),
            errors.color && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.color })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "size", className: "block text-gray-700 text-sm font-bold mb-2", children: "Size :" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "size",
                name: "size",
                value: data.size,
                onChange: handleChange,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.size ? "border-red-500" : ""}`,
                placeholder: "e.g., S, M, L or 10, 25, 120"
              }
            ),
            errors.size && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.size })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "feature1", className: "block text-gray-700 text-sm font-bold mb-2", children: "Feature 1:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "feature1",
                name: "feature1",
                value: data.feature1,
                onChange: handleChange,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.feature1 ? "border-red-500" : ""}`,
                placeholder: "Key feature or attribute"
              }
            ),
            errors.feature1 && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.feature1 })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "feature2", className: "block text-gray-700 text-sm font-bold mb-2", children: "Feature 2:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "feature2",
                name: "feature2",
                value: data.feature2,
                onChange: handleChange,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.feature2 ? "border-red-500" : ""}`,
                placeholder: "Another key feature"
              }
            ),
            errors.feature2 && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.feature2 })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "feature3", className: "block text-gray-700 text-sm font-bold mb-2", children: "Feature 3:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "feature3",
                name: "feature3",
                value: data.feature3,
                onChange: handleChange,
                className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.feature3 ? "border-red-500" : ""}`,
                placeholder: "Additional feature"
              }
            ),
            errors.feature3 && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.feature3 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 flex items-center mt-4", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "shippable",
                name: "shippable",
                checked: !!data.shippable,
                onChange: handleChange,
                className: "mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "shippable", className: "text-gray-700 text-sm font-bold", children: "Shippable (Can this item be shipped?)" }),
            errors.shippable && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.shippable })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "description", className: "block text-gray-700 text-sm font-bold mb-2", children: "Description:" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "description",
              name: "description",
              value: data.description,
              onChange: handleChange,
              rows: "4",
              className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y ${errors.description ? "border-red-500" : ""}`,
              placeholder: "Detailed description of the variant",
              required: true
            }
          ),
          errors.description && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "material", className: "block text-gray-700 text-sm font-bold mb-2", children: "Material:" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "material",
              name: "material",
              value: data.material,
              onChange: handleChange,
              rows: "3",
              className: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y ${errors.material ? "border-red-500" : ""}`,
              placeholder: "Material composition"
            }
          ),
          errors.material && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.material })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "size_image", className: "block text-gray-700 text-sm font-bold mb-2", children: "Size Image:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              id: "size_image",
              name: "size_image",
              ref: sizeImageInputRef,
              accept: "image/*",
              onChange: (e) => handleFileChange(e, "size_image"),
              className: `block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.size_image ? "border-red-500" : ""}`
            }
          ),
          errors.size_image && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.size_image }),
          sizeImagePreview && /* @__PURE__ */ jsxs("div", { className: "mt-2 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs mb-1", children: "Preview:" }),
            /* @__PURE__ */ jsx("img", { src: sizeImagePreview, alt: "Size Image Preview", className: "max-w-full h-24 object-contain rounded-md shadow-sm border border-gray-200 inline-block" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: `w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out
                        ${processing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`,
            children: processing ? "Creating Variant..." : "Create Variant"
          }
        )
      ]
    }
  ) });
};
const __vite_glob_0_42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FormForAddingVarient
}, Symbol.toStringTag, { value: "Module" }));
function CreateVarient({ product }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: [
        "Create a Varient for ",
        product.name
      ] }),
      children: /* @__PURE__ */ jsxs("div", { className: "flex align-middle justify-center", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(FormForAddingVarient, { id: product.id, storeUrl: "create_varient" }) }),
        /* @__PURE__ */ jsx("div", {})
      ] })
    }
  ) });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateVarient
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard$1({
  costing = [],
  installation = 0,
  estimates = [],
  material = {},
  materials = [],
  addons = [],
  cabinetTypes = [],
  embedded = false
  // 👈 Pass true when rendering inside dashboard to hide admin layout
}) {
  const allMaterials = Array.isArray(materials) ? materials : [];
  const materialLookup2 = (name) => allMaterials.find((m) => m.name === name);
  const bodyMaterialObjects2 = allMaterials.filter(
    (m) => (m.categories || []).some((c) => c.name === "Cabinet Body")
  );
  const backMaterialObjects2 = allMaterials.filter(
    (m) => (m.categories || []).some((c) => c.name === "Back of Cabinet")
  );
  const shutterMaterialObjects2 = allMaterials.filter(
    (m) => (m.categories || []).some((c) => c.name === "Doors")
  );
  const laminateObjects2 = allMaterials.filter(
    (m) => (m.categories || []).some((c) => c.name === "Laminate")
  );
  const findCabinetTypeByName = (name) => cabinetTypes.find((ct) => ct.name === name);
  const [estimatesList2, setEstimatesList] = useState([]);
  const [selectedId2, setSelectedId] = useState("");
  const [currentEstimate2, setCurrentEstimate] = useState(null);
  const [materialSpecs2, setMaterialSpecs] = useState({
    bodyMaterial: "",
    bodyLaminate: "",
    backMaterial: "",
    backLaminate: "",
    shutterMaterial: "",
    shutterLaminate: ""
  });
  const [editMode2, setEditMode2] = useState({
    body: false,
    back: false,
    shutter: false
  });
  const [hardwareEdit2, setHardwareEdit] = useState({});
  const [hardwareSelections2, setHardwareSelections] = useState({});
  useEffect(() => {
    const sorted = [...estimates].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setEstimatesList(sorted);
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      setSelectedId(id);
      const client = sorted.find((e) => String(e.id) === id);
      setCurrentEstimate(client);
    } else {
      setSelectedId("");
      setCurrentEstimate(null);
    }
  }, [estimates]);
  useEffect(() => {
    var _a, _b, _c, _d;
    if (Object.keys(material).length > 0) {
      const getMat = (key) => materialLookup2(material[key]);
      const firstLam = ((_a = laminateObjects2[0]) == null ? void 0 : _a.name) || "";
      const bodyMat = getMat("bodyMaterial");
      const backMat = getMat("backMaterial");
      const shutterMat = getMat("shutterMaterial");
      setMaterialSpecs({
        bodyMaterial: material.bodyMaterial || ((_b = bodyMaterialObjects2[0]) == null ? void 0 : _b.name) || "",
        bodyLaminate: bodyMat && bodyMat.mica === 1 ? material.bodyLaminate || firstLam : "",
        backMaterial: material.backMaterial || ((_c = backMaterialObjects2[0]) == null ? void 0 : _c.name) || "",
        backLaminate: backMat && backMat.mica === 1 ? material.backLaminate || firstLam : "",
        shutterMaterial: material.shutterMaterial || ((_d = shutterMaterialObjects2[0]) == null ? void 0 : _d.name) || "",
        shutterLaminate: shutterMat && shutterMat.mica === 1 ? material.shutterLaminate || firstLam : ""
      });
    }
  }, [material, allMaterials.length]);
  const handleMaterialChange2 = (name, value) => {
    setMaterialSpecs((prev) => {
      var _a;
      const newState = { ...prev, [name]: value };
      if (name.endsWith("Material")) {
        const newMat = materialLookup2(value);
        const laminateKey = name.replace("Material", "Laminate");
        const firstLam = ((_a = laminateObjects2[0]) == null ? void 0 : _a.name) || "";
        newState[laminateKey] = newMat && newMat.mica === 1 ? firstLam : "";
      }
      return newState;
    });
  };
  const handleSubmitMaterials2 = () => {
    if (!selectedId2) return;
    router.post(`/${selectedId2}/edit_estimate_material`, materialSpecs2, {
      preserveScroll: true
    });
  };
  const initHardwareSelections = (cabinetId, cab) => {
    const cabinetType = findCabinetTypeByName(cab.name);
    let availableHardware = [];
    if (cabinetType && Array.isArray(cabinetType.materials)) {
      availableHardware = cabinetType.materials.filter(
        (m) => (m.categories || []).some((c) => c.name === "Hardware")
      );
    } else {
      availableHardware = (cab.hardware || []).map((h) => ({
        id: h.id,
        name: h.name,
        rate: h.rate || 0
      }));
    }
    const selectedMap = (cab.hardware || []).reduce((acc, h) => {
      acc[h.name] = { quantity: h.quantity || 0, rate: h.rate || 0 };
      return acc;
    }, {});
    const selectionObj = availableHardware.reduce((acc, h) => {
      const sel = selectedMap[h.name];
      acc[h.name] = {
        selected: Boolean(sel && sel.quantity > 0),
        quantity: sel ? sel.quantity : 1,
        rate: sel ? sel.rate : h.rate || 0
      };
      return acc;
    }, {});
    setHardwareSelections((prev) => ({ ...prev, [cabinetId]: selectionObj }));
  };
  const toggleHardwareEdit2 = (cab) => {
    const editing = Boolean(hardwareEdit2[cab.id]);
    if (!editing) {
      initHardwareSelections(cab.id, cab);
    }
    setHardwareEdit((prev) => ({ ...prev, [cab.id]: !editing }));
  };
  const handleHardwareSelect2 = (cabinetId, name, rate, checked) => {
    setHardwareSelections((prev) => {
      var _a, _b;
      const cabSel = { ...prev[cabinetId] || {} };
      if (checked) {
        cabSel[name] = { selected: true, quantity: ((_a = cabSel[name]) == null ? void 0 : _a.quantity) || 1, rate: rate || ((_b = cabSel[name]) == null ? void 0 : _b.rate) || 0 };
      } else {
        cabSel[name] = { ...cabSel[name] || { quantity: 1, rate: rate || 0 }, selected: false };
      }
      return { ...prev, [cabinetId]: cabSel };
    });
  };
  const handleHardwareQuantityChange2 = (cabinetId, name, qty) => {
    const numeric = Number(qty) || 0;
    setHardwareSelections((prev) => {
      var _a;
      return {
        ...prev,
        [cabinetId]: {
          ...prev[cabinetId],
          [name]: { ...prev[cabinetId][name], quantity: numeric, selected: numeric > 0 ? ((_a = prev[cabinetId][name]) == null ? void 0 : _a.selected) ?? true : false }
        }
      };
    });
  };
  const handleSaveHardware2 = (cabinetId) => {
    const selObj = hardwareSelections2[cabinetId] || {};
    const selectedHardware = Object.entries(selObj).filter(([_2, data]) => data.selected).map(([name, data]) => ({
      name,
      quantity: data.quantity
    }));
    router.post(`/update_hardware/${cabinetId}`, { hardware: selectedHardware }, {
      preserveScroll: true
    });
    setHardwareEdit((prev) => ({ ...prev, [cabinetId]: false }));
  };
  const calcHardwareCost2 = (hardware) => Array.isArray(hardware) ? hardware.reduce((sum, h) => sum + (Number(h.rate) || 0) * (Number(h.quantity) || 1), 0) : 0;
  const calcAddonCost = (addons2) => Array.isArray(addons2) ? addons2.reduce((sum, a) => sum + parseFloat(a.amount || 0), 0) : 0;
  const totalCabinets2 = costing.reduce((t, c) => t + (Number(c.cost) || 0), 0);
  const totalHardware2 = costing.reduce((t, c) => t + calcHardwareCost2(c.hardware), 0);
  const totalAddons2 = calcAddonCost(addons);
  const installationCost2 = Number(installation) || 0;
  const subtotal2 = totalCabinets2 + totalHardware2 + totalAddons2 + installationCost2;
  const gst2 = subtotal2 * 0.18;
  const grandTotal2 = subtotal2 + gst2;
  const hasResults2 = costing.length > 0;
  const content = /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-50 rounded-lg shadow-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 p-4 bg-white border rounded-lg shadow-sm", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-lg font-medium mb-2", children: "Select a Client Estimate:" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: selectedId2,
          onChange: (e) => {
            const id = e.target.value;
            window.location.href = id ? `${window.location.pathname}?id=${id}` : window.location.pathname;
          },
          className: "w-full border-gray-300 rounded-md",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "-- Select an Estimate --" }),
            estimatesList2.map((e) => /* @__PURE__ */ jsxs("option", { value: e.id, children: [
              e.clientName,
              " (",
              new Date(e.created_at).toLocaleDateString("en-US"),
              ")"
            ] }, e.id))
          ]
        }
      )
    ] }),
    currentEstimate2 && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-indigo-50 border rounded-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-indigo-700 mb-2", children: "Client Information" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Name:" }),
          " ",
          currentEstimate2.clientName
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Phone:" }),
          " ",
          currentEstimate2.clientPhone
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Address:" }),
          " ",
          currentEstimate2.address
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-yellow-50 border rounded-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-yellow-700 mb-4", children: "Material Specifications" }),
        ["body", "back", "shutter"].map((section) => {
          const selectedMat = materialLookup2(materialSpecs2[`${section}Material`]);
          const showLam = selectedMat && selectedMat.mica === 1;
          const labelMap = { body: "Body Material", back: "Back Panel", shutter: "Shutter" };
          const optionsMap = {
            body: bodyMaterialObjects2,
            back: backMaterialObjects2,
            shutter: shutterMaterialObjects2
          };
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxs("label", { className: "w-1/3 text-sm font-medium", children: [
              labelMap[section],
              ":"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-1/3", children: editMode2[section] ? /* @__PURE__ */ jsx(
              "select",
              {
                value: materialSpecs2[`${section}Material`],
                onChange: (e) => handleMaterialChange2(`${section}Material`, e.target.value),
                className: "w-full border rounded p-1 text-sm",
                children: optionsMap[section].map((opt) => /* @__PURE__ */ jsx("option", { value: opt.name, children: opt.name }, opt.name))
              }
            ) : /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-800", children: materialSpecs2[`${section}Material`] || "—" }) }),
            /* @__PURE__ */ jsx("div", { className: "w-1/3", children: showLam ? editMode2[section] ? /* @__PURE__ */ jsx(
              "select",
              {
                value: materialSpecs2[`${section}Laminate`],
                onChange: (e) => handleMaterialChange2(`${section}Laminate`, e.target.value),
                className: "w-full border rounded p-1 text-sm",
                children: laminateObjects2.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.name, children: opt.name }, opt.name))
              }
            ) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-800", children: materialSpecs2[`${section}Laminate`] || "—" }) : /* @__PURE__ */ jsx("p", { className: "text-xs italic text-gray-500", children: "Laminate N/A" }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  if (editMode2[section]) handleSubmitMaterials2();
                  setEditMode2((prev) => ({ ...prev, [section]: !prev[section] }));
                },
                className: "text-gray-500 hover:text-yellow-700 transition",
                children: editMode2[section] ? "✔️" : "✏️"
              }
            )
          ] }, section);
        })
      ] })
    ] }),
    hasResults2 && /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-gray-800", children: "Cabinet and Hardware Costs" }),
      /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 shadow-md rounded-lg", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold", children: "Cabinet" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold", children: "Size" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-semibold", children: "Cost" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold", children: "Hardware" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-semibold", children: "Hardware Cost" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: costing.map((cab) => {
          var _a;
          const cabinetType = findCabinetTypeByName(cab.name);
          const availableHardware = cabinetType && Array.isArray(cabinetType.materials) ? cabinetType.materials.filter(
            (m) => (m.categories || []).some((c) => c.name === "Hardware")
          ) : [];
          const hardwareTotal = calcHardwareCost2(cab.hardware);
          return /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: cab.name }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600", children: cab.size }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right font-bold text-green-700", children: [
              "₹",
              (Number(cab.cost) || 0).toFixed(2)
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: hardwareEdit2[cab.id] ? /* @__PURE__ */ jsxs("div", { children: [
              availableHardware.length ? availableHardware.map((h) => {
                var _a2;
                const state = ((_a2 = hardwareSelections2[cab.id]) == null ? void 0 : _a2[h.name]) || {};
                const selected = typeof state.selected === "boolean" ? state.selected : false;
                const qty = state.quantity ?? 1;
                const rate = state.rate ?? h.rate ?? 0;
                return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: selected,
                        onChange: (e) => handleHardwareSelect2(cab.id, h.name, rate, e.target.checked)
                      }
                    ),
                    h.name
                  ] }),
                  selected && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        min: "1",
                        value: qty,
                        onChange: (e) => handleHardwareQuantityChange2(cab.id, h.name, e.target.value),
                        className: "border w-16 text-center rounded"
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-700 ml-2", children: [
                      "₹",
                      (Number(qty) * Number(rate)).toFixed(2)
                    ] })
                  ] })
                ] }, h.id ?? h.name);
              }) : (
                // fallback: if there are no availableHardware (shouldn't happen if cabinetTypes is correct)
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "No hardware options available for this cabinet type." })
              ),
              /* @__PURE__ */ jsxs("div", { className: "text-right mt-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleSaveHardware2(cab.id),
                    className: "bg-green-600 text-white px-3 py-1 text-xs rounded mr-2",
                    children: "Save"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => toggleHardwareEdit2(cab),
                    className: "bg-gray-400 text-white px-3 py-1 text-xs rounded",
                    children: "Cancel"
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { children: [
              ((_a = cab.hardware) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside text-xs", children: cab.hardware.map((h, i) => /* @__PURE__ */ jsxs("li", { children: [
                h.name,
                " × ",
                h.quantity
              ] }, h.name + i)) }) : /* @__PURE__ */ jsx("p", { className: "text-gray-400 italic", children: "No hardware" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => toggleHardwareEdit2(cab),
                  className: "text-blue-600 text-xs underline mt-1",
                  children: "Edit"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right font-bold text-green-700", children: [
              "₹",
              hardwareTotal.toFixed(2)
            ] })
          ] }, cab.id);
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "min-w-full divide-y divide-gray-200 shadow-md rounded-lg", children: addons && addons.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-sm", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", children: "Additional Items" }),
        /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left border-b", children: [
            /* @__PURE__ */ jsx("th", { className: "py-2", children: "Item" }),
            /* @__PURE__ */ jsx("th", { className: "py-2", children: "Description" }),
            /* @__PURE__ */ jsx("th", { className: "py-2 text-right", children: "Amount (₹)" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: addons.map((item) => /* @__PURE__ */ jsxs("tr", { className: "border-b last:border-none", children: [
            /* @__PURE__ */ jsx("td", { className: "py-2", children: item.item_name }),
            /* @__PURE__ */ jsx("td", { className: "py-2 text-gray-600", children: item.description || "-" }),
            /* @__PURE__ */ jsx("td", { className: "py-2 text-right font-medium", children: Number(item.amount).toLocaleString("en-IN") })
          ] }, item.id)) })
        ] })
      ] }) })
    ] }),
    hasResults2 && /* @__PURE__ */ jsxs("div", { className: "p-6 bg-green-50 border rounded-lg max-w-md ml-auto shadow-md", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-green-800 mb-4", children: "Final Summary" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Cabinet & Material:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            totalCabinets2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Hardware:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            totalHardware2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Add-Ons:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            totalAddons2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Installation:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            installationCost2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-bold text-green-700 pt-2", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Before GST:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            subtotal2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-t border-green-300 pt-2", children: [
          /* @__PURE__ */ jsx("span", { children: "GST (18%):" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            gst2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-2xl font-extrabold text-green-900 mt-2", children: [
          /* @__PURE__ */ jsx("span", { children: "GRAND TOTAL:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            grandTotal2.toFixed(2)
          ] })
        ] })
      ] })
    ] })
  ] });
  return embedded ? content : /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Estimate from Amaltas Furniture Studio & Modular Kitchens" }),
      children: [
        content,
        /* @__PURE__ */ jsxs("div", { className: "mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-3", children: "Warranty" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-decimal list-inside space-y-2 text-gray-700", children: [
            /* @__PURE__ */ jsx("li", { children: "We use branded components for manufacturing the kitchen. The components along with their brands are mentioned in the estimate." }),
            /* @__PURE__ */ jsx("li", { children: "Each component is covered under a warranty from its original manufacturer." }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Action Tesa HDHMR" }),
              " has a warranty of 7 Years, ",
              /* @__PURE__ */ jsx("strong", { children: "Action Tesa Boilo" }),
              " has a warranty of 21 Years."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Century Club Prime" }),
              " ply comes with a 25-year warranty against borer & termite attacks. ",
              /* @__PURE__ */ jsx("strong", { children: "Vimba Ply" }),
              " comes with a 15-year warranty."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Century Sainik 710 Ply" }),
              " has an 8-year warranty."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Hettich" }),
              " provides 2-year warranty on Hinges & Channels, and 5-year warranty on the Innotech Drawer System."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Service from our side will be free for ",
              /* @__PURE__ */ jsx("strong", { children: "two years" }),
              ". Thereafter it will be chargeable at ₹999 per visit."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Any damage to the kitchen caused by work of ",
              /* @__PURE__ */ jsx("strong", { children: "third-party vendors" }),
              "(stone work, civil work, plumbing, electrical, etc.) will ",
              /* @__PURE__ */ jsx("strong", { children: "not" }),
              " be covered under warranty and will be chargeable as per actuals."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "After work completion, we will clean the kitchen before handover. Post-handover cleaning ",
              /* @__PURE__ */ jsx("strong", { children: "is not covered" }),
              " under free service warranty."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Warranty will be ",
              /* @__PURE__ */ jsx("strong", { children: "void" }),
              " if any other carpenter or technician tampers with the kitchen or any components we manufactured."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Installation of Stone, Tiles, Chimney, Cooktop, Cylinder, Microwave, Oven, Geyser or any other appliance is ",
              /* @__PURE__ */ jsx("strong", { children: "not included" }),
              " unless explicitly mentioned."
            ] })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-8 mb-3", children: "Payments" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-2 text-gray-700", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "25% advance payment" }),
              " at order confirmation."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "25% payment" }),
              " at Carcase (body cabinet) installation."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "40% payment before installation" }),
              " of hardware & doors."
            ] }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("strong", { children: "10% after final handover." }) })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-8 mb-3", children: "Other Terms" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-decimal list-inside space-y-2 text-gray-700", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "Our scope of work ",
              /* @__PURE__ */ jsx("strong", { children: "does not include civil site preparation" }),
              " of any kind."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Goods remain our property" }),
              " until full payment is received."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "All warranties are applicable only after ",
              /* @__PURE__ */ jsx("strong", { children: "final payments" }),
              " are completed."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Any change in scope of work or drawing plans will be ",
              /* @__PURE__ */ jsx("strong", { children: "charged extra" }),
              "."
            ] })
          ] })
        ] })
      ]
    }
  );
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard$1
}, Symbol.toStringTag, { value: "Module" }));
function EditImage({ value, id, names }) {
  console.log(names);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: [
        "Edit Images for ",
        /* @__PURE__ */ jsx("span", { className: "underline", children: names.varient }),
        " Varient of Product: ",
        names.product,
        ","
      ] }),
      children: /* @__PURE__ */ jsxs("div", { className: "flex align-middle justify-center", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(MultiImageUploader, { images: value, variantId: id }) }),
        /* @__PURE__ */ jsx("div", {})
      ] })
    }
  ) });
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditImage
}, Symbol.toStringTag, { value: "Module" }));
function EditProductField({ inputType, name, modelId, modelName, modelField, fieldValue }) {
  function handleSubmit(e) {
    e.preventDefault();
  }
  function inputChanged(e, id, model, field) {
    const value = {
      id,
      model,
      field,
      value: e.target.value
    };
    router.post("/admin_edit_product", value);
    window.location.reload();
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    inputType == "input" && /* @__PURE__ */ jsx("input", { type: "text", name: modelField, onBlur: () => inputChanged(event, modelId, modelName, modelField), defaultValue: fieldValue, className: "text-black rounded h-10 w-[90%]" }),
    inputType == "textarea" && /* @__PURE__ */ jsx("textarea", { type: "text", name: modelField, onBlur: () => inputChanged(event, modelId, modelName, modelField), defaultValue: fieldValue, className: "text-black rounded h-60 w-[90%]" })
  ] }) });
}
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditProductField
}, Symbol.toStringTag, { value: "Module" }));
const ImageUploader = ({ uploadUrl, label = "Upload Image", onUploadSuccess, onUploadError, identifier }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    image: null,
    value: identifier
  });
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("image", file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setData("image", null);
      setImagePreview(null);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(uploadUrl, {
      onSuccess: (page) => {
        console.log("Image uploaded successfully!", page);
        reset();
        setImagePreview(null);
        if (onUploadSuccess) {
          onUploadSuccess(page);
        }
      },
      onError: (formErrors) => {
        console.error("Image upload failed:", formErrors);
        if (onUploadError) {
          onUploadError(formErrors);
        }
      },
      onFinish: () => {
        window.location.reload();
        console.log("Image upload submission finished.");
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-4 text-center", children: label }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "image-upload",
            className: "block text-gray-700 text-sm font-bold mb-2 cursor-pointer",
            children: "Select Image:"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            id: "image-upload",
            name: "image",
            accept: "image/*",
            onChange: handleFileChange,
            className: `block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.image ? "border-red-500" : ""}`
          }
        ),
        errors.image && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.image })
      ] }),
      imagePreview && /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-2", children: "Preview:" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: imagePreview,
            alt: "Image Preview",
            className: "max-w-full h-auto max-h-48 object-contain rounded-md shadow-sm border border-gray-200"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing || !data.image,
          className: `w-full bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out ${processing || !data.image ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`,
          children: processing ? "Uploading..." : "Upload"
        }
      )
    ] })
  ] });
};
const __vite_glob_0_43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ImageUploader
}, Symbol.toStringTag, { value: "Module" }));
function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function DangerButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function EditProduct({ product }) {
  const [showInputField, setShowInputField] = useState({
    slug: null,
    field: null
  });
  function handleShowInputField(slug, field) {
    setShowInputField({
      ...showInputField,
      slug,
      field
    });
  }
  const [showModal, setShowModal] = useState({ open: false, modalType: "" });
  function closeModal() {
    setShowModal(false);
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Edit Product" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Products" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 mb-10 bg-gray-300 p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "columns-[20%]", children: [
              "Product Name :",
              /* @__PURE__ */ jsx(
                MdEdit,
                {
                  className: "inline-block mb-2",
                  onClick: () => handleShowInputField(
                    product.slug,
                    "name"
                  )
                }
              ),
              showInputField.slug == product.slug && showInputField.field == "name" && /* @__PURE__ */ jsx(
                EditProductField,
                {
                  inputType: "input",
                  modelId: product.id,
                  modelName: "product",
                  modelField: "name",
                  fieldValue: product.name
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("h1", { className: "items-end columns-[80%]", children: [
              " ",
              product.name
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 mb-10 bg-gray-300 p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "columns-[20%]", children: [
              "Shippable :",
              /* @__PURE__ */ jsx(
                MdEdit,
                {
                  className: "inline-block mb-2",
                  onClick: () => handleShowInputField(
                    product.slug,
                    "shippable"
                  )
                }
              ),
              showInputField.slug == product.slug && showInputField.field == "shippable" && /* @__PURE__ */ jsx(
                EditProductField,
                {
                  inputType: "input",
                  modelId: product.id,
                  modelName: "product",
                  modelField: "shippable",
                  fieldValue: product.shippable
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("h1", { className: "items-end columns-[80%]", children: [
              " ",
              product.shippable
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Description:",
              /* @__PURE__ */ jsx(
                MdEdit,
                {
                  className: "inline-block mb-2",
                  onClick: () => handleShowInputField(
                    product.slug,
                    "description"
                  )
                }
              ),
              showInputField.slug == product.slug && showInputField.field == "description" && /* @__PURE__ */ jsx(
                EditProductField,
                {
                  inputType: "textarea",
                  modelId: product.id,
                  modelName: "product",
                  modelField: "description",
                  fieldValue: product.description
                }
              )
            ] }),
            " ",
            /* @__PURE__ */ jsx("span", { children: product.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Feature 1:",
              /* @__PURE__ */ jsx(
                MdEdit,
                {
                  className: "inline-block mb-2",
                  onClick: () => handleShowInputField(
                    product.slug,
                    "feature1"
                  )
                }
              ),
              showInputField.slug == product.slug && showInputField.field == "feature1" && /* @__PURE__ */ jsx(
                EditProductField,
                {
                  inputType: "input",
                  modelId: product.id,
                  modelName: "product",
                  modelField: "feature1",
                  fieldValue: product.feature1
                }
              )
            ] }),
            /* @__PURE__ */ jsx("span", { children: product.feature1 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Feature 2:",
              /* @__PURE__ */ jsx(
                MdEdit,
                {
                  className: "inline-block mb-2",
                  onClick: () => handleShowInputField(
                    product.slug,
                    "feature2"
                  )
                }
              ),
              showInputField.slug == product.slug && showInputField.field == "feature2" && /* @__PURE__ */ jsx(
                EditProductField,
                {
                  inputType: "input",
                  modelId: product.id,
                  modelName: "product",
                  modelField: "feature2",
                  fieldValue: product.feature2
                }
              )
            ] }),
            /* @__PURE__ */ jsx("span", { children: product.feature2 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "YouTube Link:",
              /* @__PURE__ */ jsx(
                MdEdit,
                {
                  className: "inline-block mb-2",
                  onClick: () => handleShowInputField(
                    product.slug,
                    "youtube"
                  )
                }
              ),
              showInputField.slug == product.slug && showInputField.field == "youtube" && /* @__PURE__ */ jsx(
                EditProductField,
                {
                  inputType: "input",
                  modelId: product.id,
                  modelName: "product",
                  modelField: "youtube",
                  fieldValue: product.youtube
                }
              )
            ] }),
            /* @__PURE__ */ jsx("span", { children: product.youtube })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 mb-10 bg-gray-300 p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "columns-2 flex items-center", children: [
              "Thumbnail:",
              /* @__PURE__ */ jsx(
                MdEdit,
                {
                  className: "inline-block mb-2",
                  onClick: () => handleShowInputField(
                    product.slug,
                    "thumbnail"
                  )
                }
              ),
              showInputField.slug == product.slug && showInputField.field == "thumbnail" && /* @__PURE__ */ jsx(
                ImageUploader,
                {
                  uploadUrl: "edit_product_image",
                  identifier: {
                    model: "product",
                    field: "thumbnail",
                    id: product.id
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${product.thumbnail}`,
                className: "columns-6 h-12 w-12 ml-10"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 mb-10 bg-gray-300 p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "columns-2 flex items-center", children: [
              "Small Image:",
              /* @__PURE__ */ jsx(
                MdEdit,
                {
                  className: "inline-block mb-2",
                  onClick: () => handleShowInputField(
                    product.slug,
                    "small_image"
                  )
                }
              ),
              showInputField.slug == product.slug && showInputField.field == "small_image" && /* @__PURE__ */ jsx(
                ImageUploader,
                {
                  uploadUrl: "edit_product_image",
                  identifier: {
                    model: "product",
                    field: "small_image",
                    id: product.id
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${product.small_image}`,
                className: "columns-6h-48 w-48 ml-10"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 mb-10 bg-gray-300 p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: " flex items-center align-middle bg", children: [
              "Varients:",
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: "/admin_create_varient",
                  data: { product: product.id },
                  children: /* @__PURE__ */ jsx(FaCirclePlus, { className: "ml-6 text-4xl hover:cursor-pointer" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { children: product.varients.map((varient) => /* @__PURE__ */ jsxs("div", { className: "", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 bg-gray-800 text-gray-100 mt-10 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Name:",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(
                        varient.slug,
                        "name"
                      )
                    }
                  ),
                  showInputField.slug == varient.slug && showInputField.field == "name" && /* @__PURE__ */ jsx(
                    EditProductField,
                    {
                      inputType: "input",
                      modelId: varient.id,
                      modelName: "varient",
                      modelField: "name",
                      fieldValue: varient.name
                    }
                  )
                ] }),
                " ",
                /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Link, { href: "varient_images", data: { id: varient.id }, children: /* @__PURE__ */ jsx("span", { className: "bg-sky-600 text-white p-1 rounded", children: "Edit Images" }) }) }),
                /* @__PURE__ */ jsx("span", { children: varient.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-800 text-gray-100 mt-10 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Size Image:",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(
                        varient.slug,
                        "size_image"
                      )
                    }
                  ),
                  showInputField.slug == varient.slug && showInputField.field == "size_image" && /* @__PURE__ */ jsx(
                    ImageUploader,
                    {
                      uploadUrl: "edit_varient_small_image",
                      identifier: {
                        model: "varient",
                        field: "size_image",
                        id: varient.id
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `/storage/${varient.size_image}`,
                    className: "columns-6 h-48 w-48 ml-10"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Material",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(
                        varient.slug,
                        "material"
                      )
                    }
                  ),
                  showInputField.slug == varient.slug && showInputField.field == "material" && /* @__PURE__ */ jsx(
                    EditProductField,
                    {
                      inputType: "input",
                      modelId: varient.id,
                      modelName: "varient",
                      modelField: "material",
                      fieldValue: varient.material
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("span", { children: varient.material })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "MRP:",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(
                        varient.slug,
                        "mrp"
                      )
                    }
                  ),
                  showInputField.slug == varient.slug && showInputField.field == "mrp" && /* @__PURE__ */ jsx(
                    EditProductField,
                    {
                      inputType: "input",
                      modelId: varient.id,
                      modelName: "varient",
                      modelField: "mrp",
                      fieldValue: varient.mrp
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("span", { children: varient.mrp })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Price:",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(
                        varient.slug,
                        "price"
                      )
                    }
                  ),
                  showInputField.slug == varient.slug && showInputField.field == "price" && /* @__PURE__ */ jsx(
                    EditProductField,
                    {
                      inputType: "input",
                      modelId: varient.id,
                      modelName: "varient",
                      modelField: "price",
                      fieldValue: varient.price
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("span", { children: varient.price })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Shipping Fees:",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(
                        varient.slug,
                        "shipping_fee"
                      )
                    }
                  ),
                  showInputField.slug == varient.slug && showInputField.field == "shipping_fee" && /* @__PURE__ */ jsx(
                    EditProductField,
                    {
                      inputType: "input",
                      modelId: varient.id,
                      modelName: "varient",
                      modelField: "shipping_fee",
                      fieldValue: varient.shipping_fee
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("span", { children: varient.shipping_fee })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Description:",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(varient.slug, "description")
                    }
                  ),
                  showInputField.slug === varient.slug && showInputField.field === "description" && /* @__PURE__ */ jsx(
                    EditProductField,
                    {
                      inputType: "textarea",
                      modelId: varient.id,
                      modelName: "varient",
                      modelField: "description",
                      fieldValue: varient.description
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("span", { children: varient.description })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Feature 1:",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(varient.slug, "feature1")
                    }
                  ),
                  showInputField.slug === varient.slug && showInputField.field === "feature1" && /* @__PURE__ */ jsx(
                    EditProductField,
                    {
                      inputType: "input",
                      modelId: varient.id,
                      modelName: "varient",
                      modelField: "feature1",
                      fieldValue: varient.feature1
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("span", { children: varient.feature1 })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Feature 2:",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(varient.slug, "feature2")
                    }
                  ),
                  showInputField.slug === varient.slug && showInputField.field === "feature2" && /* @__PURE__ */ jsx(
                    EditProductField,
                    {
                      inputType: "input",
                      modelId: varient.id,
                      modelName: "varient",
                      modelField: "feature2",
                      fieldValue: varient.feature2
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("span", { children: varient.feature2 })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Feature 3:",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(varient.slug, "feature3")
                    }
                  ),
                  showInputField.slug === varient.slug && showInputField.field === "feature3" && /* @__PURE__ */ jsx(
                    EditProductField,
                    {
                      inputType: "input",
                      modelId: varient.id,
                      modelName: "varient",
                      modelField: "feature3",
                      fieldValue: varient.feature3
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("span", { children: varient.feature3 })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Product Size:",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(
                        varient.slug,
                        "size"
                      )
                    }
                  ),
                  showInputField.slug == varient.slug && showInputField.field == "size" && /* @__PURE__ */ jsx(
                    EditProductField,
                    {
                      inputType: "input",
                      modelId: varient.id,
                      modelName: "varient",
                      modelField: "size",
                      fieldValue: varient.size
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("span", { children: varient.size })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Quantity:",
                  /* @__PURE__ */ jsx(
                    MdEdit,
                    {
                      className: "inline-block mb-2",
                      onClick: () => handleShowInputField(
                        varient.slug,
                        "qty"
                      )
                    }
                  ),
                  showInputField.slug == varient.slug && showInputField.field == "qty" && /* @__PURE__ */ jsx(
                    EditProductField,
                    {
                      inputType: "input",
                      modelId: varient.id,
                      modelName: "varient",
                      modelField: "qty",
                      fieldValue: varient.qty
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("span", { children: varient.qty })
              ] })
            ] }, varient.id)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 mb-10 bg-gray-300 p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "columns-2 flex items-center", children: [
              "Designs",
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: "/admin_create_design",
                  data: { product: product.id },
                  children: /* @__PURE__ */ jsx(FaCirclePlus, { className: "ml-6 text-4xl hover:cursor-pointer" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { children: product.varients.map((varient) => /* @__PURE__ */ jsx("span", { children: varient.designs.map(
              (design) => /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-800 text-gray-100 mt-10 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Name:",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "name"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "name" && /* @__PURE__ */ jsx(
                      EditProductField,
                      {
                        inputType: "input",
                        modelId: design.id,
                        modelName: "design",
                        modelField: "name",
                        fieldValue: design.name
                      }
                    )
                  ] }),
                  " ",
                  /* @__PURE__ */ jsx("span", { children: design.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-800 text-gray-100 mt-10 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Size Image:",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "size_image"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "size_image" && /* @__PURE__ */ jsx(
                      ImageUploader,
                      {
                        uploadUrl: "edit_varient_small_image",
                        identifier: {
                          model: "design",
                          field: "size_image",
                          id: design.id
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `/storage/${design.size_image}`,
                      className: "columns-6 h-48 w-48 ml-10"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Description:",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "description"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "description" && /* @__PURE__ */ jsx(
                      EditProductField,
                      {
                        inputType: "textarea",
                        modelId: design.id,
                        modelName: "design",
                        modelField: "description",
                        fieldValue: design.description
                      }
                    )
                  ] }),
                  " ",
                  /* @__PURE__ */ jsx("span", { children: design.description })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Feature 1:",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "feature1"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "feature1" && /* @__PURE__ */ jsx(
                      EditProductField,
                      {
                        inputType: "input",
                        modelId: design.id,
                        modelName: "design",
                        modelField: "feature1",
                        fieldValue: design.feature1
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: design.feature1 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Feature 2:",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "feature2"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "feature2" && /* @__PURE__ */ jsx(
                      EditProductField,
                      {
                        inputType: "input",
                        modelId: design.id,
                        modelName: "design",
                        modelField: "feature2",
                        fieldValue: design.feature2
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: design.feature2 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Feature 3:",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "feature3"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "feature3" && /* @__PURE__ */ jsx(
                      EditProductField,
                      {
                        inputType: "input",
                        modelId: design.id,
                        modelName: "design",
                        modelField: "feature3",
                        fieldValue: design.feature3
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: design.feature3 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Material",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "material"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "material" && /* @__PURE__ */ jsx(
                      EditProductField,
                      {
                        inputType: "input",
                        modelId: design.id,
                        modelName: "material",
                        modelField: "name",
                        fieldValue: design.material
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: design.material })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "MRP:",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "mrp"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "mrp" && /* @__PURE__ */ jsx(
                      EditProductField,
                      {
                        inputType: "input",
                        modelId: design.id,
                        modelName: "design",
                        modelField: "mrp",
                        fieldValue: design.mrp
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: design.mrp })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Price:",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "price"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "price" && /* @__PURE__ */ jsx(
                      EditProductField,
                      {
                        inputType: "input",
                        modelId: design.id,
                        modelName: "design",
                        modelField: "price",
                        fieldValue: design.price
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: design.price })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Shipping Fees:",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "shipping_fee"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "shipping_fee" && /* @__PURE__ */ jsx(
                      EditProductField,
                      {
                        inputType: "input",
                        modelId: design.id,
                        modelName: "design",
                        modelField: "shipping_fee",
                        fieldValue: design.shipping_fee
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: design.shipping_fee })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Product Size:",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "size"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "size" && /* @__PURE__ */ jsx(
                      EditProductField,
                      {
                        inputType: "input",
                        modelId: design.id,
                        modelName: "design",
                        modelField: "size",
                        fieldValue: design.size
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: design.size })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Quantity:",
                    /* @__PURE__ */ jsx(
                      MdEdit,
                      {
                        className: "inline-block mb-2",
                        onClick: () => handleShowInputField(
                          design.slug,
                          "qty"
                        )
                      }
                    ),
                    showInputField.slug == design.slug && showInputField.field == "qty" && /* @__PURE__ */ jsx(
                      EditProductField,
                      {
                        inputType: "input",
                        modelId: design.id,
                        modelName: "design",
                        modelField: "qty",
                        fieldValue: design.qty
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: design.qty })
                ] })
              ] }, design.id)
            ) }, varient.id)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 mb-10 bg-gray-300 p-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              "Sizes:",
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: "/admin_create_size",
                  data: { product: product.id },
                  children: /* @__PURE__ */ jsx(FaCirclePlus, { className: "ml-6 text-4xl hover:cursor-pointer" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { children: product.varients.map((varient) => /* @__PURE__ */ jsx("span", { children: varient.designs.map(
              (design) => /* @__PURE__ */ jsx("span", { children: design.sizes.map(
                (size) => /* @__PURE__ */ jsxs(
                  "span",
                  {
                    children: [
                      /* @__PURE__ */ jsxs("p", { className: "grid grid-cols-2 bg-gray-800 text-gray-100 mt-10 p-3 mb-1", children: [
                        /* @__PURE__ */ jsxs("span", { children: [
                          "Name:",
                          /* @__PURE__ */ jsx(
                            MdEdit,
                            {
                              className: "inline-block mb-2",
                              onClick: () => handleShowInputField(
                                size.slug,
                                "name"
                              )
                            }
                          ),
                          showInputField.slug == size.slug && showInputField.field == "name" && /* @__PURE__ */ jsx(
                            EditProductField,
                            {
                              inputType: "input",
                              modelId: size.id,
                              modelName: "size",
                              modelField: "name",
                              fieldValue: size.name
                            }
                          )
                        ] }),
                        " ",
                        /* @__PURE__ */ jsx("span", { children: size.name })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 bg-gray-800 text-gray-100 mt-10 p-3 mb-1", children: [
                        /* @__PURE__ */ jsxs("span", { children: [
                          "Size Image:",
                          /* @__PURE__ */ jsx(
                            MdEdit,
                            {
                              className: "inline-block mb-2",
                              onClick: () => handleShowInputField(
                                size.slug,
                                "size_image"
                              )
                            }
                          ),
                          showInputField.slug == size.slug && showInputField.field == "size_image" && /* @__PURE__ */ jsx(
                            ImageUploader,
                            {
                              uploadUrl: "edit_varient_small_image",
                              identifier: {
                                model: "size",
                                field: "size_image",
                                id: size.id
                              }
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: `/storage/${size.size_image}`,
                            className: "columns-6 h-48 w-48 ml-10"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                        /* @__PURE__ */ jsxs("span", { children: [
                          "Description:",
                          /* @__PURE__ */ jsx(
                            MdEdit,
                            {
                              className: "inline-block mb-2",
                              onClick: () => handleShowInputField(
                                size.slug,
                                "description"
                              )
                            }
                          ),
                          showInputField.slug == size.slug && showInputField.field == "description" && /* @__PURE__ */ jsx(
                            EditProductField,
                            {
                              inputType: "textarea",
                              modelId: size.id,
                              modelName: "size",
                              modelField: "description",
                              fieldValue: size.description
                            }
                          )
                        ] }),
                        " ",
                        /* @__PURE__ */ jsx("span", { children: size.description })
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                        /* @__PURE__ */ jsxs("span", { children: [
                          "MRP:",
                          /* @__PURE__ */ jsx(
                            MdEdit,
                            {
                              className: "inline-block mb-2",
                              onClick: () => handleShowInputField(
                                size.slug,
                                "mrp"
                              )
                            }
                          ),
                          showInputField.slug == size.slug && showInputField.field == "mrp" && /* @__PURE__ */ jsx(
                            EditProductField,
                            {
                              inputType: "input",
                              modelId: size.id,
                              modelName: "size",
                              modelField: "mrp",
                              fieldValue: size.mrp
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx("span", { children: size.mrp })
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                        /* @__PURE__ */ jsxs("span", { children: [
                          "Price:",
                          /* @__PURE__ */ jsx(
                            MdEdit,
                            {
                              className: "inline-block mb-2",
                              onClick: () => handleShowInputField(
                                size.slug,
                                "price"
                              )
                            }
                          ),
                          showInputField.slug == size.slug && showInputField.field == "price" && /* @__PURE__ */ jsx(
                            EditProductField,
                            {
                              inputType: "input",
                              modelId: size.id,
                              modelName: "size",
                              modelField: "price",
                              fieldValue: size.price
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx("span", { children: size.price })
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                        /* @__PURE__ */ jsxs("span", { children: [
                          "Shipping Fees:",
                          /* @__PURE__ */ jsx(
                            MdEdit,
                            {
                              className: "inline-block mb-2",
                              onClick: () => handleShowInputField(
                                size.slug,
                                "shipping"
                              )
                            }
                          ),
                          showInputField.slug == size.slug && showInputField.field == "shipping" && /* @__PURE__ */ jsx(
                            EditProductField,
                            {
                              inputType: "input",
                              modelId: size.id,
                              modelName: "size",
                              modelField: "shipping",
                              fieldValue: size.shipping
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx("span", { children: size.shipping })
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "grid grid-cols-2 bg-gray-200 p-3 mb-1", children: [
                        /* @__PURE__ */ jsxs("span", { children: [
                          "Quantity:",
                          /* @__PURE__ */ jsx(
                            MdEdit,
                            {
                              className: "inline-block mb-2",
                              onClick: () => handleShowInputField(
                                size.slug,
                                "qty"
                              )
                            }
                          ),
                          showInputField.slug == size.slug && showInputField.field == "qty" && /* @__PURE__ */ jsx(
                            EditProductField,
                            {
                              inputType: "input",
                              modelId: size.id,
                              modelName: "size",
                              modelField: "qty",
                              fieldValue: size.qty
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx("span", { children: size.qty })
                      ] })
                    ]
                  },
                  size.id
                )
              ) }, design.id)
            ) }, varient.id)) })
          ] })
        ] }) }) }) }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs(Modal, { show: showModal.open, onClose: closeModal, children: [
          showModal.modalType == "varientModal" && /* @__PURE__ */ jsx(
            FormForAddingVarient,
            {
              formFor: "Varient",
              urlFor: "create_varient"
            }
          ),
          showModal.modalType == "designModal" && /* @__PURE__ */ jsx(FormForAddingDesign, { formFor: "Design", urlFor: "create_group" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("button", { onClick: closeModal, className: "bg-red-700 mb-7 w-48 text-center rounded-md text-white", children: "Close" }) })
        ] }) })
      ]
    }
  ) });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditProduct
}, Symbol.toStringTag, { value: "Module" }));
function Estimate$1({
  costing = [],
  installation = 0,
  estimates = [],
  material = {},
  materials = [],
  addons = [],
  cabinetTypes = [],
  embedded = false
  // 👈 Pass true when rendering inside dashboard to hide admin layout
}) {
  console.log(addons);
  const allMaterials = Array.isArray(materials) ? materials : [];
  const materialLookup2 = (name) => allMaterials.find((m) => m.name === name);
  const bodyMaterialObjects2 = allMaterials.filter(
    (m) => (m.categories || []).some((c) => c.name === "Cabinet Body")
  );
  const backMaterialObjects2 = allMaterials.filter(
    (m) => (m.categories || []).some((c) => c.name === "Back of Cabinet")
  );
  const shutterMaterialObjects2 = allMaterials.filter(
    (m) => (m.categories || []).some((c) => c.name === "Doors")
  );
  const laminateObjects2 = allMaterials.filter(
    (m) => (m.categories || []).some((c) => c.name === "Laminate")
  );
  const findCabinetTypeByName = (name) => cabinetTypes.find((ct) => ct.name === name);
  const [estimatesList2, setEstimatesList] = useState([]);
  const [selectedId2, setSelectedId] = useState("");
  const [currentEstimate2, setCurrentEstimate] = useState(null);
  const [materialSpecs2, setMaterialSpecs] = useState({
    bodyMaterial: "",
    bodyLaminate: "",
    backMaterial: "",
    backLaminate: "",
    shutterMaterial: "",
    shutterLaminate: ""
  });
  const [editMode2, setEditMode2] = useState({
    body: false,
    back: false,
    shutter: false
  });
  const [hardwareEdit2, setHardwareEdit] = useState({});
  const [hardwareSelections2, setHardwareSelections] = useState({});
  useEffect(() => {
    const sorted = [...estimates].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setEstimatesList(sorted);
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      setSelectedId(id);
      const client = sorted.find((e) => String(e.id) === id);
      setCurrentEstimate(client);
    } else {
      setSelectedId("");
      setCurrentEstimate(null);
    }
  }, [estimates]);
  useEffect(() => {
    var _a, _b, _c, _d;
    if (Object.keys(material).length > 0) {
      const getMat = (key) => materialLookup2(material[key]);
      const firstLam = ((_a = laminateObjects2[0]) == null ? void 0 : _a.name) || "";
      const bodyMat = getMat("bodyMaterial");
      const backMat = getMat("backMaterial");
      const shutterMat = getMat("shutterMaterial");
      setMaterialSpecs({
        bodyMaterial: material.bodyMaterial || ((_b = bodyMaterialObjects2[0]) == null ? void 0 : _b.name) || "",
        bodyLaminate: bodyMat && bodyMat.mica === 1 ? material.bodyLaminate || firstLam : "",
        backMaterial: material.backMaterial || ((_c = backMaterialObjects2[0]) == null ? void 0 : _c.name) || "",
        backLaminate: backMat && backMat.mica === 1 ? material.backLaminate || firstLam : "",
        shutterMaterial: material.shutterMaterial || ((_d = shutterMaterialObjects2[0]) == null ? void 0 : _d.name) || "",
        shutterLaminate: shutterMat && shutterMat.mica === 1 ? material.shutterLaminate || firstLam : ""
      });
    }
  }, [material, allMaterials.length]);
  const handleMaterialChange2 = (name, value) => {
    setMaterialSpecs((prev) => {
      var _a;
      const newState = { ...prev, [name]: value };
      if (name.endsWith("Material")) {
        const newMat = materialLookup2(value);
        const laminateKey = name.replace("Material", "Laminate");
        const firstLam = ((_a = laminateObjects2[0]) == null ? void 0 : _a.name) || "";
        newState[laminateKey] = newMat && newMat.mica === 1 ? firstLam : "";
      }
      return newState;
    });
  };
  const handleSubmitMaterials2 = () => {
    if (!selectedId2) return;
    router.post(`/${selectedId2}/edit_estimate_material`, materialSpecs2, {
      preserveScroll: true
    });
  };
  const initHardwareSelections = (cabinetId, cab) => {
    const cabinetType = findCabinetTypeByName(cab.name);
    let availableHardware = [];
    if (cabinetType && Array.isArray(cabinetType.materials)) {
      availableHardware = cabinetType.materials.filter(
        (m) => (m.categories || []).some((c) => c.name === "Hardware")
      );
    } else {
      availableHardware = (cab.hardware || []).map((h) => ({
        id: h.id,
        name: h.name,
        rate: h.rate || 0
      }));
    }
    const selectedMap = (cab.hardware || []).reduce((acc, h) => {
      acc[h.name] = { quantity: h.quantity || 0, rate: h.rate || 0 };
      return acc;
    }, {});
    const selectionObj = availableHardware.reduce((acc, h) => {
      const sel = selectedMap[h.name];
      acc[h.name] = {
        selected: Boolean(sel && sel.quantity > 0),
        quantity: sel ? sel.quantity : 1,
        rate: sel ? sel.rate : h.rate || 0
      };
      return acc;
    }, {});
    setHardwareSelections((prev) => ({ ...prev, [cabinetId]: selectionObj }));
  };
  const toggleHardwareEdit2 = (cab) => {
    const editing = Boolean(hardwareEdit2[cab.id]);
    if (!editing) {
      initHardwareSelections(cab.id, cab);
    }
    setHardwareEdit((prev) => ({ ...prev, [cab.id]: !editing }));
  };
  const handleHardwareSelect2 = (cabinetId, name, rate, checked) => {
    setHardwareSelections((prev) => {
      var _a, _b;
      const cabSel = { ...prev[cabinetId] || {} };
      if (checked) {
        cabSel[name] = { selected: true, quantity: ((_a = cabSel[name]) == null ? void 0 : _a.quantity) || 1, rate: rate || ((_b = cabSel[name]) == null ? void 0 : _b.rate) || 0 };
      } else {
        cabSel[name] = { ...cabSel[name] || { quantity: 1, rate: rate || 0 }, selected: false };
      }
      return { ...prev, [cabinetId]: cabSel };
    });
  };
  const handleHardwareQuantityChange2 = (cabinetId, name, qty) => {
    const numeric = Number(qty) || 0;
    setHardwareSelections((prev) => {
      var _a;
      return {
        ...prev,
        [cabinetId]: {
          ...prev[cabinetId],
          [name]: { ...prev[cabinetId][name], quantity: numeric, selected: numeric > 0 ? ((_a = prev[cabinetId][name]) == null ? void 0 : _a.selected) ?? true : false }
        }
      };
    });
  };
  const handleSaveHardware2 = (cabinetId) => {
    const selObj = hardwareSelections2[cabinetId] || {};
    const selectedHardware = Object.entries(selObj).filter(([_2, data]) => data.selected).map(([name, data]) => ({
      name,
      quantity: data.quantity
    }));
    router.post(`/update_hardware/${cabinetId}`, { hardware: selectedHardware }, {
      preserveScroll: true
    });
    setHardwareEdit((prev) => ({ ...prev, [cabinetId]: false }));
  };
  const calcHardwareCost2 = (hardware) => Array.isArray(hardware) ? hardware.reduce((sum, h) => sum + (Number(h.rate) || 0) * (Number(h.quantity) || 1), 0) : 0;
  const calcAddonCost = (addons2) => Array.isArray(addons2) ? addons2.reduce((sum, a) => sum + parseFloat(a.amount || 0), 0) : 0;
  const totalCabinets2 = costing.reduce((t, c) => t + (Number(c.cost) || 0), 0);
  const totalHardware2 = costing.reduce((t, c) => t + calcHardwareCost2(c.hardware), 0);
  const totalAddons2 = calcAddonCost(addons);
  const installationCost2 = Number(installation) || 0;
  const subtotal2 = totalCabinets2 + totalHardware2 + totalAddons2 + installationCost2;
  const gst2 = subtotal2 * 0.18;
  const grandTotal2 = subtotal2 + gst2;
  const hasResults2 = costing.length > 0;
  const content = /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-50 rounded-lg shadow-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 p-4 bg-white border rounded-lg shadow-sm", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-lg font-medium mb-2", children: "Select a Client Estimate:" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: selectedId2,
          onChange: (e) => {
            const id = e.target.value;
            window.location.href = id ? `${window.location.pathname}?id=${id}` : window.location.pathname;
          },
          className: "w-full border-gray-300 rounded-md",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "-- Select an Estimate --" }),
            estimatesList2.map((e) => /* @__PURE__ */ jsxs("option", { value: e.id, children: [
              e.clientName,
              " (",
              new Date(e.created_at).toLocaleDateString("en-US"),
              ")"
            ] }, e.id))
          ]
        }
      )
    ] }),
    currentEstimate2 && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-indigo-50 border rounded-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-indigo-700 mb-2", children: "Client Information" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Name:" }),
          " ",
          currentEstimate2.clientName
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Phone:" }),
          " ",
          currentEstimate2.clientPhone
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Address:" }),
          " ",
          currentEstimate2.address
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-yellow-50 border rounded-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-yellow-700 mb-4", children: "Material Specifications" }),
        ["body", "back", "shutter"].map((section) => {
          const selectedMat = materialLookup2(materialSpecs2[`${section}Material`]);
          const showLam = selectedMat && selectedMat.mica === 1;
          const labelMap = { body: "Body Material", back: "Back Panel", shutter: "Shutter" };
          const optionsMap = {
            body: bodyMaterialObjects2,
            back: backMaterialObjects2,
            shutter: shutterMaterialObjects2
          };
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxs("label", { className: "w-1/3 text-sm font-medium", children: [
              labelMap[section],
              ":"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-1/3", children: editMode2[section] ? /* @__PURE__ */ jsx(
              "select",
              {
                value: materialSpecs2[`${section}Material`],
                onChange: (e) => handleMaterialChange2(`${section}Material`, e.target.value),
                className: "w-full border rounded p-1 text-sm",
                children: optionsMap[section].map((opt) => /* @__PURE__ */ jsx("option", { value: opt.name, children: opt.name }, opt.name))
              }
            ) : /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-800", children: materialSpecs2[`${section}Material`] || "—" }) }),
            /* @__PURE__ */ jsx("div", { className: "w-1/3", children: showLam ? editMode2[section] ? /* @__PURE__ */ jsx(
              "select",
              {
                value: materialSpecs2[`${section}Laminate`],
                onChange: (e) => handleMaterialChange2(`${section}Laminate`, e.target.value),
                className: "w-full border rounded p-1 text-sm",
                children: laminateObjects2.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.name, children: opt.name }, opt.name))
              }
            ) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-800", children: materialSpecs2[`${section}Laminate`] || "—" }) : /* @__PURE__ */ jsx("p", { className: "text-xs italic text-gray-500", children: "Laminate N/A" }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  if (editMode2[section]) handleSubmitMaterials2();
                  setEditMode2((prev) => ({ ...prev, [section]: !prev[section] }));
                },
                className: "text-gray-500 hover:text-yellow-700 transition",
                children: editMode2[section] ? "✔️" : "✏️"
              }
            )
          ] }, section);
        })
      ] })
    ] }),
    hasResults2 && /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-gray-800", children: "Cabinet and Hardware Costs" }),
      /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 shadow-md rounded-lg", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold", children: "Cabinet" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold", children: "Size" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-semibold", children: "Cost" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold", children: "Hardware" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-semibold", children: "Hardware Cost" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: costing.map((cab) => {
          var _a;
          const cabinetType = findCabinetTypeByName(cab.name);
          const availableHardware = cabinetType && Array.isArray(cabinetType.materials) ? cabinetType.materials.filter(
            (m) => (m.categories || []).some((c) => c.name === "Hardware")
          ) : [];
          const hardwareTotal = calcHardwareCost2(cab.hardware);
          return /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: cab.name }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600", children: cab.size }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right font-bold text-green-700", children: [
              "₹",
              (Number(cab.cost) || 0).toFixed(2)
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: hardwareEdit2[cab.id] ? /* @__PURE__ */ jsxs("div", { children: [
              availableHardware.length ? availableHardware.map((h) => {
                var _a2;
                const state = ((_a2 = hardwareSelections2[cab.id]) == null ? void 0 : _a2[h.name]) || {};
                const selected = typeof state.selected === "boolean" ? state.selected : false;
                const qty = state.quantity ?? 1;
                const rate = state.rate ?? h.rate ?? 0;
                return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: selected,
                        onChange: (e) => handleHardwareSelect2(cab.id, h.name, rate, e.target.checked)
                      }
                    ),
                    h.name
                  ] }),
                  selected && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        min: "1",
                        value: qty,
                        onChange: (e) => handleHardwareQuantityChange2(cab.id, h.name, e.target.value),
                        className: "border w-16 text-center rounded"
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-700 ml-2", children: [
                      "₹",
                      (Number(qty) * Number(rate)).toFixed(2)
                    ] })
                  ] })
                ] }, h.id ?? h.name);
              }) : (
                // fallback: if there are no availableHardware (shouldn't happen if cabinetTypes is correct)
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "No hardware options available for this cabinet type." })
              ),
              /* @__PURE__ */ jsxs("div", { className: "text-right mt-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleSaveHardware2(cab.id),
                    className: "bg-green-600 text-white px-3 py-1 text-xs rounded mr-2",
                    children: "Save"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => toggleHardwareEdit2(cab),
                    className: "bg-gray-400 text-white px-3 py-1 text-xs rounded",
                    children: "Cancel"
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { children: [
              ((_a = cab.hardware) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside text-xs", children: cab.hardware.map((h, i) => /* @__PURE__ */ jsxs("li", { children: [
                h.name,
                " × ",
                h.quantity
              ] }, h.name + i)) }) : /* @__PURE__ */ jsx("p", { className: "text-gray-400 italic", children: "No hardware" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => toggleHardwareEdit2(cab),
                  className: "text-blue-600 text-xs underline mt-1",
                  children: "Edit"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right font-bold text-green-700", children: [
              "₹",
              hardwareTotal.toFixed(2)
            ] })
          ] }, cab.id);
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "min-w-full divide-y divide-gray-200 shadow-md rounded-lg", children: addons && addons.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-sm", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", children: "Additional Items" }),
        /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left border-b", children: [
            /* @__PURE__ */ jsx("th", { className: "py-2", children: "Item" }),
            /* @__PURE__ */ jsx("th", { className: "py-2", children: "Description" }),
            /* @__PURE__ */ jsx("th", { className: "py-2 text-right", children: "Amount (₹)" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: addons.map((item) => /* @__PURE__ */ jsxs("tr", { className: "border-b last:border-none", children: [
            /* @__PURE__ */ jsx("td", { className: "py-2", children: item.item_name }),
            /* @__PURE__ */ jsx("td", { className: "py-2 text-gray-600", children: item.description || "-" }),
            /* @__PURE__ */ jsx("td", { className: "py-2 text-right font-medium", children: Number(item.amount).toLocaleString("en-IN") })
          ] }, item.id)) })
        ] })
      ] }) })
    ] }),
    hasResults2 && /* @__PURE__ */ jsxs("div", { className: "p-6 bg-green-50 border rounded-lg max-w-md ml-auto shadow-md", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-green-800 mb-4", children: "Final Summary" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Cabinet & Material:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            totalCabinets2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Hardware:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            totalHardware2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Add-Ons:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            totalAddons2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Installation:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            installationCost2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-bold text-green-700 pt-2", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Before GST:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            subtotal2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-t border-green-300 pt-2", children: [
          /* @__PURE__ */ jsx("span", { children: "GST (18%):" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            gst2.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-2xl font-extrabold text-green-900 mt-2", children: [
          /* @__PURE__ */ jsx("span", { children: "GRAND TOTAL:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            grandTotal2.toFixed(2)
          ] })
        ] })
      ] })
    ] })
  ] });
  return embedded ? content : /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Estimate from Amaltas Furniture Studio & Modular Kitchens" }),
      children: [
        content,
        /* @__PURE__ */ jsxs("div", { className: "mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-3", children: "Warranty" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-decimal list-inside space-y-2 text-gray-700", children: [
            /* @__PURE__ */ jsx("li", { children: "We use branded components for manufacturing the kitchen. The components along with their brands are mentioned in the estimate." }),
            /* @__PURE__ */ jsx("li", { children: "Each component is covered under a warranty from its original manufacturer." }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Action Tesa HDHMR" }),
              " has a warranty of 7 Years, ",
              /* @__PURE__ */ jsx("strong", { children: "Action Tesa Boilo" }),
              " has a warranty of 21 Years."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Century Club Prime" }),
              " ply comes with a 25-year warranty against borer & termite attacks. ",
              /* @__PURE__ */ jsx("strong", { children: "Vimba Ply" }),
              " comes with a 15-year warranty."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Century Sainik 710 Ply" }),
              " has an 8-year warranty."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Hettich" }),
              " provides 2-year warranty on Hinges & Channels, and 5-year warranty on the Innotech Drawer System."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Service from our side will be free for ",
              /* @__PURE__ */ jsx("strong", { children: "two years" }),
              ". Thereafter it will be chargeable at ₹999 per visit."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Any damage to the kitchen caused by work of ",
              /* @__PURE__ */ jsx("strong", { children: "third-party vendors" }),
              "(stone work, civil work, plumbing, electrical, etc.) will ",
              /* @__PURE__ */ jsx("strong", { children: "not" }),
              " be covered under warranty and will be chargeable as per actuals."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "After work completion, we will clean the kitchen before handover. Post-handover cleaning ",
              /* @__PURE__ */ jsx("strong", { children: "is not covered" }),
              " under free service warranty."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Warranty will be ",
              /* @__PURE__ */ jsx("strong", { children: "void" }),
              " if any other carpenter or technician tampers with the kitchen or any components we manufactured."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Installation of Stone, Tiles, Chimney, Cooktop, Cylinder, Microwave, Oven, Geyser or any other appliance is ",
              /* @__PURE__ */ jsx("strong", { children: "not included" }),
              " unless explicitly mentioned."
            ] })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-8 mb-3", children: "Payments" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-2 text-gray-700", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "25% advance payment" }),
              " at order confirmation."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "25% payment" }),
              " at Carcase (body cabinet) installation."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "40% payment before installation" }),
              " of hardware & doors."
            ] }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("strong", { children: "10% after final handover." }) })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-8 mb-3", children: "Other Terms" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-decimal list-inside space-y-2 text-gray-700", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "Our scope of work ",
              /* @__PURE__ */ jsx("strong", { children: "does not include civil site preparation" }),
              " of any kind."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Goods remain our property" }),
              " until full payment is received."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "All warranties are applicable only after ",
              /* @__PURE__ */ jsx("strong", { children: "final payments" }),
              " are completed."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Any change in scope of work or drawing plans will be ",
              /* @__PURE__ */ jsx("strong", { children: "charged extra" }),
              "."
            ] })
          ] })
        ] })
      ]
    }
  );
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Estimate$1
}, Symbol.toStringTag, { value: "Module" }));
function EstimateInner(costing = [], installation = 0, estimates = [], material = {}, materials = [], addons = [], cabinetTypes = []) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-50 rounded-lg shadow-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 p-4 bg-white border rounded-lg shadow-sm", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-lg font-medium mb-2", children: "Select a Client Estimate:" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: selectedId,
          onChange: (e) => {
            const id = e.target.value;
            window.location.href = id ? `${window.location.pathname}?id=${id}` : window.location.pathname;
          },
          className: "w-full border-gray-300 rounded-md",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "-- Select a Client --" }),
            estimatesList.map((e) => /* @__PURE__ */ jsxs("option", { value: e.id, children: [
              e.clientName,
              " (",
              new Date(e.created_at).toLocaleDateString("en-US"),
              ")"
            ] }, e.id))
          ]
        }
      )
    ] }),
    currentEstimate && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-indigo-50 border rounded-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-indigo-700 mb-2", children: "Client Information" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Name:" }),
          " ",
          currentEstimate.clientName
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Phone:" }),
          " ",
          currentEstimate.clientPhone
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Address:" }),
          " ",
          currentEstimate.address
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-yellow-50 border rounded-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-yellow-700 mb-4", children: "Material Specifications" }),
        ["body", "back", "shutter"].map((section) => {
          const selectedMat = materialLookup(materialSpecs[`${section}Material`]);
          const showLam = selectedMat && selectedMat.mica === 1;
          const label = section === "body" ? "Body Material" : section === "back" ? "Back Panel" : "Shutter";
          const options = section === "body" ? bodyMaterialObjects : section === "back" ? backMaterialObjects : shutterMaterialObjects;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center justify-between space-x-2 mb-3",
              children: [
                /* @__PURE__ */ jsxs("label", { className: "w-1/3 text-sm font-medium", children: [
                  label,
                  ":"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-1/3", children: editMode[section] ? /* @__PURE__ */ jsx(
                  "select",
                  {
                    value: materialSpecs[`${section}Material`],
                    onChange: (e) => handleMaterialChange(`${section}Material`, e.target.value),
                    className: "w-full border rounded p-1 text-sm",
                    children: options.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.name, children: opt.name }, opt.name))
                  }
                ) : /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-800", children: materialSpecs[`${section}Material`] || "—" }) }),
                /* @__PURE__ */ jsx("div", { className: "w-1/3", children: showLam ? editMode[section] ? /* @__PURE__ */ jsx(
                  "select",
                  {
                    value: materialSpecs[`${section}Laminate`],
                    onChange: (e) => handleMaterialChange(`${section}Laminate`, e.target.value),
                    className: "w-full border rounded p-1 text-sm",
                    children: laminateObjects.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.name, children: opt.name }, opt.name))
                  }
                ) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-800", children: materialSpecs[`${section}Laminate`] || "—" }) : /* @__PURE__ */ jsx("p", { className: "text-xs italic text-gray-500", children: "Laminate N/A" }) }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      if (editMode[section]) handleSubmitMaterials();
                      setEditMode((prev) => ({
                        ...prev,
                        [section]: !prev[section]
                      }));
                    },
                    className: "text-gray-500 hover:text-yellow-700 transition",
                    children: editMode[section] ? "✔️" : "✏️"
                  }
                )
              ]
            },
            section
          );
        })
      ] })
    ] }),
    hasResults && /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-gray-800", children: "Cabinet and Hardware Costs" }),
      /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 shadow-md rounded-lg", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold", children: "Cabinet" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold", children: "Size" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-semibold", children: "Cost" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold", children: "Hardware" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-semibold", children: "Hardware Cost" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: costing.map((cab) => {
          var _a;
          const availableHardware = cabinetTypes.flatMap((ct) => ct.materials || []).filter((m) => (m.categories || []).some((c) => c.name === "Hardware"));
          const hardwareTotal = calcHardwareCost(cab.hardware);
          return /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: cab.name }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600", children: cab.size }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right font-bold text-green-700", children: [
              "₹",
              cab.cost.toFixed(2)
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: hardwareEdit[cab.id] ? /* @__PURE__ */ jsxs("div", { children: [
              availableHardware.map((h) => {
                var _a2, _b, _c, _d, _e, _f;
                const selected = ((_b = (_a2 = hardwareSelections[cab.id]) == null ? void 0 : _a2[h.name]) == null ? void 0 : _b.selected) || false;
                const qty = ((_d = (_c = hardwareSelections[cab.id]) == null ? void 0 : _c[h.name]) == null ? void 0 : _d.quantity) || 1;
                const rate = ((_f = (_e = hardwareSelections[cab.id]) == null ? void 0 : _e[h.name]) == null ? void 0 : _f.rate) || h.rate || 0;
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between mb-1",
                    children: [
                      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: selected,
                            onChange: (e) => handleHardwareSelect(
                              cab.id,
                              h.name,
                              h.rate,
                              e.target.checked
                            )
                          }
                        ),
                        h.name
                      ] }),
                      selected && /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "number",
                            min: "1",
                            value: qty,
                            onChange: (e) => handleHardwareQuantityChange(
                              cab.id,
                              h.name,
                              e.target.value
                            ),
                            className: "border w-16 text-center rounded"
                          }
                        ),
                        /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-700 ml-2", children: [
                          "₹",
                          (qty * rate).toFixed(2)
                        ] })
                      ] })
                    ]
                  },
                  h.id
                );
              }),
              /* @__PURE__ */ jsxs("div", { className: "text-right mt-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleSaveHardware(cab.id),
                    className: "bg-green-600 text-white px-3 py-1 text-xs rounded mr-2",
                    children: "Save"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => toggleHardwareEdit(cab),
                    className: "bg-gray-400 text-white px-3 py-1 text-xs rounded",
                    children: "Cancel"
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { children: [
              ((_a = cab.hardware) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside text-xs", children: cab.hardware.map((h, i) => /* @__PURE__ */ jsxs("li", { children: [
                h.name,
                " × ",
                h.quantity,
                " = ₹",
                (h.rate * h.quantity).toFixed(2)
              ] }, i)) }) : /* @__PURE__ */ jsx("p", { className: "text-gray-400 italic", children: "No hardware" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => toggleHardwareEdit(cab),
                  className: "text-blue-600 text-xs underline mt-1",
                  children: "Edit"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right font-bold text-green-700", children: [
              "₹",
              hardwareTotal.toFixed(2)
            ] })
          ] }, cab.id);
        }) })
      ] })
    ] }),
    hasResults && /* @__PURE__ */ jsxs("div", { className: "p-6 bg-green-50 border rounded-lg max-w-md ml-auto shadow-md", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-green-800 mb-4", children: "Final Summary" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Cabinet & Material:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            totalCabinets.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Hardware:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            totalHardware.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Add-Ons:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            totalAddons.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
          /* @__PURE__ */ jsx("span", { children: "Installation:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            installationCost.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-bold text-green-700 pt-2", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Before GST:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            subtotal.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-t border-green-300 pt-2", children: [
          /* @__PURE__ */ jsx("span", { children: "GST (18%):" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            gst.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-2xl font-extrabold text-green-900 mt-2", children: [
          /* @__PURE__ */ jsx("span", { children: "GRAND TOTAL:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            grandTotal.toFixed(2)
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EstimateInner
}, Symbol.toStringTag, { value: "Module" }));
function MapWithEditProduct({
  collection,
  postUrl,
  allCategories,
  allCabinetTypes,
  // ⬅️ 1. ACCEPT NEW PROP
  editableFields = ["name", "rate", "level", "length", "width", "description", "mica"],
  showImage = true,
  imageField = "image"
}) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [cabinetTypeData, setCabinetTypeData] = useState([]);
  function startEdit(item) {
    var _a, _b;
    setEditingId(item.id);
    setFormData(item);
    setCategoryData(((_a = item.categories) == null ? void 0 : _a.map((c) => c.name)) || []);
    setCabinetTypeData(((_b = item.cabinet_types) == null ? void 0 : _b.map((t) => t.name)) || []);
  }
  function cancelEdit() {
    setEditingId(null);
    setFormData({});
    setCategoryData([]);
    setCabinetTypeData([]);
  }
  function handleChange(field, value) {
    setFormData({
      ...formData,
      [field]: value
    });
  }
  function handleRelationshipToggle(dataArray, setDataFunction, itemName) {
    if (dataArray.includes(itemName)) {
      setDataFunction(dataArray.filter((n) => n !== itemName));
    } else {
      setDataFunction([...dataArray, itemName]);
    }
  }
  function saveEdit() {
    const payload = { id: editingId };
    editableFields.forEach((f) => {
      payload[f] = formData[f];
    });
    payload.categories = categoryData;
    payload.cabinet_types = cabinetTypeData;
    router.post(`/${postUrl}`, payload, {
      onSuccess: () => setEditingId(null)
    });
  }
  return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full border border-gray-300", children: [
    /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
      showImage && /* @__PURE__ */ jsx("th", { className: "border px-4 py-2", children: "Image" }),
      editableFields.map((field) => /* @__PURE__ */ jsx("th", { className: "border px-4 py-2 capitalize", children: field.replace("_", " ") }, field)),
      /* @__PURE__ */ jsx("th", { className: "border px-4 py-2", children: "Categories" }),
      /* @__PURE__ */ jsx("th", { className: "border px-4 py-2", children: "Cabinet Types" }),
      " ",
      /* @__PURE__ */ jsx("th", { className: "border px-4 py-2", children: "Action" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: collection.map((item) => {
      var _a, _b;
      return /* @__PURE__ */ jsxs("tr", { children: [
        showImage && /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: item[imageField] ? /* @__PURE__ */ jsx(
          "img",
          {
            src: `/storage/${item[imageField]}`,
            alt: item.name ?? "image",
            className: "w-16 h-16 object-cover rounded"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-16 h-16 flex items-center justify-center bg-gray-50 text-xs text-gray-500 rounded", children: "No image" }) }),
        editableFields.map((field) => /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: editingId === item.id ? field === "level" ? /* @__PURE__ */ jsxs(
          "select",
          {
            value: formData[field] ?? "",
            onChange: (e) => handleChange(field, e.target.value),
            className: "border rounded px-2 py-1 w-full",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "-- Select Level --" }),
              /* @__PURE__ */ jsx("option", { value: "strong_lovely", children: "Strong & Lovely" }),
              /* @__PURE__ */ jsx("option", { value: "strong_awesome", children: "Strong & Awesome" }),
              /* @__PURE__ */ jsx("option", { value: "vstrong_luxurious", children: "Very Strong & Luxurious" })
            ]
          }
        ) : field === "mica" ? /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: !!formData[field],
            onChange: (e) => handleChange(field, e.target.checked),
            className: "form-checkbox h-5 w-5"
          }
        ) : /* @__PURE__ */ jsx(
          "input",
          {
            type: ["rate", "length", "width"].includes(field) ? "number" : "text",
            value: formData[field] ?? "",
            onChange: (e) => handleChange(field, e.target.value),
            className: "border rounded px-2 py-1 w-full"
          }
        ) : /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: field === "mica" ? item[field] ? "✅ Yes" : "❌ No" : item[field] ?? /* @__PURE__ */ jsx("em", { className: "text-gray-400", children: "—" }) }) }, field)),
        /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: editingId === item.id ? /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: allCategories.map((c) => /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: categoryData.includes(c.name),
              onChange: () => handleRelationshipToggle(categoryData, setCategoryData, c.name),
              className: "form-checkbox"
            }
          ),
          /* @__PURE__ */ jsx("span", { children: c.name })
        ] }, c.id)) }) : /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: ((_a = item.categories) == null ? void 0 : _a.map((c) => c.name).join(", ")) || /* @__PURE__ */ jsx("em", { className: "text-gray-400", children: "—" }) }) }),
        /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: editingId === item.id ? /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: allCabinetTypes.map((t) => /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: cabinetTypeData.includes(t.name),
              onChange: () => handleRelationshipToggle(cabinetTypeData, setCabinetTypeData, t.name),
              className: "form-checkbox"
            }
          ),
          /* @__PURE__ */ jsx("span", { children: t.name })
        ] }, t.id)) }) : /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: ((_b = item.cabinet_types) == null ? void 0 : _b.map((t) => t.name).join(", ")) || /* @__PURE__ */ jsx("em", { className: "text-gray-400", children: "—" }) }) }),
        /* @__PURE__ */ jsx("td", { className: "border px-4 py-2 text-center", children: editingId === item.id ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(
            FaCheck,
            {
              className: "text-green-600 cursor-pointer text-xl",
              onClick: saveEdit,
              title: "Save"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: cancelEdit,
              className: "text-sm text-gray-600",
              children: "Cancel"
            }
          )
        ] }) : /* @__PURE__ */ jsx(
          MdEdit,
          {
            className: "text-red-700 cursor-pointer text-lg",
            onClick: () => startEdit(item)
          }
        ) })
      ] }, item.id);
    }) })
  ] }) });
}
const __vite_glob_0_46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MapWithEditProduct
}, Symbol.toStringTag, { value: "Module" }));
function FormForAddingMaterial({ urlFor, categories = [], cabinetTypes = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    rate: "",
    length: "",
    width: "",
    description: "",
    image: null,
    level: "",
    category_ids: [],
    cabinet_type_ids: [],
    mica: false
  });
  const [preview, setPreview] = useState(null);
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setData("image", file);
      setPreview(URL.createObjectURL(file));
    }
  }
  function toggleCabinetType(id, checked) {
    if (checked) {
      setData("cabinet_type_ids", [...data.cabinet_type_ids, id]);
    } else {
      setData(
        "cabinet_type_ids",
        data.cabinet_type_ids.filter((c) => c !== id)
      );
    }
  }
  function toggleCategory(id, checked) {
    if (checked) {
      setData("category_ids", [...data.category_ids, id]);
    } else {
      setData(
        "category_ids",
        data.category_ids.filter((c) => c !== id)
      );
    }
  }
  function submit(e) {
    e.preventDefault();
    const payload = {
      ...data,
      category_ids: data.category_ids.map((id) => parseInt(id, 10)),
      cabinet_type_ids: data.cabinet_type_ids.map((id) => parseInt(id, 10))
      // ⬅️ CLEAN NEW ARRAY
    };
    post(urlFor, {
      data: payload,
      onSuccess: () => {
        reset();
        setPreview(null);
      }
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-3xl bg-white p-6 rounded-xl shadow max-h-[80vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-center mb-6", children: "Add New Material" }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: submit,
        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
        encType: "multipart/form-data",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700", children: "Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700", children: "Rate" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.rate,
                onChange: (e) => setData("rate", e.target.value),
                className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              }
            ),
            errors.rate && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.rate })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700", children: "Length" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.length,
                onChange: (e) => setData("length", e.target.value),
                className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              }
            ),
            errors.length && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700", children: "Width" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.width,
                onChange: (e) => setData("width", e.target.value),
                className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              }
            ),
            errors.width && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.width })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700", children: "Description" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              }
            ),
            errors.description && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700 mb-2 font-semibold", children: "Cabinet Types" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-4 flex-wrap border p-3 rounded-md bg-gray-50", children: cabinetTypes.map((type) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer hover:bg-white p-1 rounded", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  value: type.id,
                  checked: data.cabinet_type_ids.includes(type.id),
                  onChange: (e) => toggleCabinetType(type.id, e.target.checked),
                  className: "rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "capitalize text-sm", children: type.name })
            ] }, type.id)) }),
            errors.cabinet_type_ids && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.cabinet_type_ids })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Level" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                name: "level",
                value: data.level,
                onChange: (e) => setData("level", e.target.value),
                className: "w-full border rounded px-3 py-2",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select Level" }),
                  /* @__PURE__ */ jsx("option", { value: "strong_lovely", children: "Strong & Lovely" }),
                  /* @__PURE__ */ jsx("option", { value: "strong_awesome", children: "Strong & Awesome" }),
                  /* @__PURE__ */ jsx("option", { value: "vstrong_luxurious", children: "Very Strong & Luxurious" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700 mb-2", children: "Categories" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-4 flex-wrap", children: categories.map((cat) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  value: cat.id,
                  checked: data.category_ids.includes(cat.id),
                  onChange: (e) => toggleCategory(cat.id, e.target.checked),
                  className: "rounded border-gray-300"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "capitalize", children: cat.name })
            ] }, cat.id)) }),
            errors.category_ids && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.category_ids })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700", children: "Mica" }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.mica,
                  onChange: (e) => setData("mica", e.target.checked),
                  className: "rounded border-gray-300"
                }
              ),
              /* @__PURE__ */ jsx("span", { children: data.mica ? "Yes (Requires Mica)" : "No ( PreLaminated)" })
            ] }),
            errors.mica && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.mica })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700", children: "Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                onChange: handleImageChange,
                className: "mt-1 block w-full"
              }
            ),
            preview && /* @__PURE__ */ jsx(
              "img",
              {
                src: preview,
                alt: "Preview",
                className: "mt-2 w-32 h-32 object-cover rounded"
              }
            ),
            errors.image && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.image })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-2 flex justify-center", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50",
              children: processing ? "Saving..." : "Save Material"
            }
          ) })
        ]
      }
    )
  ] });
}
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FormForAddingMaterial
}, Symbol.toStringTag, { value: "Module" }));
function Material({ materials, material_categories, cabinet_types }) {
  const [showModal, setShowModal] = useState({ open: false, modalType: "" });
  function closeModal() {
    setShowModal({ open: false, modalType: "" });
  }
  function openModal(modalFor) {
    setShowModal({
      open: true,
      modalType: modalFor
    });
  }
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Material Management" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Admin-Material" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: " bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl text-center font-bold mb-6", children: "Materials List" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx(
              MapWithEditProduct,
              {
                collection: materials,
                postUrl: "edit_material",
                arrowTrue: false,
                allCategories: material_categories,
                allCabinetTypes: cabinet_types,
                editableFields: [
                  "name",
                  "rate",
                  "description",
                  "level",
                  "mica"
                ]
              }
            ),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              FaCirclePlus,
              {
                className: "ml-6 mt-4 text-4xl text-blue-600 hover:text-blue-800 cursor-pointer transition",
                title: "Add New Material",
                onClick: () => openModal("materialModal")
              }
            ) })
          ] }) })
        ] }) }) }) }),
        /* @__PURE__ */ jsx(Modal, { show: showModal.open, onClose: closeModal, children: showModal.modalType === "materialModal" && /* @__PURE__ */ jsx(
          FormForAddingMaterial,
          {
            urlFor: "create_material",
            categories: material_categories,
            cabinetTypes: cabinet_types,
            onClose: closeModal
          }
        ) })
      ]
    }
  );
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Material
}, Symbol.toStringTag, { value: "Module" }));
function ClusterSelectionForm({ clusters, onClose, products, currentProduct, urlTo, heading }) {
  const product_current = products.find((p) => p.id === currentProduct);
  const list_of_clusters = (product_current == null ? void 0 : product_current.clusters) ?? [];
  const ids = list_of_clusters.map((cluster) => cluster.id);
  const { data, setData, post, processing, errors } = useForm({
    items: ids,
    product: currentProduct
  });
  const handleCheckboxChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      setData("items", [...data.items, value]);
    } else {
      setData("items", data.items.filter((id) => id !== value));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(urlTo);
    window.location.reload();
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 m-3", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold", children: [
      "Select ",
      heading,
      ":"
    ] }),
    clusters.map((cluster) => /* @__PURE__ */ jsxs("label", { className: "block", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          value: cluster.id,
          checked: data.items.includes(cluster.id),
          onChange: handleCheckboxChange,
          className: "mr-2"
        }
      ),
      cluster.name
    ] }, cluster.id)),
    errors.items && /* @__PURE__ */ jsx("div", { className: "text-red-500", children: errors.items }),
    /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "mt-4 px-4 py-2 bg-blue-600 text-white rounded", children: "Submit" })
  ] });
}
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ClusterSelectionForm
}, Symbol.toStringTag, { value: "Module" }));
function MapProducts({
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
    modelFor: ""
  });
  function handleClusterEdit(id, name) {
    setClusterEdit(id);
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  function inputChanged(e, id) {
    const value = {
      id,
      name: e.target.value
    };
    router.post(`/${postUrl}`, value);
    closeModal();
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
  const productList = collection.map((cluster) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "grid grid-cols-6 bg-gray-300 p-6 mb-1 text-center",
      children: [
        /* @__PURE__ */ jsx("div", { children: cluster.id }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "img",
          {
            src: `/storage/${cluster.thumbnail}`,
            width: "50px",
            className: "inline-block m-2"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          " ",
          /* @__PURE__ */ jsxs(Link, { href: "/admin_edit_product", data: { product: cluster.id }, children: [
            clusterEdit != cluster.id && cluster.name,
            clusterEdit == cluster.id && /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "cluster-name",
                onBlur: () => inputChanged(event, cluster.id),
                defaultValue: cluster.name,
                className: "rounded h-1 w-32"
              }
            ) }),
            clusterEdit != cluster.id && /* @__PURE__ */ jsx(
              MdEdit,
              {
                onClick: () => handleClusterEdit(cluster.id, cluster.name),
                className: "inline-block text-[12px] mb-2 ml-2 text-red-700"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "block ", children: cluster.varients.map((varient) => /* @__PURE__ */ jsxs(
              "span",
              {
                className: "text-left text-orange-600 block ml-2",
                children: [
                  /* @__PURE__ */ jsx("span", { children: varient.name }),
                  varient.designs.map((design) => /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: "text-green-600 block text-left ml-4",
                      children: [
                        /* @__PURE__ */ jsx("span", { children: design.name }),
                        design.sizes.map((size) => /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: "text-blue-400 block ml-6",
                            children: size.name
                          },
                          size.id
                        ))
                      ]
                    },
                    design.id
                  ))
                ]
              },
              varient.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: cluster.clusters.map((cluster2) => /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: cluster2.name }) }, cluster2.id)) }),
        /* @__PURE__ */ jsx("div", { children: cluster.groups.map((group) => /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: group.name }) }, group.id)) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => openModal(cluster.id, "forCluster"),
              className: "bg-sky-700 text-center hover:bg-sky-800 hover:cursor-pointer text-gray-200 block rounded-md m-1 px-3 py-1",
              children: "Edit Cluster"
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => openModal(cluster.id, "forGroup"),
              className: "bg-rose-800 text-center hover:bg-rose-900 hover:cursor-pointer text-gray-200 block rounded-md m-1 px-3 py-1",
              children: "Edit Group"
            }
          )
        ] })
      ]
    },
    cluster.id
  ));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-6 font-bold mb-2 text-center bg-gray-300 p-6 ", children: [
      /* @__PURE__ */ jsx("div", { children: "Id" }),
      /* @__PURE__ */ jsx("div", { children: "Image" }),
      /* @__PURE__ */ jsx("div", { children: "Product Name" }),
      /* @__PURE__ */ jsx("div", { children: "Cluster" }),
      /* @__PURE__ */ jsx("div", { children: "Group" }),
      /* @__PURE__ */ jsx("div", { children: "Action" })
    ] }),
    productList,
    /* @__PURE__ */ jsxs(Modal, { show: showModal.open, onClose: closeModal, children: [
      /* @__PURE__ */ jsx("div", { class: "flex", children: /* @__PURE__ */ jsx("button", { onClick: closeModal, className: "ml-auto  bg-red-600 text-white px-4 py-2", children: "X" }) }),
      showModal.modelFor === "forCluster" && /* @__PURE__ */ jsx(ClusterSelectionForm, { heading: "Clusters", urlTo: "edit_product_clusters", clusters, onClose: closeModal, products: collection, currentProduct: showModal.current_product_id }),
      showModal.modelFor === "forGroup" && /* @__PURE__ */ jsx(ClusterSelectionForm, { heading: "Groups", urlTo: "edit_product_groups", clusters: groups, onClose: closeModal, products: collection, currentProduct: showModal.current_product_id })
    ] })
  ] });
}
const __vite_glob_0_44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MapProducts
}, Symbol.toStringTag, { value: "Module" }));
function CreateProductModal({
  isOpen,
  onClose,
  storeUrl,
  onProductCreated,
  onCreateError
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    shippable: 0,
    thumbnail: null,
    small_image: null
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [smallImagePreview, setSmallImagePreview] = useState(null);
  const thumbnailInputRef = useRef(null);
  const smallImageInputRef = useRef(null);
  useEffect(() => {
    return () => {
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      if (smallImagePreview) URL.revokeObjectURL(smallImagePreview);
    };
  }, [thumbnailPreview, smallImagePreview]);
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setData(name, type === "checkbox" ? Number(checked) : value);
  };
  const handleFileChange = (e, field) => {
    var _a;
    const file = ((_a = e.target.files) == null ? void 0 : _a[0]) || null;
    setData(field, file);
    const setPreview = setSmallImagePreview;
    setPreview(file ? URL.createObjectURL(file) : null);
  };
  const clearForm = () => {
    reset();
    setThumbnailPreview(null);
    setSmallImagePreview(null);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
    if (smallImageInputRef.current) smallImageInputRef.current.value = "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(storeUrl, {
      preserveScroll: true,
      onSuccess: (page) => {
        clearForm();
        onClose();
        onProductCreated == null ? void 0 : onProductCreated(page);
      },
      onError: (errs) => {
        onCreateError == null ? void 0 : onCreateError(errs);
      }
    });
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative w-full max-w-2xl bg-white rounded-xl shadow-xl\n                       max-h-[90vh] overflow-y-auto p-6 sm:p-8",
      role: "dialog",
      "aria-modal": "true",
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600\n                           text-2xl leading-none",
            "aria-label": "Close modal",
            children: "×"
          }
        ),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-6 text-center", children: "Create New Product" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Product Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "name",
                value: data.name,
                onChange: handleChange,
                required: true,
                className: `w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2
                            ${errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}`
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm font-medium text-gray-700", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                name: "shippable",
                checked: !!data.shippable,
                onChange: handleChange,
                className: "h-4 w-4 rounded border-gray-300"
              }
            ),
            "Shippable"
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Small Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                ref: smallImageInputRef,
                accept: "image/*",
                onChange: (e) => handleFileChange(e, "small_image"),
                className: `block w-full text-sm rounded-lg border
                            ${errors.small_image ? "border-red-500" : "border-gray-300"}`
              }
            ),
            errors.small_image && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.small_image }),
            smallImagePreview && /* @__PURE__ */ jsx(
              "img",
              {
                src: smallImagePreview,
                alt: "Preview",
                className: "mt-3 h-24 object-contain rounded border"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: `w-full rounded-lg py-3 font-semibold text-white transition
                        ${processing ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`,
              children: processing ? "Creating…" : "Create Product"
            }
          )
        ] })
      ]
    }
  );
}
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateProductModal
}, Symbol.toStringTag, { value: "Module" }));
function ProductSearch({ initialQuery = "" }) {
  const [search, setSearch] = useState(initialQuery);
  const isInitialMount = useRef(true);
  const debouncedSearch = React.useRef(
    _.debounce((query) => {
      router.get(route("admin-product"), { search: query }, {
        preserveScroll: true,
        preserveState: true,
        replace: true
      });
    }, 500)
  ).current;
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      debouncedSearch(search);
    }
  }, [search, debouncedSearch]);
  return /* @__PURE__ */ jsx(
    "input",
    {
      type: "text",
      value: search,
      onChange: (e) => setSearch(e.target.value),
      placeholder: "Search products...",
      className: "border px-4 py-2 rounded mb-4"
    }
  );
}
const __vite_glob_0_48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductSearch
}, Symbol.toStringTag, { value: "Module" }));
function Product$1({ products, clusters, groups }) {
  const [showModal, setShowModal] = useState({ "product": false, "cluster": false });
  function addProduct() {
    setShowModal({
      ...showModal,
      "product": true
    });
  }
  function onClose() {
    setShowModal({
      ...showModal,
      "product": false,
      "cluster": false
    });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      AuthenticatedLayout,
      {
        header: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold leading-tight text-gray-800 flex justify-between", children: [
          "Products",
          /* @__PURE__ */ jsx(ProductSearch, {}),
          /* @__PURE__ */ jsx(PrimaryButton, { onClick: addProduct, children: "Add a Product" })
        ] }),
        children: [
          /* @__PURE__ */ jsx(Head, { title: "Products" }),
          /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: /* @__PURE__ */ jsx(MapProducts, { groups, collection: products.data, postUrl: "admin-product", clusters }) }) }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: products.links.map(
              (link, index) => link.url ? /* @__PURE__ */ jsx(
                Link,
                {
                  href: link.url,
                  className: `px-3 py-1 rounded border text-sm ${link.active ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`,
                  dangerouslySetInnerHTML: { __html: link.label }
                },
                index
              ) : /* @__PURE__ */ jsx(
                "span",
                {
                  className: "px-3 py-1 rounded border text-sm text-gray-400 bg-gray-100 cursor-not-allowed",
                  dangerouslySetInnerHTML: { __html: link.label }
                },
                index
              )
            ) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx(Modal, { show: showModal.product, children: /* @__PURE__ */ jsx(CreateProductModal, { storeUrl: "create_product", isOpen: showModal, onClose }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", {})
  ] });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Product$1
}, Symbol.toStringTag, { value: "Module" }));
function SiteUrlMapping({ urls }) {
  const updateNewUrl = (id, value) => {
    router.post(
      route("site-urls.update", id),
      {
        _method: "put",
        // ✅ This tells Laravel: "Treat this as a PUT"
        new_url: value || null
      },
      {
        preserveScroll: true,
        preserveState: true
      }
    );
  };
  return /* @__PURE__ */ jsx(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Site URL Mapping" }),
      children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-xl font-bold mb-4", children: [
          "URL Mapping (",
          urls.total,
          " found)"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border bg-white shadow-sm rounded-lg", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "border p-3 text-left w-1/2", children: "Old URL" }),
            /* @__PURE__ */ jsx("th", { className: "border p-3 text-left w-1/2", children: "New Target" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: urls.data.map((row) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ jsx("td", { className: "border p-3 text-sm text-gray-600 break-all", children: row.url }),
            /* @__PURE__ */ jsx("td", { className: "border p-3", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                defaultValue: row.new_url || "",
                className: "w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm",
                placeholder: "/products/new-sofa-name",
                onBlur: (e) => updateNewUrl(row.id, e.target.value)
              }
            ) })
          ] }, row.id)) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-1 justify-center", children: urls.links.map((link, index) => {
          const baseClasses = "px-3 py-1 border rounded text-sm";
          if (link.active) {
            return /* @__PURE__ */ jsx(
              "span",
              {
                className: `${baseClasses} bg-blue-600 text-white border-blue-600`,
                dangerouslySetInnerHTML: { __html: link.label }
              },
              index
            );
          }
          if (!link.url) {
            return /* @__PURE__ */ jsx(
              "span",
              {
                className: `${baseClasses} bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed`,
                dangerouslySetInnerHTML: { __html: link.label }
              },
              index
            );
          }
          return /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url,
              className: `${baseClasses} bg-white text-gray-700 border-gray-300 hover:bg-gray-100`,
              dangerouslySetInnerHTML: { __html: link.label }
            },
            index
          );
        }) })
      ] })
    }
  );
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SiteUrlMapping
}, Symbol.toStringTag, { value: "Module" }));
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx(
    "p",
    {
      ...props,
      className: "text-sm text-red-600 " + className,
      children: message
    }
  ) : null;
}
function InputLabel({
  value,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      ...props,
      className: `block text-sm font-medium text-gray-700 ` + className,
      children: value ? value : children
    }
  );
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a;
      return (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }));
  useEffect(() => {
    var _a;
    if (isFocused) {
      (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }, [isFocused]);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " + className,
      ref: localRef
    }
  );
});
function GuestLayout({ children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "h-20 w-20 fill-current text-gray-500" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg", children })
  ] }) });
}
function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "This is a secure area of the application. Please confirm your password before continuing." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Confirm" }) })
    ] })
  ] });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          className: "mt-1 block w-full",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Email Password Reset Link" }) })
    ] })
  ] });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
function Login({ status, canResetPassword }) {
  const { url } = usePage();
  const currentUrl = new URL(window.location.href);
  const redirectToParam = currentUrl.searchParams.get("redirect_to");
  const { data, setData, post, processing, errors, reset } = useForm({
    mobile: "",
    password: "",
    remember: false,
    redirect_to: redirectToParam || null
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "mobile", value: "Mobile" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "mobile",
            type: "text",
            name: "mobile",
            value: data.mobile,
            className: "mt-1 block w-full",
            autoComplete: "username",
            isFocused: true,
            onChange: (e) => setData("mobile", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.mobile, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "current-password",
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 block", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            name: "remember",
            checked: data.remember,
            onChange: (e) => setData("remember", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-gray-600", children: "Remember me" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-end", children: [
        canResetPassword && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("password.request"),
            className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            children: "Forgot your password?"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("register"),
            className: "rounded-md ml-4 text-md text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            children: "Sign Up"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Log in" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    mobile: "",
    password: "",
    password_confirmation: ""
  });
  const { url } = usePage();
  const currentUrl = new URL(window.location.href);
  const redirectToParam = currentUrl.searchParams.get("redirect_to");
  const submit = (e) => {
    e.preventDefault();
    const postUrl = redirectToParam ? route("register", { redirect_to: redirectToParam }) : route("register");
    post(postUrl, {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  const loginLinkHref = redirectToParam ? route("login", { redirect_to: redirectToParam }) : route("login");
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            name: "name",
            value: data.name,
            className: "mt-1 block w-full",
            autoComplete: "name",
            isFocused: true,
            onChange: (e) => setData("name", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "mobile", value: "Mobile No" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "mobile",
            type: "text",
            name: "mobile",
            value: data.mobile,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("mobile", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.mobile, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "pincode", value: "Pincode" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "pincode",
            type: "number",
            name: "pincode",
            value: data.pincode,
            className: "mt-1 block w-full",
            autoComplete: "pincode",
            onChange: (e) => setData("pincode", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.pincode, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "email",
            onChange: (e) => setData("email", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-end", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: loginLinkHref,
            className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            children: "Already registered?"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Register" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            id: "password_confirmation",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Reset Password" }) })
    ] })
  ] });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Resend Verification Email" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          children: "Log Out"
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
function CartDisplay({
  cartItems,
  totalItems,
  totalPrice,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onProceedToCheckout
}) {
  const calculateDiscountPercentage = (mrp, price) => {
    if (typeof mrp === "number" && typeof price === "number" && mrp > 0) {
      const discount = mrp - price;
      const percentage = discount / mrp * 100;
      return Math.round(percentage);
    }
    return 0;
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8 font-inter", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold text-gray-900 mb-8 text-center", children: "Your Shopping Cart" }),
    cartItems && cartItems.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:w-2/3 bg-white p-6 rounded-lg shadow-md", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-gray-800 mb-6", children: [
          "Items (",
          totalItems,
          ")"
        ] }),
        cartItems.map((item) => {
          var _a, _b, _c;
          return /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center border-b border-gray-200 py-4 last:border-b-0", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden mb-4 sm:mb-0 sm:mr-4", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${(_a = item.product) == null ? void 0 : _a.small_image}`,
                alt: ((_b = item.product) == null ? void 0 : _b.name) || "Product",
                className: "w-full h-full object-cover",
                onError: (e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/96x96/FF0000/FFFFFF?text=Error`;
                }
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-grow text-center sm:text-left mb-4 sm:mb-0", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: ((_c = item.product) == null ? void 0 : _c.name) || "Unknown Product" }),
              item.variant && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                "Variant: ",
                item.variant.name
              ] }),
              item.design && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                "Design: ",
                item.design.name
              ] }),
              item.size && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                "Size: ",
                item.size.name
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-center sm:justify-start mt-2", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm line-through mr-2", children: [
                  "MRP: ₹",
                  parseFloat(item.mrp).toFixed(2)
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-maroon-700", children: [
                  "₹",
                  parseFloat(item.price).toFixed(2)
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-600 ml-2", children: [
                  "(",
                  calculateDiscountPercentage(parseFloat(item.mrp), parseFloat(item.price)),
                  "% Off)"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center sm:items-end sm:ml-auto", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1)),
                    className: "px-3 py-1 bg-gray-200 rounded-l-md text-lg font-bold hover:bg-gray-300",
                    children: "−"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "w-14 text-center border-t border-b border-gray-300 py-1", children: item.quantity }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => onUpdateQuantity(item.id, item.quantity + 1),
                    className: "px-3 py-1 bg-gray-200 rounded-r-md text-lg font-bold hover:bg-gray-300",
                    children: "+"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => onRemoveItem(item.id),
                  className: "text-red-600 hover:text-red-800 text-sm font-semibold transition-colors duration-200",
                  children: "Remove"
                }
              )
            ] })
          ] }, item.id);
        })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Order Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-700", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Subtotal (",
              totalItems,
              " items)"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "₹",
              totalPrice.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-700", children: [
            /* @__PURE__ */ jsx("span", { children: "Shipping" }),
            /* @__PURE__ */ jsx("span", { children: "Calculated at checkout" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-lg font-bold text-gray-900 border-t pt-3 mt-3", children: [
            /* @__PURE__ */ jsx("span", { children: "Order Total" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "₹",
              totalPrice.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onProceedToCheckout,
            className: "w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-colors duration-200 shadow-md",
            children: "Proceed to Checkout"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClearCart,
            className: "w-full mt-4 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-300 transition-colors duration-200 shadow-md",
            children: "Clear Cart"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg shadow-md text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xl", children: "Your cart is empty." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-2", children: "Start shopping to add items!" })
    ] })
  ] });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CartDisplay
}, Symbol.toStringTag, { value: "Module" }));
const useGeolocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("requesting");
  const [locationError, setLocationError] = useState(null);
  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      try {
        const parsedLocation = JSON.parse(storedLocation);
        setUserLocation(parsedLocation);
        setLocationStatus("granted");
        console.log("User location loaded from localStorage:", parsedLocation);
        return;
      } catch (e) {
        console.error("Failed to parse stored location from localStorage:", e);
        localStorage.removeItem("userLocation");
      }
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationData = { latitude, longitude };
          setUserLocation(locationData);
          localStorage.setItem("userLocation", JSON.stringify(locationData));
          setLocationStatus("granted");
          setLocationError(null);
          console.log("User location granted and saved:", locationData);
        },
        (err) => {
          console.warn(`Geolocation error (${err.code}): ${err.message}`);
          if (err.code === err.PERMISSION_DENIED) {
            setLocationStatus("denied");
            setLocationError("Location access denied by user. Some features might be limited.");
          } else {
            setLocationStatus("error");
            setLocationError(`Location error: ${err.message}.`);
          }
          localStorage.removeItem("userLocation");
        },
        { enableHighAccuracy: true, timeout: 1e4, maximumAge: 0 }
        // Options for geolocation
      );
    } else {
      setLocationStatus("error");
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);
  return { userLocation, locationStatus, locationError };
};
function TopStrip() {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "transform scale-100 sm:scale-100 md:scale-100 lg:scale-100 xs:scale-90 bg-gradient-to-r from-maroon-50 to-maroon-100 flex align-middle justify-between text-maroon-700",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex align-middle", children: [
          /* @__PURE__ */ jsx(FaLocationPin, { className: "mt-1 ml-4 mr-1 " }),
          "GMS Road, Dehradun"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex align-middle", children: [
          /* @__PURE__ */ jsx("a", { href: "https://wa.me/9368330915", target: "_blank", children: /* @__PURE__ */ jsx(FaWhatsappSquare, { className: "text-green-600  text-2xl" }) }),
          /* @__PURE__ */ jsx(IoCallOutline, { className: "mt-1 ml-1 mr-1" }),
          /* @__PURE__ */ jsx("span", { className: "mr-4", children: "9368330915" })
        ] })
      ]
    }
  );
}
const __vite_glob_0_75 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TopStrip
}, Symbol.toStringTag, { value: "Module" }));
const SearchBar = ({ searchUrl, debounceTime = 300, minQueryLength = 3, classes }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef(null);
  const wrapperRef = useRef(null);
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (query.length >= minQueryLength) {
      setLoading(true);
      setError(null);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await fetch(`${searchUrl}?q=${encodeURIComponent(query)}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setResults(data);
          setShowResults(true);
        } catch (e) {
          console.error("Search failed:", e);
          setError("Failed to fetch search results. Please try again.");
          setResults([]);
          setShowResults(true);
        } finally {
          setLoading(false);
        }
      }, debounceTime);
    } else {
      setResults([]);
      setLoading(false);
      setError(null);
      setShowResults(false);
    }
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, searchUrl, debounceTime, minQueryLength]);
  useEffect(() => {
    const handleClickOutside = (event2) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event2.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length >= minQueryLength) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };
  const handleResultClick = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative ", ref: wrapperRef, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        className: classes,
        placeholder: "Search Products",
        value: query,
        onChange: handleInputChange,
        onFocus: () => {
          if (query.length >= minQueryLength) setShowResults(true);
        }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-gray-700", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }),
    showResults && (query.length >= minQueryLength || loading || error) && /* @__PURE__ */ jsxs("div", { className: "absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 overflow-hidden max-h-80 overflow-y-auto", children: [
      loading && /* @__PURE__ */ jsx("div", { className: "p-4 text-center text-gray-500", children: "Loading..." }),
      error && /* @__PURE__ */ jsx("div", { className: "p-4 text-center text-red-500", children: error }),
      !loading && !error && results.length === 0 && query.length >= minQueryLength && /* @__PURE__ */ jsxs("div", { className: "p-4 text-center text-gray-500", children: [
        'No results found for "',
        query,
        '".'
      ] }),
      !loading && !error && results.length > 0 && /* @__PURE__ */ jsx("ul", { children: results.map((item) => (
        // Dynamically link based on item type and ID
        /* @__PURE__ */ jsx("li", { className: "border-b border-gray-100 last:border-b-0", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: `${item.slug}?id=${item.type}`,
            className: "flex items-center p-3 hover:bg-gray-50 transition-colors duration-200",
            onClick: handleResultClick,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 mr-3", children: [
                item.image && // Display image if available
                /* @__PURE__ */ jsx("img", { src: `storage/${item.image}`, alt: item.name, className: "w-8 h-8 rounded-full object-cover" }),
                !item.image && // Placeholder if no image
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500", children: item.type[0].toUpperCase() })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-semibold text-gray-800", children: item.name }),
                item.description && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mt-1 truncate", children: item.description })
              ] })
            ]
          }
        ) }, `${item.type}-${item.id}`)
      )) })
    ] })
  ] });
};
const __vite_glob_0_72 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SearchBar
}, Symbol.toStringTag, { value: "Module" }));
function UserRegister({ add_class }) {
  const { auth } = usePage().props;
  const user = auth.user;
  return /* @__PURE__ */ jsx(Fragment, { children: user ? (
    // If user is logged in, display the profile dropdown.
    // Removed 'hidden' class to make it visible on all screen sizes,
    // but kept 'sm:ms-6 sm:flex sm:items-center' for desktop alignment.
    /* @__PURE__ */ jsx("div", { className: "sm:ms-6 sm:flex sm:items-center", children: /* @__PURE__ */ jsx("div", { className: "relative ms-3", children: /* @__PURE__ */ jsxs(Dropdown, { children: [
      /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-md", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          className: "inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none",
          children: [
            user.name && /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base uppercase mr-2 md:hidden", children: user.name.charAt(0) }),
            /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: user.name }),
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "-me-0.5 ms-2 h-4 w-4",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                    clipRule: "evenodd"
                  }
                )
              }
            )
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsxs(Dropdown.Content, { children: [
        /* @__PURE__ */ jsx(
          Dropdown.Link,
          {
            href: route("dashboard"),
            children: "Dashboard"
          }
        ),
        /* @__PURE__ */ jsx(
          Dropdown.Link,
          {
            href: route("logout"),
            method: "post",
            as: "button",
            children: "Log Out"
          }
        )
      ] })
    ] }) }) })
  ) : (
    // If no user is logged in, display the Login/Register link.
    /* @__PURE__ */ jsxs(Link, { href: "/login", children: [
      " ",
      /* @__PURE__ */ jsxs("div", { className: add_class, children: [
        " ",
        /* @__PURE__ */ jsx(FaRegUser, {}),
        " ",
        /* @__PURE__ */ jsx("span", { className: "hidden md:block lg:block xl:block", children: "Login/Register" })
      ] })
    ] })
  ) });
}
const __vite_glob_0_76 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UserRegister
}, Symbol.toStringTag, { value: "Module" }));
const isBrowser = typeof window !== "undefined";
const CartContext = createContext(null);
const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};
const CartProvider = ({ children, initialCartItems = [] }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (!isBrowser) return [];
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    if (!initialCartItems || !Array.isArray(initialCartItems)) return;
    setCartItems(initialCartItems);
  }, [initialCartItems]);
  useEffect(() => {
    if (!isBrowser) return;
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch {
    }
  }, [cartItems]);
  const addItemToCart = useCallback((product, quantity = 1) => {
    if (!product || quantity <= 0) return;
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + quantity
        };
        return next;
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);
  const removeItemFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);
  const updateItemQuantity = useCallback((id, qty) => {
    setCartItems(
      (prev) => qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map(
        (i) => i.id === id ? { ...i, quantity: qty } : i
      )
    );
  }, []);
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  const totalItems = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  );
  const totalPrice = useMemo(
    () => cartItems.reduce(
      (sum, i) => sum + Number(i.price || 0) * i.quantity,
      0
    ),
    [cartItems]
  );
  const value = useMemo(
    () => ({
      cartItems,
      totalItems,
      totalPrice,
      addItemToCart,
      removeItemFromCart,
      updateItemQuantity,
      clearCart
    }),
    [
      cartItems,
      totalItems,
      totalPrice,
      addItemToCart,
      removeItemFromCart,
      updateItemQuantity,
      clearCart
    ]
  );
  return /* @__PURE__ */ jsx(CartContext.Provider, { value, children });
};
function Cart({ linkTo = "/cart" }) {
  const { cartItems, totalItems } = useCart();
  const handleCartClick = async () => {
    if (cartItems.length === 0) {
      console.log("Cart is empty on frontend, no data to sync with backend.");
      return;
    }
    cartItems.map((item) => ({
      productId: item.product_id,
      varientId: item.varient_id || null,
      // Changed to varientId to match backend
      designId: item.design_id || null,
      sizeId: item.size_id || null,
      quantity: item.quantity,
      price: item.price,
      mrp: item.mrp
    }));
    const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute("content") : null;
    if (!csrfToken) {
      console.error("CSRF token meta tag not found. Cannot send cart data securely.");
      return;
    }
  };
  return /* @__PURE__ */ jsxs(
    Link,
    {
      href: linkTo,
      className: "relative p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2",
      "aria-label": "Shopping Cart",
      onClick: handleCartClick,
      children: [
        /* @__PURE__ */ jsx(LuShoppingCart, { className: "text-3xl", id: "cart-icon" }),
        totalItems > 0 && /* @__PURE__ */ jsx("span", { className: "absolute top-[8px] right-[8px] px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full leading-none transform translate-x-1/2 -translate-y-1/2", children: totalItems })
      ]
    }
  );
}
const __vite_glob_0_62 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cart
}, Symbol.toStringTag, { value: "Module" }));
function SecondStrip() {
  const { totalItems } = useCart();
  return /* @__PURE__ */ jsxs("div", { className: "m-4 flex justify-between align-middle items-center", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx("img", { src: "/storage/images/logo.png", className: "sm:h-11 h-5" }) }),
    /* @__PURE__ */ jsx(SearchBar, { searchUrl: "search", classes: "w-64 p-3 pl-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(Cart, { items: totalItems, className: "text-maroon-800" }),
      /* @__PURE__ */ jsx(UserRegister, { add_class: "pr-5 pl-1 flex flex-col items-center text-maro  on-900" })
    ] })
  ] });
}
const __vite_glob_0_73 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SecondStrip
}, Symbol.toStringTag, { value: "Module" }));
const CategoryMenu = ({ clusters }) => {
  const { totalItems } = useCart();
  const [activeClusterId, setActiveClusterId] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef(null);
  const updateMenuHeight = useCallback(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.offsetHeight);
    }
  }, []);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(updateMenuHeight);
    if (menuRef.current) {
      resizeObserver.observe(menuRef.current);
      updateMenuHeight();
    }
    const onScroll = () => {
      setSticky(window.scrollY >= window.innerHeight);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [updateMenuHeight]);
  const handleHover = (id) => {
    if (window.innerWidth >= 768) setActiveClusterId(id);
  };
  const handleLeave = () => {
    if (window.innerWidth >= 768) setActiveClusterId(null);
  };
  const toggleMobileCluster = (id) => {
    setActiveClusterId((prev) => prev === id ? null : id);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isSticky && /* @__PURE__ */ jsx("div", { style: { height: menuHeight } }),
    /* @__PURE__ */ jsxs(
      "nav",
      {
        ref: menuRef,
        onMouseLeave: handleLeave,
        className: `bg-white shadow-md transition-all duration-300 ${isSticky ? "fixed top-0 left-0 w-full z-30" : "relative"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "md:hidden flex items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setShowMobileMenu(!showMobileMenu), children: "☰" }),
            /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx("img", { src: "/storage/images/logo.png", alt: "Logo", className: "h-8" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Cart, { items: totalItems }),
              /* @__PURE__ */ jsx(UserRegister, { add_class: "text-xl" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:hidden px-4 pb-3", children: /* @__PURE__ */ jsx(
            SearchBar,
            {
              searchUrl: "search",
              classes: "w-full p-3 pl-10 rounded-xl border border-gray-300"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsx(
            "ul",
            {
              className: `
              flex flex-col
              md:flex-row md:justify-between
              w-full
              px-4 md:px-8
              pb-4 md:pb-0
              ${showMobileMenu ? "block" : "hidden md:flex"}
            `,
              children: clusters.map((cluster) => {
                var _a, _b;
                return /* @__PURE__ */ jsxs(
                  "li",
                  {
                    className: "relative md:flex-1 md:text-center group",
                    onMouseEnter: () => handleHover(cluster.id),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between md:block py-3 md:py-4", children: [
                        /* @__PURE__ */ jsxs(
                          Link,
                          {
                            href: `/${cluster.slug}`,
                            data: { id: "cluster" },
                            className: "\n                      flex items-center gap-3\n                      md:flex-col md:items-center md:gap-2\n                    ",
                            children: [
                              !isSticky && cluster.image && /* @__PURE__ */ jsx(
                                "img",
                                {
                                  src: `/storage/${cluster.image}`,
                                  alt: cluster.name,
                                  className: "w-10 h-10 md:w-14 md:h-14\n                            rounded-md object-cover\n                            transition-transform duration-300 ease-out\n                            group-hover:scale-110",
                                  onError: (e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://placehold.co/56x56?text=${cluster.name.charAt(
                                      0
                                    )}`;
                                  }
                                }
                              ),
                              /* @__PURE__ */ jsx("span", { className: "text-sm md:text-base font-semibold text-gray-800\n\n      transition-transform duration-300 ease-out\n      group-hover:scale-110\n\n                    ", children: cluster.name })
                            ]
                          }
                        ),
                        ((_a = cluster.groups) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            className: "md:hidden w-8 h-8 flex items-center justify-center border rounded-full",
                            onClick: (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleMobileCluster(cluster.id);
                            },
                            children: activeClusterId === cluster.id ? "−" : "+"
                          }
                        )
                      ] }),
                      activeClusterId === cluster.id && ((_b = cluster.groups) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "\n                         border rounded-lg shadow-md\n                        md:absolute bg-gray-200\nmd:top-full\nmd:left-1/2\nmd:-translate-x-1/2\nmd:max-w-[90vw]\nmd:w-64\n\n\n                        mt-2 md:mt-0\n                        z-20\n                      ",
                          children: /* @__PURE__ */ jsx("ul", { className: "py-2", children: cluster.groups.map((group) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                            Link,
                            {
                              href: `/${group.slug}`,
                              data: { id: "group" },
                              className: "flex items-center gap-3 px-4 py-2 hover:bg-gray-100",
                              onClick: () => {
                                setActiveClusterId(null);
                                setShowMobileMenu(false);
                              },
                              children: [
                                group.thumbnail ? /* @__PURE__ */ jsx(
                                  "img",
                                  {
                                    src: `/storage/${group.thumbnail}`,
                                    alt: group.name,
                                    className: "w-8 h-8 rounded-full object-cover"
                                  }
                                ) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs", children: group.name.charAt(0) }),
                                /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: group.name })
                              ]
                            }
                          ) }, group.id)) })
                        }
                      )
                    ]
                  },
                  cluster.id
                );
              })
            }
          ) })
        ]
      }
    )
  ] });
};
const __vite_glob_0_63 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CategoryMenu
}, Symbol.toStringTag, { value: "Module" }));
const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("footer", { className: "bg-maroon-800 text-maroon-200 py-10 px-4 sm:px-6 lg:px-8 font-inter", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-2", children: "About Us" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/about-us", className: "hover:text-maroon-400 transition-colors duration-200", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/locate-us", className: "hover:text-maroon-400 transition-colors duration-200", children: "Our Location" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/contact-us", className: "hover:text-maroon-400 transition-colors duration-200", children: "Contact Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://wa.me/9368330915", target: "_blank", rel: "noopener noreferrer", className: "hover:text-maroon-400 transition-colors duration-200", children: "WhatsApp Us" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-2", children: "Services" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/custom-furniture", className: "hover:text-maroon-400 transition-colors duration-200", children: "Custom Furniture" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/exports", className: "hover:text-maroon-400 transition-colors duration-200", children: "Exports" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-2", children: "Policies" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/shipping-policy", className: "hover:text-maroon-400 transition-colors duration-200", children: "Shipping Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/return-policy", className: "hover:text-maroon-400 transition-colors duration-200", children: "Return Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/terms-of-use", className: "hover:text-maroon-400 transition-colors duration-200", children: "Terms of Use" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 lg:col-span-1 space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-2", children: "Connect With Us" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-6", children: [
          /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/amaltasfurniture", target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", children: /* @__PURE__ */ jsx(FaInstagram, { className: "text-3xl hover:text-maroon-400 transition-colors duration-200" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/@amaltasfurniture", target: "_blank", rel: "noopener noreferrer", "aria-label": "YouTube", children: /* @__PURE__ */ jsx(FaYoutube, { className: "text-3xl hover:text-maroon-400 transition-colors duration-200" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/amaltasfurniture", target: "_blank", rel: "noopener noreferrer", "aria-label": "Facebook", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-gray-400 hover:text-maroon-600 transition-colors duration-200", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.24.195 2.24.195v2.454H15.83c-1.222 0-1.604.755-1.604 1.54V12h2.77l-.443 2.891h-2.327v6.987C18.343 21.128 22 16.991 22 12z" }) }) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.pinterest.com/amaltasfurniture", target: "_blank", rel: "noopener noreferrer", "aria-label": "Pinterest", children: /* @__PURE__ */ jsx(FaPinterest, { className: "text-3xl hover:text-maroon-400 transition-colors duration-200" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-maroon-700 mt-8 pt-6 text-center text-maroon-500 text-sm", children: [
      "© ",
      currentYear,
      " Amaltas Furniture Studio. All rights reserved."
    ] })
  ] });
};
const __vite_glob_0_65 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Footer
}, Symbol.toStringTag, { value: "Module" }));
function ShareButton({ className = "" }) {
  const { url } = usePage();
  const [fullUrl, setFullUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}${url}`);
    }
  }, [url]);
  const handleShare = async () => {
    if (!fullUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: fullUrl
        });
      } catch {
      }
    } else {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  if (!fullUrl) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleShare,
        "aria-label": "Share this page",
        className: `w-9 h-9 flex items-center justify-center rounded-full hover:bg-maroon-500 hover:ring-8 hover:ring-maroon-500 transition ${className}`,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/storage/icons/share.png",
            alt: "Share",
            className: "w-10 h-10 opacity-80 group-hover:opacity-100 transition"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2\n                whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white\n                opacity-0 group-hover:opacity-100 transition pointer-events-none", children: copied ? "Link copied!" : "Share this page" })
  ] });
}
function Welcome({ clusters, children, title, description }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: title || "Amaltas Furniture & Modular Kitchens | Dehradun" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: description || "Premium modular kitchens, wardrobes, wooden furniture, and home interior solutions. Visit our showroom on GMS Road, Dehradun."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("script", { async: true, src: "https://www.googletagmanager.com/gtag/js?id=UA-103104998-2" }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "canonical",
          href: "https://amaltasfurniture.com/"
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://amaltasfurniture.com/" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:title",
          content: title || "Amaltas Furniture & Modular Kitchens | Dehradun"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: description || "Premium home furniture, modular kitchens, wardrobes, and interiors in Dehradun."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:image",
          content: "https://amaltasfurniture.com/storage/images/ban1.png"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:title",
          content: title || "Amaltas Furniture & Modular Kitchens"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: description || "Premium furniture & modular kitchens in Dehradun."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:image",
          content: "https://amaltasfurniture.com/storage/images/ban1.png"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "geo.region", content: "IN-UT" }),
      /* @__PURE__ */ jsx("meta", { name: "geo.placename", content: "Dehradun" }),
      /* @__PURE__ */ jsx("meta", { name: "geo.position", content: "30.3165;78.0322" }),
      /* @__PURE__ */ jsx("meta", { name: "ICBM", content: "30.3165, 78.0322" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { style: { display: "none" }, children: [
      /* @__PURE__ */ jsx(Link, { href: "/sofas?id=cluster", children: "Sofas" }),
      /* @__PURE__ */ jsx(Link, { href: "/bedroom?id=cluster", children: "Bedroom" }),
      /* @__PURE__ */ jsx(Link, { href: "/dining?id=cluster", children: "Dining" }),
      /* @__PURE__ */ jsx(Link, { href: "/wardrobes?id=cluster", children: "Wardrobes" }),
      /* @__PURE__ */ jsx(Link, { href: "/modular-kitchens?id=cluster", children: "Kitchens" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-5 right-5 z-50", children: /* @__PURE__ */ jsx(ShareButton, { className: "bg-maroon-200 ring-8 ring-maroon-200 shadow-lg" }) }),
    /* @__PURE__ */ jsx(TopStrip, {}),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(SecondStrip, {}) }),
    /* @__PURE__ */ jsx(CategoryMenu, { clusters }),
    /* @__PURE__ */ jsx("main", { children }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: `
                {
                    "@context": "https://schema.org",
                    "@type": "FurnitureStore",
                    "name": "Amaltas Furniture & Modular Kitchens",
                    "image": "https://amaltasfurniture.com/storage/images/ban1.png",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "GMS Road",
                        "addressLocality": "Dehradun",
                        "addressRegion": "Uttarakhand",
                        "postalCode": "248001",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 30.3165,
                        "longitude": 78.0322
                    },
                    "url": "https://amaltasfurniture.com",
                    "telephone": "+919368330915",
                    "openingHours": "Mo-Su 10:00-20:00",
                    "priceRange": "₹₹₹",
                    "sameAs": [
                        "https://www.instagram.com/amaltasfurniture/",
                        "https://www.facebook.com/amaltasfurniture/",
                        "https://www.google.com/maps/place/Amaltas+Furniture/"
                    ]
                }
                ` })
  ] });
}
const __vite_glob_0_85 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
function CartPage({ itemData, clusters }) {
  const { userLocation, locationStatus, locationError } = useGeolocation();
  console.log(userLocation, locationStatus, locationError);
  const { removeItemFromCart, updateItemQuantity, clearCart, fetchCartItemsFromBackend } = useCart();
  const { auth } = usePage().props;
  const user = auth.user;
  const createCompositeId = (productId, varientId, designId, sizeId) => {
    const idParts = [`v${productId + varientId}`];
    if (designId) {
      idParts.push(`d${designId}`);
    }
    if (sizeId) {
      idParts.push(`s${sizeId}`);
    }
    return idParts.join("-");
  };
  const transformedCartItems = useMemo(() => {
    if (!itemData) return [];
    return itemData.map((item) => ({
      // Use the composite ID as the primary identifier for frontend rendering
      // This is crucial for React's reconciliation and consistent keying.
      id: createCompositeId(item.product_id, item.varient_id, item.design_id, item.size_id),
      // Changed to item.varient_id
      // Keep original backend IDs for backend communication
      product_id: item.product_id,
      varient_id: item.varient_id,
      // Changed to varient_id
      design_id: item.design_id,
      size_id: item.size_id,
      quantity: item.quantity,
      price: parseFloat(item.price),
      // Ensure price is a number
      mrp: parseFloat(item.mrp),
      // Ensure MRP is a number
      // Pass through eager-loaded relations for display
      product: item.product,
      varient: item.varient,
      // Changed to varient
      design: item.design,
      size: item.size
    }));
  }, [itemData]);
  const totalItems = useMemo(() => {
    return transformedCartItems.reduce((total, item) => total + item.quantity, 0);
  }, [transformedCartItems]);
  const totalPrice = useMemo(() => {
    return transformedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [transformedCartItems]);
  const getCsrfToken = () => {
    const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
    return csrfTokenMeta ? csrfTokenMeta.getAttribute("content") : null;
  };
  const sendSpecificCartUpdate = useCallback(async (endpoint, payload) => {
    const csrfToken = getCsrfToken();
    if (!csrfToken) {
      console.error("CSRF token meta tag not found. Cannot send cart data securely.");
      alert("Security error: CSRF token missing. Please refresh the page.");
      return false;
    }
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Failed to update cart via ${endpoint}:`, response.status, errorData);
        alert(`Failed to update cart: ${errorData.message || "An error occurred."}`);
        return false;
      } else {
        console.log(`Cart update via ${endpoint} successful!`);
        return true;
      }
    } catch (error) {
      console.error(`Network error while updating cart via ${endpoint}:`, error);
      alert("Network error. Please check your connection.");
      return false;
    }
  }, []);
  const handleRemoveItem = useCallback(async (compositeProductId) => {
    const itemToRemove = itemData.find(
      (item) => createCompositeId(item.product_id, item.varient_id, item.design_id, item.size_id) === compositeProductId
      // Changed to item.varient_id
    );
    if (!itemToRemove) {
      console.warn("Attempted to remove non-existent item:", compositeProductId);
      return;
    }
    const payload = {
      product_id: itemToRemove.product_id,
      varient_id: itemToRemove.varient_id || null,
      // Changed to varient_id
      design_id: itemToRemove.design_id || null,
      size_id: itemToRemove.size_id || null
    };
    console.log("Sending removeItem payload to backend:", payload);
    const success = await sendSpecificCartUpdate("/api/cart/remove-item", payload);
    if (success) {
      removeItemFromCart(compositeProductId);
      router.reload({ only: ["itemData"] });
    }
  }, [itemData, sendSpecificCartUpdate]);
  const handleUpdateQuantity = useCallback(async (compositeProductId, newQuantity) => {
    const itemToUpdate = itemData.find(
      (item) => createCompositeId(item.product_id, item.varient_id, item.design_id, item.size_id) === compositeProductId
      // Changed to item.varient_id
    );
    if (!itemToUpdate) {
      console.warn("Attempted to update quantity for non-existent item:", compositeProductId);
      return;
    }
    fetchCartItemsFromBackend();
    const payload = {
      product_id: itemToUpdate.product_id,
      varient_id: itemToUpdate.varient_id || null,
      // Changed to varient_id
      design_id: itemToUpdate.design_id || null,
      size_id: itemToUpdate.size_id || null,
      quantity: newQuantity
    };
    console.log("Sending updateItemQuantity payload to backend:", payload);
    const success = await sendSpecificCartUpdate("/api/cart/update-quantity", payload);
    if (success) {
      updateItemQuantity(compositeProductId, newQuantity);
      router.reload({ only: ["itemData"] });
    }
  }, [itemData, sendSpecificCartUpdate]);
  const handleClearCart = useCallback(async () => {
    console.log("Sending clearCart request to backend.");
    const success = await sendSpecificCartUpdate("/api/cart/clear", {});
    if (success) {
      clearCart();
      router.reload({ only: ["itemData"] });
    }
  }, [sendSpecificCartUpdate]);
  const handleProceedToCheckout = useCallback(() => {
    if (!user) {
      alert("Please sign up or log in to proceed to checkout.");
      router.visit(route("register", { redirect_to: "/checkout" }));
      return;
    }
    const checkoutPayload = itemData.map((item) => ({
      product_id: item.product_id,
      varient_id: item.varient_id || null,
      design_id: item.design_id || null,
      size_id: item.size_id || null,
      quantity: item.quantity,
      price: item.price,
      mrp: item.mrp
    }));
    const requestData = {
      cart_contents: checkoutPayload,
      latitude: null,
      // Explicitly initialize to null
      longitude: null
      // Explicitly initialize to null
    };
    console.log("--- handleProceedToCheckout: Location Debugging ---");
    console.log("Current locationStatus:", locationStatus);
    console.log("Current userLocation (loc):", userLocation);
    console.log("Current locationError:", locationError);
    if (locationStatus === "granted" && userLocation) {
      requestData.latitude = userLocation.latitude;
      requestData.longitude = userLocation.longitude;
      console.log("Sending location data with checkout payload:", userLocation);
    }
    router.get(route("checkout.show"), requestData, {
      onStart: () => console.log("Initiating checkout..."),
      onSuccess: (page) => {
        console.log("Checkout initiated successfully! Redirecting to confirmation page.", page);
      },
      onError: (errors) => {
        console.error("Failed to initiate checkout:", errors);
        alert("Failed to proceed to checkout. Please try again.");
      },
      onFinish: () => {
        console.log("Checkout request finished.");
      }
    });
  }, [itemData, user]);
  return /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsx(
    CartDisplay,
    {
      cartItems: transformedCartItems,
      totalItems,
      totalPrice,
      onRemoveItem: handleRemoveItem,
      onUpdateQuantity: handleUpdateQuantity,
      onClearCart: handleClearCart,
      onProceedToCheckout: handleProceedToCheckout
    }
  ) });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CartPage
}, Symbol.toStringTag, { value: "Module" }));
function Checkout({ itemData, clusters, user, userAddresses, userLocation }) {
  const { clearCart, fetchCartItemsFromBackend } = useCart();
  const { data, setData, post, processing, errors, reset } = useForm({
    name: (user == null ? void 0 : user.name) || "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: (user == null ? void 0 : user.pincode) || "",
    mobile: (user == null ? void 0 : user.mobile) || "",
    latitude: (userLocation == null ? void 0 : userLocation.latitude) || null,
    longitude: (userLocation == null ? void 0 : userLocation.longitude) || null,
    cart_contents: []
  });
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const transformedCartItems = useMemo(() => {
    if (!itemData) return [];
    return itemData.map((item) => ({
      id: `v${item.varient_id}${item.design_id ? `-d${item.design_id}` : ""}${item.size_id ? `-s${item.size_id}` : ""}`,
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
      size: item.size
    }));
  }, [itemData]);
  const totalPrice = useMemo(() => {
    return transformedCartItems.reduce(
      (t, i) => t + i.price * i.quantity,
      0
    );
  }, [transformedCartItems]);
  useEffect(() => {
    if ((userAddresses == null ? void 0 : userAddresses.length) > 0 && selectedAddressId === "") {
      const first = userAddresses[0];
      setSelectedAddressId(first.id);
      setData((d) => ({
        ...d,
        address_line1: first.address_line1 || "",
        address_line2: first.address_line2 || "",
        city: first.city || "",
        state: first.state || ""
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
        state: ""
      }));
      return;
    }
    const selected = userAddresses == null ? void 0 : userAddresses.find((a) => a.id == id);
    if (selected) {
      setData((d) => ({
        ...d,
        address_line1: selected.address_line1,
        address_line2: selected.address_line2 || "",
        city: selected.city,
        state: selected.state
      }));
    }
  };
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
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
      mrp: item.mrp
    }));
    setData((d) => ({
      ...d,
      cart_contents: payload
    }));
    post(route("checkout.confirm"), {
      preserveScroll: true,
      onSuccess: () => {
        console.log("Checkout → Confirmation page loaded");
      },
      onError: (errs) => {
        console.error(errs);
        alert("Please correct highlighted errors.");
      }
    });
  };
  return /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-8 text-center", children: "Checkout" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxs("section", { className: "lg:w-2/3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-700 mb-4", children: "Shipping Address" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          (userAddresses == null ? void 0 : userAddresses.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Select Saved Address:" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: selectedAddressId,
                onChange: handleAddressSelect,
                className: "border rounded w-full p-2",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "new_address", children: "-- Enter New Address --" }),
                  userAddresses.map((a) => /* @__PURE__ */ jsxs("option", { value: a.id, children: [
                    a.address_line1,
                    ", ",
                    a.city,
                    ",",
                    " ",
                    a.state
                  ] }, a.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-bold", children: "Full Name:" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "name",
                  value: data.name,
                  onChange: handleChange,
                  className: "border p-2 w-full rounded"
                }
              ),
              errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-bold", children: "Mobile:" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "mobile",
                  value: data.mobile,
                  onChange: handleChange,
                  className: "border p-2 w-full rounded"
                }
              ),
              errors.mobile && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.mobile })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-bold", children: "Address Line 1:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "address_line1",
                value: data.address_line1,
                onChange: handleChange,
                className: "border p-2 w-full rounded"
              }
            ),
            errors.address_line1 && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.address_line1 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-bold", children: "Address Line 2 (Optional):" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "address_line2",
                value: data.address_line2,
                onChange: handleChange,
                className: "border p-2 w-full rounded"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-bold", children: "Pincode:" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "pincode",
                  value: data.pincode,
                  onChange: handleChange,
                  className: "border p-2 w-full rounded",
                  maxLength: "6"
                }
              ),
              errors.pincode && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.pincode })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-bold", children: "City:" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "city",
                  value: data.city,
                  onChange: handleChange,
                  className: "border p-2 w-full rounded"
                }
              ),
              errors.city && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.city })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-bold", children: "State:" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "state",
                  value: data.state,
                  onChange: handleChange,
                  className: "border p-2 w-full rounded"
                }
              ),
              errors.state && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.state })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: `w-full bg-maroon-600 text-white py-3 rounded-lg font-bold ${processing ? "opacity-50 cursor-not-allowed" : "hover:bg-maroon-700"}`,
              children: processing ? "Processing..." : "Proceed to Payment"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "lg:w-1/3 bg-white p-6 rounded-lg shadow-md border", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Order Summary" }),
        transformedCartItems.map((item) => {
          var _a, _b;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center border-b py-4",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: ((_a = item.product) == null ? void 0 : _a.small_image) ? `/storage/${item.product.small_image}` : "https://placehold.co/60",
                    className: "w-16 h-16 rounded object-cover mr-3"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold", children: (_b = item.product) == null ? void 0 : _b.name }),
                  item.varient && /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
                    "Variant: ",
                    item.varient.name
                  ] }),
                  item.design && /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
                    "Design: ",
                    item.design.name
                  ] }),
                  item.size && /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
                    "Size: ",
                    item.size.name
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                    "Qty: ",
                    item.quantity
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "font-bold", children: [
                  "₹",
                  (item.price * item.quantity).toFixed(
                    2
                  )
                ] })
              ]
            },
            item.id
          );
        }),
        /* @__PURE__ */ jsx("div", { className: "pt-4 mt-4 border-t", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-semibold", children: [
          /* @__PURE__ */ jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            totalPrice.toFixed(2)
          ] })
        ] }) })
      ] })
    ] })
  ] }) }) });
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Checkout
}, Symbol.toStringTag, { value: "Module" }));
function OutsideDoon({ clusters, slug }) {
  console.log(clusters, slug);
  const phone = "919368330915";
  const message = `www.amaltasfurniture.com/${slug}?id=product`;
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsx("div", { className: "bg-gray-100 flex items-center justify-center min-h-screen p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center border border-gray-200", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-6", children: "More Information Required" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-4 rounded mb-6",
        role: "alert",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-1", children: "One or more products in your order list may not be easily shippable." }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", children: "We are based in Dehradun. To determine the exact shipping cost please contact us:" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: whatsappLink,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "\n                            flex items-center justify-center gap-2\n                            bg-green-500 hover:bg-green-600\n                            text-white font-semibold\n                            px-5 py-3 rounded-lg\n                            shadow-md hover:shadow-lg\n                            transition-all duration-200\n                            w-full\n                        ",
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-6 w-6",
              viewBox: "0 0 32 32",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M16.003 3C9.376 3 4 8.375 4 15c0 2.64.869 5.086 2.341 7.074L4 29l7.115-2.297A11.88 11.88 0 0 0 16.003 27C22.628 27 28 21.627 28 15S22.628 3 16.003 3zm0 22c-1.82 0-3.52-.497-4.988-1.36l-.356-.21-4.223 1.363 1.38-4.118-.23-.378A9.94 9.94 0 0 1 6 15c0-5.514 4.487-10 10.003-10S26 9.486 26 15s-4.487 10-9.997 10zm5.287-7.316c-.292-.146-1.723-.852-1.99-.95-.268-.098-.463-.146-.657.146-.195.293-.754.95-.925 1.145-.171.195-.342.22-.634.073-.292-.146-1.233-.455-2.35-1.45-.868-.773-1.454-1.73-1.625-2.022s-.018-.45.128-.596c.132-.132.293-.342.439-.512.146-.171.195-.293.293-.488.098-.195.049-.366-.024-.512-.073-.146-.657-1.586-.902-2.171-.238-.571-.481-.494-.657-.502l-.561-.01c-.195 0-.512.073-.78.366-.268.293-1.024 1-1.024 2.439 0 1.439 1.048 2.834 1.193 3.029.146.195 2.06 3.148 5.02 4.414.702.303 1.249.484 1.676.62.703.224 1.343.192 1.848.117.564-.084 1.723-.703 1.967-1.382.244-.68.244-1.264.171-1.382-.073-.117-.268-.195-.561-.341z" })
            }
          ),
          "Connect on WhatsApp"
        ]
      }
    )
  ] }) }) });
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OutsideDoon
}, Symbol.toStringTag, { value: "Module" }));
const PaymentConfirmation = ({ clusters, cartItems, totalAmount, shippingDetails, userLocation, orderId }) => {
  console.log(userLocation);
  const { flash } = usePage().props;
  const initialSuccessMessage = flash == null ? void 0 : flash.successMessage;
  const { fetchCartItemsFromBackend } = useCart();
  const [loadingCashfreeScript, setLoadingCashfreeScript] = useState(true);
  const [cashfreeDetails, setCashfreeDetails] = useState(null);
  const [cashfreePaymentInitiated, setCashfreePaymentInitiated] = useState(false);
  const [cashfreeInstance, setCashfreeInstance] = useState(null);
  const [fetchingPaymentDetails, setFetchingPaymentDetails] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(initialSuccessMessage || "Review your order and choose a payment option.");
  const [messageType, setMessageType] = useState(initialSuccessMessage ? "success" : "info");
  const getCsrfToken = useCallback(() => {
    const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
    return csrfTokenMeta ? csrfTokenMeta.getAttribute("content") : null;
  }, []);
  const loadCashfreeScript = useCallback(() => {
    console.log("Cashfree Script: Attempting to load Cashfree SDK.");
    return new Promise((resolve) => {
      if (typeof window.Cashfree !== "undefined") {
        console.log("Cashfree Script: Cashfree SDK already loaded.");
        setCashfreeInstance(new window.Cashfree());
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.onload = () => {
        console.log("Cashfree Script: Cashfree SDK loaded successfully.");
        setCashfreeInstance(new window.Cashfree());
        resolve(true);
      };
      script.onerror = () => {
        console.error("Cashfree Script: Cashfree SDK failed to load.");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }, []);
  useEffect(() => {
    const loadScript = async () => {
      setLoadingCashfreeScript(true);
      const scriptLoaded = await loadCashfreeScript();
      if (!scriptLoaded) {
        setPaymentError("Cashfree SDK failed to load. Please check your internet connection.");
      }
      setLoadingCashfreeScript(false);
    };
    loadScript();
  }, [loadCashfreeScript]);
  const openCashfreePopup = useCallback(() => {
    console.log("openCashfreePopup: Called.");
    if (!cashfreeDetails || !cashfreeInstance || cashfreePaymentInitiated) {
      console.error("openCashfreePopup: Conditions not met to open Cashfree popup. Details:", {
        cashfreeDetailsPresent: !!cashfreeDetails,
        cashfreeInstancePresent: !!cashfreeInstance,
        paymentAlreadyInitiated: cashfreePaymentInitiated
      });
      if (!cashfreeDetails) {
        setPaymentError("Payment details not received from server. Please try again.");
      } else if (!cashfreeInstance) {
        setPaymentError("Cashfree SDK is not loaded. Please refresh the page.");
      }
      return;
    }
    setCashfreePaymentInitiated(true);
    const checkoutOptions = {
      paymentSessionId: cashfreeDetails.payment_session_id,
      redirectTarget: "_self",
      // Use "_self" to redirect within the current window/iframe
      mode: "redirect"
      // Required parameter for redirect flow
    };
    console.log("openCashfreePopup: --- Initiating Cashfree Checkout ---");
    console.log("openCashfreePopup: cashfreeInstance:", cashfreeInstance);
    console.log("openCashfreePopup: checkoutOptions:", checkoutOptions);
    console.log("openCashfreePopup: Payment Session ID being used:", cashfreeDetails.payment_session_id);
    console.assert(cashfreeInstance, "Cashfree instance is null/undefined before checkout!");
    console.assert(cashfreeDetails.payment_session_id, "Payment Session ID is null/empty before checkout!");
    try {
      cashfreeInstance.checkout(checkoutOptions).then(function(result) {
        console.log("Cashfree checkout result (might be undefined for redirect flow):", result);
        if (result && result.error) {
          console.error("Cashfree checkout failed with error in result:", result.error);
          setPaymentError(result.error.message || "Cashfree payment failed to initiate (result error).");
          setCurrentMessage(result.error.message || "Cashfree payment failed to initiate.");
          setMessageType("error");
          setCashfreePaymentInitiated(false);
          router.visit(route("cart.index"), { preserveScroll: true, preserveState: false, replace: true, data: { flash: { error: result.error.message || "Cashfree payment failed to initiate." } } });
        }
      }).catch(function(error) {
        console.error("Cashfree checkout failed (Promise rejected):", error);
        setPaymentError(error.message || "Cashfree payment failed to initiate. Please try again.");
        setCurrentMessage(error.message || "Cashfree payment failed to initiate.");
        setMessageType("error");
        setCashfreePaymentInitiated(false);
        router.visit(route("cart.index"), { preserveScroll: true, preserveState: false, replace: true, data: { flash: { error: error.message || "Cashfree payment failed to initiate." } } });
      });
      console.log("openCashfreePopup: cashfreeInstance.checkout() was called.");
    } catch (syncError) {
      console.error("openCashfreePopup: Synchronous error calling cashfreeInstance.checkout():", syncError);
      setPaymentError(syncError.message || "A critical error occurred during Cashfree payment initiation.");
      setCurrentMessage(syncError.message || "A critical error occurred during Cashfree payment initiation.");
      setMessageType("error");
      setCashfreePaymentInitiated(false);
      router.visit(route("cart.index"), { preserveScroll: true, preserveState: false, replace: true, data: { flash: { error: syncError.message || "A critical error occurred during Cashfree payment initiation." } } });
    }
  }, [cashfreeDetails, cashfreeInstance, cashfreePaymentInitiated, router]);
  useEffect(() => {
    console.log("useEffect (cashfreeDetails change): Triggered. States:", {
      cashfreeDetailsPresent: !!cashfreeDetails,
      cashfreePaymentInitiated,
      loadingCashfreeScript,
      fetchingPaymentDetails,
      // Use combined fetching state
      cashfreeInstancePresent: !!cashfreeInstance
    });
    if (cashfreeDetails && cashfreeInstance && !cashfreePaymentInitiated && !loadingCashfreeScript && !fetchingPaymentDetails) {
      console.log("useEffect (cashfreeDetails change): Conditions met, calling openCashfreePopup.");
      openCashfreePopup();
    }
  }, [cashfreeDetails, cashfreeInstance, cashfreePaymentInitiated, loadingCashfreeScript, fetchingPaymentDetails, openCashfreePopup]);
  const handleProceedToPayment = async (paymentType) => {
    console.log(`handleProceedToPayment: Button clicked. Payment type: ${paymentType}`);
    if (fetchingPaymentDetails || loadingCashfreeScript || cashfreePaymentInitiated) {
      console.warn("handleProceedToPayment: Preventing multiple clicks or premature action. States:", { fetchingPaymentDetails, loadingCashfreeScript, cashfreePaymentInitiated });
      return;
    }
    if (!cartItems || cartItems.length === 0 || !orderId || totalAmount === void 0) {
      console.error("handleProceedToPayment: Order details missing, cannot proceed.");
      setPaymentError("Order details are missing. Please go back to your cart to initiate checkout.");
      setCurrentMessage("Order details are missing. Please go back to your cart to initiate checkout.");
      setMessageType("error");
      return;
    }
    setFetchingPaymentDetails(true);
    setPaymentError(null);
    setCurrentMessage(`Preparing for Cashfree ${paymentType === "full" ? "online payment" : "partial COD payment"}...`);
    setMessageType("info");
    const csrfToken = getCsrfToken();
    if (!csrfToken) {
      console.error("handleProceedToPayment: CSRF token missing.");
      setPaymentError("Security error: CSRF token missing. Please refresh the page.");
      setCurrentMessage("Security error: CSRF token missing. Please refresh the page.");
      setMessageType("error");
      setFetchingPaymentDetails(false);
      return;
    }
    let amountToPay = totalAmount;
    if (paymentType === "partial_cod") {
      const partialAmount = totalAmount * 0.1;
      amountToPay = Math.round(partialAmount / 1e3) * 1e3;
      if (amountToPay < 100 && amountToPay > 0) {
        amountToPay = 100;
      } else if (amountToPay <= 0) {
        amountToPay = 0;
      }
    }
    console.log(`handleProceedToPayment: Calculated amountToPay for Cashfree ${paymentType}: ${amountToPay}`);
    try {
      const response = await fetch(route("checkout.get-cashfree-details"), {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": csrfToken },
        body: JSON.stringify({ order_id: orderId, payment_type: paymentType, amount_to_pay: amountToPay })
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`handleProceedToPayment: API call failed for Cashfree details:`, errorData);
        setPaymentError(errorData.message || `Failed to prepare Cashfree payment. Please try again.`);
        setCurrentMessage(errorData.message || `Failed to prepare Cashfree payment. Please try again.`);
        setMessageType("error");
        return;
      }
      const data = await response.json();
      console.log(`handleProceedToPayment: API call successful for Cashfree. Received details:`, data);
      setCashfreeDetails(data.cashfreeDetails);
      setCurrentMessage(data.message || `Cashfree gateway ready. Redirecting...`);
      setMessageType("success");
    } catch (error) {
      console.error(`handleProceedToPayment: Network error during Cashfree details fetch:`, error);
      setPaymentError("Network error. Please check your connection and try again.");
      setCurrentMessage("Network error. Please check your connection and try again.");
      setMessageType("error");
    } finally {
      setFetchingPaymentDetails(false);
      console.log("handleProceedToPayment: API call finished.");
    }
  };
  const partialCodAmount = useMemo(() => {
    if (totalAmount === void 0 || totalAmount <= 0) return 0;
    const amount = totalAmount * 0.1;
    let roundedAmount = Math.round(amount / 1e3) * 1e3;
    if (roundedAmount > 0 && roundedAmount < 100) {
      roundedAmount = 100;
    } else if (roundedAmount <= 0) {
      roundedAmount = 0;
    }
    return roundedAmount;
  }, [totalAmount]);
  if (!cartItems || cartItems.length === 0 || totalAmount === void 0 || !orderId) {
    console.warn("PaymentConfirmation: Missing critical props on initial render. Redirecting to cart.index.");
    return /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Payment Confirmation" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative", role: "alert", children: [
        /* @__PURE__ */ jsx("strong", { className: "font-bold", children: "Information:" }),
        /* @__PURE__ */ jsx("span", { className: "block sm:inline", children: " Order details are missing. Please go back to your cart to initiate checkout." })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => router.visit(route("cart.index")),
          className: "mt-6 bg-maroon-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-maroon-700 transition-colors duration-200",
          children: "Go to Cart"
        }
      )
    ] }) }) });
  }
  const isPaymentProcessing = fetchingPaymentDetails || loadingCashfreeScript || cashfreePaymentInitiated;
  return /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 p-4 flex items-start justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-6 text-center", children: "Order Confirmation" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 text-left", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800 mb-3", children: "Your Order Items" }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: cartItems.map((item) => {
        var _a, _b, _c, _d, _e, _f;
        return /* @__PURE__ */ jsxs("li", { className: "flex items-center text-sm text-gray-700 border-b pb-3 last:border-b-0 last:pb-0", children: [
          ((_a = item.product) == null ? void 0 : _a.small_image) && /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${item.product.small_image}`,
              alt: (_b = item.product) == null ? void 0 : _b.name,
              className: "w-16 h-16 object-cover rounded mr-3 flex-shrink-0",
              onError: (e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/64x64/E0E0E0/A0A0A0?text=P`;
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-base", children: (_c = item.product) == null ? void 0 : _c.name }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [
              ((_d = item.varient) == null ? void 0 : _d.name) && /* @__PURE__ */ jsxs("span", { children: [
                "Varient: ",
                item.varient.name
              ] }),
              ((_e = item.design) == null ? void 0 : _e.name) && /* @__PURE__ */ jsxs("span", { className: "ml-1", children: [
                "Design: ",
                item.design.name
              ] }),
              ((_f = item.size) == null ? void 0 : _f.name) && /* @__PURE__ */ jsxs("span", { className: "ml-1", children: [
                "Size: ",
                item.size.name
              ] })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
              "Quantity: ",
              item.quantity
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right flex-shrink-0", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-semibold text-base", children: [
              "₹",
              (parseFloat(item.price) * item.quantity).toFixed(2)
            ] }),
            parseFloat(item.mrp) > parseFloat(item.price) && /* @__PURE__ */ jsxs("p", { className: "text-xs text-red-500 line-through", children: [
              "MRP: ₹",
              (parseFloat(item.mrp) * item.quantity).toFixed(2)
            ] })
          ] })
        ] }, item.id);
      }) }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-gray-300 pt-3 mt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-bold text-gray-800 text-lg", children: [
        /* @__PURE__ */ jsx("span", { children: "Shipping Cost:" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "₹",
          userLocation.shipping_fee
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-300 pt-3 mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-bold text-gray-800 text-lg", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Amount:" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "₹",
            totalAmount.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: userLocation.dehradun == "yes" && /* @__PURE__ */ jsx("p", { className: "text-red-600", children: " + Actual Shipping Charges will be Payable Cash." }) })
      ] })
    ] }),
    shippingDetails && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 text-left", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800 mb-3", children: "Shipping Address" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Name:" }),
        " ",
        shippingDetails.name
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Address:" }),
        " ",
        shippingDetails.address_line1,
        ", ",
        shippingDetails.address_line2
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "City:" }),
        " ",
        shippingDetails.city
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "State:" }),
        " ",
        shippingDetails.state
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Pincode:" }),
        " ",
        shippingDetails.pincode
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Mobile:" }),
        " ",
        shippingDetails.mobile
      ] })
    ] }),
    isPaymentProcessing && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-600 mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg text-center", children: currentMessage }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-2 text-center", children: "Please do not close this window." })
    ] }),
    paymentError && /* @__PURE__ */ jsxs("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4", role: "alert", children: [
      /* @__PURE__ */ jsx("strong", { className: "font-bold", children: "Error!" }),
      /* @__PURE__ */ jsxs("span", { className: "block sm:inline", children: [
        " ",
        paymentError
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "You will be redirected to your cart shortly." })
    ] }),
    !isPaymentProcessing && !paymentError && !cashfreePaymentInitiated && /* @__PURE__ */ jsx("div", { className: `mb-4 px-4 py-3 rounded relative text-center
                            ${messageType === "success" ? "bg-green-100 border border-green-400 text-green-700" : "bg-blue-100 border border-blue-400 text-blue-700"}`, role: "alert", children: /* @__PURE__ */ jsx("span", { className: "block sm:inline", children: currentMessage }) }),
    !isPaymentProcessing && !paymentError && !cashfreePaymentInitiated && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-6", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleProceedToPayment("full"),
          disabled: !cartItems || cartItems.length === 0 || !orderId || totalAmount === void 0,
          className: "bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md flex items-center justify-center space-x-2 disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z" }) }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Pay Online: ₹",
              totalAmount == null ? void 0 : totalAmount.toFixed(2),
              " "
            ] })
          ]
        }
      ),
      partialCodAmount > 0 && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleProceedToPayment("partial_cod"),
          disabled: !cartItems || cartItems.length === 0 || !orderId || totalAmount === void 0,
          className: "bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-md flex items-center justify-center space-x-2 disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM12 6a6 6 0 00-6 6h2a4 4 0 014-4V6z" }) }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Partial COD: ₹",
              partialCodAmount == null ? void 0 : partialCodAmount.toFixed(2),
              " "
            ] })
          ]
        }
      )
    ] })
  ] }) }) });
};
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PaymentConfirmation
}, Symbol.toStringTag, { value: "Module" }));
function ClusterIndex({ cluster, clusters }) {
  const { url } = usePage();
  const pathname = url.split("?")[0];
  const isModularKitchenPath = pathname.includes("modular-kitchens");
  function getPriceStrip(product) {
    var _a;
    const firstVariant = (_a = product.varients) == null ? void 0 : _a[0];
    if (!firstVariant) return null;
    return /* @__PURE__ */ jsx("span", { className: "block mt-1 text-xs", children: /* @__PURE__ */ jsxs("span", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-red-600 line-through", children: [
        "₹",
        firstVariant.mrp
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-green-700 font-semibold", children: [
        "₹",
        firstVariant.price
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
        Math.round((firstVariant.mrp - firstVariant.price) * 100 / firstVariant.mrp),
        "% OFF"
      ] })
    ] }) }, firstVariant.id);
  }
  if (!cluster) {
    return /* @__PURE__ */ jsx("div", { className: "text-gray-600 p-8 text-center bg-white rounded-lg shadow-md", children: "No cluster data provided." });
  }
  const { name, description, groups, products } = cluster;
  const pageTitle = `${name} | Amaltas Furniture & Modular Kitchens`;
  const pageDescription = description || `Explore premium ${name.toLowerCase()} at Amaltas Furniture & Modular Kitchens, Dehradun. Factory-direct pricing with in-house manufacturing.`;
  return /* @__PURE__ */ jsx(
    Welcome,
    {
      clusters,
      title: pageTitle,
      description: pageDescription,
      children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen font-inter", children: [
        /* @__PURE__ */ jsxs("header", { className: "bg-white rounded-lg mt-4 text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold text-gray-900 mb-2", children: name }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg mx-auto", children: description })
        ] }),
        isModularKitchenPath && /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-maroon-700 to-maroon-500  shadow-md p-6 mb-6 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Get Estimate for Your Kitchen" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/90 mb-4", children: "Design your modular kitchen with factory-direct pricing." }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("kitchen-cost-calculator"),
              className: "inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition",
              children: "Get Free Estimate"
            }
          )
        ] }),
        groups && groups.length > 0 && /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-lg shadow-md p-6 mb-8", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4", children: [
            "Explore ",
            name,
            " Categories"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 sm:gap-6", children: groups.map((group) => /* @__PURE__ */ jsxs(
            Link,
            {
              href: `/${group.slug}`,
              data: { id: "group" },
              className: "flex flex-col items-center group transform transition duration-200 hover:scale-105 p-2",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-gray-300 group-hover:border-blue-500 shadow-md transition-colors duration-200", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `/storage/${group.image}`,
                    alt: `${group.name} category - ${name}`,
                    className: "w-full h-full object-cover",
                    onError: (e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/112x112/E0E0E0/A0A0A0?text=${group.name.charAt(0)}`;
                    }
                  }
                ) }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-base font-medium text-gray-700 group-hover:text-blue-700 text-center px-2", children: group.name })
              ]
            },
            group.slug
          )) })
        ] }),
        products && products.length > 0 && /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-lg shadow-md p-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-3xl font-bold text-gray-800 mb-6 text-center", children: [
            name,
            " Products"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3", children: products.map((product) => /* @__PURE__ */ jsxs(
            Link,
            {
              href: `/${product.slug}`,
              data: { id: "product" },
              className: "block rounded-lg overflow-hidden shadow-xl hover:shadow-lg transition duration-200 border p-4",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `/storage/${product.small_image}`,
                    alt: `${product.name} - ${name}`,
                    className: "h-[80%] object-cover rounded-md mb-4 mx-auto",
                    onError: (e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/192x192/E0E0E0/A0A0A0?text=Product`;
                    }
                  }
                ),
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-800", children: product.name }),
                getPriceStrip(product)
              ]
            },
            product.slug
          )) })
        ] }),
        (!groups || groups.length === 0) && (!products || products.length === 0) && /* @__PURE__ */ jsx("div", { className: "text-gray-600 p-8 text-center bg-white rounded-lg shadow-md", children: "No groups or products available in this category." })
      ] })
    }
  );
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ClusterIndex
}, Symbol.toStringTag, { value: "Module" }));
function GroupIndex({ group = null, clusters = [] }) {
  const products = Array.isArray(group == null ? void 0 : group.products) ? group.products : [];
  function getPriceStrip(product) {
    const variant = Array.isArray(product == null ? void 0 : product.varients) ? product.varients[0] : null;
    if (!variant) return null;
    return /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-red-600 line-through", children: [
        "₹",
        variant.mrp
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-green-700 font-semibold", children: [
        "₹",
        variant.price
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
        Math.round(
          (variant.mrp - variant.price) * 100 / variant.mrp
        ),
        "% OFF"
      ] })
    ] }) });
  }
  const pageTitle = (group == null ? void 0 : group.name) ? `${group.name} | Amaltas Furniture & Modular Kitchens` : "Furniture Category | Amaltas";
  const pageDescription = (group == null ? void 0 : group.description) ? `${group.description} – Explore premium quality furniture at Amaltas Furniture & Modular Kitchens, GMS Road, Dehradun.` : "Explore premium furniture categories at Amaltas Furniture, Dehradun.";
  return /* @__PURE__ */ jsxs(
    Welcome,
    {
      clusters,
      title: pageTitle,
      description: pageDescription,
      children: [
        group && products.length > 0 && /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-lg shadow-md p-6", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-3xl font-bold text-gray-800 mb-2 text-center", children: group.name }),
          group.description && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-gray-600 mb-6", children: group.description }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4", children: products.map((product) => /* @__PURE__ */ jsxs(
            Link,
            {
              href: `/${product.slug}`,
              data: { id: "product" },
              className: "block rounded-xl overflow-hidden border p-4 hover:shadow-lg transition",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `/storage/${product.small_image}`,
                    alt: product.name,
                    className: "h-40 w-full object-cover rounded-md mb-4",
                    onError: (e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/300x200/E0E0E0/A0A0A0?text=Product";
                    }
                  }
                ),
                /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-800 mb-1", children: product.name }),
                getPriceStrip(product)
              ]
            },
            product.slug
          )) })
        ] }),
        group && products.length === 0 && /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-lg shadow-md p-6 text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-3xl font-bold text-gray-800 mb-2", children: group.name }),
          group.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-6", children: group.description }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "New products are being added in this category. Please check back later or explore other categories." })
        ] })
      ]
    }
  );
}
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GroupIndex
}, Symbol.toStringTag, { value: "Module" }));
function ImageGallery({ images = [], productName }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const orderedImages = useMemo(() => {
    if (!Array.isArray(images)) return [];
    const yt = images.find((i) => i.type === "youtube");
    const imgs = images.filter((i) => i.type !== "youtube");
    if (!yt || imgs.length === 0) return images;
    return [imgs[0], yt, ...imgs.slice(1)];
  }, [images]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const active = orderedImages[index];
  const hasMultiple = orderedImages.length > 1;
  const resolveImage = (img) => {
    if (!img) return "";
    if (img.type === "placeholder") return img.name;
    return `/storage/${img.name}`;
  };
  const resolveThumb = (img) => {
    if (img.type === "youtube" || img.type === "placeholder")
      return img.thumbnail_url;
    return `/storage/${img.thumbnail_url}`;
  };
  const prev = () => setIndex(index === 0 ? orderedImages.length - 1 : index - 1);
  const next = () => setIndex(index === orderedImages.length - 1 ? 0 : index + 1);
  const handleTouchStart = (event2) => {
    var _a;
    const touch = (_a = event2.touches) == null ? void 0 : _a[0];
    if (!touch) return;
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };
  const handleTouchEnd = (event2) => {
    var _a;
    if (!hasMultiple) return;
    const touch = (_a = event2.changedTouches) == null ? void 0 : _a[0];
    if (!touch || touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touch.clientX - touchStartXRef.current;
    const diffY = touch.clientY - touchStartYRef.current;
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);
    const swipeThreshold = 40;
    if (absX >= swipeThreshold && absX > absY) {
      if (diffX < 0) next();
      else prev();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      hasMultiple && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: prev,
          className: "shrink-0 w-6 h-6 rounded-full\n                       bg-black/60 text-white text-sm\n                       flex items-center justify-center",
          "aria-label": "Previous",
          children: "‹"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex-1 bg-black rounded-lg overflow-hidden",
          onTouchStart: handleTouchStart,
          onTouchEnd: handleTouchEnd,
          children: (active == null ? void 0 : active.type) === "youtube" ? /* @__PURE__ */ jsx(
            "div",
            {
              className: `w-full ${isMobile ? "aspect-[9/16] max-h-[80vh]" : "aspect-video"}`,
              children: /* @__PURE__ */ jsx(
                "iframe",
                {
                  src: `${active.url}?playsinline=1&controls=1&modestbranding=1&rel=0`,
                  title: "Product Video",
                  className: "w-full h-full",
                  allow: "accelerometer; encrypted-media; picture-in-picture"
                }
              )
            }
          ) : /* @__PURE__ */ jsx(
            "img",
            {
              src: resolveImage(active),
              alt: productName,
              className: "w-full object-cover cursor-pointer",
              onClick: () => setOpen(true)
            }
          )
        }
      ),
      hasMultiple && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: next,
          className: "shrink-0 w-6 h-6 rounded-full\n                       bg-black/60 text-white text-sm\n                       flex items-center justify-center",
          "aria-label": "Next",
          children: "›"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto", children: orderedImages.map((img, i) => /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => setIndex(i),
        className: `w-16 h-16 rounded border cursor-pointer ${i === index ? "border-maroon-600" : "border-gray-300"}`,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: resolveThumb(img),
            alt: "thumb",
            className: "w-full h-full object-cover rounded"
          }
        )
      },
      img.id
    )) }),
    open && (active == null ? void 0 : active.type) !== "youtube" && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 bg-black z-50 flex items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setOpen(false),
          className: "\n              fixed top-4 right-4\n              z-[9999]\n              w-14 h-14\n              text-6xl\n              flex items-center justify-center\n              text-white\n              bg-black/50\n              rounded-full\n              pointer-events-auto\n            ",
          "aria-label": "Close",
          children: "×"
        }
      ),
      /* @__PURE__ */ jsx(
        Swiper,
        {
          modules: [Navigation, Pagination, Zoom, Keyboard],
          initialSlide: index,
          navigation: true,
          pagination: { type: "fraction" },
          keyboard: { enabled: true },
          zoom: true,
          className: "w-full h-full",
          children: orderedImages.filter((i) => i.type !== "youtube").map((img) => /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx("div", { className: "swiper-zoom-container flex items-center justify-center h-full", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: resolveImage(img),
              alt: productName,
              className: "max-w-[90vw] max-h-[90vh] object-contain"
            }
          ) }) }, img.id))
        }
      )
    ] })
  ] });
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ImageGallery
}, Symbol.toStringTag, { value: "Module" }));
function KitchenEstimatePriceCard({
  subtotal: subtotal2 = 0,
  gst: gst2 = 0,
  total = 0,
  material = [],
  clusters
}) {
  const layout = (material == null ? void 0 : material[0]) ?? null;
  const cabinetMaterial = (material == null ? void 0 : material[1]) ?? null;
  const shutterMaterial = (material == null ? void 0 : material[2]) ?? null;
  const backendSubtotal = (material == null ? void 0 : material[3]) ?? 0;
  const cabinets = Array.isArray(material == null ? void 0 : material[4]) ? material[4] : [];
  const layoutImages = {
    "L-Shaped Kitchen": "/storage/modular_kitchen/l_shaped.jpg",
    "U-Shaped Kitchen": "/storage/modular_kitchen/u_shaped.jpg",
    "Parallel Kitchen": "/storage/modular_kitchen/h_shaped.jpg",
    "Straight Kitchen": "/storage/modular_kitchen/straight.jpg"
  };
  const CABINET_IMAGE_MAP = {
    "tandum drawer": "/storage/cabinets/tandum-drawer.jpg",
    "bottle pull out": "/storage/cabinets/bpo.jpeg",
    "corner cabinet": "/storage/cabinets/corner.jpg",
    "wire basket drawer": "/storage/cabinets/wire-basket.jpeg",
    "sink cabinet": "/storage/cabinets/sink.jpeg",
    "door cabinet": "/storage/cabinets/door.jpg",
    "lift up cabinet": "/storage/cabinets/liftup.jpg",
    "profile door cabinet": "/storage/cabinets/profile-dooor.png",
    "chimney cabinet": "/storage/cabinets/chimney.jpg"
  };
  const finalSubtotal = Math.round(subtotal2 || backendSubtotal || 0);
  function getCabinetImage(cabinet) {
    var _a;
    if (!cabinet) return null;
    if (cabinet.image) return cabinet.image;
    if (cabinet.image_key) return `/storage/cabinets/${cabinet.image_key}`;
    const nameKey = (_a = cabinet.cabinet_name) == null ? void 0 : _a.toLowerCase().trim();
    return CABINET_IMAGE_MAP[nameKey] || null;
  }
  return /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden", children: [
    layoutImages[layout] && /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-6 flex justify-center", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: layoutImages[layout],
        alt: layout,
        className: "w-full max-w-sm rounded-xl shadow-md"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 pt-6 pb-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-widest text-gray-300", children: "Estimated Price" }),
      /* @__PURE__ */ jsxs("p", { className: "text-3xl font-extrabold mt-1", children: [
        "₹",
        finalSubtotal.toLocaleString("en-IN"),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-300", children: "*" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mt-4", children: [
        layout && /* @__PURE__ */ jsx("span", { className: "px-3 py-1 text-xs rounded-full bg-gray-700", children: layout }),
        cabinetMaterial && /* @__PURE__ */ jsx("span", { className: "px-3 py-1 text-xs rounded-full bg-gray-700", children: cabinetMaterial }),
        shutterMaterial && /* @__PURE__ */ jsx("span", { className: "px-3 py-1 text-xs rounded-full bg-gray-700", children: shutterMaterial })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border-t", children: [
      /* @__PURE__ */ jsx("div", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-800", children: "Included Cabinets & Hardware" }) }),
      /* @__PURE__ */ jsxs("div", { className: "px-6 pb-6 space-y-4", children: [
        cabinets.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 italic", children: "No cabinet details available." }),
        cabinets.map((cabinet, idx) => {
          const cabinetImage = getCabinetImage(cabinet);
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex gap-4 p-5 bg-white border rounded-xl hover:shadow-md transition",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0", children: cabinetImage ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: cabinetImage,
                    alt: (cabinet == null ? void 0 : cabinet.cabinet_name) || "Cabinet",
                    className: "w-full h-full object-cover",
                    loading: "lazy"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-xs text-gray-400", children: "No Image" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 text-sm", children: (cabinet == null ? void 0 : cabinet.cabinet_name) || "Unnamed Cabinet" }),
                  Array.isArray(cabinet == null ? void 0 : cabinet.hardware) && cabinet.hardware.length > 0 ? /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-1 text-xs text-gray-600", children: cabinet.hardware.map((h, i) => /* @__PURE__ */ jsxs(
                    "li",
                    {
                      className: "flex justify-between",
                      children: [
                        /* @__PURE__ */ jsx("span", { children: h == null ? void 0 : h.name }),
                        /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                          "× ",
                          h == null ? void 0 : h.quantity
                        ] })
                      ]
                    },
                    i
                  )) }) : /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 italic mt-1", children: "No hardware included" })
                ] })
              ]
            },
            idx
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 px-5 py-4 text-center border-t", children: /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-400", children: "*Prices are indicative and subject to final site measurements." }) })
  ] }) });
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: KitchenEstimatePriceCard
}, Symbol.toStringTag, { value: "Module" }));
function KitchenLayoutForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${"6LeLWiUsAAAAAHt8zFrbFHTSGGlotk7R0uc2Wej3"}`;
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const [step, setStep] = useState(1);
  const [selectedLayout, setSelectedLayout] = useState("");
  const [selectedCabinetMaterial, setSelectedCabinetMaterial] = useState("");
  const [selectedShutterMaterial, setSelectedShutterMaterial] = useState("");
  const [estimateData, setEstimateData] = useState({});
  const [wallDimensions, setWallDimensions] = useState({
    wallA_ft: "5",
    wallA_in: "0",
    wallB_ft: "5",
    wallB_in: "0",
    wallC_ft: "5",
    wallC_in: "0"
  });
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const layouts = [
    { id: "l-shaped", label: "L-Shaped Kitchen", walls: ["A", "B"], photo: "storage/kitchen/LShaped.png" },
    { id: "u-shaped", label: "U-Shaped Kitchen", walls: ["A", "B", "C"], photo: "storage/kitchen/UShaped.png" },
    { id: "parallel", label: "Parallel Kitchen", walls: ["A", "B"], photo: "storage/kitchen/Parallel.png" },
    { id: "straight", label: "Straight Kitchen", walls: ["A"], photo: "storage/kitchen/Straight.png" }
  ];
  const cabinetMaterials = [
    { id: "4-0", label: "Action Tesa HDHMR", description: "High-Density High Moisture Resistance board for superior durability.", photo: "storage/kitchen/action.jpg" },
    { id: "5-11", label: "BWP Plywood with Mica Laminate", description: "Boiling Water Proof Plywood with a decorative Mica finish.", photo: "storage/kitchen/plywood.jpeg" }
  ];
  const shutterMaterials = [
    { id: "48-11", label: "Blockboard with Mica Laminate", description: "Very Strong, Non Bending Door with great finish.", photo: "storage/kitchen/blockboard.jpeg" },
    { id: "5-10", label: "BWP Ply with Mica Laminate", description: "Water-resistant base with a laminate finish (Gloss / Matt).", photo: "storage/kitchen/PlyLaminate.jpeg" },
    { id: "5-47", label: "BWP Ply with Acrylic Laminate", description: "Premium finish with high-gloss acrylic on a water-resistant base.", photo: "storage/kitchen/plyAcrylic.webp" },
    { id: "4-11", label: "HDMHR with Mica Laminate", description: "High density, moisture-resistant base with laminate.", photo: "storage/kitchen/hdmhrMica.webp" },
    { id: "4-47", label: "HDMHR with Acrylic Laminate", description: "High density, high gloss, excellent durability.", photo: "storage/kitchen/hdmhrAcrylic.jpg" },
    { id: "4-38", label: "HDMHR with Grooving and PU Paint", description: "Designer shutters with recessed patterns and a PU paint finish.", photo: "storage/kitchen/hdmhrGrove.jpg" }
  ];
  const createOptions = (start, end) => Array.from({ length: end - start + 1 }, (_2, i) => start + i).map((num) => /* @__PURE__ */ jsx("option", { value: num, children: num }, num));
  const handleChange = (event2, itemData) => {
    const value = event2.target.value;
    if (step === 1) {
      setSelectedLayout(value);
      setEstimateData((prev) => ({ ...prev, layout: itemData }));
      setTimeout(() => setStep(2), 150);
    } else if (step === 3) {
      setSelectedCabinetMaterial(value);
      setEstimateData((prev) => ({ ...prev, cabinetMaterial: itemData }));
    } else if (step === 4) {
      setSelectedShutterMaterial(value);
      setEstimateData((prev) => ({ ...prev, shutterMaterial: itemData }));
    }
  };
  const handleDimensionChange = (e) => {
    setWallDimensions({
      ...wallDimensions,
      [e.target.name]: e.target.value
    });
  };
  const handleContactChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value
    });
  };
  const handleDimensionsContinue = () => {
    const currentLayout = layouts.find((l) => l.label === selectedLayout);
    const dimensions = {};
    for (const wall of currentLayout.walls) {
      const ft = wallDimensions[`wall${wall}_ft`];
      const inch = wallDimensions[`wall${wall}_in`];
      if (ft === "0" && inch === "0") {
        alert(`Wall ${wall} cannot be 0 feet and 0 inches. Please enter a valid measurement.`);
        return;
      }
      dimensions[`wall${wall}_ft`] = ft;
      dimensions[`wall${wall}_in`] = inch;
    }
    setEstimateData((prev) => ({ ...prev, layoutDimensions: dimensions }));
    setStep(3);
  };
  const handleCabinetMaterialContinue = () => {
    if (!selectedCabinetMaterial) {
      alert("Please select a cabinet material to continue.");
      return;
    }
    setStep(4);
  };
  const handleShutterMaterialContinue = () => {
    if (!selectedShutterMaterial) {
      alert("Please select a shutter material to continue.");
      return;
    }
    setStep(5);
  };
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!contactInfo.name || !contactInfo.phone || !contactInfo.address) {
      alert("All contact fields are required to submit the estimate.");
      return;
    }
    if (!window.grecaptcha) {
      alert("Captcha not loaded. Please refresh the page.");
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute("6LeLWiUsAAAAAHt8zFrbFHTSGGlotk7R0uc2Wej3", {
        action: "kitchen_estimate"
      }).then((token) => {
        const finalData = {
          ...estimateData,
          contactInfo,
          recaptcha_token: token
          // ✅ FIXED
        };
        router.post("/kitchen/data", finalData);
      }).catch(() => {
        alert("Captcha verification failed. Please try again.");
      });
    });
  };
  const handleBack = () => {
    if (step === 5) {
      setStep(4);
    } else if (step === 4) {
      setStep(3);
      setSelectedShutterMaterial("");
    } else if (step === 3) {
      setStep(2);
      setSelectedCabinetMaterial("");
    } else if (step === 2) {
      setStep(1);
      setSelectedLayout("");
      setEstimateData((prev) => ({ ...prev, layout: null, layoutDimensions: null }));
      setWallDimensions({ wallA_ft: "5", wallA_in: "0", wallB_ft: "5", wallB_in: "0", wallC_ft: "5", wallC_in: "0" });
    }
  };
  const renderDimensionInput = () => {
    const currentLayout = layouts.find((l) => l.label === selectedLayout);
    if (!currentLayout) return null;
    return /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto p-6 bg-white shadow-xl rounded-lg border-t-4 border-indigo-500", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-6 text-gray-800", children: "Step 2: Enter Measurements" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center", children: [
        /* @__PURE__ */ jsx("img", { src: currentLayout.photo, alt: currentLayout.label, className: "max-h-64 object-contain mx-auto mb-4 rounded-md border" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-xl font-semibold text-gray-800", children: [
            "Layout: ",
            currentLayout.label
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "text-md text-indigo-500 hover:text-indigo-700 underline", title: "Change Layout", children: "Change Layout" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: currentLayout.walls.map((wall) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxs("label", { className: "w-20 text-md font-medium text-gray-700", children: [
          "Wall ",
          wall,
          ":"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 flex-grow", children: [
          /* @__PURE__ */ jsx("select", { name: `wall${wall}_ft`, value: wallDimensions[`wall${wall}_ft`], onChange: handleDimensionChange, className: "w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500", children: createOptions(5, 20) }),
          /* @__PURE__ */ jsx("span", { className: "self-center font-medium", children: "ft" }),
          /* @__PURE__ */ jsx("select", { name: `wall${wall}_in`, value: wallDimensions[`wall${wall}_in`], onChange: handleDimensionChange, className: "w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500", children: createOptions(0, 11) }),
          /* @__PURE__ */ jsx("span", { className: "self-center font-medium", children: "in" })
        ] })
      ] }, wall)) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-8", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: handleDimensionsContinue, className: "px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 transition-colors", children: "Continue to Step 3 →" }) })
    ] });
  };
  const renderContactInfo = () => /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto p-6 bg-white shadow-xl rounded-lg border-t-4 border-indigo-500", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-6 text-gray-800", children: "Step 5: Your Contact Information" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-md font-medium text-gray-700", children: "Name *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "name",
            name: "name",
            value: contactInfo.name,
            onChange: handleContactChange,
            required: true,
            className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",
            placeholder: "Your Full Name"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block text-md font-medium text-gray-700", children: "Phone Number* (Your Estimate will come on Whatsapp)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            id: "phone",
            name: "phone",
            value: contactInfo.phone,
            onChange: handleContactChange,
            required: true,
            className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",
            placeholder: "e.g., +91 98765 43210"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-md font-medium text-gray-700", children: "Email (Optional)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "email",
            name: "email",
            value: contactInfo.email,
            onChange: handleContactChange,
            className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",
            placeholder: "e.g., yourname@somemail.com"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "address", className: "block text-md font-medium text-gray-700", children: "Address *" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "address",
            name: "address",
            rows: "3",
            value: contactInfo.address,
            onChange: handleContactChange,
            required: true,
            className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",
            placeholder: "Street Address, City, Pincode"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-8", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "px-6 py-3 border-2 border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors", children: "← Back to Shutter Material" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors",
          disabled: !contactInfo.name || !contactInfo.phone || !contactInfo.address,
          children: "Submit Final Estimate"
        }
      )
    ] })
  ] });
  const renderCardSelection = (items, selectionState, currentStep) => /* @__PURE__ */ jsx("div", { className: `grid gap-4 mb-8 ${currentStep === 1 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`, children: items.map((item) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        id: item.id,
        name: currentStep === 1 ? "kitchenLayout" : currentStep === 3 ? "cabinetMaterial" : "shutterMaterial",
        type: "radio",
        value: item.label,
        checked: selectionState === item.label,
        onChange: (e) => handleChange(e, item),
        className: "hidden"
      }
    ),
    /* @__PURE__ */ jsxs(
      "label",
      {
        htmlFor: item.id,
        className: `
                            flex items-center p-3 rounded-lg cursor-pointer transition-all h-full
                            ${currentStep === 1 ? "min-h-[80px]" : "min-h-[120px]"}
                            ${selectionState === item.label ? "border-4 border-indigo-600 shadow-xl bg-indigo-50" : "border-2 border-gray-300 hover:border-indigo-400 hover:bg-gray-50"}
                        `,
        children: [
          /* @__PURE__ */ jsx("img", { src: item.photo, alt: item.label, className: "w-20 h-20 object-contain rounded-md flex-shrink-0 mr-4 border" }),
          /* @__PURE__ */ jsxs("div", { className: "text-left flex-grow", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-800 block", children: item.label }),
            item.description && /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: item.description })
          ] })
        ]
      }
    )
  ] }, item.id)) });
  const getTitle = () => {
    if (step === 1) return "Step 1: Choose Your Kitchen Layout";
    if (step === 2) return "Step 2: Enter Wall Measurements";
    if (step === 3) return "Step 3: Choose Cabinet Material";
    if (step === 4) return "Step 4: Choose Shutter Material (Finishing)";
    if (step === 5) return "Step 5: Finalize Your Estimate";
    return "";
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center text-gray-800", children: getTitle() }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleFinalSubmit, children: [
      step === 1 && renderCardSelection(layouts, selectedLayout, 1),
      step === 2 && renderDimensionInput(),
      step === 3 && /* @__PURE__ */ jsxs(Fragment, { children: [
        renderCardSelection(cabinetMaterials, selectedCabinetMaterial, 3),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-6", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "px-6 py-3 border-2 border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors", children: "← Back to Measurements" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleCabinetMaterialContinue,
              className: "px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors",
              disabled: !selectedCabinetMaterial,
              children: "Continue to Step 4 →"
            }
          )
        ] })
      ] }),
      step === 4 && /* @__PURE__ */ jsxs(Fragment, { children: [
        renderCardSelection(shutterMaterials, selectedShutterMaterial, 4),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-6", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "px-6 py-3 border-2 border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors", children: "← Back to Cabinet Material" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleShutterMaterialContinue,
              className: "px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors",
              disabled: !selectedShutterMaterial,
              children: "Continue to Step 5 →"
            }
          )
        ] })
      ] }),
      step === 5 && renderContactInfo()
    ] })
  ] });
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: KitchenLayoutForm
}, Symbol.toStringTag, { value: "Module" }));
function ModularKitchens({ clusters, cluster, materialRates }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsx(KitchenLayoutForm, {}) }) });
}
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ModularKitchens
}, Symbol.toStringTag, { value: "Module" }));
function ProductPage$1({ product }) {
  var _a, _b, _c;
  if (!product) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center p-8", children: "Product data not available." });
  }
  const { addItemToCart, fetchCartItemsFromBackend } = useCart();
  const [selectedVarient, setSelectedVarient] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [flashMessage, setFlashMessage] = useState(null);
  const [flashType, setFlashType] = useState("success");
  const flashRef = useRef(null);
  const addToCartBtnRef = useRef(null);
  const flyRef = useRef(null);
  const showFlash = (msg, type = "success") => {
    setFlashMessage(msg);
    setFlashType(type);
    if (flashRef.current) clearTimeout(flashRef.current);
    flashRef.current = setTimeout(() => {
      setFlashMessage(null);
      flashRef.current = null;
    }, 4500);
  };
  const readSelectionFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      variant: params.get("variant"),
      design: params.get("design"),
      size: params.get("size")
    };
  };
  const updateSelectionInUrl = ({ v, d, s }) => {
    const params = new URLSearchParams(window.location.search);
    if (v) params.set("variant", v);
    else params.delete("variant");
    if (d) params.set("design", d);
    else params.delete("design");
    if (s) params.set("size", s);
    else params.delete("size");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };
  const animateAddToCart = () => {
    const flyEl = flyRef.current;
    const btnEl = addToCartBtnRef.current;
    const cartEl = document.querySelector("#cart-icon") || document.querySelector("[data-cart-icon]");
    if (!flyEl || !btnEl || !cartEl) return;
    const btnRect = btnEl.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const startX = btnRect.left + btnRect.width / 2 + scrollX;
    const startY = btnRect.top + scrollY;
    const endX = cartRect.left + cartRect.width / 2 + scrollX;
    const endY = cartRect.top + cartRect.height / 2 + scrollY;
    flyEl.style.left = `${startX}px`;
    flyEl.style.top = `${startY}px`;
    flyEl.style.opacity = "1";
    flyEl.style.transition = "none";
    flyEl.style.transform = "translate(-50%, -50%) scale(1)";
    requestAnimationFrame(() => {
      flyEl.style.transition = "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 2.4s";
      flyEl.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0.5)`;
      flyEl.style.opacity = "0";
    });
    cartEl.classList.add("cart-bounce");
    setTimeout(() => cartEl.classList.remove("cart-bounce"), 400);
  };
  useEffect(() => {
    var _a2, _b2, _c2, _d;
    const { variant, design, size } = readSelectionFromUrl();
    let v = ((_a2 = product.varients) == null ? void 0 : _a2.find((x) => String(x.id) === String(variant))) || ((_b2 = product.varients) == null ? void 0 : _b2[0]) || null;
    setSelectedVarient(v);
    if (v && design) {
      const d = ((_c2 = v.designs) == null ? void 0 : _c2.find((x) => String(x.id) === String(design))) || null;
      setSelectedDesign(d);
      if (d && size) {
        const s = ((_d = d.sizes) == null ? void 0 : _d.find((x) => String(x.id) === String(size))) || null;
        setSelectedSize(s);
      } else {
        setSelectedSize(null);
      }
    } else {
      setSelectedDesign(null);
      setSelectedSize(null);
    }
    setQuantity(1);
  }, [product]);
  useEffect(() => {
    const onPopState = () => {
      var _a2, _b2, _c2, _d;
      const { variant, design, size } = readSelectionFromUrl();
      let v = ((_a2 = product.varients) == null ? void 0 : _a2.find((x) => String(x.id) === String(variant))) || ((_b2 = product.varients) == null ? void 0 : _b2[0]) || null;
      setSelectedVarient(v);
      if (v && design) {
        const d = ((_c2 = v.designs) == null ? void 0 : _c2.find((x) => String(x.id) === String(design))) || null;
        setSelectedDesign(d);
        if (d && size) {
          const s = ((_d = d.sizes) == null ? void 0 : _d.find((x) => String(x.id) === String(size))) || null;
          setSelectedSize(s);
        } else {
          setSelectedSize(null);
        }
      } else {
        setSelectedDesign(null);
        setSelectedSize(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [product]);
  const extractYouTubeId = (youtube) => {
    if (!youtube) return null;
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/;
    const m = youtube.match(regExp);
    if (m && m[1]) return m[1];
    const maybe = youtube.split("?")[0].split("#")[0].slice(-11);
    return /^[A-Za-z0-9_-]{11}$/.test(maybe) ? maybe : null;
  };
  const mainProductImages = useMemo(() => {
    const images = [];
    const seen = /* @__PURE__ */ new Set();
    const add = (id, obj) => {
      if (!(obj == null ? void 0 : obj.name)) return;
      if (seen.has(obj.name)) return;
      seen.add(obj.name);
      images.push({ id, ...obj });
    };
    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        add(`p-img-${img.id ?? img.name}`, {
          type: "image",
          name: img.name,
          thumbnail_url: img.thumbnail_url ?? img.name
        });
      });
    }
    if (product.small_image) {
      add("p-small-img", {
        type: "image",
        name: product.small_image,
        thumbnail_url: product.small_image
      });
    }
    if (selectedVarient) {
      if (Array.isArray(selectedVarient.images)) {
        selectedVarient.images.forEach((img) => {
          add(`v-img-${selectedVarient.id}-${img.id ?? img.name}`, {
            type: "image",
            name: img.name,
            thumbnail_url: img.thumbnail_url ?? img.name
          });
        });
      }
      if (selectedVarient.size_image) {
        add(`v-size-${selectedVarient.id}`, {
          type: "image",
          name: selectedVarient.size_image,
          thumbnail_url: selectedVarient.size_image
        });
      }
    }
    if (selectedDesign == null ? void 0 : selectedDesign.size_image) {
      add(`d-size-${selectedDesign.id}`, {
        type: "image",
        name: selectedDesign.size_image,
        thumbnail_url: selectedDesign.size_image
      });
    }
    if (selectedSize == null ? void 0 : selectedSize.size_image) {
      add(`s-size-${selectedSize.id}`, {
        type: "image",
        name: selectedSize.size_image,
        thumbnail_url: selectedSize.size_image
      });
    }
    const yt = extractYouTubeId(product.youtube);
    if (yt) {
      add(`yt-${yt}`, {
        type: "youtube",
        name: yt,
        thumbnail_url: `https://img.youtube.com/vi/${yt}/hqdefault.jpg`,
        url: `https://www.youtube.com/embed/${yt}?rel=0`
      });
    }
    if (images.length === 0) {
      add("placeholder", {
        type: "placeholder",
        name: "https://placehold.co/800x800?text=No+Image",
        thumbnail_url: "https://placehold.co/100x100?text=No+Image"
      });
    }
    return images;
  }, [product, selectedVarient, selectedDesign, selectedSize]);
  const activeOption = selectedSize || selectedDesign || selectedVarient;
  const displayedMRP = activeOption == null ? void 0 : activeOption.mrp;
  const displayedPrice = activeOption == null ? void 0 : activeOption.price;
  const productForCart = useMemo(() => {
    var _a2;
    if (!product || !selectedVarient) return null;
    const opt = activeOption || selectedVarient;
    const compositeId = [
      `p${product.id}`,
      `v${selectedVarient == null ? void 0 : selectedVarient.id}`,
      selectedDesign ? `d${selectedDesign.id}` : null,
      selectedSize ? `s${selectedSize.id}` : null
    ].filter(Boolean).join("-");
    const mainImage = ((_a2 = mainProductImages.find((i) => i.type === "image")) == null ? void 0 : _a2.name) || product.thumbnail || null;
    return {
      id: compositeId,
      product_id: product.id,
      name: product.name,
      varient_id: (selectedVarient == null ? void 0 : selectedVarient.id) || null,
      design_id: (selectedDesign == null ? void 0 : selectedDesign.id) || null,
      size_id: (selectedSize == null ? void 0 : selectedSize.id) || null,
      price: (opt == null ? void 0 : opt.price) ?? null,
      mrp: (opt == null ? void 0 : opt.mrp) ?? null,
      quantity: Number(quantity) || 1,
      image: mainImage
    };
  }, [product, selectedVarient, selectedDesign, selectedSize, quantity, mainProductImages, activeOption]);
  const activeDetails = useMemo(() => {
    const src = selectedVarient ?? product;
    return {
      description: src.description || "",
      feature1: src.feature1 || "",
      feature2: src.feature2 || "",
      feature3: src.feature3 || "",
      material: src.material || "",
      size: src.size || ""
    };
  }, [product, selectedVarient]);
  const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : null;
  };
  const postJson = async (url, payload) => {
    const csrf = getCsrfToken();
    if (!csrf) {
      showFlash("Security error: CSRF token missing. Refresh the page.", "warning");
      return false;
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": csrf },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        showFlash(data.message || "Server error while updating cart", "warning");
        return false;
      }
      return true;
    } catch (err) {
      console.error("Network error:", err);
      showFlash("Network error. Please check your connection.", "warning");
      return false;
    }
  };
  const handleAddToCart = async () => {
    if (!selectedVarient) {
      showFlash("Please select a variant.", "warning");
      return;
    }
    const hasDesigns = Array.isArray(selectedVarient.designs) && selectedVarient.designs.length > 0;
    if (hasDesigns && !selectedDesign) {
      showFlash("Please select a design.", "warning");
      return;
    }
    const hasSizes = selectedDesign && Array.isArray(selectedDesign.sizes) && selectedDesign.sizes.length > 0;
    if (hasSizes && !selectedSize) {
      showFlash("Please select a size.", "warning");
      return;
    }
    if (!productForCart) {
      showFlash("Invalid selection.", "warning");
      return;
    }
    const payload = {
      product_id: productForCart.product_id,
      varient_id: productForCart.varient_id,
      design_id: productForCart.design_id,
      size_id: productForCart.size_id,
      quantity: productForCart.quantity,
      price: productForCart.price,
      mrp: productForCart.mrp
    };
    const ok = await postJson("/cart/add-item", payload);
    if (ok) {
      animateAddToCart();
      addItemToCart(productForCart, productForCart.quantity);
      await fetchCartItemsFromBackend();
      showFlash("Added to cart.", "success");
    }
  };
  const handleBuyNow = async () => {
    if (!selectedVarient) {
      showFlash("Please select a variant.", "warning");
      return;
    }
    const hasDesigns = Array.isArray(selectedVarient.designs) && selectedVarient.designs.length > 0;
    if (hasDesigns && !selectedDesign) {
      showFlash("Please select a design.", "warning");
      return;
    }
    const hasSizes = selectedDesign && Array.isArray(selectedDesign.sizes) && selectedDesign.sizes.length > 0;
    if (hasSizes && !selectedSize) {
      showFlash("Please select a size.", "warning");
      return;
    }
    if (!productForCart) {
      showFlash("Invalid selection.", "warning");
      return;
    }
    const payload = {
      product_id: productForCart.product_id,
      varient_id: productForCart.varient_id,
      design_id: productForCart.design_id,
      size_id: productForCart.size_id,
      quantity: productForCart.quantity,
      price: productForCart.price,
      mrp: productForCart.mrp
    };
    const ok = await postJson("/cart/add-item", payload);
    if (ok) {
      addItemToCart(productForCart, productForCart.quantity);
      await fetchCartItemsFromBackend();
      router.visit("/cart");
    }
  };
  const calculateDiscountPercentage = (mrp, price) => {
    if (typeof mrp === "number" && typeof price === "number" && mrp > 0) {
      return Math.round((mrp - price) / mrp * 100);
    }
    return 0;
  };
  const active = selectedSize || selectedDesign || selectedVarient;
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": mainProductImages.filter((img) => img.type === "image").map((img) => `${window.location.origin}/storage/${img.name}`),
    "description": (active == null ? void 0 : active.description) || product.description || "",
    "sku": `VAR-${(active == null ? void 0 : active.id) || product.id}`,
    "mpn": `${(active == null ? void 0 : active.id) || product.id}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Amaltas"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": (active == null ? void 0 : active.price) ?? 0,
      "availability": (active == null ? void 0 : active.qty) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": window.location.href
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8", children: [
    /* @__PURE__ */ jsxs(Head, { title: `${product.name} | Amaltas Furniture`, children: [
      mainProductImages.filter((img) => img.type === "image").length > 0 && /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:image",
          content: `${typeof window !== "undefined" ? window.location.origin : ""}/storage/${mainProductImages.filter((img) => img.type === "image")[0].name}`
        }
      ),
      /* @__PURE__ */ jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: { __html: JSON.stringify(productJsonLd) }
        }
      ),
      /* @__PURE__ */ jsx("style", { children: `
  .cart-bounce {
    animation: cartBounce 0.4s ease;
  }

  @keyframes cartBounce {
    0% { transform: scale(1); }
    30% { transform: scale(1.15); }
    60% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }
` })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: flyRef,
        className: "fixed pointer-events-none z-[9999]\n    flex items-center justify-center\n    bg-maroon-800 text-white\n    font-extrabold\n    text-lg md:text-xl\n    w-10 h-10 md:w-12 md:h-12\n    rounded-full\n    shadow-lg\n    opacity-0",
        style: { transform: "translate(-50%, -50%)" },
        children: [
          "+",
          quantity
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl font-extrabold text-gray-900", children: product.name }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsx(ImageGallery, { images: mainProductImages, productName: product.name }) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow", children: [
            typeof displayedMRP === "number" && typeof displayedPrice === "number" ? /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "text-gray-500 line-through", children: [
                "MRP: ₹",
                displayedMRP
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-3xl font-extrabold text-maroon-700", children: [
                "₹",
                displayedPrice
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm text-blue-600", children: [
                calculateDiscountPercentage(displayedMRP, displayedPrice),
                "% OFF"
              ] })
            ] }) : /* @__PURE__ */ jsx("div", { className: "text-2xl font-semibold", children: "Price on selection" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-700", children: "Qty" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    min: "1",
                    value: quantity,
                    onChange: (e) => {
                      const v = Number(e.target.value);
                      setQuantity(Number.isFinite(v) && v > 0 ? v : 1);
                    },
                    className: "w-20 p-2 border rounded text-center"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleAddToCart,
                    ref: addToCartBtnRef,
                    className: "bg-maroon-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-maroon-700 transition",
                    children: "Add to Cart"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleBuyNow,
                    className: "bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition",
                    children: "Buy Now"
                  }
                )
              ] })
            ] }),
            flashMessage && /* @__PURE__ */ jsx("div", { className: `mt-6 p-3 rounded-md text-white text-center ${flashType === "success" ? "bg-green-600" : "bg-red-600"}`, children: flashMessage })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow", children: [
            ((_a = product.varients) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Variant" }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-3 flex-wrap", children: product.varients.map((v) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setSelectedVarient(v);
                    setSelectedDesign(null);
                    setSelectedSize(null);
                    updateSelectionInUrl({ v: v.id });
                  },
                  className: `px-3 py-2 rounded-md border text-sm ${(selectedVarient == null ? void 0 : selectedVarient.id) === v.id ? "bg-maroon-600 text-white border-maroon-600" : "bg-white border-gray-300 hover:border-maroon-300"}`,
                  children: v.name
                },
                v.id
              )) })
            ] }),
            ((_b = selectedVarient == null ? void 0 : selectedVarient.designs) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Design" }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-3 flex-wrap", children: selectedVarient.designs.map((d) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setSelectedDesign(d);
                    setSelectedSize(null);
                    updateSelectionInUrl({
                      v: selectedVarient.id,
                      d: d.id
                    });
                  },
                  className: `px-3 py-2 rounded-md border text-sm ${(selectedDesign == null ? void 0 : selectedDesign.id) === d.id ? "bg-maroon-600 text-white border-maroon-600" : "bg-white border-gray-300 hover:border-maroon-300"}`,
                  children: d.name
                },
                d.id
              )) })
            ] }),
            ((_c = selectedDesign == null ? void 0 : selectedDesign.sizes) == null ? void 0 : _c.length) > 0 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Size" }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-3 flex-wrap", children: selectedDesign.sizes.map((s) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setSelectedSize(s);
                    updateSelectionInUrl({
                      v: selectedVarient.id,
                      d: selectedDesign.id,
                      s: s.id
                    });
                  },
                  className: `px-3 py-2 rounded-md border text-sm ${(selectedSize == null ? void 0 : selectedSize.id) === s.id ? "bg-maroon-600 text-white border-maroon-600" : "bg-white border-gray-300 hover:border-maroon-300"}`,
                  children: s.name
                },
                s.id
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow text-sm text-gray-700", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold mb-2", children: "Product Details" }),
            activeDetails.description && /* @__PURE__ */ jsx("p", { className: "mb-2 text-gray-700", children: activeDetails.description }),
            activeDetails.feature1 && /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              activeDetails.feature1
            ] }),
            activeDetails.feature2 && /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              activeDetails.feature2
            ] }),
            activeDetails.feature3 && /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              activeDetails.feature3
            ] }),
            activeDetails.material && /* @__PURE__ */ jsxs("div", { className: "flex align-middle mt-3", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Material: " }),
              /* @__PURE__ */ jsx("p", { className: "ml-1", children: activeDetails.material })
            ] }),
            activeDetails.size && /* @__PURE__ */ jsxs("div", { className: "flex align-middle mt-3", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Size: " }),
              /* @__PURE__ */ jsx("p", { className: "ml-1", children: activeDetails.size })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductPage$1
}, Symbol.toStringTag, { value: "Module" }));
const RelatedProducts = ({ products: initialProducts, autoSlideInterval = 3e3, itemsToShow = 4 }) => {
  const products = Object.values(initialProducts);
  const CLONE_COUNT = products.length > 0 ? Math.min(products.length, itemsToShow) : 0;
  const endlessProducts = products.length > 0 ? [...products.slice(-CLONE_COUNT), ...products, ...products.slice(0, CLONE_COUNT)] : [];
  const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const currentTranslateX = useRef(0);
  useEffect(() => {
    if (products.length <= itemsToShow) {
      setCurrentIndex(0);
      return;
    }
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [products.length, autoSlideInterval, itemsToShow]);
  useEffect(() => {
    if (endlessProducts.length === 0 || products.length <= itemsToShow) return;
    if (currentIndex >= endlessProducts.length - CLONE_COUNT) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(CLONE_COUNT);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsTransitioning(true));
        });
      }, 700);
    } else if (currentIndex < CLONE_COUNT && currentIndex !== 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(products.length);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsTransitioning(true));
        });
      }, 700);
    }
  }, [currentIndex, endlessProducts.length, CLONE_COUNT, products.length]);
  const getTranslateX = () => {
    var _a;
    if (!trackRef.current || endlessProducts.length === 0) return 0;
    const itemWidth = ((_a = trackRef.current.children[0]) == null ? void 0 : _a.offsetWidth) || 0;
    return -currentIndex * itemWidth;
  };
  const handleTouchStart = (e) => {
    setIsTransitioning(false);
    touchStartX.current = e.touches[0].clientX;
    currentTranslateX.current = getTranslateX();
  };
  const handleTouchMove = (e) => {
    const touchCurrentX = e.touches[0].clientX;
    const diffX = touchCurrentX - touchStartX.current;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${currentTranslateX.current + diffX}px)`;
    }
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX.current;
    const swipeThreshold = trackRef.current ? trackRef.current.offsetWidth / (itemsToShow * 4) : 50;
    setIsTransitioning(true);
    if (diffX > swipeThreshold) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (diffX < -swipeThreshold) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex((prevIndex) => prevIndex);
    }
  };
  if (!products || products.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-12 py-8 bg-gray-50 rounded-lg shadow-inner overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800 mb-6 text-center", children: "Related Products" }),
    /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden w-full px-4", children: /* @__PURE__ */ jsx(
      "div",
      {
        ref: trackRef,
        className: `flex ${isTransitioning ? "transition-transform duration-700 ease-out" : ""}`,
        style: { transform: `translateX(${getTranslateX()}px)` },
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        children: endlessProducts.map((product, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `flex-shrink-0 p-2
                                ${itemsToShow === 1 ? "w-full" : ""}
                                ${itemsToShow === 2 ? "w-1/2" : ""}
                                ${itemsToShow === 3 ? "w-1/2 sm:w-1/3" : ""}
                                ${itemsToShow >= 4 ? "w-1/2 sm:w-1/3 lg:w-1/4" : ""}
                            `,
            children: /* @__PURE__ */ jsxs(
              Link,
              {
                href: `/${product.slug}`,
                data: { "id": "product" },
                className: " bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `/storage/${product.small_image}`,
                      alt: product.name,
                      className: "w-full h-full object-cover",
                      onError: (e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/256x256/E0E0E0/A0A0A0?text=No+Image`;
                      }
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "p-4 flex-grow flex flex-col justify-between", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-800 truncate mb-2", children: product.name }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
                      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm line-through", children: [
                        "MRP: ₹",
                        product.mrp || "N/A"
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-maroon-700", children: [
                        "₹",
                        product.price || "N/A"
                      ] })
                    ] })
                  ] })
                ]
              }
            )
          },
          `${product.id}-${index}`
        ))
      }
    ) }),
    products.length > itemsToShow && /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2", children: products.map((_2, index) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          setIsTransitioning(true);
          setCurrentIndex(CLONE_COUNT + index);
        },
        className: `w-3 h-3 rounded-full transition-colors duration-300 ${// Highlight dot if the current visible item (after accounting for clones) matches
        // The calculation (currentIndex - CLONE_COUNT) maps the endless index back to the original products array index
        currentIndex - CLONE_COUNT === index ? "bg-maroon-600" : "bg-gray-400"}`,
        "aria-label": `Go to product ${index + 1}`
      },
      index
    )) })
  ] });
};
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RelatedProducts
}, Symbol.toStringTag, { value: "Module" }));
function Product({ product, clusters, products }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Welcome, { clusters, children: [
    /* @__PURE__ */ jsx(ProductPage$1, { product }),
    /* @__PURE__ */ jsx(RelatedProducts, { products })
  ] }) });
}
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Product
}, Symbol.toStringTag, { value: "Module" }));
function ProductPage({ product }) {
  var _a, _b, _c;
  if (!product) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center p-8", children: "Product data not available." });
  }
  const { addItemToCart, fetchCartItemsFromBackend } = useCart();
  const [selectedVarient, setSelectedVarient] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [flashMessage, setFlashMessage] = useState(null);
  const [flashType, setFlashType] = useState("success");
  const flashRef = useRef(null);
  const addToCartBtnRef = useRef(null);
  const flyRef = useRef(null);
  const showFlash = (msg, type = "success") => {
    setFlashMessage(msg);
    setFlashType(type);
    if (flashRef.current) clearTimeout(flashRef.current);
    flashRef.current = setTimeout(() => {
      setFlashMessage(null);
      flashRef.current = null;
    }, 4500);
  };
  const readSelectionFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      variant: params.get("variant"),
      design: params.get("design"),
      size: params.get("size")
    };
  };
  const updateSelectionInUrl = ({ v, d, s }) => {
    const params = new URLSearchParams(window.location.search);
    if (v) params.set("variant", v);
    else params.delete("variant");
    if (d) params.set("design", d);
    else params.delete("design");
    if (s) params.set("size", s);
    else params.delete("size");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };
  const animateAddToCart = () => {
    const flyEl = flyRef.current;
    const btnEl = addToCartBtnRef.current;
    const cartEl = document.querySelector("#cart-icon") || document.querySelector("[data-cart-icon]");
    if (!flyEl || !btnEl || !cartEl) return;
    const btnRect = btnEl.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const startX = btnRect.left + btnRect.width / 2 + scrollX;
    const startY = btnRect.top + scrollY;
    const endX = cartRect.left + cartRect.width / 2 + scrollX;
    const endY = cartRect.top + cartRect.height / 2 + scrollY;
    flyEl.style.left = `${startX}px`;
    flyEl.style.top = `${startY}px`;
    flyEl.style.opacity = "1";
    flyEl.style.transition = "none";
    flyEl.style.transform = "translate(-50%, -50%) scale(1)";
    requestAnimationFrame(() => {
      flyEl.style.transition = "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 2.4s";
      flyEl.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0.5)`;
      flyEl.style.opacity = "0";
    });
    cartEl.classList.add("cart-bounce");
    setTimeout(() => cartEl.classList.remove("cart-bounce"), 400);
  };
  useEffect(() => {
    var _a2, _b2, _c2, _d;
    const { variant, design, size } = readSelectionFromUrl();
    let v = ((_a2 = product.varients) == null ? void 0 : _a2.find((x) => String(x.id) === String(variant))) || ((_b2 = product.varients) == null ? void 0 : _b2[0]) || null;
    setSelectedVarient(v);
    if (v && design) {
      const d = ((_c2 = v.designs) == null ? void 0 : _c2.find((x) => String(x.id) === String(design))) || null;
      setSelectedDesign(d);
      if (d && size) {
        const s = ((_d = d.sizes) == null ? void 0 : _d.find((x) => String(x.id) === String(size))) || null;
        setSelectedSize(s);
      } else {
        setSelectedSize(null);
      }
    } else {
      setSelectedDesign(null);
      setSelectedSize(null);
    }
    setQuantity(1);
  }, [product]);
  useEffect(() => {
    const onPopState = () => {
      var _a2, _b2, _c2, _d;
      const { variant, design, size } = readSelectionFromUrl();
      let v = ((_a2 = product.varients) == null ? void 0 : _a2.find((x) => String(x.id) === String(variant))) || ((_b2 = product.varients) == null ? void 0 : _b2[0]) || null;
      setSelectedVarient(v);
      if (v && design) {
        const d = ((_c2 = v.designs) == null ? void 0 : _c2.find((x) => String(x.id) === String(design))) || null;
        setSelectedDesign(d);
        if (d && size) {
          const s = ((_d = d.sizes) == null ? void 0 : _d.find((x) => String(x.id) === String(size))) || null;
          setSelectedSize(s);
        } else {
          setSelectedSize(null);
        }
      } else {
        setSelectedDesign(null);
        setSelectedSize(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [product]);
  const extractYouTubeId = (youtube) => {
    if (!youtube) return null;
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/;
    const m = youtube.match(regExp);
    if (m && m[1]) return m[1];
    const maybe = youtube.split("?")[0].split("#")[0].slice(-11);
    return /^[A-Za-z0-9_-]{11}$/.test(maybe) ? maybe : null;
  };
  const mainProductImages = useMemo(() => {
    const images = [];
    const seen = /* @__PURE__ */ new Set();
    const add = (id, obj) => {
      if (!(obj == null ? void 0 : obj.name)) return;
      if (seen.has(obj.name)) return;
      seen.add(obj.name);
      images.push({ id, ...obj });
    };
    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        add(`p-img-${img.id ?? img.name}`, {
          type: "image",
          name: img.name,
          thumbnail_url: img.thumbnail_url ?? img.name
        });
      });
    }
    if (product.small_image) {
      add("p-small-img", {
        type: "image",
        name: product.small_image,
        thumbnail_url: product.small_image
      });
    }
    if (selectedVarient) {
      if (Array.isArray(selectedVarient.images)) {
        selectedVarient.images.forEach((img) => {
          add(`v-img-${selectedVarient.id}-${img.id ?? img.name}`, {
            type: "image",
            name: img.name,
            thumbnail_url: img.thumbnail_url ?? img.name
          });
        });
      }
      if (selectedVarient.size_image) {
        add(`v-size-${selectedVarient.id}`, {
          type: "image",
          name: selectedVarient.size_image,
          thumbnail_url: selectedVarient.size_image
        });
      }
    }
    if (selectedDesign == null ? void 0 : selectedDesign.size_image) {
      add(`d-size-${selectedDesign.id}`, {
        type: "image",
        name: selectedDesign.size_image,
        thumbnail_url: selectedDesign.size_image
      });
    }
    if (selectedSize == null ? void 0 : selectedSize.size_image) {
      add(`s-size-${selectedSize.id}`, {
        type: "image",
        name: selectedSize.size_image,
        thumbnail_url: selectedSize.size_image
      });
    }
    const yt = extractYouTubeId(product.youtube);
    if (yt) {
      add(`yt-${yt}`, {
        type: "youtube",
        name: yt,
        thumbnail_url: `https://img.youtube.com/vi/${yt}/hqdefault.jpg`,
        url: `https://www.youtube.com/embed/${yt}?rel=0`
      });
    }
    if (images.length === 0) {
      add("placeholder", {
        type: "placeholder",
        name: "https://placehold.co/800x800?text=No+Image",
        thumbnail_url: "https://placehold.co/100x100?text=No+Image"
      });
    }
    return images;
  }, [product, selectedVarient, selectedDesign, selectedSize]);
  const activeOption = selectedSize || selectedDesign || selectedVarient;
  const displayedMRP = activeOption == null ? void 0 : activeOption.mrp;
  const displayedPrice = activeOption == null ? void 0 : activeOption.price;
  const productForCart = useMemo(() => {
    var _a2;
    if (!product || !selectedVarient) return null;
    const opt = activeOption || selectedVarient;
    const compositeId = [
      `p${product.id}`,
      `v${selectedVarient == null ? void 0 : selectedVarient.id}`,
      selectedDesign ? `d${selectedDesign.id}` : null,
      selectedSize ? `s${selectedSize.id}` : null
    ].filter(Boolean).join("-");
    const mainImage = ((_a2 = mainProductImages.find((i) => i.type === "image")) == null ? void 0 : _a2.name) || product.thumbnail || null;
    return {
      id: compositeId,
      product_id: product.id,
      name: product.name,
      varient_id: (selectedVarient == null ? void 0 : selectedVarient.id) || null,
      design_id: (selectedDesign == null ? void 0 : selectedDesign.id) || null,
      size_id: (selectedSize == null ? void 0 : selectedSize.id) || null,
      price: (opt == null ? void 0 : opt.price) ?? null,
      mrp: (opt == null ? void 0 : opt.mrp) ?? null,
      quantity: Number(quantity) || 1,
      image: mainImage
    };
  }, [product, selectedVarient, selectedDesign, selectedSize, quantity, mainProductImages, activeOption]);
  const activeDetails = useMemo(() => {
    const src = selectedVarient ?? product;
    return {
      description: src.description || "",
      feature1: src.feature1 || "",
      feature2: src.feature2 || "",
      feature3: src.feature3 || "",
      material: src.material || "",
      size: src.size || ""
    };
  }, [product, selectedVarient]);
  const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : null;
  };
  const postJson = async (url, payload) => {
    const csrf = getCsrfToken();
    if (!csrf) {
      showFlash("Security error: CSRF token missing. Refresh the page.", "warning");
      return false;
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": csrf },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        showFlash(data.message || "Server error while updating cart", "warning");
        return false;
      }
      return true;
    } catch (err) {
      console.error("Network error:", err);
      showFlash("Network error. Please check your connection.", "warning");
      return false;
    }
  };
  const handleAddToCart = async () => {
    if (!selectedVarient) {
      showFlash("Please select a variant.", "warning");
      return;
    }
    const hasDesigns = Array.isArray(selectedVarient.designs) && selectedVarient.designs.length > 0;
    if (hasDesigns && !selectedDesign) {
      showFlash("Please select a design.", "warning");
      return;
    }
    const hasSizes = selectedDesign && Array.isArray(selectedDesign.sizes) && selectedDesign.sizes.length > 0;
    if (hasSizes && !selectedSize) {
      showFlash("Please select a size.", "warning");
      return;
    }
    if (!productForCart) {
      showFlash("Invalid selection.", "warning");
      return;
    }
    const payload = {
      product_id: productForCart.product_id,
      varient_id: productForCart.varient_id,
      design_id: productForCart.design_id,
      size_id: productForCart.size_id,
      quantity: productForCart.quantity,
      price: productForCart.price,
      mrp: productForCart.mrp
    };
    const ok = await postJson("/cart/add-item", payload);
    if (ok) {
      animateAddToCart();
      addItemToCart(productForCart, productForCart.quantity);
      await fetchCartItemsFromBackend();
      showFlash("Added to cart.", "success");
    }
  };
  const handleBuyNow = async () => {
    if (!selectedVarient) {
      showFlash("Please select a variant.", "warning");
      return;
    }
    const hasDesigns = Array.isArray(selectedVarient.designs) && selectedVarient.designs.length > 0;
    if (hasDesigns && !selectedDesign) {
      showFlash("Please select a design.", "warning");
      return;
    }
    const hasSizes = selectedDesign && Array.isArray(selectedDesign.sizes) && selectedDesign.sizes.length > 0;
    if (hasSizes && !selectedSize) {
      showFlash("Please select a size.", "warning");
      return;
    }
    if (!productForCart) {
      showFlash("Invalid selection.", "warning");
      return;
    }
    const payload = {
      product_id: productForCart.product_id,
      varient_id: productForCart.varient_id,
      design_id: productForCart.design_id,
      size_id: productForCart.size_id,
      quantity: productForCart.quantity,
      price: productForCart.price,
      mrp: productForCart.mrp
    };
    const ok = await postJson("/cart/add-item", payload);
    if (ok) {
      addItemToCart(productForCart, productForCart.quantity);
      await fetchCartItemsFromBackend();
      router.visit("/cart");
    }
  };
  const calculateDiscountPercentage = (mrp, price) => {
    if (typeof mrp === "number" && typeof price === "number" && mrp > 0) {
      return Math.round((mrp - price) / mrp * 100);
    }
    return 0;
  };
  const active = selectedSize || selectedDesign || selectedVarient;
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": mainProductImages.filter((img) => img.type === "image").map((img) => `${window.location.origin}/storage/${img.name}`),
    "description": (active == null ? void 0 : active.description) || product.description || "",
    "sku": `VAR-${(active == null ? void 0 : active.id) || product.id}`,
    "mpn": `${(active == null ? void 0 : active.id) || product.id}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Amaltas"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": (active == null ? void 0 : active.price) ?? 0,
      "availability": (active == null ? void 0 : active.qty) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": window.location.href
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8", children: [
    /* @__PURE__ */ jsxs(Head, { title: `${product.name} | Amaltas Furniture`, children: [
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: `${product.name} | Amaltas Furniture` }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: (activeDetails == null ? void 0 : activeDetails.description) || product.description || "Check out this product" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "product" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: typeof window !== "undefined" ? window.location.href : "" }),
      mainProductImages.filter((img) => img.type === "image").length > 0 && /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:image",
          content: `${typeof window !== "undefined" ? window.location.origin : ""}/storage/${mainProductImages.filter((img) => img.type === "image")[0].name}`
        }
      ),
      /* @__PURE__ */ jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: { __html: JSON.stringify(productJsonLd) }
        }
      ),
      /* @__PURE__ */ jsx("style", { children: `
  .cart-bounce {
    animation: cartBounce 0.4s ease;
  }

  @keyframes cartBounce {
    0% { transform: scale(1); }
    30% { transform: scale(1.15); }
    60% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }
` })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: flyRef,
        className: "fixed pointer-events-none z-[9999]\n    flex items-center justify-center\n    bg-maroon-800 text-white\n    font-extrabold\n    text-lg md:text-xl\n    w-10 h-10 md:w-12 md:h-12\n    rounded-full\n    shadow-lg\n    opacity-0",
        style: { transform: "translate(-50%, -50%)" },
        children: [
          "+",
          quantity
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl font-extrabold text-gray-900", children: product.name }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsx(ImageGallery, { images: mainProductImages, productName: product.name }) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow", children: [
            typeof displayedMRP === "number" && typeof displayedPrice === "number" ? /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "text-gray-500 line-through", children: [
                "MRP: ₹",
                displayedMRP
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-3xl font-extrabold text-maroon-700", children: [
                "₹",
                displayedPrice
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm text-blue-600", children: [
                calculateDiscountPercentage(displayedMRP, displayedPrice),
                "% OFF"
              ] })
            ] }) : /* @__PURE__ */ jsx("div", { className: "text-2xl font-semibold", children: "Price on selection" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-700", children: "Qty" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    min: "1",
                    value: quantity,
                    onChange: (e) => {
                      const v = Number(e.target.value);
                      setQuantity(Number.isFinite(v) && v > 0 ? v : 1);
                    },
                    className: "w-20 p-2 border rounded text-center"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleAddToCart,
                    ref: addToCartBtnRef,
                    className: "bg-maroon-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-maroon-700 transition",
                    children: "Add to Cart"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleBuyNow,
                    className: "bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition",
                    children: "Buy Now"
                  }
                )
              ] })
            ] }),
            flashMessage && /* @__PURE__ */ jsx("div", { className: `mt-6 p-3 rounded-md text-white text-center ${flashType === "success" ? "bg-green-600" : "bg-red-600"}`, children: flashMessage })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow", children: [
            ((_a = product.varients) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Variant" }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-3 flex-wrap", children: product.varients.map((v) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setSelectedVarient(v);
                    setSelectedDesign(null);
                    setSelectedSize(null);
                    updateSelectionInUrl({ v: v.id });
                  },
                  className: `px-3 py-2 rounded-md border text-sm ${(selectedVarient == null ? void 0 : selectedVarient.id) === v.id ? "bg-maroon-600 text-white border-maroon-600" : "bg-white border-gray-300 hover:border-maroon-300"}`,
                  children: v.name
                },
                v.id
              )) })
            ] }),
            ((_b = selectedVarient == null ? void 0 : selectedVarient.designs) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Design" }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-3 flex-wrap", children: selectedVarient.designs.map((d) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setSelectedDesign(d);
                    setSelectedSize(null);
                    updateSelectionInUrl({
                      v: selectedVarient.id,
                      d: d.id
                    });
                  },
                  className: `px-3 py-2 rounded-md border text-sm ${(selectedDesign == null ? void 0 : selectedDesign.id) === d.id ? "bg-maroon-600 text-white border-maroon-600" : "bg-white border-gray-300 hover:border-maroon-300"}`,
                  children: d.name
                },
                d.id
              )) })
            ] }),
            ((_c = selectedDesign == null ? void 0 : selectedDesign.sizes) == null ? void 0 : _c.length) > 0 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Size" }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-3 flex-wrap", children: selectedDesign.sizes.map((s) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setSelectedSize(s);
                    updateSelectionInUrl({
                      v: selectedVarient.id,
                      d: selectedDesign.id,
                      s: s.id
                    });
                  },
                  className: `px-3 py-2 rounded-md border text-sm ${(selectedSize == null ? void 0 : selectedSize.id) === s.id ? "bg-maroon-600 text-white border-maroon-600" : "bg-white border-gray-300 hover:border-maroon-300"}`,
                  children: s.name
                },
                s.id
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow text-sm text-gray-700", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold mb-2", children: "Product Details" }),
            activeDetails.description && /* @__PURE__ */ jsx("p", { className: "mb-2 text-gray-700", children: activeDetails.description }),
            activeDetails.feature1 && /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              activeDetails.feature1
            ] }),
            activeDetails.feature2 && /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              activeDetails.feature2
            ] }),
            activeDetails.feature3 && /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              activeDetails.feature3
            ] }),
            activeDetails.material && /* @__PURE__ */ jsxs("div", { className: "flex align-middle mt-3", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Material: " }),
              /* @__PURE__ */ jsx("p", { className: "ml-1", children: activeDetails.material })
            ] }),
            activeDetails.size && /* @__PURE__ */ jsxs("div", { className: "flex align-middle mt-3", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Size: " }),
              /* @__PURE__ */ jsx("p", { className: "ml-1", children: activeDetails.size })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductPage
}, Symbol.toStringTag, { value: "Module" }));
function UserEstimate({ costing = [], installation = 0, clusters, material }) {
  console.log(material);
  const calcHardwareCost2 = (hardware) => Array.isArray(hardware) ? hardware.reduce(
    (sum, h) => sum + (Number(h.rate) || 0) * (Number(h.quantity) || 1),
    0
  ) : 0;
  const totalCabinets2 = costing.reduce((t, c) => t + (Number(c.cost) || 0), 0);
  const totalHardware2 = costing.reduce((t, c) => t + calcHardwareCost2(c.hardware), 0);
  const installationCost2 = Number(installation) || 0;
  const subtotal2 = totalCabinets2 + totalHardware2 + installationCost2;
  const gst2 = subtotal2 * 0.18;
  const grandTotal2 = subtotal2 + gst2;
  return /* @__PURE__ */ jsxs(Welcome, { clusters, children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "Your Kitchen Estimate | Amaltas Furniture Studio" }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto p-6 bg-gray-50", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Your Kitchen Estimate" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "This is a summary of your customized kitchen estimate." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-10 border", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Cabinet Summary" }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "border px-4 py-2 text-left", children: "Cabinet" }),
            /* @__PURE__ */ jsx("th", { className: "border px-4 py-2 text-left", children: "Size" }),
            /* @__PURE__ */ jsx("th", { className: "border px-4 py-2 text-right", children: "Cabinet Cost" }),
            /* @__PURE__ */ jsx("th", { className: "border px-4 py-2 text-right", children: "Hardware Cost" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            costing.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "4", className: "border px-4 py-6 text-center text-gray-500", children: "No estimate found." }) }),
            costing.map((cab) => {
              const hardwareTotal = calcHardwareCost2(cab.hardware);
              return /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: cab.name }),
                /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: cab.size }),
                /* @__PURE__ */ jsxs("td", { className: "border px-4 py-2 text-right font-medium", children: [
                  "₹",
                  Math.round(cab.cost).toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "border px-4 py-2 text-right font-medium", children: [
                  "₹",
                  Math.round(hardwareTotal).toLocaleString("en-IN")
                ] })
              ] }, cab.id);
            })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 border max-w-md ml-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Final Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
            /* @__PURE__ */ jsx("span", { children: "Cabinet Cost" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "₹",
              Math.round(totalCabinets2).toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
            /* @__PURE__ */ jsx("span", { children: "Hardware Cost" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "₹",
              Math.round(totalHardware2).toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b pb-1", children: [
            /* @__PURE__ */ jsx("span", { children: "Installation" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "₹",
              Math.round(installationCost2).toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-semibold text-gray-900 pt-2", children: [
            /* @__PURE__ */ jsx("span", { children: "Total Before GST" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "₹",
              Math.round(subtotal2).toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-t pt-2", children: [
            /* @__PURE__ */ jsx("span", { children: "GST (18%)" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "₹",
              Math.round(gst2).toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-2xl font-extrabold text-green-700 mt-4", children: [
            /* @__PURE__ */ jsx("span", { children: "Grand Total" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "₹",
              Math.round(grandTotal2).toLocaleString("en-IN")
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 bg-white border rounded-lg shadow-md p-6 text-gray-700 text-md space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Important Notes" }),
        /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: "To save this estimate, please register or log in using the same mobile number on our website." }),
          /* @__PURE__ */ jsx("li", { children: "This estimate is indicative and may vary based on final site measurements and material selections." })
        ] }),
        /* @__PURE__ */ jsx(KitchenEstimatePriceCard, { subtotal: material[3], gst: 1800, total: 11800, material }),
        /* @__PURE__ */ jsx("div", { className: "pt-4 text-center", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "/login",
            className: "inline-block bg-[#800000] text-white px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-[#6d0000] transition",
            children: "Register / Login to Save Estimate"
          }
        ) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UserEstimate
}, Symbol.toStringTag, { value: "Module" }));
const QuantityInput = ({ value, onChange, min = 1 }) => {
  const updateQuantity = (newValue) => {
    if (newValue < min) return;
    onChange(newValue);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center border rounded-md w-28", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200 rounded-l-md",
        onClick: () => updateQuantity(value - 1),
        children: "–"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "number",
        value,
        min,
        onChange: (e) => updateQuantity(Number(e.target.value)),
        className: "w-full text-center outline-none"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200 rounded-r-md",
        onClick: () => updateQuantity(value + 1),
        children: "+"
      }
    )
  ] });
};
const __vite_glob_0_49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: QuantityInput
}, Symbol.toStringTag, { value: "Module" }));
function QuestionPrompt({ question, onAnswer }) {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-lg max-w-sm text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", children: question }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-around", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "px-4 py-2 bg-green-500 text-white rounded-lg",
          onClick: () => onAnswer("yes"),
          children: "Yes"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "px-4 py-2 bg-red-500 text-white rounded-lg",
          onClick: () => onAnswer("no"),
          children: "No"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-xs block bg-blue-100 mt-5 border rounded-2xl border-r-amber-100 p-2", children: "Bulky Products can only be shipped near Dehradun." })
  ] }) });
}
const __vite_glob_0_50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: QuestionPrompt
}, Symbol.toStringTag, { value: "Module" }));
const Estimate = React.lazy(() => Promise.resolve().then(() => __vite_glob_0_8));
const Inner = ({
  userData,
  ordersData,
  costing = [],
  installation = 0,
  estimates = [],
  material = {},
  materials = [],
  addons = [],
  cabinetTypes = []
}) => {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem("activeSection") || "orders";
  });
  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);
  const formatPrice = (price) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price);
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${date.getFullYear()}`;
  };
  const getNavLinkClasses = (sectionName) => `flex items-center space-x-3 p-4 transition-colors duration-200 rounded-lg ${activeSection === sectionName ? "bg-indigo-100 text-indigo-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`;
  const completePurchase = (orderId) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/restore";
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
    form.innerHTML = `
      <input type="hidden" name="_token" value="${token}" />
      <input type="hidden" name="orderId" value="${orderId}" />
    `;
    document.body.appendChild(form);
    form.submit();
  };
  const renderOrderItems = (items) => /* @__PURE__ */ jsx("div", { className: "space-y-4 mt-4", children: items.map((item) => {
    var _a, _b, _c, _d;
    return /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-grow p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg text-gray-800", children: ((_a = item.product) == null ? void 0 : _a.name) || "N/A" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 text-sm text-gray-600", children: [
          ((_b = item.variant) == null ? void 0 : _b.name) && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Variant:" }),
            " ",
            item.variant.name
          ] }),
          ((_c = item.design) == null ? void 0 : _c.name) && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Design:" }),
            " ",
            item.design.name
          ] }),
          ((_d = item.size) == null ? void 0 : _d.name) && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Size:" }),
            " ",
            item.size.name
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm md:text-base text-right md:text-left", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 font-semibold", children: [
          "Qty: ",
          item.quantity
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 font-semibold mt-1", children: [
          "Price: ",
          formatPrice(item.price)
        ] })
      ] })
    ] }) }, item.id);
  }) });
  const myOrders = (ordersData == null ? void 0 : ordersData.filter(
    (o) => o.cashfree_order_id && o.status === "paid" && o.payment_status === "pending"
  )) || [];
  const pendingOrders = (ordersData == null ? void 0 : ordersData.filter((o) => o.status === "pending")) || [];
  const completeOrders = (ordersData == null ? void 0 : ordersData.filter((o) => o.status === "delivered")) || [];
  const renderMainContent = () => {
    switch (activeSection) {
      case "orders":
        return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-4", children: "My Orders" }),
          myOrders.length > 0 ? myOrders.map((order) => /* @__PURE__ */ jsxs("div", { className: "border-b pb-4 mb-4", children: [
            /* @__PURE__ */ jsxs("p", { className: "font-semibold text-lg text-slate-800", children: [
              "Order #",
              order.id
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
              formatDate(order.created_at),
              " | ",
              formatPrice(order.total_amount)
            ] }),
            renderOrderItems(order.items || [])
          ] }, order.id)) : /* @__PURE__ */ jsx("p", { className: "bg-indigo-50 p-4 rounded-lg text-gray-600", children: "No orders found." })
        ] });
      case "pending_orders":
        return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-4", children: "Pending Orders" }),
          pendingOrders.length > 0 ? pendingOrders.map((order) => /* @__PURE__ */ jsxs("div", { className: "border-b pb-4 mb-4", children: [
            /* @__PURE__ */ jsxs("p", { className: "font-semibold text-lg text-slate-800", children: [
              "Order #",
              order.id
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
              formatDate(order.created_at),
              " | ",
              formatPrice(order.total_amount)
            ] }),
            renderOrderItems(order.items || []),
            /* @__PURE__ */ jsx(PrimaryButton, { onClick: () => completePurchase(order.id), className: "mt-3", children: "Complete Purchase" })
          ] }, order.id)) : /* @__PURE__ */ jsx("p", { className: "bg-indigo-50 p-4 rounded-lg text-gray-600", children: "No pending orders found." })
        ] });
      case "complete_orders":
        return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-4", children: "Completed Orders" }),
          completeOrders.length > 0 ? completeOrders.map((order) => /* @__PURE__ */ jsxs("div", { className: "border-b pb-4 mb-4", children: [
            /* @__PURE__ */ jsxs("p", { className: "font-semibold text-lg text-slate-800", children: [
              "Order #",
              order.id
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
              formatDate(order.created_at),
              " | ",
              formatPrice(order.total_amount)
            ] }),
            renderOrderItems(order.items || [])
          ] }, order.id)) : /* @__PURE__ */ jsx("p", { className: "bg-indigo-50 p-4 rounded-lg text-gray-600", children: "No completed orders found." })
        ] });
      // ✅ Kitchen Estimates (lazy-loaded)
      case "kitchen_estimates":
        return /* @__PURE__ */ jsx("div", { className: "bg-gray-100 rounded-lg p-4", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("p", { children: "Loading Kitchen Estimates..." }), children: /* @__PURE__ */ jsx(
          Estimate,
          {
            embedded: true,
            costing,
            installation,
            estimates,
            material,
            materials,
            addons,
            cabinetTypes
          }
        ) }) });
      case "help":
        return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-4", children: "Help Desk" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
            "You can mail us at ",
            /* @__PURE__ */ jsx("strong", { children: "amaltasfurniture@gmail.com" }),
            " ",
            /* @__PURE__ */ jsx("br", {}),
            "WhatsApp / call us at ",
            /* @__PURE__ */ jsx("strong", { children: "93683 30915" })
          ] })
        ] });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 p-4 font-sans", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:w-1/4 p-6 bg-white rounded-xl shadow-sm border border-gray-200", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 mb-8", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: (userData == null ? void 0 : userData.profileImage) || "https://placehold.co/50x50/FCA5A5/FFFFFF?text=JD",
            alt: "Profile",
            className: "w-16 h-16 rounded-full border-2 border-indigo-400"
          }
        ),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-slate-800", children: (userData == null ? void 0 : userData.name) || "Guest" }) })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            onClick: (e) => {
              e.preventDefault();
              setActiveSection("orders");
            },
            className: getNavLinkClasses("orders"),
            children: "My Orders"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            onClick: (e) => {
              e.preventDefault();
              setActiveSection("pending_orders");
            },
            className: getNavLinkClasses("pending_orders"),
            children: "Pending Orders"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            onClick: (e) => {
              e.preventDefault();
              setActiveSection("complete_orders");
            },
            className: getNavLinkClasses("complete_orders"),
            children: "Completed Orders"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            onClick: (e) => {
              e.preventDefault();
              setActiveSection("kitchen_estimates");
            },
            className: getNavLinkClasses("kitchen_estimates"),
            children: "Kitchen Estimates"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            onClick: (e) => {
              e.preventDefault();
              setActiveSection("help");
            },
            className: getNavLinkClasses("help"),
            children: "Help Desk"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1", children: renderMainContent() })
  ] }) });
};
const __vite_glob_0_84 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Inner
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard({
  user,
  orders,
  clusters,
  costing = [],
  installation = 0,
  estimates = [],
  material = {},
  materials = [],
  addons = [],
  cabinetTypes = []
}) {
  return /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsx(
    Inner,
    {
      userData: user,
      ordersData: orders,
      costing,
      installation,
      estimates,
      material,
      materials,
      addons,
      cabinetTypes
    }
  ) });
}
const __vite_glob_0_83 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
const DashboardRouter = () => {
  var _a;
  const { auth } = usePage().props;
  const userId = (_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.id;
  console.log("DashboardRouter: User ID:", userId);
  if (userId === 1) {
    console.log("DashboardRouter: Rendering Admin Dashboard.");
    return /* @__PURE__ */ jsx(Dashboard$1, {});
  } else {
    console.log("DashboardRouter: Rendering User Dashboard.");
    return /* @__PURE__ */ jsx(Dashboard, {});
  }
};
const __vite_glob_0_51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DashboardRouter
}, Symbol.toStringTag, { value: "Module" }));
function AboutUs$1({ clusters }) {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);
  return /* @__PURE__ */ jsxs(Welcome, { clusters, children: [
    /* @__PURE__ */ jsx(Head, { title: "About Us | Amaltas Furniture & Modular Kitchens, Dehradun" }),
    /* @__PURE__ */ jsxs("div", { className: "pb-20 space-y-20", children: [
      /* @__PURE__ */ jsx("section", { className: "px-4 pt-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center", children: [
        /* @__PURE__ */ jsxs("div", { "data-aos": "fade-up", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4", children: "Crafting Beautiful Homes" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-base md:text-lg leading-relaxed", children: [
            "Amaltas is a Dehradun-based furniture brand inspired by the Amaltas Tree — a tree known for its elegant golden bloom. Just like the flower, our purpose is to bring beauty, warmth, and harmony into every home we design for.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "We specialize in premium wooden furniture, modular kitchens, wardrobes, sofas, and complete interior solutions — all manufactured in-house for superior quality and reliability."
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { "data-aos": "fade-left", className: "w-full", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/building.png",
            className: "rounded-xl w-full shadow-md",
            alt: "Amaltas Furniture Studio"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "text-2xl md:text-4xl font-bold text-center mb-10",
            "data-aos": "fade-up",
            children: "What We Stand For"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-3", children: [
          {
            title: "Quality First",
            text: "Every product is made using the best materials — teak wood, sheesham wood, HDHMR, branded hardware, and premium polishes."
          },
          {
            title: "Honest Pricing",
            text: "Because we manufacture in-house, you receive factory-direct prices without compromising on craftsmanship."
          },
          {
            title: "Customization",
            text: "Every home is unique. You choose the size, finish, colors, and functionality — we build exactly what fits your lifestyle."
          }
        ].map((v, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-maroon-900 rounded-xl shadow-sm border p-6 text-center",
            "data-aos": "fade-up",
            children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl mb-2 text-white", children: v.title }),
              /* @__PURE__ */ jsx("p", { className: " text-sm text-maroon-200", children: v.text })
            ]
          },
          i
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center", children: [
        /* @__PURE__ */ jsx("div", { "data-aos": "fade-right", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/showroom.jpg",
            className: "rounded-xl shadow-md",
            alt: "Showroom Dehradun"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { "data-aos": "fade-up", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-4xl font-bold mb-4", children: "Visit Our 10000 Sq.ft Showroom" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed text-base md:text-lg", children: [
            "Explore a wide range of sofas, beds, dining tables, Modular Kitchens, wardrobes, TV units, office furniture and décor — all displayed in live, realistic settings so you can experience comfort and finish quality before buying.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Our team guides you through materials, polish shades, fabric choices, layouts, and durability options so you make confident decisions."
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-gray-50 py-16 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto text-center bg-white p-8 shadow-xl rounded-xl", "data-aos": "fade-up", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-4xl font-bold mb-6", children: "What We Manufacture" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 max-w-3xl mx-auto mb-10 text-base md:text-lg", children: "Every product is custom-built in our Dehradun factory. From raw wood to final polish, everything is done under one roof." }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: [
          "Sofas & Reclinable Sofas",
          "Beds (Teak, Sheesham, Upholstered)",
          "Modular Kitchens (L-shaped, Parallel, U-Shaped)",
          "Wardrobes (Sliding, Hinged, Walk-in)",
          "Dining Sets (Stone Top / Wooden Top)",
          "Office Furniture & Study Units"
        ].map((item, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "p-4 bg-maroon-800 h-[5em] rounded-lg border shadow-sm text-gray-200 w-full md:w-[calc(33.333%-10.66px)] flex items-center justify-center",
            "data-aos": "fade-up",
            children: item
          },
          i
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center", children: [
        /* @__PURE__ */ jsx("div", { "data-aos": "fade-right", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/factory.jpg",
            className: "rounded-xl shadow-md",
            alt: "Manufacturing"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { "data-aos": "fade-up", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-4xl font-bold mb-4", children: "Built in Our Own Factory" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-base md:text-lg leading-relaxed", children: [
            "Our production team includes experienced carpenters, polish masters, upholsterers, designers and helpers who bring every idea to life with precision.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "In-house manufacturing means:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 text-gray-700 text-base md:text-lg space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Better quality control" }),
            /* @__PURE__ */ jsx("li", { children: "Customization without limitations" }),
            /* @__PURE__ */ jsx("li", { children: "Faster delivery timelines" }),
            /* @__PURE__ */ jsx("li", { children: "Affordable pricing" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "px-4 py-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center", children: [
        /* @__PURE__ */ jsx("div", { "data-aos": "fade-left", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/vbsmall.jpg",
            className: "rounded-xl shadow-md",
            alt: "Founder"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { "data-aos": "fade-up", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-4xl font-bold mb-4", children: "Meet Our Founder" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed text-base md:text-lg", children: [
            "Amaltas Furniture Studio was founded by",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "Vivek Bansal" }),
            ", a NIFT Delhi graduate with a passion for materials, design, and innovation.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "His experience helps Amaltas stay updated with the latest in decorative laminates, PU finishes, polish techniques, hardware improvements and furniture technology."
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-[#800000] text-white py-16 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", "data-aos": "zoom-in", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-4xl font-bold mb-4", children: "Ready to Upgrade Your Home?" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/90 max-w-2xl mx-auto text-base md:text-lg mb-8", children: "Visit our showroom, explore materials and meet our team. Let’s build furniture that perfectly fits your home and lifestyle." }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://maps.app.goo.gl/nJXkZEFjrTgMWpne7",
            target: "_blank",
            className: "inline-block bg-white text-[#800000] font-semibold px-8 py-3 rounded-lg shadow hover:bg-gray-200 transition",
            children: "📍 Locate Us on Google Maps"
          }
        )
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutUs$1
}, Symbol.toStringTag, { value: "Module" }));
function PremiumPopup({
  show = false,
  title = "Thank You!",
  message = "Your message has been received.",
  onClose = () => {
  },
  autoClose = true,
  autoCloseTime = 3e3
}) {
  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => onClose(), autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [show]);
  if (!show) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
                @keyframes popupPremium {
                    0% {
                        opacity: 0;
                        transform: scale(0.8) translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes bounceSlow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }

                .popup-premium-container {
                    animation: fadeIn 0.3s ease-out;
                }

                .popup-premium-box {
                    animation: popupPremium 0.35s ease-out;
                }

                .popup-icon {
                    animation: bounceSlow 1.8s infinite ease-in-out;
                }
            ` }),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] popup-premium-container", children: /* @__PURE__ */ jsxs("div", { className: "popup-premium-box bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-11/12 max-w-md text-center border border-white/30", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-lg popup-icon", children: /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "h-12 w-12",
          viewBox: "0 0 24 24",
          strokeWidth: "2",
          stroke: "currentColor",
          fill: "none",
          children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" })
        }
      ) }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-gray-800 mb-3 tracking-tight", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg mb-6 leading-relaxed", children: message }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "px-8 py-3 rounded-xl bg-gray-900 text-white text-lg shadow hover:bg-gray-800 transition",
          children: "Close"
        }
      )
    ] }) })
  ] });
}
function ContactUs({ clusters }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${"6LeLWiUsAAAAAHt8zFrbFHTSGGlotk7R0uc2Wej3"}`;
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute("6LeLWiUsAAAAAHt8zFrbFHTSGGlotk7R0uc2Wej3", { action: "submit" }).then((token) => {
        const payload = { ...form, recaptcha_token: token };
        router.post("/contact-submit", payload, {
          onSuccess: () => {
            setShowPopup(true);
            setStatus("success");
            setForm({ name: "", mobile: "", email: "", message: "" });
          },
          onError: () => {
            setStatus("error");
          }
        });
      });
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Contact Us | Amaltas Furniture Dehradun" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Contact Amaltas Furniture & Modular Kitchens in Dehradun. Have questions or custom furniture needs? Reach out by phone, WhatsApp, email, or submit our contact form."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://www.amaltasfurniture.com/contact-us" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Contact Us | Amaltas Furniture" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Reach out to Amaltas Furniture for enquiries, support, or custom furniture requirements."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://www.amaltasfurniture.com/contact-us" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:image",
          content: "https://www.amaltasfurniture.com/images/contact-og.jpg"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Contact Us | Amaltas Furniture" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Have questions? Contact Amaltas Furniture & Modular Kitchens today."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:image",
          content: "https://www.amaltasfurniture.com/images/contact-og.jpg"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      PremiumPopup,
      {
        show: showPopup,
        title: "Message Sent!",
        message: "Thank you for contacting us. Our team will get back to you shortly.",
        autoClose: true,
        autoCloseTime: 3500,
        onClose: () => setShowPopup(false)
      }
    ),
    /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsxs("section", { className: "bg-white py-10 px-4 sm:px-6 lg:px-12 font-inter", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl font-bold text-gray-900", children: "Contact Us" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2 max-w-2xl mx-auto", children: "Have questions? Need assistance? We're here to help." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12", children: [
        /* @__PURE__ */ jsxs(Card, { title: "📍 Address", children: [
          "Amaltas Furniture & Modular Kitchens",
          /* @__PURE__ */ jsx("br", {}),
          "GMS Road, Near Chaudhary Farm House, Balliwala",
          /* @__PURE__ */ jsx("br", {}),
          "Dehradun, Uttarakhand – 248001"
        ] }),
        /* @__PURE__ */ jsx(Card, { title: "📞 Call Us | Whatsapp Us", children: /* @__PURE__ */ jsx("a", { href: "tel:9368330915", className: "text-lg font-medium hover:text-[#800000]", children: "93683 30915" }) }),
        /* @__PURE__ */ jsx(Card, { title: "✉️ Email", children: /* @__PURE__ */ jsx("a", { href: "mailto:amaltasfurniture@gmail.com", className: "hover:text-[#800000]", children: "amaltasfurniture@gmail.com" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-8 rounded-xl border shadow-sm mb-12 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6 text-center", children: "Send us a Message" }),
        status === "error" && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center", children: "Something went wrong. Please try again." }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submitForm, className: "space-y-5", children: [
          /* @__PURE__ */ jsx(Input$1, { label: "Name", name: "name", value: form.name, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx(Input$1, { label: "Mobile Number", name: "mobile", value: form.mobile, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx(
            Input$1,
            {
              label: "Email (optional)",
              name: "email",
              value: form.email,
              type: "email",
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsx(
            Textarea$1,
            {
              label: "Message",
              name: "message",
              value: form.message,
              required: true,
              rows: "4",
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full bg-[#800000] text-white py-3 rounded-lg font-medium hover:bg-[#6d0000] transition",
              children: "Send Message"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: "https://wa.me/919368330915",
          target: "_blank",
          className: "inline-flex items-center bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow hover:bg-green-800 transition",
          children: [
            /* @__PURE__ */ jsx("svg", { width: "24", height: "24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M20.52 3.48A11.8 11.8 0 0 0 12.04 0C5.46 0 .14 5.32.14 11.9c0 2.1.54 4.16 1.57 5.98L0 24l6.29-1.64a11.84 11.84 0 0 0 5.75 1.47h.01c6.58 0 11.9-5.32 11.9-11.9a11.82 11.82 0 0 0-3.43-8.45Z" }) }),
            /* @__PURE__ */ jsx("span", { className: "ml-2", children: "Chat with Us on WhatsApp" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl overflow-hidden shadow-lg border h-[350px] sm:h-[450px]", children: /* @__PURE__ */ jsx(
        "iframe",
        {
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.142130800362!2d78.00996437470369!3d30.318474805536866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b983165a919%3A0x23ad9186b8e28c4!2sAmaltas%20Furniture%20Studio%20%26%20Modular%20Kitchens!5e0!3m2!1sen!2sin!4v1765131571811!5m2!1sen!2sin",
          width: "100%",
          height: "100%",
          style: { border: 0 },
          loading: "lazy"
        }
      ) })
    ] }) })
  ] });
}
function Card({ title, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl border shadow-sm bg-gray-50", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-[#800000] mb-2", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children })
  ] });
}
function Input$1({ label, name, type = "text", value, onChange, required }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type,
        name,
        value,
        onChange,
        required,
        className: "w-full mt-1 p-3 border rounded-lg focus:ring-[#800000] focus:border-[#800000]"
      }
    )
  ] });
}
function Textarea$1({ label, name, value, rows, onChange, required }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: label }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        name,
        value,
        rows,
        required,
        onChange,
        className: "w-full mt-1 p-3 border rounded-lg focus:ring-[#800000] focus:border-[#800000]"
      }
    )
  ] });
}
const __vite_glob_0_53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContactUs
}, Symbol.toStringTag, { value: "Module" }));
function CustomFurniture({ clusters }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    furnitureType: "",
    dimensions: "",
    material: "",
    budget: "",
    description: "",
    file: null
  });
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${"6LeLWiUsAAAAAHt8zFrbFHTSGGlotk7R0uc2Wej3"}`;
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute("6LeLWiUsAAAAAHt8zFrbFHTSGGlotk7R0uc2Wej3", { action: "submit" }).then((token) => {
        const formData = new FormData();
        for (const key in form) {
          formData.append(key, form[key]);
        }
        formData.append("recaptcha_token", token);
        router.post("/custom-furniture", formData, {
          forceFormData: true,
          onSuccess: () => {
            setShowPopup(true);
            setForm({
              name: "",
              phone: "",
              email: "",
              address: "",
              furnitureType: "",
              dimensions: "",
              material: "",
              budget: "",
              description: "",
              file: null
            });
          }
        });
      });
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Custom Furniture in Dehradun | Amaltas Furniture" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Get premium custom-made furniture in Dehradun. Share your size, design, material, and requirements — Amaltas Furniture creates bespoke furniture tailored to your space."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "custom furniture Dehradun, bespoke furniture Dehradun, modular kitchen Dehradun, wardrobe design, furniture design, made to order furniture, Amaltas Furniture"
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://www.amaltasfurniture.com/custom-furniture" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Custom Furniture in Dehradun | Amaltas Furniture" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Premium custom furniture crafted to match your space and style. Submit your requirements online and our team will contact you."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://www.amaltasfurniture.com/custom-furniture" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://www.amaltasfurniture.com/images/custom-furniture-og.jpg" }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Amaltas Furniture" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Custom Furniture in Dehradun | Amaltas Furniture" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Get tailor-made furniture for your home or office in Dehradun. Modern, durable, and crafted with precision."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://www.amaltasfurniture.com/images/custom-furniture-og.jpg" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Custom Furniture",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Amaltas Furniture",
          "image": "https://www.amaltasfurniture.com/images/custom-furniture-og.jpg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dehradun",
            "addressRegion": "Uttarakhand",
            "addressCountry": "India"
          }
        },
        "url": "https://www.amaltasfurniture.com/custom-furniture",
        "description": "Made-to-order custom furniture including wardrobes, kitchens, sofas, and modular units in Dehradun."
      }) })
    ] }),
    /* @__PURE__ */ jsxs(Welcome, { clusters, children: [
      /* @__PURE__ */ jsx(
        PremiumPopup,
        {
          show: showPopup,
          title: "Request Received!",
          message: "Thank you for submitting your custom furniture request. Our team will contact you shortly.",
          onClose: () => setShowPopup(false),
          autoClose: true,
          autoCloseTime: 3500
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f5f1] flex flex-col items-center py-12 px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl text-center mb-12", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-semibold text-gray-800 tracking-tight", children: "Custom Furniture Request" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-4 text-lg", children: "Tailored to your space. Designed to your style." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-gray-200", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsx(Input, { label: "Name", name: "name", value: form.name, onChange: handleChange, required: true }),
            /* @__PURE__ */ jsx(Input, { label: "Phone Number", name: "phone", value: form.phone, onChange: handleChange, required: true }),
            /* @__PURE__ */ jsx(Input, { label: "Email", name: "email", type: "email", value: form.email, onChange: handleChange }),
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Furniture Type",
                name: "furnitureType",
                value: form.furnitureType,
                onChange: handleChange,
                options: [
                  "Sofa",
                  "Bed",
                  "Wardrobe",
                  "Modular Kitchen",
                  "TV Unit",
                  "Table",
                  "Office Furniture",
                  "Other"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              label: "Full Address",
              name: "address",
              value: form.address,
              required: true,
              placeholder: "House No., Street, City, Pincode",
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              label: "Dimensions (if known)",
              name: "dimensions",
              placeholder: "Example: 6ft x 3ft x 2ft",
              value: form.dimensions,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsx(
            Select,
            {
              label: "Preferred Material",
              name: "material",
              value: form.material,
              onChange: handleChange,
              options: [
                "Premium Ply + Laminate",
                "HDHMR",
                "Solid Wood",
                "MDF",
                "Not Sure"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              label: "Estimated Budget",
              name: "budget",
              placeholder: "Example: ₹30,000 – ₹60,000",
              value: form.budget,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              label: "Describe Your Requirement",
              name: "description",
              value: form.description,
              rows: 4,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Upload Drawing / Sketch / Map / Floor Plan" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                name: "file",
                accept: "image/*,.pdf",
                className: "w-full p-3 border rounded-lg bg-white",
                onChange: handleChange
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Accepted: JPG, PNG, PDF — up to 10 MB" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full bg-gray-900 text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition",
              children: "Submit Request"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-center mt-4", children: "Protected by Google reCAPTCHA — Privacy Policy & Terms apply." })
        ] }) })
      ] })
    ] })
  ] });
}
function Input({ label, name, value, onChange, required = false, type = "text", placeholder = "" }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-gray-700 font-medium mb-1", children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type,
        name,
        required,
        placeholder,
        className: "w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-700",
        value,
        onChange
      }
    )
  ] });
}
function Textarea({ label, name, value, onChange, rows = 3, required = false, placeholder = "" }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-gray-700 font-medium mb-1", children: label }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        name,
        rows,
        required,
        placeholder,
        className: "w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-700",
        value,
        onChange
      }
    )
  ] });
}
function Select({ label, name, value, onChange, options = [] }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-gray-700 font-medium mb-1", children: label }),
    /* @__PURE__ */ jsxs(
      "select",
      {
        name,
        className: "w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-gray-700",
        value,
        onChange,
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Select" }),
          options.map((opt) => /* @__PURE__ */ jsx("option", { value: opt, children: opt }, opt))
        ]
      }
    )
  ] });
}
const __vite_glob_0_54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CustomFurniture
}, Symbol.toStringTag, { value: "Module" }));
function Exports({ clusters }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Exports | Amaltas Furniture & Modular Kitchens" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Amaltas Furniture offers international exports for all furniture categories. Products are shipped in knock-down condition with required manufacturing time. 100% advance payment required. Import duties are borne by the customer."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://www.amaltasfurniture.com/exports" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Exports | Amaltas Furniture" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "We export premium furniture worldwide. Knock-down manufacturing, shipping timelines, and export guidelines included."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://www.amaltasfurniture.com/exports" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://www.amaltasfurniture.com/images/exports-og.jpg" })
    ] }),
    /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsxs("section", { className: "bg-gray-50 py-12 px-4 sm:px-6 lg:px-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-900", children: "Exports" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-4 text-lg leading-relaxed", children: "Amaltas Furniture proudly exports high-quality furniture across the globe. Our products are crafted with precision, packed securely, and shipped internationally with complete documentation." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white border rounded-xl shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-3", children: "Knock-Down (KD) Manufacturing" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
            "All export products are manufactured in a ",
            /* @__PURE__ */ jsx("strong", { children: "knock-down (flat-pack)" }),
            " format. This ensures safe and efficient international shipping. KD manufacturing requires additional planning and engineering, and therefore includes a dedicated production timeline."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white border rounded-xl shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-3", children: "Manufacturing Time" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Export orders require dedicated manufacturing time, depending on the product type, quantity, and customization. Once the order is confirmed and advance payment is received, we will provide an estimated production schedule." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white border rounded-xl shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-3", children: "International Shipping Timeline" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "After manufacturing is completed, we arrange international shipping through reputed logistics partners. Shipping time varies by destination country and method (sea freight or air freight). A tracking number will be provided once the shipment is dispatched." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white border rounded-xl shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-3", children: "Payment Terms" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
            "For all international export orders, we require",
            /* @__PURE__ */ jsx("strong", { children: " 100% advance payment" }),
            ". Payments can be made through international bank transfer or any globally accepted online mode. Production begins only after full payment is received."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white border rounded-xl shadow-sm md:col-span-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-3", children: "Import Duties & Customs Charges" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
            "Any ",
            /* @__PURE__ */ jsx("strong", { children: "import duty, customs tax, or additional charges" }),
            " imposed by the destination country will be borne solely by the customer. These charges depend on the respective country’s regulations and are not included in our export pricing."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-16", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "/contact-us",
          className: "inline-block bg-[#800000] text-white py-3 px-10 rounded-lg text-lg font-semibold shadow hover:bg-[#6d0000] transition",
          children: "Contact Us for Export Enquiries"
        }
      ) })
    ] }) })
  ] });
}
const __vite_glob_0_55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Exports
}, Symbol.toStringTag, { value: "Module" }));
function LocateUs({ clusters }) {
  const placeId = "ChIJG5MYOZm5ODkRxcSigryRnaQ";
  const mapsButtonUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  return /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsxs("section", { className: "bg-white py-10 px-4 sm:px-6 lg:px-12 font-inter", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl font-bold text-gray-900", children: "Locate Us" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2 max-w-2xl mx-auto", children: "Visit our showroom on GMS Road and explore premium furniture & modular kitchens." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl border shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Showroom Address" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
            /* @__PURE__ */ jsx("strong", { children: "Amaltas Furniture & Modular Kitchens" }),
            /* @__PURE__ */ jsx("br", {}),
            "GMS Road, Near Chaudhary Farm House, Balliwala",
            /* @__PURE__ */ jsx("br", {}),
            "Dehradun, Uttarakhand – 248001"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2", children: [
            /* @__PURE__ */ jsx("a", { href: "tel:9368330915", className: "block text-gray-700 hover:text-[#800000]", children: "📞 93683 30915" }),
            /* @__PURE__ */ jsx("a", { href: "mailto:support@amaltasfurniture.com", className: "block text-gray-700 hover:text-[#800000]", children: "📧 support@amaltasfurniture.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl border shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Showroom Timings" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
            /* @__PURE__ */ jsx("strong", { children: "Monday – Sunday:" }),
            " 10:30 AM – 8:00 PM",
            /* @__PURE__ */ jsx("br", {}),
            "We are open all 7 days."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: mapsButtonUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center justify-center gap-2 bg-[#800000] text-white px-6 py-3 rounded-lg shadow hover:bg-[#6e0000] transition",
              children: "📍 Open in Google Maps"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://wa.me/919368330915",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center justify-center gap-2 border border-[#800000] text-[#800000] px-6 py-3 rounded-lg hover:bg-[#800000] hover:text-white transition",
              children: "💬 WhatsApp Us"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl overflow-hidden shadow-lg border h-[350px] sm:h-[450px]", children: /* @__PURE__ */ jsx(
        "iframe",
        {
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.142130800362!2d78.00996437470369!3d30.318474805536866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b983165a919%3A0x23ad9186b8e28c4!2sAmaltas%20Furniture%20Studio%20%26%20Modular%20Kitchens!5e0!3m2!1sen!2sin!4v1765131571811!5m2!1sen!2sin",
          width: "100%",
          height: "100%",
          style: { border: 0 },
          allowFullScreen: "",
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 text-center text-gray-600 max-w-3xl mx-auto leading-relaxed", children: "Visit our GMS Road showroom to explore wooden furniture, modular kitchens, wardrobes, dining sets, and custom interior solutions — all crafted in-house in Dehradun." })
  ] }) });
}
const __vite_glob_0_56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LocateUs
}, Symbol.toStringTag, { value: "Module" }));
function ReturnPolicy({ clusters }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Return & Cancellation Policy | Amaltas Furniture" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Amaltas Furniture offers customer-friendly return, exchange, and cancellation policies. Damaged items, lost shipments, and delivery delays are fully protected by our guarantee."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://www.amaltasfurniture.com/return-policy" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Return & Cancellation Policy | Amaltas Furniture" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Learn about our 10-day exchange policy, cancellation terms, damage replacement, and 100% money-back guarantee for undelivered products."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://www.amaltasfurniture.com/return-policy" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:image",
          content: "https://www.amaltasfurniture.com/images/return-policy-og.jpg"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsxs("section", { className: "bg-gray-50 py-12 px-4 sm:px-6 lg:px-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-900", children: "Return & Cancellation Policy" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-4 text-lg leading-relaxed", children: "At Amaltas Furniture, customer satisfaction is our highest priority. Below are our transparent and customer-friendly policies for cancellations, returns, exchanges, and delivery issues." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs(PolicyCard, { title: "Order Cancellation", children: [
          "Orders can be cancelled ",
          /* @__PURE__ */ jsx("strong", { children: "before they are shipped" }),
          ". Simply send us a cancellation email at:",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("a", { href: "mailto:amaltasfurniture@gmail.com", className: "text-[#800000] font-medium", children: "amaltasfurniture@gmail.com" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "Your total amount will be refunded ",
          /* @__PURE__ */ jsx("strong", { children: "without any deductions" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs(PolicyCard, { title: "Damaged Product Received", children: [
          "If you receive a damaged product, please notify us immediately upon delivery. We will replace the product or the damaged part — whichever is necessary — at ",
          /* @__PURE__ */ jsx("strong", { children: "no extra cost" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs(PolicyCard, { title: "Package Lost in Transit", children: [
          "In the rare case that your package is lost during transit, we will send you a ",
          /* @__PURE__ */ jsx("strong", { children: "brand new replacement" }),
          " at no additional cost.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "If only part of the package is lost, we will replace the missing part promptly."
        ] }),
        /* @__PURE__ */ jsxs(PolicyCard, { title: "Return Policy (10-Day Exchange)", children: [
          "If you find some problem in the product, you are eligible for a",
          /* @__PURE__ */ jsx("strong", { children: " 10-day exchange" }),
          ".",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "Please note:",
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 mt-2 text-gray-700", children: [
            /* @__PURE__ */ jsx("li", { children: "No refunds will be issued." }),
            /* @__PURE__ */ jsx("li", { children: "Only exchange is permitted." }),
            /* @__PURE__ */ jsx("li", { children: "Return shipping or exchange costs are to be borne by the customer." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(PolicyCard, { title: "100% Money-Back Guarantee", children: [
          "If you do not receive your product within a reasonable timeframe, we guarantee a ",
          /* @__PURE__ */ jsx("strong", { children: "100% Money-Back Refund" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs(PolicyCard, { title: "Our Commitment to You", children: [
          "Our endeavor is to make you a lifelong customer. We take utmost care to ensure your satisfaction and protect your interests at every step.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "For any assistance, complaints, or feedback, please reach us at:",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("a", { href: "mailto:amaltasfurniture@gmail.com", className: "text-[#800000] font-medium", children: "amaltasfurniture@gmail.com" })
        ] })
      ] })
    ] }) })
  ] });
}
function PolicyCard({ title, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white border rounded-xl shadow-sm", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-3", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children })
  ] });
}
const __vite_glob_0_57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ReturnPolicy
}, Symbol.toStringTag, { value: "Module" }));
function ShippingPolicy({ clusters }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Shipping Policy | Amaltas Furniture Dehradun" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Learn about Amaltas Furniture's shipping policy. We provide free delivery within Dehradun and nearby areas. For outside locations, shipping and wooden crate packing charges apply."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://www.amaltasfurniture.com/shipping-policy" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Shipping Policy | Amaltas Furniture" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Free delivery in Dehradun. Shipping outside Dehradun requires additional freight and wooden crate packing charges."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://www.amaltasfurniture.com/shipping-policy" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:image",
          content: "https://www.amaltasfurniture.com/images/shipping-policy-og.jpg"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsxs("section", { className: "bg-gray-50 py-12 px-4 sm:px-6 lg:px-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-900", children: "Shipping Policy" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-4 text-lg leading-relaxed", children: "At Amaltas Furniture, we ensure safe and reliable delivery of all products. Please read our shipping guidelines below." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white border rounded-xl shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-3", children: "Shipping in Dehradun" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
            "We offer ",
            /* @__PURE__ */ jsx("strong", { children: "delivery" }),
            " within Dehradun city and nearby areas. Our team ensures smooth and safe handling during local delivery."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white border rounded-xl shadow-sm", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-3", children: "Shipping Outside Dehradun" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
            "If the delivery location is ",
            /* @__PURE__ */ jsx("strong", { children: "outside Dehradun" }),
            ", actual shipping or courier charges will be payable by the customer. Charges vary based on distance, weight, and mode of transport."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white border rounded-xl shadow-sm md:col-span-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-3", children: "Wooden Crate Packing (For Courier Shipping)" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
            "When items are shipped through courier or transport services, they must be packed securely inside a ",
            /* @__PURE__ */ jsx("strong", { children: "custom wooden crate " }),
            "to prevent damage during transit."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 mt-3 leading-relaxed", children: [
            "The crate packing process involves material, labor, and handling, therefore ",
            /* @__PURE__ */ jsx("strong", { children: "packing charges will also apply" }),
            "."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-16", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "/contact-us",
          className: "inline-block bg-[#800000] text-white py-3 px-10 rounded-lg text-lg font-semibold shadow hover:bg-[#6d0000] transition",
          children: "Contact Us for Delivery Queries"
        }
      ) })
    ] }) })
  ] });
}
const __vite_glob_0_58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ShippingPolicy
}, Symbol.toStringTag, { value: "Module" }));
function TermsOfUse({ clusters = [] }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Terms of Use | Amaltas Furniture" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Read the Terms of Use for Amaltas Furniture. Learn about website usage, orders, payments, intellectual property, and legal policies governing our services."
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "canonical",
          href: "https://www.amaltasfurniture.com/terms-of-use"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:title",
          content: "Terms of Use | Amaltas Furniture"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Understand the terms and conditions governing the use of Amaltas Furniture’s website, products, and services."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:url",
          content: "https://www.amaltasfurniture.com/terms-of-use"
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:image",
          content: "https://www.amaltasfurniture.com/images/terms-of-use-og.jpg"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8 text-gray-700 text-sm leading-relaxed", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Terms of Use" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "Welcome to ",
        /* @__PURE__ */ jsx("strong", { children: "Amaltas Furniture" }),
        ". By accessing or using our website, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our website."
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mt-6 mb-2", children: "1. Use of the Website" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "This website is intended for browsing products, placing orders, and obtaining information about Amaltas Furniture. You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the website." }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mt-6 mb-2", children: "2. Product Information" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "We make every effort to display accurate product descriptions, images, specifications, and prices. Due to the handcrafted nature of furniture, minor variations in color, finish, or design may occur. Amaltas Furniture reserves the right to update or correct information without prior notice." }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mt-6 mb-2", children: "3. Orders & Pricing" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Placing an order constitutes an offer to purchase. All orders are subject to acceptance, availability, and confirmation. Prices, offers, and availability may change without notice." }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mt-6 mb-2", children: "4. Payments" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Payments must be made through authorized payment gateways. Amaltas Furniture does not store sensitive payment information such as debit or credit card details." }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mt-6 mb-2", children: "5. Intellectual Property" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "All content on this website, including text, images, designs, logos, videos, and graphics, is the intellectual property of Amaltas Furniture and is protected by applicable laws. Unauthorized use is strictly prohibited." }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mt-6 mb-2", children: "6. User Conduct" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "You agree not to misuse the website, introduce malicious code, attempt unauthorized access, or engage in any activity that could harm the website or its users." }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mt-6 mb-2", children: "7. Limitation of Liability" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Amaltas Furniture shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use this website or its products." }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mt-6 mb-2", children: "8. Third-Party Links" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Our website may contain links to third-party websites. Amaltas Furniture is not responsible for the content or practices of such external websites." }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mt-6 mb-2", children: "9. Changes to These Terms" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "We reserve the right to update or modify these Terms of Use at any time. Continued use of the website constitutes acceptance of the revised terms." }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mt-6 mb-2", children: "10. Governing Law" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "These Terms of Use shall be governed by and interpreted in accordance with the laws of India." }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-900 mt-6 mb-2", children: "11. Contact Information" }),
      /* @__PURE__ */ jsx("p", { children: "For any questions regarding these Terms of Use, please contact Amaltas Furniture using the details provided on our website." })
    ] }) })
  ] });
}
const __vite_glob_0_59 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TermsOfUse
}, Symbol.toStringTag, { value: "Module" }));
function AboutUs() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { className: "my-12 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-b from-[#fff4f4] to-white rounded-2xl border border-[#f3d6d6] shadow-md p-8 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "w-20 h-1.5 bg-[#800000] mx-auto mb-5 rounded-full" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-[#800000] text-center tracking-wide mb-4", children: "About Amaltas Furniture & Modular Kitchens" }),
    /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed text-lg text-center max-w-4xl mx-auto", children: [
      "Amaltas Furniture & Modular Kitchens is a Dehradun-based furniture manufacturing company offering premium modular kitchens, wardrobes, bedroom sets, custom sofas, office furniture and complete home interior solutions.",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("br", {}),
      "With our dedicated in-house manufacturing unit, we deliver factory-direct pricing, strict quality control, and tailor-made furniture crafted to enhance your home. Trusted across Dehradun, we take pride in delivering durable and beautifully designed products built with precision and passion."
    ] })
  ] }) }) });
}
const __vite_glob_0_60 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutUs
}, Symbol.toStringTag, { value: "Module" }));
const BannerSwiper = ({ banners, interval = 5e3, showNavigation = true, showPagination = true }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (interval > 0 && banners.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide2) => (prevSlide2 + 1) % banners.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [banners, interval]);
  const nextSlide = () => {
    setCurrentSlide((prevSlide2) => (prevSlide2 + 1) % banners.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prevSlide2) => (prevSlide2 - 1 + banners.length) % banners.length);
  };
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  if (!banners || banners.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 flex items-center justify-center py-12 rounded-lg text-gray-500 text-lg min-h-[200px] md:min-h-[300px]", children: "No banners to display." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full overflow-hidden rounded-lg shadow-xl aspect-video md:aspect-[16/6] bg-gray-100", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex transition-transform duration-700 ease-in-out h-full",
        style: { transform: `translateX(-${currentSlide * 100}%)` },
        children: banners.map((banner, index) => /* @__PURE__ */ jsx("div", { className: "w-full flex-shrink-0 h-full", children: banner.link ? /* @__PURE__ */ jsx("a", { href: banner.link, target: "_blank", rel: "noopener noreferrer", className: "block w-full h-full", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: banner.src,
            alt: banner.alt,
            className: "w-full object-cover",
            onError: (e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/1200x400/E0E0E0/A0A0A0?text=Error`;
            }
          }
        ) }) : /* @__PURE__ */ jsx(
          "img",
          {
            src: banner.src,
            alt: banner.alt,
            className: "w-full object-cover",
            onError: (e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/1200x400/E0E0E0/A0A0A0?text=Error`;
            }
          }
        ) }, index))
      }
    ),
    showNavigation && banners.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: prevSlide,
          className: "absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all focus:outline-none",
          "aria-label": "Previous slide",
          children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: nextSlide,
          className: "absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all focus:outline-none",
          "aria-label": "Next slide",
          children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })
        }
      )
    ] }),
    showPagination && banners.length > 1 && /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2", children: banners.map((_2, index) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => goToSlide(index),
        className: `w-3 h-3 rounded-full transition-colors duration-300 ${currentSlide === index ? "bg-white" : "bg-gray-400"}`,
        "aria-label": `Go to slide ${index + 1}`
      },
      index
    )) })
  ] });
};
const __vite_glob_0_61 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BannerSwiper
}, Symbol.toStringTag, { value: "Module" }));
function Faq() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "my-12 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 shadow-md max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-1.5 bg-[#993333] mx-auto mb-5 rounded-full" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-[#993333] text-center mb-8 tracking-wide", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        {
          q: "Do you provide custom-sized furniture?",
          a: "Yes, every product including wardrobes, beds, kitchens and cabinets can be customized to your exact measurements."
        },
        {
          q: "How long does a modular kitchen project take?",
          a: "Typically 20-30 days depending on design, materials and site readiness."
        },
        {
          q: "Do you offer delivery and installation in Dehradun?",
          a: "Yes, we offer complete delivery and installation services across Dehradun."
        },
        {
          q: "What materials do you use for modular kitchens?",
          a: "We use high-grade BWP plywood, HDHMR, laminates, acrylic, PU, and branded hardware like Hafele, Hettich, and Godrej."
        },
        {
          q: "Can I visit your showroom?",
          a: "Yes! We are located on GMS Road, Dehradun with a full display of Home Furniture, Office Furniture, and Modular Kitchens."
        },
        {
          q: "Can I visit your factory?",
          a: "Yes! You can visit our factory, see how your furniture is being manufactured, and inspect the materials used."
        }
      ].map((faq, index) => /* @__PURE__ */ jsxs(
        "details",
        {
          className: "group border border-[#ecdcdc] rounded-xl p-4 shadow-sm\n                                       hover:shadow-md transition-all duration-300",
          children: [
            /* @__PURE__ */ jsxs(
              "summary",
              {
                className: "font-semibold text-lg text-[#993333] cursor-pointer flex justify-between items-center\n                                           group-open:text-[#771f1f]",
                children: [
                  faq.q,
                  /* @__PURE__ */ jsx("span", { className: "text-[#993333] group-open:rotate-180 transition-transform duration-300", children: "▼" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm leading-relaxed mt-3 pl-1 pr-2", children: faq.a })
          ]
        },
        index
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: `
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do you provide custom-sized furniture?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, every product including wardrobes, beds, kitchens and cabinets can be customized to your exact measurements."
              }
            },
            {
              "@type": "Question",
              "name": "How long does a modular kitchen project take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Typically 20-30 days depending on design, materials and site readiness."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer delivery and installation in Dehradun?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer complete delivery and installation services across Dehradun."
              }
            },
            {
              "@type": "Question",
              "name": "What materials do you use for modular kitchens?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use high-grade BWP plywood, HDHMR, laminates, acrylic, PU, and branded hardware like Hafele, Hettich, Godrej."
              }
            },
            {
              "@type": "Question",
              "name": "Can I visit your showroom?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! We are located on GMS Road, Dehradun with a full display of Home Furniture, Office Furniture, and Modular Kitchens."
              }
            },
            {
              "@type": "Question",
              "name": "Can I visit your factory?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! You can visit our factory, see how your furniture is being manufactured. Check the material used."
              }
            }
          ]
        }
        ` })
  ] });
}
const __vite_glob_0_64 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Faq
}, Symbol.toStringTag, { value: "Module" }));
const GoogleReviews = ({ reviewsApiUrl, maxReviews = 10 }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(reviewsApiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setReviews((data.reviews || []).slice(0, maxReviews));
      } catch (err) {
        console.error("Failed to fetch Google reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [reviewsApiUrl, maxReviews]);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: `w-4 h-4 ${i <= rating ? "text-yellow-400" : "text-gray-300"}`,
            fill: "currentColor",
            viewBox: "0 0 20 20",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.153c.969 0 1.371 1.24.588 1.81l-3.35 2.434a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.35-2.434a1 1 0 00-1.176 0l-3.35 2.434c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L.595 9.384c-.783-.57-.381-1.81.588-1.81h4.153a1 1 0 00.95-.69l1.286-3.957z" })
          },
          i
        )
      );
    }
    return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: stars });
  };
  if (loading) {
    return /* @__PURE__ */ jsx("section", { className: "bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center rounded-lg shadow-md", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg", children: "Loading reviews..." }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("section", { className: "bg-red-100 text-red-700 py-12 px-4 sm:px-6 lg:px-8 text-center rounded-lg shadow-md", children: [
      /* @__PURE__ */ jsx("p", { className: "font-semibold mb-2", children: "Error:" }),
      /* @__PURE__ */ jsx("p", { children: error }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: "Please check your network connection or try again later." })
    ] });
  }
  if (reviews.length === 0) {
    return /* @__PURE__ */ jsx("section", { className: "bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center rounded-lg shadow-md", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg", children: "No reviews available at the moment." }) });
  }
  const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "N/A";
  const totalReviews = reviews.length;
  return /* @__PURE__ */ jsxs("section", { className: "bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-md font-inter", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-8 text-center", children: "What Our Customers Say" }),
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 mb-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-gray-900", children: averageRating }),
        renderStars(Math.round(averageRating)),
        " "
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-sm", children: [
        "Based on ",
        totalReviews,
        " Reviews"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: reviews.map((review, index) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
        review.profile_photo_url ? /* @__PURE__ */ jsx(
          "img",
          {
            src: review.profile_photo_url,
            alt: review.author_name,
            className: "w-12 h-12 rounded-full object-cover mr-4",
            onError: (e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/48x48/CCCCCC/666666?text=${review.author_name.charAt(0)}`;
            }
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg mr-4", children: review.author_name ? review.author_name.charAt(0).toUpperCase() : "?" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: review.author_name || "Anonymous" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: review.relative_time_description })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-3", children: renderStars(review.rating) }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-sm flex-grow", children: [
        '"',
        review.text,
        '"'
      ] }),
      review.original_language && review.original_language !== "en" && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-2", children: [
        "(",
        review.original_language,
        " original)"
      ] })
    ] }, index)) })
  ] });
};
const __vite_glob_0_66 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GoogleReviews
}, Symbol.toStringTag, { value: "Module" }));
function HotSellerProducts({ products = [] }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { className: "my-12 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 shadow-md max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "w-24 h-1.5 bg-[#993333] mx-auto mb-5 rounded-full" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-[#993333] text-center tracking-wide mb-10", children: "Hot-seller Products" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6", children: products.slice(0, 20).map((product, index) => {
      var _a;
      return /* @__PURE__ */ jsxs(
        "a",
        {
          href: `${product.slug}?id=product`,
          className: "block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl\n                                       transition-all hover:scale-[1.03] duration-300",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-full h-44 sm:h-52 md:h-56 bg-gray-100", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${product.small_image}`,
                alt: product.name,
                className: "w-full h-full object-cover",
                onError: (e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/500x500/E0E0E0/888?text=Image";
                }
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm text-gray-800 text-center leading-snug", children: product.name }),
              ((_a = product.varients) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "text-center mt-2 text-sm", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-red-600 line-through", children: [
                  "₹",
                  product.varients[0].mrp
                ] }),
                " ",
                /* @__PURE__ */ jsxs("span", { className: "text-green-700 font-semibold", children: [
                  "₹",
                  product.varients[0].price
                ] })
              ] })
            ] })
          ]
        },
        index
      );
    }) })
  ] }) }) });
}
const __vite_glob_0_67 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HotSellerProducts
}, Symbol.toStringTag, { value: "Module" }));
function HowWeWork() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { className: "my-12 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "w-20 h-1.5 bg-[#800000] mx-auto mb-5 rounded-full" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-[#800000] text-center tracking-wide mb-10", children: "How We Work" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [
      { step: "1", title: "Visit Showroom", text: "Explore our products and discuss your requirements with our experts." },
      { step: "2", title: "Measurement", text: "Our team visits your home for accurate site measurements." },
      { step: "3", title: "Design & Finalization", text: "Choose materials, finishes & layouts that match your vision and lifestyle." },
      { step: "4", title: "Manufacturing & Installation", text: "Precision manufacturing followed by professional installation on time." }
    ].map((item, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "p-6 bg-[#993333] text-white rounded-xl shadow-md\n                                       hover:shadow-xl hover:scale-[1.03] transition-all duration-300\n                                       flex flex-col items-center",
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold opacity-95 mb-3 text-amber-300", children: item.step }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-xl text-center mb-3 leading-snug", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-justify px-1", children: item.text })
        ]
      },
      index
    )) })
  ] }) }) });
}
const __vite_glob_0_68 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HowWeWork
}, Symbol.toStringTag, { value: "Module" }));
function LongSeo() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { className: "my-12 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 shadow-md max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "w-20 h-1.5 bg-[#993333] mx-auto mb-5 rounded-full" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-[#993333] mb-6 text-center tracking-wide", children: "Premium Furniture & Modular Kitchens in Dehradun – Built for Modern Homes" }),
    /* @__PURE__ */ jsxs("div", { className: "text-gray-700 leading-relaxed text-lg max-w-5xl mx-auto text-justify space-y-6", children: [
      /* @__PURE__ */ jsx("p", { children: "At Amaltas Furniture & Modular Kitchens, we believe every home deserves thoughtfully designed, beautifully crafted furniture. Our in-house manufacturing unit in Dehradun combines advanced machinery with skilled craftsmanship to produce high-quality Sofas, Beds, Dining Sets, Wardrobes, Modular Kitchens, TV Units, Office Furniture and more." }),
      /* @__PURE__ */ jsx("p", { children: "For living rooms, we manufacture a wide range of sofas, recliners, coffee tables, TV units and accent furniture. Each sofa frame is built for longevity and upholstered with premium fabrics to ensure comfort, durability and style." }),
      /* @__PURE__ */ jsx("p", { children: "For bedrooms, we craft beds of all kinds — teak wood beds, sheesham wood beds, cushioned back beds, and premium engineered-wood beds. We also offer bedroom interior solutions such as back-wall panelling in cushion, laminate, or PU finishes, enhancing the aesthetic appeal of your room." }),
      /* @__PURE__ */ jsx("p", { children: "For dining spaces, we provide a versatile range of dining sets including stone-top and wooden-top dining tables, cushioned-back dining chairs, and wooden-back seating options. Available in 4-seater, 6-seater, and 8-seater configurations, every dining set is built with durability and elegance in mind." }),
      /* @__PURE__ */ jsx("p", { children: "We specialize in fully customized modular kitchens with top-brand hardware, durable carcass materials, premium shutters, and beautifully refined finishes. Whether you prefer an L-shaped, parallel, U-shaped, or island kitchen, our designers help you optimize your space with both style and functionality." }),
      /* @__PURE__ */ jsx("p", { children: "Our modular wardrobes are engineered for maximum storage efficiency. Choose from sliding, hinged, walk-in wardrobes, and loft storage — all tailored to your exact measurements. Each wardrobe is precision-built using durable materials and finished in laminates, acrylic, membrane, or PU to match your home’s style." }),
      /* @__PURE__ */ jsx("p", { children: "With over a decade of experience serving Dehradun, we are trusted by homeowners, architects, and interior designers for our reliability, craftsmanship and customer service. Visit our showroom on GMS Road to experience our refined designs, materials and manufacturing quality up close." })
    ] })
  ] }) }) });
}
const __vite_glob_0_70 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LongSeo
}, Symbol.toStringTag, { value: "Module" }));
const PopularCategories = ({ clusters }) => {
  const topCategories = useMemo(() => {
    if (!clusters || clusters.length === 0) {
      return [];
    }
    let allCategories = [];
    clusters.forEach((cluster) => {
      allCategories.push({
        id: cluster.id,
        name: cluster.name,
        image: cluster.image,
        // Cluster image path
        slug: cluster.slug,
        clicks: cluster.clicks || 0,
        // Default to 0 if clicks is undefined
        type: "cluster"
        // Identifier for dynamic linking
      });
      if (cluster.groups && Array.isArray(cluster.groups)) {
        cluster.groups.forEach((group) => {
          allCategories.push({
            id: group.id,
            name: group.name,
            image: group.image,
            // Group uses 'image_url', rename to 'image' for consistency
            slug: group.slug,
            clicks: group.clicks || 0,
            // Default to 0 if clicks is undefined
            type: "group"
            // Identifier for dynamic linking
          });
        });
      }
    });
    allCategories.sort((a, b) => b.clicks - a.clicks);
    const uniqueCategories = [];
    const seen = /* @__PURE__ */ new Set();
    const desiredCount = 20;
    for (const category of allCategories) {
      const uniqueKey = `${category.type}-${category.id}`;
      if (!seen.has(uniqueKey)) {
        uniqueCategories.push(category);
        seen.add(uniqueKey);
      }
      if (uniqueCategories.length >= desiredCount) {
        break;
      }
    }
    return uniqueCategories;
  }, [clusters]);
  if (topCategories.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-gray-600 p-8 text-center bg-white rounded-lg shadow-md", children: "No popular categories to display at the moment." });
  }
  return /* @__PURE__ */ jsxs("section", { className: "bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-md", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-maroon-900 mb-8 text-center", children: "Popular Categories" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 justify-items-center", children: topCategories.map((category) => /* @__PURE__ */ jsxs(
      Link,
      {
        href: category.slug,
        data: { "id": category.type },
        className: "flex flex-col items-center group transform transition-transform duration-200 hover:scale-105",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-maroon-400 group-hover:border-maroon-600 transition-colors duration-200 shadow-md", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${category.image}`,
              alt: category.name,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/112x112/E0E0E0/A0A0A0?text=${category.name.charAt(0)}`;
              }
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm sm:text-base font-medium text-gray-700 group-hover:text-maroon-700 text-center px-2", children: category.name })
        ]
      },
      `${category.type}-${category.slug}`
    )) })
  ] });
};
const __vite_glob_0_71 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PopularCategories
}, Symbol.toStringTag, { value: "Module" }));
function ShowroomImage() {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 items-center justify-items-center pt-8 pb-8 bg-gray-100", children: [
    /* @__PURE__ */ jsx("img", { src: "/storage/images/showroom.jpg", className: "h-80 rounded-xl shadow-lg" }),
    /* @__PURE__ */ jsxs("div", { className: "text-center md:text-right ", children: [
      /* @__PURE__ */ jsxs("a", { href: "https://maps.app.goo.gl/nJXkZEFjrTgMWpne7", target: "_blank", className: "flex justify-center mt-6 md:justify-end items-end mb-4", children: [
        /* @__PURE__ */ jsx("img", { src: "/storage/images/google.png", className: "h-9 mr-2" }),
        /* @__PURE__ */ jsx("span", { children: "Locate us on Map" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-2xl ", children: "Amaltas Furniture & Modular Kitchens" }),
      /* @__PURE__ */ jsx("span", { className: "block", children: "GMS Road, Near Chaudhary Farm House" }),
      /* @__PURE__ */ jsx("span", { className: "block", children: "Dehradun, Uttrakhand-248001" }),
      /* @__PURE__ */ jsxs("a", { href: "https://wa.me/9368330915", target: "_blank", className: " flex items-center justify-center md:justify-end", children: [
        /* @__PURE__ */ jsx(IoLogoWhatsapp, { className: "text-xl text-green-800 mr-1" }),
        "93683 30915"
      ] })
    ] })
  ] });
}
const __vite_glob_0_74 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ShowroomImage
}, Symbol.toStringTag, { value: "Module" }));
function WhyUs() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { className: "my-12 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "w-20 h-1.5 bg-[#993333] mx-auto mb-5 rounded-full" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-[#800000] text-center mb-8 tracking-wide", children: "Why Choose Amaltas?" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [
      { title: "In-House Manufacturing", text: "Precision-built furniture from our own production facility ensures consistent quality." },
      { title: "Factory-Direct Pricing", text: "Premium furniture at genuine prices with zero middleman margins." },
      { title: "Customization Options", text: "Tailor-made finishes, materials, and dimensions that fit your home perfectly." },
      { title: "Premium Hardware", text: "Soft-close channels, quality hinges, and durable fittings for long-lasting build." },
      { title: "Fast Delivery & Installation", text: "Efficient timelines with expert installation teams for a seamless experience." },
      { title: "Trusted by 1000+ Families", text: "A reputation built on quality, craftsmanship, and reliable service in Dehradun." }
    ].map((usp, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "p-6 bg-amber-100 text-white rounded-xl shadow-md\n                                       hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
        children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-xl text-center mb-3 leading-snug text-maroon-900", children: usp.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-justify px-1 text-maroon-700", children: usp.text })
        ]
      },
      index
    )) })
  ] }) }) });
}
const __vite_glob_0_77 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WhyUs
}, Symbol.toStringTag, { value: "Module" }));
function Index({ clusters, products }) {
  const bannerData = [
    {
      src: "/storage/images/ban1.webp",
      alt: "Wooden furniture",
      link: "/"
    },
    {
      src: "/storage/images/ban2.webp",
      alt: "Modular Kitchens",
      link: "/"
    },
    {
      src: "/storage/images/ban3.webp",
      alt: "In house Manufacturing",
      link: "/"
    }
  ];
  return /* @__PURE__ */ jsxs(Welcome, { clusters, children: [
    /* @__PURE__ */ jsx(BannerSwiper, { banners: bannerData }),
    /* @__PURE__ */ jsx(PopularCategories, { clusters }),
    /* @__PURE__ */ jsx(ShowroomImage, {}),
    /* @__PURE__ */ jsx(HotSellerProducts, { products }),
    /* @__PURE__ */ jsx(AboutUs, {}),
    /* @__PURE__ */ jsx(WhyUs, {}),
    /* @__PURE__ */ jsx(HowWeWork, {}),
    /* @__PURE__ */ jsx(LongSeo, {}),
    /* @__PURE__ */ jsx(Faq, {}),
    /* @__PURE__ */ jsx(
      GoogleReviews,
      {
        reviewsApiUrl: "/api/google-reviews",
        maxReviews: 10
      }
    )
  ] });
}
const __vite_glob_0_69 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
function PincodeImport({ clusters }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    file: null
    // To store the selected file
  });
  const { flash } = usePage().props;
  const [selectedFileName, setSelectedFileName] = useState("");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setData("file", selectedFile);
    setSelectedFileName(selectedFile ? selectedFile.name : "");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.file) {
      alert("Please select a file to upload.");
      return;
    }
    post(route("pincodes.import"), {
      onSuccess: () => {
        reset("file");
        setSelectedFileName("");
      },
      onError: (formErrors) => {
        console.error("Import errors:", formErrors);
      }
    });
  };
  return /* @__PURE__ */ jsx(Welcome, { clusters, children: /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-8 text-center", children: "Import Pincode Data" }),
    (flash == null ? void 0 : flash.success) && /* @__PURE__ */ jsxs("div", { className: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4", role: "alert", children: [
      /* @__PURE__ */ jsx("strong", { className: "font-bold", children: "Success!" }),
      /* @__PURE__ */ jsxs("span", { className: "block sm:inline", children: [
        " ",
        flash.success
      ] })
    ] }),
    (flash == null ? void 0 : flash.error) && /* @__PURE__ */ jsxs("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4", role: "alert", children: [
      /* @__PURE__ */ jsx("strong", { className: "font-bold", children: "Error!" }),
      /* @__PURE__ */ jsxs("span", { className: "block sm:inline", children: [
        " ",
        flash.error
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "file", className: "block text-gray-700 text-sm font-bold mb-2", children: "Upload Excel/CSV File:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            id: "file",
            name: "file",
            accept: ".xlsx,.xls,.csv",
            onChange: handleFileChange,
            className: `block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none ${errors.file ? "border-red-500" : ""}`
          }
        ),
        selectedFileName && /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-600", children: [
          "Selected file: ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: selectedFileName })
        ] }),
        errors.file && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs italic mt-1", children: errors.file })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: `w-full bg-maroon-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out
                                ${processing ? "opacity-50 cursor-not-allowed" : "hover:bg-maroon-700"}`,
          children: processing ? "Importing..." : "Import Pincodes"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-8 text-sm text-gray-500 text-center", children: [
      "* Supported formats: .xlsx, .xls, .csv. Max file size: 20MB.",
      /* @__PURE__ */ jsx("br", {}),
      "* Ensure your file has a header row with columns like 'Pincode', 'OfficeName', 'District', 'State', etc."
    ] })
  ] }) }) });
}
const __vite_glob_0_78 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PincodeImport
}, Symbol.toStringTag, { value: "Module" }));
function SecondaryButton({
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function DeleteUserForm({ className = "" }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Delete Account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: "Delete Account" }),
    /* @__PURE__ */ jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Are you sure you want to delete your account?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password",
            value: "Password",
            className: "sr-only"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: "Password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: "Cancel" }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ms-3", disabled: processing, children: "Delete Account" })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_80 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({ className = "" }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const {
    data,
    setData,
    errors,
    put,
    reset,
    processing,
    recentlySuccessful
  } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Update Password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Ensure your account is using a long, random password to stay secure." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "current_password",
            value: "Current Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "current_password",
            ref: currentPasswordInput,
            value: data.current_password,
            onChange: (e) => setData("current_password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "current-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.current_password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "New Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_81 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Update your account's profile information and email address." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-800", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_82 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function Edit({ mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_79 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Admin/Calculator.jsx": __vite_glob_0_0, "./Pages/Admin/Category.jsx": __vite_glob_0_1, "./Pages/Admin/CreateDesign.jsx": __vite_glob_0_2, "./Pages/Admin/CreateSize.jsx": __vite_glob_0_3, "./Pages/Admin/CreateVarient.jsx": __vite_glob_0_4, "./Pages/Admin/Dashboard.jsx": __vite_glob_0_5, "./Pages/Admin/EditImages.jsx": __vite_glob_0_6, "./Pages/Admin/EditProduct.jsx": __vite_glob_0_7, "./Pages/Admin/Estimate.jsx": __vite_glob_0_8, "./Pages/Admin/EstimateInner.jsx": __vite_glob_0_9, "./Pages/Admin/Material.jsx": __vite_glob_0_10, "./Pages/Admin/Product.jsx": __vite_glob_0_11, "./Pages/Admin/SiteUrlMapping.jsx": __vite_glob_0_12, "./Pages/Auth/ConfirmPassword.jsx": __vite_glob_0_13, "./Pages/Auth/ForgotPassword.jsx": __vite_glob_0_14, "./Pages/Auth/Login.jsx": __vite_glob_0_15, "./Pages/Auth/Register.jsx": __vite_glob_0_16, "./Pages/Auth/ResetPassword.jsx": __vite_glob_0_17, "./Pages/Auth/VerifyEmail.jsx": __vite_glob_0_18, "./Pages/Cart/CartDisplay.jsx": __vite_glob_0_19, "./Pages/Cart/CartPage.jsx": __vite_glob_0_20, "./Pages/Cart/Checkout.jsx": __vite_glob_0_21, "./Pages/Cart/OutsideDoon.jsx": __vite_glob_0_22, "./Pages/Cart/PaymentConfirmation.jsx": __vite_glob_0_23, "./Pages/Category/ClusterIndex.jsx": __vite_glob_0_24, "./Pages/Category/GroupIndex.jsx": __vite_glob_0_25, "./Pages/Category/ImageGallery.jsx": __vite_glob_0_26, "./Pages/Category/KitchenEstimatePriceCard.jsx": __vite_glob_0_27, "./Pages/Category/KitchenLayoutForm.jsx": __vite_glob_0_28, "./Pages/Category/ModularKitchens.jsx": __vite_glob_0_29, "./Pages/Category/Product.jsx": __vite_glob_0_30, "./Pages/Category/ProductPage 1.jsx": __vite_glob_0_31, "./Pages/Category/ProductPage.jsx": __vite_glob_0_32, "./Pages/Category/RelatedProducts.jsx": __vite_glob_0_33, "./Pages/Category/UserEstimate.jsx": __vite_glob_0_34, "./Pages/Component/ClusterSelectionForm.jsx": __vite_glob_0_35, "./Pages/Component/CreateProductModal.jsx": __vite_glob_0_36, "./Pages/Component/EditProductField.jsx": __vite_glob_0_37, "./Pages/Component/FormForAddingCluster.jsx": __vite_glob_0_38, "./Pages/Component/FormForAddingDesign.jsx": __vite_glob_0_39, "./Pages/Component/FormForAddingMaterial.jsx": __vite_glob_0_40, "./Pages/Component/FormForAddingSize.jsx": __vite_glob_0_41, "./Pages/Component/FormForAddingVarient.jsx": __vite_glob_0_42, "./Pages/Component/ImageUploder.jsx": __vite_glob_0_43, "./Pages/Component/MapProducts.jsx": __vite_glob_0_44, "./Pages/Component/MapWithEdit.jsx": __vite_glob_0_45, "./Pages/Component/MapWithEditProduct.jsx": __vite_glob_0_46, "./Pages/Component/MultiImageUploader.jsx": __vite_glob_0_47, "./Pages/Component/ProductSearch.jsx": __vite_glob_0_48, "./Pages/Component/QuantityInput.jsx": __vite_glob_0_49, "./Pages/Component/QuestionPrompt.jsx": __vite_glob_0_50, "./Pages/DashboardRouter.jsx": __vite_glob_0_51, "./Pages/Footer/AboutUs.jsx": __vite_glob_0_52, "./Pages/Footer/ContactUs.jsx": __vite_glob_0_53, "./Pages/Footer/CustomFurniture.jsx": __vite_glob_0_54, "./Pages/Footer/Exports.jsx": __vite_glob_0_55, "./Pages/Footer/LocateUs.jsx": __vite_glob_0_56, "./Pages/Footer/ReturnPolicy.jsx": __vite_glob_0_57, "./Pages/Footer/ShippingPolicy.jsx": __vite_glob_0_58, "./Pages/Footer/TermsOfUse.jsx": __vite_glob_0_59, "./Pages/Index/AboutUs.jsx": __vite_glob_0_60, "./Pages/Index/BannerSwiper.jsx": __vite_glob_0_61, "./Pages/Index/Cart.jsx": __vite_glob_0_62, "./Pages/Index/CategoryMenu.jsx": __vite_glob_0_63, "./Pages/Index/Faq.jsx": __vite_glob_0_64, "./Pages/Index/Footer.jsx": __vite_glob_0_65, "./Pages/Index/GoogleReviews.jsx": __vite_glob_0_66, "./Pages/Index/HotSellerProducts.jsx": __vite_glob_0_67, "./Pages/Index/HowWeWork.jsx": __vite_glob_0_68, "./Pages/Index/Index.jsx": __vite_glob_0_69, "./Pages/Index/LongSeo.jsx": __vite_glob_0_70, "./Pages/Index/PopularCategories.jsx": __vite_glob_0_71, "./Pages/Index/SearchBar.jsx": __vite_glob_0_72, "./Pages/Index/SecondStrip.jsx": __vite_glob_0_73, "./Pages/Index/ShowroomImage.jsx": __vite_glob_0_74, "./Pages/Index/TopStrip.jsx": __vite_glob_0_75, "./Pages/Index/UserRegister.jsx": __vite_glob_0_76, "./Pages/Index/WhyUs.jsx": __vite_glob_0_77, "./Pages/PincodeImport.jsx": __vite_glob_0_78, "./Pages/Profile/Edit.jsx": __vite_glob_0_79, "./Pages/Profile/Partials/DeleteUserForm.jsx": __vite_glob_0_80, "./Pages/Profile/Partials/UpdatePasswordForm.jsx": __vite_glob_0_81, "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": __vite_glob_0_82, "./Pages/User/Dashboard.jsx": __vite_glob_0_83, "./Pages/User/Inner.jsx": __vite_glob_0_84, "./Pages/Welcome.jsx": __vite_glob_0_85 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup({ App, props }) {
      return /* @__PURE__ */ jsx(CartProvider, { initialCartItems: props.initialPage.props.cartItems || [], children: /* @__PURE__ */ jsx(App, { ...props }) });
    }
  })
);
