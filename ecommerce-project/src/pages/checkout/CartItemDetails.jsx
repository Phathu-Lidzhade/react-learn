import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";

function CartItemDetails({ cartItem, loadCart }) {
  const [ quantityUpdating, setQuantityUpdating ] = useState(false);
  const [ quantity, setQuantity ] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updatePressed = async () => {
    // Switch between true and false for quantityUpdating.
    if (quantityUpdating) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setQuantityUpdating(false);
    } else {
      setQuantityUpdating(true);
    }
  };

  const getQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const updateOnKeyDown = (event) => {
    if (event.key === "Enter") {
      updatePressed();
    } else if (event.key === "Escape") {
      setQuantity(cartItem.quantity);
      setQuantityUpdating(false);
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
            style={{opacity:quantityUpdating ? 1 : 0}}
            value={quantity}
            onChange={getQuantity}
            onKeyDown={updateOnKeyDown} />

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
