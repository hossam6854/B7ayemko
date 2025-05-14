import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeliveryRequestModal from "../components/DeliveryRequest";
import {
  BadgeDollarSign,
  MapPin,
  Tag,
  CalendarDays,
  User,
  ArrowRight,
  Phone,
  Share2,
} from "lucide-react";

const defaultImage = "/images/animal-placeholder.svg";

const AnimalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);

  const animals = useSelector((state) => state.animals.animals);
  const user = useSelector((state) => state.auth.user);

  // جلب الحيوان المطلوب
  const animal = useMemo(
    () => animals.find((a) => String(a.id) === String(id)),
    [animals, id]
  );

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white/80 dark:bg-gray-800/90 rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
          <p className="text-xl text-red-600 dark:text-red-300 mb-4 font-bold">
            الحيوان غير موجود
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition shadow"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  // مشاركة الإعلان
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: animal.title,
        text: animal.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ رابط الإعلان!");
    }
  };

  // واتساب
  const handleWhatsApp = () => {
    const msg = `👋 مرحبًا، أود الاستفسار عن الحيوان: ${animal.title} (رقم ${animal.id})`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        msg + " " + window.location.href
      )}`,
      "_blank"
    );
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-8 px-2"
      dir="rtl"
    >
      <div className="w-full max-w-3xl bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col gap-8 animate-fade-in-up">
        {/* زر رجوع */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold mb-2 hover:underline w-fit"
        >
          <ArrowRight size={20} /> رجوع
        </button>

        {/* صورة الحيوان */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex-shrink-0 w-64 h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-green-200 dark:border-green-800 bg-gray-100 dark:bg-gray-800 flex items-center justify-center animate-fade-in">
            {Array.isArray(animal.images) && animal.images.length > 0 ? (
              <div className="w-full">
                <img
                  src={animal.images[0]}
                  alt={animal.title}
                  className="w-full h-64 object-cover rounded-xl border border-gray-200 dark:border-gray-700 shadow"
                  loading="lazy"
                />
              </div>
            ) : (
              <img
                src={defaultImage}
                alt="لا توجد صورة"
                className="w-28 h-28 opacity-60"
              />
            )}
          </div>
          {/* تفاصيل الحيوان */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <span
                className={`px-3 py-1 rounded-full font-bold text-xs ${
                  animal.status === "sold"
                    ? "bg-red-600 text-white"
                    : "bg-green-500 text-white"
                } shadow`}
              >
                {animal.status === "sold" ? "مباع" : "متاح"}
              </span>
              {animal.isNew && (
                <span className="ml-2 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  جديد
                </span>
              )}
            </div>
            <h2 className="text-3xl font-extrabold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
              <Tag /> {animal.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 text-lg mb-2 font-medium">
              {animal.description}
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-bold">
              <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                <Tag size={16} /> {animal.category}
              </span>
              <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                <CalendarDays size={16} /> {animal.age} سنة
              </span>
              <span className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                <BadgeDollarSign size={16} /> {animal.price} جنيه
              </span>
              <span className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">
                <User size={16} /> {animal.owner}
              </span>
              <span className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">
                <MapPin size={16} /> {animal.location}
              </span>
            </div>
            {/* أزرار التواصل والمشاركة */}
            <div className="flex flex-wrap gap-3 md:gap-4 mt-6 justify-center md:justify-end">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-bold shadow-md transition min-w-[170px] justify-center"
              >
                <Phone /> تواصل عبر واتساب
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-5 py-2 rounded-lg font-bold shadow-md transition min-w-[170px] justify-center"
              >
                <Share2 /> مشاركة الإعلان
              </button>
              {animal.status === "available" &&
                user?.username !== animal.owner && (
                  <button
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-5 py-2 rounded-lg font-bold shadow-md transition min-w-[170px] justify-center"
                    onClick={() => setShowDeliveryModal(true)}
                  >
                    🚚 اطلب التوصيل
                  </button>
                )}
              {showDeliveryModal && (
                <DeliveryRequestModal
                  animal={animal}
                  onClose={() => setShowDeliveryModal(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AnimalDetails);
