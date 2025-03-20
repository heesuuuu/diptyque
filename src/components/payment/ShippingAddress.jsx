import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingAddress = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', address: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Shipping Address:', form);
    navigate('/payment/shipping-method');
  };

  return (
    <div className="max-w-[643px] mx-auto mt-10">
      {/* 페이지 제목 */}
      <h2 className="font-diptyque text-heading1 pb-[10px] mb-[30px]">Shipping Address</h2>

      {/* 배송지 입력 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full p-3 border border-gray-900 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full p-3 border border-gray-900 text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full p-3 border border-gray-900 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address *</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter shipping address"
            className="w-full p-3 border border-gray-900 text-sm"
            required
          />
        </div>

        {/* 버튼 */}
        <button type="submit" className="w-full bg-black text-white py-3 text-center text-sm">
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default ShippingAddress;
