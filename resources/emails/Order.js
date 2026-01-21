import { render } from "@react-email/render";
import OrderUpdateEmail from "./OrderUpdateEmail.jsx";


const html = render(
  <OrderUpdateEmail
      name="Vivek"
      orderId="A-10234"
      status="In Progress"
  />
);
