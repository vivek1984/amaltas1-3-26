<?php

namespace App\Http\Controllers;

use App\Models\Addon;
use App\Models\Cabinet;
use App\Models\CabinetType;
use App\Models\Cluster;
use App\Models\Estimate;
use App\Models\Location;
use App\Models\Material;
use App\Models\Product;
use App\Services\CabinetCostService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Services\EmailService;
use App\Helpers\ReactEmail;
use Illuminate\Support\Facades\Http;

class WelcomeController extends Controller
{
    protected $costService;

    // Inject the service into the constructor
    public function __construct(CabinetCostService $costService)
    {
        $this->costService = $costService;
    }
    public function index() {
       // $this->sendTestEmail();
        $clusters = Cluster::with(['groups'])->get();
        $products = Product::with([
        'varients',
        'varients.designs',
        'varients.designs.sizes',
        'varients.images'
            ])
            ->orderBy('clicks', 'DESC')   // highest clicks first
            ->take(20)                    // limit 20 products
            ->get();

        return Inertia::render('Index/Index', ['clusters' => $clusters, 'products' => $products]);

    }

   public function dashboard(Request $request)
{
    $user = Auth::user();

    if (!$user) {
        return redirect()->route('login');
    }

    // ✅ Redirect admin users
    if ($user->id == 1) {
        return redirect('admin-dashboard');
    }

    // ✅ Fetch orders
    $orders = $user->orders()
        ->with(['items.product', 'items.varient', 'items.design', 'items.size'])
        ->get();

    // ✅ Fetch clusters
    $clusters = Cluster::with(['groups'])->get();

    // ✅ Fetch kitchen estimates where clientPhone == user->mobile
    $estimates = Estimate::where('clientPhone', $user->mobile)
        ->latest()
        ->get();

    // ✅ Get selected estimate ID from query or fallback
    $selectedEstimateId = $request->input('id'); // ✅ use query param instead
    $selectedEstimate = $selectedEstimateId
        ? Estimate::find($selectedEstimateId)
        : $estimates->first();

    if($selectedEstimate)
        $estimateData = $this->costService->calculateEstimateData($selectedEstimate);
    else $estimateData[0] = null;

    $costing = collect();
    $installation = 0;

    if ($selectedEstimate) {
        // Cabinets with hardware and cost
        $cabinets = Cabinet::with(['hard.material'])
            ->where('estimate_id', $selectedEstimate->id)
            ->get();

        $costing = $cabinets->map(function ($cabinet) {
            return [
                'id' => $cabinet->id,
                'name' => $cabinet->name,
                'size' => "{$cabinet->width} X {$cabinet->height}",
                'type' => $cabinet->type,
                'cost' => $cabinet->cost ?? 0,
                'hardware' => $cabinet->hard->map(function ($hard) {
                    return [
                        'name' => $hard->material->name ?? 'N/A',
                        'rate' => $hard->material->rate ?? 0,
                        'quantity' => $hard->quantity ?? 1,
                    ];
                }),
            ];
        });

        $installation = $selectedEstimate->installation_cost ?? 0;
    }

    // ✅ Materials, Addons, Cabinet Types
    $materials = Material::with('categories')->get();
    $addons = Addon::where('estimate_id', $selectedEstimate?->id)->get();
    $cabinetTypes = CabinetType::with(['materials.categories'])->get();

    // ✅ Material configuration
    $materialConfig = [
        'bodyMaterial' => $selectedEstimate->body_material ?? '',
        'bodyLaminate' => $selectedEstimate->body_laminate ?? '',
        'backMaterial' => $selectedEstimate->back_material ?? '',
        'backLaminate' => $selectedEstimate->back_laminate ?? '',
        'shutterMaterial' => $selectedEstimate->shutter_material ?? '',
        'shutterLaminate' => $selectedEstimate->shutter_laminate ?? '',
    ];

    // ✅ Send data to Inertia (User/Inner.jsx)
    return Inertia::render('User/Dashboard', [
        'userData' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'mobile' => $user->mobile,
            'profileImage' => $user->profile_photo_url ?? null,
        ],
        'ordersData' => $orders,
        'clusters' => $clusters,
        'estimates' => $estimates,
        'materials' => $materials,
        'cabinetTypes' => $cabinetTypes,

        'costing' => $estimateData[0],
            'installation' => $estimateData[1],
            'material' => $estimateData[2],
            'addons' => $estimateData[3],




    ]);
}

    public function location(Request $request) {
        $ip = $request->ip();
        $answer = $request->answer;
        $exists = Location::where('ip', $ip)->exists();

        if ($exists) {

        } else {
            Location::create([
                'ip' => $ip,
                'dehradun' => $answer
            ]);
        }
    }

     private function validateCaptcha($token){
    $secret = env('NOCAPTCHA_SECRET');

    $response = file_get_contents(
        "https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$token}"
    );

    $result = json_decode($response, true);

    return ($result['success'] ?? false) === true && ($result['score'] ?? 0) > 0.5;
    }

    public function saveKitchenEstimate(Request $request) {
        // ---------------------------
// 0. VERIFY GOOGLE reCAPTCHA
// ---------------------------


 if (! $this->validateCaptcha($request->recaptcha_token)) {
        return back()->withErrors(['captcha' => 'Captcha verification failed. Please try again.']);
    }

        // 1. Validation (Highly Recommended)
        $validated = $request->validate([
            'layout' => 'required|array',
            'layout.id' => 'required|string',
            'layout.label' => 'required|string',
            'layout.walls' => 'required|array',
            'layoutDimensions' => 'required|array',
            // Validate specific wall dimensions based on layout.walls if needed
            'layoutDimensions.wallA_ft' => 'required|numeric|min:5',
            'layoutDimensions.wallA_in' => 'required|numeric|min:0|max:11',
            'layoutDimensions.wallB_ft' => 'nullable|numeric|min:5',
            'layoutDimensions.wallB_in' => 'nullable|numeric|min:0|max:11',
            'layoutDimensions.wallC_ft' => 'nullable|numeric|min:5',
            'layoutDimensions.wallC_in' => 'nullable|numeric|min:0|max:11',
            'cabinetMaterial' => 'required|array',
            'cabinetMaterial.id' => 'required|string', // Or 'integer' if ID is numeric
            'cabinetMaterial.label' => 'required|string',
            'shutterMaterial' => 'required|array',
            'shutterMaterial.id' => 'required|string', // Or 'integer' if ID is numeric
            'shutterMaterial.label' => 'required|string',
            'contactInfo' => 'required|array',
            'contactInfo.name' => 'required|string|max:255',
            'contactInfo.phone' => 'required|string|max:20',
            'contactInfo.address' => 'required|string|max:500',
        ]);

        // 2. Access the Data
        $layout = $validated['layout'];
        $dimensions = $validated['layoutDimensions'];
        $cabinetMaterial = $validated['cabinetMaterial'];
        $shutterMaterial = $validated['shutterMaterial'];
        $contactInfo = $validated['contactInfo'];

        $estimate = $this->getKitchenEstimate($layout, $dimensions, $cabinetMaterial, $shutterMaterial, $contactInfo);
        $estimate = new Request($estimate);
    $createdEstimate = $this->costService->createEstimate($estimate, 'online');
        $currentEstimate = Estimate::find($createdEstimate->id);

        $estimateData = $this->costService->calculateEstimateData($currentEstimate);

    // ---------------------------
    // 6. Calculate Grand Total
    // ---------------------------
    $costing = $estimateData[0];
    $installation = $estimateData[1];

    $totalCabinet = collect($costing)->sum('cost');

    $totalHardware = collect($costing)->sum(function ($cab) {
        return collect($cab['hardware'])->sum(fn($h) =>
            ($h['rate'] ?? 0) * ($h['quantity'] ?? 1)
        );
    });

    $subtotal = $totalCabinet + $totalHardware + $installation;
    $gst = $subtotal * 0.18;
    $grandTotal = round($subtotal + $gst);

    // ---------------------------
    // 7. SEND EMAIL (React Email)
    // ---------------------------

    // Generate email using your ReactEmail component
    $html = ReactEmail::render("UserEstimateNotify", [
        "contact" => $contactInfo,
        "estimate" => $grandTotal
    ]);

    // Send it
    $email = new EmailService();
    $email->send(
        "amaltasfurniture@gmail.com",
        "User Checked Kitchen Estimate",
        $html
    );
    $cabinetsIncluded = collect($costing)->map(function ($cabinet) {
    return [
        'cabinet_name' => $cabinet['name'],
        'hardware' => collect($cabinet['hardware'])->map(function ($h) {
            return [
                'name' => $h['name'],
                'quantity' => $h['quantity'],
            ];
        })->values()->toArray(),
    ];
})->values()->toArray();

    $selectedMaterial = [
        $layout['label'], $cabinetMaterial['label'], $shutterMaterial['label'], $grandTotal, $cabinetsIncluded
    ];

        $clusters = Cluster::with(['groups'])->get();
        return Inertia::render('Category/KitchenEstimatePriceCard',
        [
            'costing' => $estimateData[0],
            'installation' => $estimateData[1],
            'clusters' => $clusters,
            'material' => $selectedMaterial,
        ]);
    }

    private function getKitchenEstimate($layout, $dimensions, $cabinetMaterial, $shutterMaterial, $contactInfo) {

        $estimate = [
        "clientName" => $contactInfo['name'],
        "clientPhone" => $contactInfo['phone'],
        "address" => $contactInfo['address'],
        "bodyMaterial" => $this->getMaterial('board', $cabinetMaterial['id']),
        "bodyLaminate" => $this->getMaterial('mica', $cabinetMaterial['id']),
        "backMaterial" => 49,
        "backLaminate" => null,
        "shutterMaterial" => $this->getMaterial('board', $shutterMaterial['id']),
        "shutterLaminate" => $this->getMaterial('mica', $shutterMaterial['id']),
        "lowerCabinets" => $this->getLowerCabinets($dimensions),
        "upperCabinets" => $this->getUpperCabinets($dimensions),
        "addOns" => $this->light

    ];
    return $estimate;

    }

    private function getMaterial($materialType, $cabinetMaterial) {
        [$boardId, $micaId] = explode('-', $cabinetMaterial);
        if($materialType == 'board') return $boardId;
        if($materialType == 'mica') {
            if($micaId > 0) return $micaId;
            else return null;
        }

    }

    private function getLowerCabinets($dimensions)
{
    $mm = $this->getMM($dimensions);

    if ($mm > 6000) {
        $this->tandumCabinet['width'] = 900;
        $this->sinkCabinet['width'] = 1100;
    }

    if ($mm < 3000) {

        $lowerCabinets = [
        $this->tandumCabinet,
        $this->bottlePullOut,
        $this->wireBasketDrawers,
        $this->sinkCabinet,
        ];

        return $lowerCabinets;
    }
    // Predefined lower cabinets
    $lowerCabinets = [
        $this->tandumCabinet,
        $this->bottlePullOut,
        $this->cornerCabinet,
        $this->wireBasketDrawers,
        $this->sinkCabinet,
    ];

    // Consumed width: 600 + 250 + 1070 + 600 + 700 = 3220 mm
    $consumedMM = 3220;

    $balanceMM = $mm - $consumedMM;

    // Each door cabinet = 300 mm
    $doorCabinetRequired = intdiv($balanceMM, 300);

    for ($i = 0; $i < $doorCabinetRequired; $i++) {
        $lowerCabinets[] = $this->doorCabinet;
    }

    return $lowerCabinets;
}


    private function getUpperCabinets($dimensions) {
        $mm = $this->getMM($dimensions);
        if ($mm > 6000) {
        $this->gtptCabinet['width'] = 900;
        $this->liftUpCabinet['width'] = 900;
        $this->chimneyCabinet['width'] = 900;
    }
        // minimum distance is 3048 mm so we are including
        $upperCabinets = [
            0 => $this->gtptCabinet,
            1 => $this->liftUpCabinet,
            2 => $this->profileDoorCabinet,
            3 => $this->profileDoorCabinet,
            4 => $this->chimneyCabinet,
        ];
        // till now we have consumned 700 + 600 + 600 + 600 + 600 = 3100.
        $balanceMM = $mm-3100;
        $doorCabinetRequired = intdiv($balanceMM, 300);
        for($i = 0; $i < $doorCabinetRequired; $i++) {
            $upperCabinets[] = $this->upperDoorCabinet;
        }

        return $upperCabinets;

    }

    private function getMM($dim) {
        $mm = 0;
        if($dim['wallA_ft']) $mm += $dim['wallA_ft'] * 12 * 25.4;
        if($dim['wallA_in']) $mm += $dim['wallA_in'] * 25.4;

        if(isset($dim['wallB_ft'])) $mm += $dim['wallB_ft'] * 12 * 25.4;
        if(isset($dim['wallB_in'])) $mm += $dim['wallB_in'] * 25.4;

        if(isset($dim['wallC_ft'])) $mm += $dim['wallC_ft'] * 12 * 25.4;
        if(isset($dim['wallC_in'])) $mm += $dim['wallC_in'] * 25.4;

        return $mm;
    }

    public function sendTestEmail()
{
     $html = ReactEmail::render("OrderUpdate", [
        "name" => "Vivek",
        "orderId" => "AM-101",
        "status" => "Processing"
    ]);

    $email = new EmailService();
    $response = $email->send("nift.vivek@gmail.com", "Order Update", $html);


}

