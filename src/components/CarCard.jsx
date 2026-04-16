import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ChevronRight, Zap, Gauge } from 'lucide-react';
import PriceBadge from './PriceBadge';
import InfoRow from './InfoRow';

export default function CarCard({ vehicle, variant = 'grid', onClick, className = '' }) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (variant === 'fullscreen') {
    // Mobile full-screen card variant
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-dark rounded-2xl overflow-hidden card-luxury-lg ${className}`}
      >
        {/* Image Container */}
        <div className="relative h-72 md:h-96 overflow-hidden bg-luxury-gray group">
          <motion.img
            src={vehicle.images?.[0] || vehicle.image}
            alt={vehicle.model}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all"
          >
            <Heart
              size={22}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-luxury-text'}
            />
          </motion.button>

          {/* Featured Badge */}
          {vehicle.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-luxury-accent/90 text-dark text-caption font-semibold rounded-full backdrop-blur-sm">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-headline-2 mb-1">{vehicle.brand}</h3>
            <p className="text-body-lg text-luxury-text-secondary font-medium">{vehicle.model}</p>
          </div>

          {/* Price */}
          <div className="mb-6">
            <PriceBadge price={vehicle.price} size="lg" />
          </div>

          {/* Quick Info */}
          <div className="space-y-2 mb-6 pb-6 border-b border-luxury-border/30">
            <InfoRow icon={Zap} label="Engine" value={vehicle.engine} />
            <InfoRow icon={Gauge} label="0-100 km/h" value={vehicle.acceleration} />
          </div>

          {/* CTA */}
          <Link
            to={`/vehicle/${vehicle.id}`}
            className="w-full py-3 bg-luxury-accent text-dark rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors"
          >
            View Details <ChevronRight size={18} />
          </Link>
        </div>
      </motion.div>
    );
  }

  // Grid card variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`group card-luxury-lg overflow-hidden cursor-pointer transition-all ${className}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-luxury-gray">
        <motion.img
          src={vehicle.images?.[0] || vehicle.image}
          alt={vehicle.model}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay with Price */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <PriceBadge price={vehicle.price} size="md" />
        </div>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all"
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-luxury-text'}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-headline-3 mb-1">{vehicle.brand}</h3>
        <p className="text-body-sm text-luxury-text-secondary font-medium mb-3">
          {vehicle.model}
        </p>

        {/* Quick Stats */}
        <div className="flex items-center justify-between text-caption text-luxury-text-secondary">
          <span>{vehicle.engine}</span>
          <span>{vehicle.year}</span>
        </div>
      </div>
    </motion.div>
  );
}
