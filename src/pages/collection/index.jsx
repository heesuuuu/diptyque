import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CollectionMenu from '../../components/collection/CollectionMenu';
import CollectionProducts from '../../components/collection/CollectionProducts'; // 대소문자 수정
import PopularProduct from '../../components/collection/PopularProduct';

const Collection = () => {
  const dispatch = useDispatch();
  const { selectedCollection, selectedCollectionDescription } = useSelector((state) => state.collection);

  // 마우스가 메뉴 위에 있는지 상태
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);

  // 메뉴 컨테이너 참조
  const menuContainerRef = useRef(null);

  // 컬렉션 변경 핸들러
  const handleCollectionChange = (collectionName) => {
    console.log(`Collection changed to: ${collectionName}`);
    // 추가 로직이 필요하다면 여기에 구현
  };

  return (
    <>
      {/* Collection 배너이미지 Sec */}
      <section className="mb-[200px]">
        {/* 빈 문자열 대신 null 또는 기본 이미지 경로 사용 */}
        <div className="bg-gray-400 w-full h-[841px]"></div>
      </section>

      {/* Collection 소개 Sec */}
      <div className="w-full px-[80px]">
        <section className="mt-[80px] mb-[200px] lg:w-[1168px] lg:mx-auto">
          {/* 소개 Title - 선택된 컬렉션 이름 표시 */}
          <div className="font-diptyque text-heading1 text-center">{selectedCollection || 'Philosykos'}</div>
          {/* 소개 설명 - 선택된 컬렉션 설명 표시 */}
          <div className="mt-[40px] text-center">
            {selectedCollectionDescription ||
              'Body Medium. Most fonts have a particular weight which corresponds to one of the numbers in Common weight name mapping. However some fonts, called variable fonts, can support a range of weights with a more or less fine granularity, and this can give the designer a much closer degree of control over the chosen weight.'}
          </div>
        </section>

        {/* Collection 상품 Sec */}
        <section className="lg:w-full lg:mx-auto relative">
          <div className="flex flex-col md:flex-row">
            {/* 왼쪽 메뉴 */}
            <div
              className="md:w-1/4 mb-8 md:mb-0 sticky top-[10vh] h-fit"
              ref={menuContainerRef}
              onMouseEnter={() => setIsMouseOverMenu(true)}
              onMouseLeave={() => setIsMouseOverMenu(false)}
            >
              <CollectionMenu />
            </div>

            {/* 오른쪽 상품 목록/상세 정보 */}
            <div className="md:w-3/4 lg:ml-[115px] md:ml-[24px]">
              <CollectionProducts onChangeCollection={handleCollectionChange} isMouseOverMenu={isMouseOverMenu} />
            </div>
          </div>
        </section>

        {/* most popular Sec */}
        <section className="mt-[80px] mb-[200px] lg:w-full lg:mx-auto">
          <PopularProduct onChangeCollection={handleCollectionChange} isMouseOverMenu={isMouseOverMenu} />
        </section>
      </div>
    </>
  );
};

export default Collection;
