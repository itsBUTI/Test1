import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import FilterChip from './FilterChip';

export default function FilterDrawer({ isOpen, onClose, filters, onFilterChange }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const filterSections = [
    {
      id: 'brand',
      title: 'Brand',
      options: ['BMW', 'Audi', 'Mercedes', 'Porsche'],
    },
    {
      id: 'priceRange',
      title: 'Price Range',
      options: ['Under $30K', '$30K-$50K', '$50K-$75K', '$75K+'],
    },
    {
      id: 'type',
      title: 'Vehicle Type',
      options: ['Sedan', 'SUV', 'Coupe', 'Convertible'],
    },
    {
      id: 'year',
      title: 'Year',
      options: ['2024', '2023', '2022', '2021'],
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        initial={{ x: -400 }}
        animate={isOpen ? { x: 0 } : { x: -400 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-dark border-r border-luxury-border overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-luxury-border bg-dark-10/50 backdrop-blur-sm">
          <h2 className="text-headline-2">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-10 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="p-6 space-y-4">
          {filterSections.map((section) => (
            <div key={section.id} className="border border-luxury-border/30 rounded-xl overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-dark-10 transition-colors"
              >
                <span className="text-body font-semibold">{section.title}</span>
                <motion.div
                  animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-luxury-accent" />
                </motion.div>
              </button>

              {/* Section Options */}
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-luxury-border/30 p-4 space-y-2 bg-dark-10/30"
                  >
                    {section.options.map((option) => (
                      <FilterChip
                        key={option}
                        label={option}
                        isActive={filters[section.id]?.includes(option)}
                        onClick={() =>
                          onFilterChange(section.id, option)
                        }
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Clear All Button */}
        <div className="sticky bottom-0 p-6 border-t border-luxury-border bg-dark-10/50 backdrop-blur-sm">
          <button
            onClick={() => {
              onClose();
              // Reset filters
              filterSections.forEach((section) => {
                onFilterChange(section.id, null);
              });
            }}
            className="w-full py-3 px-4 rounded-lg border border-luxury-border text-luxury-accent hover:bg-dark-10 transition-colors font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      </motion.div>
    </>
  );
}
