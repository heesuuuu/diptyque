// components/collection/CollectionMenu.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCollection } from '../../store/modules/collectionSlice';

const CollectionMenu = () => {
  const dispatch = useDispatch();
  const { allCollectionNames, selectedCollection } = useSelector((state) => state.collection);

  const handleCollectionClick = (collection) => {
    dispatch(selectCollection(collection));
  };

  return (
    <div className="collection-menu">
      <ul className="space-y-[10px]">
        {allCollectionNames.map((collection, index) => (
          <li key={index}>
            <div
              onClick={() => handleCollectionClick(collection)}
              className={`font-diptyque text-heading2 transition-colors cursor-pointer ${
                selectedCollection === collection ? 'text-primary' : ''
              }`}
            >
              {collection}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionMenu;
