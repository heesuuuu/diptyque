import { useState } from 'react';
import Icon from '../../ui/Icon';

const SearchForm = () => {
  const [text, setText] = useState('');

  return (
    <form className=" relative my-[280px] w-[668px] h-[44px] mx-auto border border-darkgrey-3">
      <input type="text" value={text} className="" />
      <button type="submit" className="absolute top-0 right-0 w-[44px] h-[44px]">
        <Icon name="search" />
      </button>
    </form>
  );
};

export default SearchForm;
