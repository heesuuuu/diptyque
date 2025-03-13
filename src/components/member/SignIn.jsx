import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import checkedIcon from '../../assets/icons/checkbox-checked.svg';
import uncheckedIcon from '../../assets/icons/checkbox-unchecked.svg';
import { login } from '../../store/modules/memberSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === form.email && storedUser.password === form.password) {
      dispatch(login(storedUser));
      alert('로그인 성공!');
      navigate('/');
    } else {
      alert('INVALID LOGIN OR PASSWORD.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white p-8 w-full max-w-[450px]">
        <h2 className="font-diptyque text-heading1 text-center mb-8">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ 이메일 입력 */}
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address ..."
              className="w-full p-3 border border-gray-900 rounded-none text-sm"
              required
            />
          </div>

          {/* ✅ 비밀번호 입력 */}
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-1">Current Password *</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password ..."
              className="w-full p-3 border border-gray-900 rounded-none text-sm"
              required
            />
          </div>

          {/* ✅ 체크박스 (Remember me) */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setForm({ ...form, rememberMe: !form.rememberMe })}
          >
            <img src={form.rememberMe ? checkedIcon : uncheckedIcon} alt="Remember Me" className="w-5 h-5" />
            <span className="text-sm">Remember me</span>
          </div>

          {/* ✅ 로그인 버튼 */}
          <button
            type="submit"
            className="w-full h-[42px] flex justify-center items-center bg-black text-white text-body3 active:bg-grey-4"
          >
            Sign in
          </button>

          {/* ✅ 구분선 */}
          <p className="text-center text-sm mt-4">Or</p>

          {/* ✅ 회원가입 버튼 */}
          <button
            type="button"
            className="w-full h-[42px] flex justify-center items-center border border-black text-black text-body3 hover:bg-gray-100"
            onClick={() => navigate('/register')}
          >
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
