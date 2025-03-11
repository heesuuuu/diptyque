import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/modules/cartSlice';
import { Icon } from '../../ui';

const CartItem = ({ item }) => {
  const { id, name, type, options, quantity, engraving, totalPrice, selected } = item;
  const { selectCartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart-item-selectitem flex flex-row items-center">
      <div
        onClick={() => dispatch(cartActions.toggleSelected(id))}
        className={`checkbox transition-all duration-300 ease-in-out ${
          selectCartItem ? 'w-[24px] opacity-100 mr-6' : 'w-0 opacity-0 mr-0'
        }`}
      >
        {selected ? <Icon name="check_box" /> : <Icon name="check_box_outline_blank" />}
      </div>
      <div className="cart-item flex flex-row gap-6 w-full items-center h-full">
        <img src={options[0].images.thumbnail.default} alt={name} className="w-[200px]" />
        <div className="cart-item-wrap flex flex-col justify-between h-full w-full">
          <div className="cart-item-wrap-top flex flex-row justify-between">
            <div className="cart-item-info flex flex-col gap-2 h-full">
              <span className="text-heading2 font-diptyque">
                {name}-{type}
              </span>
              <span className="text-grey-4">{options[0].size}</span>
            </div>
            <div className="cursor-pointer" onClick={() => dispatch(cartActions.removeFromCart(item))}>
              Remove
            </div>
          </div>
          <div className="cart-item-wrap-bottom flex flex-row justify-between items-end">
            <div className="cart-item-custom flex flex-col gap-2">
              <div className="cart-item-engraving-wrap flex flex-row gap-5">
                <span>Engraving</span>
                {engraving ? (
                  <>
                    <span className="text-grey-4">{engraving}</span>
                    <div>Edit</div>
                  </>
                ) : (
                  <span>Engrave Your Scent</span>
                )}
              </div>
              <div className="cart-item-quantity flex flex-row gap-5">
                <span className="cursor-pointer text-grey-4 " onClick={() => dispatch(cartActions.reduceQuantity(id))}>
                  -
                </span>
                <span>{quantity}</span>
                <span className="cursor-pointer text-grey-4" onClick={() => dispatch(cartActions.addToCart(item))}>
                  +
                </span>
              </div>
            </div>
            <div>€{totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
