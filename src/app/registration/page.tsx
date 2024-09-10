import { RegisterView } from '@auth/views/RegisterView';
import AuthProtect from '@auth/guards/AuthProtect';

export default function Registration() {
  return (
    <AuthProtect needAuth={false}>
      <div className="mt-8">
        <RegisterView />
      </div>
    </AuthProtect>
  );
}
