import { createSlice } from '@reduxjs/toolkit';
import bodyMockupData from '../../data/body_updated.json';
import candleMockupData from '../../data/candle_updated.json';
import diffuserMockupData from '../../data/diffuser_updated.json';
import notesData from '../../data/notes_data.json';
import perfumeMockupData from '../../data/perfume_updated.json';

const categoryInfo = [
  {
    category: 'eauxdeparfum',
    title: 'Eaux de parfum',
    desc: "An air of curiosity … in a bottle. We find the wondrous in every location, every moment – and that's how Diptyque eaux de parfums are born. Each is like a landscape of fragrances, for you to discover or give as a gift.",
  },
  {
    category: 'eauxdetoilette',
    title: 'Eaux de toilette',
    desc: 'Diptyque eaux de toilette liberate the imagination and awaken the senses. Perfumes that beckon you to take a trip through the different olfactory families in perfumery.',
  },
  {
    category: 'solidperfumes',
    title: 'Solid perfumes',
    desc: 'Applied with the fingertips, this balm perfumes the skin. The case is readily portable and endlessly refillable.',
  },
  {
    category: 'candles',
    title: 'Candles',
    desc: 'Diptyque has been transmuting light into perfume since 1963. With its collection of classic scented candles, the Maison showcases olfactory treasures inspired by nature, and in so doing turns the spotlight on an exceptional herbarium of scents.',
  },
  {
    category: 'diffusers',
    title: 'Diffusers',
    desc: 'Endlessly refillable, the home fragrance diffuser with its rattan reeds disseminates the iconic scents of Diptyque into large spaces – while playing with light in its own unique fashion.',
  },
  {
    category: 'handcare',
    title: 'Hand care',
    desc: 'Hand wash, lotions and creams – a collection of hand care products with skin-friendly formulations. A break given over to well-being and harmony – in pursuit of natural beauty.',
  },
  {
    category: 'bodycare',
    title: 'Body care',
    desc: 'The Maison Diptyque has placed all of its perfuming expertise in the service of natural beauty. Fresh lotion, shower gel, satin oil, body balm … With its skin-friendly formulations, the collection of sensorial skincare products for the body invites you to enjoy a break – one given over to well-being and harmony.',
  },
  {
    category: 'scentedsoaps',
    title: 'Scented soaps',
    desc: "A delicate alchemy of perfume making. Crafted with premium ingredients that gently caress the skin, these scented soaps transform everyday moments into sensorial rituals. Each one carries a distinctive fragrance that, like a small work of art, brings Diptyque's signature elegance to your bathroom.",
  },
];

const initialProductData = {
  id: '',
  olfactory: {},
  name: '',
  type: '',
  description: '',
  story: '',
  options: [
    {
      size: '',
      price: '',
      weight: '',
      images: { thumbnail: { default: '', hover: '' }, detail: '' },
      optionId: '',
    },
  ],
  collection: '',
  sales: '',
  inStock: '',
};

const initialState = {
  productData: initialProductData,
  perfumeData: perfumeMockupData,
  candleData: candleMockupData,
  diffuserData: diffuserMockupData,
  bodyData: bodyMockupData,
  allProductData: [...perfumeMockupData, ...candleMockupData, ...diffuserMockupData, ...bodyMockupData],
  categoryData: [],
  categoryInfo: {},
  popularProducts: [],
  notesData: notesData,
  matchingNotesData: [],
  loading: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      const category = action.payload;
      state.loading = true;
      state.categoryInfo = categoryInfo.find((info) => info.category === category);
    },
    getCategory: (state, action) => {
      const category = action.payload;
      switch (category) {
        case 'eauxdeparfum':
          state.categoryData = state.perfumeData.filter((data) => data.type === 'Eau de parfum');
          break;
        case 'eauxdetoilette':
          state.categoryData = state.perfumeData.filter((data) => data.type === 'Eau de toilette');
          break;
        case 'solidperfumes':
          state.categoryData = state.perfumeData.filter((data) => data.type === 'Refillable solid perfume');
          break;
        case 'candles':
          state.categoryData = state.candleData;
          break;
        case 'diffusers':
          state.categoryData = state.diffuserData;
          break;
        case 'handcare':
          state.categoryData = state.bodyData.filter((data) => data.type.includes('hand'));
          break;
        case 'bodycare':
          state.categoryData = state.bodyData.filter(
            (data) => !data.type.includes('hand') && !data.type.includes('Scented soap')
          );
          break;
        case 'scentedsoaps':
          state.categoryData = state.bodyData.filter((data) => data.type.includes('Scented soap'));
          break;
      }
      state.loading = false;
    },
    setProduct: (state, action) => {
      const id = action.payload;
      state.loading = true;
      const selectedProduct = state.allProductData.find((data) => data.id === id);

      if (selectedProduct) {
        state.productData = selectedProduct;

        // 제품에 notes가 있으면 matchingNotesData도 함께 설정
        if (selectedProduct.notes && Array.isArray(selectedProduct.notes)) {
          state.matchingNotesData = selectedProduct.notes
            .map((note) => {
              return state.notesData.find((data) => data.note === note.note);
            })
            .filter(Boolean); // undefined 값 제거
        } else if (selectedProduct.keyword && Array.isArray(selectedProduct.keyword)) {
          state.matchingNotesData = selectedProduct.keyword
            .map((note) => {
              return state.notesData.find((data) => data.note === note.note);
            })
            .filter(Boolean);
        } else {
          state.matchingNotesData = [];
        }
      }
      state.loading = false;
    },
    getPopularProducts: (state, action) => {},
    resetProduct: (state, action) => {
      state.productData = initialProductData;
      state.matchingNotesData = [];
    },
  },
});
export const productActions = productSlice.actions;
export default productSlice.reducer;
