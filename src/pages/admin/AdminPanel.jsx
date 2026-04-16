import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { LogOut, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import AdminVehicleForm from '../../components/admin/AdminVehicleForm';
import AdminBookingsList from '../../components/admin/AdminBookingsList';
import AdminInquiriesList from '../../components/admin/AdminInquiriesList';

export default function AdminPanel() {
  const navigate = useNavigate();
  const { isAdminLoggedIn, setIsAdminLoggedIn, vehicles, addVehicle, updateVehicle, deleteVehicle } = useAppContext();
  const [showLogin, setShowLogin] = useState(!isAdminLoggedIn);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('vehicles');
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication (in production, use proper backend auth)
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsAdminLoggedIn(true);
      setShowLogin(false);
      setLoginData({ username: '', password: '' });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setShowLogin(true);
    navigate('/');
  };

  if (showLogin) {
    return (
      <>
        <Helmet>
          <title>Admin Login - BMW AutoSallon</title>
        </Helmet>

        <div className="min-h-screen bg-dark flex items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-luxury-lg w-full max-w-md"
          >
            <h1 className="text-headline-1 mb-2 text-center">Admin Access</h1>
            <p className="text-body-sm text-luxury-text-secondary text-center mb-8">
              Secure login for BMW AutoSallon administrators
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-body font-medium mb-2 block">Username</label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  placeholder="admin"
                  className="w-full px-4 py-3 bg-dark-10 border border-luxury-border rounded-lg text-luxury-text placeholder:text-luxury-text-secondary focus:border-luxury-accent outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-body font-medium mb-2 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-dark-10 border border-luxury-border rounded-lg text-luxury-text placeholder:text-luxury-text-secondary focus:border-luxury-accent outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-luxury-text-secondary hover:text-luxury-accent transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-body-sm text-luxury-text-secondary mt-2">Demo: admin / admin123</p>
              </div>

              <button type="submit" className="btn-primary w-full mt-8">
                Sign In
              </button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - BMW AutoSallon</title>
      </Helmet>

      <div className="min-h-screen bg-dark">
        {/* Header */}
        <div className="bg-gradient-luxury border-b border-luxury-border py-6 sticky top-0 z-40">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl flex justify-between items-center">
            <h1 className="text-headline-2">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all duration-300"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-12">
          {/* Tabs */}
          <div className="flex gap-4 mb-12 border-b border-luxury-border overflow-x-auto">
            {['vehicles', 'bookings', 'inquiries'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium border-b-2 transition-all duration-300 ${
                  activeTab === tab
                    ? 'text-luxury-accent border-luxury-accent'
                    : 'text-luxury-text-secondary border-transparent hover:text-luxury-text'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-headline-2">Vehicle Management</h2>
                  <p className="text-body-sm text-luxury-text-secondary mt-1">{vehicles.length} vehicles in inventory</p>
                </div>
                <button
                  onClick={() => {
                    setEditingVehicle(null);
                    setShowForm(!showForm);
                  }}
                  className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <Plus size={18} /> Add Vehicle
                </button>
              </div>

              {showForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <AdminVehicleForm
                    vehicle={editingVehicle}
                    onSubmit={(formData) => {
                      if (editingVehicle) {
                        updateVehicle(editingVehicle.id, formData);
                      } else {
                        addVehicle(formData);
                      }
                      setShowForm(false);
                      setEditingVehicle(null);
                    }}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingVehicle(null);
                    }}
                  />
                </motion.div>
              )}

              {/* Vehicles List */}
              <div className="space-y-4">
                {vehicles.map((vehicle, idx) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="card-luxury flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-luxury-accent/50"
                  >
                    <div className="flex gap-4 items-start flex-1 w-full">
                      <img
                        src={vehicle.image}
                        alt={vehicle.model}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-body font-bold">{vehicle.model} {vehicle.year}</h3>
                        <p className="text-body-sm text-luxury-text-secondary">
                          ${(vehicle.price / 1000).toFixed(0)}K • {(vehicle.mileage / 1000).toFixed(0)}K mi
                        </p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {vehicle.featured && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                              Featured
                            </span>
                          )}
                          {vehicle.sold && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                              Sold
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setEditingVehicle(vehicle);
                          setShowForm(true);
                        }}
                        className="flex-1 sm:flex-none p-2.5 hover:bg-luxury-accent/10 rounded-lg transition-colors border border-luxury-border hover:border-luxury-accent"
                      >
                        <Edit2 size={18} className="text-luxury-accent" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this vehicle?')) {
                            deleteVehicle(vehicle.id);
                          }
                        }}
                        className="flex-1 sm:flex-none p-2.5 hover:bg-red-500/10 rounded-lg transition-colors border border-luxury-border hover:border-red-500"
                      >
                        <Trash2 size={18} className="text-red-400" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && <AdminBookingsList />}

          {/* Inquiries Tab */}
          {activeTab === 'inquiries' && <AdminInquiriesList />}
        </div>
      </div>
    </>
  );
}
