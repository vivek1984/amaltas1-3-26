<?php

namespace App\Services;

use Illuminate\Support\Facades\Log; // If you want to keep logging in the service

class DistanceCalculatorService
{
    /**
     * Haversine formula to calculate the great-circle distance between two points
     * on a sphere given their longitudes and latitudes.
     *
     * @param float $latitudeFrom Latitude of start point in degrees
     * @param float $longitudeFrom Longitude of start point in degrees
     * @param float $latitudeTo Latitude of end point in degrees
     * @param float $longitudeTo Longitude of end point in degrees
     * @param int $earthRadius Radius of earth in kilometers (default 6371)
     * @return float Distance in kilometers
     */
    public function calculateDistance(
        $latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371
    ) {
        $latFrom = deg2rad($latitudeFrom);
        $lonFrom = deg2rad($longitudeFrom);
        $latTo = deg2rad($latitudeTo);
        $lonTo = deg2rad($longitudeTo);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
        return $angle * $earthRadius;
    }

    /**
     * Retrieves geographic coordinates for a given pincode.
     * In a real application, this data would come from a database or an external API.
     *
     * @param string $pincode
     * @return array|null ['latitude' => float, 'longitude' => float]
     */
    public function getCoordinatesForPincode(string $pincode): ?array
    {
        // This data would typically come from a database or a third-party API
        $pincodeCoordinates = [
            '248001' => ['latitude' => 30.3165, 'longitude' => 78.0322], // Dehradun, Uttarakhand
            '110001' => ['latitude' => 28.6139, 'longitude' => 77.2090], // New Delhi, Delhi
            '400001' => ['latitude' => 19.0760, 'longitude' => 72.8777], // Mumbai, Maharashtra
            '560001' => ['latitude' => 12.9716, 'longitude' => 77.5946], // Bengaluru, Karnataka
            '700001' => ['latitude' => 22.5726, 'longitude' => 88.3639], // Kolkata, West Bengal
            '600001' => ['latitude' => 13.0827, 'longitude' => 80.2707], // Chennai, Tamil Nadu
            '302001' => ['latitude' => 26.9124, 'longitude' => 75.7873], // Jaipur, Rajasthan
            '380001' => ['latitude' => 23.0225, 'longitude' => 72.5714], // Ahmedabad, Gujarat
        ];

        return $pincodeCoordinates[$pincode] ?? null;
    }

    /**
     * Calculates the distance between two pincodes.
     *
     * @param string $pincode1
     * @param string $pincode2
     * @return float|null Distance in kilometers, or null if coordinates not found.
     */
    public function getDistanceBetweenPincodes(string $pincode1, string $pincode2): ?float
    {
        $coords1 = $this->getCoordinatesForPincode($pincode1);
        $coords2 = $this->getCoordinatesForPincode($pincode2);

        if (!$coords1 || !$coords2) {
            Log::warning("Could not find coordinates for one or both pincodes: {$pincode1}, {$pincode2}");
            return null;
        }

        return $this->calculateDistance(
            $coords1['latitude'], $coords1['longitude'],
            $coords2['latitude'], $coords2['longitude']
        );
    }
}
