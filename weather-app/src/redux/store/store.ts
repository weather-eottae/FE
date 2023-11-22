import { configureStore, combineReducers } from "@reduxjs/toolkit";
import chatSlice from "../slice/chatSlice";
import heartReducer from "../slice/heartSlice";

const rootReducer = combineReducers({
  chat: chatSlice,
  likes: heartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
