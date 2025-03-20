import { useDispatch, useSelector } from 'react-redux';
import { categoryActions } from '../../store/modules/categorySlice';
import { useEffect, useState } from 'react';

const OlfactoryItem = ({ item }) => {
  const dispatch = useDispatch();
  const { selectedOlfactoryFilters } = useSelector((state) => state.category);
  const [selected, setSelected] = useState(false);
  const { name } = item;

  useEffect(() => {
    const isSelected = selectedOlfactoryFilters.includes(name.toLowerCase());
    setSelected(isSelected);
  }, [selectedOlfactoryFilters, name]);

  const selectOlfactory = () => {
    dispatch(categoryActions.getOlfactoryData({ name, selected }));
  };

  return (
    <li
      onClick={selectOlfactory}
      className={`flex-grow max-w-[8.7417vw] max-h-[2.3438vw] py-3 border border-black text-black ${selected ? 'bg-black text-white' : ''} ${name !== 'cytrus' && 'border-r-0'}`}
    >
      <button className="flex justify-center items-center w-full h-full text-body3">{name.toUpperCase()}</button>
    </li>
  );
};

export default OlfactoryItem;
