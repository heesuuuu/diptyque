import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import Icon from '../../ui/Icon';

const ProductList = () => {
  const dispatch = useDispatch();
  const { categoryInfo } = useSelector((state) => state.product);
  const { title, desc } = categoryInfo;
  const { categoryName } = useParams();
  const location = useLocation();
  const path = location.pathname.split('/');

  useEffect(() => {
    if (path.length === 2) {
      dispatch(productActions.setCategory('euaxdeparfum'));
    } else if (path.length === 3) {
      dispatch(productActions.setCategory(categoryName));
    }
  }, [location.pathname]);

  return (
    <>
      {/* 카테고리 위치 상태 바 */}
      <div className="flex items-center w-full h-[50px] px-[280px] border-t border-b border-grey-1">
        <p className="text-body3">
          Products <Icon name="chevron_right" className="mx-[10px]" /> {title}
        </p>
      </div>

      {/* contents inner */}
      <div className="p-[280px] tablet:p-[60px] mobile:p-4">
        {/* 카테고리 소개 섹션 */}
        <div className="flex flex-col justify-center items-center gap-10 w-[898px] m-auto mb-[280px] tablet:mb-20">
          <h1 className="text-heading1/[160%] text-center">{title}</h1>
          <p className="leading-[160%]">{desc}</p>
        </div>

        {/* 제품 리스트 */}
        <Outlet />
      </div>
    </>
  );
};

export default ProductList;
