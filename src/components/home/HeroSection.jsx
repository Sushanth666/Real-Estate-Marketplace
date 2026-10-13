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
          className="w-full h-full object-cover object-center scale-105 animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/40 to-slate-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center mb-10">
          
          {/* Trust Banner Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-950/80 border border-brand-500/40 text-brand-300 text-xs font-semibold backdrop-blur-md mb-6 shadow-lg"
          >
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

        {/* Search Engine Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-white/95 text-slate-900 rounded-3xl shadow-2xl p-4 sm:p-6 backdrop-blur-xl border border-white/40"
        >
          {/* Tabs: Buy / Rent / Commercial */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
            <button
              onClick={() => setActiveTab('buy')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'buy'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Buy Homes
            </button>
            <button
              onClick={() => setActiveTab('rent')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'rent'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Luxury Rent
            </button>
            <button
              onClick={() => {
                setActiveTab('buy');
                setPropertyType('Penthouse');
              }}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Penthouses & Villas</span>
            </button>
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
              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>

          {/* Quick BHK Pills */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 font-medium">Popular BHKs:</span>
              {['all', '2', '3', '4', '5+'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setBhk(item);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    bhk === item
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item === 'all' ? 'All' : `${item} BHK`}
                </button>
              ))}
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
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <p className="text-2xl sm:text-3xl font-extrabold font-display text-white">₹3,400+ Cr</p>
            <p className="text-xs text-slate-400 mt-0.5">Asset Value Listed</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <p className="text-2xl sm:text-3xl font-extrabold font-display text-sky-400">100%</p>
            <p className="text-xs text-slate-400 mt-0.5">RERA Certified Projects</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <p className="text-2xl sm:text-3xl font-extrabold font-display text-amber-400">8 Metros</p>
            <p className="text-xs text-slate-400 mt-0.5">Across India</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <p className="text-2xl sm:text-3xl font-extrabold font-display text-white">4.9 ★</p>
            <p className="text-xs text-slate-400 mt-0.5">Client Rating</p>
          </div>
        </div>

      </div>
    </section>
  );
}
