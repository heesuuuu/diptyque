import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    
};
export const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {},
});
export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;