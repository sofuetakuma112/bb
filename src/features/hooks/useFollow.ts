import { useState } from 'react';
import { follow, unFollow } from '@/features/actions/follow';

const useFollow = (initialIsFollowing: boolean) => {
  const [isFollowee, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async (userId: string) => {
    setIsLoading(true);
    try {
      setIsFollowing(true);
      await follow(userId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async (userId: string) => {
    setIsLoading(true);
    try {
      setIsFollowing(false);
      await unFollow(userId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isFollowee, isLoading, handleFollow, handleUnfollow };
};

export { useFollow };
