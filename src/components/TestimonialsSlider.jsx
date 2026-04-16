import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/mockData';

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5 }}
          className="card-luxury-lg text-center"
        >
          {/* Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(testimonials[current].rating)].map((_, i) => (
              <Star key={i} size={20} className="fill-luxury-accent text-luxury-accent" />
            ))}
          </div>

          {/* Quote */}
          <p className="text-body-lg mb-8 italic text-luxury-text-secondary">
            "{testimonials[current].comment}"
          </p>

          {/* Author */}
          <div>
            <h4 className="text-headline-2 mb-1">{testimonials[current].name}</h4>
            <p className="text-body-sm text-luxury-text-secondary">
              Purchased: {testimonials[current].car}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-luxury-border bg-dark-10 hover:bg-dark-20 text-luxury-accent flex items-center justify-center transition-all duration-300 hover:scale-110 hidden md:flex"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-luxury-border bg-dark-10 hover:bg-dark-20 text-luxury-accent flex items-center justify-center transition-all duration-300 hover:scale-110 hidden md:flex"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              current === idx
                ? 'bg-luxury-accent w-8'
                : 'bg-luxury-border hover:bg-luxury-text-secondary'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
