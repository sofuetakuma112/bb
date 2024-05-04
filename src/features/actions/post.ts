"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImageToS3 } from "@/features/s3";
import { api } from "@/trpc/server";

async function createPost(formData: FormData, userId: string) {
  const file = formData.get("file") as File;

  const imageName = formData.get("imageName") as string;
  const imageAge = formData.get("imageAge") as string;
  const prompt = formData.get("prompt") as string;

  const hashTag = formData.get("hashTag") as string;
  const hashTagsArray = hashTag.split(" ");

  const key = await uploadImageToS3(file, "post");

  // await fetchApi(`/posts`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(
  //     toSnakeCase({
  //       imageUrl: key,
  //       imageName,
  //       imageAge,
  //       prompt,
  //       hashTags: hashTagsArray,
  //     })
  //   ),
  // });
  api.post.create({
    imageName,
    imageAge,
    prompt,
    hashTags: hashTagsArray,
    imageS3Key: key,
  });

  redirect(`/${userId}/home`);
}

async function deletePost(postId: string, userId: string) {
  // await fetchApi(`/posts/${postId}`, {
  //   method: "DELETE",
  //   body: JSON.stringify({
  //     post_id: postId,
  //   }),
  // });
  await api.post.destroy({
    postId,
  });
  revalidateTag(`/users/${userId}/posts`);
}

export { createPost, deletePost };
