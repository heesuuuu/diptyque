import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Icon from '../../ui/Icon';
import './style.scss';
import { categoryActions } from '../../store/modules/categorySlice';
import CustomSelect from '../../ui/CustomSelect';
import OlfactoryItem from '../../components/productList/OlfactoryItem';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { categoryName } = useParams();
  const [sortTxt, setSortTxt] = useState('');
  const [clickedFilter, setClickedFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { categoryInfo } = useSelector((state) => state.category);
  const { title, desc } = categoryInfo;
  const path = location.pathname.split('/');

  // 스크롤 관련 상태 추가
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    setIsMobile(isMobileScreen());
  }, [window.innerWidth]);

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
      dispatch(categoryActions.setCategory(categoryName));
      dispatch(categoryActions.getCategory(categoryName));
    }

    return () => {
      dispatch(categoryActions.resetCategory());
    };
  }, [location.pathname]);

  useEffect(() => {
    dispatch(categoryActions.setSortedList(sortTxt));
  }, [sortTxt]);

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

  // 화면이 모바일 크기인지 확인
  const isMobileScreen = () => {
    return window.innerWidth <= 768;
  };

  const options = [
    { value: '', label: 'Sort' },
    { value: 'created_at', label: 'Recent' },
    { value: 'sales', label: 'Popular' },
    { value: 'name', label: 'Name' },
  ];

  const olfactories = [{ name: 'woody' }, { name: 'floral' }, { name: 'amber' }, { name: 'cytrus' }];

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
        <div className="px-[280px] pb-sec-gap-pc tablet:px-[60px] mobile:px-4">
          {/* 카테고리 소개 섹션 */}
          <div className="flex flex-col justify-center items-center gap-10 w-[56.125rem] tablet:w-[31.125rem] mobile:w-[22.375rem] m-auto my-[12.5rem] tablet:my-[9.375rem] mobile:my-[6.25rem]">
            <h1 className="text-heading1/[160%] tablet:text-heading1-m text-center">{title}</h1>
            <p className="text-body2/[160%] tablet:text-body2-m/[150%]">{desc}</p>
          </div>

          <div className="relative mb-[6.25rem]">
            {(title === 'Eaux de parfum' || title === 'Eaux de toilette' || title === 'Solid perfumes') && (
              <>
                <ul
                  className={`flex olfactory justify-center mobile:justify-start mobile:-translate-y-full mobile:pb-5 ${clickedFilter ? 'absolute' : 'hidden'}`}
                >
                  <li className="flex justify-center items-center w-[2.8125rem] h-[2.8125rem] border border-black border-r-0 mobile:hidden">
                    <Icon name="tune" size={22} />
                  </li>
                  {olfactories.map((item, idx) => (
                    <OlfactoryItem key={idx} item={item} />
                  ))}
                </ul>
                {isMobile && (
                  <div
                    onClick={() => {
                      setClickedFilter(!clickedFilter);
                    }}
                    className="flex justify-center items-center w-[2.8125rem] h-[2.8125rem] border border-black cursor-pointer border-r"
                  >
                    <Icon name="tune" size={22} />
                  </div>
                )}
              </>
            )}

            <div className="absolute top-0 right-0 w-[12.875rem] h-[2.8125rem]">
              <CustomSelect
                options={options}
                defaultValue={options[0]}
                onChange={(option) => setSortTxt(option.value)}
                className="px-4 py-[0.625rem]"
              />
            </div>
          </div>

          {/* 제품 리스트 */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProductList;
