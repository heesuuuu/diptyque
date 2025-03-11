import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../../store/modules/cartSlice';
import { Icon } from '../../ui';

const CartItem = ({ item }) => {
  const { id, name, type, options, quantity, engraving, totalPrice, selected, inStock } = item;
  const { selectCartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const editRef = useRef();

  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(engraving);

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = () => {
    dispatch(cartActions.updateEngrave({ id, text }));
    setIsEdit(false);
  };

  useEffect(() => {
    if (isEdit && editRef.current) {
      editRef.current.focus();
    }
  }, [isEdit]);

  const handleEdit = () => {
    setIsEdit(true);
  };

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
        <Link to={`/product/${id}`} className="block w-[200px] h-auto flex-shrink-0">
          <img src={options[0].images.thumbnail.default} alt={name} className="w-full h-auto" />
        </Link>

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
            {inStock ? (
              <div className="cart-item-custom flex flex-col gap-2">
                <div className="cart-item-engraving-wrap flex flex-row">
                  <span className="mr-5">Engraving</span>

                  {!isEdit && engraving && <span className="text-grey-4 mr-5">{text}</span>}

                  <input
                    value={text}
                    onChange={onChange}
                    ref={editRef}
                    className={`transition-all ${isEdit ? 'w-auto mr-5' : 'w-0 mr-0'}`}
                  />

                  {isEdit ? (
                    <div onClick={onSubmit} className="cursor-pointer">
                      Save
                    </div>
                  ) : (
                    <div className="cursor-pointer" onClick={handleEdit}>
                      {engraving ? 'Edit' : 'Engrave Your Scent'}
                    </div>
                  )}
                </div>
                <div className="cart-item-quantity flex flex-row gap-5">
                  <span
                    className="cursor-pointer text-grey-4 "
                    onClick={() => dispatch(cartActions.reduceQuantity(id))}
                  >
                    -
                  </span>
                  <span>{quantity}</span>
                  <span className="cursor-pointer text-grey-4" onClick={() => dispatch(cartActions.addToCart(item))}>
                    +
                  </span>
                </div>
              </div>
            ) : (
              <p>Out of Stock</p>
            )}

            <div className={inStock ? '' : 'text-grey-2'}>€{totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
