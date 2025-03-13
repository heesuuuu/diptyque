// store/modules/collectionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import perfumeData from '../../data/perfume_updated.json';
import diffuserData from '../../data/diffuser_updated.json';
import candleData from '../../data/candle_updated.json';
import bodyData from '../../data/body_updated.json';

// 모든 데이터를 하나의 배열로 합치기
const allProducts = [
  ...perfumeData.map((item) => ({ ...item, category: 'perfume' })),
  ...diffuserData.map((item) => ({ ...item, category: 'diffuser' })),
  ...candleData.map((item) => ({ ...item, category: 'candle' })),
  ...bodyData.map((item) => ({ ...item, category: 'body' })),
];

// collectionName만 추출하는 함수
const getCollectionNames = () => {
  const collectionNames = [];

  allProducts.forEach((product) => {
    // collection이 배열인 경우 (예: [{collectionName: "Eau Rose"}])
    if (Array.isArray(product.collection)) {
      product.collection.forEach((col) => {
        if (col && typeof col === 'object' && col.collectionName) {
          collectionNames.push(col.collectionName);
        }
      });
    }
    // collection이 객체인 경우 (예: {collectionName: "Eau Rose"})
    else if (product.collection && typeof product.collection === 'object' && product.collection.collectionName) {
      collectionNames.push(product.collection.collectionName);
    }
  });

  // 중복 제거 및 정렬
  return [...new Set(collectionNames)].sort();
};

const initialState = {
  allCollectionNames: getCollectionNames(),
  allProducts,
  selectedCollection: null,
  collectionProducts: [],
  loading: false,
  error: null,
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    selectCollection: (state, action) => {
      state.selectedCollection = action.payload;

      // 선택된 collectionName에 해당하는 제품 필터링
      state.collectionProducts = state.allProducts.filter((product) => {
        // collection이 배열인 경우
        if (Array.isArray(product.collection)) {
          return product.collection.some(
            (col) => col && typeof col === 'object' && col.collectionName === action.payload
          );
        }
        // collection이 객체인 경우
        else if (product.collection && typeof product.collection === 'object') {
          return product.collection.collectionName === action.payload;
        }
        return false;
      });
    },
    clearSelection: (state) => {
      state.selectedCollection = null;
      state.collectionProducts = [];
    },
  },
});

export const { selectCollection, clearSelection } = collectionSlice.actions;
export default collectionSlice.reducer;
