
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminCharts = () => {
  const revenueData = [
    { month: 'يناير', revenue: 85000, consultations: 450 },
    { month: 'فبراير', revenue: 92000, consultations: 520 },
    { month: 'مارس', revenue: 78000, consultations: 380 },
    { month: 'أبريل', revenue: 105000, consultations: 620 },
    { month: 'مايو', revenue: 118000, consultations: 780 },
    { month: 'يونيو', revenue: 125500, consultations: 850 }
  ];

  const serviceCategories = [
    { name: 'قانون تجاري', value: 35, color: '#1e3a8a' },
    { name: 'قانون أسرة', value: 25, color: '#d4af37' },
    { name: 'قانون عقاري', value: 20, color: '#059669' },
    { name: 'قانون عمل', value: 15, color: '#dc2626' },
    { name: 'أخرى', value: 5, color: '#6b7280' }
  ];

  const dailyActivity = [
    { time: '09:00', consultations: 12 },
    { time: '10:00', consultations: 25 },
    { time: '11:00', consultations: 35 },
    { time: '12:00', consultations: 28 },
    { time: '13:00', consultations: 15 },
    { time: '14:00', consultations: 42 },
    { time: '15:00', consultations: 38 },
    { time: '16:00', consultations: 30 },
    { time: '17:00', consultations: 22 },
    { time: '18:00', consultations: 18 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* مخطط الإيرادات الشهرية */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>الإيرادات والاستشارات الشهرية</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? `${value} ريال` : `${value} استشارة`,
                  name === 'revenue' ? 'الإيرادات' : 'الاستشارات'
                ]}
              />
              <Bar dataKey="revenue" fill="#1e3a8a" name="revenue" />
              <Bar dataKey="consultations" fill="#d4af37" name="consultations" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* توزيع فئات الخدمات */}
      <Card>
        <CardHeader>
          <CardTitle>توزيع فئات الخدمات</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={serviceCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {serviceCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'النسبة']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {serviceCategories.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm">{category.name}</span>
                <span className="text-sm text-muted-foreground">({category.value}%)</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* النشاط اليومي */}
      <Card>
        <CardHeader>
          <CardTitle>النشاط اليومي للاستشارات</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} استشارة`, 'العدد']} />
              <Line 
                type="monotone" 
                dataKey="consultations" 
                stroke="#1e3a8a" 
                strokeWidth={3}
                dot={{ fill: '#1e3a8a', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCharts;
