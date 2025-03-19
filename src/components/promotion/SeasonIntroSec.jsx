import React from 'react';

const SeasonIntroSec = () => {
const SesonItem = [
    {
      title: 'Spring',
      series: 'Floral Series',
      day: 'March-May',
      note: 'Rose',
      img: [
        {
          id: 'spring1',
          url: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/c-01.png?raw=true',
          alt: '색상 장미',
          type: 'color',
        },
        {
          id: 'spring1',
          url: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-s01.png?raw=true',
          alt: '드로잉 장미',
          type: 'drawing',
        },
      ],
    },
    {
      title: 'Summer',
      series: 'Citrus Series',
      day: 'June - August',
      note: 'Orange Blossom',
      img: [
        {
          id: 'summer1',
          url: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/c-02.png?raw=true',
          alt: '색상 오렌지',
          type: 'color',
        },
        {
          id: 'summer2',
          url: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-s02.png?raw=true',
          alt: '드로잉 오렌지 과일',
          type: 'drawing',
        },
        {
          id: 'summer3',
          url: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-s04.png?raw=true',
          alt: '드로잉 오렌지 과일2',
          type: 'drawing',
        },
        {
          id: 'summer4',
          url: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-s03.png?raw=true',
          alt: '드로잉 오렌지 꽃',
          type: 'drawing',
        },
      ],
    },
    {
      title: 'Autumn',
      series: 'Wood Series',
      day: 'September-November',
      note: 'Wood',
      img: [
        {
          id: 'wood1',
          url: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/c-03.png?raw=true',
          alt: '색상 나무',
          type: 'color',
        },
        {
          id: 'wood2',
          url: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-a01.png?raw=true',
          alt: '드로잉 나무',
          type: 'drawing',
        },
      ],
    },
    {
      title: 'Winter',
      series: 'Musk Series',
      day: 'January-February',
      note: 'Musk',
      img: [
        {
          id: 'musk1',
          url: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/c-04.png?raw=true',
          alt: '색상 장미',
          type: 'color',
        },
        {
          id: 'musk2',
          url: 'https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/m-d-w01.png?raw=true',
          alt: '드로잉 머스크 꽃',
          type: 'drawing',
        },
      ],
    },
  ];
  return (
    <div className="flex align-center justify-center ">
      {/* left Hover Section */}
      <div className="w-[533px] mr-[190px]">
        <div className="items-center flex flex-col space-y-[75px]">
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
      <div className="w-[1028px] ">
        {/* Spring */}
        {SesonItem.map((item) => (
          <div key={item.title} className=" border-t-[1px] border-solid border-lightgrey-3 cursor-pointer">
            <div className="flex mt-5 mb-11">
              <div className="font-diptyque text-display2 w-[583px] ">{item.title}</div>
              <div>
                <div>{item.series}</div>
                <div>{ item.day }</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonIntroSec;
