export type SerializedUser = {
  id: string;
  name: string | null;
  imageUrl: string | null;
};

export type SerializedPost = {
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
};

export type LikePosts = SerializedPost[];
