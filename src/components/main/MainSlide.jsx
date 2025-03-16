import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const mainSlideSrc = [
  {
    name: 'maison',
    imgUrl: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/main/mainslide_1.png?raw=true',
    link: '/maison',
  },
  {
    name: 'promotion',
    imgUrl: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/main/mainslide_2.png?raw=true',
    link: '/promotion',
  },
  {
    name: 'product',
    imgUrl: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/main/mainslide_3.png?raw=true',
    link: '/product',
  },
  {
    name: 'collection',
    imgUrl: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/main/mainslide_4.png?raw=true',
    link: '/collection',
  },
  {
    name: 'service',
    imgUrl: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/main/mainslide_5.png?raw=true',
    link: '/service',
  },
];

const MainSlide = () => {
  const containerRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 가로 크기 계산 (16:9 비율 유지)
  const imageWidth = viewportHeight * (16 / 9);
  const totalWidth = `-${mainSlideSrc.length * imageWidth}px`;

  // 세로 스크롤 값을 가로 스크롤 값으로 변환
  const x = useTransform(scrollYProgress, [0, 1], ['0px', totalWidth]);

  return (
    <div ref={containerRef} className="relative overflow-hidden" style={{ height: `${mainSlideSrc.length * 100}vh` }}>
      <motion.div style={{ x }} className="flex fixed left-0 top-0 h-screen items-center">
        {mainSlideSrc.map((item, idx) => (
          <div
            key={idx}
            className="h-screen flex-shrink-0"
            style={{ width: `${imageWidth}px` }}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link to={item.link}>
              <img src={item.imgUrl} alt={item.name} className="h-screen object-cover" />
            </Link>
          </div>
        ))}
      </motion.div>

      {/* 커서 따라다니는 div */}
      {hoveredItem && (
        <motion.div
          className="fixed pointer-events-none bg-darkgrey-3 text-white px-5 py-2"
          style={{
            left: cursorPos.x - 50,
            top: cursorPos.y - 35,
          }}
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          {hoveredItem.toUpperCase()}
        </motion.div>
      )}
    </div>
  );
};

export default MainSlide;
