import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAnimal } from "../redux/slices/animalsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { UploadCloud, CheckCircle2, AlertTriangle } from "lucide-react";

const EditAnimal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const animal = useSelector((state) =>
    state.animals.animals.find((a) => a.id === id)
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: [],
    location: "",
    status: "available",
    age: "",
    gender: "",
    date: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (animal) {
      setFormData({
        title: animal.title || "",
        description: animal.description || "",
        price: animal.price || "",
        category: animal.category || "",
        images: animal.images || [],
        location: animal.location || "",
        status: animal.status || "available",
        age: animal.age || "",
        gender: animal.gender || "",
        date: animal.date || "",
      });
      setImagePreviews(animal.images ? animal.images : []);
    }
  }, [animal]);

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
    setLoading(true);
  
    // إذا كان formData.date فاضي، استخدم animal.date القديم
    const updatedDate = formData.date || animal.date;
  
    if (
      !formData.title ||
      !formData.price ||
      !formData.category ||
      !formData.location ||
      !formData.age ||
      !formData.gender
    ) {
      setErrorMsg("يرجى تعبئة جميع الحقول المطلوبة");
      setLoading(false);
      return;
    }
  
    dispatch(updateAnimal({ id, ...formData, date: updatedDate }));
  
    setSuccessMsg("تم تحديث الإعلان بنجاح!");
    setLoading(false);
    navigate("/myAds");
  };

  if (!animal) {
    return (
      <div className="text-center mt-8 text-red-600 font-bold text-xl">
        الإعلان غير موجود!
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-8 px-2"
      dir="rtl"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h2 className="md:col-span-2 text-3xl font-bold text-green-700 dark:text-green-400 text-center mb-2">
          تعديل إعلان الحيوان
        </h2>

        {errorMsg && (
          <div className="md:col-span-2 flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/30 px-3 py-2 rounded mb-2">
            <AlertTriangle size={18} /> {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="md:col-span-2 flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded mb-2">
            <CheckCircle2 size={18} /> {successMsg}
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
            required
            min={0}
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
            required
            min={0}
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
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
            <option value="فراخ">فراخ</option>
            <option value="بط">بط</option>
            <option value="حيوانات أليفة">حيوانات أليفة</option>
          </select>
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
            required
          />
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
            className="w-full px-2 py-1 border rounded-lg bg-gray-50 dark:bg-gray-800"
          />
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-2">
              {imagePreviews.map((src, idx) => (
                <img
                  src={src}
                  alt={`animal-preview-${idx}`}
                  key={idx}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            الحالة
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
          >
            <option value="available">متاح</option>
            <option value="sold">تم البيع</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`md:col-span-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "جاري التحديث..." : "تحديث الإعلان"}
        </button>
      </form>
    </div>
  );
};

export default EditAnimal;
