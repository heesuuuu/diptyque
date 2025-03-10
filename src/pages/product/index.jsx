import { Outlet } from 'react-router-dom';
import Icon from '../../ui/Icon';

const ProductLayout = () => {
  return (
    <>
      {/* inner용 최상위 div */}
      <div>
        {/* 카테고리 위치 상태 바 */}
        <div>
          <p>
            Category <Icon name="chevron_right" /> Eaux de parfum
          </p>
        </div>

        {/* 카테고리 소개 섹션 */}
        <div>
          <h1>Eaux de parfum</h1>
          <p>
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

export default ProductLayout;
