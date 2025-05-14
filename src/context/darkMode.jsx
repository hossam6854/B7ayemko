import React, { createContext, useContext, useEffect, useState } from "react";

// إنشاء السياق
const DarkModeContext = createContext();

// مزود السياق
export const DarkModeProvider = ({ children }) => {
  // قراءة الوضع الحالي من localStorage أو تعيين القيمة الافتراضية
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === "true" ? true : false;
  });

  // حفظ الوضع الحالي في localStorage عند تغييره
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // دالة التبديل بين الوضعين
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// هوك للاستخدام السهل في المكونات
export const useDarkMode = () => useContext(DarkModeContext);