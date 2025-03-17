import { useState } from 'react';
import CustomSelect from '../../ui/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../store/modules/productSlice';

const SelectOption = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const { engravingTxt } = useSelector((state) => state.product);

  const selectOptions = [
    { value: '', label: 'Select' },
    { value: 'classic', label: 'Classic (No Engraving)' },
    { value: 'engraving', label: 'Personalize Your Own Bottle (Custom Engraving)' },
  ];

  const changeInput = (e) => {
    const { value } = e.target;
    dispatch(productActions.setEngravingTxt(value));
  };

  return (
    <div>
      <div
        className={`relative flex tablet:flex-col justify-between items-center mt-[3.75rem] ${selectedOption === 'engraving' ? 'mb-0' : 'mb-[7.5rem]'}`}
      >
        <p className="tablet:w-full tablet:mb-[0.625rem]">Add Personalization</p>
        <div className="w-[28rem] h-12">
          <CustomSelect
            options={selectOptions}
            defaultValue={''}
            onChange={(option) => {
              setSelectedOption(option.value);
            }}
            className="px-4 py-3"
          />
        </div>
      </div>
      {selectedOption === 'engraving' && (
        <div className="relative flex tablet:flex-col justify-between items-center mt-[.625rem] mb-[7.5rem]">
          <label htmlFor="customInput">Custom Engraving</label>
          <input
            onChange={changeInput}
            type="text"
            name="customInput"
            id="customInput"
            value={engravingTxt}
            placeholder="Your bespoke inscription awaits ..."
            className="w-[28rem] px-4 py-3  border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default SelectOption;
