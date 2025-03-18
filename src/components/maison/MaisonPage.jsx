import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BarButton from '../../ui/BarButton';
import './styles.scss';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const sec2ImgSrcList = [
  'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec2_Img1.avif',
  'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec2_Img2.avif',
  'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec2_Img3.avif',
  'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec2_Img4.avif',
  'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec2_Img5.avif',
];

const sec3SrcList = [
  {
    imgSrc: 'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec3_Img1.avif',
    title: 'NATURE',
    desc: 'Diptyque is rooted in a shared passion for nature, authenticity and truth. Wild, lively and colourful, nature guided the founding trio to create their first scents. A nature teeming with essences and materials, it recalls the landscapes prized by the three friends for their restorative qualities.',
  },
  {
    imgSrc: 'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec3_Img2.avif',
    title: 'TRAVEL',
    desc: 'Travel also broadened their horizons. Their wanderings led them from Europe to Asia, and from Venice to Moscow, and they followed in the footsteps of the ancient Greeks on dreamlike journeys. Their passion for travel and fascination for distant lands furnished them with memories they would later translate into fragrances and drawings. These recollections are the Maison’s primary source of inspiration.',
  },
  {
    imgSrc: 'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec3_Img3.avif',
    title: 'GRAPHIC ARTS',
    desc: 'Drawing on their shared passion for the graphic arts, the trio also created a playful and subtle new language. Graphic design was now a medium for expression; a gateway to the world of Diptyque. The Maison’s founders sought to strike an artful balance between images and words, black and white and colour, motif and figurative drawing. An iconic visual code comprising the oval, the fragrance burner and a host of dancing letters, like riddles to decipher, became part of the essence of the Maison’s identity.',
  },
];

const sec8SrcList = [
  {
    imgSrc: 'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec6_Img1.avif',
    text: 'PROMOTION',
    url: '/promotion',
  },
  {
    imgSrc: 'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec6_Img2.avif',
    text: 'PRODUCTS',
    url: '/product',
  },
  {
    imgSrc: 'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec6_Img3.avif',
    text: 'COLLECTION',
    url: '/collection',
  },
  {
    imgSrc: 'https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Sec6_Img4.avif',
    text: 'SERVICES',
    url: '/service',
  },
];

