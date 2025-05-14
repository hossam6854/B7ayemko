import React, { useState, useMemo } from "react";
import AnimalCard from "../components/AnimalCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";

const HomePage = () => {
  const animals = useSelector((state) => state.animals.animals);
  const user = useSelector((state) => state.auth.user);

  // استخراج التصنيفات والمواقع من البيانات
  const categories = useMemo(
    () =>
      Array.from(
        new Set((animals || []).map((a) => a.category).filter(Boolean))
      ),
    [animals]
  );
  const locations = useMemo(
    () =>
      Array.from(
        new Set((animals || []).map((a) => a.location).filter(Boolean))
      ),
    [animals]
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredAnimals = useMemo(() => {
    return (animals || []).filter((animal) => {
      // بحث نصي في العنوان أو الوصف أو الموقع
      const searchMatch =
        search === "" ||
        animal.title?.toLowerCase().includes(search.toLowerCase()) ||
        animal.description?.toLowerCase().includes(search.toLowerCase()) ||
        animal.location?.toLowerCase().includes(search.toLowerCase());

      const categoryMatch = !category || animal.category === category;

      const locationMatch = !location || animal.location === location;

      const price = Number(animal.price);
      const minOk = !minPrice || price >= Number(minPrice);
      const maxOk = !maxPrice || price <= Number(maxPrice);

      return searchMatch && categoryMatch && locationMatch && minOk && maxOk;
    });
  }, [animals, search, category, location, minPrice, maxPrice]);

  const filteredAnimalsNoOwn = filteredAnimals.filter(
    (animal) => animal.owner !== user?.username
  );

  return (
    <div
      className="bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-900 dark:to-gray-800 py-12 min-h-screen"
      dir="rtl"
    >
      <div className="container mx-auto px-2">
        {/* شريط البحث والفلاتر */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 mb-8 items-center justify-between">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 text-right w-full md:w-auto">
            الحيوانات المتاحة للبيع
          </h2>
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 text-right w-full md:w-auto">
            الصعيدي دايما ريس علشان متغدي كويس
          </h2>
          <Link
            to="/addAnimal"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <PlusCircle className="w-5 h-5" />
            إضافة إعلان جديد
          </Link>
        </div>
        {/* فلاتر البحث */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="ابحث عن نوع أو وصف أو موقع..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white pr-10"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
              size={18}
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white cursor-pointer"
          >
            <option value="">كل الأنواع</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:w-1/6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white cursor-pointer"
          >
            <option value="">كل المواقع</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            placeholder="السعر من"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full md:w-1/12 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
          <input
            type="number"
            min="0"
            placeholder="السعر إلى"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full md:w-1/12 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>
        {/* نتائج البحث */}
        {filteredAnimals.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <img
              src="/images/empty-box.svg"
              alt="لا توجد إعلانات"
              className="w-40 h-40 opacity-80 mb-4"
              loading="lazy"
            />
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              لا توجد حيوانات مطابقة للبحث.
            </p>
            <Link
              to="/addAnimal"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-bold transition-all duration-200 shadow"
            >
              <PlusCircle className="w-4 h-4" />
              أضف أول إعلان لك الآن
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">
            {filteredAnimalsNoOwn.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
