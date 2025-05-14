import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/slices/authSlice";
import { User, Lock, CheckCircle, AlertTriangle, ArrowLeft, Eye, EyeOff } from "lucide-react";

const ForgetPassword = React.memo(() => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1); // 1: إدخال اسم المستخدم, 2: إدخال كلمة المرور الجديدة
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const users = useSelector((state) => state.auth.users);

  const handleUsernameSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const userExists = users.some((u) => u.username === username);
      if (userExists) {
        setStep(2);
        setError("");
      } else {
        setError("اسم المستخدم غير موجود.");
        setTimeout(() => setError(""), 2000);
      }
    },
    [username, users]
  );

  const handlePasswordSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!newPassword || !confirmPassword) {
        setError("يرجى إدخال كلمة المرور الجديدة وتأكيدها.");
        setTimeout(() => setError(""), 2000);
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("كلمتا المرور غير متطابقتين.");
        setTimeout(() => setError(""), 2000);
        return;
      }
      dispatch(updatePassword({ username, newPassword }));
      setSuccess("تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.");
      setTimeout(() => setSuccess(""), 2000);
      setStep(1);
      setUsername("");
      setNewPassword("");
      setConfirmPassword("");
    },
    [newPassword, confirmPassword, dispatch, username]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-800 dark:to-gray-900 py-8 px-2">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400 flex items-center gap-2 justify-center">
          <Lock className="w-7 h-7" /> نسيت كلمة المرور؟
        </h2>
        {error && (
          <div className="flex items-center bg-red-100 text-red-700 px-4 py-2 rounded mb-4 border border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700 text-center animate-shake">
            <AlertTriangle className="w-5 h-5 ml-2 text-red-500 dark:text-red-300" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded mb-4 border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700 text-center animate-pulse">
            <CheckCircle className="w-5 h-5 ml-2 text-green-600 dark:text-green-300" />
            <span>{success}</span>
          </div>
        )}
        {step === 1 && (
          <form onSubmit={handleUsernameSubmit} className="space-y-5" dir="rtl" autoComplete="off">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">اسم المستخدم</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white pr-10"
                  autoFocus
                  required
                />
                <User className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg text-white font-bold transition-all duration-200 bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              تحقق من اسم المستخدم
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-5" dir="rtl" autoComplete="off">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">كلمة المرور الجديدة</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة المرور الجديدة"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white pr-10"
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
                  placeholder="تأكيد كلمة المرور"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white pr-10"
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
              className="w-full py-2 rounded-lg text-white font-bold transition-all duration-200 bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              تغيير كلمة المرور
            </button>
          </form>
        )}
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 mt-6 text-green-600 dark:text-green-400 hover:underline font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة لتسجيل الدخول
        </Link>
      </div>
    </div>
  );
});

export default ForgetPassword;