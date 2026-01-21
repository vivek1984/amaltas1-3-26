import React from 'react';
import { usePage } from '@inertiajs/react'; // To access shared Inertia props

// Import both dashboard components.
// Adjust these paths based on your actual file structure within resources/js/Pages/
import AdminDashboard from './Admin/Dashboard.jsx'; // Assuming Admin folder is directly under Pages
import UserDashboard from './User/Dashboard.jsx';        // Your existing dashboard.jsx (for non-admins)

/**
 * DashboardRouter Component
 * This component acts as a router to conditionally render either the
 * Admin Dashboard or the regular User Dashboard based on the logged-in user's ID.
 * It expects 'auth.user.id' to be shared globally via Inertia props.
 */
const DashboardRouter = () => {
    // Access the shared 'auth' prop from Inertia.js.
    // The 'auth' object should contain user data, including their ID.
    const { auth } = usePage().props;

    // Get the ID of the logged-in user. Use optional chaining for safety.
    const userId = auth?.user?.id;

    // --- DEBUGGING LOG ---
    console.log("DashboardRouter: User ID:", userId);
    // ---------------------

    // Conditionally render the appropriate dashboard component.
    // Assuming user ID 1 is reserved for the admin.
    if (userId === 1) {
        console.log("DashboardRouter: Rendering Admin Dashboard.");
        return <AdminDashboard />;
    } else {
        console.log("DashboardRouter: Rendering User Dashboard.");
        return <UserDashboard />;
    }
};

export default DashboardRouter;
