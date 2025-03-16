import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CollectionMenu from '../../components/collection/CollectionMenu';
import CollectionProducts from '../../components/collection/CollectionProducts';
import PopularProduct from '../../components/collection/PopularProduct';

const Collection = () => {
  const dispatch = useDispatch();
  const { selectedCollection, selectedCollectionDescription } = useSelector((state) => state.collection);

  // Mouse over menu state
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const menuContainerRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleCollectionChange = (collectionName) => {
    setIsFading(true);

    setTimeout(() => {
      setIsFading(false);
    }, 500);
  };

  // 스크롤 위치를 디버깅하는 함수 (나중에 제거 가능)
  const logScrollPosition = () => {
    console.log(`Current scroll position: ${window.scrollY}px`);
  };

  useEffect(() => {
  }, []);

  return (
    <>
      {/* 상단 배너 */}
      <section className="mb-[200px]">
        <div className="bg-gray-400 w-full h-[841px]"></div>
      </section>

      {/* Collection 소개 */}
      <div className="w-full px-[80px]">
        <section
          className={`mt-[80px] mb-[200px] lg:w-[1168px] lg:mx-auto transition-opacity duration-500 ${
            isFading ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {/* 상단 title*/}
          <div className="font-diptyque text-heading1 text-center">{selectedCollection || 'Philosykos'}</div>

          {/* Introduction description*/}
          <div ref={descriptionRef} className="mt-[40px] text-center transition-all duration-500">
            {selectedCollectionDescription ||
              'Body Medium. Most fonts have a particular weight which corresponds to one of the numbers in Common weight name mapping. However some fonts, called variable fonts, can support a range of weights with a more or less fine granularity, and this can give the designer a much closer degree of control over the chosen weight.'}
          </div>
        </section>

        {/* Collection 상품*/}
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
              <CollectionProducts onChangeCollection={handleCollectionChange} isMouseOverMenu={isMouseOverMenu} />
            </div>
          </div>
        </section>

        {/* Most popular section */}
        <section className="mt-[80px] mb-[200px] lg:w-full lg:mx-auto overflow-visible">
          <PopularProduct onChangeCollection={handleCollectionChange} isMouseOverMenu={isMouseOverMenu} />
        </section>
      </div>
    </>
  );
};

export default Collection;
