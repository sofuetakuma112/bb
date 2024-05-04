import React from "react";
import { env } from "@/env";
import SignInForm from "@/components/auth/SignInForm";

type Provider = {
  [key in string]: {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
  };
};

const authStyle: Record<string, { className: string; color: string }> = {
  Discord: {
    className: "bg-blue-600 text-white border border-blue-500",
    color: "blue",
  },
  GitHub: {
    className: "bg-gray-700 text-white border border-gray-700 ",
    color: "gray",
  },
  Google: {
    className: "bg-white text-black border border-black",
    color: "gray",
  },
  Apple: {
    className: "bg-black text-white border border-black",
    color: "gray",
  },
};

export default async function LoginPage() {
  const providers = await fetch(
    `${env.NEXT_SERVER_URL}/api/auth/providers`,
  ).then((res) => res.json() as Promise<Provider>);

  return (
    <div className="flex h-screen flex-col items-center justify-start pt-12">
      <h1 className="text-5xl font-bold text-blue-300">BeauBelle</h1>
      <h2 className="pt-32 text-center text-2xl font-semibold">
        はじめまして
        <br />
        BeauBelleへようこそ
      </h2>
      <div className="flex flex-1 flex-col items-center pt-32">
        {Object.values(providers ?? {}).map((provider) => {
          const item = authStyle[String(provider?.name)];
          return (
            <SignInForm
              key={provider.id}
              providerId={provider.id}
              providerName={provider.name}
              className={item?.className}
            />
          );
        })}
      </div>
    </div>
  );
}
