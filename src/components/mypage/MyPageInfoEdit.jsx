import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const countryCodes = [
  { code: '+1', label: '🇺🇸' },
  { code: '+44', label: '🇬🇧' },
  { code: '+82', label: '🇰🇷' },
  { code: '+49', label: '🇩🇪' },
  { code: '+33', label: '🇫🇷' },
];

const MyPageInfoEdit = () => {
  const [phoneCode, setPhoneCode] = useState('+33');
  const [phoneNumber, setPhoneNumber] = useState('');
  const location = useLocation();

  // 현재 페이지의 메뉴명 가져오기
  const menuTitles = {
    '/mypage/info': 'My Information',
    '/mypage/order': 'My Orders',
    '/mypage/payment': 'My Payment Method',
    '/mypage/ask': 'Ask for Help',
  };
  const currentTitle = menuTitles[location.pathname] || 'My Page';

  return (
    <div className="max-w-[1760px] w-full mx-auto pt-[219px] pb-[78px] px-[20px] flex flex-col lg:flex-row">
      {/* PC에서만 보이는 좌측 네비게이션 */}
      <nav className="hidden lg:flex w-[300px] flex-shrink-0 flex-col space-y-[10px] ml-[80px]">
        <h2 className="font-diptyque text-heading1 mb-[30px] mt-[30px]">My Page</h2>
        {[
          { path: '/mypage/info', label: 'My Information' },
          { path: '/mypage/order', label: 'My Orders' },
          { path: '/mypage/payment', label: 'My Payment Method' },
          { path: '/mypage/ask', label: 'Ask for Help' },
        ].map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className="flex justify-between items-center text-[20px] py-4 font-diptyque text-black border-b border-gray-300"
          >
            {label}
            <span className="text-black text-xl">›</span>
          </NavLink>
        ))}
      </nav>

      {/* 태블릿/모바일에서 보이는 헤더 */}
      <div className="lg:hidden text-center text-[20px] font-diptyque border-b border-gray-300 pb-4">
        My Page | {currentTitle}
      </div>

      {/* 회원정보 수정 폼 */}
      <div className="w-full max-w-[535px] h-auto lg:h-[975px] mx-auto mt-[50px] lg:mt-0">
        <h2 className="hidden lg:block font-diptyque text-heading1 border-b pb-[10px] mb-[30px]">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">FIRST NAME *</label>
            <input type="text" className="w-full p-3 border border-gray-900 rounded-none text-sm" />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LAST NAME *</label>
            <input type="text" className="w-full p-3 border border-gray-900 rounded-none text-sm" />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mt-[20px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">DATE OF BIRTH *</label>
          <input type="date" className="w-full p-3 border border-gray-900 rounded-none text-sm" />
        </div>

        {/* 전화번호 (국가 코드 + 전화번호 입력) */}
        <div className="mt-[20px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">PHONE NUMBER *</label>
          <div className="flex">
            {/* 국가 코드 선택 */}
            <select
              className="p-3 border border-gray-900 border-r-0 text-sm bg-white"
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label} ({country.code})
                </option>
              ))}
            </select>

            {/* 전화번호 입력 */}
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-900 text-sm"
              placeholder="Enter your number"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="mt-[20px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">EMAIL ADDRESS *</label>
          <input type="email" className="w-full p-3 border border-gray-900 rounded-none text-sm" disabled />
        </div>

        {/* Save Button */}
        <button className="w-full bg-black text-white py-3 mt-[20px]">Save</button>

        {/* Login Information */}
        <div className="mt-[40px]">
          <h2 className="font-diptyque text-heading1 border-b pb-[10px] mb-[30px]">Login Information</h2>

          {/* New Password */}
          <div className="mt-[20px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">NEW PASSWORD *</label>
            <input type="password" className="w-full p-3 border border-gray-900 rounded-none text-sm" />
          </div>

          {/* Confirm New Password */}
          <div className="mt-[20px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">CONFIRM NEW PASSWORD *</label>
            <input type="password" className="w-full p-3 border border-gray-900 rounded-none text-sm" />
          </div>

          {/* Save Button */}
          <button className="w-full bg-black text-white py-3 mt-[20px]">Save</button>
        </div>
      </div>
    </div>
  );
};

export default MyPageInfoEdit;
