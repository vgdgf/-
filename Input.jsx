import Input from "../components/Input";
import { FiMail, FiUser, FiPhone, FiLock } from "react-icons/fi";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name) errs.name = "الاسم مطلوب";
    if (!form.email) errs.email = "البريد الإلكتروني مطلوب";
    if (!form.phone) errs.phone = "رقم الهاتف مطلوب";
    if (!form.password) errs.password = "كلمة المرور مطلوبة";
    if (form.password !== form.confirm) errs.confirm = "كلمة المرور غير متطابقة";

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // 👇 هنا يمكنك إرسال البيانات للسيرفر
      alert("✅ تم التسجيل بنجاح");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-emerald-600 mb-6">
          إنشاء حساب جديد
        </h1>

        <form onSubmit={handleSubmit}>
          <Input
            label="الاسم الكامل"
            name="name"
            placeholder="أدخل اسمك"
            icon={<FiUser />}
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <Input
            label="البريد الإلكتروني"
            name="email"
            placeholder="email@example.com"
            icon={<FiMail />}
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="رقم الهاتف"
            name="phone"
            placeholder="09xxxxxxxx"
            icon={<FiPhone />}
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <Input
            label="كلمة المرور"
            name="password"
            type="password"
            placeholder="••••••••"
            icon={<FiLock />}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Input
            label="تأكيد كلمة المرور"
            name="confirm"
            type="password"
            placeholder="••••••••"
            icon={<FiLock />}
            value={form.confirm}
            onChange={handleChange}
            error={errors.confirm}
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 mt-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition"
          >
            إنشاء الحساب
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          لديك حساب بالفعل؟{" "}
          <a href="/login" className="text-emerald-500 hover:underline">
            تسجيل الدخول
          </a>
        </p>
      </div>
    </main>
  );
}