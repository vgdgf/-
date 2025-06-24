import { FiLoader } from "react-icons/fi";

export default function Button({
  children,
  type = "button",
  className = "",
  variant = "primary", // primary / secondary / danger
  loading = false,
  icon = null,
  iconPosition = "right", // or "left"
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const iconStyle = "w-4 h-4";

  return (
    <button
      type={type}
      disabled={loading}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <FiLoader className={`${iconStyle} animate-spin`} />
      ) : icon && iconPosition === "left" ? (
        <>
          <span className={`${iconStyle} mr-2`}>{icon}</span>
          {children}
        </>
      ) : icon && iconPosition === "right" ? (
        <>
          {children}
          <span className={`${iconStyle} ml-2`}>{icon}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}