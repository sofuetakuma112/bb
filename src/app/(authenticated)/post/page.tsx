import React from "react";
import Upload from "@/app/(authenticated)/post/upload";
import { Icon } from "@/features/ui/icon";
import { getServerAuthSession } from "@/server/auth";

export default async function FormPage() {
  const session = await getServerAuthSession();
  return (
    <div className="pb-16 sm:pb-0">
      <Upload userId={session.user.id} />
      <Icon
        name="bee"
        className="mx-auto size-full max-h-[215px] max-w-[444px]"
      />
    </div>
  );
}
