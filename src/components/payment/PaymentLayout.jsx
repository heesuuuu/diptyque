import React from 'react';
import { Outlet } from 'react-router-dom';
import OrderSummary from './OrderSummary';
import StepNavigation from './StepNavigation'; // ✅ StepNavigation 추가

const PaymentLayout = () => {
  return (
    <div className="max-w-[1320px] w-full mx-auto pt-[190px] pb-[100px] px-[20px] flex flex-col">
      {/* ✅ Step Navigation 추가 */}
      <StepNavigation />

      <div className="flex flex-col lg:flex-row gap-[50px]">
        {/* 좌측: Outlet으로 단계별 컴포넌트 로드 */}
        <div className="flex-1 max-w-[800px]">
          <Outlet />
        </div>

        {/* 우측: 장바구니 요약 */}
        <div className="w-[532px] flex-shrink-0 mt-[96px]">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default PaymentLayout;
