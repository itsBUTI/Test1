import { createContext, useContext, useState } from 'react';
import { vehicles as initialVehicles } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const addVehicle = (vehicle) => {
    setVehicles([...vehicles, { ...vehicle, id: Math.max(...vehicles.map(v => v.id), 0) + 1 }]);
  };

  const updateVehicle = (id, updatedData) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updatedData } : v));
  };

  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const addBooking = (booking) => {
    setBookings([...bookings, { ...booking, id: Date.now() }]);
  };

  const addInquiry = (inquiry) => {
    setInquiries([...inquiries, { ...inquiry, id: Date.now() }]);
  };

  return (
    <AppContext.Provider value={{
      vehicles,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      bookings,
      addBooking,
      inquiries,
      addInquiry,
      user,
      setUser,
      isAdminLoggedIn,
      setIsAdminLoggedIn,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
