import { useState } from 'react';
import { mockIssues, getCategoryLabel, getStatusColor } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/StatusBadge';
import CategoryBadge from '@/components/CategoryBadge';
import { Search, Download, Eye } from 'lucide-react';
import type { Issue } from '@/lib/mockData';

export default function AdminReportTable() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [adminNote, setAdminNote] = useState('');

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.description.toLowerCase().includes(search.toLowerCase()) ||
                         issue.id.toLowerCase().includes(search.toLowerCase()) ||
                         issue.location.address.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const exportCSV = () => {
    console.log('Exporting CSV with', filteredIssues.length, 'records');
    alert(`CSV export started for ${filteredIssues.length} records`);
  };

  const handleStatusUpdate = () => {
    console.log('Updating status:', { issueId: selectedIssue?.id, newStatus: statusUpdate, note: adminNote });
    alert(`Status updated to: ${statusUpdate}`);
    setSelectedIssue(null);
    setStatusUpdate('');
    setAdminNote('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-1">Report Management</h1>
          <p className="text-muted-foreground">View and manage all civic issue reports</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, description, or address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
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

          <Button variant="outline" onClick={exportCSV} data-testid="button-export-csv">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id} className="hover-elevate">
                  <TableCell>
                    {issue.photos.length > 0 ? (
                      <img 
                        src={issue.photos[0]} 
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
                        No image
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{issue.id}</TableCell>
                  <TableCell>
                    <CategoryBadge category={issue.category} showDot={false} />
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="line-clamp-2 text-sm">{issue.description}</p>
                  </TableCell>
                  <TableCell>{issue.areaCode}</TableCell>
                  <TableCell>
                    <StatusBadge status={issue.status} />
                  </TableCell>
                  <TableCell className="text-sm">{issue.reporter.name}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedIssue(issue);
                        setStatusUpdate(issue.status);
                      }}
                      data-testid={`button-view-${issue.id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reports match your filters</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedIssue} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="dialog-issue-detail">
          {selectedIssue && (
            <>
              <DialogHeader>
                <DialogTitle>Issue Details - {selectedIssue.id}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {selectedIssue.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {selectedIssue.photos.map((photo, idx) => (
                      <img 
                        key={idx}
                        src={photo} 
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                <div className="grid gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Description</h3>
                    <p className="text-sm text-muted-foreground">{selectedIssue.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-1">Category</h3>
                      <CategoryBadge category={selectedIssue.category} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Current Status</h3>
                      <StatusBadge status={selectedIssue.status} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-sm text-muted-foreground">{selectedIssue.location.address}</p>
                    <p className="text-sm text-muted-foreground">Area: {selectedIssue.areaCode}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Reporter</h3>
                    <p className="text-sm text-muted-foreground">{selectedIssue.reporter.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedIssue.reporter.contact}</p>
                  </div>

                  {selectedIssue.adminNotes.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Admin Notes</h3>
                      <div className="space-y-2">
                        {selectedIssue.adminNotes.map((note, idx) => (
                          <div key={idx} className="bg-muted p-3 rounded-lg text-sm">
                            <p>{note.note}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(note.timestamp).toLocaleString()} - {note.admin}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold mb-2">Update Status</h3>
                    <Select value={statusUpdate} onValueChange={setStatusUpdate}>
                      <SelectTrigger data-testid="select-update-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Add Admin Note</h3>
                    <Input
                      placeholder="Enter note..."
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      data-testid="input-admin-note"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleStatusUpdate} 
                  className="w-full"
                  data-testid="button-update-status"
                >
                  Update Issue
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
