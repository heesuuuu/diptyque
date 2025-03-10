import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../../store/modules/cartSlice';
import CartItem from './CartItem';

const CartList = () => {
  const { cartData, totalCartPrice, selectCartItem, totalSelectedPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <span onClick={() => dispatch(cartActions.toggleSelectCartItem())}>Select</span>
        <span>Remove Selected</span>
      </div>
      <div>
        <div className="cart-item-list">
          {cartData.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="cart-payment-info">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <span>{selectCartItem ? `€${totalSelectedPrice}` : `€${totalCartPrice}`}</span>
          </div>
          <div className="cart-shipping">
            <span>Shipping</span>
            <span>€100</span>
          </div>
          <div className="cart-total">
            <span>TOTAL</span>
            <span>{selectCartItem ? `€${totalSelectedPrice + 100}` : `€${totalCartPrice + 100}`}</span>
          </div>
          <button>
            <Link>PROCEED TO CHECKOUT</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartList;
