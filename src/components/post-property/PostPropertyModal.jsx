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
  Eye,
  Camera,
  Trash2,
  Star,
  Plus,
  Tag,
  ImagePlus,
  Lock,
  User,
  Building2
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
    setIsAuthModalOpen,
    setAuthModalMode,
    setPendingOpenPostProperty,
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
    coverImage: '',
    extraImages: []
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

  const [customFeatureInput, setCustomFeatureInput] = useState('');

  // 1. Handle Main Cover Photo Upload (Single File)
  const handleCoverPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result;
      if (base64Url) {
        setFormData(prev => ({
          ...prev,
          coverImage: base64Url
        }));
        showToast('Cover photo uploaded successfully! ⭐', 'success');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Remove Cover Photo
  const handleRemoveCoverPhoto = () => {
    setFormData(prev => ({
      ...prev,
      coverImage: ''
    }));
    showToast('Cover photo removed', 'info');
  };

  // 2. Handle Additional / Extra Photos Upload (Multiple Files)
  const handleExtraPhotosUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Url = uploadEvent.target?.result;
        if (base64Url) {
          setFormData(prev => ({
            ...prev,
            extraImages: [...prev.extraImages, base64Url]
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
    showToast(`Uploaded ${files.length} extra photo${files.length > 1 ? 's' : ''}! 📸`, 'success');
  };

  // Remove Extra Photo
  const handleRemoveExtraPhoto = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      extraImages: prev.extraImages.filter((_, idx) => idx !== indexToRemove)
    }));
    showToast('Extra photo removed 🗑️', 'info');
  };

  // Promote Extra Photo to Cover Photo
  const handlePromoteToCover = (indexToPromote) => {
    setFormData(prev => {
      const selected = prev.extraImages[indexToPromote];
      const remainingExtra = prev.extraImages.filter((_, idx) => idx !== indexToPromote);
      const updatedExtra = prev.coverImage ? [prev.coverImage, ...remainingExtra] : remainingExtra;
      return {
        ...prev,
        coverImage: selected,
        extraImages: updatedExtra
      };
    });
    showToast('Promoted photo to main cover photo! ⭐', 'success');
  };

  // Add Custom Feature
  const handleAddCustomFeature = (featureName) => {
    const featureToAdd = (featureName || customFeatureInput).trim();
    if (!featureToAdd) return;

    if (formData.amenities.some(a => a.toLowerCase() === featureToAdd.toLowerCase())) {
      showToast('This feature is already added', 'info');
      setCustomFeatureInput('');
      return;
    }

    setFormData(prev => ({
      ...prev,
      amenities: [...prev.amenities, featureToAdd],
      highlights: [...(prev.highlights || []), featureToAdd]
    }));
    setCustomFeatureInput('');
    showToast(`Added feature: "${featureToAdd}" ✨`, 'success');
  };

  // Remove Feature
  const handleRemoveFeature = (featureToRemove) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== featureToRemove),
      highlights: (prev.highlights || []).filter(h => h !== featureToRemove)
    }));
  };

  const popularFeatureSuggestions = [
    'Private Terrace Garden',
    'Smart Home Automation',
    'Italian Marble Flooring',
    'Private Swimming Pool',
    'Home Cinema / Theater',
    'Servant / Maid Room',
    'Solar Panel Power',
    'Modular Designer Kitchen',
    'Pooja Room & Vastu',
    'EV Fast Charger'
  ];

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

    // Combine coverImage and extraImages
    const allImages = [];
    if (formData.coverImage) {
      allImages.push(formData.coverImage);
    }
    if (formData.extraImages && formData.extraImages.length > 0) {
      allImages.push(...formData.extraImages);
    }
    const finalImages = allImages.length > 0 
      ? allImages 
      : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'];

    addNewProperty({
      ...formData,
      images: finalImages,
      image: finalImages[0],
      price: finalPrice,
      builtUpArea: finalBuiltUp,
      carpetArea: finalCarpet,
      bhk: Number(formData.bhk) || 3,
      bathrooms: Number(formData.bathrooms) || 2,
      balconies: Number(formData.balconies) || 1,
      title: formData.title || `${formData.bhk} BHK Luxury ${formData.propertyType} in ${formData.locality || formData.city}`,
      pricePerSqft: Math.round(finalPrice / finalBuiltUp),
      amenities: formData.amenities,
      highlights: (formData.highlights && formData.highlights.length > 0)
        ? formData.highlights
        : formData.amenities.slice(0, 6),
      ownerId: currentUser?.email,
      ownerName: currentUser?.name || 'Verified Direct Owner',
      ownerEmail: currentUser?.email,
      agentName: currentUser?.name || 'Verified Direct Owner',
      agentPhone: currentUser?.phone || '+91 98200 11223'
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

            {/* Compulsory Authentication Guard if user is not logged in */}
            {!currentUser ? (
              <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shadow-inner">
                  <Lock className="w-10 h-10" />
                </div>
                <div className="max-w-md space-y-2">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                    Compulsory Login Required
                  </span>
                  <h3 className="text-2xl font-bold font-display text-slate-900">
                    Sign In to Add Property Details
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    To maintain verified genuine ownership and protect buyers & tenants against spam, users must be compulsory logged in before adding or publishing property details.
                  </p>
                </div>

                <div className="w-full max-w-sm space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPendingOpenPostProperty(true);
                      setAuthModalMode('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4" /> Sign In to Add Property Details
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPendingOpenPostProperty(true);
                      setAuthModalMode('register');
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-all cursor-pointer text-xs"
                  >
                    Don't have an account? Create Free Account
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Verified Direct Owners</span>
                  <span>•</span>
                  <span>Direct Buyer Inquiries</span>
                  <span>•</span>
                  <span>Zero Brokerage</span>
                </div>
              </div>
            ) : (
              /* Wizard Steps Form */
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
                
                {/* STEP 1: Basic Information */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    {/* Logged-in Verified User Card */}
                    <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center font-bold">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{currentUser.name}</span>
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Owner
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {currentUser.email} • {currentUser.phone || '+91 Active Member'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100/60 px-2.5 py-1 rounded-lg">
                          Logged In ✓
                        </span>
                      </div>
                    </div>

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

          {/* STEP 3: House Photos, Features & Final Preview */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              
              {/* 1. SEPARATE COVER PHOTO UPLOAD SECTION */}
              <div className="bg-slate-50 border border-amber-200/90 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                      <Star className="w-4 h-4 fill-white" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>1. Main Cover Image</span>
                        <span className="text-[10px] text-amber-700 bg-amber-100 font-extrabold px-1.5 py-0.5 rounded">
                          Featured Photo
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        The primary exterior or front facade photo shown on marketplace search cards
                      </p>
                    </div>
                  </div>
                  {formData.coverImage ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Cover Uploaded
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      Cover Required
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  id="cover-photo-upload"
                  accept="image/*"
                  onChange={handleCoverPhotoUpload}
                  className="hidden"
                />

                {!formData.coverImage ? (
                  <label
                    htmlFor="cover-photo-upload"
                    className="border-2 border-dashed border-amber-300 hover:border-amber-500 hover:bg-amber-50/20 rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-700 group-hover:scale-110 flex items-center justify-center transition-transform">
                      <ImagePlus className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-amber-700 block">
                        Click or Drag & Drop Main Cover Photo
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
                        Exterior front view • JPG, PNG, WEBP • 16:9 landscape recommended
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-xl shadow-xs transition-colors mt-1">
                      <Plus className="w-3.5 h-3.5" />
                      Upload Cover Image
                    </span>
                  </label>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-48 bg-slate-900 group">
                    <img
                      src={formData.coverImage}
                      alt="Cover Photo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
                    
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      Main Cover Photo
                    </span>

                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <label
                        htmlFor="cover-photo-upload"
                        className="bg-white/95 hover:bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl shadow-md cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <ImagePlus className="w-3.5 h-3.5" />
                        <span>Replace Cover</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleRemoveCoverPhoto}
                        className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. SEPARATE ADDITIONAL / EXTRA PHOTOS UPLOAD SECTION */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">
                        2. Additional House Photos (Extra Images)
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Living room, Bedrooms, Modular kitchen, Balconies, Bathroom, and Amenities
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                    {formData.extraImages.length} Extra Photo{formData.extraImages.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <input
                  type="file"
                  id="extra-photos-upload"
                  accept="image/*"
                  multiple
                  onChange={handleExtraPhotosUpload}
                  className="hidden"
                />

                <label
                  htmlFor="extra-photos-upload"
                  className="border-2 border-dashed border-brand-300 hover:border-brand-500 hover:bg-white rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 group"
                >
                  <div className="w-9 h-9 rounded-full bg-brand-50 text-brand-600 group-hover:scale-110 flex items-center justify-center transition-transform">
                    <UploadCloud className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-brand-600">
                    Click to Upload Extra House Photos (Select Multiple)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Select 1 or more extra photos • Living, Bedrooms, Kitchen, Amenities
                  </span>
                </label>

                {/* Uploaded Extra Photos Grid */}
                {formData.extraImages.length > 0 && (
                  <div className="mt-3.5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {formData.extraImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-xl overflow-hidden aspect-video sm:aspect-square bg-slate-900 border border-slate-200 group"
                        >
                          <img
                            src={img}
                            alt={`Extra photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Make Cover Button */}
                          <button
                            type="button"
                            onClick={() => handlePromoteToCover(idx)}
                            className="absolute top-1.5 left-1.5 bg-black/80 hover:bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1"
                            title="Make this photo the main cover"
                          >
                            <Star className="w-2.5 h-2.5" />
                            <span>Make Cover</span>
                          </button>

                          {/* Delete Photo Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveExtraPhoto(idx)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
                            title="Remove Extra Photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Custom Property Features & Amenities Manager */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">
                      Add Custom Property Features & Amenities
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Add unique selling points like Terrace Garden, Smart Automation, or Italian Marble
                    </p>
                  </div>
                </div>

                {/* Custom Feature Input */}
                <div className="flex gap-2 mb-3">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Type custom feature (e.g. Private Terrace, Home Theater, Sea View...)"
                      value={customFeatureInput}
                      onChange={(e) => setCustomFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomFeature();
                        }
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddCustomFeature()}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Feature</span>
                  </button>
                </div>

                {/* Quick-Add Popular Suggestions */}
                <div className="mb-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5 tracking-wider">
                    Quick-Add Popular Features:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {popularFeatureSuggestions.map(feat => {
                      const isAdded = formData.amenities.includes(feat);
                      return (
                        <button
                          key={feat}
                          type="button"
                          onClick={() => {
                            if (!isAdded) handleAddCustomFeature(feat);
                            else handleRemoveFeature(feat);
                          }}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all flex items-center gap-1 cursor-pointer ${
                            isAdded
                              ? 'bg-brand-100 text-brand-800 border-brand-300 font-bold'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600'
                          }`}
                        >
                          <span>{isAdded ? '✓' : '+'}</span>
                          <span>{feat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Features Badges */}
                {formData.amenities.length > 0 && (
                  <div className="pt-3 border-t border-slate-200/80">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5 tracking-wider">
                      Selected Features ({formData.amenities.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.amenities.map(feat => (
                        <span
                          key={feat}
                          className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-semibold"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{feat}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(feat)}
                            className="w-3.5 h-3.5 rounded-full hover:bg-emerald-200 flex items-center justify-center text-emerald-700 ml-0.5 cursor-pointer"
                            title="Remove"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Property Description */}
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

              {/* 4. Instant Mini Live Card Preview */}
              <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                    Instant Live Marketplace Preview
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Live Cover Photo & Features
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-700 bg-slate-800 flex items-center justify-center">
                    {formData.coverImage || formData.extraImages?.[0] ? (
                      <>
                        <img
                          src={formData.coverImage || formData.extraImages[0]}
                          alt="Preview Cover"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 bg-black/70 text-[8px] text-white font-bold px-1 rounded">
                          Cover
                        </span>
                      </>
                    ) : (
                      <div className="text-center p-1 text-slate-500">
                        <Camera className="w-5 h-5 mx-auto mb-0.5 opacity-60" />
                        <span className="text-[8px] block">No Photo</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-white truncate">
                      {formData.title || `${formData.bhk || 3} BHK in ${formData.city || 'India'}`}
                    </h4>
                    <p className="text-xs text-slate-300 truncate mt-0.5">
                      {formData.locality || formData.city || 'Prime Location'} • {formData.bhk || 3} BHK • {formData.builtUpArea || 1500} sqft
                    </p>
                    <p className="text-sm font-bold text-sky-400 font-display mt-0.5">
                      {formData.price ? formatIndianCurrency(formData.price) : 'Price on Request'}
                    </p>
                    
                    {/* Feature tags snippet */}
                    {formData.amenities.length > 0 && (
                      <div className="flex gap-1 mt-1 overflow-hidden">
                        {formData.amenities.slice(0, 3).map((a, i) => (
                          <span key={i} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded truncate">
                            {a}
                          </span>
                        ))}
                        {formData.amenities.length > 3 && (
                          <span className="text-[9px] bg-slate-800 text-sky-400 px-1.5 py-0.5 rounded">
                            +{formData.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnail Strip of All Uploaded Photos */}
                {(formData.coverImage || formData.extraImages?.length > 0) && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
                    <span className="text-[10px] text-slate-400 whitespace-nowrap font-medium">Gallery Strip:</span>
                    {formData.coverImage && (
                      <div className="w-10 h-8 rounded-lg overflow-hidden shrink-0 border border-amber-400 ring-1 ring-amber-400 relative">
                        <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 right-0 bg-amber-500 text-[6px] text-white px-0.5 font-bold">★</span>
                      </div>
                    )}
                    {formData.extraImages?.map((img, i) => (
                      <div
                        key={i}
                        className="w-10 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-700 opacity-80"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
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
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
