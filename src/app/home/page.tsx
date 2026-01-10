import HomeBanner from './_components/HomeBanner';
import { Button } from '@/components/ui/button';
import { Flex } from '@radix-ui/themes';

export default function HomePage() {
  return (
    <Flex direction="column" align="center" justify="center" className="h-screen gap-4">
      <HomeBanner />
      <Button>Button</Button>
    </Flex>
  );
}
