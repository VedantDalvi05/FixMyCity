import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MapPin, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';
import CategoryBadge from './CategoryBadge';
import ShareButton from './ShareButton';
import type { Issue } from '@/lib/mockData';

interface ReportCardProps {
  issue: Issue;
  onClick?: () => void;
}

export default function ReportCard({ issue, onClick }: ReportCardProps) {
  const date = new Date(issue.createdAt).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <Card 
      className="hover-elevate active-elevate-2 cursor-pointer transition-shadow"
      onClick={onClick}
      data-testid={`card-report-${issue.id}`}
    >
      {issue.photos.length > 0 && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img 
            src={issue.photos[0]} 
            alt={issue.description}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
              {issue.description}
            </h3>
          </div>
          <StatusBadge status={issue.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={issue.category} />
          <ShareButton issue={issue} size="icon" showText={false} />
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{issue.areaCode}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          ID: {issue.id}
        </div>
      </CardContent>
    </Card>
  );
}
