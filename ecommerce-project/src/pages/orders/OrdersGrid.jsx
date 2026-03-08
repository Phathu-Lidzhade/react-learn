import OrderHeader from "./OrderHeader";
import OrderDetailsGrid from "./OrderDetailsGrid";

function OrdersGrid({ orders }) {
  return(
    <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <OrderHeader order={order} />

                <OrderDetailsGrid order={order} />
              </div>
            );
          })}
        </div>
      </div>
  );
}

export default OrdersGrid;