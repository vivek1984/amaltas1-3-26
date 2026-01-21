<?php

namespace App\Services;

use App\Models\CabinetType;
use App\Models\Estimate;
use App\Models\Material;

use Illuminate\Http\Request;
use Log;
class CabinetCostService
{
    /**
     * Create a new class instance.
     */
    public function createEstimate(Request $request, $type = 'offline') {

// 1. Create the main Estimate record
    $estimate = Estimate::create([
        'type'            => $type,
        'clientName'      => $request->clientName,
        'clientPhone'     => $request->clientPhone,
        'email'           => $request->email,
        'address'         => $request->address,
        'bodyMaterial'    => $request->bodyMaterial,
        'bodyLaminate'    => $request->bodyLaminate,
        'backMaterial'    => $request->backMaterial,
        'backLaminate'    => $request->backLaminate,
        'shutterMaterial' => $request->shutterMaterial,
        'shutterLaminate' => $request->shutterLaminate,
    ]);

    // Helper to save cabinets (Your Existing Code)
    $saveCabinets = function ($cabinets, $type) use ($estimate) {
        if (empty($cabinets)) return;

        foreach ($cabinets as $cabinet) {
            $cab = $estimate->cabinets()->create([
                'type'   => $type,
                'name'   => CabinetType::findOrFail( $cabinet['cabinet_type_id'])->name,
                'width'  => $cabinet['width'],
                'height' => $cabinet['height'],
            ]);

            if (!empty($cabinet['hardware'])) {
                foreach ($cabinet['hardware'] as $hardware) {
                    // Assuming 'hard' is the relationship name in your Cabinet model for hardware
                    $cab->hard()->create([
                        'hardware_id' => $hardware['id'],
                        'quantity'    => $hardware['qty'],
                    ]);
                }
            }
        }
    };

    // 2. Execute the Helper function for Cabinets 📦
    $saveCabinets($request->lowerCabinets, 'lower');
    $saveCabinets($request->upperCabinets, 'upper');

    // 3. Process and Save Add-Ons Data 💰
    if ($request->filled('addOns') && is_array($request->addOns)) {

        // Map frontend keys to database columns
        $addOnsToSave = collect($request->addOns)->map(function ($addOn) {
            return [
                // Frontend 'itemName' maps to backend 'item_name'
                'item_name'   => $addOn['itemName'],
                'description' => $addOn['description'] ?? null,
                'amount'      => $addOn['amount'],
            ];
        })->all();

        // Use the hasMany relationship to save all Addons linked to this Estimate
        $estimate->addons()->createMany($addOnsToSave);
    }
    return $estimate;
    }


