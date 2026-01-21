import React from "react";


export default function OrderUpdate({ name, orderId, status }) {
  return (
    <html>
      <body>
        <h1>Order Update for {name}</h1>
        <p>Your order #{orderId} is now: {status}</p>
      </body>
    </html>
  );
}

//npx babel resources/emails/src --out-dir resources/emails/build --extensions ".jsx"
