import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import Button from "../components/Button";

const dummyUser = {
  name: "أحمد الرمي",
  role: "باحث عن عمل",
  city: "طرابلس",
  email: "ahmed@example.com",
  phoneHidden: true,
  avatar: "https://i.pravatar.cc/150?u=ahmed",
  bio: "مطور ويب بخبرة 5 سنوات، متحمس للتعلم والتطوير المستمر.",
  rating: 4.8,
  posts: [
    {
      id: 1,
      title: "مطور React محترف",
      description: "خبرة واسعة في بناء تطبيقات واجهات أمامية باستخدام React وNext.js",
      date: "2025-06-20",
      type: "دوام كامل",
      salary: 1500,
    },
    {
      id: 2,
      title: "مصمم جرافيك مبتدئ",
      description: "مهتم بتصميم الشعارات والواجهات البسيطة",
      date: "2025-05-15",
      type: "دوام جزئي",
      salary: 700,
    },
  ],
  messages: [
    {
      id: 1,
      from: "شركة التقنية",
      content: "هل يمكنك البدء الأسبوع القادم؟",
      date: "2025-06-22",
      read: false,
    },
    {
      id: 2,
      from: "سامي",
      content: "مرحبًا أحمد، هل ما زلت متاحًا؟",
      date: "2025-06-21",
      read: true,
    },
  ],
};

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-center space-x-1 rtl:space-x-reverse">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={"full-" + i}
          className="w-5 h-5 text-emerald-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.922-.755 1.688-1.54 1.118l-3.376-2.455a1 1 0 00-1.176 0l-3.376 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.04 9.397c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.97z" />
        </svg>
      ))}
      {halfStar && (
        <svg
          className="w-5 h-5 text-emerald-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="half-grad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half-grad)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.922-.755 1.688-1.54 1.118l-3.376-2.455a1 1 0 00-1.176 0l-3.376 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.04 9.397c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.97z"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={"empty-" + i}
          className="w-5 h-5 text-gray-300 dark:text-gray-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.922-.755 1.688-1.54 1.118l-3.376-2.455a1 1 0 00-1.176 0l-3.376 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.04 9.397c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.97z" />
        </svg>
      ))}
    </div>
  );
}

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showMessages, setShowMessages] = useState(false);

  // محاكاة جلب بيانات المستخدم
  useEffect(() => {
    // في التطبيق الحقيقي، يمكن جلب البيانات من API
    setUser(dummyUser);
  }, []);

  if (!user)
    return (
      <main className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 dark:text-gray-400 text-xl">جارٍ التحميل...</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100 max-w-5xl mx-auto">
      {/* بيانات المستخدم */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
        <img
          src={user.avatar}
          alt={`${user.name} avatar`}
          className="w-32 h-32 rounded-full shadow-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p className="text-emerald-600 font-semibold mb-2">{user.role}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">📍 {user.city}</p>
          <p className="mb-4">{user.bio}</p>
          <div className="flex items-center gap-2">
            <StarRating rating={user.rating} />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({user.rating.toFixed(1)} تقييم)
            </span>
          </div>
          {/* زر عرض الرسائل */}
          <Button onClick={() => setShowMessages(!showMessages)} className="mt-4">
            {showMessages ? "إخفاء الرسائل" : `عرض الرسائل (${user.messages.length})`}
          </Button>
        </div>
      </section>

      {/* المنشورات */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 border-b border-emerald-600 pb-2">
          🛠️ منشوراتي
        </h2>
        {user.posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            لا توجد منشورات حتى الآن.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {user.posts.map(({ id, title, description, date, type, salary }) => (
              <Card key={id} className="p-5 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">
                  {title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1">{description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  📅 {new Date(date).toLocaleDateString("ar-EG")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ⏰ {type} | 💰 {salary} دينار
                </p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* الرسائل */}
      {showMessages && (
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 border-b border-emerald-600 pb-2">
            💬 الرسائل الواردة
          </h2>
          {user.messages.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              لا توجد رسائل جديدة.
            </p>
          ) : (
            <div className="space-y-4">
              {user.messages.map(({ id, from, content, date, read }) => (
                <Card
                  key={id}
                  className={`p-4 transition-shadow duration-300 ${
                    read ? "bg-gray-100 dark:bg-gray-800" : "bg-emerald-50 dark:bg-emerald-900 shadow-lg"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-emerald-600">{from}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(date).toLocaleString("ar-EG")}
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">{content}</p>
                </Card>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}