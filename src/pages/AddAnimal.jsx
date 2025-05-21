import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAnimal } from "../redux/slices/animalsSlice";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useSelector } from "react-redux";



const AddAnimal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: [],
    location: "",
    status: "available",
    date: new Date().toISOString().split("T")[0],
    age: "",
    gender: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );

    setFormData((prev) => ({
      ...prev,
      images: base64Images,
    }));

    setImagePreviews(base64Images);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (
      !formData.title ||
      !formData.price ||
      !formData.category ||
      !formData.location ||
      !formData.age ||
      !formData.gender
    ) {
      setErrorMsg("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setLoading(true);

    try {
      dispatch(addAnimal({ ...formData, owner: user.username, date: formData.date || new Date().toISOString().split("T")[0] }));
      setSuccessMsg("تم إضافة الإعلان بنجاح!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/");
      }, 1200);
    } catch (err) {
      setErrorMsg("حدث خطأ أثناء إضافة الإعلان.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-8 px-2"
      dir="rtl"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        autoComplete="off"
      >
        <h2 className="md:col-span-2 text-2xl font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
          <UploadCloud /> إضافة إعلان جديد
        </h2>

        {errorMsg && (
          <div className="md:col-span-2 flex items-center bg-red-100 text-red-700 px-4 py-2 rounded mb-2 border border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700 text-center animate-shake">
            <AlertTriangle className="w-5 h-5 ml-2" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="md:col-span-2 flex items-center bg-green-100 text-green-700 px-4 py-2 rounded mb-2 border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700 text-center animate-pulse">
            <CheckCircle2 className="w-5 h-5 ml-2" />
            <span>{successMsg}</span>
          </div>
        )}

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            العنوان *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="مثال: عجل بلدي للبيع"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            الوصف *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="أدخل تفاصيل الإعلان..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            السعر (جنيه) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="مثال: 5000"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            الموقع *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="مثال: المنيا"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            العمر (بالسنوات) *
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="مثال: 2"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            الجنس *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            required
          >
            <option value="">اختر الجنس</option>
            <option value="ذكر">ذكر</option>
            <option value="انثى">انثى</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            الفئة *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            required
          >
            <option value="">اختر الفئة</option>
            <option value="جمل">جمل</option>
            <option value="بقر">بقر</option>
            <option value="خروف">خروف</option>
            <option value="حمار">حمار</option>
            <option value="أغنام">أغنام</option>
            <option value="حصان">حصان</option>
            <option value="طيور">طيور</option>
            <option value="ارنب">ارنب</option>
            <option value="دجاج">دجاج</option>
            <option value="بط">بط</option>
            <option value="كلب">كلب</option>
            <option value="قط">قط</option>
            <option value="حيوانات أليفة">حيوانات أليفة</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            صور الحيوان
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {/* معاينة الصور */}
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-2">
              {imagePreviews.map((src, idx) => (
                <img
                  src={src}
                  alt={`animal-preview-${idx}`}
                  key={idx}
                  className="w-20 h-20 object-cover"
                />
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="md:col-span-2 mt-2 w-full py-3 rounded-lg text-white font-bold transition-all duration-200 bg-gradient-to-l from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              جاري إضافة الإعلان...
            </>
          ) : (
            "إضافة الإعلان"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAnimal;
