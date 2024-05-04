import { notFound } from "next/navigation";
import { api } from "@/trpc/server";

async function getUser(userId: string) {
  // const { data: user } = await fetchApi<UserResponse>(`/users/${userId}`, {
  //   cache: 'no-store',
  //   next: { tags: [`/users/${userId}`] },
  // });

  const user = await api.user.show({
    id: userId,
  });

  if (user == null) notFound();

  return { user };
}

// async function getCurrentUser() {
//   const { data: user } = await fetchApi<UserResponse>(`/current_user`, {
//     cache: "no-store",
//     next: { tags: [`/current_user`] },
//   });

//   if (user == null) notFound();

//   return { user };
// }

export { getUser };
