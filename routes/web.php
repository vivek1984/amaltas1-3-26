<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ClusterController;
use App\Http\Controllers\GoogleReviewController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\PincodeImportController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SmsController;
use App\Http\Controllers\StaticController;
use App\Http\Controllers\VarientController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\SiteUrlController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Cleaned and consolidated routes.
|
*/

// Public
Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/search', SearchController::class)->name('search');
Route::post('store-location-answer', [WelcomeController::class, 'location'])->name('store-location-answer');
Route::post('/kitchen/data', [WelcomeController::class, 'saveKitchenEstimate'])->name('kitchen/data');
Route::get('/kitchen-cost-calculator', [ClusterController::class, 'modularKitchens'])->name('kitchen-cost-calculator');
Route::get('/site-urls', [SiteUrlController::class, 'index'])
    ->name('site-urls.index');

Route::put('/site-urls/{siteUrl}', [SiteUrlController::class, 'update'])
    ->name('site-urls.update');

// Cart (guest + authenticated users)
Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::get('/cart-json', [CartController::class, 'indexJson'])->name('cart.json');
Route::post('/cart/add-item', [CartController::class, 'addItem'])->name('cart.add.item');
Route::post('/api/cart/save', [CartController::class, 'saveCart'])->name('cart.save');
Route::get('/api/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/api/cart/remove-item', [CartController::class, 'removeItem'])->name('cart.removeItem');
Route::post('/api/cart/update-quantity', [CartController::class, 'updateItemQuantity'])->name('cart.updateQuantity');
Route::post('/api/cart/clear', [CartController::class, 'clearCart'])->name('cart.clearCart');
Route::post('/restore', [CartController::class, 'restoreCart'])->name('restore-cart');

// Authenticated routes (general)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [WelcomeController::class, 'dashboard'])->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Checkout (single canonical set of routes)
    // Show checkout page (requires auth)
    Route::get('/checkout', [CheckoutController::class, 'showCheckoutPage'])
        ->name('checkout.show');

    // Form submission -> confirmation
    Route::post('/checkout/confirm', [CheckoutController::class, 'showPaymentConfirmation'])
        ->name('checkout.confirm');

    // Verify payment (AJAX/webhook)
    Route::post('/checkout/verify-payment', [CheckoutController::class, 'verifyPayment'])
        ->name('checkout.verify-payment');

    // Cashfree helper endpoints
    Route::post('/checkout/get-cashfree-details', [CheckoutController::class, 'getCashfreeDetailsForOrder'])
        ->name('checkout.get-cashfree-details');

    // Cashfree callback (can be GET or POST depending on provider)
    Route::any('/checkout/verify-cashfree-payment', [CheckoutController::class, 'verifyCashfreePayment'])
        ->name('checkout.verify-cashfree-payment');
});

