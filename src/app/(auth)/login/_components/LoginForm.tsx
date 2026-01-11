'use client';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/features/auth/service/mutations';
import { LoginForm, loginSchema } from '@/features/auth/types';
import { useAuthStore } from '@/stores/auth-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginId: '',
      password: '',
    },
  });

  const submit = async (data: LoginForm) => {
    try {
      // 1️⃣ Login (cookies are set by BE)
      const res = await mutateAsync(data);
      const accessToken = res.body?.data?.accessToken ?? '';
      const refreshToken = res.body?.data?.refreshToken ?? '';
      // 2️⃣ Mark as authenticated
      useAuthStore.getState().setTokens(accessToken, refreshToken);

      // 4️⃣ Redirect
      router.replace('/home');
    } catch (error) {
      // handle error (toast, form error, etc.)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="w-full ">
        <div className="w-full rounded-xl space-y-4 p-4 md:p-6">
          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="loginId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white rounded-lg"
                      placeholder="Enter login ID"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white rounded-lg"
                      placeholder="Enter password"
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-full rounded-lg text-sm "
            disabled={isPending || !form.formState.isValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default LoginForm;
