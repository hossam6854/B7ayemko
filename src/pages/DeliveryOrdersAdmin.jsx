import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDeliveryStatus,
  deleteDeliveryOrder,
} from "../redux/slices/deliverySlice";
import {
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  Search,
  FileDown,
  Truck,
  User,
  Tag,
  BadgeDollarSign,
  MapPin,
} from "lucide-react";

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


const DeliveryOrdersAdmin = () => {
  const dispatch = useDispatch();
  const deliveries = useSelector((state) => state.delivery.deliveries);
  const user = useSelector((state) => state.auth.user);
  const animals = useSelector((state) => state.animals.animals);

  // جلب فقط الطلبات التي تخص حيوانات المستخدم الحالي
  const myAnimalIds = useMemo(
    () => animals.filter((a) => a.owner === user?.username).map((a) => a.id),
    [animals, user]
  );

  const myDeliveries = useMemo(
    () => deliveries.filter((order) => myAnimalIds.includes(order.animalId)),
    [deliveries, myAnimalIds]
  );

  // State للفلترة والبحث والفرز
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // عدادات الحالات
  const counters = useMemo(() => {
    const c = { all: myDeliveries.length };
    Object.keys(statusNames).forEach(
      (k) => (c[k] = myDeliveries.filter((d) => d.status === k).length)
    );
    return c;
  }, [myDeliveries]);

  // فلترة وبحث وفرز الطلبات
  const filtered = useMemo(() => {
    let list = [...myDeliveries];
    if (statusFilter !== "all") {
      list = list.filter((d) => d.status === statusFilter);
    }
    if (search.trim()) {
      list = list.filter(
        (d) =>
          d.name?.includes(search) ||
          d.phone?.includes(search) ||
          d.animalTitle?.includes(search) ||
          String(d.animalId).includes(search)
      );
    }
    list.sort((a, b) => {
      if (sortBy === "date") {
        return sortDir === "desc"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      }
      return 0;
    });
    return list;
  }, [myDeliveries, statusFilter, search, sortBy, sortDir]);

  // تغيير حالة الطلب
  const handleStatusChange = (id, status) => {
    dispatch(updateDeliveryStatus({ id, status }));
  };

  // حذف طلب
  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف الطلب؟")) {
      dispatch(deleteDeliveryOrder(id));
    }
  };

  // تصدير CSV
  const handleExportCSV = () => {
    const rows = [
      ["رقم الطلب", "الحيوان", "العميل", "الهاتف", "العنوان", "الحالة", "التاريخ"],
      ...filtered.map((o) => [
        o.id,
        o.animalTitle,
        o.name,
        o.phone,
        o.address,
        statusNames[o.status] || o.status,
        o.date,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "delivery_orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 dark:from-gray-900 dark:to-gray-800 py-10 px-2" dir="rtl">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-10">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-8 text-center">
          جميع طلبات التوصيل
        </h2>

        {/* عدادات الحالات */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <button
            className={`px-4 py-2 rounded-lg font-bold border ${statusFilter === "all" ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"}`}
            onClick={() => setStatusFilter("all")}
          >
            الكل <span className="ml-1 font-normal">({counters.all})</span>
          </button>
          {Object.entries(statusNames).map(([k, v]) => (
            <button
              key={k}
              className={`px-4 py-2 rounded-lg font-bold border ${statusFilter === k ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"}`}
              onClick={() => setStatusFilter(k)}
            >
              {v} <span className="ml-1 font-normal">({counters[k]})</span>
            </button>
          ))}
        </div>

        {/* بحث وفرز وتصدير */}
        <div className="flex flex-wrap gap-3 mb-6 justify-between items-center">
          <div className="flex gap-2 items-center flex-1">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="بحث بالاسم أو الهاتف أو الحيوان..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white w-60"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter size={20} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 border rounded-lg dark:bg-gray-800 dark:text-white"
            >
              <option value="date">الترتيب حسب التاريخ</option>
              <option value="name">الترتيب حسب الاسم</option>
              <option value="status">الترتيب حسب الحالة</option>
            </select>
            <button
              className="px-2 py-1 border rounded-lg dark:bg-gray-800 dark:text-white"
              onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
              title="عكس الترتيب"
            >
              {sortDir === "asc" ? "⬆️" : "⬇️"}
            </button>
            <button
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
              onClick={handleExportCSV}
              title="تصدير الطلبات"
            >
              <FileDown size={16} /> تصدير
            </button>
          </div>
        </div>

        {/* جدول الطلبات */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-300 py-16">
            لا توجد طلبات مطابقة للبحث أو الفلتر.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-700 dark:text-gray-200 text-lg">
                  <th className="p-2">#</th>
                  <th className="p-2">الحيوان</th>
                  <th className="p-2">العميل</th>
                  <th className="p-2">الهاتف</th>
                  <th className="p-2">العنوان</th>
                  <th className="p-2">الحالة</th>
                  <th className="p-2">تاريخ الطلب</th>
                  <th className="p-2">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, idx) => (
                  <tr
                    key={order.id}
                    className="bg-green-50 dark:bg-gray-800/60 rounded-xl shadow hover:scale-[1.01] transition cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="p-2 font-bold text-green-700">{idx + 1}</td>
                    <td className="p-2">
                      <div className="font-semibold">{order.animalTitle}</div>
                      <div className="text-xs text-gray-400">#{order.animalId}</div>
                    </td>
                    <td className="p-2">
                      <div className="font-semibold">{order.name}</div>
                    </td>
                    <td className="p-2">{order.phone}</td>
                    <td className="p-2 max-w-xs truncate">{order.address}</td>
                    <td className="p-2">
                      <span className={`px-3 py-1 rounded-full font-bold text-xs ${statusColors[order.status] || ""}`}>
                        {statusNames[order.status] || order.status}
                      </span>
                    </td>
                    <td className="p-2">
                      {order.date ? new Date(order.date).toLocaleString() : ""}
                    </td>
                    <td className="p-2 flex flex-wrap gap-2">
                      {order.status !== "delivered" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, "delivered");
                          }}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                          title="تم التوصيل"
                        >
                          <CheckCircle2 size={16} /> توصيل
                        </button>
                      )}
                      {order.status !== "delivering" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, "delivering");
                          }}
                          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                          title="جاري التوصيل"
                        >
                          <Clock size={16} /> جاري التوصيل
                        </button>
                      )}
                      {order.status !== "rejected" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, "rejected");
                          }}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                          title="رفض الطلب"
                        >
                          <XCircle size={16} /> رفض
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(order.id);
                        }}
                        className="flex items-center gap-1 bg-gray-400 hover:bg-gray-600 text-white px-3 py-1 rounded transition"
                        title="حذف الطلب"
                      >
                        <Trash2 size={16} /> حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal تفاصيل الطلب */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fade-in">
              <button
                className="absolute left-4 top-4 text-gray-400 hover:text-red-500 transition"
                onClick={() => setSelectedOrder(null)}
                aria-label="إغلاق"
              >
                <XCircle size={28} />
              </button>
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4 text-center">
                تفاصيل الطلب
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="font-bold">الحيوان:</span> {selectedOrder.animalTitle} (#{selectedOrder.animalId})
                </div>
                <div>
                  <span className="font-bold">العميل:</span> {selectedOrder.name} 
                </div>
                <div>
                  <span className="font-bold">الهاتف:</span> {selectedOrder.phone}
                </div>
                <div>
                  <span className="font-bold">العنوان:</span> {selectedOrder.address}
                </div>
                <div>
                  <span className="font-bold">الحالة:</span>{" "}
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${statusColors[selectedOrder.status] || ""}`}>
                    {statusNames[selectedOrder.status] || selectedOrder.status}
                  </span>
                </div>
                <div>
                  <span className="font-bold">تاريخ الطلب:</span>{" "}
                  {selectedOrder.date ? new Date(selectedOrder.date).toLocaleString() : ""}
                </div>
                {selectedOrder.notes && (
                  <div>
                    <span className="font-bold">ملاحظات:</span> {selectedOrder.notes}
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-6 justify-center">
                {selectedOrder.status !== "delivered" && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, "delivered");
                      setSelectedOrder(null);
                    }}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                  >
                    <CheckCircle2 size={18} /> توصيل الطلب
                  </button>
                )}
                {selectedOrder.status !== "delivering" && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, "delivering");
                      setSelectedOrder(null);
                    }}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                  >
                    <Clock size={18} /> جاري التوصيل
                  </button>
                )}
                {selectedOrder.status !== "rejected" && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, "rejected");
                      setSelectedOrder(null);
                    }}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                  >
                    <XCircle size={18} /> رفض الطلب
                  </button>
                )}
                <button
                  onClick={() => {
                    handleDelete(selectedOrder.id);
                    setSelectedOrder(null);
                  }}
                  className="flex items-center gap-1 bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                >
                  <Trash2 size={18} /> حذف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DeliveryOrdersAdmin;