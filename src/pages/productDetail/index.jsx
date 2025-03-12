import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import BarButton from '../../ui/BarButton';
import Icon from '../../ui/Icon';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { categoryName, productId } = useParams();
  const { productData } = useSelector((state) => state.product);
  const { id, olfactory, name, type, notes, description, story, options, collection } = productData;

  useEffect(() => {
    dispatch(productActions.setProduct(Number(productId)));

    return () => {
      dispatch(productActions.resetProduct());
    };
  }, []);

  if (!productData | !productData.options) {
    return <div>Loading . . . </div>;
  }

  return (
    <>
      <div className="flex">
        <div className="w-1/2">
          {options[0].images.detail.map((img, idx) => (
            <img key={idx} src={img} alt={name} className="w-full h-auto" />
          ))}
        </div>
        <div className="fixed top-0 right-0 w-1/2">
          <h1>{name}</h1>
          <p>
            {type}
            <span>
              {options[0].size} ml | €{options[0].price}
            </span>
          </p>
          <hr />
          <p>{notes.map((note, idx) => (idx !== notes.length - 1 ? note + ', ' : note))}</p>
          <p>{description}</p>
          <div>
            <label htmlFor="selectOption">Add Personalization</label>
            <select name="selectOption" id="selectOption">
              <option value="">select</option>
              <option value=""></option>
              <option value=""></option>
            </select>
          </div>
          <div>
            <p>
              Story
              <Icon name="keyboard_arrow_down" />
            </p>
            <p>
              Ingredients
              <Icon name="keyboard_arrow_down" />
            </p>
          </div>
          <BarButton type="filled" text="ADD TO BAG" />
          <div className="flex justify-center items-center bg-black text-white">
            <Icon name="keyboard_arrow_down" />
            ADDED TO BAG
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
