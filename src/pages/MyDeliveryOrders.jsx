import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Truck, CheckCircle2, Clock, XCircle, BadgeDollarSign, MapPin } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50",
  delivering: "bg-blue-100 text-blue-700 dark:bg-blue-900/50",
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/50",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/50",
};
const statusNames = {
  pending: "قيد المراجعة",
  delivering: "جاري التوصيل",
  delivered: "تم التوصيل",
  rejected: "مرفوض",
};
const statusIcons = {
  pending: <Clock size={18} className="inline" />,
  delivering: <Truck size={18} className="inline" />,
  delivered: <CheckCircle2 size={18} className="inline" />,
  rejected: <XCircle size={18} className="inline" />,
};

const MyDeliveryOrders = () => {
  const user = useSelector((state) => state.auth.user);
  const deliveries = useSelector((state) => state.delivery.deliveries);

  // جلب طلبات المستخدم الحالي فقط
  const myOrders = useMemo(
    () => deliveries.filter((order) => order.user === user?.username),
    [deliveries, user]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-900 dark:to-gray-800 py-10 px-2" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-green-700 dark:text-green-400 mb-8 text-center flex items-center justify-center gap-2">
          <Truck size={28} /> طلبات التوصيل الخاصة بي
        </h2>
        {myOrders.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-300 py-16">
            لا توجد طلبات توصيل بعد.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {myOrders.map((order) => (
              <div
                key={order.id}
                className="bg-green-50 dark:bg-gray-800/60 rounded-xl shadow-md p-5 flex flex-col md:flex-row md:items-center gap-4 animate-fade-in"
              >
                {/* معلومات الحيوان */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-green-700 dark:text-green-400">{order.animalTitle}</span>
                    <span className="text-xs text-gray-400">#{order.animalId}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm mb-2">
                    <span className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">
                      <MapPin size={14} /> {order.address}
                    </span>
                  </div>
                  {order.notes && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span className="font-bold">ملاحظات:</span> {order.notes}
                    </div>
                  )}
                </div>
                {/* حالة الطلب وتاريخه */}
                <div className="flex flex-col items-center gap-2 min-w-[130px]">
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold text-xs ${statusColors[order.status] || ""}`}>
                    {statusIcons[order.status]} {statusNames[order.status] || order.status}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    {order.date ? new Date(order.date).toLocaleString() : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDeliveryOrders;