import { ThemeToggle } from '@/components/shared/theme-toggle';
import HomeBanner from './_components/HomeBanner';
import { Button } from '@/components/ui/button';
import { Flex } from '@radix-ui/themes';
import Snippets from './_components/Snippets';

export default function HomePage() {
  return (
    <Flex direction="column" align="center" justify="center" className="h-screen gap-4">
      <ThemeToggle />
      <HomeBanner />
      <Snippets />
      <Button>Button</Button>
    </Flex>
  );
}
