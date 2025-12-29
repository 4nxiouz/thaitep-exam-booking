import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, User, Mail, GraduationCap, Upload, CheckCircle } from 'lucide-react';

export default function BookingPage() {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRound, setSelectedRound] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', user_type: 'student' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetchRounds();
  }, []);

  async function fetchRounds() {
    const { data } = await supabase.from('exam_rounds').select('*').eq('is_active', true);
    setRounds(data || []);
    setLoading(false);
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // โค้ดส่งข้อมูลไป Supabase
    const { error } = await supabase.from('bookings').insert([{
      ...formData,
      round_id: selectedRound,
      status: 'pending'
    }]);
    
    if (!error) setIsSuccess(true);
    setIsSubmitting(false);
  };

  if (isSuccess) return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold">จองที่นั่งสำเร็จ!</h2>
      <p className="text-gray-600 mt-2">กรุณารอการตรวจสอบหลักฐานการโอนเงิน</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">จองที่นั่งสอบ THAI-TEP</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* ส่วนเลือกรอบสอบ */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="text-indigo-600" /> เลือกรอบสอบ
          </h2>
          {rounds.map((round) => (
            <div 
              key={round.id}
              onClick={() => setSelectedRound(round.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedRound === round.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'
              }`}
            >
              <div className="font-bold">{new Date(round.exam_date).toLocaleDateString('th-TH')}</div>
              <div className="text-sm text-gray-600 flex items-center gap-1"><Clock size={14}/> {round.exam_time}</div>
              <div className="text-sm mt-2 font-medium text-indigo-600">ว่าง {round.max_seats - round.current_seats} ที่นั่ง</div>
            </div>
          ))}
        </div>

        {/* ส่วนกรอกข้อมูล */}
        <form onSubmit={handleBooking} className="bg-white p-6 rounded-2xl shadow-lg space-y-4 border border-gray-100">
           <h2 className="text-xl font-semibold mb-4">ข้อมูลผู้สมัคร</h2>
           <div>
             <label className="block text-sm font-medium mb-1">ชื่อ-นามสกุล</label>
             <input required className="w-full p-2 border rounded-lg" onChange={e => setFormData({...formData, name: e.target.value})} />
           </div>
           <div>
             <label className="block text-sm font-medium mb-1">อีเมล</label>
             <input type="email" required className="w-full p-2 border rounded-lg" onChange={e => setFormData({...formData, email: e.target.value})} />
           </div>
           <button 
             disabled={!selectedRound || isSubmitting}
             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:bg-gray-400"
           >
             {isSubmitting ? 'กำลังบันทึก...' : 'ยืนยันการจองที่นั่ง'}
           </button>
        </form>
      </div>
    </div>
  );
}
