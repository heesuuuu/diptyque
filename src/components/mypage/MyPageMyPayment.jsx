import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const MyPageMyPayment = () => {
  const [paymentMethods, setPaymentMethods] = useState([]); // 저장된 결제 방법 리스트
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

      {/* 결제 방법 */}
      <div className="w-full max-w-[535px] h-auto lg:h-[975px] mx-auto mt-[50px] lg:mt-0">
        <h2 className="hidden lg:block font-diptyque text-heading1 border-b pb-[10px] mb-[30px]">My Payment Method</h2>

        {/* 등록된 결제 방법이 없을 경우 */}
        {paymentMethods.length === 0 ? (
          <div className="w-[534px] h-[472px] mx-auto flex flex-col justify-center items-center">
            <p className="text-gray-600 text-center mb-[170px]">You have no registered payment methods.</p>
            <button className="w-full bg-[#2D3540] text-white py-3 text-center">Add payment method</button>
          </div>
        ) : (
          <div className="w-full">{/* 여기에 등록된 결제 방법 리스트 렌더링 */}</div>
        )}
      </div>
    </div>
  );
};

export default MyPageMyPayment;
