import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReportCard from '@/components/ReportCard';
import IssueDetailModal from '@/components/IssueDetailModal';
import { mockIssues } from '@/lib/mockData';
import { Plus, Filter } from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { fetchUserIssues } from '@/lib/apiHelpers';
import { useToast } from '@/hooks/use-toast';
import type { Issue } from '@/lib/mockData';

export default function MyReports() {
  const [, setLocation] = useLocation();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userIssues, setUserIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadUserIssues = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const issues = await fetchUserIssues(user.id);
        setUserIssues(issues);
      } catch (error) {
        console.error('Failed to fetch user issues:', error);
        toast({
          title: 'Failed to load reports',
          description: 'Could not load your reports. Please try again.',
          variant: 'destructive'
        });
        // Fallback to mock data if API fails
        setUserIssues(mockIssues.filter(issue => issue.reporter.id === user.id));
      } finally {
        setLoading(false);
      }
    };

    loadUserIssues();
  }, [user, toast]);

  const filteredIssues = userIssues.filter(issue => {
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Reports</h1>
              <p className="text-muted-foreground mt-1">Track your submitted civic issues</p>
            </div>
            <Button onClick={() => setLocation('/report')} data-testid="button-new-report">
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
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

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]" data-testid="select-category-filter">
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No reports found</p>
            <Button onClick={() => setLocation('/report')} data-testid="button-first-report">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Report
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredIssues.map((issue) => (
              <ReportCard 
                key={issue.id} 
                issue={issue}
                onClick={() => {
                  setSelectedIssue(issue);
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        <IssueDetailModal
          issue={selectedIssue}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </div>
  );
}
