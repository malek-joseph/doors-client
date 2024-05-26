/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialMessageState {
  message: string | null;
}

const initialState: InitialMessageState = {
  message: null,
};

const initialMessageSlice = createSlice({
  name: "initialMessage",
  initialState,
  reducers: {
    setInitialMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearInitialMessage: (state) => {
      state.message = null;
    },
  },
});

export const { setInitialMessage, clearInitialMessage } =
  initialMessageSlice.actions;
export const selectInitialMessage = (state: {
  initialMessage: InitialMessageState;
}) => state.initialMessage.message;
export default initialMessageSlice.reducer;
