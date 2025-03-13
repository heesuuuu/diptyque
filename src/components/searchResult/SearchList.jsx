import { ProductCard } from '../../ui';

const SearchList = ({ filteredData }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {filteredData.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SearchList;
