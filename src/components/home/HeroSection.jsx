import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Home, 
  IndianRupee, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { indianCities } from '../../data/citiesData';

export function HeroSection() {
  const { navigateTo, updateFilter } = useMarketplace();

  const [activeTab, setActiveTab] = useState('buy');
  const [city, setCity] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [bhk, setBhk] = useState('all');
  const [budgetRange, setBudgetRange] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilter('purpose', activeTab);
    updateFilter('selectedCity', city);
    updateFilter('propertyType', propertyType);
    updateFilter('bhk', bhk);

    if (budgetRange === 'under-1cr') {
      updateFilter('minPrice', 0);
      updateFilter('maxPrice', 10000000);
    } else if (budgetRange === '1-3cr') {
      updateFilter('minPrice', 10000000);
      updateFilter('maxPrice', 30000000);
    } else if (budgetRange === '3-7cr') {
      updateFilter('minPrice', 30000000);
      updateFilter('maxPrice', 70000000);
    } else if (budgetRange === '7cr-plus') {
      updateFilter('minPrice', 70000000);
      updateFilter('maxPrice', 350000000);
    } else {
      updateFilter('minPrice', 0);
      updateFilter('maxPrice', 350000000);
    }

    navigateTo('listings');
  };

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-slate-950 text-white py-16 lg:py-24">
      {/* Background Hero Image with Deep Luxury Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Indian Real Estate"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/40 to-slate-950/90" />
        
        {/* Ambient Glowing Floating Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-blob" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none animate-blob-delayed" />
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-blob-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center mb-10">
          
          {/* Trust Banner Badge with Floating Motion */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: [0, -4, 0] }}
            transition={{ 
              opacity: { duration: 0.5 },
              y: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-950/80 border border-brand-500/40 text-brand-300 text-xs font-semibold backdrop-blur-md mb-6 shadow-xl shadow-brand-950/50"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>100% RERA Certified Indian Residences • Zero Broker Spam</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight sm:leading-none mb-6"
          >
            Find Your Sanctuary in India's{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              Most Coveted Addresses
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Explore verified beach villas, luxury estates, and sky duplexes across Tamil Nadu (Chennai & Coimbatore), Mumbai, Bengaluru, Delhi NCR, and Goa.
          </motion.p>
        </div>

        {/* Search Engine Floating Card with Glow and Perspective */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-white/95 text-slate-900 rounded-3xl shadow-2xl p-4 sm:p-6 backdrop-blur-xl border border-white/50 glow-card"
        >
          {/* Tabs: Buy / Rent / Commercial with smooth layout sliding pill */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
            <button
              type="button"
              onClick={() => setActiveTab('buy')}
              className={`relative px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'buy' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {activeTab === 'buy' && (
                <motion.div
                  layoutId="heroTabPill"
                  className="absolute inset-0 bg-brand-600 rounded-xl shadow-md shadow-brand-600/30"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">Buy Homes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rent')}
              className={`relative px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'rent' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {activeTab === 'rent' && (
                <motion.div
                  layoutId="heroTabPill"
                  className="absolute inset-0 bg-brand-600 rounded-xl shadow-md shadow-brand-600/30"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">Luxury Rent</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => {
                setActiveTab('buy');
                setPropertyType('Penthouse');
              }}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Penthouses & Villas</span>
            </motion.button>
          </div>

          {/* Search Inputs Grid */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* City Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                Select City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">All Top Indian Metros</option>
                {indianCities.map(c => (
                  <option key={c.id} value={c.name}>{c.name} ({c.state})</option>
                ))}
              </select>
            </div>

            {/* Property Type Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-brand-600" />
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">All Residences</option>
                <option value="Apartment">Apartment</option>
                <option value="Luxury Villa">Luxury Villa</option>
                <option value="Individual House">Individual House</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Duplex">Duplex Mansion</option>
                <option value="Builder Floor">Builder Floor</option>
              </select>
            </div>

            {/* Budget Range Selector in INR */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-brand-600" />
                Budget Range (₹)
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">Any Budget</option>
                <option value="under-1cr">Under ₹1.00 Crore</option>
                <option value="1-3cr">₹1.00 Cr - ₹3.00 Cr</option>
                <option value="3-7cr">₹3.00 Cr - ₹7.00 Cr</option>
                <option value="7cr-plus">₹7.00 Cr+ (Ultra Luxury)</option>
              </select>
            </div>

            {/* Search CTA */}
            <div className="flex flex-col justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </motion.button>
            </div>
          </form>

          {/* Quick BHK Pills */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 font-medium">Popular BHKs:</span>
              {['all', '2', '3', '4', '5+'].map((item) => {
                const isActive = bhk === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setBhk(item)}
                    className={`relative px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                      isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="heroBhkPill"
                        className="absolute inset-0 bg-slate-900 rounded-lg -z-10 shadow-xs"
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{item === 'all' ? 'All' : `${item} BHK`}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                Verified Legal Titles
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                Zero Brokerage
              </span>
            </div>
          </div>
        </motion.div>

        {/* Live Marketplace Statistics Banner */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          {[
            { value: '₹3,400+ Cr', label: 'Asset Value Listed', color: 'text-white' },
            { value: '100%', label: 'RERA Certified Projects', color: 'text-sky-400' },
            { value: '8 Metros', label: 'Across India', color: 'text-amber-400' },
            { value: '4.9 ★', label: 'Client Rating', color: 'text-white' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-brand-500/30 transition-all cursor-default"
            >
              <p className={`text-2xl sm:text-3xl font-extrabold font-display ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
