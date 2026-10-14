import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Building, Sparkles } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { indianCities } from '../../data/citiesData';

export function QuickCitySelector() {
  const { navigateTo, updateFilter } = useMarketplace();

  const handleCitySelect = (cityName) => {
    updateFilter('selectedCity', cityName);
    navigateTo('listings');
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Prime Indian Real Estate Corridors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
              Explore Homes by City
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
              From the coastal skyline of Mumbai to the lush villa communities of Bengaluru and Goa’s colonial estates.
            </p>
          </div>

          <button
            onClick={() => navigateTo('cities')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800 group"
          >
            <span>View All Indian Metros</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {indianCities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleCitySelect(city.name)}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 shimmer-wrapper glow-card"
            >
              {/* Image */}
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-112 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Top Badge */}
              <div className="absolute top-3.5 left-3.5 flex flex-col gap-1 items-start">
                {city.isFirstChoice && (
                  <span className="text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                    ⭐ 1st Choice
                  </span>
                )}
                <span className="text-[11px] font-bold bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20">
                  {city.propertyCount} Homes
                </span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold font-display tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs text-slate-300 font-medium mb-2 truncate">
                  {city.tagline}
                </p>

                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
                  <span>Avg {city.avgPriceSqft}</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
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
