import React from 'react';
import { useSelector } from 'react-redux';
import CartEmpty from './CartEmpty';
import CartList from './CartList';
import './styles.scss';

const CartPage = () => {
  const { localCartData } = useSelector((state) => state.cart);

  return (
    <div className="cart-inner overflow-x-hidden">
      <div className="mt-[120px] text-heading1 font-diptyque">Shopping Bag</div>
      {localCartData.length > 0 ? <CartList /> : <CartEmpty />}
    </div>
  );
};

export default CartPage;
