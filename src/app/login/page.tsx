import { SignIn } from '@/src/components/sign-in';

function Login() {
  return (
    <div className="flex flex-col border-2 p-4 rounded-md gap-2 w-full md:w-1/2 h-max mx-auto mt-8 max-h-[calc(100vh*3/5)] overflow-y-auto">
      <h1 className="text-3xl font-bold mb-2">Login!</h1>
      <p className="text-sm flex items-center gap-2 w-2/3">
        Log in to manage your tasks and stay productive.
      </p>
      <SignIn />
    </div>
  );
}

export default Login;
