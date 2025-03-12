import { createSlice } from '@reduxjs/toolkit';
import perfumeData from '../../data/perfume_updated.json';
import diffuserData from '../../data/diffuser_updated.json';
import candleData from '../../data/candle_updated.json';
import bodyData from '../../data/body_updated.json';

// 데이터 배열 평탄화 - 중첩된 배열을 하나의 배열로 만들기
const flattenData = (dataArray) => {
  let result = [];
  if (!Array.isArray(dataArray)) return result;

  dataArray.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(flattenData(item));
    } else {
      result.push(item);
    }
  });
  return result;
};

// collection 배열에서 collectionName만 추출
const getCollectionNames = (dataArray) => {
  if (!dataArray) return [];

  const flatData = flattenData(dataArray);
  let result = [];

  flatData.forEach((item) => {
    if (item && typeof item === 'object' && item.collection) {
      if (Array.isArray(item.collection)) {
        item.collection.forEach((col) => {
          if (
            col &&
            typeof col === 'object' &&
            col.collectionName &&
            typeof col.collectionName === 'string' &&
            col.collectionName.trim() !== ''
          ) {
            result.push(col.collectionName);
          }
        });
      }
    }
  });

  return [...new Set(result)];
};

const perfumeNames = getCollectionNames(perfumeData);
const diffuserNames = getCollectionNames(diffuserData);
const candleNames = getCollectionNames(candleData);
const bodyNames = getCollectionNames(bodyData);

const allNames = [...perfumeNames, ...diffuserNames, ...candleNames, ...bodyNames];

const uniqueNames = [...new Set(allNames)].sort();

console.log('Collection Names:', uniqueNames);

const initialState = {
  allCollectionNames: uniqueNames,
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    update: (state, action) => {},
  },
  extraReducers: (builder) => {},
});

export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;
