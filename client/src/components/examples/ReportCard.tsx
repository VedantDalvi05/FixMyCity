import ReportCard from '../ReportCard';
import { mockIssues } from '@/lib/mockData';

export default function ReportCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      {mockIssues.slice(0, 3).map((issue) => (
        <ReportCard 
          key={issue.id} 
          issue={issue}
          onClick={() => console.log('Card clicked:', issue.id)}
        />
      ))}
    </div>
  );
}
