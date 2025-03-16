import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import BelovedItem from './BelovedItem';
import BarButton from '../../ui/BarButton';
import { useDispatch } from 'react-redux';
import { productActions } from '../../store/modules/productSlice';

const BelovedSection = ({ popularProducts }) => {
  const dispatch = useDispatch();

  const addToBag = () => {
    dispatch(productActions.setIsAdded());
    setTimeout(() => {
      dispatch(productActions.resetIsAdded());
    }, 3000);
  };

  return (
    <div className="w-full mb-[12.5rem]">
      <h2 className="detail-sec-title">Our most beloved</h2>
      <Swiper slidesPerView={4.2} spaceBetween={30} freeMode={true} modules={[FreeMode]} className="mySwiper">
        {popularProducts.map((item) => (
          <SwiperSlide key={item.id} className="w-[27.3125rem] h-[40.125rem]">
            <BelovedItem item={item} />
            <div onClick={addToBag}>
              <BarButton type="filled" text="ADD TO BAG" className="mt-5" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BelovedSection;
