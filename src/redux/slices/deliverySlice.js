// src/redux/slices/deliverySlice.js

import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// الحالة الابتدائية
const initialState = {
  deliveries: [], // جميع طلبات التوصيل
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    // إضافة طلب توصيل جديد
    addDeliveryOrder: (state, action) => {
      const newOrder = {
        id: uuidv4(),
        ...action.payload,
      };
      state.deliveries.push(newOrder);
    },
    // تحديث حالة الطلب (مثلاً: قيد التنفيذ، تم التوصيل، مرفوض...)
    updateDeliveryStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.deliveries.find((d) => d.id === id);
      if (order) {
        order.status = status;
      }
    },
    // حذف الطلب (مثلاً عند الإلغاء)
    deleteDeliveryOrder: (state, action) => {
      state.deliveries = state.deliveries.filter((d) => d.id !== action.payload);
    },
    // (اختياري) تحديث بيانات الطلب (العنوان أو الملاحظات...)
    updateDeliveryOrder: (state, action) => {
      const { id, ...rest } = action.payload;
      const index = state.deliveries.findIndex((d) => d.id === id);
      if (index !== -1) {
        state.deliveries[index] = { ...state.deliveries[index], ...rest };
      }
    },
  },
});

export const {
  addDeliveryOrder,
  updateDeliveryStatus,
  deleteDeliveryOrder,
  updateDeliveryOrder,
} = deliverySlice.actions;

export default deliverySlice.reducer;