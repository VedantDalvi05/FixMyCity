import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import CategoryBadge from './CategoryBadge';
import ShareButton from './ShareButton';
import BeforeAfterComparison from './BeforeAfterComparison';
import IssueTimeline from './IssueTimeline';
import { MapPin, Calendar, User } from 'lucide-react';
import type { Issue } from '@/lib/mockData';

interface IssueDetailModalProps {
  issue: Issue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function IssueDetailModal({ issue, open, onOpenChange }: IssueDetailModalProps) {
  if (!issue) return null;

  const date = new Date(issue.createdAt).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{issue.description}</DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <StatusBadge status={issue.status} />
                <CategoryBadge category={issue.category} />
                <ShareButton issue={issue} variant="outline" size="sm" />
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Issue Details */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{issue.location.address}</p>
                    <p className="text-xs text-muted-foreground">
                      {issue.areaCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Reported</p>
                    <p className="text-muted-foreground">{date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Reporter</p>
                    <p className="text-muted-foreground">{issue.reporter.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Issue ID</p>
                    <p className="text-muted-foreground">{issue.id}</p>
                  </div>
                </div>
              </div>

              {issue.adminNotes && issue.adminNotes.length > 0 && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Admin Notes</p>
                  <div className="space-y-2">
                    {issue.adminNotes.map((note, index) => (
                      <div key={index} className="text-sm">
                        <p className="text-foreground">{note.note}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(note.timestamp).toLocaleString()} - {note.admin}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Before & After Photos */}
          {issue.status === 'resolved' && (
            <BeforeAfterComparison
              beforePhoto={issue.photos[0]}
              afterPhoto={issue.resolvedPhotoURL}
            />
          )}

          {/* Single Photo for Non-Resolved Issues */}
          {issue.status !== 'resolved' && issue.photos.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Photo Evidence</h3>
                <img
                  src={issue.photos[0]}
                  alt="Issue"
                  className="w-full max-h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          <IssueTimeline updateHistory={issue.updateHistory} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
