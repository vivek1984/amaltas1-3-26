import React from 'react';
import { Link } from '@inertiajs/react'; // Assuming you use Inertia's Link for internal navigation
import { FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
/**
 * Footer Component
 * Renders a responsive footer for the webpage, including navigation links
 * and social media icons.
 * Designed with Tailwind CSS for a clean and modern look.
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-maroon-800 text-maroon-200 py-10 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {/* Section 1: About & Contact */}
                <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white mb-2">About Us</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/about-us" className="hover:text-maroon-400 transition-colors duration-200">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/locate-us" className="hover:text-maroon-400 transition-colors duration-200">
                                Our Location
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact-us" className="hover:text-maroon-400 transition-colors duration-200">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            {/* WhatsApp link will open directly */}
                            <a href="https://wa.me/9368330915" target="_blank" rel="noopener noreferrer" className="hover:text-maroon-400 transition-colors duration-200">
                                WhatsApp Us
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Section 2: Services & Exports */}
                <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white mb-2">Services</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/custom-furniture" className="hover:text-maroon-400 transition-colors duration-200">
                                Custom Furniture
                            </Link>
                        </li>
                        <li>
                            <Link href="/exports" className="hover:text-maroon-400 transition-colors duration-200">
                                Exports
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Section 3: Policies */}
                <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white mb-2">Policies</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/shipping-policy" className="hover:text-maroon-400 transition-colors duration-200">
                                Shipping Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/return-policy" className="hover:text-maroon-400 transition-colors duration-200">
                                Return Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms-of-use" className="hover:text-maroon-400 transition-colors duration-200">
                                Terms of Use
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Section 4: Social Media & Copyright */}
                <div className="md:col-span-3 lg:col-span-1 space-y-4">
                    <h4 className="text-xl font-bold text-white mb-2">Connect With Us</h4>
                    <div className="flex space-x-6">
                        {/* Instagram */}
                        <a href="https://www.instagram.com/amaltasfurniture" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram className='text-3xl hover:text-maroon-400 transition-colors duration-200' />

                        </a>
                        {/* YouTube */}
                        <a href="https://www.youtube.com/@amaltasfurniture" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <FaYoutube className='text-3xl hover:text-maroon-400 transition-colors duration-200' />

                        </a>
                        {/* Facebook */}
                        <a href="https://www.facebook.com/amaltasfurniture" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg className="w-8 h-8 text-gray-400 hover:text-maroon-600 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.24.195 2.24.195v2.454H15.83c-1.222 0-1.604.755-1.604 1.54V12h2.77l-.443 2.891h-2.327v6.987C18.343 21.128 22 16.991 22 12z"/>
                            </svg>
                        </a>
                        {/* Pinterest */}
                        <a href="https://www.pinterest.com/amaltasfurniture" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                            <FaPinterest className='text-3xl hover:text-maroon-400 transition-colors duration-200' />

                        </a>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="border-t border-maroon-700 mt-8 pt-6 text-center text-maroon-500 text-sm">
                &copy; {currentYear} Amaltas Furniture Studio. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
