<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SiteUrl;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteUrlController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/SiteUrlMapping', [
            'urls' => SiteUrl::orderBy('id')->paginate(50),
        ]);
    }

    public function update(Request $request, SiteUrl $siteUrl)
    {
        
        $request->validate([
            'new_url' => 'nullable|max:2048',
        ]);
        
        
        $siteUrl->update([
            'new_url' => $request->new_url,
        ]);

        return back();
    }
}