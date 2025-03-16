import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const param = useParams();
  const { categoryData } = useSelector((state) => state.category);
  const { categoryName } = param;

  return (
    <>
      <div className="grid grid-cols-3 gap-10">
        {categoryData.map((item) => (
          <CategoryItem key={item.id} item={item} category={categoryName} />
        ))}
      </div>
    </>
  );
};

export default CategoryList;
