import React from 'react';
import { Heart, ArrowRight, Trash2, Scale, Sparkles, Building2 } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { PropertyCard } from '../common/PropertyCard';
import { formatIndianCurrency } from '../../utils/formatters';

export function WishlistView() {
  const { 
    properties, 
    wishlist, 
    navigateTo, 
    setIsCompareModalOpen, 
    toggleWishlist,
    showToast
  } = useMarketplace();

  const savedProperties = properties.filter(p => wishlist.includes(p.id));

  const totalValue = savedProperties.reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
              <span>Home</span>
              <span>/</span>
              <span className="text-slate-700">My Saved Residences</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight flex items-center gap-3">
              <span>Saved Properties</span>
              <span className="text-sm bg-rose-100 text-rose-700 font-bold px-3 py-1 rounded-full border border-rose-200">
                {savedProperties.length} Homes
              </span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Your shortlisted luxury residences across India, saved for your review.
            </p>
          </div>

          {/* Quick Portfolio Stats */}
          {savedProperties.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  Total Shortlist Value
                </span>
                <span className="text-xl font-extrabold font-display text-slate-900">
                  {formatIndianCurrency(totalValue)}
                </span>
              </div>

              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Matrix</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {savedProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/80 shadow-xs max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Explore our handpicked collection of verified luxury penthouses, villas, and apartments in Mumbai, Bengaluru, Delhi NCR, and Goa.
            </p>
            <button
              onClick={() => navigateTo('listings')}
              className="bg-slate-900 hover:bg-brand-700 text-white font-bold px-7 py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-md"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map(property => (
              <PropertyCard key={property.id} property={property} layout="grid" />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
