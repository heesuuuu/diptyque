import { createSlice } from '@reduxjs/toolkit';
import perfumeData from '../../data/perfume_updated.json';
import diffuserData from '../../data/diffuser_updated.json';
import candleData from '../../data/candle_updated.json';
import bodyData from '../../data/body_updated.json';

const getItemsColName = (dataArray) => {
  return dataArray.fiter((item) => item.collection !== null && item.collection !== undefined);
};

const perfumeColName = getItemsColName(perfumeData);
const diffuserColName = getItemsColName(diffuserData);
const candleColName = getItemsColName(candleData);
const bodyColName = getItemsColName(bodyData);

const allCollections = [...perfumeColName, ...diffuserColName, ...candleColName, ...bodyColName];

const initialState = {};
export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},

  extraReducers: (builder) => {},
});
export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;
