import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CollectionMenu = () => {
  const { allCollectionNames } = useSelector((state) => state.collection);


  return (
    <div className="collection-menu">
      <ul className="space-y-[10px]">
        {allCollectionNames.map((collection, index) => (
          <li key={index}>
            <Link
              to={`/collection/${encodeURIComponent(collection)}`}
              className="font-diptyque text-heading2 transition-colors"
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
