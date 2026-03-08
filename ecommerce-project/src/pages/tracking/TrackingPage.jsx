import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Header from "../../components/Header";
import { useParams } from "react-router";
import "./TrackingPage.css";

function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };
    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let progressPercentage = (timePassedMs / totalDeliveryTimeMs) * 100;

  if (progressPercentage > 100) {
    progressPercentage = 100;
  }

  const isPreparing = progressPercentage < 33;
  const isShipped = progressPercentage >= 33 && progressPercentage < 100;
  const isDelivered = progressPercentage === 100;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />

      <title>Track Order</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">{progressPercentage === 100 ? "Delivered on" : "Arriving on"} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}</div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>Preparing</div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>Shipped</div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
