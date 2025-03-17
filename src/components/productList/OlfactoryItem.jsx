import { useDispatch } from 'react-redux';
import { categoryActions } from '../../store/modules/categorySlice';
import { useEffect, useState } from 'react';

const OlfactoryItem = ({ item }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const { name } = item;
  const data = { name, selected };

  useEffect(() => {}, [{ item }]);

  const selectOlfactory = () => {
    dispatch(categoryActions.getOlfactoryData(data));
    setSelected(!selected);
  };

  return (
    <li
      onClick={selectOlfactory}
      className={`w-[10.49rem] h-[2.8125rem] border border-black text-black ${selected ? 'bg-black text-white' : ''}`}
    >
      <button className="w-full h-full">{name.toUpperCase()}</button>
    </li>
  );
};

export default OlfactoryItem;
