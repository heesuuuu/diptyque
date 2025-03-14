import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import BarButton from '../../ui/BarButton';
import Icon from '../../ui/Icon';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { productData, loading } = useSelector((state) => state.product);
  const { id, olfactory, name, type, notes, keyword, description, story, options, collection } = productData;

  useEffect(() => {
    if (productId) {
      // 데이터 요청
      dispatch(productActions.setProduct(Number(productId)));

      // 데이터가 로드되면 getProduct 액션 디스패치
      const checkDataTimer = setInterval(() => {
        if (productData && productData.id) {
          clearInterval(checkDataTimer);
          dispatch(productActions.getProduct());
        }
      }, 100);

      // 5초 타임아웃
      const timeoutId = setTimeout(() => {
        clearInterval(checkDataTimer);
        // console.log('Timeout reached, data may not be fully loaded');
      }, 5000);

      return () => {
        clearInterval(checkDataTimer);
        clearTimeout(timeoutId);
        dispatch(productActions.resetProduct());
      };
    }
  }, [dispatch, productId, productData.id]);

  // 안전한 렌더링 함수 추가
  const safeRender = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' || typeof value === 'number') return value;
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') return Object.values(value).join(', ');
    return String(value);
  };

  if (loading) return <div>Loading . . . </div>;

  return (
    <>
      <div className="flex mt-header-h">
        <div className="w-1/2">
          {options &&
            options[0].images.detail &&
            options[0].images.detail.map((img, idx) => (
              <img key={idx} src={img} alt={name} className="w-full h-auto" />
            ))}
        </div>
        <div className="w-1/2">
          <div className="sticky top-0 right-0">
            <h1>{name}</h1>
            <p>
              {type}
              <span>
                {options[0].size} {typeof options[0].size === 'number' && 'ml'} | €{options[0].price}
              </span>
            </p>
            <hr />
            <p>
              {/* {notes && safeRender(notes)} */}
              {Array.isArray(notes) &&
                notes.map((note, idx) => (notes.length - 1 === idx ? `${note.note}` : `${note.note}, `))}
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
      </div>
      <div className="pl-[3.125rem]">
        {Array.isArray(notes) && (
          <div className="w-full my-sec-gap-pc">
            <h2 className="text-center">Story of Our Blend</h2>
            <div className="h-80 bg-black">
              <div>{/* <img src="" alt="" /> */}</div>
            </div>
          </div>
        )}
        <div className="w-full">
          <h2 className="text-center">Our most beloved</h2>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
