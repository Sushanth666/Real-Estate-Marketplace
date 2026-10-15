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
    currentUser,
    showToast
  } = useMarketplace();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Form State with unselected defaults requiring explicit user choice
  const initialFormState = {
    title: '',
    purpose: '', // User must select option
    propertyType: '', // User must select option
    city: '', // User must select option
    locality: '',
    address: '',
    price: '',
    pricePerSqft: 0,
    bhk: '', // User must select option
    bathrooms: '', // User must select option
    balconies: '', // User must select option
    builtUpArea: '',
    carpetArea: '',
    floor: '',
    facing: '',
    possession: '', // User must select option
    furnishing: '',
    builder: '',
    reraId: '',
    description: '',
    amenities: ['Swimming Pool', 'Clubhouse', '24/7 Security', 'Gymnasium', 'EV Charging', 'Power Backup'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ]
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleFieldChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
    // Clear error for field on change
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
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

  const handleNext = () => {
    if (step === 1) {
      const errs = {};
      if (!formData.purpose) errs.purpose = 'Please select a listing purpose';
      if (!formData.propertyType) errs.propertyType = 'Please select a property category';
      if (!formData.title.trim()) errs.title = 'Please enter a property title';
      if (!formData.city) errs.city = 'Please select a city / metro';
      if (!formData.locality.trim()) errs.locality = 'Please enter locality / sector';

      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      const errs = {};
      if (formData.bhk === '' || formData.bhk === undefined) errs.bhk = 'Please select bedrooms (BHK)';
      if (formData.bathrooms === '' || formData.bathrooms === undefined) errs.bathrooms = 'Please select bathrooms';
      if (formData.balconies === '' || formData.balconies === undefined) errs.balconies = 'Please select balconies';
      if (!formData.price || Number(formData.price) <= 0) errs.price = 'Please enter expected price';
      if (!formData.possession) errs.possession = 'Please select possession status';

      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      setStep(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step !== 3) return;
    const finalPrice = Number(formData.price) || 10000000;
    const finalBuiltUp = Number(formData.builtUpArea) || 1500;
    const finalCarpet = Number(formData.carpetArea) || Math.round(finalBuiltUp * 0.8);

    addNewProperty({
      ...formData,
      price: finalPrice,
      builtUpArea: finalBuiltUp,
      carpetArea: finalCarpet,
      bhk: Number(formData.bhk) || 3,
      bathrooms: Number(formData.bathrooms) || 2,
      balconies: Number(formData.balconies) || 1,
      title: formData.title || `${formData.bhk} BHK Luxury ${formData.propertyType} in ${formData.locality || formData.city}`,
      pricePerSqft: Math.round(finalPrice / finalBuiltUp)
    });

    showToast('🎉 Property published live on BharatNivas!', 'success');
    setIsPostPropertyOpen(false);
    setFormData(initialFormState);
    setStep(1);
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isPostPropertyOpen && (
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
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-white to-brand-500/10">
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
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
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
                    Listing Purpose <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => handleFieldChange('purpose', e.target.value)}
                    className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500 cursor-pointer transition-colors ${
                      errors.purpose ? 'border-rose-400 bg-rose-50/20 text-rose-900' : 'border-slate-200'
                    }`}
                  >
                    <option value="" disabled>Select Option</option>
                    <option value="buy">Sell Property</option>
                    <option value="rent">Rent / Lease</option>
                  </select>
                  {errors.purpose && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.purpose}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Property Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => handleFieldChange('propertyType', e.target.value)}
                    className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500 cursor-pointer transition-colors ${
                      errors.propertyType ? 'border-rose-400 bg-rose-50/20 text-rose-900' : 'border-slate-200'
                    }`}
                  >
                    <option value="" disabled>Select Option</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Individual House">Individual House</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Duplex">Duplex Mansion</option>
                    <option value="Builder Floor">Independent Builder Floor</option>
                  </select>
                  {errors.propertyType && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.propertyType}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Property Title / Headline <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Godrej Woods Sea-Facing Luxury 3 BHK"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500 transition-colors ${
                    errors.title ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
                {errors.title && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    City / Metro <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
                    className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500 cursor-pointer transition-colors ${
                      errors.city ? 'border-rose-400 bg-rose-50/20 text-rose-900' : 'border-slate-200'
                    }`}
                  >
                    <option value="" disabled>Select Option</option>
                    {indianCities.map(c => (
                      <option key={c.id} value={c.name}>{c.name} ({c.state})</option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Locality / Sector <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bandra West, Worli, Indiranagar"
                    value={formData.locality}
                    onChange={(e) => handleFieldChange('locality', e.target.value)}
                    className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500 transition-colors ${
                      errors.locality ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.locality && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.locality}</p>
                  )}
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
                    Bedrooms (BHK) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.bhk}
                    onChange={(e) => handleFieldChange('bhk', e.target.value !== '' ? Number(e.target.value) : '')}
                    className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs font-semibold cursor-pointer transition-colors ${
                      errors.bhk ? 'border-rose-400 bg-rose-50/20 text-rose-900' : 'border-slate-200'
                    }`}
                  >
                    <option value="" disabled>Select Option</option>
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n} BHK</option>
                    ))}
                  </select>
                  {errors.bhk && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.bhk}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Bathrooms <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => handleFieldChange('bathrooms', e.target.value !== '' ? Number(e.target.value) : '')}
                    className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs font-semibold cursor-pointer transition-colors ${
                      errors.bathrooms ? 'border-rose-400 bg-rose-50/20 text-rose-900' : 'border-slate-200'
                    }`}
                  >
                    <option value="" disabled>Select Option</option>
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} Baths</option>
                    ))}
                  </select>
                  {errors.bathrooms && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.bathrooms}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Balconies <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.balconies}
                    onChange={(e) => handleFieldChange('balconies', e.target.value !== '' ? Number(e.target.value) : '')}
                    className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs font-semibold cursor-pointer transition-colors ${
                      errors.balconies ? 'border-rose-400 bg-rose-50/20 text-rose-900' : 'border-slate-200'
                    }`}
                  >
                    <option value="" disabled>Select Option</option>
                    {[0, 1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n === 0 ? 'No Balcony' : `${n} Balconies`}</option>
                    ))}
                  </select>
                  {errors.balconies && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.balconies}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Super Built-up Area (Sq.Ft)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 1850"
                    value={formData.builtUpArea}
                    onChange={(e) => handleFieldChange('builtUpArea', e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Carpet Area (Sq.Ft)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 1450"
                    value={formData.carpetArea}
                    onChange={(e) => handleFieldChange('carpetArea', e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Price in INR */}
              <div className={`border p-4 rounded-2xl transition-colors ${
                errors.price ? 'bg-rose-50/40 border-rose-300' : 'bg-amber-50 border-amber-200/80'
              }`}>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Expected Price (₹ INR) <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-base font-extrabold text-amber-800 font-display">
                    {formData.price ? formatIndianCurrency(formData.price) : '₹0'}
                  </span>
                </div>
                <input
                  type="number"
                  step="100000"
                  placeholder="e.g. 15000000"
                  value={formData.price}
                  onChange={(e) => handleFieldChange('price', e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900"
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[11px] text-amber-700 block">
                    e.g. 15000000 = ₹1.50 Cr | 8500000 = ₹85 Lakh
                  </span>
                  {errors.price && (
                    <span className="text-[11px] text-rose-500 font-bold">{errors.price}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Possession Status <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.possession}
                    onChange={(e) => handleFieldChange('possession', e.target.value)}
                    className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs font-medium cursor-pointer transition-colors ${
                      errors.possession ? 'border-rose-400 bg-rose-50/20 text-rose-900' : 'border-slate-200'
                    }`}
                  >
                    <option value="" disabled>Select Option</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="New Launch">New Launch</option>
                  </select>
                  {errors.possession && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.possession}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Vastu / Facing
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. East Facing (Vastu Compliant)"
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
                <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider block mb-2">
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
                      {formData.title || `${formData.bhk || 3} BHK in ${formData.city || 'India'}`}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {formData.locality || formData.city || 'Prime Location'} • {formData.bhk || 3} BHK • {formData.builtUpArea || 1500} sqft
                    </p>
                    <p className="text-sm font-bold text-sky-400 font-display mt-0.5">
                      {formData.price ? formatIndianCurrency(formData.price) : 'Price on Request'}
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
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                key="wizard-continue-btn"
                type="button"
                onClick={handleNext}
                className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-brand-600/30 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                key="wizard-publish-btn"
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold px-7 py-3 rounded-xl flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Property Live 🇮🇳</span>
              </button>
            )}
          </div>

        </form>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
