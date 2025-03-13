import { createSlice } from '@reduxjs/toolkit';

const menuData = [
  { id: 1, menuName: 'MAISON', url: '/' },
  { id: 2, menuName: 'PROMOTION', url: '/promotion', twodepth: [{ depthName: 'SPRING | WEDDING' }] },
  {
    id: 3,
    menuName: 'PRODUCTS',
    url: '/product',
    twodepth: [
      {
        depthName: 'PERFUMES',
        depthList: [
          { depthItem: 'Eaux de parfum', url: '/eauxdeparfum' },
          { depthItem: 'Eaux de toilette', url: '/eauxdetoilette' },
          { depthItem: 'Solid perfumes', url: '/solidperfumes' },
        ],
      },
      {
        depthName: 'CANDLES | DIFFUSERS',
        depthList: [
          { depthItem: 'Candles', url: '/candles' },
          { depthItem: 'Diffusers', url: '/diffusers' },
        ],
      },
      {
        depthName: 'BODY',
        depthList: [
          { depthItem: 'Hand care', url: '/handcare' },
          { depthItem: 'Body care', url: '/bodycare' },
          { depthItem: 'Scented soaps', url: '/scentedsoaps' },
        ],
      },
    ],
  },
  { id: 4, menuName: 'COLLECTION', url: '/collection' },
  { id: 5, menuName: 'SERVICES', url: '/service' },
];

const initialState = {
  menuData: menuData,
  activeMenu: null,
  menuOpen: false,
};
export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    clearMenu: (state) => {
      state.activeMenu = null;
    },
    toggleMenu: (state, action) => {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu: (state, action) => {
      state.menuOpen = false;
    },
  },
});
export const navActions = navSlice.actions;
export default navSlice.reducer;
