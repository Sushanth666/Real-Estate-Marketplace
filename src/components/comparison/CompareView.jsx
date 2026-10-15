import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, 
  Trash2, 
  Check, 
  Minus, 
  ExternalLink, 
  ArrowRight, 
  Plus, 
  MapPin, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  X,
  CreditCard,
  Layers,
  Compass
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatIndianCurrency, formatIndianNumber, calculateEMI } from '../../utils/formatters';

export function CompareView() {
  const { 
    properties, 
    compareList, 
    toggleCompare, 
    removeFromCompare, 
    clearCompare, 
    viewPropertyDetail,
    setScheduleModalProp,
    navigateTo,
    showToast
  } = useMarketplace();

  const comparedProperties = properties.filter(p => compareList.includes(p.id));

  const allAmenitiesToCompare = [
    'Swimming Pool',
    'Clubhouse',
    '24/7 Security',
    'Gymnasium',
    'Private Elevator',
    'EV Charging',
    'Vastu Compliant',
    'Power Backup',
    'Landscaped Gardens'
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
              <button 
                onClick={() => navigateTo('home')} 
                className="hover:text-brand-600 transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-slate-700">Property Comparison Matrix</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight flex items-center gap-3">
              <span>Compare Residences</span>
              {comparedProperties.length > 0 && (
                <span className="text-sm bg-brand-100 text-brand-800 font-bold px-3 py-1 rounded-full border border-brand-200">
                  {comparedProperties.length} of 4 Homes
                </span>
              )}
            </h1>
            
            <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Benchmark luxury properties side-by-side with verified RERA compliance, carpet area calculations, price per square foot, and complete amenities.
            </p>
          </div>

          {/* Quick Header Actions */}
          {comparedProperties.length > 0 && (
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3 self-start md:self-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigateTo('listings')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add More Homes</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={clearCompare}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-rose-200/60"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* Empty State: When no properties are selected */}
        {comparedProperties.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-slate-200/80 shadow-sm max-w-xl mx-auto my-6"
          >
            <motion.div 
              animate={{ rotate: [-8, 8, -8], y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-18 h-18 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-5 border border-brand-100 shadow-sm shadow-brand-100"
            >
              <Scale className="w-9 h-9" />
            </motion.div>

            <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full mb-3 inline-block">
              Side-by-Side Evaluator
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-2">
              No Properties Selected for Comparison
            </h3>

            <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-md mx-auto">
              Evaluate up to 4 luxury residences side-by-side. Click the scale icon (<span className="text-brand-600 font-semibold">⚖️</span>) on any property card, or test the matrix with top residences right away.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (properties[0]?.id && !compareList.includes(properties[0].id)) toggleCompare(properties[0].id);
                  if (properties[1]?.id && !compareList.includes(properties[1].id)) toggleCompare(properties[1].id);
                }}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-7 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-md shadow-brand-600/25 cursor-pointer"
              >
                <span>⚡ Quick Compare Top 2 Residences</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigateTo('listings')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-7 py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Browse All Properties</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Active Comparison Matrix Page View */
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
            
            {/* Top Info Banner */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-brand-600/10 via-white to-amber-500/10 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Certified RERA Compliance • Direct Comparison</span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Tip: Click <span className="font-bold text-slate-700">Details</span> to inspect verified floor plans and pricing.
              </div>
            </div>

            {/* Scrollable Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80">
                    <th className="p-5 bg-slate-50 font-extrabold text-slate-500 uppercase tracking-wider w-48 min-w-[180px] align-top">
                      <div className="pt-2">
                        <span className="block text-[11px] font-bold text-brand-600 uppercase">Residence</span>
                        <span className="text-base font-bold text-slate-900 font-display">Overview</span>
                      </div>
                    </th>

                    {comparedProperties.map(prop => (
                      <th key={prop.id} className="p-5 bg-slate-50/80 min-w-[270px] max-w-[320px] align-top">
                        <div className="relative group bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
                          {/* Image Container with Remove Button */}
                          <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                            <img
                              src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80'}
                              alt={prop.title}
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80';
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <button
                              onClick={() => removeFromCompare(prop.id)}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/65 text-white hover:bg-rose-600 transition-colors cursor-pointer shadow-md"
                              title="Remove from comparison"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <div className="absolute bottom-2 left-2">
                              <span className="bg-slate-950/85 backdrop-blur-md text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-sky-400/30">
                                {prop.propertyType}
                              </span>
                            </div>
                          </div>

                          {/* Property Title & Location */}
                          <h4 className="font-bold text-sm text-slate-900 line-clamp-1 mb-1 font-display">
                            {prop.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mb-3 truncate">
                            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                            {prop.locality}, {prop.city}
                          </p>

                          {/* Quick Price */}
                          <div className="flex items-baseline justify-between mb-3 pb-3 border-b border-slate-100">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">Price</span>
                              <span className="text-base font-extrabold text-slate-900 font-display">
                                {formatIndianCurrency(prop.price)}
                              </span>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-500">
                              ₹{formatIndianNumber(prop.pricePerSqft)}/sqft
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => viewPropertyDetail(prop.id)}
                              className="bg-slate-900 hover:bg-brand-700 text-white text-[11px] font-bold py-2 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                            >
                              <span>Details</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>

                            <button
                              onClick={() => setScheduleModalProp(prop)}
                              className="bg-brand-50 hover:bg-brand-100 text-brand-700 text-[11px] font-bold py-2 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Calendar className="w-3 h-3" />
                              <span>Visit</span>
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {/* SECTION 1: Financial & Valuation */}
                  <tr className="bg-slate-100/70">
                    <td colSpan={comparedProperties.length + 1} className="py-2.5 px-5 font-extrabold text-slate-700 uppercase tracking-wider text-[11px]">
                      1. Financial & Valuation Breakdown
                    </td>
                  </tr>

                  {/* Price Row */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Expected Value</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-4">
                        <span className="text-lg font-extrabold text-slate-900 font-display">
                          {formatIndianCurrency(p.price)}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {p.purpose === 'rent' ? 'Monthly Lease' : 'All-Inclusive Value'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Price / Sq.ft */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Rate / Sq.Ft</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-4 font-medium text-slate-800">
                        ₹{formatIndianNumber(p.pricePerSqft)} / sqft
                      </td>
                    ))}
                  </tr>

                  {/* Monthly Estimated EMI */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Estimated Monthly EMI</td>
                    {comparedProperties.map(p => {
                      const emi = calculateEMI(p.price * 0.8, 8.5, 20);
                      return (
                        <td key={p.id} className="p-4 font-bold text-brand-700">
                          {formatIndianCurrency(emi)} <span className="text-[11px] text-slate-400 font-normal">/ mo (20 yrs @ 8.5%)</span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Purpose */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Listing Type</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          {p.purpose === 'rent' ? 'For Rent' : 'For Sale'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* SECTION 2: Dimensions & Layout */}
                  <tr className="bg-slate-100/70">
                    <td colSpan={comparedProperties.length + 1} className="py-2.5 px-5 font-extrabold text-slate-700 uppercase tracking-wider text-[11px]">
                      2. Layout & Area Specifications
                    </td>
                  </tr>

                  {/* Configuration */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">BHK Configuration</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-4 font-bold text-slate-900 text-sm">
                        {p.bhk} BHK Residence
                      </td>
                    ))}
                  </tr>

                  {/* Bathrooms & Balconies */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Baths & Balconies</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-4 font-medium text-slate-700">
                        {p.bathrooms} Baths • {p.balconies || 1} Balconies
                      </td>
                    ))}
                  </tr>

                  {/* Super Built-up Area */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Super Built-up Area</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-4 font-bold text-slate-800">
                        {formatIndianNumber(p.builtUpArea)} Sq.Ft
                      </td>
                    ))}
                  </tr>

                  {/* Carpet Area */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Carpet Area</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-4 font-medium text-slate-700">
                        {formatIndianNumber(p.carpetArea)} Sq.Ft
                        <span className="text-[10px] text-slate-400 block">
                          ({Math.round((p.carpetArea / p.builtUpArea) * 100)}% efficiency)
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* SECTION 3: Building & Regulatory Details */}
                  <tr className="bg-slate-100/70">
                    <td colSpan={comparedProperties.length + 1} className="py-2.5 px-5 font-extrabold text-slate-700 uppercase tracking-wider text-[11px]">
                      3. Regulatory & Construction Status
                    </td>
                  </tr>

                  {/* Possession Status */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Possession Status</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-4 font-medium text-slate-700">
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-blue-200">
                          {p.possession}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Facing / Vastu */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Orientation & Vastu</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-4 text-slate-700 font-medium">
                        {p.facing || 'East Facing (100% Vastu Compliant)'}
                      </td>
                    ))}
                  </tr>

                  {/* Developer / Builder */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Builder / Developer</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-4 font-bold text-slate-900">
                        {p.builder || 'Verified Private Owner'}
                      </td>
                    ))}
                  </tr>

                  {/* RERA ID */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">RERA Registration ID</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-4 text-[11px] font-mono font-bold text-brand-800">
                        {p.reraId}
                      </td>
                    ))}
                  </tr>

                  {/* SECTION 4: Amenities Matrix */}
                  <tr className="bg-slate-100/70">
                    <td colSpan={comparedProperties.length + 1} className="py-2.5 px-5 font-extrabold text-slate-700 uppercase tracking-wider text-[11px]">
                      4. Sanctioned Amenities & Lifestyle
                    </td>
                  </tr>

                  {allAmenitiesToCompare.map(amenity => (
                    <tr key={amenity} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-medium text-slate-600 bg-slate-50/50">{amenity}</td>
                      {comparedProperties.map(p => {
                        const hasAmenity = p.amenities && p.amenities.includes(amenity);
                        return (
                          <td key={p.id} className="p-4">
                            {hasAmenity ? (
                              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 text-xs">
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Included</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-slate-400">
                                <Minus className="w-3.5 h-3.5" />
                                <span>Not Available</span>
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* SECTION 5: Final CTA Row */}
                  <tr className="bg-slate-50">
                    <td className="p-5 font-bold text-slate-700">Actions</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} className="p-5">
                        <button
                          onClick={() => viewPropertyDetail(p.id)}
                          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-brand-600/20 transition-all cursor-pointer"
                        >
                          <span>View Full Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
