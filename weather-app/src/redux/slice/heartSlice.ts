// slice/heartSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface HeartState {
  [key: string]: number;
}

const initialState: HeartState = {};

export const toggleLike = createAsyncThunk(
  "heart/toggleLike",
  async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
    const response = await axios({
      method: isLiked ? "delete" : "post",
      url: `/api/feed/posts/${postId}/hearts`,
    });
    return { postId, heartCount: response.data.heartCount };
  }
);

const heartSlice = createSlice({
  name: "heart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      const { postId, heartCount } = action.payload;
      state[postId] = heartCount; // 좋아요 개수 업데이트
    });
  },
});

export default heartSlice.reducer;
