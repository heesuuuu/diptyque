import { Outlet } from 'react-router-dom';
import Icon from '../../ui/Icon';

const ProductList = () => {
  return (
    <>
      {/* 카테고리 위치 상태 바 */}
      <div className="flex items-center w-full h-[50px] px-[280px] border-t border-b border-grey-1">
        <p className="text-body3">
          Category <Icon name="chevron_right" className="mx-[10px]" /> Eaux de parfum
        </p>
      </div>

      {/* contents inner */}
      <div className="p-[280px] tablet:p-[60px] mobile:p-4">
        {/* 카테고리 소개 섹션 */}
        <div className="mb-[280px] tablet:mb-20">
          <h1 className="text-heading1/[160%] text-center mb-10">Eaux de parfum</h1>
          <p className="leading-[160%]">
            “An air of curiosity … in a bottle. We find the wondrous in every location, every moment – and that's how
            Diptyque eaux de parfums are born. Each is like a landscape of fragrances, for you to discover or give as a
            gift.”
          </p>
        </div>

        {/* 중첩 라우팅 페이지 들어올 곳 */}
        <Outlet />
      </div>
    </>
  );
};

export default ProductList;
