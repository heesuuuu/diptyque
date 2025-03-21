import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import BelovedItem from './BelovedItem';

const BelovedSection = ({ popularProducts }) => {
  return (
    <div className="w-full mb-[12.5rem]">
      <h2 className="detail-sec-title">Our most beloved</h2>
      <Swiper slidesPerView={4.2} spaceBetween={30} freeMode={true} modules={[FreeMode]} className="mySwiper z-0">
        {popularProducts.map((item) => (
          <SwiperSlide key={item.id} className="w-[27.3125rem] h-[40.125rem]">
            <BelovedItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BelovedSection;
