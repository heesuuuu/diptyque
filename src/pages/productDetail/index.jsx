import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import BarButton from '../../ui/BarButton';
import Icon from '../../ui/Icon';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { productData, matchingNotesData, loading } = useSelector((state) => state.product);
  const { id, olfactory, name, type, notes, keyword, description, story, options, collection } = productData;

  useEffect(() => {
    if (productId) {
      dispatch(productActions.setProduct(Number(productId)));

      return () => {
        dispatch(productActions.resetProduct());
      };
    }
  }, [dispatch, productId]);

  // 안전한 렌더링 함수 추가
  // const safeRender = (value) => {
  //   if (value === null || value === undefined) return '';
  //   if (typeof value === 'string' || typeof value === 'number') return value;
  //   if (Array.isArray(value)) return value.join(', ');
  //   if (typeof value === 'object') return Object.values(value).join(', ');
  //   return String(value);
  // };

  if (loading) return <div>Loading . . . </div>;

  // 옵션이 없는 경우 처리
  if (!options || options.length === 0) return <div>Product information not available</div>;

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
              {`${type} `}
              <span>
                {options[0].size} {typeof options[0].size === 'number' && 'ml'} | €{options[0].price}
              </span>
            </p>
            <hr />
            <p>
              {notes !== undefined &&
                Array.isArray(notes) &&
                notes.map((note, idx) => (notes.length - 1 === idx ? `${note.note}` : `${note.note}, `))}
              {notes !== undefined && typeof notes === 'string' && `${notes}`}
              {keyword !== undefined &&
                Array.isArray(keyword) &&
                keyword.map((word, idx) => (keyword.length - 1 === idx ? `${word.note}` : `${word.note}, `))}
              {keyword !== undefined && typeof keyword === 'string' && `${keyword}`}
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
        {(Array.isArray(notes) || Array.isArray(keyword)) && (
          <div className="w-full my-sec-gap-pc">
            <h2 className="text-center">Story of Our Blend</h2>
            {/* notes 최대개수 5개 : pc는 고정크기, tab,mobile은 swiper로 처리 */}
            <div className="flex gap-6 justify-center items-center bg-black">
              {matchingNotesData.map((data) => (
                <div key={data.noteId} className="w-[345px] h-[345px]">
                  <img src={data.img} alt={data.note} className="h-full object-cover" />
                </div>
              ))}
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
