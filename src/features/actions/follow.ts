"use server";

import { revalidateTag } from "next/cache";
import { api } from "@/trpc/server";

async function follow(userId: string) {
  // await fetchApi(`/users/${userId}/follows`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     user_id: userId,
  //   }),
  // });
  await api.follow.create({
    userId,
  });
  revalidateTag(`/users/${userId}`);
}

async function unFollow(userId: string) {
  // await fetchApi(`/users/${userId}/follows`, {
  //   method: "DELETE",
  //   body: JSON.stringify({
  //     user_id: userId,
  //   }),
  // });
  await api.follow.destroy({
    userId,
  });
  revalidateTag(`/users/${userId}`);
}

export { follow, unFollow };
