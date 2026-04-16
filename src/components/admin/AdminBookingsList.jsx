import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Calendar, Phone, Mail } from 'lucide-react';

export default function AdminBookingsList() {
  const { bookings } = useAppContext();

  if (bookings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-lg p-12 text-center"
      >
        <p className="text-gray-500 text-lg">No test drive bookings yet.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-6">Test Drive Bookings ({bookings.length})</h2>
      
      {bookings.map((booking, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-bold">{booking.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Contact</p>
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-sm">
                  <Phone size={16} /> {booking.phone}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Mail size={16} /> {booking.email}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Appointment</p>
              <p className="flex items-center gap-2 font-bold">
                <Calendar size={16} className="text-bmw-blue" />
                {booking.preferredDate} at {booking.preferredTime}
              </p>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
