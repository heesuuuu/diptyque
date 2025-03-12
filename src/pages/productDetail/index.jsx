import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import BarButton from '../../ui/BarButton';
import Icon from '../../ui/Icon';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { productData } = useSelector((state) => state.product);
  const { id, olfactory, name, type, notes, keyword, description, story, options, collection } = productData;
  console.log(productData);
  console.log('keyword type:', typeof keyword, keyword);
  console.log('notes type:', typeof notes, notes);
  console.log('olfactory type:', typeof olfactory, olfactory);

  useEffect(() => {
    dispatch(productActions.setProduct(Number(productId)));

    return () => {
      dispatch(productActions.resetProduct());
    };
  }, [productId]);

  // if (!productData) {
  //   return <div>Loading . . . </div>;
  // }

  // 안전한 렌더링 함수 추가
  const safeRender = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' || typeof value === 'number') return value;
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') return Object.values(value).join(', ');
    return String(value);
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/2">
          {options &&
            options[0].images.detail &&
            options[0].images.detail.map((img, idx) => (
              <img key={idx} src={img} alt={name} className="w-full h-auto" />
            ))}
        </div>
        <div className="sticky top-0 right-0 w-1/2">
          <h1>{name}</h1>
          <p>
            {type}
            <span>
              {options[0].size} ml | €{options[0].price}
            </span>
          </p>
          <hr />
          <p>
            {notes && safeRender(notes)}
            {keyword && safeRender(keyword)}
          </p>
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
