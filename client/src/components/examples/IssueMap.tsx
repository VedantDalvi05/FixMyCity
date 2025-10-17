import IssueMap from '../IssueMap';
import { mockIssues } from '@/lib/mockData';

export default function IssueMapExample() {
  return (
    <div className="h-[500px] w-full">
      <IssueMap 
        issues={mockIssues}
        onMarkerClick={(issue) => console.log('Marker clicked:', issue.id)}
      />
    </div>
  );
}
