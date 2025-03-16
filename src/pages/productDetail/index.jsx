import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import Accordion from '../../ui/Accordion';
import BarButton from '../../ui/BarButton';
import CustomSelect from '../../ui/CustomSelect';
import Icon from '../../ui/Icon';
import './style.scss';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { productData, matchingNotesData, loading } = useSelector((state) => state.product);
  const { id, olfactory, name, type, notes, keyword, description, story, options, collection } = productData;

  const selectOptions = [
    { value: '', label: 'Select' },
    { value: 'classic', label: 'Classic (No Engraving)' },
    { value: 'engraving', label: 'Personalize Your Own Bottle (Custom Engraving)' },
  ];

  useEffect(() => {
    if (productId) {
      dispatch(productActions.setProduct(Number(productId)));

      return () => {
        dispatch(productActions.resetProduct());
      };
    }
  }, [dispatch, productId]);

  if (loading) return <div>Loading . . . </div>;

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
          <div className="sticky top-0 right-0 flex flex-col gap-5 p-[11.25rem] tablet:px-6 tablet:py-10">
            <h1 className="mb-0 text-left detail-sec-title ">{name}</h1>
            <div className="flex flex-col  gap-5 text-body3">
              <p className="flex justify-between items-center">
                {type}
                <span>
                  {options[0].size} {typeof options[0].size === 'number' && 'ml'} | €{options[0].price}
                </span>
              </p>
              <hr className="border-none h-[.0625rem] bg-darkgrey-3" />
              <p className="text-grey-4">
                {notes !== undefined &&
                  Array.isArray(notes) &&
                  notes.map((note, idx) => (notes.length - 1 === idx ? `${note.note}` : `${note.note}, `))}
                {notes !== undefined && typeof notes === 'string' && `${notes}`}
                {keyword !== undefined &&
                  Array.isArray(keyword) &&
                  keyword.map((word, idx) => (keyword.length - 1 === idx ? `${word.note}` : `${word.note}, `))}
                {keyword !== undefined && typeof keyword === 'string' && `${keyword}`}
              </p>
              <p className="text-darkgrey-1">{description}</p>
            </div>
            <div className="relative flex justify-between items-center">
              <p>Add Personalization</p>
              <CustomSelect
                options={selectOptions}
                defaultValue={''}
                onChange={(option) => console.log('Selected:', option)}
              />
            </div>
            <div>
              <Accordion title="Story" content={story} />
              <Accordion
                title="Ingredients"
                content="alcohol denat., parfum (fragrance), aqua (water), coumarin, linalool, ethylhexyl methoxycinnamate, alpha-isomethyl ionone, limonene, ethylhexyl salicylate, geraniol, butyl methoxydibenzoylmethane, cinnamyl alcohol, farnesol, citral"
              />
            </div>
            <BarButton type="filled" text="ADD TO BAG" />
            <div className="flex justify-center items-center bg-black text-white">
              <Icon name="keyboard_arrow_down" />
              ADDED TO BAG
            </div>
          </div>
        </div>
      </div>
      <div className="pl-[50px]">
        {(Array.isArray(notes) || Array.isArray(keyword)) && (
          <div className="w-full my-sec-gap-pc">
            <h2 className="detail-sec-title">Story of Our Blend</h2>
            {/* notes 최대개수 5개 : pc는 고정크기, tab,mobile은 swiper로 처리 */}
            <div className="flex gap-6 justify-center items-center">
              {matchingNotesData.map((data) => (
                <div key={data.noteId} className="w-[21.5625rem] h-[21.5625rem]">
                  <img src={data.img} alt={data.note} className="h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="w-full">
          <h2 className="detail-sec-title">Our most beloved</h2>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
