import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BarButton, Icon } from '../../ui';
import Accordion from '../../ui/Accordion';

const CollectionProducts = () => {
  const dispatch = useDispatch();
  const {
    CollectionProducts,
    selectedCollection,
    allCollectionNames,
    allProducts: globalAllProducts,
  } = useSelector((state) => state.collection);

  // 상태 변수들
  const [expandedProducts, setExpandedProducts] = useState({});
  const [currentVisibleProduct, setCurrentVisibleProduct] = useState(null);
  const [previousProduct, setPreviousProduct] = useState(null);
  const [transitionState, setTransitionState] = useState('stable');
  const [hasScrolled, setHasScrolled] = useState(false);

  // 중요: 모든 상품들을 한 번에 렌더링하는 방식으로 변경
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // 다양한 참조 변수들
  const contentRefs = useRef({});
  const productRefs = useRef({});
  const productInfoRef = useRef(null);
  const lastVisibleProductRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isInitialLoadRef = useRef(true);
  const hasManuallyChangedRef = useRef(false);

  // 현재 선택된 컬렉션의 인덱스 찾기
  const currentCollectionIndex = allCollectionNames.indexOf(selectedCollection);

  // 다음 컬렉션 이름 찾기
  const nextCollectionName =
    currentCollectionIndex < allCollectionNames.length - 1 ? allCollectionNames[currentCollectionIndex + 1] : null;

  // 제품과 컬렉션 매핑
  const productCollectionMap = useRef({});

  // 제품 ID와 객체 매핑
  const productsMap = useRef({});

  // 모든 컬렉션 상품을 한 번에 준비
  useEffect(() => {
    if (globalAllProducts.length > 0) {
      const productsByCollection = {};

      // 모든 상품을 컬렉션별로 분류
      globalAllProducts.forEach((product) => {
        let collectionName = null;

        if (Array.isArray(product.collection)) {
          const collectionObj = product.collection.find((col) => col && typeof col === 'object' && col.collectionName);
          if (collectionObj) {
            collectionName = collectionObj.collectionName;
          }
        } else if (product.collection && typeof product.collection === 'object' && product.collection.collectionName) {
          collectionName = product.collection.collectionName;
        }

        if (collectionName) {
          if (!productsByCollection[collectionName]) {
            productsByCollection[collectionName] = [];
          }
          productsByCollection[collectionName].push(product);
        }
      });

      // 컬렉션 순서대로 모든 상품 준비
      const allProductsInOrder = [];
      allCollectionNames.forEach((collectionName) => {
        if (productsByCollection[collectionName]) {
          allProductsInOrder.push(...productsByCollection[collectionName]);
        }
      });

      // 모든 상품을 한 번에 설정
      setDisplayedProducts(allProductsInOrder);
    }
  }, [globalAllProducts, allCollectionNames]);

  // 상품 맵 초기화
  useEffect(() => {
    const pMap = {};
    const cMap = {};

    // 모든 상품 매핑
    displayedProducts.forEach((product) => {
      const productId = String(product.id);
      pMap[productId] = product;

      // 컬렉션 정보 추출
      let collectionName = null;

      if (Array.isArray(product.collection)) {
        const collectionObj = product.collection.find((col) => col && typeof col === 'object' && col.collectionName);
        if (collectionObj) {
          collectionName = collectionObj.collectionName;
        }
      } else if (product.collection && typeof product.collection === 'object' && product.collection.collectionName) {
        collectionName = product.collection.collectionName;
      }

      cMap[productId] = collectionName;
    });

    productsMap.current = pMap;
    productCollectionMap.current = cMap;
  }, [displayedProducts]);

  // 상품 설명 접기/펼치기 토글
  const toggleDescription = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // 스크롤 이벤트 핸들러 - 스크롤 위치에 따라 현재 보이는 상품 결정
  const handleScroll = () => {
    if (displayedProducts.length === 0) return;

    // 현재 스크롤 위치 저장
    scrollPositionRef.current = window.scrollY;

    // 초기 로드 후 스크롤 발생 시 플래그 설정
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      setHasScrolled(true);
    }

    // 화면 중앙의 위치 계산
    const windowHeight = window.innerHeight;
    const windowCenter = windowHeight / 2;

    // 어떤 요소가 화면 중앙에 가장 가까운지 확인
    let closestProduct = null;
    let minDistance = Number.MAX_VALUE;

    // 모든 상품 체크
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

        // 트랜지션 상태 변경
        setTransitionState('fadeOut');

        requestAnimationFrame(() => {
          setTransitionState('changing');

          requestAnimationFrame(() => {
            setTransitionState('fadeIn');
          });
        });

        // 현재 상품의 컬렉션 이름 확인
        const productCollectionName = productCollectionMap.current[closestProduct];

        // 다른 컬렉션으로 변경되었음을 감지하되 Redux 상태만 변경 (DOM 변경 없음)
        if (productCollectionName && productCollectionName !== selectedCollection && !hasManuallyChangedRef.current) {
          // URL만 업데이트 (브라우저 히스토리 변경 없이)
          window.history.replaceState(null, '', `/collection/${productCollectionName}`);

          // Redux 상태 업데이트 - 단, 렌더링에 영향을 주는 상품 목록은 변경하지 않음
          dispatch({
            type: 'collection/updateSelectedCollectionOnly',
            payload: productCollectionName,
          });
        }
      }
    }
  };

  // 컴포넌트 마운트 시 설정
  useEffect(() => {
    // 컴포넌트 마운트 시 첫 번째 상품을 기본 표시 상품으로 설정
    if (displayedProducts.length > 0 && currentVisibleProduct === null) {
      const firstProductId = String(displayedProducts[0].id);
      lastVisibleProductRef.current = firstProductId;
      setCurrentVisibleProduct(firstProductId);
    }

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [displayedProducts]);

  // 메뉴 클릭으로 컬렉션 변경 시 해당 컬렉션의 첫 상품으로 스크롤
  useEffect(() => {
    if (selectedCollection && displayedProducts.length > 0 && !isInitialLoadRef.current) {
      // 수동 컬렉션 변경 플래그 설정
      hasManuallyChangedRef.current = true;

      // 선택된 컬렉션의 첫 번째 상품 찾기
      const collectionFirstProduct = displayedProducts.find((product) => {
        let productCollection = null;

        if (Array.isArray(product.collection)) {
          const collectionObj = product.collection.find(
            (col) => col && typeof col === 'object' && col.collectionName === selectedCollection
          );
          if (collectionObj) {
            productCollection = collectionObj.collectionName;
          }
        } else if (
          product.collection &&
          typeof product.collection === 'object' &&
          product.collection.collectionName === selectedCollection
        ) {
          productCollection = product.collection.collectionName;
        }

        return productCollection === selectedCollection;
      });

      if (collectionFirstProduct) {
        // 첫 번째 상품의 DOM 요소 찾기
        const productId = String(collectionFirstProduct.id);
        const element = productRefs.current[productId];

        if (element) {
          // 해당 요소로 부드럽게 스크롤
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // 현재 표시 상품 업데이트
          setCurrentVisibleProduct(productId);
          lastVisibleProductRef.current = productId;

          // 플래그 초기화를 위한 타이머 설정 (스크롤 완료 후)
          setTimeout(() => {
            hasManuallyChangedRef.current = false;
          }, 1000);
        }
      }
    }
  }, [selectedCollection, displayedProducts]);

  // 현재 상품 객체 찾기
  const currentProduct = currentVisibleProduct
    ? productsMap.current[currentVisibleProduct]
    : displayedProducts.length > 0
      ? displayedProducts[0]
      : null;

  // 상품이 없으면 로딩 표시
  if (!displayedProducts || displayedProducts.length === 0) {
    return <div className="p-4">상품을 불러오는 중...</div>;
  }

  // 트랜지션 클래스 결정
  const getTransitionClass = () => {
    // 스크롤 하지 않은 경우 트랜지션 효과 없이 기본 상태로 표시
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
      <div className="flex flex-col md:flex-row relative">
        {/* 왼쪽: 상품 이미지 (스크롤 될 부분) */}
        <div className="md:w-1/2">
          <div className="space-y-12">
            {/* 모든 상품을 한 번에 렌더링 */}
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                ref={(el) => {
                  if (el) productRefs.current[String(product.id)] = el;
                }}
                data-product-id={String(product.id)}
                data-collection={productCollectionMap.current[String(product.id)]}
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

        {/* 오른쪽: 상품 정보 (섹션 내 sticky로 설정) */}
        <div className="relative">
          {/* 상품 정보 컨테이너 */}
          <div
            ref={productInfoRef}
            className="md:w-[500px] ml-[90px] h-[800px] inline-grid sticky"
            style={{ position: 'sticky', top: '10vh', zIndex: 10 }}
          >
            {currentProduct && (
              <div
                key={currentProduct.id}
                className={`space-y-5 transition-all duration-500 ease-in-out ${getTransitionClass()}`}
              >
                <h3 className="font-diptyque lg:text-heading1 md:text-heading3 h-[58px]">{currentProduct.name}</h3>
                <div className="flex place-content-between">
                  <div className="text-darkgrey-3 text-body3">{currentProduct.type}</div>

                  {currentProduct.options && currentProduct.options.length > 0 && (
                    <div className="flex text-body3 text-darkgrey-3">
                      <div>{currentProduct.options[0].price} €</div>
                      <div className='mx-1'>|</div>
                      <div>{currentProduct.options[0].size}</div>
                    </div>
                  )}
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
                        : '3em', // 약 1.5줄
                    }}
                  >
                    <p className="m-0">{currentProduct.description}</p>
                  </div>

                  {/* ...more 버튼 (접혀있을 때만 표시) */}
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
