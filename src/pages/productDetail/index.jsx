import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
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
      <div>
        {/* <img src={options[0].images.thumbnail.default} alt={name} />
        <img src={options[0].images.thumbnail.hover} alt={name} /> */}
        {options[0].images.detail.map((img, idx) => (
          <img key={idx} src={img} alt={name} />
        ))}
      </div>
      <div>
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
      </div>
    </>
  );
};

export default ProductDetail;
