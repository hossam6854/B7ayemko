import React from "react";
import { useNavigate } from "react-router-dom";
import { BadgeDollarSign, MapPin, Tag, CalendarDays } from "lucide-react";

const defaultImage = "/images/animal-placeholder.svg"; 

const AnimalCard = React.memo(({ animal }) => {
  const navigate = useNavigate();


  return (
    <div
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 relative group"
      dir="rtl"
    >
      {animal.status === "sold" && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
          مباع
        </span>
      )}
      {animal.status === "available" && (
        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
          متاح
        </span>
      )}

      {/* عرض الصورة */}
      {Array.isArray(animal?.images) && animal.images.length > 0 ? (
        <img
          src={animal.images[0]}
          alt={animal.title}
          className="w-full h-48 object-cover transition-all duration-200 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <img src={defaultImage} alt="لا توجد صورة" className="w-24 h-24 opacity-60" />
        </div>
      )}

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-green-700 dark:text-green-300 truncate max-w-[70%]" title={animal.title}>
            {animal.title}
          </h3>
          {animal.category && (
            <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded text-xs font-semibold">
              <Tag size={14} />
              {animal.category}
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-1" title={animal.description}>
          {animal.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
          <span className="flex items-center gap-1 text-green-700 dark:text-green-300 font-bold">
            <BadgeDollarSign size={16} /> {animal.price} جنيه
          </span>
          {animal.location && (
            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <MapPin size={14} /> {animal.location}
            </span>
          )}
          {animal.date && (
            <span className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
              <CalendarDays size={14} /> {animal.date}
            </span>
          )}
        </div>

        <button
          onClick={() => navigate(`/animal/${animal.id}`)}
          className="w-full bg-gradient-to-l from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white py-2 rounded-lg font-bold transition-all duration-200 shadow cursor-pointer"
        >
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
});

export default AnimalCard;
