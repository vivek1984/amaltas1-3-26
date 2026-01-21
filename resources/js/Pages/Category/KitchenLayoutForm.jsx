import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function KitchenLayoutForm() {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);
    }, []);

    // Steps: 1 (Layout), 2 (Dimensions), 3 (Cabinet Material), 4 (Shutter Material), 5 (Contact Info)
    const [step, setStep] = useState(1);
    const [selectedLayout, setSelectedLayout] = useState('');
    const [selectedCabinetMaterial, setSelectedCabinetMaterial] = useState('');
    const [selectedShutterMaterial, setSelectedShutterMaterial] = useState('');
    const [estimateData, setEstimateData] = useState({});

    // State for Wall Dimensions (Feet and Inches)
    const [wallDimensions, setWallDimensions] = useState({
        wallA_ft: '5', wallA_in: '0',
        wallB_ft: '5', wallB_in: '0',
        wallC_ft: '5', wallC_in: '0',
    });

    // State for Contact Information (Step 5)
    const [contactInfo, setContactInfo] = useState({
        name: '',
        phone: '',
        email:'',
        address: '',
    });



    // --- Data Definitions ---
    const layouts = [
        { id: 'l-shaped', label: 'L-Shaped Kitchen', walls: ['A', 'B'], photo: 'storage/kitchen/LShaped.png' },
        { id: 'u-shaped', label: 'U-Shaped Kitchen', walls: ['A', 'B', 'C'], photo: 'storage/kitchen/UShaped.png' },
        { id: 'parallel', label: 'Parallel Kitchen', walls: ['A', 'B'], photo: 'storage/kitchen/Parallel.png' },
        { id: 'straight', label: 'Straight Kitchen', walls: ['A'], photo: 'storage/kitchen/Straight.png' },
    ];

    const cabinetMaterials = [
        { id: '4-0', label: 'Action Tesa HDHMR', description: 'High-Density High Moisture Resistance board for superior durability.', photo: 'storage/kitchen/action.jpg' },
        { id: '5-11', label: 'BWP Plywood with Mica Laminate', description: 'Boiling Water Proof Plywood with a decorative Mica finish.', photo: 'storage/kitchen/plywood.jpeg' },
    ];

    const shutterMaterials = [
        { id: '48-11', label: 'Blockboard with Mica Laminate', description: 'Very Strong, Non Bending Door with great finish.', photo: 'storage/kitchen/blockboard.jpeg' },
        { id: '5-10', label: 'BWP Ply with Mica Laminate', description: 'Water-resistant base with a laminate finish (Gloss / Matt).', photo: 'storage/kitchen/PlyLaminate.jpeg' },
        { id: '5-47', label: 'BWP Ply with Acrylic Laminate', description: 'Premium finish with high-gloss acrylic on a water-resistant base.', photo: 'storage/kitchen/plyAcrylic.webp' },
        { id: '4-11', label: 'HDMHR with Mica Laminate', description: 'High density, moisture-resistant base with laminate.', photo: 'storage/kitchen/hdmhrMica.webp' },
        { id: '4-47', label: 'HDMHR with Acrylic Laminate', description: 'High density, high gloss, excellent durability.', photo: 'storage/kitchen/hdmhrAcrylic.jpg' },
        { id: '4-38', label: 'HDMHR with Grooving and PU Paint', description: 'Designer shutters with recessed patterns and a PU paint finish.', photo: 'storage/kitchen/hdmhrGrove.jpg' },
    ];


    // Utility function to create dropdown options
    const createOptions = (start, end) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i).map(num => (
            <option key={num} value={num}>{num}</option>
        ));

    // --- Handlers ---

    // 1. Handles selection changes (Step 1, 3, 4)
    const handleChange = (event, itemData) => {
        const value = event.target.value;

        if (step === 1) {
            setSelectedLayout(value);
            setEstimateData(prev => ({ ...prev, layout: itemData }));
            setTimeout(() => setStep(2), 150); // Auto-Advance to Step 2

        } else if (step === 3) {
            setSelectedCabinetMaterial(value);
            setEstimateData(prev => ({ ...prev, cabinetMaterial: itemData }));

        } else if (step === 4) {
            setSelectedShutterMaterial(value);
            setEstimateData(prev => ({ ...prev, shutterMaterial: itemData })); // Save shutter material data on selection
        }
    };

    // 2. Handles dimension input changes (Step 2)
    const handleDimensionChange = (e) => {
        setWallDimensions({
            ...wallDimensions,
            [e.target.name]: e.target.value,
        });
    };

    // 3. Handles contact info changes (Step 5)
    const handleContactChange = (e) => {
        setContactInfo({
            ...contactInfo,
            [e.target.name]: e.target.value,
        });
    };

    // 4. Handles continuing from Dimension Input (Step 2 to 3)
    const handleDimensionsContinue = () => {
        const currentLayout = layouts.find(l => l.label === selectedLayout);
        const dimensions = {};

        for (const wall of currentLayout.walls) {
            const ft = wallDimensions[`wall${wall}_ft`];
            const inch = wallDimensions[`wall${wall}_in`];

            if (ft === '0' && inch === '0') {
                 alert(`Wall ${wall} cannot be 0 feet and 0 inches. Please enter a valid measurement.`);
                 return;
            }
            dimensions[`wall${wall}_ft`] = ft;
            dimensions[`wall${wall}_in`] = inch;
        }

        setEstimateData(prev => ({ ...prev, layoutDimensions: dimensions }));
        setStep(3); // Advance to Step 3
    };

    // 5. Handles continuing from Cabinet Material (Step 3 to 4)
    const handleCabinetMaterialContinue = () => {
        if (!selectedCabinetMaterial) {
            alert('Please select a cabinet material to continue.');
            return;
        }
        setStep(4); // Advance to Step 4
    };

    // 6. Handles continuing from Shutter Material (Step 4 to 5)
    const handleShutterMaterialContinue = () => {
        if (!selectedShutterMaterial) {
            alert('Please select a shutter material to continue.');
            return;
        }
        setStep(5); // Advance to Step 5 (Contact Info)
    };


    // 7. Handler for the final form submission (only called on Step 5 button click)
