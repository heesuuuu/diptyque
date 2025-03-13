import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productActions } from '../../store/modules/productSlice';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { categoryData, loading } = useSelector((state) => state.product);
  const { categoryName } = param;

  useEffect(() => {
    dispatch(productActions.getCategory(categoryName));
  }, [param, loading]);

  if (loading) {
    return <div>Loading . . . </div>;
  }

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
