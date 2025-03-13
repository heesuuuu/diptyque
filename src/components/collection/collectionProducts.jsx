// components/collection/CollectionProducts.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const CollectionProducts = () => {
  const { collectionProducts, selectedCollection } = useSelector((state) => state.collection);


  return (
    <div>
      
      <div className="">
        {collectionProducts.flatMap((product) =>
          // 각 옵션을 별도의 카드로 표시
          product.options.map((option, optIndex) => (
            <div key={`${product.id}-${optIndex}`}>
              {option.images?.thumbnail?.default && (
                <img
                  src={option.images.thumbnail.default}
                  alt={`${product.name} ${option.size || ''}`}
                  className="w-full h-64 object-cover mb-4"
                />
              )}
              <h3 className="font-diptyque text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.type}</p>
              <div className="mt-2 flex justify-between">
                <span className="font-medium">{option.size || '기본 사이즈'}</span>
              </div>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CollectionProducts;
