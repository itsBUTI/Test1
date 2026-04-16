import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }) {
  const displayRef = useRef(null);

  useEffect(() => {
    const element = displayRef.current;
    if (!element) return;

    const numValue = parseFloat(value) || 0;
    const formattedValue = numValue.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    element.textContent = `${prefix}${formattedValue}${suffix}`;
  }, [value, prefix, suffix, decimals]);

  return (
    <motion.span
      key={value}
      ref={displayRef}
      initial={{ opacity: 0.6, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0.6, y: -4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {`${prefix}${parseFloat(value || 0).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`}
    </motion.span>
  );
}
