import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';

const NotesSection = () => {
  const { matchingNotesData } = useSelector((state) => state.product);

  return (
    <div className="flex flex-col w-full my-sec-gap-pc ">
      <h2 className="detail-sec-title">Story of Our Blend</h2>

      <Swiper
        slidesPerView={5}
        spaceBetween={24}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper notes-swiper"
      >
        {matchingNotesData.map((data) => (
          <>
            <SwiperSlide key={data.noteId}>
              <img src={data.img} alt={data.note} className="w-full h-full object-cover" />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
};

export default NotesSection;
