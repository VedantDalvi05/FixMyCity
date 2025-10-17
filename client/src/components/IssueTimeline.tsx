import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, FileText } from 'lucide-react';
import type { Issue } from '@/lib/mockData';

interface IssueTimelineProps {
  updateHistory: Issue['updateHistory'];
}

export default function IssueTimeline({ updateHistory }: IssueTimelineProps) {
  const getIcon = (event: string) => {
    if (event.includes('Submitted')) return <FileText className="w-4 h-4" />;
    if (event.includes('Resolved')) return <CheckCircle2 className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const getColor = (event: string) => {
    if (event.includes('Submitted')) return 'text-muted-foreground bg-muted';
    if (event.includes('Resolved')) return 'text-success bg-success/10';
    if (event.includes('In Progress')) return 'text-warning bg-warning/10';
    return 'text-primary bg-primary/10';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          
          {/* Timeline items */}
          <div className="space-y-6">
            {updateHistory.map((update, index) => (
              <div key={index} className="relative flex gap-4 items-start">
                {/* Icon */}
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${getColor(update.event)}`}>
                  {getIcon(update.event)}
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <p className="text-sm font-medium text-foreground">{update.event}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(update.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
