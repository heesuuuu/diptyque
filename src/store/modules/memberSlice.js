import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    
};
export const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {},
});
export const memberActions = memberSlice.actions;
export default memberSlice.reducer;