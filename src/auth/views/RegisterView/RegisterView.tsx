import { RegistrationForm } from '@auth/components/RegistrationForm';

function RegisterView() {
  return (
    <div className="flex items-center justify-center">
      <div className="space-y-6 sm:w-2/3 lg:w-1/3">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegisterView;
