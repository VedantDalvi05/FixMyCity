import { useAuth } from '@/lib/authContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X, FileText, Map, LayoutDashboard, Table } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import AccessibilityControls from './AccessibilityControls';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  if (!user) return null;

  const isCitizen = user.role === 'citizen';
  const isAdmin = user.role === 'admin';

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-primary">FixMyCity</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {isCitizen && (
                <>
                  <Link href="/my-reports">
                    <Button variant="ghost" size="sm" data-testid="link-my-reports">
                      <FileText className="w-4 h-4 mr-2" />
                      My Reports
                    </Button>
                  </Link>
                  <Link href="/report">
                    <Button variant="ghost" size="sm" data-testid="link-report">
                      Report Issue
                    </Button>
                  </Link>
                  <Link href="/map">
                    <Button variant="ghost" size="sm" data-testid="link-map">
                      <Map className="w-4 h-4 mr-2" />
                      Map
                    </Button>
                  </Link>
                </>
              )}
              {isAdmin && (
                <>
                  <Link href="/admin/dashboard">
                    <Button variant="ghost" size="sm" data-testid="link-dashboard">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/admin/reports">
                    <Button variant="ghost" size="sm" data-testid="link-reports">
                      <Table className="w-4 h-4 mr-2" />
                      Reports
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AccessibilityControls />
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{user.username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t space-y-2">
            {isCitizen && (
              <>
                <Link href="/my-reports">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                    <FileText className="w-4 h-4 mr-2" />
                    My Reports
                  </Button>
                </Link>
                <Link href="/report">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                    Report Issue
                  </Button>
                </Link>
                <Link href="/map">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                    <Map className="w-4 h-4 mr-2" />
                    Map
                  </Button>
                </Link>
              </>
            )}
            {isAdmin && (
              <>
                <Link href="/admin/dashboard">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/admin/reports">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                    <Table className="w-4 h-4 mr-2" />
                    Reports
                  </Button>
                </Link>
              </>
            )}
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground px-3 mb-2">{user.username}</p>
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
