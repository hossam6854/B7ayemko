import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnimal, updateAnimal } from "../redux/slices/animalsSlice";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit2, CheckCircle2, XCircle } from "lucide-react";

const MyAds = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const animals = useSelector((state) => state.animals.animals);

  // عرض إعلانات المستخدم الحالي فقط
  const myAds = animals.filter((ad) => ad.owner === user?.username);

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف الإعلان؟")) {
      dispatch(deleteAnimal(id));
    }
  };

  const handleMarkSold = (ad) => {
    dispatch(updateAnimal({ ...ad, status: ad.status === "sold" ? "available" : "sold" }));
  };

  return (
    <div className="bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-900 dark:to-gray-800 min-h-screen py-10 "
    dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-8">
      إعلاناتي
        </h2>
        {myAds.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">لا يوجد لديك إعلانات بعد.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myAds.map((ad) => (
              <div key={ad.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-5 flex flex-col">
              <img
                  src={ad.images?.[0] || "/no-image.jpg"}
                  alt={ad.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <div className="flex-1">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300">{ad.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{ad.description}</p>
                <div className="flex flex-wrap gap-2 text-sm mb-2">
                <span className="bg-green-50 dark:bg-gray-800 px-2 py-1 rounded text-green-700 dark:text-green-300">
                {ad.price} جنيه
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">{ad.category}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">{ad.age} سنة</span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">{ad.gender}</span>
                    <span className={`px-2 py-1 rounded ${ad.status === "sold" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      {ad.status === "sold" ? "تم البيع" : "متاح"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/editAnimal/${ad.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded transition cursor-pointer"
                  >
                    <Edit2 size={16} /> تعديل
                  </button>
                  <button
                    onClick={() => handleMarkSold(ad)}
                    className={`flex-1 flex items-center justify-center gap-1 ${ad.status === "sold" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"} text-white py-1 rounded transition cursor-pointer`}
                  >
                    {ad.status === "sold" ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                    {ad.status === "sold" ? "إرجاع كمتاح" : "تم البيع"}
                  </button>
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded transition cursor-pointer"
                  >
                    <Trash2 size={16} /> حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAds;