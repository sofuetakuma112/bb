import React from "react";
import ProfileForm from "@/app/set-up-profile/form";
import { Icon } from "@/features/ui/icon";
import { getServerAuthSession } from "@/server/auth";

export default async function SetUpProfilePage() {
  const session = await getServerAuthSession();
  const currentUser = session.user;

  return (
    <div className="flex h-screen flex-col items-center justify-start pt-12">
      <h1 className="text-5xl font-bold text-blue-300">BeauBelle</h1>
      <ProfileForm userId={currentUser.id} />
      <Icon name="bee" className="mx-auto h-[215px] w-full max-w-[444px]" />
    </div>
  );
}
