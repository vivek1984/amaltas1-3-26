import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function ShareButton({ className = "" }) {
    const { url } = usePage();
    const fullUrl = `${window.location.origin}${url}`;
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: fullUrl,
                });
            } catch (e) {}
        } else {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    return (
        <div className="relative group">
            <button
                onClick={handleShare}
                aria-label="Share this page"
                className={`w-9 h-9 flex items-center justify-center rounded-full hover:bg-maroon-500 hover:ring-8 hover:ring-maroon-500 transition ${className}`}
            >
                <img
                    src="storage/icons/share.png"
                    alt="Share"
                    className="w-10 h-10 opacity-80 group-hover:opacity-100 transition"
                />
            </button>

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                            whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white
                            opacity-0 group-hover:opacity-100 transition pointer-events-none">
                {copied ? "Link copied!" : "Share this page"}
            </div>
        </div>
    );
}
