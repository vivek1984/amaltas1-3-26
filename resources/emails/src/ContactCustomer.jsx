import React from "react";

export default function ContactCustomer({ name }) {
  return (
    <html>
      <body style={{ backgroundColor: "#f7f7f7", padding: "20px", fontFamily: "Arial, Helvetica, sans-serif" }}>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "8px",
            padding: "24px",
            border: "1px solid #eee"
          }}
        >
          <tbody>
            <tr>
              <td style={{ textAlign: "center", paddingBottom: "10px" }}>
                <h2 style={{ color: "#800000", marginBottom: "4px" }}>Thank You for Contacting Us</h2>
                <p style={{ color: "#777", marginTop: "0" }}>We have received your message.</p>
              </td>
            </tr>

            <tr>
              <td style={{ padding: "10px 0", fontSize: "16px" }}>
                Hi <strong>{name}</strong>,
              </td>
            </tr>

            <tr>
              <td style={{ padding: "10px 0", fontSize: "15px", lineHeight: "1.6" }}>
                Thank you for reaching out to <strong>Amaltas Furniture & Modular Kitchens</strong>.
                <br /><br />
                Our team has received your message and will get back to you shortly.
              </td>
            </tr>

            <tr>
              <td style={{ padding: "20px 0", fontSize: "15px", lineHeight: "1.6" }}>
                Meanwhile, feel free to explore our website or contact us on WhatsApp for quick support.
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "center", paddingTop: "20px" }}>
                <a
                  href="https://wa.me/919368330915"
                  style={{
                    backgroundColor: "#800000",
                    color: "#fff",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "16px",
                    display: "inline-block"
                  }}
                >
                  Chat on WhatsApp
                </a>
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "center", paddingTop: "20px", fontSize: "13px", color: "#999", borderTop: "1px solid #eee" }}>
                © 2025 Amaltas Furniture & Modular Kitchens · GMS Road, Dehradun
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
