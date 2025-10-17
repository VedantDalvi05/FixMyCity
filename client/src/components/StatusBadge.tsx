import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/lib/mockData';
import type { Issue } from '@/lib/mockData';

interface StatusBadgeProps {
  status: Issue['status'];
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { bg, text, label } = getStatusColor(status);
  
  return (
    <Badge 
      variant="outline" 
      className={`${bg} ${text} border-transparent`}
      data-testid={`badge-status-${status}`}
    >
      {label}
    </Badge>
  );
}
