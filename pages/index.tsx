import React, { useState } from 'react';
import BookingPage from '../components/BookingPage';
import AdminDashboard from '../components/AdminDashboard';
import { Settings, User } from 'lucide-react';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsAdmin(!isAdmin)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-2xl hover:bg-indigo-700 transition-all active:scale-95"
      >
        {isAdmin ? (
          <><User size={20} /> กลับไปหน้าจอง</>
        ) : (
          <><Settings size={20} /> ระบบจัดการ</>
        )}
      </button>

      <main className="animate-in fade-in duration-700">
        {isAdmin ? <AdminDashboard /> : <BookingPage />}
      </main>
    </div>
  );
}
