import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPerfumes } from '../../store/modules/promotionSlice';
import { Link } from 'react-router-dom';

const ProductSec = ({ season }) => {
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

  const currentSeason = SeasonItems.find((item) => item.title === season) || SeasonItems[0];

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

  const seasonProducts = perfumesByNote[currentSeason.note] || [];

  return (
    <div className="text-center mb-16 mt-[300px]" id={`section-${currentSeason.title.toLowerCase()}`}>
      <h3 className="text-display3 mb-[150px]">{currentSeason.title}</h3>
      <div className="flex flex-col items-center place-content-between md:flex-row gap-8">
        {/* left */}
        <div className="w-full md:w-[437px]">
          <div className="mb-6">
            <img
              src={currentSeason.img.find((img) => img.type === 'color').url}
              alt={currentSeason.img.find((img) => img.type === 'color').alt}
              className="mx-auto mb-4"
            />
            <div className="text-lg font-medium mt-2 capitalize text-heading2 font-diptyque">{currentSeason.note}</div>
          </div>
        </div>

        {/* 오른쪽 - 상품 목록 */}
        <div>
          <div className="grid grid-flow-col grid-row-4 gap-4">
            {seasonProducts.map((perfume) => (
              <Link to={`/product/detail/${perfume.id}`} key={perfume.id}>
                <div className="flex flex-col">
                  {perfume.options && perfume.options[0] && perfume.options[0].images && (
                    <img src={perfume.options[0].images.thumbnail.default} alt={perfume.name} className="w-[326px]" />
                  )}
                  {/* 상품 설명 */}
                  <div className="w-[326px] space-y-[10px] mt-5">
                    <h3 className="text-heading3 text-left">{perfume.type}</h3>
                    <p className="text-body3 text-grey-4 text-left line-clamp-2">{perfume.description}</p>
                    <div className="text-body3 text-right">
                      {perfume.options && perfume.options[0] && <span>${perfume.options[0].price}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSec;
