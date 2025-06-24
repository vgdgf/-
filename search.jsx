import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import Button from "../components/Button";
import { Input } from "../components/Input";

const dummyData = [
  {
    id: 1,
    title: "مطور واجهات أمامية",
    city: "طرابلس",
    salary: 1200,
    type: "دوام كامل",
    description: "خبرة 3 سنوات في React و Next.js، مهارات CSS متقدمة.",
  },
  {
    id: 2,
    title: "مترجم لغات",
    city: "بنغازي",
    salary: 700,
    type: "دوام جزئي",
    description: "إجادة الإنجليزية والعربية، خبرة 5 سنوات.",
  },
  {
    id: 3,
    title: "مصمم جرافيك",
    city: "البيضاء",
    salary: 900,
    type: "دوام مرن",
    description: "استخدام Adobe Photoshop و Illustrator.",
  },
  {
    id: 4,
    title: "مهندس نظم",
    city: "طرابلس",
    salary: 1500,
    type: "دوام كامل",
    description: "إدارة الشبكات وأنظمة السيرفرات.",
  },
];

export default function Search() {
  const [filters, setFilters] = useState({
    type: "",
    city: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [results, setResults] = useState(dummyData);
  const [filteredResults, setFilteredResults] = useState(dummyData);

  // تحديث الفلاتر بناءً على المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // فلترة النتائج مع تحسين الأداء
  useEffect(() => {
    let filtered = results;

    if (filters.type.trim()) {
      filtered = filtered.filter((item) =>
        item.type.includes(filters.type.trim())
      );
    }
    if (filters.city.trim()) {
      filtered = filtered.filter((item) =>
        item.city.includes(filters.city.trim())
      );
    }

    if (filters.salaryMin) {
      filtered = filtered.filter((item) => item.salary >= Number(filters.salaryMin));
    }
    if (filters.salaryMax) {
      filtered = filtered.filter((item) => item.salary <= Number(filters.salaryMax));
    }

    setFilteredResults(filtered);
  }, [filters, results]);

  const clearFilters = () => {
    setFilters({ type: "", city: "", salaryMin: "", salaryMax: "" });
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold text-emerald-600 mb-8 text-center">
        🔍 البحث المتقدم عن الوظائف والخدمات
      </h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Input
          name="type"
          placeholder="نوع الدوام (كامل، جزئي، مرن)"
          value={filters.type}
          onChange={handleChange}
          className="col-span-1 md:col-span-1"
          aria-label="نوع الدوام"
        />

        <Input
          name="city"
          placeholder="المدينة"
          value={filters.city}
          onChange={handleChange}
          className="col-span-1 md:col-span-1"
          aria-label="المدينة"
        />

        <Input
          name="salaryMin"
          placeholder="الحد الأدنى للراتب"
          type="number"
          value={filters.salaryMin}
          onChange={handleChange}
          className="col-span-1 md:col-span-1"
          aria-label="الحد الأدنى للراتب"
          min={0}
        />

        <Input
          name="salaryMax"
          placeholder="الحد الأعلى للراتب"
          type="number"
          value={filters.salaryMax}
          onChange={handleChange}
          className="col-span-1 md:col-span-1"
          aria-label="الحد الأعلى للراتب"
          min={0}
        />

        <div className="col-span-full flex justify-between items-center mt-4">
          <Button onClick={clearFilters} className="bg-red-500 hover:bg-red-600">
            ✖️ مسح الفلاتر
          </Button>
          <div className="text-gray-600 dark:text-gray-300 font-semibold">
            عدد النتائج: {filteredResults.length}
          </div>
        </div>
      </form>

      <section className="max-w-4xl mx-auto mt-10 space-y-6">
        {filteredResults.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium">
            لا توجد نتائج مطابقة للبحث.
          </p>
        ) : (
          filteredResults.map(({ id, title, city, salary, type, description }) => (
            <Card key={id} className="p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2 text-emerald-700 dark:text-emerald-400">
                {title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                📍 المدينة: <span className="font-medium">{city}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                💰 الراتب: <span className="font-medium">{salary} دينار</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                ⏰ نوع الدوام: <span className="font-medium">{type}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 italic">{description}</p>
            </Card>
          ))
        )}
      </section>
    </main>
  );
}