import { createSlice } from '@reduxjs/toolkit';
import perfumeData from '../../data/perfume_updated.json';
import diffuserData from '../../data/diffuser_updated.json';
import candleData from '../../data/candle_updated.json';
import bodyData from '../../data/body_updated.json';

// const getItemsColName = (dataArray) => {
//   return dataArray.fiter((item) => item.collection !== null && item.collection !== undefined);
// };

// const perfumeColName = getItemsColName(perfumeData);
// const diffuserColName = getItemsColName(diffuserData);
// const candleColName = getItemsColName(candleData);
// const bodyColName = getItemsColName(bodyData);

// 모든 컬렉션 이름 합침
// const allCollections = [...perfumeColName, ...diffuserColName, ...candleColName, ...bodyColName];

// // 컬렉션 이름 배열로 생성
// const AllCollectionNames = [...new Set(allCollections.map((item) => item.collection))];

// const collectionGroups = {};
// allCollections.forEach((collectionName) => {
//   collectionGroups[collectionName] = allCollections.filter((item) => item.collection === collectionName);
// });

const initialState = {};
export const collectionSlice = createSlice({
//   getItemsColName,
//   AllCollectionNames,
  name: 'collection',
  initialState,
  reducers: {
    update: (state, action) => {},
  },

  extraReducers: (builder) => {},
});
export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;
