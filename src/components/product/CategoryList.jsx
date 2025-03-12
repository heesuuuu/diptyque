import perfumeMockupData from '../../data/perfume_updated.json';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const perfumeData = perfumeMockupData;

  return (
    <>
      <div className="grid grid-cols-3 gap-10">
        {perfumeData.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default CategoryList;
