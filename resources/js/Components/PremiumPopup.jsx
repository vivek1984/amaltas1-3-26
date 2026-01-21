import React, { useEffect } from "react";

export default function PremiumPopup({
    show = false,
    title = "Thank You!",
    message = "Your message has been received.",
    onClose = () => {},
    autoClose = true,
    autoCloseTime = 3000,
}) {

    useEffect(() => {
        if (show && autoClose) {
            const timer = setTimeout(() => onClose(), autoCloseTime);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!show) return null;

    return (
        <>
            {/* Inline CSS inside component */}
            <style>{`
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
            `}</style>

            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] popup-premium-container">

                {/* Popup Box */}
                <div className="popup-premium-box bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-11/12 max-w-md text-center border border-white/30">

                    {/* Animated Icon */}
                    <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-lg popup-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-semibold text-gray-800 mb-3 tracking-tight">
                        {title}
                    </h2>

                    {/* Message */}
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                        {message}
                    </p>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="px-8 py-3 rounded-xl bg-gray-900 text-white text-lg shadow hover:bg-gray-800 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
}
