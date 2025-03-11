import { createSlice } from '@reduxjs/toolkit';
import bodyMockupData from '../../data/body_updated.json';
import candleMockupData from '../../data/candle_updated.json';
import diffuserMockupData from '../../data/diffuser_updated.json';
import perfumeMockupData from '../../data/perfume_updated.json';

const initialState = {
  productData: [],
  perfumeMockupData: perfumeMockupData,
  candleMockupData: candleMockupData,
  diffuserMockupData: diffuserMockupData,
  bodyMockupData: bodyMockupData,
  allProductData: [...perfumeMockupData, ...candleMockupData, ...diffuserMockupData, ...bodyMockupData],
};
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      const id = action.payload;
      state.productData = perfumeMockupData.find((data) => data.id === id);
      //   state.productData = allProductData.find(id);
      // 데이터 완성 시 이렇게 변경
    },
    resetProduct: (state, action) => {
      state.productData = [];
    },
  },
});
export const productActions = productSlice.actions;
export default productSlice.reducer;
