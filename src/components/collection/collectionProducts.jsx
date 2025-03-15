import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BarButton, Icon } from '../../ui';
import Accordion from '../../ui/Accordion';

const CollectionProducts = () => {
  const { collectionProducts } = useSelector((state) => state.collection);
  const [expandedProducts, setExpandedProducts] = useState({});
  const contentRefs = useRef({});

  const toggleDescription = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div>
      {/* 상품 목록 */}
      <div className="space-y-12 position">
        {collectionProducts.map((product) => {
          const isExpanded = expandedProducts[product.id] || false;

          return (
            <div key={product.id} className="flex flex-col md:flex-row gap-8">
              {/* 왼쪽: 상품 이미지 */}
              <div className="md:w-1/2">
                {product.options && product.options[0]?.images?.thumbnail?.default && (
                  <img
                    src={product.options[0].images.thumbnail.default}
                    alt={product.name}
                    className="w-full h-[803px] object-cover"
                  />
                )}
              </div>

              {/* 오른쪽: 상품 정보 */}
              <div className="md:w-[500px] ml-[90px]  h-[800px] inline-grid relative">
                <div className="space-y-5">
                  <h3 className="font-diptyque lg:text-heading1 md:text-heading3 h-[58px]">{product.name}</h3>
                  <div className="flex">
                    <div className="text-grey-4 text-body3">{product.type}</div>
                  </div>
                  <div className="text-body3 border-solid border-b-[1px] w-full bg-slate-400 border-darkgrey-3"></div>
                  <div className="text-body3 text-grey-4 mb-4">{product.notes}</div>

                  {/* 상품 설명 - 아코디언과 같은 애니메이션 적용 */}
                  <div className="relative mb-4">
                    {/* 전체 설명 컨테이너 */}
                    <div
                      ref={(el) => (contentRefs.current[product.id] = el)}
                      className="text-body3 text-darkgrey-1 overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: isExpanded ? `${contentRefs.current[product.id]?.scrollHeight}px` : '3em', // 약 1.5줄
                      }}
                    >
                      <p className="m-0">{product.description}</p>
                    </div>

                    {/* ...more 버튼 (접혀있을 때만 표시) */}
                    {!isExpanded && (
                      <div className="absolute bottom-0 right-0 bg-white pl-1 text-body3 text-darkgrey-1">
                        ...{' '}
                        <button onClick={() => toggleDescription(product.id)} className="text-darkgrey-3 underline">
                          more
                        </button>
                      </div>
                    )}

                    {/* Less 버튼 (펼쳐져 있을 때만 표시) */}
                    {isExpanded && (
                      <button
                        onClick={() => toggleDescription(product.id)}
                        className=" text-body3 text-darkgrey-3 underline transition-opacity duration-500 ease-in-out"
                      >
                        Less
                      </button>
                    )}
                  </div>

                  <div className="space-y-[10px]">
                    <div>Free Returns</div>
                    <div>2 free samples of your choice with every order</div>
                  </div>

                  {/* 아코디언 설명 */}
                  <div>
                    <Accordion
                      title="Directions for use"
                      content="After washing your hair, rinse with cold water to strengthen the capillary fibres. This will help your hair absorb the Hair mist more effectively."
                    />
                    <Accordion
                      title="Ingredients"
                      content="alcohol denat. (sd alcohol 40-b), aqua (water), parfum (fragrance),
                          peg-40 hydrogenated castor oil, coco-caprylate/caprate, ethylhexyl methoxycinnamate, limonene, 
                          camellia oleifera seed oil, ethylhexyl salicylate, butyl methoxydibenzoylmethane, linalool, 
                          alpha-isomethyl ionone, farnesol, geraniol, citral, bht, tocopherol"
                    />
                  </div>
                </div>

                <div className='absolute bottom-0 w-full space-y-5'>
                  {/* 상세페이지 이동 버튼 */}
                  <Link
                    to={`/product/${product.category}/${product.id}`}
                    className="text-body2 flex place-content-between h-[50px] cursor-pointer items-center"
                  >
                    <div className="text-body3">Detail Page</div>
                    <div>
                      <Icon name="north_east" size={20} />
                    </div>
                  </Link>

                  {/* 장바구니 버튼 */}
                  <BarButton text="ADD TO BAG" type="filled" className="text-body3" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionProducts;
