import { Badge } from '@/components/ui/badge';
import { getCategoryColor, getCategoryLabel } from '@/lib/mockData';
import type { Issue } from '@/lib/mockData';

interface CategoryBadgeProps {
  category: Issue['category'];
  showDot?: boolean;
}

export default function CategoryBadge({ category, showDot = true }: CategoryBadgeProps) {
  const { text } = getCategoryColor(category);
  const label = getCategoryLabel(category);
  
  return (
    <Badge 
      variant="outline" 
      className="border-border"
      data-testid={`badge-category-${category}`}
    >
      {showDot && (
        <span className={`w-2 h-2 rounded-full ${text.replace('text-', 'bg-')} mr-1.5`} />
      )}
      {label}
    </Badge>
  );
}
