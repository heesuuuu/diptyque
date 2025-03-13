import { useEffect, useRef } from 'react';
import Icon from '../../ui/Icon';

const SearchForm = ({ onChange, text }) => {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <form className=" relative my-[280px] w-[668px] h-[44px] mx-auto border border-darkgrey-3">
      <input type="text" value={text} ref={searchRef} onChange={onChange} className="mx-4 my-2"></input>
      <button type="submit" className="absolute top-0 right-0 w-[44px] h-[44px]">
        <Icon name="search" />
      </button>
    </form>
  );
};

export default SearchForm;
