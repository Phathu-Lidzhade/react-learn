import axios from "axios";
import OrdersGrid from "./OrdersGrid";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./OrdersPage.css";

function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get(
        "/api/orders?expand=products",
      );
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
      <title>Orders</title>

      <Header cart={cart} />

      <OrdersGrid orders={orders} />
    </>
  );
}

export default OrdersPage;
