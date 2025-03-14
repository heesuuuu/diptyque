// pages/collection/index.jsx
import React from 'react';
import CollectionMenu from '../../components/collection/CollectionMenu';
import CollectionProducts from '../../components/collection/collectionProducts';
import PopularProduct from '../../components/collection/PopularProduct';

const Collection = () => {
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
          {/* 소개 Title */}
          <div className="font-diptyque text-heading1 text-center">Philosykos</div>
          <div className="mt-[40px] text-center">
            Body Medium. Most fonts have a particular weight which corresponds to one of the numbers in Common weight
            name mapping. However some fonts, called variable fonts, can support a range of weights with a more or less
            fine granularity, and this can give the designer a much closer degree of control over the chosen weight.
          </div>
        </section>

        {/* Collection 상품 Sec */}
        <section className=" lg:w-full lg:mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* 왼쪽 메뉴 */}
            <div className="md:w-1/4 mb-8 md:mb-0">
              <CollectionMenu />
            </div>

            {/* 오른쪽 상품 목록/상세 정보 */}
            <div className="md:w-3/4 lg:ml-[115px] md:ml-[24px]">
              <CollectionProducts />
            </div>
          </div>
        </section>

        {/* most popular Sec */}
        <section className="mt-[80px] mb-[200px] lg:w-full lg:mx-auto">
          <PopularProduct />
        </section>
      </div>
    </>
  );
};

export default Collection;
