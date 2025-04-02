import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addReserve(state, action) {
      state.push({ ...action.payload });
    },
    emptyCart(state) {
      state.length = 0;
    },
  },
});

const { actions, reducer } = cartSlice;
export const { addReserve, emptyCart } = actions;

export default reducer;
