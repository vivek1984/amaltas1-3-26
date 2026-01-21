<?php

namespace App\Imports;

use App\Models\Pincode;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow; // To map columns by header name
use Maatwebsite\Excel\Concerns\WithBatchInserts; // For performance (batch insert)
use Maatwebsite\Excel\Concerns\WithChunkReading; // For performance (chunk reading)
use Maatwebsite\Excel\Concerns\WithUpserts; // To update existing records instead of failing on duplicates

class PincodesImport implements ToModel, WithHeadingRow, WithBatchInserts, WithChunkReading, WithUpserts
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {

        // IMPORTANT: The keys in $row[] now EXACTLY MATCH the headers from your hh.csv file
        // as shown in your dd($row) output.
        return new Pincode([
            'pincode' => $row['pincode'], // Corrected: 'pincode' (lowercase 'p')
            'office_name' => $row['officename'] ?? null, // Corrected: 'officename'
            'delivery_status' => $row['delivery'] ?? null, // Corrected: 'delivery'
            'division_name' => $row['divisionname'] ?? null, // Corrected: 'divisionname'
            'region_name' => $row['regionname'] ?? null, // Corrected: 'regionname'
            'circle_name' => $row['circlename'] ?? null, // Corrected: 'circlename'
            'delivery' => $row['delivery'] ?? null, // Assuming 'taluk' exists, if not, it will be null
            'district' => $row['district'] ?? null,
            'officetype' => $row['office_type'] ?? null,
            'state_name' => $row['statename'] ?? null, // Corrected: 'statename'
            'latitude' => $row['latitude'] ?? null,
            'longitude' => $row['longitude'] ?? null,
        ]);
    }

    /**
     * Define the column to use for upserting (updating existing records).
     * This should be a unique column in your database.
     *
     * @return string|array
     */
    public function uniqueBy()
    {
        return 'pincode'; // Use 'pincode' column to identify unique records for update
    }


    /**
     * Define the batch size for inserts.
     * Higher values can improve performance but use more memory.
     *
     * @return int
     */
    public function batchSize(): int
    {
        return 1000; // Insert 1000 records at a time
    }

    /**
     * Define the chunk size for reading the file.
     * Higher values can improve performance but use more memory.
     *
     * @return int
     */
    public function chunkSize(): int
    {
        return 1000; // Read 1000 rows at a time
    }
}
