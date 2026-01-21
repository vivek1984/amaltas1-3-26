<?php

use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleReviewController; // Make sure this import is present

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
// routes/api.php

Route::get('/google-reviews', [GoogleReviewController::class, 'getReviews']);
// Route::post('/cart/save', [CartController::class, 'saveCart']);

Route::post('/cart/update', [CartController::class, 'updateCart']); // For full cart sync from CartPage
Route::post('/cart/add-item', [CartController::class, 'addItem']);
