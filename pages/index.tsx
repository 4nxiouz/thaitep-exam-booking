import React, { useState } from 'react';
import BookingPage from '../components/BookingPage';
import AdminDashboard from '../components/AdminDashboard';
import { Settings } from 'lucide-react';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <button
        onClick={() => setShowAdmin(!showAdmin)}
        className="fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        <Settings className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${showAdmin ? 'rotate-180' : ''}`} />
      </button>

      {showAdmin ? <AdminDashboard /> : <BookingPage />}
    </div>
  );
}
