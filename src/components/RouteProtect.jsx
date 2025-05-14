import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteProtect = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    // إذا لم يكن مسجل الدخول، حوله إلى صفحة تسجيل الدخول
    return <Navigate to="/login" replace />;
    
    
  }

  // إذا كان مسجل الدخول، اعرض الصفحة المطلوبة
  return children;
};

export default RouteProtect;