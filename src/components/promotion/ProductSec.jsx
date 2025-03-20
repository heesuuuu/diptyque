import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPerfumes } from '../../store/modules/promotionSlice';
import { Link } from 'react-router-dom';

const ProductSec = () => {
  const perfumes = useSelector(selectPerfumes);
  const [perfumesByNote, setPerfumesByNote] = useState({
    rose: [],
    blossom: [],
    wood: [],
    musk: [],
  });

  const SeasonItems = [
    {
      title: 'Spring',
      series: 'Floral Series',
      day: 'March-May',
      note: 'rose',
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
      note: 'blossom',
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
      note: 'wood',
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
      note: 'musk',
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

  useEffect(() => {
    const roseItems = perfumes
      .filter((item) => item.notes && item.notes.some((n) => n.note.toLowerCase().includes('rose')))
      .slice(0, 4);

    const blossomItems = perfumes
      .filter((item) => item.notes && item.notes.some((n) => n.note.toLowerCase().includes('blossom')))
      .slice(0, 4);

    const woodItems = perfumes
      .filter((item) => item.notes && item.notes.some((n) => n.note.toLowerCase().includes('wood')))
      .slice(0, 4);

    const muskItems = perfumes
      .filter(
        (item) =>
          item.notes &&
          item.notes.some((n) => {
            const noteLower = n.note.toLowerCase();
            return noteLower.includes('musk') || noteLower.includes('musks');
          })
      )
      .slice(0, 4);

    setPerfumesByNote({
      rose: roseItems,
      blossom: blossomItems,
      wood: woodItems,
      musk: muskItems,
    });
  }, [perfumes]);

  // 특정 시즌 섹션 렌더링 함수
  const renderSeasonSection = (season) => {
    const seasonProducts = perfumesByNote[season.note] || [];
    if (seasonProducts.length === 0) {
      return null;
    }

    return (
      <div
        id={`section-${season.title.toLowerCase()}`}
        className="text-center mb-16 mt-[300px] tablet:mt-[150px] "
        key={season.title}
      >
        <h3 className="text-display3 mb-[80px]">{season.title}</h3>
        <div className="flex flex-col items-center justify-between place-content-between tablet:flex-row gap-8 tablet:gap-4">
          {/* left */}
          <div className="w-full md:w-[437px] tablet:hidden">
            <div className="mb-6 tablet:mb-0">
              {season.img && season.img.length > 0 && season.img.find((img) => img.type === 'color') && (
                <img
                  src={season.img.find((img) => img.type === 'color').url}
                  alt={season.img.find((img) => img.type === 'color').alt}
                  className="mx-auto mb-4"
                />
              )}
              <div className="text-lg font-medium mt-2 capitalize text-heading2 font-diptyque">{season.note}</div>
            </div>
          </div>

          {/* 오른쪽 - 상품 목록 */}
          <div className="overflow-hidden tablet:w-[648px] mx-auto">
            <div className="grid grid-flow-col grid-row-4 gap-4  ">
              {seasonProducts.map((perfume) => {
                if (!perfume || !perfume.options || perfume.options.length === 0) {
                  return null;
                }

                const thumbImg = perfume.options[0].images.thumbnail.default;
                const hoverImg = perfume.options[0].images.thumbnail.hover || thumbImg;

                return (
                  <Link
                    to={`/product/detail/${perfume.id}`}
                    key={perfume.id}
                    className="relative flex flex-col justify-between gap-[0.625rem] cursor-pointer group tablet:"
                  >
                    <div className="relative">
                      <img
                        className="w-[326px] tablet:w-[200px] group-hover:opacity-0 transition-all ease-in-out duration-700"
                        src={thumbImg}
                        alt={perfume.name}
                      />
                      <img
                        className="absolute top-0 left-0 w-[326px] tablet:w-[200px] opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-700"
                        src={hoverImg}
                        alt={perfume.name}
                      />
                    </div>

                    {/* 상품 설명 */}
                    <div className="w-[326px] tablet:w-[200px] space-y-[10px] mt-5">
                      <h3 className="text-heading3 text-left ">{perfume.type}</h3>
                      <p className="text-body3 text-grey-4 text-left line-clamp-2 tablet:line-clamp-4">
                        {perfume.description}
                      </p>
                      <div className="text-body3 text-right">
                        {perfume.options && perfume.options[0] && <span>${perfume.options[0].price}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderSeasonSection(SeasonItems[0])}
      {renderSeasonSection(SeasonItems[1])}
      {renderSeasonSection(SeasonItems[2])}
      {renderSeasonSection(SeasonItems[3])}
    </>
  );
};

export default ProductSec;
