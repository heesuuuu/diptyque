import { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchForm from '../../components/searchResult/SearchForm';
import SearchList from '../../components/searchResult/SearchList';

const SearchResult = () => {
  const { allProductData } = useSelector((state) => state.product);
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const filteredData = allProductData.filter((item) =>
    item.name.replace(/\s+/g, '').toLowerCase().includes(text.replace(/\s+/g, '').toLowerCase())
  );

  return (
    <div className="max-w-[1360px] mx-auto px-6">
      <SearchForm onChange={onChange} text={text} />
      <SearchList filteredData={filteredData} />
    </div>
  );
};

export default SearchResult;
