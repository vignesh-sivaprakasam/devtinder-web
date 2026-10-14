import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (store, action) => action.payload,
    removeRequests: (store, action) => {
      const newRequests = store.requests.filter(
        (r) => r._id !== action.payload,
      );
      return newRequests;
    },
  },
});

const requestReducer = requestSlice.reducer;
const requestActions = requestSlice.actions;

export { requestReducer, requestActions };
