import StatCard from '../StatCard';
import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-6xl">
      <StatCard 
        title="Total Reports" 
        value="248" 
        icon={FileText}
        trend={{ value: '12% from last week', isPositive: true }}
      />
      <StatCard 
        title="Pending" 
        value="42" 
        icon={AlertCircle}
        trend={{ value: '8% from last week', isPositive: false }}
      />
      <StatCard 
        title="In Progress" 
        value="86" 
        icon={Clock}
      />
      <StatCard 
        title="Resolved" 
        value="120" 
        icon={CheckCircle2}
        trend={{ value: '18% from last week', isPositive: true }}
      />
    </div>
  );
}
