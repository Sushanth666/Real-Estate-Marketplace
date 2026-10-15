import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { PropertyCard } from '../common/PropertyCard';

export function FeaturedProperties() {
  const { properties, navigateTo, updateFilter } = useMarketplace();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = properties.filter(prop => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'tamilnadu') return prop.city.toLowerCase().includes('tamil nadu') || prop.state === 'Tamil Nadu';
    if (activeCategory === 'individual-house') return prop.propertyType.toLowerCase() === 'individual house';
    if (activeCategory === 'penthouse') return prop.propertyType.toLowerCase() === 'penthouse';
    if (activeCategory === 'villa') return prop.propertyType.toLowerCase() === 'luxury villa';
    if (activeCategory === 'rent') return prop.purpose === 'rent';
    if (activeCategory === 'mumbai') return prop.city.toLowerCase() === 'mumbai';
    return true;
  }).slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Signature Collection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Featured Verified Homes
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl">
            Handpicked luxury properties verified for clear title ownership, RERA approvals, and world-class architecture.
          </p>

          {/* Filter Pills with animated sliding pill - perfectly aligned & wrapped */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'tamilnadu', label: '⭐ Tamil Nadu Signature' },
              { id: 'individual-house', label: '🏡 Individual Houses' },
              { id: 'villa', label: 'Villas' },
              { id: 'penthouse', label: 'Penthouses' },
              { id: 'rent', label: 'For Rent' },
            ].map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/25 border border-slate-900' 
                      : 'text-slate-600 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200/70'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="featuredCategoryPill"
                      className="absolute inset-0 bg-slate-900 rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10 select-none">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Properties Grid with animated re-arrangement */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map(property => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyCard property={property} layout="grid" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              updateFilter('purpose', 'all');
              navigateTo('listings');
            }}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-brand-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-md hover:shadow-xl text-sm cursor-pointer"
          >
            <span>Explore All {properties.length} Properties</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
