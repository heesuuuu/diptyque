import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const CartList = () => {
  const { cartData, totalCartPrice, selectCartItem } = useSelector((state) => state.cart);
  return (
    <>
      <div>
        <span>Select</span>
        <span
          style={{
            opacity: selectCartItem ? 1 : 0,
            transition: 'all 0.3s ease',
            display: selectCartItem ? 'block' : 'none',
          }}
        >
          Remove Selected
        </span>
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
            <span>€{totalCartPrice}</span>
          </div>
          <div className="cart-shipping">
            <span>Shipping</span>
            <span>€100</span>
          </div>
          <div className="cart-total">
            <span>TOTAL</span>
            <span>€{totalCartPrice + 100}</span>
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
