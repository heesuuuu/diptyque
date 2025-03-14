import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BarButton, Icon } from '../../ui';
import Accordion from '../../ui/Accordion';

const CollectionProducts = () => {
  const { collectionProducts } = useSelector((state) => state.collection);
  const [expandedProducts, setExpandedProducts] = useState({});

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
          const maxLength = 150; 

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
              <div className="md:w-[500px] ml-[90px] space-y-5 h-full">
                <h3 className="font-diptyque lg:text-heading1 md:text-heading3 h-[58px]">{product.name}</h3>
                <div className="flex">
                  <div className="text-grey-4 text-body3 ">{product.type}</div>
                </div>
                <div className="text-body3 border-solid border-b-[1px] w-full bg-slate-400 border-darkgrey-3 "></div>
                <div className="text-body3 text-grey-4 mb-4">{product.notes}</div>

                {/* 상품 설명 */}
                <p className="text-body3 mb-6 text-darkgrey-1 ">
                  {isExpanded ? product.description : `${product.description.slice(0, maxLength)}...`}
                  {product.description.length > maxLength && (
                    <button
                      onClick={() => toggleDescription(product.id)}
                      className="text-body3 text-darkgrey-3 underline ml-2 "
                    >
                      {isExpanded ? 'Less' : 'More'}
                    </button>
                  )}
                </p>

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
          );
        })}
      </div>
    </div>
  );
};

export default CollectionProducts;
