import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, DollarSign, Settings, BarChart3 } from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Browse', path: '/inventory' },
    { icon: DollarSign, label: 'Finance', path: '/financing' },
    { icon: BarChart3, label: 'Admin', path: '/admin' },
  ];

  return (
    <>
      {/* Spacer for navbar */}
      <div className="h-20 md:h-0" />

      {/* Bottom Navigation - Mobile Only */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-dark border-t border-luxury-border/30 backdrop-blur-xl md:hidden"
      >
        <div className="flex items-center justify-around h-20 max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex-1 flex flex-col items-center justify-center gap-1 h-full transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-3 rounded-lg transition-all ${
                    isActive ? 'bg-luxury-accent/20 text-luxury-accent' : 'text-luxury-text-secondary'
                  }`}
                >
                  <Icon size={24} />
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-lg border-2 border-luxury-accent"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
                <span className="text-xs font-medium text-center">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
