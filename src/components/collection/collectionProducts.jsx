import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BarButton, Icon } from '../../ui';
import Accordion from '../../ui/Accordion';

const CollectionProducts = () => {
  const { CollectionProducts } = useSelector((state) => state.collection);
  const [expandedProducts, setExpandedProducts] = useState({});
  const [currentVisibleProduct, setCurrentVisibleProduct] = useState(null);
  const [previousProduct, setPreviousProduct] = useState(null);
  const [transitionState, setTransitionState] = useState('stable'); 
  const [hasScrolled, setHasScrolled] = useState(false); 
  const contentRefs = useRef({});
  const productRefs = useRef({});
  const productInfoRef = useRef(null);
  const lastVisibleProductRef = useRef(null);

  // ID와 객체의 매핑을 생성
  const productsMap = useRef({});

  // 상품 맵 초기화
  useEffect(() => {
    const map = {};
    CollectionProducts.forEach((product) => {
      // 문자열로 변환하여 저장 (숫자/문자열 타입 불일치 방지)
      map[String(product.id)] = product;
    });
    productsMap.current = map;
  }, [CollectionProducts]);

  const toggleDescription = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // 스크롤 이벤트 핸들러 - 스크롤 위치에 따라 현재 보이는 상품 결정
  const handleScroll = () => {
    if (CollectionProducts.length === 0) return;

    // 스크롤 했음을 표시
    if (!hasScrolled) {
      setHasScrolled(true);
    }

    const windowHeight = window.innerHeight;
    const windowCenter = windowHeight / 2;

    // 어떤 요소가 화면 중앙에 가장 가까운지 확인
    let closestProduct = null;
    let minDistance = Number.MAX_VALUE;

    Object.keys(productRefs.current).forEach((productId) => {
      const element = productRefs.current[productId];
      if (element) {
        // 요소의 화면 내 위치 계산
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(windowCenter - elementCenter);

        // 더 가까운 요소를 찾으면 업데이트
        if (distance < minDistance) {
          minDistance = distance;
          closestProduct = productId;
        }
      }
    });

    // 가장 가까운 상품이 현재 표시 중인 상품과 다른 경우
    if (closestProduct && closestProduct !== lastVisibleProductRef.current) {
      lastVisibleProductRef.current = closestProduct;

      // 확인: 이 ID가 productsMap에 있는지 체크
      if (productsMap.current[closestProduct]) {
        setPreviousProduct(currentVisibleProduct);
        setCurrentVisibleProduct(closestProduct);

        setTransitionState('fadeOut');

        requestAnimationFrame(() => {
          setTransitionState('changing');

          requestAnimationFrame(() => {
            setTransitionState('fadeIn');

          });
        });
      }
    }
  };

  // 컴포넌트 마운트 시 설정
  useEffect(() => {
    // 컴포넌트 마운트 시 첫 번째 상품을 기본 표시 상품으로 설정
    if (CollectionProducts.length > 0 && currentVisibleProduct === null) {
      const firstProductId = String(CollectionProducts[0].id);
      lastVisibleProductRef.current = firstProductId;
      setCurrentVisibleProduct(firstProductId);
    }

    // 스크롤 이벤트 리스너 등록 - 디바운스 없이 직접 이벤트 연결
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [CollectionProducts]);

  // 메뉴 클릭 또는 페이지 이동 후 첫 번째 상품으로 초기화
  useEffect(() => {
    if (CollectionProducts.length > 0) {
      const firstProductId = String(CollectionProducts[0].id);

      // 스크롤 상태 초기화
      setHasScrolled(false);

      // 첫 번째 상품을 현재 상품으로 설정
      if (lastVisibleProductRef.current !== firstProductId) {
        lastVisibleProductRef.current = firstProductId;
        setCurrentVisibleProduct(firstProductId);
        setTransitionState('stable');
      }
    }
  }, [CollectionProducts]); 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (CollectionProducts.length > 0 && Object.keys(productRefs.current).length === CollectionProducts.length) {
        handleScroll();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [CollectionProducts]);

  // 현재 상품 객체 찾기
  const currentProduct = currentVisibleProduct
    ? productsMap.current[currentVisibleProduct]
    : CollectionProducts.length > 0
      ? CollectionProducts[0]
      : null;

  // 상품이 없으면 로딩 표시
  if (!CollectionProducts || CollectionProducts.length === 0) {
    return <div className="p-4">상품을 불러오는 중...</div>;
  }

  // 트랜지션 클래스 결정 - 스크롤 위치에 동기화
  const getTransitionClass = () => {
    if (!hasScrolled) {
      return 'transform translate-x-0 opacity-100';
    }

    switch (transitionState) {
      case 'fadeOut':
        return 'transform translate-x-[-80px] opacity-0';
      case 'changing':
        return 'transform translate-x-[80px] opacity-0';
      case 'fadeIn':
      case 'stable':
        return 'transform translate-x-0 opacity-100';
      default:
        return 'transform translate-x-0 opacity-100';
    }
  };

  return (
    <div className="product-container">
      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* 왼쪽: 상품 이미지 (스크롤 될 부분) */}
        <div className="md:w-1/2">
          <div className="space-y-12">
            {CollectionProducts.map((product) => (
              <div
                key={product.id}
                ref={(el) => {
                  if (el) productRefs.current[String(product.id)] = el;
                }}
                data-product-id={String(product.id)}
                className="mb-12"
              >
                {product.options && product.options[0]?.images?.thumbnail?.default && (
                  <img
                    src={product.options[0].images.thumbnail.default}
                    alt={product.name}
                    className="w-full h-[803px] object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 상품 정보 */}
        <div className="md:w-1/2 relative">
          <div
            ref={productInfoRef}
            className="md:w-[500px] ml-[90px] h-[800px] inline-grid sticky"
            style={{ top: '10vh', zIndex: 10 }}
          >
            {currentProduct && (
              <div
                key={currentProduct.id}
                className={`space-y-5 transition-all duration-300 ease-in-out ${getTransitionClass()}`}
              >
                <h3 className="font-diptyque lg:text-heading1 md:text-heading3 h-[58px]">{currentProduct.name}</h3>
                <div className="flex">
                  <div className="text-grey-4 text-body3">{currentProduct.type}</div>
                </div>
                <div className="text-body3 border-solid border-b-[1px] w-full bg-slate-400 border-darkgrey-3"></div>
                <div className="text-body3 text-grey-4 mb-4">{currentProduct.notes}</div>

                {/* 상품 설명 - 아코디언과 같은 애니메이션 적용 */}
                <div className="relative mb-4">
                  {/* 전체 설명 컨테이너 */}
                  <div
                    ref={(el) => {
                      if (el) contentRefs.current[currentProduct.id] = el;
                    }}
                    className="text-body3 text-darkgrey-1 overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: expandedProducts[currentProduct.id]
                        ? `${contentRefs.current[currentProduct.id]?.scrollHeight}px`
                        : '3em', 
                    }}
                  >
                    <p className="m-0">{currentProduct.description}</p>
                  </div>

                  {!expandedProducts[currentProduct.id] && (
                    <div className="absolute bottom-0 right-0 bg-white pl-1 text-body3 text-darkgrey-1">
                      ...{' '}
                      <button
                        onClick={() => toggleDescription(currentProduct.id)}
                        className="text-darkgrey-3 underline"
                      >
                        more
                      </button>
                    </div>
                  )}

                  {/* Less 버튼 (펼쳐져 있을 때만 표시) */}
                  {expandedProducts[currentProduct.id] && (
                    <button
                      onClick={() => toggleDescription(currentProduct.id)}
                      className="text-body3 text-darkgrey-3 underline transition-opacity duration-500 ease-in-out"
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

                <div className="absolute bottom-0 w-full space-y-5">
                  {/* 상세페이지 이동 버튼 */}
                  <Link
                    to={`/product/${currentProduct.category}/${currentProduct.id}`}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionProducts;
