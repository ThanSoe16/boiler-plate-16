import { ThemeToggle } from '@/components/shared/theme-toggle';
import HomeBanner from './_components/HomeBanner';
import { Button } from '@/components/ui/button';
import { Flex } from '@radix-ui/themes';
import Snippets from './_components/Snippets';
import { TableDemo } from './_components/TableSimple';
import { DraggableTableSimple } from './_components/DraggableTable';
import { BreadcrumbDemo } from './_components/Breadcrumb';

export default function HomePage() {
  return (
    <Flex direction="column" align="center" justify="center" className="h-screen gap-4">
      <BreadcrumbDemo />
      <ThemeToggle />
      <HomeBanner />
      <Button>Button</Button>
      <Snippets />
      <TableDemo />
      <DraggableTableSimple />
    </Flex>
  );
}
