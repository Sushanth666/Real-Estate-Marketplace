import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { indianCities } from '../../data/citiesData';

export function Footer() {
  const { navigateTo, updateFilter } = useMarketplace();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Assistance Banner */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/60 p-8 rounded-3xl border border-slate-800 mb-14 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Market Intelligence
            </span>
            <h3 className="text-2xl font-bold font-display text-white mb-2">
              Get Weekly Curated Indian Real Estate Insights
            </h3>
            <p className="text-slate-400 text-sm">
              Pre-launch price alerts, RERA market trends, infrastructure corridor updates, and high-yield property picks directly to your inbox.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-80"
            />
            <button className="bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm px-6 py-3 rounded-2xl transition-colors shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30">
              <span>Subscribe Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                Bharat<span className="text-brand-400">Nivas</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              BharatNivas is India’s premier luxury real estate marketplace connecting buyers, owners, and developers with 100% RERA-verified apartments, villas, and sky penthouses across Mumbai, Bengaluru, Delhi NCR, and beyond.
            </p>

            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Level 14, Tower 3, One World Center, Lower Parel, Mumbai 400013</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Toll Free: 1800-267-9000 (Mon - Sat, 9 AM - 8 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>advisory@bharatnivas.in</span>
              </div>
            </div>
          </div>

          {/* Top Indian Cities */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Top Indian Cities
            </h4>
            <ul className="space-y-2.5 text-sm">
              {indianCities.slice(0, 6).map(city => (
                <li key={city.id}>
                  <button
                    onClick={() => {
                      updateFilter('selectedCity', city.name);
                      navigateTo('listings');
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Properties in {city.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Collections */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Property Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    updateFilter('propertyType', 'Penthouse');
                    navigateTo('listings');
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
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
                  className="text-slate-400 hover:text-white transition-colors"
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
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Modern Sky Duplexes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilter('propertyType', 'Individual House');
                    navigateTo('listings');
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Independent Individual Houses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilter('propertyType', 'Builder Floor');
                    navigateTo('listings');
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Independent Builder Floors
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilter('purpose', 'rent');
                    navigateTo('listings');
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Luxury Expat Rentals
                </button>
              </li>
            </ul>
          </div>

          {/* Real Estate Tools & RERA */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              PropTech Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  EMI & Home Loan Calculator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('listings')} className="hover:text-white transition-colors">
                  Property Comparison Matrix
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('agents')} className="hover:text-white transition-colors">
                  RERA Registered Advisors
                </button>
              </li>
              <li>
                <span className="text-slate-500">MahaRERA & K-RERA Guide</span>
              </li>
              <li>
                <span className="text-slate-500">Stamp Duty Calculator (2025)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & RERA Compliance Disclaimer */}
        <div className="border-t border-slate-900 pt-8 pb-6 text-xs text-slate-400 leading-relaxed">
          <p className="mb-3">
            <strong className="text-slate-300">Disclaimer & RERA Compliance:</strong> BharatNivas is an online marketplace connecting property seekers, property sellers, and certified real estate advisors. All projects and properties advertised on this website are subject to the Real Estate (Regulation and Development) Act, 2016 (RERA). We strongly recommend verifying the RERA registration details of each project on the official State RERA portal (e.g., MahaRERA, K-RERA, HRERA, TS-RERA, WB-RERA, TN-RERA) before executing any agreement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900">
            <p>© {new Date().getFullYear()} BharatNivas Real Estate Technologies Private Limited. All Rights Reserved.</p>
            <div className="flex items-center gap-1 text-slate-400">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for Homebuyers across India 🇮🇳</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
