import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { MessageCircle, Mail, Phone } from 'lucide-react';

export default function AdminInquiriesList() {
  const { inquiries } = useAppContext();

  if (inquiries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-lg p-12 text-center"
      >
        <p className="text-gray-500 text-lg">No inquiries yet.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-6">Inquiries & Messages ({inquiries.length})</h2>
      
      {inquiries.map((inquiry, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm mb-2">From</p>
              <p className="font-bold text-lg">{inquiry.name}</p>
              <div className="space-y-1 mt-2">
                <p className="flex items-center gap-2 text-sm">
                  <Phone size={16} /> {inquiry.phone}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Mail size={16} /> {inquiry.email}
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-2">Type</p>
              {inquiry.vehicleModel && (
                <p className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-2">
                  Vehicle: {inquiry.vehicleModel}
                </p>
              )}
              {inquiry.type === 'financing_application' && (
                <p className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm inline-block mb-2">
                  Financing Application
                </p>
              )}
              <p className="text-gray-600 text-sm">
                {inquiry.timestamp ? new Date(inquiry.timestamp).toLocaleDateString() : 'No date'}
              </p>
            </div>
          </div>

          {inquiry.message && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-gray-500 text-sm mb-2 flex items-center gap-2">
                <MessageCircle size={16} /> Message
              </p>
              <p className="text-gray-700 italic">"{inquiry.message}"</p>
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}
