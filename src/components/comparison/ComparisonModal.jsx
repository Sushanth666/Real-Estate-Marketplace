import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Scale, 
  Trash2, 
  Check, 
  Minus, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatIndianCurrency, formatIndianNumber, calculateEMI } from '../../utils/formatters';

export function ComparisonModal() {
  const { 
    properties, 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    isCompareModalOpen, 
    setIsCompareModalOpen,
    viewPropertyDetail,
    navigateTo
  } = useMarketplace();

  if (!isCompareModalOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCompareModalOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-6xl max-h-[92vh] flex flex-col z-10 overflow-hidden"
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                Property Comparison Matrix
              </h2>
              <p className="text-xs text-slate-500">
                Evaluating {comparedProperties.length} of 4 selected residences side-by-side
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparedProperties.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Table */}
        <div className="overflow-x-auto flex-1 p-4 sm:p-6">
          {comparedProperties.length === 0 ? (
            <div className="text-center py-16">
              <Scale className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Properties Selected</h3>
              <p className="text-xs text-slate-500 mb-4">Click "Compare" on any property card to view side-by-side specs.</p>
              <button
                onClick={() => {
                  setIsCompareModalOpen(false);
                  navigateTo('listings');
                }}
                className="bg-brand-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-3 bg-slate-50 rounded-tl-2xl font-bold text-slate-500 uppercase tracking-wider w-40 min-w-[140px]">
                    Attribute
                  </th>
                  {comparedProperties.map(prop => (
                    <th key={prop.id} className="p-3 bg-slate-50 min-w-[240px] max-w-[280px]">
                      <div className="relative group">
                        <img
                          src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'}
                          alt={prop.title}
                          className="w-full h-32 object-cover rounded-xl mb-2.5 shadow-xs"
                        />
                        <button
                          onClick={() => removeFromCompare(prop.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-1 mb-1">
                          {prop.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate mb-2">
                          {prop.locality}, {prop.city}
                        </p>
                        <button
                          onClick={() => {
                            setIsCompareModalOpen(false);
                            viewPropertyDetail(prop.id);
                          }}
                          className="text-[11px] font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
                        >
                          <span>View Full Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {/* Price Row */}
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Price</td>
                  {comparedProperties.map(p => (
                    <td key={p.id} className="p-3">
                      <span className="text-base font-extrabold text-slate-900 font-display">
                        {formatIndianCurrency(p.price)}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Price / Sq.ft */}
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Rate / Sq.Ft</td>
                  {comparedProperties.map(p => (
                    <td key={p.id} className="p-3 font-medium text-slate-700">
                      ₹{formatIndianNumber(p.pricePerSqft)} / sqft
                    </td>
                  ))}
                </tr>

                {/* Monthly Estimated EMI */}
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Estimated EMI</td>
                  {comparedProperties.map(p => {
                    const emi = calculateEMI(p.price * 0.8, 8.5, 20);
                    return (
                      <td key={p.id} className="p-3 font-semibold text-emerald-700">
                        {formatIndianCurrency(emi)} / mo
                      </td>
                    );
                  })}
                </tr>

                {/* BHK & Baths */}
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">BHK & Baths</td>
                  {comparedProperties.map(p => (
                    <td key={p.id} className="p-3 font-bold text-slate-800">
                      {p.bhk} BHK • {p.bathrooms} Baths
                    </td>
                  ))}
                </tr>

                {/* Super Built-up Area */}
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Super Built-up</td>
                  {comparedProperties.map(p => (
                    <td key={p.id} className="p-3 font-medium text-slate-700">
                      {formatIndianNumber(p.builtUpArea)} Sq.Ft
                    </td>
                  ))}
                </tr>

                {/* Carpet Area */}
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Carpet Area</td>
                  {comparedProperties.map(p => (
                    <td key={p.id} className="p-3 font-medium text-slate-700">
                      {formatIndianNumber(p.carpetArea)} Sq.Ft
                    </td>
                  ))}
                </tr>

                {/* Possession Status */}
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Possession</td>
                  {comparedProperties.map(p => (
                    <td key={p.id} className="p-3 font-medium text-slate-700">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                        {p.possession}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Facing / Vastu */}
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Facing Direction</td>
                  {comparedProperties.map(p => (
                    <td key={p.id} className="p-3 text-slate-700">
                      {p.facing || 'East Facing (Vastu Compliant)'}
                    </td>
                  ))}
                </tr>

                {/* Developer */}
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Builder</td>
                  {comparedProperties.map(p => (
                    <td key={p.id} className="p-3 font-semibold text-slate-800">
                      {p.builder}
                    </td>
                  ))}
                </tr>

                {/* RERA ID */}
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">RERA Registration</td>
                  {comparedProperties.map(p => (
                    <td key={p.id} className="p-3 text-[11px] font-mono text-emerald-800">
                      {p.reraId}
                    </td>
                  ))}
                </tr>

                {/* Amenities Matrix */}
                {allAmenitiesToCompare.map(amenity => (
                  <tr key={amenity}>
                    <td className="p-3 font-medium text-slate-500 bg-slate-50/50">{amenity}</td>
                    {comparedProperties.map(p => {
                      const hasAmenity = p.amenities && p.amenities.includes(amenity);
                      return (
                        <td key={p.id} className="p-3">
                          {hasAmenity ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                              <Check className="w-4 h-4" />
                              <span>Yes</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-300">
                              <Minus className="w-3.5 h-3.5" />
                              <span>No</span>
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </motion.div>
    </div>
  );
}
