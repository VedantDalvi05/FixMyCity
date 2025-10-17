import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// TODO: Remove mock functionality - this is for prototype only
const categoryData = [
  { name: 'Potholes', value: 45, color: 'hsl(var(--chart-1))' },
  { name: 'Garbage', value: 32, color: 'hsl(var(--chart-2))' },
  { name: 'Streetlight', value: 28, color: 'hsl(var(--chart-3))' },
  { name: 'Drainage', value: 18, color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 12, color: 'hsl(var(--chart-5))' }
];

const areaData = [
  { area: 'Ward-1', reports: 42 },
  { area: 'Ward-2', reports: 35 },
  { area: 'Ward-3', reports: 28 },
  { area: 'Ward-4', reports: 22 }
];

const statusData = [
  { name: 'Jan', resolved: 45, pending: 12 },
  { name: 'Feb', resolved: 52, pending: 18 },
  { name: 'Mar', resolved: 48, pending: 15 },
  { name: 'Apr', resolved: 61, pending: 10 },
  { name: 'May', resolved: 55, pending: 14 },
  { name: 'Jun', resolved: 67, pending: 8 }
];

const trendData = [
  { month: 'Jan', reports: 57 },
  { month: 'Feb', reports: 70 },
  { month: 'Mar', reports: 63 },
  { month: 'Apr', reports: 71 },
  { month: 'May', reports: 69 },
  { month: 'Jun', reports: 75 }
];

export function CategoryPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function AreaBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports by Area</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={areaData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="area" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Bar dataKey="reports" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function StatusComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resolved vs Pending</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Legend />
            <Bar dataKey="resolved" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
            <Bar dataKey="pending" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function TrendLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Trends Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="reports" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
