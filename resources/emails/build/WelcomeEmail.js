import React from "react";
export default function WelcomeEmail(_ref) {
  var name = _ref.name,
    email = _ref.email,
    password = _ref.password;
  var containerStyle = {
    backgroundColor: "#f7f7f7",
    padding: "20px",
    fontFamily: "Arial, Helvetica, sans-serif"
  };
  var cardStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "8px",
    padding: "25px",
    border: "1px solid #eee"
  };
  var headerStyle = {
    textAlign: "center",
    marginBottom: "25px"
  };
  var buttonStyle = {
    backgroundColor: "#800000",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold"
  };
  var footerStyle = {
    marginTop: "30px",
    fontSize: "14px",
    color: "#666",
    borderTop: "1px solid #eee",
    paddingTop: "15px"
  };
  return /*#__PURE__*/React.createElement("html", null, /*#__PURE__*/React.createElement("body", {
    style: containerStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: headerStyle
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: "#800000",
      margin: 0
    }
  }, "Welcome to Amaltas Furniture & Modular Kitchens"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#555",
      marginTop: "5px"
    }
  }, "Your account has been created successfully")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "16px",
      color: "#444"
    }
  }, "Hi ", /*#__PURE__*/React.createElement("strong", null, name), ","), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "16px",
      color: "#444",
      lineHeight: "1.6"
    }
  }, "Your login details are given below. Use them to sign in to your account and access all your information."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fafafa",
      padding: "15px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      margin: "20px 0",
      fontSize: "15px",
      color: "#333"
    }
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Email:"), " ", email), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Password:"), " ", password)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "15px",
      color: "#555",
      lineHeight: "1.6"
    }
  }, "For security reasons, we recommend that you update your password as soon as possible."), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: "20px"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://amaltasfurniture.com/forgot-password",
    style: buttonStyle,
    target: "_blank"
  }, "Change Password")), /*#__PURE__*/React.createElement("div", {
    style: footerStyle
  }, /*#__PURE__*/React.createElement("p", null, "If you did not request this account, please contact us immediately."), /*#__PURE__*/React.createElement("p", null, "\xA9 ", new Date().getFullYear(), " Amaltas Furniture & Modular Kitchens")))));
}