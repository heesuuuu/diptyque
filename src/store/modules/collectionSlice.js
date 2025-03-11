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

  // 각 아이템 확인
  flatData.forEach((item) => {
    // 아이템이 객체이고 collection 필드가 있는지 확인
    if (item && typeof item === 'object' && item.collection) {
      // collection이 배열인 경우
      if (Array.isArray(item.collection)) {
        // collection 배열의 각 요소 확인
        item.collection.forEach((col) => {
          // collectionName이 있고 유효한 문자열인지 확인
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

  // 중복 제거
  return [...new Set(result)];
};

// 각 데이터에서 collectionName 추출
const perfumeNames = getCollectionNames(perfumeData);
const diffuserNames = getCollectionNames(diffuserData);
const candleNames = getCollectionNames(candleData);
const bodyNames = getCollectionNames(bodyData);

// 모든 이름 합치기
const allNames = [...perfumeNames, ...diffuserNames, ...candleNames, ...bodyNames];

// 중복 제거 후 정렬
const uniqueNames = [...new Set(allNames)].sort();

// 디버깅 로그
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
