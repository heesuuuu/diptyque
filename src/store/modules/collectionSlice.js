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

// 키워드 배열을 notes 문자열로 변환하는 함수
const processProducts = (products) => {
  return products.map(product => {
    if (product.keyword && Array.isArray(product.keyword)) {
      const notes = product.keyword
        .map(item => typeof item === 'object' && item.note ? item.note : '')
        .filter(Boolean)
        .join(', ');
      
      return { ...product, notes };
    }
    return { ...product, notes: '' }; 
  });
};

// collectionName만 추출하는 함수
const getCollectionNames = () => {
  const collectionNames = [];

  allProducts.forEach((product) => {
    if (Array.isArray(product.collection)) {
      product.collection.forEach((col) => {
        if (col && typeof col === 'object' && col.collectionName) {
          collectionNames.push(col.collectionName);
        }
      });
    }
    else if (product.collection && typeof product.collection === 'object' && product.collection.collectionName) {
      collectionNames.push(product.collection.collectionName);
    }
  });

  return [...new Set(collectionNames)].sort();
};

const processedProducts = processProducts(allProducts);

const initialState = {
  allCollectionNames: getCollectionNames(),
  allProducts: processedProducts,
  selectedCollection: null,
  CollectionProducts: [],
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
      state.CollectionProducts = state.allProducts.filter((product) => {
        if (Array.isArray(product.collection)) {
          return product.collection.some(
            (col) => col && typeof col === 'object' && col.collectionName === action.payload
          );
        } else if (product.collection && typeof product.collection === 'object') {
          return product.collection.collectionName === action.payload;
        }
        return false;
      });
    },
    clearSelection: (state) => {
      state.selectedCollection = null;
      state.CollectionProducts = [];
    },
  },
});

export const { selectCollection, clearSelection } = collectionSlice.actions;
export default collectionSlice.reducer;
