import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    
};
export const promotionSlice = createSlice({
    name: 'promotion',
    initialState,
    reducers: {},
});
export const promotionActions = promotionSlice.actions;
export default promotionSlice.reducer;