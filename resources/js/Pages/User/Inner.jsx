import React, { useState, useEffect, Suspense } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

const Estimate = React.lazy(() => import('../Admin/Estimate'));

const Inner = ({
  userData,
  ordersData,
  costing = [],
  installation = 0,
  estimates = [],
  material = {},
  materials = [],
  addons = [],
  cabinetTypes = [],
}) => {
  // ✅ Load the last active tab from localStorage (default: 'orders')
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem('activeSection') || 'orders';
  });

  // ✅ Persist the tab whenever it changes
  useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${date.getFullYear()}`;
  };

  const getNavLinkClasses = (sectionName) =>
    `flex items-center space-x-3 p-4 transition-colors duration-200 rounded-lg ${
      activeSection === sectionName
        ? 'bg-indigo-100 text-indigo-700 font-semibold'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  const completePurchase = (orderId) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/restore';
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    form.innerHTML = `
      <input type="hidden" name="_token" value="${token}" />
      <input type="hidden" name="orderId" value="${orderId}" />
    `;
    document.body.appendChild(form);
    form.submit();
  };

  const renderOrderItems = (items) => (
    <div className="space-y-4 mt-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4">
          <div className="flex-grow p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-grow">
              <p className="font-semibold text-lg text-gray-800">{item.product?.name || 'N/A'}</p>
              <div className="mt-2 text-sm text-gray-600">
                {item.variant?.name && <p><strong>Variant:</strong> {item.variant.name}</p>}
                {item.design?.name && <p><strong>Design:</strong> {item.design.name}</p>}
                {item.size?.name && <p><strong>Size:</strong> {item.size.name}</p>}
              </div>
            </div>
            <div className="text-sm md:text-base text-right md:text-left">
              <p className="text-gray-700 font-semibold">Qty: {item.quantity}</p>
              <p className="text-gray-700 font-semibold mt-1">Price: {formatPrice(item.price)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const myOrders =
    ordersData?.filter(
      (o) => o.cashfree_order_id && o.status === 'paid' && o.payment_status === 'pending'
    ) || [];
  const pendingOrders = ordersData?.filter((o) => o.status === 'pending') || [];
  const completeOrders = ordersData?.filter((o) => o.status === 'delivered') || [];

  const renderMainContent = () => {
    switch (activeSection) {
      case 'orders':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">My Orders</h2>
            {myOrders.length > 0 ? (
              myOrders.map((order) => (
                <div key={order.id} className="border-b pb-4 mb-4">
                  <p className="font-semibold text-lg text-slate-800">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.created_at)} | {formatPrice(order.total_amount)}
                  </p>
                  {renderOrderItems(order.items || [])}
                </div>
              ))
            ) : (
              <p className="bg-indigo-50 p-4 rounded-lg text-gray-600">No orders found.</p>
            )}
          </div>
        );

      case 'pending_orders':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Pending Orders</h2>
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => (
                <div key={order.id} className="border-b pb-4 mb-4">
                  <p className="font-semibold text-lg text-slate-800">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.created_at)} | {formatPrice(order.total_amount)}
                  </p>
                  {renderOrderItems(order.items || [])}
                  <PrimaryButton onClick={() => completePurchase(order.id)} className="mt-3">
                    Complete Purchase
                  </PrimaryButton>
                </div>
              ))
            ) : (
              <p className="bg-indigo-50 p-4 rounded-lg text-gray-600">No pending orders found.</p>
            )}
          </div>
        );

      case 'complete_orders':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Completed Orders</h2>
            {completeOrders.length > 0 ? (
              completeOrders.map((order) => (
                <div key={order.id} className="border-b pb-4 mb-4">
                  <p className="font-semibold text-lg text-slate-800">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.created_at)} | {formatPrice(order.total_amount)}
                  </p>
                  {renderOrderItems(order.items || [])}
                </div>
              ))
            ) : (
              <p className="bg-indigo-50 p-4 rounded-lg text-gray-600">No completed orders found.</p>
            )}
          </div>
        );

      // ✅ Kitchen Estimates (lazy-loaded)
      case 'kitchen_estimates':
        return (
          <div className="bg-gray-100 rounded-lg p-4">
            <Suspense fallback={<p>Loading Kitchen Estimates...</p>}>
              <Estimate
                embedded={true}
                costing={costing}
                installation={installation}
                estimates={estimates}
                material={material}
                materials={materials}
                addons={addons}
                cabinetTypes={cabinetTypes}
              />
            </Suspense>
          </div>
        );

      case 'help':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Help Desk</h2>
            <p className="text-gray-600">
              You can mail us at <strong>amaltasfurniture@gmail.com</strong> <br />
              WhatsApp / call us at <strong>93683 30915</strong>
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <div className="container mx-auto max-w-7xl p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4 mb-8">
            <img
              src={userData?.profileImage || 'https://placehold.co/50x50/FCA5A5/FFFFFF?text=JD'}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-indigo-400"
            />
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                {userData?.name || 'Guest'}
              </h2>
            </div>
          </div>

          <nav className="space-y-2">
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('orders'); }}
               className={getNavLinkClasses('orders')}>My Orders</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('pending_orders'); }}
               className={getNavLinkClasses('pending_orders')}>Pending Orders</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('complete_orders'); }}
               className={getNavLinkClasses('complete_orders')}>Completed Orders</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('kitchen_estimates'); }}
               className={getNavLinkClasses('kitchen_estimates')}>Kitchen Estimates</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('help'); }}
               className={getNavLinkClasses('help')}>Help Desk</a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">{renderMainContent()}</div>
      </div>
    </div>
  );
};

export default Inner;
