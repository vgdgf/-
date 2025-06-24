import { useState, useEffect } from "react";
import Button from "../components/Button";
import { Card } from "../components/Card";
import { motion } from "framer-motion";

const dummyPosts = [
  {
    id: 1,
    title: "مطور React.js محترف",
    type: "باحث عن عمل",
    city: "طرابلس",
    salary: 1200,
    date: "2025-06-20",
  },
  {
    id: 2,
    title: "مطلوب مصمم جرافيك",
    type: "صاحب عمل",
    city: "بنغازي",
    salary: 900,
    date: "2025-06-19",
  },
  {
    id: 3,
    title: "باحث عن عمل كمساعد إداري",
    type: "باحث عن عمل",
    city: "سبها",
    salary: 600,
    date: "2025-06-18",
  },
];

const cities = ["طرابلس", "بنغازي", "سبها", "مصراتة"];
const types = ["باحث عن عمل", "صاحب عمل"];

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setPosts(dummyPosts);
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (filterCity) {
      filtered = filtered.filter((post) => post.city === filterCity);
    }
    if (filterType) {
      filtered = filtered.filter((post) => post.type === filterType);
    }

    setFilteredPosts(filtered);
  }, [filterCity, filterType, posts]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 max-w-7xl mx-auto">
      <section className="text-center mb-16">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-emerald-600 drop-shadow mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          خدّمني – شغلك جاي لعندك
        </motion.h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          منصة متكاملة لربط أصحاب الأعمال بالباحثين عن فرص
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Button
            href="/search?type=job"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg"
          >
            🔍 أبحث عن عمل
          </Button>
          <Button
            href="/search?type=hire"
            className="bg-white dark:bg-gray-800 border border-emerald-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-emerald-600 hover:text-emerald-700 px-8 py-4 rounded-lg text-xl font-semibold shadow-md"
          >
            🛠️ أبحث عن شخص للعمل
          </Button>
        </div>
      </section>

      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 border-b-4 border-emerald-600 pb-2">
          آخر المنشورات
        </h2>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <select
            className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 dark:bg-gray-700 dark:text-white"
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          >
            <option value="">كل المدن</option>
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 dark:bg-gray-700 dark:text-white"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">كل الأنواع</option>
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            لا توجد منشورات حاليًا.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-emerald-600 mb-2">{post.title}</h3>
                  <p className="text-sm mb-1">📍 المدينة: {post.city}</p>
                  <p className="text-sm mb-1">🛠️ النوع: {post.type}</p>
                  <p className="text-sm mb-1">💰 الراتب: {post.salary} دينار</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    📅 {new Date(post.date).toLocaleDateString("ar-EG")}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}