// Admin-only routes
Route::middleware(['auth', IsAdmin::class])->group(function () {
    // Dashboard & category management
    Route::get('/admin-dashboard', [AdminController::class, 'dashboard'])->name('admin-dashboard');

    Route::get('/admin-category', [AdminController::class, 'category'])->name('admin-category');
    Route::post('/admin-category', [AdminController::class, 'editCluster'])->name('admin-category.update');
    Route::post('/admin-group', [AdminController::class, 'editGroup'])->name('admin-group.update');
    Route::post('/link_cluster_group', [AdminController::class, 'linkClusterGroup'])->name('link_cluster_group');
    Route::post('/detach_group', [AdminController::class, 'detachGroup'])->name('detach_group');
    Route::post('/create_cluster', [AdminController::class, 'createCluster'])->name('create_cluster');
    Route::post('/create_group', [AdminController::class, 'createGroup'])->name('create_group');

    // Product / variant admin
    Route::get('/admin-product', [AdminController::class, 'product'])->name('admin-product');
    Route::get('/admin_edit_product', [AdminController::class, 'editProduct'])->name('admin_edit_product');
    Route::post('/admin_edit_product', [AdminController::class, 'editProductField'])->name('admin_edit_product.update');
    Route::post('/edit_product_image', [AdminController::class, 'editProductImage'])->name('edit_product_image');
    Route::post('/edit_varient_small_image', [AdminController::class, 'editVarientSmallImage'])->name('edit_varient_small_image');

    Route::get('/admin_create_varient', [AdminController::class, 'createVarient'])->name('admin_create_varient');
    Route::get('/admin_create_design', [AdminController::class, 'createDesign'])->name('admin_create_design');
    Route::get('/admin_create_size', [AdminController::class, 'createSize'])->name('admin_create_size');

    // Variant / design / size create endpoints (VarientController)
    Route::post('/create_varient', [VarientController::class, 'store'])->name('create_varient');
    Route::post('/create_design', [VarientController::class, 'storeDesign'])->name('create_design');
    Route::post('/create_size', [VarientController::class, 'storeSize'])->name('create_size');

    Route::post('/create_product', [VarientController::class, 'storeProduct'])->name('create_product');
    Route::post('/add_cluster_to_product', [VarientController::class, 'addClusterToProduct'])->name('add_cluster_to_product');
    Route::post('/edit_product_clusters', [VarientController::class, 'editProductClusters'])->name('edit_product_clusters');
    Route::post('/edit_product_groups', [VarientController::class, 'editProductGroups'])->name('edit_product_groups');

    // Image endpoints
    Route::get('/varient_images', [ImageController::class, 'varientImages'])->name('varient_images');
    Route::post('/images/upload', [ImageController::class, 'upload'])->name('images.upload');
    Route::post('/images/delete', [ImageController::class, 'delete'])->name('images.delete');

    // Material management (admin)
    Route::get('/material', [MaterialController::class, 'index'])->name('material');
    Route::post('/create_material', [MaterialController::class, 'createMaterial'])->name('create_material');
    Route::post('edit_material', [MaterialController::class, 'editMaterial'])->name('edit_material');
    Route::get('/calculator', [MaterialController::class, 'calculator'])->name('calculator');
    Route::post('/calculator', [MaterialController::class, 'save_calculator'])->name('save_calculator');
    Route::get('/estimates', [MaterialController::class, 'estimates'])->name('estimates');
    Route::post('/{id}/edit_estimate_material', [MaterialController::class, 'updateMaterialSpecs'])->name('estimates.update_materials');
    Route::post('/update_hardware/{id}', [MaterialController::class, 'updateHardware'])->name('update_hardware');
    // Pincode import (admin)
    Route::get('/admin/pincode-import', [PincodeImportController::class, 'showImportForm'])->name('pincodes.showImportForm');
    Route::post('/admin/pincode-import', [PincodeImportController::class, 'import'])->name('pincodes.import');
});

Route::get('/google-reviews', [GoogleReviewController::class, 'getReviews']);

//Static Pages
Route::get('about-us', [StaticController::class, 'aboutUs'])->name('about-us');
Route::get('locate-us', [StaticController::class, 'locateUs'])->name('locate-us');
Route::get('contact-us', [StaticController::class, 'contactUs'])->name('contact-us');
Route::post('contact-submit', [StaticController::class,'contactSubmit'])->name('contact-submit');
Route::get('custom-furniture', [StaticController::class, 'customFurniture'])->name('custom-furniture');
Route::post('custom-furniture', [StaticController::class, 'storeCustomFurniture'])->name('store-custom-furniture');
Route::get('exports', [StaticController::class, 'exports'])->name('exports');
Route::get('shipping-policy', [StaticController::class, 'shippingPolicy'])->name('shipping-policy');
Route::get('return-policy', [StaticController::class, 'returnPolicy'])->name('return-policy');
Route::get('terms-of-use', [StaticController::class, 'termsOfUse'])->name('terms-of-use');

// Auth routes (login/register/etc)
require __DIR__ . '/auth.php';

// Catch-all route for cluster/group/product slugs
Route::get('{path}', [ClusterController::class, 'index'])
    // Added 'assets' and 'build' to the exclusion list
    ->where('path', '^(?!api|images|storage|vendor|css|js|build|assets).*$');
