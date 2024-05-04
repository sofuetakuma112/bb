import clsx from "clsx";
import Link from "next/link";
import React from "react";
import SignOutForm from "@/components/auth/SignOutForm";
import { MobileMenubar } from "@/components/menubar";
import { Button } from "@/features/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/ui/dialog";
import { Icon } from "@/features/ui/icon";
import { IconDefs } from "@/features/ui/icon/IconDefs";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/features/ui/menubar";
import { getServerAuthSession } from "@/server/auth";

type LogOutDialogProps = {
  children: React.ReactNode;
  asChild?: boolean;
};

function LogOutDialog({ asChild = false, children }: LogOutDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>本当にログアウトしますか？</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <SignOutForm />
          <DialogClose asChild>
            <Button variant="close" className="m-2">
              キャンセル
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type LogOutDialogForPCProps = {
  className?: string;
};

function LogOutDialogForPC({ className }: LogOutDialogForPCProps) {
  return (
    <LogOutDialog asChild>
      <Button
        variant="smOutline"
        sp="menubar"
        className={clsx("hidden sm:flex", className)}
      >
        <Icon name="logout" width="32" height="32" />
      </Button>
    </LogOutDialog>
  );
}

function LogOutDialogForMobile() {
  return (
    <LogOutDialog>
      <button className="mx-auto inline-block py-1.5 text-sm sm:hidden">
        ログアウトする
      </button>
    </LogOutDialog>
  );
}

type UserIconMenuProps = {
  profileUrl: string;
  userId: string;
  className?: string;
};

function UserIconMenu({ profileUrl, userId, className }: UserIconMenuProps) {
  return (
    <Menubar className={clsx("h-full", className)} asChild>
      <MenubarMenu>
        <MenubarTrigger className="block h-full sm:hidden">
          <div className="size-10 cursor-pointer overflow-hidden rounded-full sm:size-16">
            <img
              src={profileUrl}
              alt="プロフィール画像"
              className="object-fit size-full"
            />
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <LogOutDialogForMobile />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem asChild>
            <Link href={`/${userId}/home`} className="flex justify-center">
              ユーザープロフィール
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

type UserProfileProps = {
  profileUrl: string;
  userId: string;
  userName: string;
};

function UserProfile({ profileUrl, userId, userName }: UserProfileProps) {
  return (
    <div className="flex items-center pb-[60px]">
      <Link href={`/${userId}/home`}>
        <div className="size-16 overflow-hidden rounded-lg">
          {/* TODO: Imageコンポーネントに置き換える */}
          <img
            src={profileUrl}
            alt="ユーザープロフィール画像"
            className="size-full object-cover"
          />
        </div>
      </Link>
      <Link href={`/${userId}/home`}>
        <p className="hidden pl-3 text-base font-bold xl:block">{userName}</p>
      </Link>
    </div>
  );
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    userId: string;
  };
}) {
  const session = await getServerAuthSession();
  const user = session.user;
  const userId = params.userId ? params.userId : user.id;
  const links = [
    {
      href: "/home",
      text: "Home",
      icon: (
        <Button variant="smOutline" sp="menubar" className="bg-white-white">
          <Icon name="home" className="size-6 sm:size-7" />
        </Button>
      ),
      selectedIcon: (
        <Button variant="smOutline" sp="menubar" className="bg-accent">
          <Icon name="home" className="size-6 sm:size-7" />
        </Button>
      ),
    },
    {
      href: `/notifications`,
      text: "通知",
      icon: (
        <Button variant="smOutline" sp="menubar" className="bg-white-white">
          <Icon name="notification" className="size-6 sm:size-[28px]" />
        </Button>
      ),
      selectedIcon: (
        <Button variant="smOutline" sp="menubar" className="bg-accent">
          <Icon name="notification" className="size-6 sm:size-[28px]" />
        </Button>
      ),
    },
    {
      href: `/${userId}/following`,
      text: "フォロー一覧",
      icon: (
        <Button variant="smOutline" sp="menubar" className="bg-white-white">
          <Icon name="follow" className="size-7 sm:size-8" />
        </Button>
      ),
      selectedIcon: (
        <Button variant="smOutline" sp="menubar" className="bg-accent">
          <Icon name="follow" className="size-7 sm:size-8" />
        </Button>
      ),
    },
    {
      href: `/${userId}/followers`,
      text: "フォロワー一覧",
      icon: (
        <Button variant="smOutline" sp="menubar" className="bg-white-white">
          <Icon name="follower" className="size-7 sm:size-8" />
        </Button>
      ),
      selectedIcon: (
        <Button variant="smOutline" sp="menubar" className="bg-accent">
          <Icon name="follower" className="size-7 sm:size-8" />
        </Button>
      ),
    },
    {
      href: `/${userId}/likes`,
      text: "いいね一覧",
      icon: (
        <Button variant="smOutline" sp="menubar" className="bg-white-white">
          <Icon name="like" className="size-7 sm:size-8" />
        </Button>
      ),
      selectedIcon: (
        <Button variant="smOutline" sp="menubar" className="bg-accent">
          <Icon name="like" className="size-7 sm:size-8" />
        </Button>
      ),
    },
    {
      href: `/post`,
      text: "投稿",
      icon: (
        <Button variant="smOutline" sp="menubar" className="bg-white-white">
          <Icon name="post" className="size-7 sm:size-8" />
        </Button>
      ),
      selectedIcon: (
        <Button variant="smOutline" sp="menubar" className="bg-accent">
          <Icon name="post" className="size-7 sm:size-8" />
        </Button>
      ),
    },
  ];

  const buttons = [
    {
      text: "ログアウト",
      icon: (
        <>
          <LogOutDialogForPC className="bg-white-white" />
          <UserIconMenu profileUrl={user.image} userId={userId} />
        </>
      ),
    },
  ];

  return (
    <html lang="ja">
      <body className="flex min-h-screen">
        <IconDefs />
        <header className="fixed bottom-0 z-10 h-14 w-full sm:static sm:z-0 sm:flex sm:h-auto sm:w-20 xl:col-span-2 xl:w-[280px]">
          <div
            className="hidden min-h-screen flex-1 flex-col border-r-2 bg-white-white p-2 sm:flex"
            style={{ overflow: "visible" }}
          >
            <UserProfile
              profileUrl={user.image}
              userId={userId}
              userName={user.name}
            />
            <div className="hidden gap-x-8 gap-y-4 sm:grid xl:grid-cols-2 xl:px-6">
              {[...links, ...buttons].map(
                (
                  {
                    href,
                    text,
                    icon,
                  }: { href?: string; text: string; icon: React.ReactNode },
                  i,
                ) =>
                  href ? (
                    <Link
                      className="flex flex-col items-center xl:w-[100px]"
                      href={href}
                      key={`header-link-${i}`}
                    >
                      {icon}
                      <p className="hidden py-1 text-sm xl:block">{text}</p>
                    </Link>
                  ) : (
                    <div
                      className="flex flex-col items-center xl:w-[100px]"
                      key={`header-button-${i}`}
                    >
                      {icon}
                      <p className="hidden py-1 text-sm xl:block">{text}</p>
                    </div>
                  ),
              )}
            </div>
          </div>
          <MobileMenubar icons={[...links, ...buttons]} />
        </header>
        <main className="relative h-screen flex-1" style={{ overflow: "auto" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
