import Image from 'next/image';
import LoginForm from './_components/LoginForm';

const Login = () => {
  return (
    <div
      className="relative w-screen h-screen justify-center items-center flex"
      style={{
        backgroundImage: "url('/auth/auth-bg.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center justify-center z-10 bg-white  rounded-lg mx-auto w-[calc(100%-32px)] md:mr-10 md:max-w-[445px] overflow-hidden ">
        <div className="bg-[#FFE14E] flex items-center justify-center w-full py-6 ">
          <Image
            src="/auth/auth-logo.svg"
            alt="primary logo"
            width={300}
            height={92}
            className="w-[150px] md:w-[300px] h-[45px] md:h-[90px] object-cover"
          />
        </div>
        <h1 className="font-bold text-lg mt-4 "> Welcome Back </h1>
        <h2 className="text-gray-500 mt-1">Log in to your account to continue</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
