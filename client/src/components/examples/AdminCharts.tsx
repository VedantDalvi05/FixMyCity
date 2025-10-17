import { CategoryPieChart, AreaBarChart, StatusComparisonChart, TrendLineChart } from '../AdminCharts';

export default function AdminChartsExample() {
  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-7xl">
      <CategoryPieChart />
      <AreaBarChart />
      <StatusComparisonChart />
      <TrendLineChart />
    </div>
  );
}
