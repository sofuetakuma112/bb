import type { User } from "@/features/types/models/user";

export type SerializedUser = {
  id: string;
  name: string | null;
  imageUrl: string | null;
};

export type SerializedLikedPost = {
  id: string;
  prompt: string;
  imageUrl: string | null;
  analysisResult: boolean | null;
  likeCount: number;
  superLikeCount: number;
  userId: string;
  hashTags: unknown;
  imageName: string;
  imageAge: string;
  imageBirthplace: string | null;
  user: SerializedUser;
  superLikeUser: User | null;
};

export type LikePosts = SerializedLikedPost[];
