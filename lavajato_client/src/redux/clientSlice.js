import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {},
  reducers: {
    addClient(state, action) {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.marca = action.payload.car.marca;
      state.modelo = action.payload.car.modelo;
      state.carType = action.payload.car.carType;
    },
  },
});

const { actions, reducer } = clientSlice;
export const { addClient } = actions;

export default reducer;
