import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: () => null,
  },
});

const connectionReducer = connectionSlice.reducer;
const connectionAction = connectionSlice.actions;

export { connectionReducer, connectionAction };