     public function calculateEstimateData(Estimate $estimate) {

         $bodyMaterialName = null;
            $bodyLaminateName = null;
            $backMaterialName = null;
            $backLaminateName = null;
            $shutterMaterialName = null;
            $shutterLaminateName = null;

        //Cabinet Size
        $panel_area = 0;
        $back_area = 0;
        $shutter_area = 0;
        $boilo = 0;
        $costing = [];
        $cabinetWidth = 0;
        $cabinetHeight = 0;
        $cabinetType = null;



        $cabinets = $estimate->cabinets()->get();

        foreach($cabinets as $cabinet) {
            $costOfCabinet =0;
            if($cabinet->type == 'lower') {

                $boilo = ($cabinet->width * 600)/92903.04;

                $costOfCabinet += $boilo * 160 ;
                $panel_area = ($cabinet->width * 560 * 2 + $cabinet->height * 560 *2)/92903.04;


                //Top and bottom + Left & Right Side of the cabinet

                $back_area = ($cabinet->width * $cabinet->height)/92903.04;
                $shutter_area = $back_area;

                //edgeband in meter
                $costOfCabinet += ($cabinet->width  * 6 + $cabinet->height *6 + 560 * 4 )/1000 * 26;

                $cabinetWidth = $cabinet->width;
                $cabinetHeight = $cabinet->height;
                $cabinetType = $cabinet->type;
            }

            if($cabinet->type == 'upper') {
                $panel_area = ($cabinet->width * 300 * 2 + $cabinet->height * 300 *2)/645.16/144;
                $back_area = ($cabinet->width * $cabinet->height)/645.16/144;
                $shutter_area = $back_area + (100* $cabinet->width/645.16/144); //added scarting area
                //edgeband
                $costOfCabinet += ($cabinet->width  * 6 + $cabinet->height *6 + 300 * 4 )/1000 * 26;

                $cabinetWidth = $cabinet->width;
                $cabinetHeight = $cabinet->height;
                $cabinetType = $cabinet->type;

            }

            $hard_items = [];
            $hardwares = $cabinet->hard()->get();
            foreach($hardwares as $hardware) {
                $item = Material::findOrFail($hardware->hardware_id);
                if($item->rate == 1) {
                    $panel_area += $this->getAddionalCost($hardware->quantity, $item, $cabinetWidth, $cabinetHeight, $cabinetType);
                    $shutter_area += $this->getColorSideArea($hardware->quantity, $item, $cabinetWidth, $cabinetHeight, $cabinetType );
                }

                else
                $hard_items[] = ['name' =>$item->name, 'rate'=> $item->rate * 1.1, 'quantity' => $hardware->quantity];
            }



            $bodyMaterial = Material::findOrFail($estimate->bodyMaterial);

                $costOfCabinet += $panel_area * $bodyMaterial->rate;
                $bodyMaterialName = $bodyMaterial->name;
            if($estimate->bodyLaminate) {
            $bodyLaminate = Material::findOrFail($estimate->bodyLaminate);

                $costOfCabinet += ($panel_area  * $bodyLaminate->rate) * 2; //cost of laminate

                $costOfCabinet += $panel_area * 30; // cost of cutting pasting
                $bodyLaminateName = $bodyLaminate->name;
            }

            $backMaterial = Material::findOrFail($estimate->backMaterial);
                $costOfCabinet += $back_area * $backMaterial->rate;

                $backMaterialName = $backMaterial->name;
            if($estimate->backLaminate) {
            $backLaminate = Material::findOrFail($estimate->backLaminate);
                $costOfCabinet += ($back_area * ($backLaminate->rate))*2;
                $costOfCabinet += $back_area * 30;
                $backLaminateName = $backLaminate->name;
            }
            $shutterMaterial = Material::findOrFail($estimate->shutterMaterial);
                $costOfCabinet += $shutter_area * $shutterMaterial->rate;
                $shutterMaterialName = $shutterMaterial->name;
            $shutterLaminate = Material::findOrFail($estimate->shutterLaminate);
                $costOfCabinet += $shutter_area * 30; //cutting pasting labor
                $costOfCabinet += ($shutter_area * ($shutterLaminate->rate + 12)) * 2 ;

                $costOfCabinet = $costOfCabinet * 1.6; //wastage and profit margin
                $shutterLaminateName = $shutterLaminate->name;


            $costing[] = [
                'id' => $cabinet->id,
                'name' => $cabinet->name,
                'size' => $cabinet->width . ' X ' . $cabinet->height,
                'type' => $cabinet->type,
                'cost' => $costOfCabinet ,
                'hardware' => $hard_items
            ];

        }
        $installation = $this->getInstallationCost($costing);

        $material = [
            'bodyMaterial' => $bodyMaterialName,
            'bodyLaminate' => $bodyLaminateName,
            'backMaterial' => $backMaterialName,
            'backLaminate' => $backLaminateName,
            'shutterMaterial' => $shutterMaterialName,
            'shutterLaminate' => $shutterLaminateName
        ];
        $addons = $estimate->addons()->get();
        return [$costing, $installation, $material, $addons];

     }
      private function getInstallationCost(array $costings): float {

    $totalArea = 0.0; // Initialize a variable to hold the running total area

    foreach ($costings as $costing) {
        // 1. Get the size string, e.g., "500 X 700"
        $sizeString = $costing['size'];

        // 2. Explode the string by the delimiter ' X ' (ensure spaces are included)
        // This should result in an array like ['500', '700']
        $dimensions = explode(' X ', $sizeString);

        // 3. Validate that we have exactly two dimensions (width and height)
        if (count($dimensions) === 2) {
            // Remove any leading/trailing whitespace and convert to a number (float/int)
            $width = (float)trim($dimensions[0]);
            $height = (float)trim($dimensions[1]);

            // 4. Calculate the area of the current cabinet
            $cabinetArea = ($width * $height)/645.16/144;

            // 5. Add the current cabinet's area to the total area
            $totalArea += $cabinetArea;
        }

        // NOTE: You might add an 'else' here to log an error if the size format is incorrect.
    }

    // Return the calculated total area
    return $totalArea * 400;

    // If you need the final cost, you would multiply the totalArea by a rate here:
    // $ratePerSqUnit = 0.1;
    // return $totalArea * $ratePerSqUnit;
}


private function getAddionalCost($qty, $hardware, $width, $height, $type) {

    if($hardware->name == 'Slab') {

        if($type == 'lower') {

             $area =  ($width * 560)/92903.04 * $qty;

             return $area;

        }
        if($type == 'upper') {
            return ($width * 300)/92903.04 *  $qty;
        }
    }

    if($hardware->name ==    'Color') {
        if($type == 'lower')
         $area = ($height * 560)/92903.04 * $qty * -1;
        if($type == 'upper')
            return ($height * 300)/92903.04 * $qty * -1;

    }
    if($hardware->name == 'Drawer') {
        if($type == 'lower')
         $area = ($height * 560)/92903.04 * $qty * 2 +
                ($width * $height)/92903.04 * $qty * 2  +
                ($width * 560)/92903.04 * $qty;
    }
    else return 0;
}

private function getColorSideArea($qty, $hardware, $width, $height, $type) {
    if($hardware->name == 'Color') {
        if($type == 'lower')
         return ($height * 560)/92903.04 * $qty ;
        if($type == 'upper')
            return ($height * 300)/92903.04 * $qty ;

    }
    else return 0;
}

public function update(Request $request, $id) {
     $validated = $request->validate([
        'bodyMaterial'    => 'required|string|max:255',
        'bodyLaminate'    => 'nullable|string|max:255',
        'backMaterial'    => 'required|string|max:255',
        'backLaminate'    => 'nullable|string|max:255',
        'shutterMaterial' => 'required|string|max:255',
        'shutterLaminate' => 'nullable|string|max:255',
    ]);

    $estimate = Estimate::findOrFail($id);
    $estimate->bodyMaterial = Material::where('name', $validated['bodyMaterial'])->firstOrFail()->id;
    $estimate->backMaterial = Material::where('name', $validated['backMaterial'])->firstOrFail()->id;
    $estimate->shutterMaterial = Material::where('name', $validated['shutterMaterial'])->firstOrFail()->id;

    // For Laminate (nullable fields, need conditional lookup)
    $estimate->bodyLaminate = $this->resolveMaterialId($validated['bodyLaminate']);
    $estimate->backLaminate = $this->resolveMaterialId($validated['backLaminate']);
    $estimate->shutterLaminate = $this->resolveMaterialId($validated['shutterLaminate']);


    $estimate->save();
    return true;
}
protected function resolveMaterialId(?string $name): ?int
{
    if (is_null($name)) {
        return null;
    }
    // If a name is present, find its ID or fail
    return Material::where('name', $name)->firstOrFail()->id;
}

}
