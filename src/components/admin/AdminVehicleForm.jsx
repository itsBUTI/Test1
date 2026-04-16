import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function AdminVehicleForm({ vehicle, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(vehicle || {
    model: '',
    trim: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    engine: '',
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: '',
    bodyType: 'Sedan',
    vin: '',
    description: '',
    featured: false,
    sold: false,
    image: '',
    images: [],
  });

  const [features, setFeatures] = useState(vehicle?.features?.join('\n') || '');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      features: features.split('\n').filter(f => f.trim()),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-8 mb-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">{vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            name="model"
            placeholder="Model (e.g., 3 Series)"
            value={formData.model}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
          />
          <input
            type="text"
            name="trim"
            placeholder="Trim (e.g., M340i)"
            value={formData.trim}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
          />
          <input
            type="number"
            name="mileage"
            placeholder="Mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
          />
          <input
            type="text"
            name="engine"
            placeholder="Engine (e.g., 3.0L Twin-Turbo)"
            value={formData.engine}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
          />
          <input
            type="text"
            name="vin"
            placeholder="VIN"
            value={formData.vin}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
          />
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
          >
            <option>Automatic</option>
            <option>Manual</option>
          </select>
          <select
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Hybrid</option>
            <option>Electric</option>
          </select>
          <select
            name="bodyType"
            value={formData.bodyType}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
          >
            <option>Sedan</option>
            <option>SUV</option>
            <option>Coupe</option>
            <option>Wagon</option>
          </select>
        </div>

        <input
          type="url"
          name="image"
          placeholder="Main Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none resize-none"
        />

        <textarea
          placeholder="Features (one per line)"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bmw-blue outline-none resize-none"
        />

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="font-semibold">Featured Vehicle</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="sold"
              checked={formData.sold}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="font-semibold">Mark as Sold</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn-luxury flex-1">
            {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}
