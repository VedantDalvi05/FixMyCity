import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex gap-2 flex-wrap">
      <StatusBadge status="submitted" />
      <StatusBadge status="in-progress" />
      <StatusBadge status="resolved" />
    </div>
  );
}
