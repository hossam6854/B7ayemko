import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { SunIcon, MoonIcon, MenuIcon, XIcon, LogOut } from "lucide-react";
import { useDarkMode } from "../context/darkMode";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const navLinks = [
  { to: "/", label: "الرئيسية" },
  { to: "/addAnimal", label: "إضافة إعلان" },
  { to: "/myAds", label: "إعلاناتي" },
  { to: "/myDeliveryOrders", label: "طلباتي" },
  { to: "/deliveryOrdersAdmin", label: "طلبات التوصيل" },
  { to: "/afterSales", label: "خدمات ما بعد البيع" },
];

const Navbar = React.memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();

  // إغلاق القائمة عند تغيير الصفحة
  React.useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // تحسين الأداء عبر useCallback
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white shadow-lg"
          : "bg-white text-gray-900 shadow-md"
      }`}
      dir="rtl"
      style={{ fontFamily: "'Cairo', 'Tajawal', Arial, sans-serif" }}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight select-none flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          style={{ letterSpacing: "0.5px" }}
        >
          <span className="text-green-600 dark:text-green-400">B7ayemko</span>
          <span className="hidden sm:inline text-xs font-normal text-gray-400 dark:text-gray-500">بـهـا يـمـكـو</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative py-1 px-2 rounded-lg transition-colors duration-200 hover:text-green-600 dark:hover:text-green-400 ${
                location.pathname === link.to
                  ? "font-bold text-green-700 dark:text-green-400"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="تبديل الوضع الليلي"
            className="ml-2 rounded-full p-2 bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-400 transition-transform duration-200 rotate-0" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-200 transition-transform duration-200" />
            )}
          </button>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="ml-2 flex items-center gap-1 px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {menuOpen ? (
            <XIcon className="w-7 h-7 text-green-600 dark:text-green-400 transition-all duration-200" />
          ) : (
            <MenuIcon className="w-7 h-7 text-green-600 dark:text-green-400 transition-all duration-200" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[400px] py-2" : "max-h-0 py-0"
        } bg-white dark:bg-gray-900 shadow-lg rounded-b-lg`}
      >
        <div className="flex flex-col gap-3 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`py-2 px-2 rounded-lg transition-colors duration-200 hover:text-green-600 dark:hover:text-green-400 ${
                location.pathname === link.to
                  ? "font-bold text-green-700 dark:text-green-400"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={toggleDarkMode}
              aria-label="تبديل الوضع الليلي"
              className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200 focus:outline-none cursor-pointer"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;