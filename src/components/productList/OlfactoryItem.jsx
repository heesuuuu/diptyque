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
      className={`w-[10.49rem] h-[2.8125rem] border border-black text-black ${selected ? 'bg-black text-white' : ''} ${name !== 'cytrus' && 'border-r-0'}`}
    >
      <button className="w-full h-full">{name.toUpperCase()}</button>
    </li>
  );
};

export default OlfactoryItem;
