// src/components/Footer.jsx

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-2">معلومات عنا</h3>
          <p className="text-gray-400">B7ayemko - أفضل مكان لبيع وشراء الحيوانات والماشية.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">روابط سريعة</h3>
          <ul className="text-gray-400">
            <li className="mb-1"><a href="/">الرئيسية</a></li>
            <li className="mb-1"><a href="/add-animal">إضافة إعلان</a></li>
            <li className="mb-1"><a href="/services">خدمات ما بعد البيع</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">تواصل معنا</h3>
          <p className="text-gray-400">البريد الإلكتروني:hosamsayedee@gmail.com</p>
          <p className="text-gray-400">الهاتف: 01033239589</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} B7ayemko. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};

export default Footer;
