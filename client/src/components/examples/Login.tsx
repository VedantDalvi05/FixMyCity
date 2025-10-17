import Login from '../../pages/Login';
import { AuthProvider } from '@/lib/authContext';

export default function LoginExample() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
