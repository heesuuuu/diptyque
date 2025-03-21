import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCollection } from '../../store/modules/collectionSlice';

const CollectionMenu = () => {
  const dispatch = useDispatch();
  const {
    allCollectionNames,
    selectedCollection,
    collectionsDescriptions, // 컬렉션 설명 데이터 불러오기
  } = useSelector((state) => state.collection);

  const handleCollectionClick = (collectionName) => {
    // 컬렉션 선택 액션 디스패치 (이 액션에서 설명도 함께 설정됨)
    dispatch(selectCollection(collectionName));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (allCollectionNames.length > 0 && !selectedCollection) {
      dispatch(selectCollection(allCollectionNames[0]));
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [allCollectionNames, selectedCollection, dispatch]);

  return (
    <div className="collection-menu">
      <ul className="space-y-[10px]">
        {allCollectionNames.map((collectionName) => (
          <li key={collectionName}>
            <div
              onClick={() => handleCollectionClick(collectionName)}
              className={`font-diptyque text-heading2 transition-colors cursor-pointer tablet:text-heading3 mobile:text-center ${
                selectedCollection === collectionName ? 'text-gray-200' : ' text-primary'
              }`}
            >
              {collectionName}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionMenu;
