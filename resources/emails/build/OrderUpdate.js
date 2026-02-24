import React from "react";
export default function OrderUpdate(_ref) {
  var name = _ref.name,
    orderId = _ref.orderId,
    status = _ref.status;
  return /*#__PURE__*/React.createElement("html", null, /*#__PURE__*/React.createElement("body", null, /*#__PURE__*/React.createElement("h1", null, "Order Update for ", name), /*#__PURE__*/React.createElement("p", null, "Your order #", orderId, " is now: ", status)));
}

//npx babel resources/emails/src --out-dir resources/emails/build --extensions ".jsx"