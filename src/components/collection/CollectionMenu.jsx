import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCollection } from '../../store/modules/collectionSlice';

const CollectionMenu = () => {
  const dispatch = useDispatch();
  const { allCollectionNames, selectedCollection } = useSelector((state) => state.collection);

  const handleCollectionClick = (collectionName) => {
    dispatch(selectCollection(collectionName));

    // URL 업데이트
    window.history.pushState(null, '', `/collection/${collectionName}`);
  };

  useEffect(() => {
    if (allCollectionNames.length > 0 && !selectedCollection) {
      dispatch(selectCollection(allCollectionNames[0]));
    }
  }, [allCollectionNames, selectedCollection, dispatch]);

  return (
    <div className="collection-menu">
      <ul className="space-y-[10px]">
        {allCollectionNames.map((collectionName) => (
          <li key={collectionName}>
            <div
              onClick={() => handleCollectionClick(collectionName)}
              className={`font-diptyque text-heading2 transition-colors cursor-pointer ${
                selectedCollection === collectionName ? 'text-primary' : 'text-gray-200'
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
