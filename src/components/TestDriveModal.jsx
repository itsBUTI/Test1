import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Check, ChevronRight } from 'lucide-react';

export default function TestDriveModal({ isOpen, onClose, vehicle }) {
  const [step, setStep] = useState('form'); // 'form' or 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: ''
  });

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '12:00 PM',
    '02:00 PM',
    '04:00 PM',
    '05:30 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.date && formData.timeSlot) {
      setStep('success');
      setTimeout(() => {
        handleClose();
      }, 3500);
    }
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ name: '', phone: '', date: '', timeSlot: '' });
    onClose();
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Blurred Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4"
          >
            {/* Form State */}
            {step === 'form' && (
              <div className="card-luxury-lg relative">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-dark-10 hover:bg-dark text-luxury-text-secondary hover:text-luxury-text flex items-center justify-center transition-all duration-300"
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-headline-2 mb-2">Experience Excellence</h2>
                  <p className="text-body-sm text-luxury-text-secondary">Book your exclusive test drive</p>
                </div>

                {/* Vehicle Info Card */}
                {vehicle && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 p-4 bg-dark-10 rounded-lg border border-luxury-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={vehicle.images?.[0] || vehicle.image}
                        alt={vehicle.model}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-body font-medium">{vehicle.brand} {vehicle.model}</p>
                        <p className="text-caption text-luxury-text-secondary">{vehicle.year} • {vehicle.color}</p>
                        <p className="text-caption text-luxury-accent font-medium mt-1">
                          ${vehicle.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="block text-body-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-dark-10 border border-luxury-border rounded-lg text-luxury-text placeholder-luxury-text-secondary/50 focus:outline-none focus:border-luxury-accent focus:ring-1 focus:ring-luxury-accent/30 transition-all duration-300"
                      required
                    />
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-body-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-dark-10 border border-luxury-border rounded-lg text-luxury-text placeholder-luxury-text-secondary/50 focus:outline-none focus:border-luxury-accent focus:ring-1 focus:ring-luxury-accent/30 transition-all duration-300"
                      required
                    />
                  </motion.div>

                  {/* Date Picker */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block text-body-sm font-medium mb-2 flex items-center gap-2">
                      <Calendar size={16} className="text-luxury-accent" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={today}
                      className="w-full px-4 py-3 bg-dark-10 border border-luxury-border rounded-lg text-luxury-text focus:outline-none focus:border-luxury-accent focus:ring-1 focus:ring-luxury-accent/30 transition-all duration-300"
                      required
                    />
                  </motion.div>

                  {/* Time Slots */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-body-sm font-medium mb-3 flex items-center gap-2">
                      <Clock size={16} className="text-luxury-accent" />
                      Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot, idx) => (
                        <motion.button
                          key={slot}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + idx * 0.05 }}
                          onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot }))}
                          className={`py-2 px-3 rounded-lg border transition-all duration-300 text-body-sm font-medium flex items-center justify-center gap-2 ${
                            formData.timeSlot === slot
                              ? 'bg-luxury-accent text-dark border-luxury-accent'
                              : 'bg-dark-10 border-luxury-border text-luxury-text hover:border-luxury-accent'
                          }`}
                        >
                          {formData.timeSlot === slot && <Check size={14} />}
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!formData.name || !formData.phone || !formData.date || !formData.timeSlot}
                    className="w-full mt-6 py-3 rounded-lg bg-gradient-luxury text-dark font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:scale-100 transition-all duration-300"
                  >
                    Confirm Test Drive
                    <ChevronRight size={18} />
                  </motion.button>

                  {/* Secondary Info */}
                  <p className="text-center text-caption text-luxury-text-secondary mt-4">
                    We'll contact you to confirm your appointment
                  </p>
                </form>
              </div>
            )}

            {/* Success State */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="card-luxury-lg text-center py-8"
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-luxury-accent to-blue-600 flex items-center justify-center mx-auto mb-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                  >
                    <Check size={32} className="text-dark" />
                  </motion.div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-headline-2 mb-2">Perfect!</h3>
                  <p className="text-body-sm text-luxury-text-secondary mb-1">
                    Your test drive is scheduled
                  </p>
                  <p className="text-body text-luxury-accent font-medium">
                    {formData.date} at {formData.timeSlot}
                  </p>
                </motion.div>

                {/* Confirmation Details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 p-4 bg-dark-10 rounded-lg border border-luxury-border/50"
                >
                  <p className="text-body-sm mb-2">
                    <span className="text-luxury-text-secondary">Name:</span>
                    <span className="text-luxury-text ml-2 font-medium">{formData.name}</span>
                  </p>
                  <p className="text-body-sm">
                    <span className="text-luxury-text-secondary">Phone:</span>
                    <span className="text-luxury-text ml-2 font-medium">{formData.phone}</span>
                  </p>
                </motion.div>

                {/* Closing Message */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-caption text-luxury-text-secondary mt-6"
                >
                  Redirecting in a moment...
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
