import React from "react";

export default function WelcomeEmail({ name, email, password }) {
  const containerStyle = {
    backgroundColor: "#f7f7f7",
    padding: "20px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const cardStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "8px",
    padding: "25px",
    border: "1px solid #eee",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "25px",
  };

  const buttonStyle = {
    backgroundColor: "#800000",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const footerStyle = {
    marginTop: "30px",
    fontSize: "14px",
    color: "#666",
    borderTop: "1px solid #eee",
    paddingTop: "15px",
  };

  return (
    <html>
      <body style={containerStyle}>
        <div style={cardStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <h2 style={{ color: "#800000", margin: 0 }}>
              Welcome to Amaltas Furniture & Modular Kitchens
            </h2>
            <p style={{ color: "#555", marginTop: "5px" }}>
              Your account has been created successfully
            </p>
          </div>

          {/* Greeting */}
          <p style={{ fontSize: "16px", color: "#444" }}>
            Hi <strong>{name}</strong>,
          </p>

          <p style={{ fontSize: "16px", color: "#444", lineHeight: "1.6" }}>
            Your login details are given below. Use them to sign in to your
            account and access all your information.
          </p>

          {/* Credentials Box */}
          <div
            style={{
              background: "#fafafa",
              padding: "15px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              margin: "20px 0",
              fontSize: "15px",
              color: "#333",
            }}
          >
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Password:</strong> {password}
            </p>
          </div>

          {/* Instructions */}
          <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.6" }}>
            For security reasons, we recommend that you update your password as
            soon as possible.
          </p>

          {/* Change Password Button */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <a
              href="https://amaltasfurniture.com/forgot-password"
              style={buttonStyle}
              target="_blank"
            >
              Change Password
            </a>
          </div>

          {/* Footer */}
          <div style={footerStyle}>
            <p>
              If you did not request this account, please contact us
              immediately.
            </p>
            <p>© {new Date().getFullYear()} Amaltas Furniture & Modular Kitchens</p>
          </div>
        </div>
      </body>
    </html>
  );
}
