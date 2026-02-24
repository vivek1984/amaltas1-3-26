// import '../css/app.css';
// import './bootstrap';

// import { createInertiaApp } from '@inertiajs/react';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { createRoot } from 'react-dom/client';// Adjust path if necessary
// import { CartProvider } from './Pages/Category/CartContext';

// const appName = import.meta.env.VITE_APP_NAME || 'Amaltas';

// createInertiaApp({
//     title: (title) => `${title} - ${appName}`,
//     resolve: (name) =>
//         resolvePageComponent(
//             `./Pages/${name}.jsx`,
//             import.meta.glob('./Pages/**/*.jsx'),
//         ),
//     setup({ el, App, props }) {
//         const root = createRoot(el);

//         root.render(

//             <CartProvider initialCartItems={props.initialPage.props.cartItems || []}>
//         <App {...props} />
//         </CartProvider>
//         );
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });
import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { CartProvider } from '@/Context/CartContext';

// ✅ ADD THESE TWO LINES


import { route } from 'ziggy-js';
import { Ziggy } from './ziggy';



window.route = (name, params, absolute = false) =>
    route(name, params, absolute, Ziggy);

const appName = import.meta.env.VITE_APP_NAME || 'Amaltas';

// ✅ EXPOSE route() GLOBALLY
window.route = (name, params, absolute = false) =>
    route(name, params, absolute, Ziggy);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),

    setup({ el, App, props }) {
        createRoot(el).render(
            <CartProvider initialCartItems={props.cartItems || []}>
                <App {...props} />
            </CartProvider>
        );
    },

    progress: {
        color: '#4B5563',
    },
});