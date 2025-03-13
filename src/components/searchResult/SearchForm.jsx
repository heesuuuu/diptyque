import { useEffect, useRef } from 'react';

const SearchForm = ({ onChange, text }) => {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col items-center pt-[128px] my-[120px] w-[668px] mx-auto">
      <p className="text-heading1 font-diptyque text-center">What Are You Searching For?</p>
      <form className=" relative  ">
        <input
          type="text"
          value={text}
          ref={searchRef}
          onChange={onChange}
          className="text-center text-display2 font-diptyque placeholder-grey-1"
          placeholder="Type Something..."
        ></input>
        <button type="submit" className="absolute top-0 right-0 w-[44px] h-[44px] sr-only" />
      </form>
    </div>
  );
};

export default SearchForm;
