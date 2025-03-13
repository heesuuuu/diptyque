import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import Icon from '../../ui/Icon';
import './style.scss';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryInfo } = useSelector((state) => state.product);
  const { title, desc } = categoryInfo;
  const { categoryName } = useParams();
  const location = useLocation();
  const path = location.pathname.split('/');

  // 스크롤 관련 상태 추가
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      // 페이지 최상단 여부 확인
      setIsAtTop(currentPosition <= 50);

      // 스크롤 방향 감지
      setIsScrollingUp(scrollPosition > currentPosition);

      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);

  useEffect(() => {
    if (path.length === 2) {
      navigate('/product/eauxdeparfum');
    } else if (path.length === 3) {
      dispatch(productActions.setCategory(categoryName));
    }
  }, [location.pathname]);

  // 변환 클래스 계산
  const getTransformClass = () => {
    if (isAtTop) {
      // 최상단에 있을 때는 원래 위치
      return 'translate-y-0';
    } else if (isScrollingUp) {
      // 스크롤을 올릴 때는 아래로 이동
      return 'translate-y-header-h';
    } else {
      // 스크롤을 내릴 때는 원래 위치
      return 'translate-y-0';
    }
  };

  return (
    <>
      <div className="mt-header-h">
        {/* 카테고리 위치 상태 바 */}
        <div
          className={`sticky top-0 left-0 z-10 flex items-center w-full h-[50px] tablet:h-11 px-[280px] tablet:px-[60px] mobile:px-4 border-t border-b border-grey-1 text-grey-3 bg-white transition-transform duration-300 ${getTransformClass()}`}
        >
          <p className="text-body3 tablet:text-body3-m">
            Products <Icon name="chevron_right" className="mx-[10px]" /> {title}
          </p>
        </div>

        {/* contents inner */}
        <div className="px-[280px] tablet:px-[60px] mobile:px-4">
          {/* 카테고리 소개 섹션 */}
          <div className="flex flex-col justify-center items-center gap-10 w-[898px] tablet:w-[498px] mobile:w-[358px] m-auto my-[280px] tablet:smy-[150px] mobile:my-[100px]">
            <h1 className="text-heading1/[160%] tablet:text-heading1-m text-center">{title}</h1>
            <p className="text-body2/[160%] tablet:text-body2-m/[150%]">{desc}</p>
          </div>

          <div className="flex">
            <ul className="flex flex-grow olfactory">
              <li>
                <button>WOODY</button>
              </li>
              <li>
                <button>FLORAL</button>
              </li>
              <li>
                <button>AMBER</button>
              </li>
              <li>
                <button>CYTRUS</button>
              </li>
            </ul>
            <select
              name=""
              id=""
              className="flex justify-between w-[12.875rem] h-[2.8125rem] ml-auto px-4 py-[0.6563rem]"
            >
              <option value="">Sort</option>
              <option value="">Recent</option>
              <option value="">Popular</option>
              <option value="">Name</option>
            </select>
          </div>

          {/* 제품 리스트 */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProductList;
