import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    receivedMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { receivedMessage } = chatSlice.actions;
export default chatSlice.reducer;
