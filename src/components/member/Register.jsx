import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import checkedIcon from '../../assets/icons/checkbox-checked.svg';
import uncheckedIcon from '../../assets/icons/checkbox-unchecked.svg';
import { login } from '../../store/modules/memberSlice';

const countryCodes = [
  { code: '+1', label: '🇺🇸' },
  { code: '+44', label: '🇬🇧' },
  { code: '+82', label: '🇰🇷' },
  { code: '+49', label: '🇩🇪' },
  { code: '+33', label: '🇫🇷' },
];

const checkboxIcons = {
  checked: checkedIcon,
  unchecked: uncheckedIcon,
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phoneCode: '+1',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    marketing: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) =>
      type === 'checkbox'
        ? {
            ...prev,
            marketing: checked ? [...prev.marketing, value] : prev.marketing.filter((item) => item !== value),
          }
        : { ...prev, [name]: value }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('INVALID LOGIN OR PASSWORD.');
      return;
    }
    const userData = { ...form, phone: `${form.phoneCode} ${form.phone}` };
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch(login(userData));
    alert('회원가입 성공!');
    navigate('/signin');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white p-8 w-full max-w-[450px]">
        <h2 className="font-diptyque text-heading1 text-center mb-8">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ 이름 입력 필드 */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="text-sm font-semibold text-gray-900 block mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-900 text-sm"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm font-semibold text-gray-900 block mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-900 text-sm"
                required
              />
            </div>
          </div>

          {/* ✅ 생년월일 입력 필드 */}
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-1">Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full p-3 border border-gray-900 text-sm"
              required
            />
          </div>

          {/* ✅ 전화번호 입력 필드 */}
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-1">Phone Number *</label>
            <div className="flex">
              <select
                className="p-3 border border-gray-900 text-sm bg-white"
                value={form.phoneCode}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    phoneCode: e.target.value,
                    phone: '',
                  }))
                }
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.label} ({country.code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-900 text-sm"
                placeholder="Enter your number"
                required
              />
            </div>
          </div>

          {/* ✅ 이메일 입력 필드 */}
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-900 text-sm"
              required
            />
          </div>

          {/* ✅ 비밀번호 입력 필드 */}
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-1">Password *</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-900 text-sm"
              required
            />
          </div>

          {/* ✅ 비밀번호 확인 필드 */}
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-1">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-900 text-sm"
              required
            />
          </div>

          {/* ✅ 마케팅 동의 체크박스 */}
          <div>
            <p className="text-gray-700 text-sm">Get news and thoughtful gifts selected just for you</p>
            {/* ✅ By Email과 By SMS를 양 끝으로 정렬 */}
            <div className="flex justify-between items-center mt-2">
              {['email', 'sms and phone'].map((type) => (
                <label key={type} className="flex items-center text-sm text-gray-900 cursor-pointer">
                  <img
                    src={form.marketing.includes(type) ? checkboxIcons.checked : checkboxIcons.unchecked}
                    alt={type}
                    className="w-5 h-5 mr-2"
                  />
                  <input type="checkbox" name="marketing" value={type} onChange={handleChange} hidden />
                  By {type.toUpperCase()}
                </label>
              ))}
            </div>
            {/* ✅ By Post는 아래 정렬 */}
            <label className="flex items-center text-sm text-gray-900 cursor-pointer mt-2">
              <img
                src={form.marketing.includes('post') ? checkboxIcons.checked : checkboxIcons.unchecked}
                alt="post"
                className="w-5 h-5 mr-2"
              />
              <input type="checkbox" name="marketing" value="post" onChange={handleChange} hidden />
              By POST
            </label>
          </div>

          {/* ✅ 회원가입 버튼 */}
          <button
            type="submit"
            className="w-full h-[45px] flex justify-center items-center bg-[#5F5F5F] text-white text-body3 hover:bg-black transition"
          >
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
