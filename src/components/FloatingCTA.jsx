import { motion } from 'framer-motion';
import { Calendar, Plus } from 'lucide-react';

export default function FloatingCTA({ onClick, label = 'Book Test Drive' }) {
  return (
    <>
      {/* Mobile Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onClick}
        className="fixed bottom-24 md:bottom-auto right-4 z-30 w-14 h-14 md:hidden rounded-full bg-luxury-accent text-dark flex items-center justify-center shadow-lg shadow-luxury-accent/40 hover:shadow-xl hover:shadow-luxury-accent/50 transition-all"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Calendar size={28} />
        </motion.div>
      </motion.button>

      {/* Tooltip on Hover Desktop */}
      <motion.div
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="hidden md:flex fixed bottom-8 right-8 items-center gap-3 bg-dark border border-luxury-border rounded-full px-4 py-3 pointer-events-none"
      >
        <Calendar size={18} className="text-luxury-accent" />
        <span className="text-body-sm text-luxury-text whitespace-nowrap">{label}</span>
      </motion.div>
    </>
  );
}
