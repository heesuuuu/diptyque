import React from 'react';
import { useSelector } from 'react-redux';
import CartEmpty from './CartEmpty';
import CartList from './CartList';
import './styles.scss';

const CartPage = () => {
  const { cartData } = useSelector((state) => state.cart);
  return (
    <div className="cart-inner">
      <div className="pb-[80px] text-heading1 font-diptyque">Shopping Bag</div>
      {cartData.length > 0 ? <CartList /> : <CartEmpty />}
    </div>
  );
};

export default CartPage;
