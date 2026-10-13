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

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-brand-600/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
                  Bharat<span className="text-brand-600">Nivas</span>
                </span>
                <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded border border-amber-300">
                  🇮🇳
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">
                India's Verified PropTech
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-colors ${
                currentView === 'home'
                  ? 'text-brand-700 bg-brand-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                updateFilter('purpose', 'all');
                navigateTo('listings');
              }}
              className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-colors ${
                currentView === 'listings'
                  ? 'text-brand-700 bg-brand-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Explore Properties
            </button>

            <button
              onClick={() => navigateTo('agents')}
              className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-colors ${
                currentView === 'agents'
                  ? 'text-brand-700 bg-brand-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              RERA Advisors
            </button>

            {/* Compare Button */}
            <button
              onClick={() => {
                if (compareList.length > 0) {
                  setIsCompareModalOpen(true);
                } else {
                  navigateTo('listings');
                }
              }}
              className="relative px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Scale className="w-4 h-4 text-slate-500" />
              <span>Compare</span>
              {compareList.length > 0 && (
                <span className="bg-brand-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => navigateTo('wishlist')}
              className={`relative px-3.5 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-1.5 ${
                currentView === 'wishlist'
                  ? 'text-rose-600 bg-rose-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-500'}`} />
              <span>Saved</span>
              {wishlist.length > 0 && (
                <span className="bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Post Property Free Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPostPropertyOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold tracking-wide uppercase shadow-sm flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Property FREE</span>
            </motion.button>

            {/* User Auth or Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white transition-all text-left"
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
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email || currentUser.phone}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigateTo('wishlist');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 mt-1"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>My Saved Homes ({wishlist.length})</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setIsPostPropertyOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4 text-brand-600" />
                      <span>Add New Listing</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logoutUser();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 mt-1 border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>Sign In / OTP</span>
              </button>
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
                  <span>Sign In with OTP / Email</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
