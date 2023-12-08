import axios from "axios";

interface GetPostsParams {
  page: number;
  size: number;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getPosts = async ({ page, size }: GetPostsParams) => {
  const response = await axios.get(`${BASE_URL}/posts`, {
    params: { page, size },
    headers: {
      Authorization: `${localStorage.getItem("access_token")}`,
    },
  });
  return response.data;
};

const toggleLike = async (postId: number) => {
  const response = await axios.post(
    `${BASE_URL}/post/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `${localStorage.getItem("access_token")}`,
      },
    }
  );
  return response;
};

const fetchHeartUsers = async (postId: number) => {
  const response = await axios.get(`${BASE_URL}/post/${postId}/likers`);
  return response.data;
};

const getUserPosts = async (
  nickName: string,
  { page, size }: GetPostsParams
) => {
  const response = await axios.get(`${BASE_URL}/posts/user/${nickName}`, {
    params: { page, size },
    headers: {
      Authorization: `${localStorage.getItem("access_token")}`,
    },
  });
  return response.data;
};

const getTagPosts = async (tag: string, { page, size }: GetPostsParams) => {
  const response = await axios.get(`${BASE_URL}/posts/hashtag/${tag}`, {
    params: { page, size },
    headers: {
      Authorization: `${localStorage.getItem("access_token")}`,
    },
  });
  return response.data;
};

export { getPosts, toggleLike, fetchHeartUsers, getUserPosts, getTagPosts };
