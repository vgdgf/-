import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import Button from "../components/Button";

const dummyNotifications = [
  {
    id: 1,
    title: "وظيفة جديدة قريبة منك",
    message: "تم نشر وظيفة مطور واجهات أمامية في طرابلس.",
    date: "2025-06-23T12:45:00",
    read: false,
  },
  {
    id: 2,
    title: "تم الرد على منشورك",
    message: "صاحب العمل 'شركة التقنية' أرسل لك رسالة جديدة.",
    date: "2025-06-22T18:30:00",
    read: true,
  },
  {
    id: 3,
    title: "تنبيه أمني",
    message: "تم اكتشاف منشور مكرر وتمت مراجعة المحتوى.",
    date: "2025-06-21T09:15:00",
    read: false,
  },
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // محاكاة جلب الإشعارات من API أو قاعدة بيانات
    setNotifications(dummyNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-emerald-600 select-none">
          🔔 الإشعارات
        </h1>
        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition"
          >
            تعيين الكل كمقروء
          </Button>
        )}
      </header>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium">
          لا توجد إشعارات حالياً.
        </p>
      ) : (
        <section className="space-y-4">
          {notifications.map(({ id, title, message, date, read }) => (
            <Card
              key={id}
              className={`p-5 cursor-pointer transition-shadow duration-300 ${
                read
                  ? "bg-white dark:bg-gray-800"
                  : "bg-emerald-50 dark:bg-emerald-900 shadow-lg"
              }`}
              onClick={() => !read && markAsRead(id)}
              aria-label={`${title} - ${message}`}
              role="listitem"
            >
              <div className="flex justify-between items-start">
                <h2
                  className={`text-xl font-semibold ${
                    read ? "text-gray-800 dark:text-gray-300" : "text-emerald-700 dark:text-emerald-400"
                  }`}
                >
                  {title}
                </h2>
                {!read && (
                  <span className="inline-block w-3 h-3 bg-emerald-600 rounded-full mt-1" aria-label="إشعار جديد" />
                )}
              </div>
              <p className="mt-1 text-gray-700 dark:text-gray-300">{message}</p>
              <time
                className="mt-3 block text-sm text-gray-500 dark:text-gray-400"
                dateTime={date}
              >
                {formatDate(date)}
              </time>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
}