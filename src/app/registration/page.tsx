import { RegisterView } from '@auth/views/RegisterView';
import AuthProtect from '@auth/guards/AuthProtect';

export default function Registration() {
  return (
    <AuthProtect needAuth={false}>
      <main>
        <RegisterView />
      </main>
    </AuthProtect>
  );
}