const handleFinalSubmit = (e) => {
    e.preventDefault();

    // Final Contact Validation
    if (!contactInfo.name || !contactInfo.phone || !contactInfo.address) {
        alert('All contact fields are required to submit the estimate.');
        return;
    }

    if (!window.grecaptcha) {
        alert("Captcha not loaded. Please refresh the page.");
        return;
    }

    window.grecaptcha.ready(() => {
        window.grecaptcha
            .execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
                action: "kitchen_estimate",
            })
            .then((token) => {
                // ✅ token EXISTS here

                const finalData = {
                    ...estimateData,
                    contactInfo: contactInfo,
                    recaptcha_token: token, // ✅ FIXED
                };

                router.post('/kitchen/data', finalData);
            })
            .catch(() => {
                alert("Captcha verification failed. Please try again.");
            });
    });
};


    // 8. Back navigation
    const handleBack = () => {
        if (step === 5) {
            setStep(4);
        } else if (step === 4) {
            setStep(3);
            setSelectedShutterMaterial('');
        } else if (step === 3) {
            setStep(2);
            setSelectedCabinetMaterial('');
        } else if (step === 2) {
            setStep(1);
            setSelectedLayout('');
            setEstimateData(prev => ({ ...prev, layout: null, layoutDimensions: null }));
            setWallDimensions({ wallA_ft: '5', wallA_in: '0', wallB_ft: '5', wallB_in: '0', wallC_ft: '5', wallC_in: '0' });
        }
    };

    // --- Render Components ---

    const renderDimensionInput = () => {
        const currentLayout = layouts.find(l => l.label === selectedLayout);
        if (!currentLayout) return null;

        return (
            <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-lg border-t-4 border-indigo-500">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                    Step 2: Enter Measurements
                </h3>
                {/* Visible Context Card */}
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                    <img src={currentLayout.photo} alt={currentLayout.label} className="max-h-64 object-contain mx-auto mb-4 rounded-md border"/>
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold text-gray-800">Layout: {currentLayout.label}</span>
                        <button type="button" onClick={handleBack} className="text-md text-indigo-500 hover:text-indigo-700 underline" title="Change Layout">
                            Change Layout
                        </button>
                    </div>
                </div>
                {/* Dimension Inputs */}
                <div className="space-y-4">
                    {currentLayout.walls.map(wall => (
                        <div key={wall} className="flex items-center">
                            <label className="w-20 text-md font-medium text-gray-700">Wall {wall}:</label>
                            <div className="flex space-x-2 flex-grow">
                                <select name={`wall${wall}_ft`} value={wallDimensions[`wall${wall}_ft`]} onChange={handleDimensionChange} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">{createOptions(5, 20)}</select>
                                <span className="self-center font-medium">ft</span>
                                <select name={`wall${wall}_in`} value={wallDimensions[`wall${wall}_in`]} onChange={handleDimensionChange} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">{createOptions(0, 11)}</select>
                                <span className="self-center font-medium">in</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-8">
                    <button type="button" onClick={handleDimensionsContinue} className="px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                        Continue to Step 3 &rarr;
                    </button>
                </div>
            </div>
        );
    };

    const renderContactInfo = () => (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-lg border-t-4 border-indigo-500">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Step 5: Your Contact Information
            </h3>
            <div className="space-y-6">

                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-md font-medium text-gray-700">Name *</label>
                    <input type="text" id="name" name="name" value={contactInfo.name} onChange={handleContactChange} required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Your Full Name"
                    />
                </div>

                {/* Phone Number Input */}
                <div>
                    <label htmlFor="phone" className="block text-md font-medium text-gray-700">Phone Number* (Your Estimate will come on Whatsapp)</label>
                    <input type="tel" id="phone" name="phone" value={contactInfo.phone} onChange={handleContactChange} required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., +91 98765 43210"
                    />
                </div>

                 {/* email Input */}
                <div>
                    <label htmlFor="email" className="block text-md font-medium text-gray-700">Email</label>
                    <input type="tel" id="email" name="email" value={contactInfo.email} onChange={handleContactChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., yourname@somemail.com"
                    />
                </div>

                {/* Address Input */}
                <div>
                    <label htmlFor="address" className="block text-md font-medium text-gray-700">Address *</label>
                    <textarea id="address" name="address" rows="3" value={contactInfo.address} onChange={handleContactChange} required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Street Address, City, Pincode"
                    ></textarea>
                </div>
            </div>

            {/* Navigation Buttons for Step 5 */}
            <div className="flex justify-between mt-8">
                <button type="button" onClick={handleBack} className="px-6 py-3 border-2 border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors">
                    &larr; Back to Shutter Material
                </button>
                <button
                    type="submit" // Final submission button
                    className="px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                    disabled={!contactInfo.name || !contactInfo.phone || !contactInfo.address}
                >
                    Submit Final Estimate
                </button>
            </div>
        </div>
    );


    // Component to render the Card Selection
    const renderCardSelection = (items, selectionState, currentStep) => (
        <div className={`grid gap-4 mb-8 ${currentStep === 1 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
            {items.map((item) => (
                <div key={item.id}>
                    <input
                        id={item.id}
                        name={currentStep === 1 ? 'kitchenLayout' : (currentStep === 3 ? 'cabinetMaterial' : 'shutterMaterial')}
                        type="radio"
                        value={item.label}
                        checked={selectionState === item.label}
                        onChange={(e) => handleChange(e, item)}
                        className="hidden"
                    />
                    <label
                        htmlFor={item.id}
                        className={`
                            flex items-center p-3 rounded-lg cursor-pointer transition-all h-full
                            ${currentStep === 1 ? 'min-h-[80px]' : 'min-h-[120px]'}
                            ${selectionState === item.label
                                ? 'border-4 border-indigo-600 shadow-xl bg-indigo-50'
                                : 'border-2 border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                            }
                        `}
                    >
                        <img src={item.photo} alt={item.label} className="w-20 h-20 object-contain rounded-md flex-shrink-0 mr-4 border" />
                        <div className="text-left flex-grow">
                            <span className="text-lg font-semibold text-gray-800 block">{item.label}</span>
                            {item.description && <span className="text-sm text-gray-600">{item.description}</span>}
                        </div>
                    </label>
                </div>
            ))}
        </div>
    );

    // --- Main Render Block ---

    const getTitle = () => {
        if (step === 1) return 'Step 1: Choose Your Kitchen Layout';
        if (step === 2) return 'Step 2: Enter Wall Measurements';
        if (step === 3) return 'Step 3: Choose Cabinet Material';
        if (step === 4) return 'Step 4: Choose Shutter Material (Finishing)';
        if (step === 5) return 'Step 5: Finalize Your Estimate';
        return '';
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                {getTitle()}
            </h2>

            <form onSubmit={handleFinalSubmit}>

                {/* RENDER STEP 1: Layout Selection */}
                {step === 1 && renderCardSelection(layouts, selectedLayout, 1)}

                {/* RENDER STEP 2: Dimension Input */}
                {step === 2 && renderDimensionInput()}

                {/* RENDER STEP 3: Cabinet Material Selection */}
                {step === 3 && (
                    <>
                        {renderCardSelection(cabinetMaterials, selectedCabinetMaterial, 3)}
                        <div className="flex justify-between mt-6">
                            <button type="button" onClick={handleBack} className="px-6 py-3 border-2 border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors">
                                &larr; Back to Measurements
                            </button>
                            <button
                                type="button"
                                onClick={handleCabinetMaterialContinue}
                                className="px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                                disabled={!selectedCabinetMaterial}
                            >
                                Continue to Step 4 &rarr;
                            </button>
                        </div>
                    </>
                )}

                {/* RENDER STEP 4: Shutter Material Selection */}
                {step === 4 && (
                    <>
                        {renderCardSelection(shutterMaterials, selectedShutterMaterial, 4)}
                        <div className="flex justify-between mt-6">
                            <button type="button" onClick={handleBack} className="px-6 py-3 border-2 border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors">
                                &larr; Back to Cabinet Material
                            </button>
                            <button
                                type="button"
                                onClick={handleShutterMaterialContinue}
                                className="px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                                disabled={!selectedShutterMaterial}
                            >
                                Continue to Step 5 &rarr;
                            </button>
                        </div>
                    </>
                )}

                {/* RENDER STEP 5: Contact Information */}
                {step === 5 && renderContactInfo()}
            </form>
        </div>
    );
}
