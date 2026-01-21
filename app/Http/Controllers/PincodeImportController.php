<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel; // Import the Excel facade
use App\Imports\PincodesImport; // Import your PincodesImport class
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class PincodeImportController extends Controller
{
    /**
     * Display the file upload form.
     *
     * @return \Inertia\Response
     */
    public function showImportForm()
    {
        return Inertia::render('PincodeImport');
    }

    /**
     * Handle the file upload and import process.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function import(Request $request)
    {
        // 1. Validate the uploaded file
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv|max:20480', // Max 20MB
        ], [
            'file.required' => 'Please select an Excel or CSV file to upload.',
            'file.mimes' => 'The uploaded file must be an Excel (xlsx, xls) or CSV file.',
            'file.max' => 'The file size must not exceed 20MB.',
        ]);

        try {
            // 2. Get the uploaded file
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();

            Log::info("Attempting to import file: {$fileName}");

            // 3. Import the file using your PincodesImport class
            // The import method will handle reading, batching, and upserting.
            Excel::import(new PincodesImport, $file);

            Log::info("File '{$fileName}' imported successfully.");

            // 4. Redirect with a success message
            return Redirect::back()->with('success', "Pincodes from '{$fileName}' imported successfully!");

        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
            // Handle validation errors that occur during the import process (e.g., if a row fails validation)
            $failures = $e->failures();
            $errorMessages = [];
            foreach ($failures as $failure) {
                $errorMessages[] = "Row " . $failure->row() . ": " . implode(', ', $failure->errors());
            }
            Log::error("Import validation failed for file: {$fileName}", ['failures' => $errorMessages]);
            return Redirect::back()->withErrors(['file' => 'Import failed due to data validation errors. See logs for details.'])->with('error', 'Import failed due to data validation errors.');

        } catch (\Exception $e) {
            // Handle other general exceptions during import
            Log::error("Error importing file '{$fileName}': " . $e->getMessage(), ['exception' => $e]);
            return Redirect::back()->with('error', 'An error occurred during import: ' . $e->getMessage());
        }
    }
}
