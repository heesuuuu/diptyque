import React, { useState, useEffect } from 'react';

const SeasonIntroSec = () => {
  const [hoveredSeason, setHoveredSeason] = useState('Spring');
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentImageAlt, setCurrentImageAlt] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const getColorImageUrl = (seasonTitle) => {
    const season = SesonItem.find((item) => item.title === seasonTitle);
    if (season) {
      const colorImage = season.img.find((img) => img.type === 'color');
      return colorImage ? colorImage.url : '';
    }
    return '';
  };

  const getColorImageAlt = (seasonTitle) => {
    const season = SesonItem.find((item) => item.title === seasonTitle);
    if (season) {
      const colorImage = season.img.find((img) => img.type === 'color');
      return colorImage ? colorImage.alt : '';
    }
    return '';
  };

  const scrollToSection = (seasonTitle) => {
    const sectionId = `section-${seasonTitle.toLowerCase()}`;
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setCurrentImageUrl(getColorImageUrl('Spring'));
    setCurrentImageAlt(getColorImageAlt('Spring'));
  }, []);

  useEffect(() => {
    const newImageUrl = getColorImageUrl(hoveredSeason);

    if (newImageUrl !== currentImageUrl) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setCurrentImageUrl(newImageUrl);
        setCurrentImageAlt(getColorImageAlt(hoveredSeason));

        setTimeout(() => {
          setIsTransitioning(false);
        }, 5);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [hoveredSeason]);

  return (
    <div className="flex align-center justify-center justify-between mx-[50px] tablet:mx-[60px] ">
      {/* left Hover Section */}
      <div className="w-[533px] tablet:hidden mr-[190px] tablet:mr-0 flex items-start ">
        <div className="flex flex-col justify-between h-[680px] tablet:h-[100px]  w-full ">
          <img
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/item-line01.png?raw=true"
            alt=""
            className="w-full"
          />
          <div className="flex items-center justify-center">
            <img
              src={currentImageUrl}
              alt={currentImageAlt}
              className={`h-[300px] transition-opacity duration-200 ease-in-out ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>
          <img
            src="https://github.com/2mightyMt/diptyqueStatic1/blob/main/page/Promotion/item-line01.png?raw=true"
            alt=""
            className="w-full"
          />
        </div>
      </div>

      {/* right */}
      <div className="w-[1028px]">
        {SesonItem.map((item) => (
          <div
            key={item.title}
            className={`border-t-[1px] border-solid tablet:b ${hoveredSeason === item.title ? 'border-primary' : 'border-lightgrey-3'} cursor-pointer transition-colors duration-300`}
            onMouseEnter={() => setHoveredSeason(item.title)}
            onClick={() => scrollToSection(item.title)}
          >
            <div className="flex mt-5 mb-11 tablet:flex flex-col">
              <div
                className={`font-diptyque text-display2  w-[583px] transition-colors duration-300 tablet:text-heading1  ${
                  hoveredSeason === item.title ? 'text-primary' : 'text-black'
                }`}
              >
                {item.title}
              </div>
              <div
                className={`transition-colors duration-300 tablet:mt-5 space-y-[10px] ${hoveredSeason === item.title ? 'text-primary' : 'text-black'}`}
              >
                <div>{item.series}</div>
                <div>{item.day}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonIntroSec;
