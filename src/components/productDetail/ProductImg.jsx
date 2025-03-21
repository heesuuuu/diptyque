import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './style.scss';

const useParallax = (value, distance) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

const ProductImg = ({ index, name, img }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="img-container">
      <div ref={ref}>
        <img src={img} alt={`${name}${index + 1}`} />
      </div>
    </section>
  );
};

export default ProductImg;
