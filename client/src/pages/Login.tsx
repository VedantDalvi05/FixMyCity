import { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import loginBg from '@assets/generated_images/Civic_infrastructure_city_background_899199ae.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(username, password);
    if (success) {
      // Redirect based on user role
      if (username === 'admin@demo') {
        setLocation('/admin/dashboard');
      } else {
        setLocation('/my-reports');
      }
    } else {
      setError('Invalid credentials. Try user@demo/password or admin@demo/admin123');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 z-10" />
        <img 
          src={loginBg} 
          alt="City infrastructure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold mb-4">FixMyCity</h1>
          <p className="text-xl text-white/90">
            Report civic issues and help make our city better, together.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="lg:hidden mb-4">
              <h1 className="text-3xl font-bold text-primary mb-2">FixMyCity</h1>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Email / Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="user@demo or admin@demo"
                  data-testid="input-username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-testid="input-password"
                  required
                />
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <p>{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full"
                data-testid="button-login"
              >
                Sign In
              </Button>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Demo Credentials:</p>
                <p className="text-xs text-muted-foreground">
                  Citizen: user@demo / password<br />
                  Admin: admin@demo / admin123
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
