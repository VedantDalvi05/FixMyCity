import CategoryBadge from '../CategoryBadge';

export default function CategoryBadgeExample() {
  return (
    <div className="flex gap-2 flex-wrap">
      <CategoryBadge category="potholes" />
      <CategoryBadge category="garbage" />
      <CategoryBadge category="streetlight" />
      <CategoryBadge category="drainage" />
      <CategoryBadge category="other" />
    </div>
  );
}
