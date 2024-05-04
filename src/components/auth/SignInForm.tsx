"use client";

import React from "react";
import { Button } from "@/features/ui/button";
import { signIn } from "next-auth/react";
import clsx from "clsx";

type Props = {
  providerId: string;
  providerName: string;
  className?: string;
};

export default function SignInForm({
  providerId,
  providerName,
  className,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <Button
        className={clsx(
          "my-3 w-72 rounded-lg px-4 py-2 font-bold",
          String(className),
        )}
        onClick={() => void signIn(providerId, { callbackUrl: "/" })}
      >
        {providerName} でログイン
      </Button>
    </div>
  );
}
