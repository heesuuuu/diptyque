import React from 'react';

const EndSec = () => {
  return (
    <div className="w-full h-[975px] bg-primary relative overflow-hidden ">
      {/* 장미 */}
      <img
        className="absolute bottom-0 translate-y-[10%] "
        src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-s01.png?raw=true"
        alt=""
      />
      {/* 오렌지 */}
      <img
        className="absolute bottom-0 right-0 translate-y-[10%] translate-x-[5%] w-[28%]"
        src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-s03.png?raw=true"
        alt=""
      />
      {/* 나무 */}
      <img
        className="absolute bottom-0 right-[28%]  "
        src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-a01.png?raw=true"
        alt=""
      />

      <div className="flex flex-col items-center justify-center ">
        <img
          src="https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/refs/heads/main/page/Promotion/m-logo01.webp"
          alt=""
          className="w-[240px] mt-[129px]"
        />
        {/* <div className="text-white text-display2 font-diptyque text-center">
          Fragrance designed <br />
          for
          <br /> every season
        </div> */}
        <h3 className="text-white text-center text-display2 font-diptyque mt-[58px] leading-[80px] max-w-[996px] mx-auto ">
          Fragrance designed <br />
          for <br /> every season
        </h3>
      </div>
    </div>
  );
};

export default EndSec;
