import { IoCallOutline } from "react-icons/io5";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

export default function TopStrip () {
    return (
        <div
        className="transform scale-100 sm:scale-100 md:scale-100 lg:scale-100 xs:scale-90 bg-gradient-to-r from-maroon-50 to-maroon-100 flex align-middle justify-between text-maroon-700">
            <div className="flex align-middle">
                <FaLocationPin className="mt-1 ml-4 mr-1 " />
                GMS Road, Dehradun
                </div>
            <div className="flex align-middle">
                <a href="https://wa.me/9368330915" target="_blank">
                <FaWhatsappSquare className="text-green-600  text-2xl" />
                </a>
                <IoCallOutline className="mt-1 ml-1 mr-1" />
                <span className="mr-4">9368330915</span>
            </div>
        </div>
    );
};
