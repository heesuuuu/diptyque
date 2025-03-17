import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/modules/cartSlice';
import { BarButton } from '../../ui';
import CartItem from './CartItem';

const CartList = () => {
  const { localCartData, totalCartPrice, selectCartItem, totalSelectedPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartActions.totalCartAmount());
  }, []);

  const navigate = useNavigate();

  const handleCheckout = (e) => {
    if (!selectCartItem && localCartData.some((item) => !item.inStock)) {
      e.preventDefault();
      alert('선택한 상품 중 품절된 상품이 있습니다.');
    } else if (selectCartItem && localCartData.some((item) => item.selected && !item.inStock)) {
      e.preventDefault();
      alert('선택한 상품 중 품절된 상품이 있습니다.');
    } else {
      navigate('/payment');
    }
  };

  const priceStyle = 'flex flex-row justify-between w-full';

  return (
    <div className="mt-[80px] ">
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
          {localCartData.map((item) => (
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
            <div className="cart-checkout-btn" onClick={handleCheckout}>
              <BarButton text="PROCEED TO CHECKOUT" type="filled" className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
