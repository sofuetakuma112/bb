import clsx from 'clsx';
import React from 'react';
import { Card } from '@/features/ui/card';
import { Skeleton } from '@/features/ui/skeleton';

function SkeletonCard() {
  return (
    <>
      {/* PC */}
      <Card
        variant="single"
        color="transparent"
        className="relative hidden h-full max-h-[785px] flex-col border sm:flex"
      >
        <div className="h-full overflow-y-hidden rounded-3xl">
          <div className={clsx('flex h-full transition-transform duration-500')}>
            <div className="flex-1">
              <Skeleton className="size-full object-cover" />
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="my-auto flex flex-1 items-end px-4">
                <Skeleton className="mr-6 h-16 flex-1" />
                <Skeleton className="h-10 w-12" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 gap-x-16">
          <Skeleton className="size-24 rounded-full" />
          <Skeleton className="size-24 rounded-full" />
          <Skeleton className="size-24 rounded-full" />
        </div>
      </Card>
      {/* SP */}
      <Card
        variant="single"
        color="transparent"
        className="relative flex h-full flex-col sm:hidden"
      >
        <div className="block h-full rounded-3xl">
          <div className="relative flex h-full">
            <div className="flex-1 overflow-hidden rounded-3xl">
              <Skeleton className="size-full object-cover" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export { SkeletonCard };
