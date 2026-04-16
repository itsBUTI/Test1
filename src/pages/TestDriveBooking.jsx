import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../context/AppContext';

export default function TestDriveBooking() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const { vehicles, addBooking } = useAppContext();
  const selectedVehicle = vehicleId ? vehicles.find(v => v.id === parseInt(vehicleId)) : null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleId: vehicleId ? parseInt(vehicleId) : '',
    preferredDate: '',
    preferredTime: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBooking({
      ...formData,
      timestamp: new Date(),
    });
    alert('Test drive booking confirmed! We will contact you shortly.');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Book Test Drive - BMW AutoSallon</title>
        <meta name="description" content="Schedule your BMW test drive appointment today." />
      </Helmet>

      <div className="bg-dark min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-luxury-lg"
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-hero mb-2">Book Your Test Drive</h1>
              <p className="text-body-lg text-luxury-text-secondary">
                Experience the performance and precision of BMW. Complete the form below to schedule your appointment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vehicle Selection */}
              <div>
                <label className="text-body font-medium mb-3 block">Select Vehicle *</label>
                {selectedVehicle ? (
                  <div className="bg-dark-10 border border-luxury-border p-4 rounded-lg">
                    <p className="text-headline-3">{selectedVehicle.model} {selectedVehicle.year}</p>
                    <p className="text-body-sm text-luxury-text-secondary">{selectedVehicle.trim}</p>
                  </div>
                ) : (
                  <select
                    name="vehicleId"
                    value={formData.vehicleId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-dark-10 border border-luxury-border text-luxury-text focus:border-luxury-accent outline-none transition-colors"
                  >
                    <option value="" className="bg-luxury-dark">Select a vehicle...</option>
                    {vehicles.map(vehicle => (
                      <option key={vehicle.id} value={vehicle.id} className="bg-luxury-dark">
                        {vehicle.model} {vehicle.year} - ${(vehicle.price / 1000).toFixed(0)}K
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Personal Information Section */}
              <div className="space-y-6 pt-6 border-t border-luxury-border">
                <h3 className="text-headline-3">Your Information</h3>

                <div>
                  <label className="text-body font-medium mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-dark-10 border border-luxury-border text-luxury-text placeholder:text-luxury-text-secondary focus:border-luxury-accent outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-body font-medium mb-2 block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-dark-10 border border-luxury-border text-luxury-text placeholder:text-luxury-text-secondary focus:border-luxury-accent outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-body font-medium mb-2 block">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (234) 567-8900"
                    className="w-full px-4 py-3 rounded-lg bg-dark-10 border border-luxury-border text-luxury-text placeholder:text-luxury-text-secondary focus:border-luxury-accent outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Scheduling Section */}
              <div className="space-y-6 pt-6 border-t border-luxury-border">
                <h3 className="text-headline-3">Schedule Your Drive</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-body font-medium mb-2 block">Preferred Date *</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-dark-10 border border-luxury-border text-luxury-text focus:border-luxury-accent outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-body font-medium mb-2 block">Preferred Time *</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-dark-10 border border-luxury-border text-luxury-text focus:border-luxury-accent outline-none transition-colors"
                    >
                      <option value="" className="bg-luxury-dark">Select a time...</option>
                      {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map(time => (
                        <option key={time} value={time} className="bg-luxury-dark">{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-luxury-border">
                <button
                  type="submit"
                  className="flex-1 btn-primary text-center"
                >
                  Confirm Booking
                </button>
                <Link
                  to="/inventory"
                  className="flex-1 btn-secondary text-center"
                >
                  Browse Vehicles
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
