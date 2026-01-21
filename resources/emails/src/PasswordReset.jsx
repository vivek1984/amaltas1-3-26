import React from "react";

export default function PasswordReset({ name, url }) {
  return (
    <html>
      <body style={{ background: "#f7f7f7", padding: "20px", fontFamily: "Arial" }}>
        <table width="100%" style={{ maxWidth: "600px", margin: "0 auto", background: "#ffffff", padding: "20px", borderRadius: "8px" }}>
          <tr>
            <td style={{ textAlign: "center", paddingBottom: "10px" }}>
              <h2 style={{ color: "#800000", margin: 0 }}>Reset Your Password</h2>
              <p style={{ color: "#555", margin: 0 }}>Amaltas Furniture & Modular Kitchens</p>
            </td>
          </tr>

          <tr>
            <td style={{ fontSize: "15px", color: "#444", lineHeight: "1.6" }}>
              Hi <strong>{name}</strong>,
              <br /><br />
              You recently requested to reset your password.
              <br />
              Click the button below to reset it.
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: "center", padding: "20px 0" }}>
              <a
                href={url}
                style={{
                  background: "#800000",
                  color: "#fff",
                  padding: "14px 28px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "16px"
                }}
              >
                Reset Password
              </a>
            </td>
          </tr>

          <tr>
            <td style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
              If you did not request a password reset, please ignore this email.
              <br /><br />
              © {new Date().getFullYear()} Amaltas Furniture & Modular Kitchens
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}
