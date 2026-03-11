import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";

function CartItemDetails({ cartItem, loadCart }) {
  const [ quantityUpdated, setQuantityUpdated ] = useState(false);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updatePressed = () => {
    // Switch between true and false for quantityUpdated.
    if (quantityUpdated) {
      setQuantityUpdated(false);
    } else {
      setQuantityUpdated(true);
    }
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            <input type="text" className="update-quantity"
            style={{opacity:quantityUpdated ? 1 : 0}} />
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary"
          onClick={updatePressed}
          >Update</span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}

export default CartItemDetails;
