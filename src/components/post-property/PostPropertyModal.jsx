import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  PlusCircle, 
  ShieldCheck, 
  Home, 
  MapPin, 
  IndianRupee, 
  BedDouble, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Check,
  UploadCloud,
  Eye
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { indianCities } from '../../data/citiesData';
import { formatIndianCurrency } from '../../utils/formatters';

export function PostPropertyModal() {
  const { 
    isPostPropertyOpen, 
    setIsPostPropertyOpen, 
    addNewProperty, 
    currentUser 
  } = useMarketplace();

  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    purpose: 'buy', // 'buy' | 'rent'
    propertyType: 'Apartment',
    city: 'Chennai (Tamil Nadu)',
    locality: '',
    address: '',
    price: 15000000, // ₹1.5 Cr
    pricePerSqft: 12500,
    bhk: 3,
    bathrooms: 3,
    balconies: 2,
    builtUpArea: 1850,
    carpetArea: 1450,
    floor: '12th Floor (of 24 Floors)',
    facing: 'East Facing (Vastu Compliant)',
    possession: 'Ready to Move',
    furnishing: 'Semi-Furnished',
    builder: '',
    reraId: '',
    description: '',
    amenities: ['Swimming Pool', 'Clubhouse', '24/7 Security', 'Gymnasium', 'EV Charging', 'Power Backup'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ]
  });

  if (!isPostPropertyOpen) return null;

  const handleFieldChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists 
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewProperty({
      ...formData,
      title: formData.title || `${formData.bhk} BHK Luxury ${formData.propertyType} in ${formData.locality || formData.city}`,
      pricePerSqft: Math.round(formData.price / (formData.builtUpArea || 1500))
    });
    setIsPostPropertyOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsPostPropertyOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-3xl max-h-[92vh] flex flex-col z-10 overflow-hidden"
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-white to-emerald-500/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded">
                100% Free Listing
              </span>
              <span className="text-xs text-slate-500">Step {step} of 3</span>
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900 mt-1">
              List Your Property on BharatNivas
            </h2>
          </div>

          <button
            onClick={() => setIsPostPropertyOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Listing Purpose
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => handleFieldChange('purpose', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="buy">Sell Property</option>
                    <option value="rent">Rent / Lease</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Property Category
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => handleFieldChange('propertyType', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Duplex">Duplex Mansion</option>
                    <option value="Builder Floor">Independent Builder Floor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Property Title / Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Godrej Woods Sea-Facing Luxury 3 BHK"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    City / Metro
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500"
                  >
                    {indianCities.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Locality / Sector
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bandra West, Worli, Indiranagar"
                    value={formData.locality}
                    onChange={(e) => handleFieldChange('locality', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Building / Society Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tower 2, Flat 1402, Lodha Bellissimo, Mumbai 400013"
                  value={formData.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 2: Specifications & Pricing */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Bedrooms (BHK)
                  </label>
                  <select
                    value={formData.bhk}
                    onChange={(e) => handleFieldChange('bhk', Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold"
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n} BHK</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Bathrooms
                  </label>
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => handleFieldChange('bathrooms', Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} Baths</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Balconies
                  </label>
                  <select
                    value={formData.balconies}
                    onChange={(e) => handleFieldChange('balconies', Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold"
                  >
                    {[1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} Balconies</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Super Built-up Area (Sq.Ft)
                  </label>
                  <input
                    type="number"
                    value={formData.builtUpArea}
                    onChange={(e) => handleFieldChange('builtUpArea', Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Carpet Area (Sq.Ft)
                  </label>
                  <input
                    type="number"
                    value={formData.carpetArea}
                    onChange={(e) => handleFieldChange('carpetArea', Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Price in INR */}
              <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Expected Price (₹ INR)
                  </label>
                  <span className="text-base font-extrabold text-amber-800 font-display">
                    {formatIndianCurrency(formData.price)}
                  </span>
                </div>
                <input
                  type="number"
                  step="100000"
                  value={formData.price}
                  onChange={(e) => handleFieldChange('price', Number(e.target.value))}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900"
                />
                <span className="text-[11px] text-amber-700 mt-1 block">
                  e.g. 15000000 = ₹1.50 Cr | 8500000 = ₹85 Lakh
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Possession Status
                  </label>
                  <select
                    value={formData.possession}
                    onChange={(e) => handleFieldChange('possession', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium"
                  >
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="New Launch">New Launch</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Vastu / Facing
                  </label>
                  <input
                    type="text"
                    value={formData.facing}
                    onChange={(e) => handleFieldChange('facing', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Amenities & Final Preview */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Select Amenities Included:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Swimming Pool',
                    'Clubhouse',
                    '24/7 Security',
                    'Gymnasium',
                    'EV Charging',
                    'Power Backup',
                    'Private Elevator',
                    'Landscaped Gardens',
                    'Vastu Compliant'
                  ].map(amenity => {
                    const isChecked = formData.amenities.includes(amenity);
                    return (
                      <div
                        key={amenity}
                        onClick={() => handleAmenityToggle(amenity)}
                        className={`p-2 rounded-xl border text-xs font-medium cursor-pointer transition-colors flex items-center gap-2 ${
                          isChecked
                            ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-300'
                        }`}>
                          {isChecked && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span className="truncate">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Property Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe view, proximity to metro, modular woodwork, high ceilings, etc."
                  value={formData.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Instant Mini Live Card Preview */}
              <div className="p-4 bg-slate-900 rounded-2xl text-white">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-2">
                  Instant Live Marketplace Preview
                </span>
                <div className="flex gap-4 items-center">
                  <img
                    src={formData.images[0]}
                    alt="Preview"
                    className="w-20 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white line-clamp-1">
                      {formData.title || `${formData.bhk} BHK in ${formData.city}`}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {formData.locality || formData.city} • {formData.bhk} BHK • {formData.builtUpArea} sqft
                    </p>
                    <p className="text-sm font-bold text-emerald-400 font-display mt-0.5">
                      {formatIndianCurrency(formData.price)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Wizard Footer Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(s => s + 1)}
                className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-brand-600/30"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold px-7 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Property Live 🇮🇳</span>
              </button>
            )}
          </div>

        </form>

      </motion.div>
    </div>
  );
}
