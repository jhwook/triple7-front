import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  betFlag: false,
  closedFlag: false,
  tokenPopupData: [],
  openedData: [],
  dividObj: '',
  currentPrice: 0,
  pastPrice: 0,
};

export const chart = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setBetFlag: (state, action) => {
      state.betFlag = !state.betFlag;
    },

    setClosedFlag: (state, action) => {
      state.closedFlag = !state.closedFlag;
    },

    setTokenPopupData: (state, action) => {
      state.tokenPopupData = action.payload;
    },

    setOpenedData: (state, action) => {
      state.openedData = action.payload;
    },

    setDividObj: (state, action) => {
      state.dividObj = action.payload;
    },

    setPrice: (state, action) => {
      state.currentPrice = action.payload.currentPrice;
      state.pastPrice = action.payload.pastPrice;
    },
  },
});

export const {
  setBetFlag,
  setClosedFlag,
  setTokenPopupData,
  setOpenedData,
  setDividObj,
  setPrice,
} = chart.actions;

export default chart.reducer;
