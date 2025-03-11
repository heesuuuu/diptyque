import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CollectionMenu = () => {
  // Redux store에서 컬렉션 이름 가져오기
  const { allCollectionNames } = useSelector((state) => state.collection);


  return (
    <div className="collection-menu">
      <ul className="space-y-2">
        {allCollectionNames.map((collection, index) => (
          <li key={index}>
            <Link
              to={`/collection/${encodeURIComponent(collection)}`}
              className="font-diptyque text-body2 hover:text-primary transition-colors"
            >
              {collection}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionMenu;
