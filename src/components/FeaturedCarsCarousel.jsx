import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function FeaturedCarsCarousel({ cars }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % cars.length);
  const prev = () => setCurrent((current - 1 + cars.length) % cars.length);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {cars.slice(current, current + 3).map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-luxury-lg group overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-56 mb-6 rounded-xl overflow-hidden bg-luxury-gray">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      to={`/vehicle/${car.id}`}
                      className="btn-primary flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform"
                    >
                      <Eye size={18} /> View
                    </Link>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-luxury-accent px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm">
                    ${(car.price / 1000).toFixed(0)}K
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-headline-3 mb-1">{car.model}</h3>
                <p className="text-body-sm text-luxury-text-secondary mb-4">{car.trim}</p>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between text-luxury-text-secondary">
                    <span>Year</span>
                    <span className="text-luxury-text font-medium">{car.year}</span>
                  </div>
                  <div className="flex justify-between text-luxury-text-secondary">
                    <span>Mileage</span>
                    <span className="text-luxury-text font-medium">{(car.mileage / 1000).toFixed(0)}K mi</span>
                  </div>
                  <div className="flex justify-between text-luxury-text-secondary">
                    <span>Type</span>
                    <span className="text-luxury-text font-medium">{car.bodyType}</span>
                  </div>
                </div>

                <Link
                  to={`/vehicle/${car.id}`}
                  className="btn-primary w-full text-center block"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation - Only show if multiple pages */}
      {cars.length > 3 && (
        <>
          <button
            onClick={prev}
            className="absolute -left-16 top-1/3 -translate-y-1/2 w-12 h-12 rounded-full border border-luxury-border bg-dark-10 hover:bg-dark-20 text-luxury-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute -right-16 top-1/3 -translate-y-1/2 w-12 h-12 rounded-full border border-luxury-border bg-dark-10 hover:bg-dark-20 text-luxury-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: Math.ceil(cars.length / 3) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx * 3)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === idx * 3
                    ? 'bg-luxury-accent w-8'
                    : 'bg-luxury-border hover:bg-luxury-text-secondary'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