protected $tandumCabinet = ['cabinet_type_id' => 15, 'width'=> 600, 'height'=> 700,
    'hardware'        => [
        ['id' => 22, 'qty' => 3],
        ['id' => 16, 'qty' => 1],
        ['id' => 17, 'qty' => 1],
        ['id' => 32, 'qty' => 2],
        ['id' => 33, 'qty' => 1],
        ['id' => 34, 'qty' => 3],
    ],
];

protected $bottlePullOut = [
    'cabinet_type_id' => 6,
    'width'           => 250,
    'height'          => 700,
    'hardware'        => [
        ['id' => 39, 'qty' => 1],
        ['id' => 22, 'qty' => 1],
    ],
];

protected $wireBasketDrawers = [
    'cabinet_type_id' => 11,
    'width'           => 600,
    'height'          => 700,
    'hardware'        => [
        ['id' => 29, 'qty' => 1],
        ['id' => 30, 'qty' => 1],
        ['id' => 22, 'qty' => 2],
        ['id' => 8,  'qty' => 2],
    ],
];

protected $cornerCabinet = [
    'cabinet_type_id' => 5,
    'width'           => 1070,
    'height'          => 700,
    'hardware'        => [
        ['id' => 34, 'qty' => 1],
        ['id' => 22, 'qty' => 1],
        ['id' => 12, 'qty' => 1],
    ],
];

