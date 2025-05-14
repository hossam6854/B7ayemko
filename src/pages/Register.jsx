import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Register = React.memo(() => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);

  // تحسين: useCallback لتقليل إعادة التصيير
  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      if (!username || !email || !password || !confirmPassword) {
        setError("جميع الحقول مطلوبة.");
        return;
      }

      if (password !== confirmPassword) {
        setError("كلمات المرور غير متطابقة.");
        return;
      }

      const userExists = users.some((user) => user.username === username);
      if (userExists) {
        setError("اسم المستخدم موجود بالفعل.");
        return;
      }

      setLoading(true);
      setTimeout(() => {
        dispatch(register({ username: username.trim(), email: email.trim(), password: password.trim() }));
        setSuccess("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        setTimeout(() => {
          setSuccess("");
          navigate("/login");
        }, 2000);
      }, 1000); // محاكاة تحميل
    },
    [username, email, password, confirmPassword, users, dispatch, navigate]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-800 dark:to-gray-900 py-8 px-2">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400 flex items-center gap-2 justify-center">
          <UserPlus className="w-7 h-7" /> إنشاء حساب جديد
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 border border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700 text-center">
            {success}
          </div>
        )}
        <form onSubmit={handleRegister} className="space-y-5" dir="rtl" autoComplete="off">
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
              <UserPlus className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">البريد الإلكتروني</label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white pr-10"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
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
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">تأكيد كلمة المرور</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white pr-10"
                placeholder="تأكيد كلمة المرور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
                onClick={() => setShowConfirm((prev) => !prev)}
                aria-label={showConfirm ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
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
            {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600 dark:text-gray-300">لديك حساب بالفعل؟ </span>
          <Link to="/login" className="text-green-600 dark:text-green-400 hover:underline font-semibold">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Register;