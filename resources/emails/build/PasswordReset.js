import React from "react";
export default function PasswordReset(_ref) {
  var name = _ref.name,
    url = _ref.url;
  return /*#__PURE__*/React.createElement("html", null, /*#__PURE__*/React.createElement("body", {
    style: {
      background: "#f7f7f7",
      padding: "20px",
      fontFamily: "Arial"
    }
  }, /*#__PURE__*/React.createElement("table", {
    width: "100%",
    style: {
      maxWidth: "600px",
      margin: "0 auto",
      background: "#ffffff",
      padding: "20px",
      borderRadius: "8px"
    }
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "center",
      paddingBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: "#800000",
      margin: 0
    }
  }, "Reset Your Password"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#555",
      margin: 0
    }
  }, "Amaltas Furniture & Modular Kitchens"))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: "15px",
      color: "#444",
      lineHeight: "1.6"
    }
  }, "Hi ", /*#__PURE__*/React.createElement("strong", null, name), ",", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "You recently requested to reset your password.", /*#__PURE__*/React.createElement("br", null), "Click the button below to reset it.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: "center",
      padding: "20px 0"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: url,
    style: {
      background: "#800000",
      color: "#fff",
      padding: "14px 28px",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "16px"
    }
  }, "Reset Password"))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: "14px",
      color: "#666",
      lineHeight: "1.6"
    }
  }, "If you did not request a password reset, please ignore this email.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\xA9 ", new Date().getFullYear(), " Amaltas Furniture & Modular Kitchens")))));
}