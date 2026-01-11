'use client';
import { useAuth } from '@/providers/authenticated-provider';

const HomeBanner = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div>
      <h1>Home Banner</h1>
      <p>{user?.name}</p>
    </div>
  );
};
export default HomeBanner;
