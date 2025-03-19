import EndDesSec from '../../components/promotion/EndDesSec';
import EndSec from '../../components/promotion/EndSec';
import ProductSec from '../../components/promotion/ProductSec';
import PromotionIntro from '../../components/promotion/PromotionIntro';
import SeasonIntroSec from '../../components/promotion/SeasonIntroSec';

const Promotion = () => {
  return (
    <div className="top-0 space-y-[200px] tablet:space-y-[150px] mobile:space-y-[100px]">
      {/* 프로모션 인트로 section */}
      <PromotionIntro />

      {/* Promotion 설명 section */}
      <div></div>

      <div className="mx-[50px] space-y-[200px]">
        {/* 시즌 hover section */}
        <SeasonIntroSec />

        {/* 계절별 상품 section */}
        <ProductSec />
      </div>

      {/* End Section */}
      <EndSec />

      {/* 마무리 멘트 section */}
      <EndDesSec />
    </div>
  );
};

export default Promotion;
