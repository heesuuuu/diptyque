import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import { useEffect } from 'react';

const CategoryList = () => {
  const param = useParams();
  const { categoryData, olfactoryData, selectedOlfactory } = useSelector((state) => state.category);
  const { categoryName } = param;

  useEffect(() => {}, [olfactoryData, categoryData]);

  return (
    <>
      <div className="grid grid-cols-3 gap-10">
        {selectedOlfactory &&
          olfactoryData.length > 0 &&
          olfactoryData.map((item) => <CategoryItem key={item.id} item={item} category={categoryName} />)}

        {selectedOlfactory && olfactoryData.length <= 0 && <div>No Result</div>}

        {!selectedOlfactory &&
          categoryData.length > 0 &&
          categoryData.map((item) => <CategoryItem key={item.id} item={item} category={categoryName} />)}
      </div>
    </>
  );
};

export default CategoryList;
