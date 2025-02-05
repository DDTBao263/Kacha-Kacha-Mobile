import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";


const editorSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: {
      reducer(state, action) {
        state.user = action.payload;
      },
    }
  },
});

export const {
  setUser,
} = editorSlice.actions;

export default editorSlice.reducer;
