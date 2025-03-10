import React from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/modules/cartSlice';

const CartItem = ({ item }) => {
  const { id, name, type, options, quantity, engraving, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      {/* <img src="" alt="" /> */}
      <div className="cart-item-wrap-top">
        <div className="cart-item-info">
          <p>
            {name}-{type}
          </p>
          <p>{options[0].size}</p>
        </div>
        <div onClick={() => dispatch(cartActions.removeFromCart(item))}>Remove</div>
      </div>
      <div className="cart-item-wrap-bottom">
        <div className="cart-item-custom">
          <div className="cart-item-engraving-wrap">
            <p>Engraving</p>
            {engraving ? (
              <>
                <p>{engraving}</p>
                <div>Edit</div>
              </>
            ) : (
              <p>Engrave Your Scent</p>
            )}
          </div>
          <div className="cart-item-quantity">
            <span onClick={() => dispatch(cartActions.reduceQuantity(id))}>-</span>
            <span>{quantity}</span>
            <span onClick={() => dispatch(cartActions.addToCart(item))}>+</span>
          </div>
        </div>
        <span>€{totalPrice}</span>
      </div>
    </div>
  );
};

export default CartItem;