protected $sinkCabinet = [
    'cabinet_type_id' => 9,
    'width'           => 700,
    'height'          => 700,
    'hardware'        => [
        ['id' => 22, 'qty' => 2],
        ['id' => 2,  'qty' => 2],
        ['id' => 35, 'qty' => 1],
    ],
];

protected $doorCabinet = [
    'cabinet_type_id' => 7,
    'width'           => 300,
    'height'          => 700,
    'hardware'        => [
        ['id' => 2,  'qty' => 1],
        ['id' => 22, 'qty' => 1],
        ['id' => 34, 'qty' => 1],
    ],
];

protected $liftUpCabinet = [
    'cabinet_type_id' => 13,
    'width'           => 600,
    'height'          => 600,
    'hardware'        => [
        ['id' => 43, 'qty' => 4],
        ['id' => 22, 'qty' => 1],
        ['id' => 34, 'qty' => 1],
        ['id' => 2,  'qty' => 2],
    ],
];

protected $chimneyCabinet = [
    'cabinet_type_id' => 12,
    'width'           => 600,
    'height'          => 600,
    'hardware'        => [
        ['id' => 35, 'qty' => 1],
    ],
];

protected $profileDoorCabinet = [
    'cabinet_type_id' => 2,
    'width'           => 600,
    'height'          => 600,
    'hardware'        => [
        ['id' => 34, 'qty' => 1],
        ['id' => 9,  'qty' => 1],
        ['id' => 2,  'qty' => 2],
    ],
];

protected $gtptCabinet = [
    'cabinet_type_id' => 7,
    'width'           => 700,
    'height'          => 600,
    'hardware'        => [
        ['id' => 2,  'qty' => 2],
        ['id' => 19, 'qty' => 1],
    ],
];

protected $upperDoorCabinet = [
    'cabinet_type_id' => 7,
    'width'           => 300,
    'height'          => 600,
    'hardware'        => [
        ['id' => 2,  'qty' => 1],
        ['id' => 34, 'qty' => 1],
    ],
];

protected $light = [
    [
        'id'          => 1765822236031,
        'itemName'    => 'Lights',
        'description' => 'Below the Cabinets',
        'amount'      => 5000,
    ],
];



}