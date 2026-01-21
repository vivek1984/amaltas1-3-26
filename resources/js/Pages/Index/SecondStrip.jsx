import { Link } from "@inertiajs/react";
import SearchBar from "./SearchBar";
import UserRegister from "./UserRegister";
import Cart from "./Cart";
import { useCart } from '../Category/CartContext';

export default function SecondStrip () {

     const { totalItems } = useCart();

    return (
        <div className="m-4 flex justify-between align-middle items-center">
            <Link href= '/'>
                <img src='/storage/images/logo.png' className="sm:h-11 h-5" />
            </Link>
            <SearchBar searchUrl="search" classes = "w-64 p-3 pl-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm"/>
            <div className="flex items-center" >

                <Cart items={totalItems} className="text-maroon-800" />

                <UserRegister add_class='pr-5 pl-1 flex flex-col items-center text-maro  on-900' />
            </div>
        </div>
    );
};

// sofas
// bedroom
// dining
// Storage
// Office
// Tables
// Living Room
// Modular Kitchens
// Temples

// Sofa Sets

// Fabric Sofas
// Wooden Sofas
// Carving Teak Sofas
// Sofa Cum Bed
// 3+1+1 Sofa Sets
// L Shaped Sofas
// Office Sofas
// Wingback Chairs
// Lounge Chairs
// Accent Chairs
// Recliners
