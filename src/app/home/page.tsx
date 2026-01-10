import Image from 'next/image';
import HomeBanner from './_components/HomeBanner';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HomeBanner />
      <Button>Button</Button>
    </div>
  );
}
