import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { AlertTriangle, User, Lock, Eye, EyeOff } from "lucide-react";

const Login = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const users = useSelector((state) => state.auth.users);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      setError("");

      if (!username || !password) {
        setError("يرجى إدخال اسم المستخدم وكلمة المرور.");
        setTimeout(() => setError(""), 2000);
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          dispatch(login(user));
          setError("");
          setLoading(false);
          navigate("/");
        } else {
          setError("اسم المستخدم أو كلمة المرور غير صحيحة");
          setLoading(false);
          setTimeout(() => setError(""), 2000);
          setUsername("");
          setPassword("");
        }
      }, 800); // لمحاكاة التحميل
    },
    [username, password, users, dispatch, navigate]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-800 dark:to-gray-900 py-8 px-2">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400 text-center">
          تسجيل الدخول
        </h2>
        {error && (
          <div className="flex items-center bg-red-100 text-red-700 px-4 py-2 rounded mb-4 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-700 text-center">
            <AlertTriangle className="w-5 h-5 ml-2 text-red-500 dark:text-red-300" />
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-5" dir="rtl" autoComplete="off">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">اسم المستخدم</label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white pr-10"
                placeholder="اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
                autoFocus
                required
              />
              <User className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white pr-10"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <Lock className="absolute left-8 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-bold transition-all duration-200 bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
        <div className="flex flex-col items-center mt-6 gap-2">
          <Link to="/register" className="text-green-600 dark:text-green-400 hover:underline font-semibold">
            ليس لديك حساب؟ أنشئ حساباً
          </Link>
          <Link to="/forgetPassword" className="text-green-600 dark:text-green-400 hover:underline font-semibold">
            نسيت كلمة المرور؟
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Login;