import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/authContext";
import Navbar from "@/components/Navbar";
import Login from "@/pages/Login";
import ReportIssue from "@/pages/ReportIssue";
import MyReports from "@/pages/MyReports";
import PublicMap from "@/pages/PublicMap";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminReportTable from "@/pages/AdminReportTable";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ 
  component: Component, 
  allowedRole 
}: { 
  component: React.ComponentType; 
  allowedRole?: 'citizen' | 'admin' 
}) {
  const { user } = useAuth();
  
  if (!user) {
    return <Redirect to="/login" />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Redirect to="/login" />;
  }
  
  return <Component />;
}

function Router() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/login">
          {user ? <Redirect to={user.role === 'admin' ? '/admin/dashboard' : '/my-reports'} /> : <Login />}
        </Route>
        
        {/* Citizen Routes */}
        <Route path="/report">
          <ProtectedRoute component={ReportIssue} allowedRole="citizen" />
        </Route>
        <Route path="/my-reports">
          <ProtectedRoute component={MyReports} allowedRole="citizen" />
        </Route>
        <Route path="/map">
          <ProtectedRoute component={PublicMap} allowedRole="citizen" />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/dashboard">
          <ProtectedRoute component={AdminDashboard} allowedRole="admin" />
        </Route>
        <Route path="/admin/reports">
          <ProtectedRoute component={AdminReportTable} allowedRole="admin" />
        </Route>

        {/* Default redirect */}
        <Route path="/">
          {user ? (
            <Redirect to={user.role === 'admin' ? '/admin/dashboard' : '/my-reports'} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
