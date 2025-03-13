import SearchForm from '../../components/searchResult/SearchForm';
import SearchList from '../../components/searchResult/SearchList';

const SearchResult = () => {
  return (
    <div className="max-w-[1360px] mx-auto">
      <SearchForm />
      <SearchList />
    </div>
  );
};

export default SearchResult;
