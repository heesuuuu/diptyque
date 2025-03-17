import { Link } from 'react-router-dom';
import BarButton from '../../ui/BarButton';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/modules/cartSlice';

const BelovedItem = ({ item }) => {
  const dispatch = useDispatch();
  const { cartLoading } = useSelector((state) => state.cart);
  const { id, name, options, type } = item;
  const price = options[0].price;
  const thumbImg = options[0].images.thumbnail.default;
  const hoverImg = options[0].images.thumbnail.hover;

  const addToBag = () => {
    if (cartLoading) {
      alert('Processing your previous request. Please hold for a moment.');
      return;
    } else {
      dispatch(cartActions.addToCart(item));
    }
  };

  return (
    <>
      <Link
        to={`/product/detail/${id}`}
        className="relative flex flex-col justify-between gap-[0.625rem] cursor-pointer group"
      >
        <img
          className="object-cover w-full h-[31.5rem] group-hover:opacity-0 transition-all ease-in-out duration-700"
          src={thumbImg}
          alt={name}
        />
        <img
          className="absolute object-cover opacity-0 w-full h-[31.5rem] group-hover:opacity-100 transition-all ease-in-out duration-700"
          src={hoverImg}
          alt={name}
        />
        <h2 className="text-heading3/[160%] mt-[.375rem]">{name}</h2>
        <p className="flex justify-between text-body3/[150%]">
          {type}
          <span className="ml-auto">
            {options[0].size} | €{price}
          </span>
        </p>
      </Link>

      <div onClick={addToBag}>
        <BarButton type="filled" text="ADD TO BAG" className="mt-5" />
      </div>
    </>
  );
};

export default BelovedItem;
