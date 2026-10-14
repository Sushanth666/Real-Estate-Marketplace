import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Building2,
  ArrowLeft
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { indianCities } from '../../data/citiesData';

export function CitiesView() {
  const { navigateTo, updateFilter } = useMarketplace();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  const allStates = ['all', 'Tamil Nadu', 'Maharashtra', 'Karnataka', 'Delhi / Haryana', 'Telangana', 'Goa', 'West Bengal', 'Kerala', 'Gujarat'];

  const filteredCities = indianCities.filter(city => {
    // State Filter
    if (selectedState !== 'all' && city.state !== selectedState) {
      return false;
    }
    // Search Term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = city.name.toLowerCase().includes(term);
      const matchState = city.state.toLowerCase().includes(term);
      const matchTag = city.tagline.toLowerCase().includes(term);
      const matchLocalities = city.popularLocalities.some(l => l.toLowerCase().includes(term));
      if (!matchName && !matchState && !matchTag && !matchLocalities) return false;
    }
    return true;
  });

  const handleCitySelect = (cityName) => {
    updateFilter('selectedCity', cityName);
    navigateTo('listings');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
            <button 
              onClick={() => navigateTo('home')} 
              className="hover:text-slate-700 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-slate-700">All Indian Metros & Cities</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>All Indian Metropolitan Corridors</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                Explore Properties by City in India
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Select any Indian metropolitan hub to view 100% RERA-certified luxury apartments, villas, and sky penthouses.
              </p>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-2 self-start md:self-auto">
              <Building2 className="w-4 h-4 text-brand-600" />
              <span className="text-xs font-bold text-slate-800">
                {filteredCities.length} Indian Real Estate Hubs
              </span>
            </div>
          </div>
        </div>

        {/* Search & State Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by city, state, or locality (e.g. Chennai, ECR, Bandra)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              />
            </div>

            <div className="text-xs text-slate-500 font-medium hidden sm:block">
              Click any city card below to redirect directly to its properties
            </div>
          </div>

          {/* State Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-slate-100">
            {allStates.map(st => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedState === st
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st === 'all' 
                  ? 'All States' 
                  : st === 'Tamil Nadu' 
                  ? '⭐ Tamil Nadu (1st Choice)' 
                  : st}
              </button>
            ))}
          </div>
        </div>

        {/* ALL CITIES GRID - Using the Exact 2nd Image Card Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {filteredCities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => handleCitySelect(city.name)}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              {/* Background City Image */}
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Gradient Dark Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Top Badges */}
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

              {/* Bottom Info & Redirection Trigger */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {city.name}
                </h3>
                <p className="text-xs text-slate-300 font-medium mb-2 truncate">
                  {city.tagline}
                </p>

                {/* Bottom Rate & Circular Arrow Button */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
                  <span>Avg {city.avgPriceSqft}</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-brand-500 group-hover:scale-110 transition-all shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
