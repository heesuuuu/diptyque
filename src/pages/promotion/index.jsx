import React from 'react';
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
        <div className="relative">
          {/* 장미 */}
          <img
            className="absolute top-0 right-0 z-0"
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-s01-1.png?raw=true"
            alt=""
          />

          {/* 오렌지 */}
          <img
            className="absolute top-[26%] right-0 z-0"
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-s03.png?raw=true"
            alt=""
          />
          <img
            className="absolute top-[26%] left-0 z-0 w-[219px] translate-x-[-40%] "
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-s02.png?raw=true"
            alt=""
          />

          {/* 나무 */}
          <img
            className="absolute top-[52%] left-0 z-0 w-[10%]"
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-a01-01.png?raw=true"
            alt=""
          />
          <img
            className="absolute top-[54%] right-0 z-0"
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-a01-02.png?raw=true"
            alt=""
          />
          {/* Musk */}
          <img
            className="absolute top-[80%] right-0 z-0 translate-x-[22%] w-[35%]"
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-w01.png?raw=true"
            alt=""
          />
          <div className="relative z-10">
            <ProductSec />
          </div>
        </div>
      </div>

      {/* End Section */}
      <div className="mx-[50px]">
        <EndSec />
      </div>

      {/* 마무리 멘트 section */}
      <div>
        <EndDesSec />
      </div>
    </div>
  );
};

export default Promotion;
