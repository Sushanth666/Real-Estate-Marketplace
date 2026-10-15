import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { indianCities } from '../../data/citiesData';

export function Footer() {
  const { navigateTo, updateFilter, openPostProperty } = useMarketplace();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-10 border-t border-slate-800/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Useful Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-slate-850">
          
          {/* Column 1: Brand & Direct Support */}
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                Bharat<span className="text-brand-400">Nivas</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
              India's premier luxury real estate marketplace connecting buyers and owners with 100% verified, RERA-registered homes.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <a 
                href="tel:18002679000" 
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>1800-267-9000 (Toll Free • Mon - Sat)</span>
              </a>
              <a 
                href="mailto:advisory@bharatnivas.in" 
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>advisory@bharatnivas.in</span>
              </a>
              <div className="flex items-center gap-2 text-slate-500 pt-1">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Mumbai • Bengaluru • Chennai • Delhi NCR</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3.5 tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => navigateTo('listings')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Explore All Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('cities')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Top Indian Cities (12 Metros)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('compare')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Property Comparison Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('wishlist')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Saved Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('agents')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  RERA Certified Advisors
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={openPostProperty}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Post Property Free</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Indian Cities */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3.5 tracking-wide">
              Top Cities
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {['Chennai', 'Coimbatore', 'Madurai', 'Mumbai', 'Bengaluru', 'Delhi NCR'].map(cityName => (
                <li key={cityName}>
                  <button
                    onClick={() => {
                      updateFilter('selectedCity', cityName);
                      navigateTo('listings');
                    }}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Properties in {cityName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Property Types */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3.5 tracking-wide">
              Property Categories
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => {
                    updateFilter('propertyType', 'Apartment');
                    navigateTo('listings');
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Luxury Apartments
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilter('propertyType', 'Penthouse');
                    navigateTo('listings');
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sea-Facing Penthouses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilter('propertyType', 'Luxury Villa');
                    navigateTo('listings');
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Gated Golf Villas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilter('propertyType', 'Duplex');
                    navigateTo('listings');
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sky Duplexes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilter('purpose', 'rent');
                    navigateTo('listings');
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Verified Rental Homes
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Clean, Useful Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          {/* Trust Seal */}
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% RERA Certified Marketplace • MahaRERA, TN-RERA, K-RERA Verified</span>
          </div>

          {/* Copyright & Country */}
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} BharatNivas. All Rights Reserved.</span>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1 text-slate-400">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>in India 🇮🇳</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
