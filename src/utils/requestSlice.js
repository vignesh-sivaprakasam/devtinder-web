import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (store, action) => action.payload,
  },
});

const requestReducer = requestSlice.reducer;
const requestActions = requestSlice.actions;

export { requestReducer, requestActions };
