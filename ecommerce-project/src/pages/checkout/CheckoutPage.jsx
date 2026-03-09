import axios from "axios";
import { useEffect, useState } from "react";
import CheckoutHeader from "./CheckoutHeader";
import OrderSummary from "./orderSummary";
import PaymentSummary from "./PaymentSummary";
import "./CheckoutPage.css";

function CheckoutPage( { cart, loadCart } ) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
        setDeliveryOptions(response.data);
    };
    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentData = async () => {

      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    };
    fetchPaymentData();
  }, [cart]);

  window.axios = axios;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
