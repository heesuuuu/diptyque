import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/modules/cartSlice';
import { BarButton } from '../../ui';
import CartItem from './CartItem';

const CartList = () => {
  const { cartData, totalCartPrice, selectCartItem, totalSelectedPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartActions.totalCartAmount());
  }, []);

  const priceStyle = 'flex flex-row justify-between w-full';

  return (
    <>
      <div className="cart-select-btn flex flex-row gap-6 pb-10">
        <span className="cursor-pointer" onClick={() => dispatch(cartActions.toggleSelectCartItem())}>
          Select
        </span>
        <span
          className={` cursor-pointer ${selectCartItem ? '' : 'text-grey-2'}`}
          onClick={() => dispatch(cartActions.removeSelected())}
        >
          Remove Selected
        </span>
      </div>
      <div className="cart-item-list-wrap flex flex-row justify-between gap-[10vw]">
        <div className="cart-item-list flex flex-col gap-6 w-[65vw] max-w-[1004px]">
          {cartData.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="cart-payment-info w-[25vw] max-w-[422px] flex flex-col gap-[60px]">
          <div className="cart-sub-and-ship flex flex-col gap-4">
            <div className={`cart-subtotal ${priceStyle}`}>
              <span>Subtotal</span>
              <span>{selectCartItem ? `€${totalSelectedPrice}` : `€${totalCartPrice}`}</span>
            </div>
            <div className={`cart-shipping ${priceStyle}`}>
              <span>Shipping</span>
              <span>€100</span>
            </div>
          </div>
          <div className="cart-total-checkout flex flex-col gap-8">
            <div className={`cart-total ${priceStyle}`}>
              <span>TOTAL</span>
              <span>{selectCartItem ? `€${totalSelectedPrice + 100}` : `€${totalCartPrice + 100}`}</span>
            </div>
            <BarButton text="PROCEED TO CHECKOUT" type="filled" className="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartList;
