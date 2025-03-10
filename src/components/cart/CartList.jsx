import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const CartList = () => {
  const { cartData, totalCartPrice } = useSelector((state) => state.cart);
  return (
    <>
      <div>
        {cartData.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div>
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
    </>
  );
};

export default CartList;
