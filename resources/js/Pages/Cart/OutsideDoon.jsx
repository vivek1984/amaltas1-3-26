import Welcome from "../Welcome";

export default function OutsideDoon({ clusters, slug }) {
    console.log(clusters, slug);
    const phone = "919368330915"; // your WhatsApp number
    const message = `www.amaltasfurniture.com/${slug}`;
    const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <Welcome clusters={clusters}>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
                <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center border border-gray-200">

                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        More Information Required
                    </h1>

                    <div
                        className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-4 rounded mb-6"
                        role="alert"
                    >
                        <p className="font-bold mb-1">
                            One or more products in your order list may not be easily shippable.
                        </p>
                        <p className="text-sm leading-relaxed">
                            We are based in Dehradun.
                            To determine the exact shipping cost please contact us:
                        </p>
                    </div>

                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            flex items-center justify-center gap-2
                            bg-green-500 hover:bg-green-600
                            text-white font-semibold
                            px-5 py-3 rounded-lg
                            shadow-md hover:shadow-lg
                            transition-all duration-200
                            w-full
                        "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                        >
                            <path d="M16.003 3C9.376 3 4 8.375 4 15c0 2.64.869 5.086 2.341 7.074L4 29l7.115-2.297A11.88 11.88 0 0 0 16.003 27C22.628 27 28 21.627 28 15S22.628 3 16.003 3zm0 22c-1.82 0-3.52-.497-4.988-1.36l-.356-.21-4.223 1.363 1.38-4.118-.23-.378A9.94 9.94 0 0 1 6 15c0-5.514 4.487-10 10.003-10S26 9.486 26 15s-4.487 10-9.997 10zm5.287-7.316c-.292-.146-1.723-.852-1.99-.95-.268-.098-.463-.146-.657.146-.195.293-.754.95-.925 1.145-.171.195-.342.22-.634.073-.292-.146-1.233-.455-2.35-1.45-.868-.773-1.454-1.73-1.625-2.022s-.018-.45.128-.596c.132-.132.293-.342.439-.512.146-.171.195-.293.293-.488.098-.195.049-.366-.024-.512-.073-.146-.657-1.586-.902-2.171-.238-.571-.481-.494-.657-.502l-.561-.01c-.195 0-.512.073-.78.366-.268.293-1.024 1-1.024 2.439 0 1.439 1.048 2.834 1.193 3.029.146.195 2.06 3.148 5.02 4.414.702.303 1.249.484 1.676.62.703.224 1.343.192 1.848.117.564-.084 1.723-.703 1.967-1.382.244-.68.244-1.264.171-1.382-.073-.117-.268-.195-.561-.341z" />
                        </svg>

                        Connect on WhatsApp
                    </a>

                </div>
            </div>
        </Welcome>
    );
}
