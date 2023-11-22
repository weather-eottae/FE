export interface Post {
  userImg: string;
  userId: string;
  date: string;
  location: string;
  temperature: number;
  postId: string;
  imgs: string[];
  heartCount: number;
  text: string;
  tags: string[];
}

export interface User {
  userImg: string;
  userId: string;
}
