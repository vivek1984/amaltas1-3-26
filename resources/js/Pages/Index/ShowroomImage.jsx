import { IoLogoWhatsapp } from "react-icons/io";


export default function ShowroomImage () {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center pt-8 pb-8 bg-gray-100">
        <img src="/storage/images/showroom.jpg" className="h-80 rounded-xl shadow-lg" />
        <div className="text-center md:text-right ">
            <a href="https://maps.app.goo.gl/nJXkZEFjrTgMWpne7" target="_blank" className="flex justify-center mt-6 md:justify-end items-end mb-4">
                <img src="/storage/images/google.png" className="h-9 mr-2" />
                <span>Locate us on Map</span>
            </a>
        <span className="text-2xl ">Amaltas Furniture & Modular Kitchens</span>
        <span className="block">GMS Road, Near Chaudhary Farm House</span>
        <span className="block">Dehradun, Uttrakhand-248001</span>
        <a href="https://wa.me/9368330915" target="_blank" className=" flex items-center justify-center md:justify-end"><IoLogoWhatsapp className="text-xl text-green-800 mr-1" />93683 30915</a>
        </div>
        </div>
    );
};
