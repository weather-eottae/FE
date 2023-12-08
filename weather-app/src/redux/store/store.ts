import { configureStore, combineReducers } from "@reduxjs/toolkit";
import chatSlice from "../slice/chatSlice";

const rootReducer = combineReducers({
  chat: chatSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
