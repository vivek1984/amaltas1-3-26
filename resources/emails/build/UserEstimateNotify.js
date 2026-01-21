import * as React from "react";
export default function UserEstimateNotify(_ref) {
  var contact = _ref.contact,
    estimate = _ref.estimate;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Arial",
      padding: "20px"
    }
  }, /*#__PURE__*/React.createElement("h2", null, "User Viewed Kitchen Estimate"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Name:"), " ", contact.name), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Phone:"), " ", contact.phone), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Address:"), " ", contact.address), contact.email && /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Email:"), " ", contact.email), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Estimate Value (Incl GST):"), " \u20B9", estimate.toLocaleString("en-IN")), /*#__PURE__*/React.createElement("p", null, "This user has checked their estimate on your website."));
}