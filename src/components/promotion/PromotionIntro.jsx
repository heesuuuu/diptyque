import React from 'react';

const PromotionIntro = () => {
  return (
    <>
      <section className="w-full h-[800px] flex justify-center items-center relative">
        <div className="w-full text-center">
          <h3 className="text-display1 font-diptyque text-primary mt-[110px] leading-[110px] max-w-[996px] mx-auto ">
            Fragrance designed <br />
            for <br /> every season
          </h3>
        </div>
        <div className="absolute bottom-0 w-full translate-y-[2%]">
          <img
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/main-full.png?raw=true"
            alt=""
            className="w-full"
          />
        </div>
      </section>
      {/* intro 소개 desc */}
      <section className="w-full flex justify-center items-center">
        <div className="text-heading1 font-diptyque text-center w-[896px] items-center">
          Experience the art of fragrance through the changing seasons—embrace the romance of spring weddings, the
          refreshing escape of summer, the cozy warmth of autumn, and the festive magic of winter. Each scent is crafted
          to capture the essence of every moment, turning memories into timeless experiences.
        </div>
      </section>
    </>
  );
};

export default PromotionIntro;
