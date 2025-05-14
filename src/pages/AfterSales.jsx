import React, { useState } from "react";
import { HeartHandshake, Stethoscope, Utensils, Dog, MessageCircle, Truck } from "lucide-react";

const services = [
  {
    icon: <Stethoscope size={32} className="text-green-600" />,
    title: "دعم بيطري",
    desc: "استشارات طبية مجانية من أطباء بيطريين معتمدين لمتابعة صحة الحيوان بعد الشراء.",
    type: "vet"
  },
  {
    icon: <Utensils size={32} className="text-yellow-600" />,
    title: "استشارة غذائية",
    desc: "نصائح غذائية وخطط تغذية مناسبة حسب نوع الحيوان وعمره.",
    type: "food"
  },
  {
    icon: <Dog size={32} className="text-blue-600" />,
    title: "تدريب الحيوانات",
    desc: "خدمة تدريب الحيوانات على الطاعة أو المهارات الأساسية مع مدربين محترفين.",
    type: "training"
  },
  {
    icon: <Truck size={32} className="text-purple-600" />,
    title: "نقل ورعاية مؤقتة",
    desc: "خدمة نقل أو رعاية مؤقتة للحيوان في حال السفر أو الحاجة.",
    type: "transport"
  },
  {
    icon: <MessageCircle size={32} className="text-gray-600" />,
    title: "تواصل مع الدعم",
    desc: "فريق دعم متواجد للإجابة على جميع استفساراتك أو استقبال الشكاوى.",
    type: "support"
  },
];

const AfterSales = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", details: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (type) => {
    setSelectedService(type);
    setForm({ name: "", phone: "", details: "" });
    setSubmitted(false);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إرسال البيانات للسيرفر أو البريد
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-900 dark:to-gray-800 py-10 px-2" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-green-700 dark:text-green-400 mb-8 text-center flex items-center justify-center gap-2">
          <HeartHandshake size={28} /> خدمات ما بعد البيع
        </h2>
        {/* بطاقات الخدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {services.map((srv) => (
            <div
              key={srv.type}
              className={`bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg p-6 flex flex-col gap-3 items-center transition hover:scale-105 cursor-pointer border-2 border-transparent hover:border-green-400`}
              onClick={() => handleSelect(srv.type)}
            >
              {srv.icon}
              <div className="text-lg font-bold text-green-700 dark:text-green-300">{srv.title}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm text-center">{srv.desc}</div>
              <button
                className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow transition"
                onClick={() => handleSelect(srv.type)}
              >
                اطلب الخدمة
              </button>
            </div>
          ))}
        </div>
        {/* نموذج طلب الخدمة */}
        {selectedService && (
          <div className="bg-green-50 dark:bg-gray-800/80 rounded-2xl shadow-lg p-6 mt-6 animate-fade-in">
            <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4 text-center">
              طلب خدمة: {services.find((s) => s.type === selectedService)?.title}
            </h3>
            {submitted ? (
              <div className="text-green-600 dark:text-green-400 text-center font-bold py-8">
                ✅ تم استلام طلبك بنجاح، سنقوم بالتواصل معك قريبًا.
              </div>
            ) : (
              <form className="flex flex-col gap-4 max-w-md mx-auto" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="اسمك"
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 dark:bg-gray-900"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="رقم الجوال"
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 dark:bg-gray-900"
                  required
                />
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  placeholder="اكتب تفاصيل الخدمة المطلوبة أو استفسارك"
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 dark:bg-gray-900"
                  rows={3}
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow transition"
                >
                  إرسال الطلب
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AfterSales;