const AnimatedTextBox = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleY: 1, transformOrigin: 'bottom' }}
      animate={isInView && { scaleY: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
const AnimatedUpward = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 100, opacity: 0 }}
      animate={isInView && { y: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
const Animatedcentered = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ scaleY: 0.5, transformOrigin: 'top' }}
        animate={isInView && { scaleY: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.div>
      <motion.div
        ref={ref}
        initial={{ scaleY: 0.5, transformOrigin: 'bottom' }}
        animate={isInView && { scaleY: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
};

const maisonSectionStyle = 'max-w-[1256px] mx-[172px] ';
const maisonLessDesktopStyle = 'tablet:mx-[60px] ';

const MaisonPage = () => {
  return (
    <div className="maison-page flex flex-col items-center gap-[300px] tablet:gap-[200px] mt-[128px] mb-[120px] ">
      <section className={`maison-section-1 relative mt-[300px] max-w-[1440px] mx-[80px] ${maisonLessDesktopStyle}`}>
        <AnimatedTextBox className="absolute inset-0 bg-white" />
        <p className="text-display1 font-diptyque mb-20">Do you speak Diptyque?</p>
        <p className="text-display3/[130%] font-diptyque text-right">
          “The writing crafted by the Maison tells the story of a heritage that grows richer by the day.”
        </p>
      </section>
      <section className={`maison-section-2 max-w-[1440px] mx-[80px] ${maisonLessDesktopStyle}`}>
        <div className="flex flex-row justify-between gap-[208px]">
          <AnimatedUpward className="maison-section-2-desc">
            <h3 className="text-heading2 mb-10">The name “Diptyque”</h3>
            <div className="flex flex-col gap-5">
              <span>
                Diptyque is two syllables spoken in a whisper, a melody that fires the imagination and conjures visions
                of distant shores.
              </span>
              <span>
                Diptyque is the founders' tribute to the two-panelled paintings that emerged during the Renaissance, in
                which subjects dialogue in harmony with each other.
              </span>
              <span>
                Diptyque is also the genuine expression of our founders’ aesthetic affinity with the Greek civilisation
                in which the word is rooted.
              </span>
              <span>
                More than a name, it is a place, an echo of the boutique’s original Paris address at 34 boulevard
                Saint-Germain, with its two windows at right angles, one always echoing the other.
              </span>
            </div>
          </AnimatedUpward>
          <AnimatedUpward>
            <Swiper
              pagination={true}
              loop={true}
              modules={[Pagination]}
              className="Swiper max-w-[616px] w-[35vw] min-w-[320px] "
            >
              {sec2ImgSrcList.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <img src={src} alt="" className="w-full" />
                </SwiperSlide>
              ))}
            </Swiper>
          </AnimatedUpward>
        </div>
      </section>
      <section className={`maison-section-3 ${maisonSectionStyle} ${maisonLessDesktopStyle}`}>
        <div className="relative">
          <AnimatedTextBox className="absolute inset-0 bg-white" />
          <h3 className="text-display2 mb-20">Inspirations</h3>
        </div>

        <div className="grid grid-cols-2 gap-[18vw]">
          {sec3SrcList.map((item, idx) => (
            <div key={idx} className="flex items-center even:row-span-2">
              <div>
                <div className="relative">
                  <Animatedcentered className="absolute inset-0 bg-white" />
                  <img src={item.imgSrc} alt={item.title} className="aspect-[3/4] object-cover mb-5" />
                </div>
                <AnimatedUpward>
                  <p className="mb-5">{item.title}</p>
                  <span>{item.desc}</span>
                </AnimatedUpward>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="maison-section-4 w-full">
        <div className={`${maisonSectionStyle} ${maisonLessDesktopStyle}`}>
          <video
            src="src/assets/video/Sec4_Video.mp4"
            autoPlay={true}
            loop={true}
            controls={true}
            muted={true}
            className="w-full mb-[80px] aspect-video object-cover"
          ></video>
          <div className="relative ">
            <AnimatedTextBox className="absolute inset-0 bg-white" />
            <h3 className="text-display2 font-bold">“We were artists.</h3>
            <p className="font-diptyque font-bold text-display3/[130%] w-[60vw] mb-5">
              We were not driven by ambition, but rather by passion, imagination, creativity and the desire to do
              something with true integrity”
            </p>
            <div className="flex flex-row justify-end font-diptyque text-heading2">- CHRISTIANE MONTADRE-GAUTROT</div>
          </div>
        </div>
      </section>
      <section className="maison-section-5 w-full ">
        <div className={`${maisonSectionStyle} ${maisonLessDesktopStyle}`}>
          <AnimatedUpward className="flex justify-end">
            <img
              src="https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Img1.avif"
              alt=""
              className=" w-[50vw]"
            />
          </AnimatedUpward>
        </div>
      </section>
      <section className={`maison-section-6 ${maisonSectionStyle} ${maisonLessDesktopStyle}`}>
        <div className="relative">
          <AnimatedTextBox className="absolute inset-0 bg-white" />
          <h3 className="text-display2 font-bold mb-[80px]">History</h3>
        </div>
        <div className="relative">
          <AnimatedTextBox className="absolute inset-0 bg-white" />
          <div className="flex flex-row gap-6">
            <div>
              <p className="mb-10">Diptyque’s founders: A trio of artists and friends</p>
              <p className="mb-5">
                Paris, 1949. The story begins. Desmond is a painter, a graduate of the École des Beaux-Arts, the Paris
                school of fine arts. Christiane is an interior architect, trained at the French national school of
                decorative arts, the Arts décoratifs. One is an accomplished artist; the other has a passion for
                craftsmanship. Each is the mirror image of the other. Their inevitable friendship is shaped by memories
                of Desmond’s summers in the South of France, and Christiane’s childhood garden on the fringes of
                Fontainebleau. With taste and discernment, they work together to create designs for upholstery fabrics
                sold at Liberty and Sanderson in London.
              </p>
              <p>
                A decade later, by a twist of fate, they cross paths with Yves Coueslant. This globe-trotting son of a
                banker raised in Indochina (present-day Vietnam) establishes an immediate rapport with Christiane and
                Desmond, himself heir to a British noble family. Together, they make an inseparable trio of friends. And
                from this encounter springs a creative ambition – the dream of founding their own Maison.
              </p>
            </div>
            <div>
              <p className="mb-10">1961: the The kindling of an imagination</p>
              <p className="mb-5">
                Three artists, three free spirits, one vision. At the turn of the Sixties, at a time of tremendous
                excitement and optimism marked by a strong desire for modernity, Desmond Knox-Leet, Christiane
                Montadre-Gautrot and Yves Coueslant invented a new kind of space; a space made in their image; a
                celebration of the senses; a tribute to daring, where their creativity shone alongside objects sourced
                from around the world. Bound by a sense of beauty, a love of nature, and an insatiable curiosity, the
                three friends brought Diptyque to vivid life.
              </p>
              <p>
                Part artist's studio, part cabinet of curiosities, Diptyque opened in Paris’s 5th arrondissement, a
                bohemian haven where heritage merged with modernity. At 34 boulevard Saint-Germain, the three friends
                became ""purveyors of trifles"". Over the course of their encounters and travels, they unearthed
                antiques, decorated and refashioned exotic and everyday objects, and filled the shelves of this concept
                store ahead of its time.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="maison-section-7 w-[910px] mx-[345px]">
        <AnimatedUpward>
          <img
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/maison/Img2_1.png?raw=true"
            alt=""
            className="w-[433px]"
          />
        </AnimatedUpward>
        <AnimatedUpward>
          <img
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/maison/Img2_2.png?raw=true"
            alt=""
            className="-mt-[220px] ml-[216px] w-[228px]"
          />
        </AnimatedUpward>
        <AnimatedUpward>
          <img
            src="https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Img2_3.avif"
            alt=""
            className="-mt-[120px] mr-0 ml-auto w-[454px]"
          />
        </AnimatedUpward>
        <div className="relative">
          <Animatedcentered className="absolute inset-0 bg-white" />
          <img
            src="https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/maison/Img2_4.avif"
            alt=""
            className="mt-[40px] mx-auto w-[536px]"
          />
        </div>
        <AnimatedUpward>
          <img
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/maison/Img2_5.png?raw=true"
            alt=""
            className="mt-[80px] mx-auto w-[340px]"
          />
        </AnimatedUpward>
      </section>
      <section className={`maison-section-8 ${maisonSectionStyle} ${maisonLessDesktopStyle}`}>
        <div className="relative">
          <AnimatedTextBox className="absolute inset-0 bg-white" />
          <h3 className="text-display2 text-bold text-center mb-[80px]">Explore the world of Diptyque</h3>
        </div>
        <div className="maison-section-8-card-item-list flex flex-col gap-10 ">
          {sec8SrcList.map((item, idx) => (
            <AnimatedUpward key={idx} className="maison-section-8-card-item">
              <img src={item.imgSrc} alt={item.text} className="mb-10" />
              <Link to={item.url}>
                <BarButton text={item.text} type="border" />
              </Link>
            </AnimatedUpward>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MaisonPage;
