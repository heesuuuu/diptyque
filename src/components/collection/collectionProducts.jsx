// components/collection/CollectionProducts.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { BarButton, Icon } from '../../ui';
import { Link } from 'react-router-dom';

const CollectionProducts = () => {
  const { collectionProducts, selectedCollection } = useSelector((state) => state.collection);

  return (
    <div>
      {/* 상품 목록 */}
      <div className="space-y-12 position">
        {collectionProducts.map((product) => (
          <div key={product.id} className="flex flex-col md:flex-row gap-8">
            {/* 왼쪽: 상품 이미지 */}
            <div className="md:w-1/2">
              {product.options && product.options[0]?.images?.thumbnail?.default && (
                <img
                  src={product.options[0].images.thumbnail.default}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>

            {/* 오른쪽: 상품 정보 */}
            <div className="md:w-[500px] ml-[90px] space-y-5 h-full">
              <h3 className="font-diptyque lg:text-heading1 md:text-heading3 h-[58px]">{product.name}</h3>
              <div className="flex">
                <div className="text-grey-4 text-body3 ">{product.type}</div>
              </div>
              <div className="text-body3 border-solid border-b-[1px] w-full bg-slate-400 border-darkgrey-3 "></div>
              <div className=" text-body3 text-grey-4 mb-4">{product.notes}</div>

              {/* 상품 설명 */}
              <p className="text-body3 mb-6 text-darkgrey-1">{product.description}</p>

              <div className="space-y-[10px]">
                <div>Free Returns</div>
                <div>2 free samples of your choice width every order</div>
              </div>

              {/* 아코디언 설명 */}
              <div className="flex place-content-between items-center h-[48px] border-solid  border-darkgrey-3 border-b-[1px] cursor-pointer w-full">
                <div className="text-body3">Direction for use</div>
                <div>
                  <Icon name="keyboard_arrow_down" />
                </div>
              </div>
              {/* 상품 옵션 */}
              <div className="mb-6">
                {/* <h4 className="font-medium mb-2">Options:</h4> */}
                {/* <div className="space-y-2">
                  {product.options.map((option, optIdx) => (
                    <div key={optIdx} className="flex justify-between border-b pb-2">
                      <span>{option.size || '기본 사이즈'}</span>
                      <span className="font-medium">${option.price}</span>
                    </div>
                  ))}
                </div> */}
              </div>
              {/* 상세피이지 이동 버튼 */}
              <Link className="text-body2 flex place-content-between h-[50px] cursor-pointer items-center">
                <div className="text-body3">Detail Page</div>
                <div>
                  <Icon name="north_east" size={20} />
                </div>
              </Link>

              {/* 장바구니 버튼 */}
              <BarButton text="ADD TO BAG" type="filled" className="text-body3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionProducts;
