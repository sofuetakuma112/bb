import React from "react";
import { SwipeCards } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/ui/tabs";

export default async function HomePage() {
  return (
    <div className="h-full px-2 sm:px-8">
      {/* TODO: classNameでheight: 100%;を指定できるようにする */}
      <Tabs
        defaultValue="recommend"
        style={{ height: "100%" }}
        className="flex flex-col"
      >
        <div className="flex h-16 sm:flex-1 items-center sm:max-h-[calc(100%-48px-785px-20px)] sm:min-h-[calc(48px+16px_*_2)] sm:py-4">
          <TabsList className="mx-auto flex justify-center" variant="text">
            <TabsTrigger value="recommend" variant="text">
              おすすめ
            </TabsTrigger>
            <div className="mx-4 min-h-full w-0.5 bg-gray-300"></div>
            <TabsTrigger value="following" variant="text">
              フォロー中
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="h-full max-h-[calc(100%-64px-64px)] flex-1 sm:max-h-full">
          <TabsContent
            value="recommend"
            variant="text"
            className="hidden h-full flex-col items-center data-[state=active]:flex"
          >
            <SwipeCards
              tabValue="recommend"
              type="recommended"
            />
          </TabsContent>
          <TabsContent
            value="following"
            variant="text"
            className="hidden h-full flex-col items-center data-[state=active]:flex"
          >
            <SwipeCards
              tabValue="following"
              type="followings"
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
