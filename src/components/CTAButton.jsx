import { motion } from 'framer-motion';

export default function CTAButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon: Icon, 
  onClick, 
  className = '',
  disabled = false,
  ...props 
}) {
  const sizes = {
    sm: 'px-3 py-2 text-body-sm',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-body-lg',
    full: 'w-full px-6 py-4 text-body',
  };

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    tertiary: 'btn-tertiary',
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`${sizes[size]} ${variants[variant]} flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg font-medium ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </motion.button>
  );
}
