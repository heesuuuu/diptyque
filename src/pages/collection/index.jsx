import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CollectionMenu from '../../components/collection/CollectionMenu';
import CollectionProducts from '../../components/collection/CollectionProducts';
import PopularProduct from '../../components/collection/PopularProduct';
import CollectionIntro from '../../components/collection/CollectionIntro';

const Collection = () => {
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const menuContainerRef = useRef(null);
  const { selectedCollection } = useSelector((state) => state.collection);

  const handleCollectionChange = () => {
    setIsFading(true);

    setTimeout(() => {
      setIsFading(false);
    }, 500);
  };

  useEffect(() => {
    // 선택된 컬렉션이 변경될 때마다 handleCollectionChange 호출
    handleCollectionChange();
  }, [selectedCollection]);

  return (
    <>
      {/* 상단 배너 및 소개 */}
      <CollectionIntro />

      {/* Collection 상품 영역 */}
      <div className="w-full px-[80px]">
        <section className="lg:w-full lg:mx-auto relative">
          <div className="flex flex-col md:flex-row">
            {/* Left menu */}
            <div
              className="md:w-1/4 mb-8 md:mb-0 sticky top-[10vh] h-fit"
              ref={menuContainerRef}
              onMouseEnter={() => setIsMouseOverMenu(true)}
              onMouseLeave={() => setIsMouseOverMenu(false)}
            >
              <CollectionMenu />
            </div>

            {/* 상품 상세 */}
            <div className="md:w-3/4 lg:ml-[115px] md:ml-[24px]">
              <CollectionProducts isMouseOverMenu={isMouseOverMenu} isFading={isFading} />
            </div>
          </div>
        </section>

        {/* Most popular section */}
        <section className="mt-[80px] mb-[200px] lg:w-full lg:mx-auto overflow-visible">
          <PopularProduct />
        </section>
      </div>
    </>
  );
};

export default Collection;
