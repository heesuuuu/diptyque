import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import Icon from '../../ui/Icon';
import './style.scss';
import BelovedSection from '../../components/productDetail/BelovedSection';
import { categoryActions } from '../../store/modules/categorySlice';
import ProductInfo from '../../components/productDetail/ProductInfo';
import NotesSection from '../../components/productDetail/NotesSection';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { productData, loading, popularProducts } = useSelector((state) => state.product);
  const { cartLoading } = useSelector((state) => state.cart);
  const { name, notes, keyword, options } = productData;

  useEffect(() => {
    if (productId) {
      dispatch(productActions.getProduct(Number(productId)));
      dispatch(productActions.getPopularProducts(Number(productId)));
    }

    return () => {
      dispatch(categoryActions.resetCategory());
      dispatch(productActions.resetProduct());
    };
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

        <div className="w-1/2 text-body3">
          <div className="sticky top-0 right-0 flex flex-col gap-5 p-[11.25rem] tablet:px-6 tablet:py-10">
            <ProductInfo productData={productData} />
          </div>
        </div>
      </div>

      <div className="pl-[50px]">
        {/* Notes section */}
        {(Array.isArray(notes) || Array.isArray(keyword)) && <NotesSection />}

        {/* Best seller section */}
        <BelovedSection popularProducts={popularProducts} />
      </div>

      <div
        className={`fixed bottom-[2rem] right-[11.25rem] flex justify-center items-center w-[37.0313rem] h-[3.625rem] bg-black text-white z-10 transition-all duration-300 ease-in opacity-0 ${cartLoading && 'opacity-100'}`}
      >
        <Icon name="keyboard_arrow_down" />
        ADDED TO BAG
      </div>
    </>
  );
};

export default ProductDetail;
