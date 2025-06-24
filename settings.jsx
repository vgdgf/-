import { useState, useEffect } from "react";

const ToggleSwitch = ({ enabled, onToggle }) => (
  <button
    role="switch"
    aria-checked={enabled}
    onClick={onToggle}
    className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300
      ${enabled ? "bg-emerald-500" : "bg-gray-300"}`}
  >
    <div
      className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out
        ${enabled ? "translate-x-6" : "translate-x-0"}`}
    />
  </button>
);

const SettingItem = ({ label, enabled, onToggle, emoji }) => (
  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <div className="flex items-center gap-3">
      <span className="text-2xl">{emoji}</span>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{label}</h3>
    </div>
    <ToggleSwitch enabled={enabled} onToggle={onToggle} />
  </div>
);

export default function Settings() {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("khdemni-settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSettings(parsed);
      toggleBodyClass(parsed.darkMode);
    }
  }, []);

  const toggleBodyClass = (enable) => {
    if (enable) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const toggleSetting = (key) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      if (key === "darkMode") toggleBodyClass(updated.darkMode);
      localStorage.setItem("khdemni-settings", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-12 text-emerald-600 select-none">
        ⚙️ إعدادات الحساب
      </h1>

      <section className="w-full max-w-md space-y-6">
        <SettingItem
          label="الوضع الليلي"
          emoji="🌙"
          enabled={settings.darkMode}
          onToggle={() => toggleSetting("darkMode")}
        />

        <SettingItem
          label="الإشعارات"
          emoji="🔔"
          enabled={settings.notifications}
          onToggle={() => toggleSetting("notifications")}
        />
      </section>

      <footer className="mt-20 text-center text-sm text-gray-400 select-none">
        خدّمني &copy; 2025 — تم التطوير بواسطة 𝐑𝐎𝐆𝐔𝐄
      </footer>
    </main>
  );
}