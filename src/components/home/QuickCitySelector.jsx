import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { indianCities } from '../../data/citiesData';

export function QuickCitySelector() {
  const { navigateTo, updateFilter } = useMarketplace();

  const handleCitySelect = (cityName) => {
    updateFilter('selectedCity', cityName);
    navigateTo('listings');
  };

  // Show top 6 premier cities on Home for a clean, compact footprint
  const spotlightCities = indianCities.slice(0, 6);

  return (
    <section className="py-10 sm:py-12 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200/70 mb-1.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Prime Metros</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Explore Top Cities
            </h2>
          </div>

          <button
            onClick={() => navigateTo('cities')}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800 bg-white hover:bg-brand-50 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-brand-300 transition-all shadow-xs cursor-pointer group"
          >
            <span>View All 12 Cities & Trends</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Shorter, Compact City Cards (h-44 sm:h-48) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {spotlightCities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => handleCitySelect(city.name)}
              className="group relative h-44 sm:h-48 rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 shimmer-wrapper glow-card border border-white/20"
            >
              {/* Image */}
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-black/20" />

              {/* Top Compact Badge */}
              <div className="absolute top-2.5 left-2.5">
                <span className="text-[10px] font-bold bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/20">
                  {city.propertyCount}
                </span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-sm sm:text-base font-bold font-display tracking-tight text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {city.shortName || city.name.split(' ')[0]}
                </h3>
                
                <div className="mt-1 pt-1 border-t border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-300 font-medium">
                  <span>{city.avgPriceSqft}</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
