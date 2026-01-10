import { ThemeToggle } from '@/components/shared/theme-toggle';
import HomeBanner from './_components/HomeBanner';
import { Button } from '@/components/ui/button';
import { Flex } from '@radix-ui/themes';

export default function HomePage() {
  return (
    <Flex direction="column" align="center" justify="center" className="h-screen gap-4">
      <ThemeToggle />
      <HomeBanner />
      <Button>Button</Button>
    </Flex>
  );
}
