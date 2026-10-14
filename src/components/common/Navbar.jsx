import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Heart, 
  Scale, 
  PlusCircle, 
  User, 
  Menu, 
  X, 
  LogOut, 
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Search
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export function Navbar() {
  const {
    currentView,
    navigateTo,
    wishlist,
    compareList,
    currentUser,
    logoutUser,
    setIsAuthModalOpen,
    setIsPostPropertyOpen,
    setIsCompareModalOpen,
    updateFilter
  } = useMarketplace();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  if (typeof window !== 'undefined') {
    window.__toggleMobileMenu = setMobileMenuOpen;
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shrink-0">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          {/* Brand Logo with dynamic hover tilt */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-800 via-brand-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-brand-600/30 group-hover:shadow-brand-600/50 group-hover:scale-108 transition-all duration-300">
              <Building2 className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
              Bharat<span className="text-brand-600">Nivas</span>
            </span>
          </motion.div>

          {/* Desktop Navigation Links with layoutId sliding pill */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 relative">
            <button
              onClick={() => navigateTo('home')}
              className={`relative whitespace-nowrap px-3.5 py-2 text-sm font-medium rounded-xl transition-colors outline-none cursor-pointer ${
                currentView === 'home'
                  ? 'text-brand-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {currentView === 'home' && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-brand-50 border border-brand-200/60 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Home</span>
            </button>

            <button
              onClick={() => {
                updateFilter('purpose', 'all');
                navigateTo('listings');
              }}
              className={`relative whitespace-nowrap px-3.5 py-2 text-sm font-medium rounded-xl transition-colors outline-none cursor-pointer ${
                currentView === 'listings'
                  ? 'text-brand-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {currentView === 'listings' && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-brand-50 border border-brand-200/60 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Explore Properties</span>
            </button>

            <button
              onClick={() => navigateTo('cities')}
              className={`relative whitespace-nowrap px-3.5 py-2 text-sm font-medium rounded-xl transition-colors outline-none cursor-pointer ${
                currentView === 'cities'
                  ? 'text-brand-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {currentView === 'cities' && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-brand-50 border border-brand-200/60 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Top Cities</span>
            </button>

            <button
              onClick={() => navigateTo('agents')}
              className={`relative whitespace-nowrap px-3.5 py-2 text-sm font-medium rounded-xl transition-colors outline-none cursor-pointer ${
                currentView === 'agents'
                  ? 'text-brand-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {currentView === 'agents' && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-brand-50 border border-brand-200/60 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">RERA Advisors</span>
            </button>

            {/* Compare Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (compareList.length > 0) {
                  setIsCompareModalOpen(true);
                } else {
                  navigateTo('listings');
                }
              }}
              className="whitespace-nowrap relative px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 rounded-xl transition-colors flex items-center gap-1.5 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer"
            >
              <Scale className="w-4 h-4 text-slate-500" />
              <span>Compare</span>
              {compareList.length > 0 && (
                <span className="bg-brand-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {compareList.length}
                </span>
              )}
            </motion.button>

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigateTo('wishlist')}
              className={`whitespace-nowrap relative px-3.5 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-1.5 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer ${
                currentView === 'wishlist'
                  ? 'text-rose-600 bg-rose-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Heart className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-500'}`} />
              <span>Saved</span>
              {wishlist.length > 0 && (
                <span className="bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </motion.button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Post Property Free Button with Shimmer & Glow */}
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPostPropertyOpen(true)}
              className="whitespace-nowrap px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold tracking-wide uppercase shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/40 flex items-center gap-2 outline-none cursor-pointer shimmer-wrapper transition-all"
            >
              <PlusCircle className="w-4 h-4 animate-spin-slow" />
              <span>Post Property FREE</span>
            </motion.button>

            {/* User Auth or Profile */}
            {currentUser ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="whitespace-nowrap flex items-center gap-2.5 px-3 py-2 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white transition-all text-left outline-none focus:outline-none cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </p>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {currentUser.role || 'Buyer'}
                    </span>
                  </div>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50"
                    >
                      <div className="px-3 py-2.5 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.email || currentUser.phone}</p>
                      </div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('wishlist');
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 mt-1 cursor-pointer transition-colors"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>My Saved Homes ({wishlist.length})</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setIsPostPropertyOpen(true);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <PlusCircle className="w-4 h-4 text-brand-600" />
                        <span>Add New Listing</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logoutUser();
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 mt-1 border-t border-slate-100 cursor-pointer transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsPostPropertyOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-white text-xs font-bold sm:hidden"
            >
              Post Free
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3"
          >
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => {
                  navigateTo('home');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigateTo('listings');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Explore Properties
              </button>
              <button
                onClick={() => {
                  navigateTo('cities');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Top Cities
              </button>
              <button
                onClick={() => {
                  navigateTo('agents');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                RERA Advisors Directory
              </button>
              <button
                onClick={() => {
                  navigateTo('wishlist');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Saved Homes</span>
                <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              </button>
              <button
                onClick={() => {
                  setIsCompareModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Compare Matrix</span>
                <span className="bg-brand-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {compareList.length}
                </span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsPostPropertyOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Property FREE (Owner/Builder)</span>
              </button>

              {currentUser ? (
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-rose-600 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out ({currentUser.name})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
