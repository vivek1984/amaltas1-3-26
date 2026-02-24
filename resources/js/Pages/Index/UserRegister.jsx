import Dropdown from '@/Components/Dropdown'; // Assuming Dropdown component is available at this path
import { Link, usePage } from '@inertiajs/react';
import { FaRegUser } from "react-icons/fa"; // Importing Font Awesome user icon

/**
 * UserRegister Component
 *
 * This component conditionally displays user registration/login options
 * or a logged-in user's profile dropdown.
 * It integrates with Inertia.js for authentication status and navigation.
 *
 * @param {object} props - The component props.
 * @param {string} [props.add_class] - Additional CSS classes to apply to the login/register div.
 */
export default function UserRegister ({add_class}) {
    // Retrieve user authentication data from Inertia's usePage hook.
    // 'auth.user' will contain the logged-in user object if authenticated, otherwise it will be null.
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <>
        { user ? (
            // If user is logged in, display the profile dropdown.
            // Removed 'hidden' class to make it visible on all screen sizes,
            // but kept 'sm:ms-6 sm:flex sm:items-center' for desktop alignment.
            <div className="sm:ms-6 sm:flex sm:items-center">
                <div className="relative ms-3">
                    {/* Dropdown component for user profile actions */}
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                >
                                    {/* Display first letter of user's name in a circle avatar */}
                                    {/* This avatar is now hidden on medium screens (md) and up */}
                                    {user.name && (
                                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base uppercase mr-2 md:hidden">
                                            {user.name.charAt(0)}
                                        </div>
                                    )}

                                    {/* Display full name from medium screens (md) and up, hidden on smaller screens */}
                                    <span className="hidden md:inline">{user.name}</span>

                                    {/* Dropdown arrow icon */}
                                    <svg
                                        className="-me-0.5 ms-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            {/* Link to user profile edit page */}
                            <Dropdown.Link
                                href={route('dashboard')} // Assuming 'profile.edit' route is defined in Laravel
                            >
                                Dashboard
                            </Dropdown.Link>
                            {/* Link for logging out */}
                            <Dropdown.Link
                                href={route('logout')} // Assuming 'logout' route is defined in Laravel
                                method="post" // Use POST method for logout
                                as="button" // Render as a button for form submission
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        ) : (
            // If no user is logged in, display the Login/Register link.
            <Link href='/login'> {/* Link to the login page */}
                <div className={add_class}> {/* Apply additional classes passed via props */}
                    <FaRegUser /> {/* Font Awesome user icon */}
                    {/* Text for Login/Register, conditionally hidden on some screen sizes */}
                    <span className='hidden md:block lg:block xl:block'>Login/Register</span>
                </div>
            </Link>
        )}
        </>
    );
}
