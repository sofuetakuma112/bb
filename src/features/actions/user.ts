"use server";

import { revalidateTag } from "next/cache";
import { uploadImageToS3 } from "@/features/s3";
import { api } from "@/trpc/server";

// async function createUser(token: string, formData: FormData) {
// const userName = formData.get('userName');
// const file = formData.get('file');

// const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/users`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify({
//     name: userName,
//     iconImageUrl: '',
//   }),
// });
// const { id: userId } = (await response.json()) as CreateUserResponse;

// const key = await uploadImageToS3(file as File, 'user');

// await fetchApi(`/users/${userId}`, {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(
//     toSnakeCase({
//       iconImageUrl: key,
//     })
//   ),
// });
// }

async function updateUser(formData: FormData, userId: string) {
  const file = formData.get("file");
  const userName = formData.get("userName");
  let key;

  // file が存在する場合、S3にアップロードしkeyを取得
  if (file && file !== "undefined") {
    key = await uploadImageToS3(file as File, "user");
  }

  // 更新したい情報をオブジェクトとして格納
  const updateData: Record<string, string | undefined> = {};
  if (userName) {
    updateData.name = userName as string;
  }
  if (key) {
    updateData.imageS3Key = key;
  }

  // toSnakeCase関数を使ってキーをスネークケースに変換し、データが存在する場合のみAPIを呼び出し
  if (Object.keys(updateData).length > 0) {
    // await fetchApi(`/users/${userId}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(toSnakeCase(updateData)),
    // });
    await api.user.update({
      id: userId,
      ...updateData,
    });
  }

  revalidateTag(`/users/${userId}`);
  revalidateTag(`/current_user`);
}

export { updateUser };
