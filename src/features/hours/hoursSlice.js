import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const hoursSlice = createSlice({
  name: "hours",
  initialState,
  reducers: {
    setHours: (state, action) => {
      state.value = action.payload;
    },
    clearHours: (state) => {
      state.value = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHours, clearHours } = hoursSlice.actions;

export default hoursSlice.reducer;
