import React from "react";
import { Head } from "@inertiajs/react";
import Welcome from "../Welcome";
import KitchenEstimatePriceCard from "./KitchenEstimatePriceCard";

export default function UserEstimate({ costing = [], installation = 0, clusters, material }) {
console.log(material);
  // Calculate hardware cost
  const calcHardwareCost = (hardware) =>
    Array.isArray(hardware)
      ? hardware.reduce(
          (sum, h) => sum + (Number(h.rate) || 0) * (Number(h.quantity) || 1),
          0
        )
      : 0;

  // Totals
  const totalCabinets = costing.reduce((t, c) => t + (Number(c.cost) || 0), 0);
  const totalHardware = costing.reduce((t, c) => t + calcHardwareCost(c.hardware), 0);
  const installationCost = Number(installation) || 0;

  const subtotal = totalCabinets + totalHardware + installationCost;
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  return (
    <Welcome clusters={clusters}>
      <Head>
        <title>Your Kitchen Estimate | Amaltas Furniture Studio</title>
      </Head>

      <div className="max-w-4xl mx-auto p-6 bg-gray-50">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Your Kitchen Estimate</h1>
          <p className="text-gray-600 mt-2">
            This is a summary of your customized kitchen estimate.
          </p>
        </div>

        {/* Cabinet Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10 border">
          <h2 className="text-xl font-semibold mb-4">Cabinet Summary</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Cabinet</th>
                  <th className="border px-4 py-2 text-left">Size</th>
                  <th className="border px-4 py-2 text-right">Cabinet Cost</th>
                  <th className="border px-4 py-2 text-right">Hardware Cost</th>
                </tr>
              </thead>

              <tbody>
                {costing.length === 0 && (
                  <tr>
                    <td colSpan="4" className="border px-4 py-6 text-center text-gray-500">
                      No estimate found.
                    </td>
                  </tr>
                )}

                {costing.map((cab) => {
                  const hardwareTotal = calcHardwareCost(cab.hardware);

                  return (
                    <tr key={cab.id}>
                      <td className="border px-4 py-2">{cab.name}</td>
                      <td className="border px-4 py-2">{cab.size}</td>
                      <td className="border px-4 py-2 text-right font-medium">
                        ₹{Math.round(cab.cost).toLocaleString("en-IN")}
                      </td>
                      <td className="border px-4 py-2 text-right font-medium">
                        ₹{Math.round(hardwareTotal).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </div>

        {/* Final Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 border max-w-md ml-auto">
          <h2 className="text-xl font-semibold mb-4">Final Summary</h2>

          <div className="space-y-2 text-gray-700">

            <div className="flex justify-between border-b pb-1">
              <span>Cabinet Cost</span>
              <span>₹{Math.round(totalCabinets).toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between border-b pb-1">
              <span>Hardware Cost</span>
              <span>₹{Math.round(totalHardware).toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between border-b pb-1">
              <span>Installation</span>
              <span>₹{Math.round(installationCost).toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between font-semibold text-gray-900 pt-2">
              <span>Total Before GST</span>
              <span>₹{Math.round(subtotal).toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>GST (18%)</span>
              <span>₹{Math.round(gst).toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between text-2xl font-extrabold text-green-700 mt-4">
              <span>Grand Total</span>
              <span>₹{Math.round(grandTotal).toLocaleString("en-IN")}</span>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-10 bg-white border rounded-lg shadow-md p-6 text-gray-700 text-md space-y-4">

  <h3 className="text-xl font-semibold text-gray-900">Important Notes</h3>

  <ol className="list-decimal list-inside space-y-2">
    <li>
      To save this estimate, please register or log in using the same mobile number on our website.
    </li>
    <li>
      This estimate is indicative and may vary based on final site measurements and material selections.
    </li>
  </ol>
    <KitchenEstimatePriceCard subtotal={material[3]} gst={1800} total={11800} material={material} />
  {/* CTA Button */}
  <div className="pt-4 text-center">
    <a
      href="/login"
      className="inline-block bg-[#800000] text-white px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-[#6d0000] transition"
    >
      Register / Login to Save Estimate
    </a>
  </div>

</div>


      </div>
    </Welcome>
  );
}
