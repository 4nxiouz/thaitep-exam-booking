import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Plus, Trash2, Check, X } from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  async function fetchAdminData() {
    const { data: b } = await supabase.from('bookings').select('*, exam_rounds(exam_date)');
    const { data: r } = await supabase.from('exam_rounds').select('*');
    setBookings(b || []);
    setRounds(r || []);
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">ระบบหลังบ้าน Admin</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
          <Plus size={20} /> เพิ่มรอบสอบ
        </button>
      </div>

      <div className="grid gap-8">
        {/* ตารางแสดงคนจอง */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-bold flex items-center gap-2"><Users /> รายชื่อผู้จองล่าสุด</h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm uppercase text-gray-500">
              <tr>
                <th className="p-4">ชื่อ</th>
                <th className="p-4">อีเมล</th>
                <th className="p-4">รอบสอบ</th>
                <th className="p-4">สถานะ</th>
                <th className="p-4">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{booking.name}</td>
                  <td className="p-4 text-gray-600">{booking.email}</td>
                  <td className="p-4">{booking.exam_rounds?.exam_date}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Pending</span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button className="p-1 text-green-600 hover:bg-green-50 rounded"><Check size={18}/></button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
