import { motion } from 'framer-motion';

export default function FilterChip({ label, isActive, onClick, icon: Icon, count }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-body-sm md:text-body transition-all duration-300 border flex items-center gap-2 whitespace-nowrap ${
        isActive
          ? 'bg-luxury-accent text-dark border-luxury-accent shadow-lg shadow-luxury-accent/30'
          : 'border-luxury-border text-luxury-text-secondary hover:border-luxury-accent/50'
      }`}
    >
      {Icon && <Icon size={16} />}
      {label}
      {count && <span className="ml-1 text-xs opacity-75">({count})</span>}
    </motion.button>
  );
}
