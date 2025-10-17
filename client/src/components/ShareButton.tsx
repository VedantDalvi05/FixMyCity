import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { shareIssue } from '@/lib/mockData';
import type { Issue } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  issue: Issue;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
}

export default function ShareButton({ 
  issue, 
  variant = 'ghost', 
  size = 'sm',
  showText = true 
}: ShareButtonProps) {
  const { toast } = useToast();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await shareIssue(issue);
    
    if (success) {
      toast({
        title: 'Shared successfully',
        description: navigator.share ? 'Issue shared' : 'Link copied to clipboard',
      });
    } else {
      toast({
        title: 'Share failed',
        description: 'Unable to share this issue',
        variant: 'destructive'
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleShare}
      data-testid="button-share"
    >
      <Share2 className="w-4 h-4" />
      {showText && size !== 'icon' && <span className="ml-2">Share</span>}
    </Button>
  );
}
