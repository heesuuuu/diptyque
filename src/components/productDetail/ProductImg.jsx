import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './style.scss';

const useParallax = (value, distance) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

const ProductImg = ({ index, name, img, imgLength }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const { scrollXProgress } = useScroll();
  const y = useParallax(scrollYProgress, 300);
  const x = useParallax(scrollXProgress, 300);

  return (
    <section className={`img-container h-[${imgLength * 100}vh] mobile:h-[${imgLength * 512}px]`}>
      <div ref={ref}>
        <img src={img} alt={`${name}${index + 1}`} />
      </div>
    </section>
  );
};

export default ProductImg;
