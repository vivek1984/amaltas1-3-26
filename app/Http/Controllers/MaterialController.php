<?php

namespace App\Http\Controllers;

use App\Models\Cabinet;
use App\Models\CabinetType;
use App\Models\Estimate;
use App\Models\Hard;
use App\Models\Material;
use App\Models\MaterialCategory;
use App\Services\CabinetCostService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Log;

class MaterialController extends Controller
{

    protected $costService;

    // Inject the service into the constructor
    public function __construct(CabinetCostService $costService)
    {
        $this->costService = $costService;
    }
    /**
     * Display a listing of the resource.
     */
    private function getCategories() {
        $cate =
        collect([
        ['id' => 1, 'name' => 'Cabinet Body'],
        ['id' => 2, 'name' => 'Back of Cabinet'],
        ['id' => 3, 'name' => 'Doors'],
        ['id' => 4, 'name' => 'Hardware'],
        ['id' => 5, 'name' => 'Laminate']
    ]);

    return $cate;
    }
    public function index()
    {
        $materials = Material::with('categories', 'cabinetTypes')->get();
        $material_categories = $this->getCategories();
        $cabinetTypes = CabinetType::all();

        return Inertia::render('Admin/Material',
        ['materials' => $materials,
                'material_categories' => $material_categories,
                'cabinet_types' => $cabinetTypes]);

    }

    /**
     * Show the form for creating a new resource.
     */


public function createMaterial(Request $request)
{
    // ✅ validate input
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'rate' => 'required|numeric|min:0',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'level' => 'required|string',
        'category_ids'   => 'required|array',
        'cabinet_type_ids' => 'required|array',
        'mica' => 'required'
    ]);

    // ✅ handle file upload & resize
    if ($request->hasFile('image')) {
        $image = $request->file('image');

        // generate unique filename
        $filename = uniqid() . '.' . $image->getClientOriginalExtension();

        // create manager with GD driver
        $manager = new ImageManager(new Driver());

        // resize to 500x500
        $resizedImage = $manager->read($image)->cover(500, 500);

        // save to storage/app/public/materials
        Storage::disk('public')->put(
            "materials/{$filename}",
            (string) $resizedImage->encode()
        );

        $validated['image'] = "materials/{$filename}";
    }

    // ✅ save into DB (only fields for materials table)
    $material = Material::create(collect($validated)->except('category_ids')->toArray());

    // ✅ attach categories (many-to-many)
    foreach($request->category_ids as $id)
    MaterialCategory::create([
        'material_id' => $material->id,
        'name' => $this->getCategoryName($id)
    ]);

    if (isset($validated['cabinet_type_ids'])) {
                $material->cabinetTypes()->sync($validated['cabinet_type_ids']);
            } else {
                $material->cabinetTypes()->sync([]);
            }

    return redirect()->back()->with('success', 'Material added successfully!');
    }

    private function getCategoryName($id) {
    $categories = $this->getCategories();
    foreach ($categories as $category) {
        if ($category['id'] == $id) {
            return $category['name'];
        }
    }
    return null; // in case not found
    }


    public function editMaterial(Request $request) {
//dd($request->all());
        $material = Material::findOrFail($request->id);
        $material->name = $request->name;
        $material->rate = $request->rate;
        $material->description = $request->description;
        $material->level = $request->level;
        $material->mica = $request->mica;
        $material->categories()->delete();
        foreach($request->categories as $cat) {
            MaterialCategory::create([
                'material_id' => $material->id,
                'name' => $cat
            ]);
        }
        $cabinetTypeNames = $request->cabinet_types;

// 1. Query the database, finding all records matching the names.
// 2. Pluck the 'id' column from the results.
// 3. Convert the result to a basic PHP array.
$cabinetTypeIds = CabinetType::whereIn('name', $cabinetTypeNames)
                              ->pluck('id')
                              ->toArray();
        $material->cabinetTypes()->sync($cabinetTypeIds);

        $material->save();
        return back();
    }
public function calculator()
{
    // 1. Fetch ALL materials, EAGER LOADING the 'categories' relationship.
    // This provides the frontend with everything it needs to filter internally.
    $materials = Material::with('categories')->get();

    // 2. Fetch Cabinet Types with their associated materials (Hardware)
    // and those materials' categories (needed to confirm they are 'Hardware').
    // This is the CRITICAL step for the new dynamic filtering logic.
    $cabinetTypes = CabinetType::with(['materials.categories'])->get();

    // 3. Instead of sending lists of IDs, send the full models.
    // The filtering for bodyOptions, backOptions, etc., is now done efficiently
    // in the React component (using the 'categories' relationship we eager loaded).

    return Inertia::render('Admin/Calculator', [
        'material' => $materials,          // All materials with categories
        'cabinetTypes' => $cabinetTypes,   // All Cabinet Types with associated hardware
    ]);
}

   public function save_calculator(Request $request){

     $estimate = $this->costService->createEstimate($request);
    // Create Estimate

    return redirect("/estimates?id={$estimate->id}")
    ->with('success', 'Estimate saved successfully!');

}


    public function estimates(Request $request) {
        $all_estimates = Estimate::where('type', 'offline')->get();

        if($request->id) {

        $estimate = Estimate::findOrFail($request->id);

        $estimateData = $this->costService->calculateEstimateData($estimate);

        $cabinetTypes = CabinetType::with(['materials.categories'])->get();

         $materials = Material::with('categories')->get();

        return Inertia::render('Admin/Estimate',
        [
            'costing' => $estimateData[0],
            'installation' => $estimateData[1],
            'estimates' => $all_estimates,
            'material' => $estimateData[2],
            'addons' => $estimateData[3],
            'materials' => $materials,
            'cabinetTypes' => $cabinetTypes,
        ]);

        }

        return Inertia::render('Admin/Estimate',
        ['estimates' => $all_estimates]);
    }

public function updateMaterialSpecs(Request $request, $id) {
    $this->costService->update($request, $id);

    return redirect()->back()->with('success', 'Material specifications updated successfully!');

}

public function updateHardware(Request $request, $id)
{
    $cabinet = Cabinet::findOrFail($id);
    $incomingHardware = $request->input('hardware', []);

    // 1️⃣ Load existing hardware with their materials
    $existingHards = $cabinet->hard()->with('material')->get();

    // 2️⃣ Identify which ones to keep (materials with rate = 1)
    $hardwareToKeep = $existingHards->filter(function ($hard) {
        return optional($hard->material)->rate == 1;
    });

    $hardwareToKeepIds = $hardwareToKeep->pluck('id')->toArray();

    // 3️⃣ Delete all others (where material rate != 1)
    $cabinet->hard()->whereNotIn('id', $hardwareToKeepIds)->delete();

    // 4️⃣ Add new incoming hardware
    foreach ($incomingHardware as $hardware) {
        $material = Material::where('name', $hardware['name'])->first();

        if ($material) {
            // Skip if this hardware (with rate=1) already exists
            if ($material->rate == 1) {
                Log::info("Keeping hardware with rate=1: {$material->name}");
                continue;
            }

            Hard::create([
                'cabinet_id'  => $cabinet->id,
                'hardware_id' => $material->id,
                'quantity'    => $hardware['quantity'] ?? 1,
            ]);

            Log::info("Added hardware: {$material->name} (Qty: {$hardware['quantity']})");
        } else {
            Log::warning("⚠️ Hardware not found: {$hardware['name']}");
        }
    }

    return redirect()->back();
}


}
