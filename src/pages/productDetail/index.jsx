import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import Icon from '../../ui/Icon';
import './style.scss';
import BelovedSection from '../../components/productDetail/BelovedSection';
import { categoryActions } from '../../store/modules/categorySlice';
import ProductInfo from '../../components/productDetail/ProductInfo';
import NotesSection from '../../components/productDetail/NotesSection';
import { motion, useScroll, useSpring } from 'framer-motion';
import ProductImg from '../../components/productDetail/ProductImg';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { productData, loading, popularProducts } = useSelector((state) => state.product);
  const { addedToBag } = useSelector((state) => state.cart);
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
  }, [productId]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (loading) return <div>Loading . . . </div>;

  if (!options || options.length === 0) return <div>Product information not available</div>;

  return (
    <>
      <div className="flex mt-header-h min-h-screen">
        <div className=" w-1/2 h-[100vh] overflow-y-auto snap-y snap-mandatory scrollbar-hide">
          {options &&
            options[0].images.detail &&
            options[0].images.detail.map((img, idx) => <ProductImg key={idx} name={name} img={img} />)}
          <motion.div className="progress" style={{ scaleX }} />
        </div>

        <div className="w-1/2 text-body3 ">
          <div className="sticky top-0 right-0 flex flex-col gap-5 p-[9.3750vw] pt-20 tablet:px-6 tablet:py-10">
            <ProductInfo productData={productData} />
          </div>
        </div>
      </div>

      <div className="pl-[50px] overflow-hidden">
        {/* Notes section */}
        {(Array.isArray(notes) || Array.isArray(keyword)) && <NotesSection />}

        {/* Best seller section */}
        <BelovedSection popularProducts={popularProducts} />
      </div>

      <div
        className={`flex fixed bottom-[2rem] right-[11.25rem] justify-center items-center w-[37.0313rem] h-[3.625rem] bg-black text-white transition-all duration-300 ease-in opacity-0 z-0 ${addedToBag && 'opacity-100 z-10'}`}
      >
        <Icon name="keyboard_arrow_down" />
        ADDED TO BAG
      </div>
    </>
  );
};

export default ProductDetail;
