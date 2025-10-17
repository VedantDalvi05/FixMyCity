import Navbar from '../Navbar';
import { AuthProvider } from '@/lib/authContext';

export default function NavbarExample() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="p-8">
          <p className="text-muted-foreground">
            Note: Login as user@demo or admin@demo to see the navbar
          </p>
        </div>
      </div>
    </AuthProvider>
  );
}
