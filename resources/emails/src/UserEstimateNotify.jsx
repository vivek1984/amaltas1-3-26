import * as React from "react";

export default function UserEstimateNotify({ contact, estimate }) {
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>User Viewed Kitchen Estimate</h2>

      <p><strong>Name:</strong> {contact.name}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Address:</strong> {contact.address}</p>

      {contact.email && (
        <p><strong>Email:</strong> {contact.email}</p>
      )}

      <hr />

      <p>
        <strong>Estimate Value (Incl GST):</strong> ₹{estimate.toLocaleString("en-IN")}
      </p>

      <p>This user has checked their estimate on your website.</p>
    </div>
  );
}
