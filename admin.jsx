import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // بيانات وهمية
    setUsers([
      { id: 1, name: "أحمد", city: "طرابلس", role: "باحث عن عمل" },
      { id: 2, name: "منى", city: "بنغازي", role: "صاحب عمل" },
    ]);

    setPosts([
      { id: 101, title: "مطلوب مبرمج", city: "طرابلس" },
      { id: 102, title: "باحث عن وظيفة", city: "بنغازي" },
      { id: 103, title: "مساعد إداري", city: "طرابلس" },
    ]);

    setAlerts([
      { id: 1, report: "منشور مشبوه", status: "قيد المراجعة" },
      { id: 2, report: "إساءة استخدام", status: "تم حظره" },
    ]);
  }, []);

  const cityStats = posts.reduce((acc, post) => {
    acc[post.city] = (acc[post.city] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(cityStats),
    datasets: [
      {
        label: "عدد المنشورات",
        data: Object.values(cityStats),
        backgroundColor: "#10b981",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-emerald-600">
        لوحة تحكم المشرف
      </h1>

      {/* الإحصائيات */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center">
          <h2 className="text-2xl font-semibold mb-2">عدد المستخدمين</h2>
          <p className="text-4xl font-bold">{users.length}</p>
        </Card>
        <Card className="text-center">
          <h2 className="text-2xl font-semibold mb-2">عدد المنشورات</h2>
          <p className="text-4xl font-bold">{posts.length}</p>
        </Card>
        <Card className="text-center">
          <h2 className="text-2xl font-semibold mb-2">بلاغات محتوى</h2>
          <p className="text-4xl font-bold">{alerts.length}</p>
        </Card>
      </section>

      {/* الرسم البياني */}
      <section className="mb-12">
        <Card>
          <h2 className="text-2xl font-bold mb-4 text-emerald-500">
            أكثر المدن نشاطًا
          </h2>
          <Bar data={chartData} />
        </Card>
      </section>

      {/* جدول المستخدمين */}
      <section className="mb-12">
        <Card>
          <h2 className="text-xl font-bold mb-4">تفاصيل المستخدمين</h2>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-emerald-600 text-white">
                <th className="p-2 border">المعرف</th>
                <th className="p-2 border">الاسم</th>
                <th className="p-2 border">المدينة</th>
                <th className="p-2 border">الدور</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.city}</td>
                  <td className="p-2 border">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* إرسال إشعار */}
      <section className="text-center">
        <Button className="bg-emerald-600 text-white px-6 py-3 text-lg font-semibold hover:bg-emerald-700 rounded-lg">
          🚨 إرسال إشعار عام
        </Button>
      </section>
    </main>
  );
}