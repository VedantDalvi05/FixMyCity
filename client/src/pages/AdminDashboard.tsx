import { useState } from 'react';
import StatCard from '@/components/StatCard';
import { CategoryPieChart, AreaBarChart, StatusComparisonChart, TrendLineChart } from '@/components/AdminCharts';
import IssueMap from '@/components/IssueMap';
import { mockIssues } from '@/lib/mockData';
import { FileText, Clock, CheckCircle2, AlertCircle, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Issue } from '@/lib/mockData';

export default function AdminDashboard() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // TODO: Remove mock functionality - calculate from real data
  const totalReports = mockIssues.length;
  const pending = mockIssues.filter(i => i.status === 'submitted').length;
  const inProgress = mockIssues.filter(i => i.status === 'in-progress').length;
  const resolved = mockIssues.filter(i => i.status === 'resolved').length;

  const filteredMapIssues = mockIssues.filter(issue => {
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-1">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage civic issue reports</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Reports" 
            value={totalReports} 
            icon={FileText}
            trend={{ value: '12% from last week', isPositive: true }}
            testId="stat-total-reports"
          />
          <StatCard 
            title="Pending" 
            value={pending} 
            icon={AlertCircle}
            trend={{ value: '8% from last week', isPositive: false }}
            testId="stat-pending"
          />
          <StatCard 
            title="In Progress" 
            value={inProgress} 
            icon={Clock}
            testId="stat-in-progress"
          />
          <StatCard 
            title="Resolved" 
            value={resolved} 
            icon={CheckCircle2}
            trend={{ value: '18% from last week', isPositive: true }}
            testId="stat-resolved"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <CategoryPieChart />
          <AreaBarChart />
        </div>

        <StatusComparisonChart />
        <TrendLineChart />

        {/* Map Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Issue Map</h2>
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]" data-testid="select-map-category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="potholes">Potholes</SelectItem>
                  <SelectItem value="garbage">Garbage</SelectItem>
                  <SelectItem value="streetlight">Streetlight</SelectItem>
                  <SelectItem value="drainage">Drainage</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]" data-testid="select-map-status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="h-[500px] rounded-lg overflow-hidden border">
            <IssueMap 
              issues={filteredMapIssues}
              onMarkerClick={(issue) => console.log('Admin viewing:', issue.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
