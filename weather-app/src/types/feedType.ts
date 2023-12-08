export interface User {
  memberId: number;
  email: string;
  name: string;
  imageUrl: string;
  nickName: string;
}

export interface Post {
  postId: number;
  userId: number;
  userImg: string;
  userEmail: string;
  userName: string;
  nickName: string;
  date: string;
  location: string;
  temperature: number;
  mediaUrls: string[];
  content: string;
  liked: boolean;
  likedCount: number;
  hashtagNames: string[];
}
