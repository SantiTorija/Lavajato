import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {},
  reducers: {
    addClient(state, action) {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.matrícula = action.payload.matrícula;
      state.carType = action.payload.carType;
    },
  },
});

const { actions, reducer } = clientSlice;
export const { addClient } = actions;

export default reducer;
