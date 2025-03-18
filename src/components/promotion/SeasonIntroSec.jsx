import React from 'react';

const SeasonIntroSec = () => {
  const imgList = [
    'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/c-01.png?raw=true',
    'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/c-02.png?raw=true',
    'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/c-03.png?raw=true',
    'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/c-04.png?raw=true',
    'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/item-line01.png?raw=true',
  ];
  return (
    <div className="flex  ">
      {/* left Hover Section */}
      <div className="w-[533px] mr-[190px]">
        <div className="text-center space-y-[75px]">
          <img
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/item-line01.png?raw=true"
            alt=""
          />
          <img
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/c-01.png?raw=true"
            alt=" spring-rose"
            className="h-[468px]"
          />
          <img
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/item-line01.png?raw=true"
            alt=""
          />
        </div>
      </div>

      {/* right  */}
      <div className="w-[1028px]">
        {/* Spring */}
        <div className=" border-t-[1px] border-solid border-lightgrey-3 cursor-pointer">
          <div className="flex mt-5 mb-11">
            <div className="font-diptyque text-display2 w-[583px] ">Spring</div>
            <div>
              <div>Floarl Series</div>
              <div>March - May</div>
            </div>
          </div>
        </div>
        {/* Summer */}
        <div className=" border-t-[1px] border-solid border-lightgrey-3 cursor-pointer">
          <div className="flex mt-5 mb-11 ">
            <div className="font-diptyque text-display2 w-[583px]">Summer</div>
            <div>
              <div>Citrus Series </div>
              <div>June – August</div>
            </div>
          </div>
        </div>
        {/* Autumn */}
        <div className=" border-t-[1px] border-solid border-lightgrey-3 cursor-pointer">
          <div className="flex mt-5 mb-11">
            <div className="font-diptyque text-display2 w-[583px]">Autumn</div>
            <div>
              <div>Wood Series</div>
              <div>September – November</div>
            </div>
          </div>
        </div>
        {/* Winter */}
        <div className=" border-t-[1px] border-solid border-lightgrey-3 cursor-pointer">
          <div className="flex mt-5">
            <div className="font-diptyque text-display2 w-[583px]">Winter</div>
            <div>
              <div>Musk Series</div>
              <div>February</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonIntroSec;
