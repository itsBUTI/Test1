import { motion } from 'framer-motion';

export default function PriceBadge({ price, size = 'md', className = '' }) {
  const sizes = {
    sm: 'text-body-sm',
    md: 'text-headline-3',
    lg: 'text-5xl',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${sizes[size]} font-bold text-luxury-accent ${className}`}
    >
      ${price.toLocaleString()}
    </motion.div>
  );
}
