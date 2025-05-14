import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDeliveryOrder } from "../redux/slices/deliverySlice";
import { XCircle, CheckCircle2, Loader2, Truck } from "lucide-react";

const DeliveryRequestModal = ({ animal, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    name: user?.username || "",
    phone: "",
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      if (!form.name || !form.phone || !form.address) {
        setError("يرجى تعبئة جميع الحقول المطلوبة");
        return;
      }
      setLoading(true);
      dispatch(
        addDeliveryOrder({
          ...form,
          animalId: animal.id,
          animalTitle: animal.title,
          user: user.username,
          status: "pending",
          date: new Date().toISOString(),
        })
      );
      setSuccess(true);
      setLoading(false);
      setTimeout(onClose, 1200);
    },
    [form, animal, user, dispatch, onClose]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-200/60 via-white/60 to-green-100/80 dark:from-gray-900/80 dark:via-gray-800/90 dark:to-gray-900/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-900/90 border border-green-200 dark:border-green-900 p-8 md:p-10 flex flex-col gap-4 animate-fade-in-up">
        {/* زر إغلاق دائري */}
        <button
          className="absolute left-4 top-4 bg-gray-200 dark:bg-gray-800 rounded-full p-1 hover:bg-red-100 hover:dark:bg-red-900 text-gray-400 hover:text-red-500 transition"
          onClick={onClose}
          aria-label="إغلاق"
        >
          <XCircle size={28} />
        </button>
        {/* عنوان مع أيقونة */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Truck size={28} className="text-green-600 dark:text-green-400" />
          <h2 className="text-2xl font-extrabold text-green-700 dark:text-green-400">
            طلب توصيل
          </h2>
        </div>
        <h3 className="text-center text-lg font-bold text-gray-700 dark:text-gray-200 mb-4">
          {animal.title}
        </h3>
        {/* النموذج */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white font-medium"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="اسم المستلم *"
            required
            autoFocus
          />
          <input
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white font-medium"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="رقم الهاتف *"
            required
            type="tel"
          />
          <input
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white font-medium"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="العنوان الكامل *"
            required
          />
          <textarea
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white font-medium"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="ملاحظات إضافية"
            rows={2}
          />
          {/* رسائل الخطأ أو النجاح */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/30 px-3 py-2 rounded font-bold">
              <XCircle size={18} /> {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded font-bold">
              <CheckCircle2 size={18} /> تم إرسال الطلب بنجاح!
            </div>
          )}
          {/* زر إرسال */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-green-600 to-blue-500 text-white py-2 rounded-lg font-extrabold text-lg hover:from-green-700 hover:to-blue-600 transition flex items-center justify-center gap-2 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            إرسال الطلب
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryRequestModal;