import React, { useState } from 'react';

const PaymentMethod = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardName, setCardName] = useState('');

  return (
    <div className="max-w-[643px] mx-auto mt-10">
      {/* 페이지 제목 */}
      <h2 className="font-diptyque text-heading1 pb-[10px] mb-[30px]">Your Payment Method</h2>

      {/* 카드 선택 */}
      <div className="border border-gray-900 p-5 rounded-md flex items-center gap-3 cursor-pointer">
        <input type="checkbox" id="card" className="w-5 h-5 accent-black" />
        <label htmlFor="card" className="text-sm text-gray-700">
          Use a Credit or Debit Card
        </label>
      </div>

      {/* 카드 번호 입력 */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-900 text-sm"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Enter your card number"
          required
        />
      </div>

      {/* 유효기간 & CVC */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-900 text-sm"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Security Code (CVC) *</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-900 text-sm"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            placeholder="CVC"
            required
          />
        </div>
      </div>

      {/* 카드 소유자 이름 */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-900 text-sm"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Enter name"
          required
        />
      </div>

      {/* 결제 버튼 */}
      <button className="w-full bg-black text-white py-3 text-center text-sm mt-6">Place Order</button>
    </div>
  );
};

export default PaymentMethod;
