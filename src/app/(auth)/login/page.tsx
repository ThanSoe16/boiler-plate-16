import { Button } from '@/components/ui/button';
import { Flex } from '@radix-ui/themes';

export default function LoginPage() {
  return (
    <Flex direction="column" align="center" justify="center" className="h-screen gap-4">
      <Button>LOGIN</Button>
    </Flex>
  );
}
