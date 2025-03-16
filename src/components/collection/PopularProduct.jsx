import React, { useMemo } from 'react';
import { BarButton } from '../../ui';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PopularProduct = () => {
  const { allProducts } = useSelector((state) => state.collection);

  const topProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) {
      return [];
    }

    return [...allProducts]
      .filter(
        (product) =>
          product.sales !== undefined &&
          product.options &&
          product.options.length > 0 &&
          product.options[0].images?.thumbnail?.default
      )
      .sort((a, b) => (b.sales || 0) - (a.sales || 0))
      .slice(0, 5);
  }, [allProducts]);

  return (
    <div className="text-center">
      <div className="text-heading1 font-diptyque mb-10">Our most popular products</div>

      <div className="overflow-x-auto max-w-full">
        <div className="flex flex-nowrap space-x-6 px-4 pb-4">
          {topProducts.map((product) => (
            <div key={product.id} className="flex-none w-[423px]">
              <Link to={`/product/${product.category}/${product.id}`}>
                <div className="h-[504px] w-full bg-slate-100 overflow-hidden">
                  {product.options[0].images?.thumbnail?.default && (
                    <img
                      src={product.options[0].images.thumbnail.default}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </Link>
              <div className="text-heading3 font-diptyque text-darkgrey-3 w-full text-left mt-4">{product.name}</div>
              <div className="flex place-content-between mt-[10px]">
                <div className="text-body3 text-darkgray-3">{product.type}</div>
                <div className="flex text-body3 text-darkgrey-3">
                  <div>{product.options[0].size}</div>
                  <div className="mx-1">|</div>
                  <div>{product.options[0].price} €</div>
                </div>
              </div>
              <div className="mt-5">
                <BarButton text="ADD TO BAG" type="filled" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
