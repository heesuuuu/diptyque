import React from 'react';
import { useSelector } from 'react-redux';
import CartEmpty from './CartEmpty';
import CartList from './CartList';

const CartPage = () => {
  const { cartData } = useSelector((state) => state.cart);
  return (
    <div>
      <p>Shopping Bag</p>
      {cartData.length > 0 ? <CartList /> : <CartEmpty />}
    </div>
  );
};

export default CartPage;
