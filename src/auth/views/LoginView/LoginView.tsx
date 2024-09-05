import { LoginForm } from '@auth/components/LoginForm';

function LoginView() {
  return (
    <div className="flex items-center justify-center">
      <div className="space-y-6 sm:w-2/3 lg:w-1/3">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginView;
