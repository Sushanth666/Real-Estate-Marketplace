import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Heart, 
  Scale, 
  Share2, 
  ShieldCheck, 
  BedDouble, 
  Bath, 
  Maximize2, 
  Compass, 
  Layers, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Check, 
  X, 
  Download, 
  Sparkles,
  ChevronRight,
  Trash2,
  Key,
  CreditCard,
  Building2,
  Lock
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatIndianCurrency, formatIndianNumber, calculateEMI } from '../../utils/formatters';
import { Badge } from '../common/Badge';
import { PropertyCard } from '../common/PropertyCard';

export function PropertyDetailView() {
  const { 
    currentProperty, 
    properties, 
    navigateTo, 
    isInWishlist, 
    toggleWishlist, 
    isInCompare, 
    toggleCompare,
    setScheduleModalProp,
    openTransactionModal,
    deleteProperty,
    currentUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    setPendingViewPropertyId,
    showToast
  } = useMarketplace();

  const isCustomProperty = currentProperty?.isCustom || currentProperty?.agentName?.includes('Owner') || currentProperty?.id?.startsWith('custom-prop-') || currentProperty?.id?.startsWith('prop-17');

  const [activePhotoModal, setActivePhotoModal] = useState(false);
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0);
  const [activeFloorPlan, setActiveFloorPlan] = useState('3bhk');

  // EMI state for this specific property
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTenure, setLoanTenure] = useState(20);
  const [loanInterestRate, setLoanInterestRate] = useState(8.5);

  useEffect(() => {
    const el = document.getElementById('main-scroll-container');
    if (el) el.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [currentProperty?.id]);

  if (!currentProperty) return null;

  // COMPULSORY LOGIN GUARD: Only logged-in members can access full property details
  if (!currentUser) {
    const previewImage = currentProperty.image || currentProperty.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
    return (
      <div className="bg-slate-50 min-h-screen pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          {/* Back button */}
          <div className="mb-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigateTo('listings')}
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-700 transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:border-brand-300 group-hover:bg-brand-50 transition-colors shadow-xs">
                <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-brand-600" />
              </div>
              <span>Back to Listings</span>
            </motion.button>
          </div>

          {/* Locked Property Preview Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
            {/* Blurred Image Header Preview */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={previewImage}
                alt={currentProperty.title}
                className="w-full h-full object-cover filter blur-xs scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-950/40 backdrop-blur-xs flex flex-col justify-end p-6 sm:p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-white px-2.5 py-1 rounded-md">
                    {currentProperty.purpose === 'rent' ? 'For Rent' : 'For Sale'}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {currentProperty.propertyType} • {currentProperty.city}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold font-display line-clamp-1">
                  {currentProperty.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                  {currentProperty.locality}, {currentProperty.city}
                </p>
              </div>
            </div>

            {/* Lock Authentication Content */}
            <div className="p-6 sm:p-10 text-center flex flex-col items-center">
              <div className="w-18 h-18 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 shadow-inner mb-4">
                <Lock className="w-9 h-9" />
              </div>

              <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1 rounded-full mb-2">
                Compulsory Login Required
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-2">
                Sign In to Access Full Property Details
              </h2>

              <p className="text-sm text-slate-600 max-w-lg leading-relaxed mb-6">
                To protect direct owner & builder privacy and provide verified buyer access, the complete details including comprehensive pricing, floor plans, verified contact numbers, and site visits require login.
              </p>

              {/* Locked Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mb-8 text-left">
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Architectural Floor Plans</p>
                    <p className="text-[11px] text-slate-500">2D/3D layouts & carpet breakdown</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Verified Owner & Agent Contacts</p>
                    <p className="text-[11px] text-slate-500">Direct phone & WhatsApp numbers</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Complete Price & EMI Breakdown</p>
                    <p className="text-[11px] text-slate-500">Stamp duty, maintenance & GST</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Direct Booking & Site Visits</p>
                    <p className="text-[11px] text-slate-500">Proceed to Buy & Rent online</p>
                  </div>
                </div>
              </div>

              {/* Login Action Buttons */}
              <div className="w-full max-w-md space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setPendingViewPropertyId(currentProperty.id);
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Lock className="w-4 h-4" /> Sign In to Access Full Details
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPendingViewPropertyId(currentProperty.id);
                    setAuthModalMode('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-all cursor-pointer text-xs"
                >
                  New to BharatNivas? Create Free Account
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Verified Listings</span>
                <span>•</span>
                <span>Zero Spam</span>
                <span>•</span>
                <span>Direct Ownership</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(currentProperty.id);
  const isCompared = isInCompare(currentProperty.id);

  const images = currentProperty.images || [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  ];

  // Specific EMI calculation
  const loanPrincipal = currentProperty.price * (1 - downPaymentPercent / 100);
  const monthlyEMI = currentProperty.purpose === 'buy'
    ? calculateEMI(loanPrincipal, loanInterestRate, loanTenure)
    : null;

  // Similar properties
  const similarProperties = properties
    .filter(p => p.id !== currentProperty.id && (p.city === currentProperty.city || p.propertyType === currentProperty.propertyType))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard! 📋', 'success');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* Top Navigation & Action Bar - Perfectly Aligned */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigateTo('listings')}
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-700 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:border-brand-300 group-hover:bg-brand-50 transition-colors shadow-xs">
              <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-brand-600" />
            </div>
            <span>Back to Listings</span>
          </motion.button>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Share</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggleCompare(currentProperty.id)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                isCompared
                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Scale className={`w-3.5 h-3.5 ${isCompared ? 'text-white' : 'text-slate-500'}`} />
              <span>{isCompared ? 'In Compare' : 'Compare'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggleWishlist(currentProperty.id)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'text-white fill-white' : 'text-slate-500'}`} />
              <span>{isWishlisted ? 'Saved' : 'Save'}</span>
            </motion.button>

            {isCustomProperty && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  deleteProperty(currentProperty.id);
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                title="Delete this property listing"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Delete Listing</span>
              </motion.button>
            )}
          </div>
        </div>

        
        {/* Title & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {currentProperty.reraId && (
                <Badge variant="rera">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  <span>RERA: {currentProperty.reraId}</span>
                </Badge>
              )}
              <Badge variant="luxury">{currentProperty.propertyType}</Badge>
              <Badge variant="ready">{currentProperty.possession}</Badge>
              <Badge variant="default">0% Brokerage</Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
              {currentProperty.title}
            </h1>

            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
              <span>{currentProperty.address || `${currentProperty.locality}, ${currentProperty.city}`}</span>
            </p>
          </div>

          {/* Pricing Box */}
          <div className="text-left lg:text-right bg-white lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-none border-slate-200">
            <div className="text-3xl sm:text-4xl font-black font-display text-slate-900">
              {formatIndianCurrency(currentProperty.price)}
              {currentProperty.purpose === 'rent' && (
                <span className="text-sm text-slate-500 font-medium"> / month</span>
              )}
            </div>
            {currentProperty.pricePerSqft && (
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                ₹{formatIndianNumber(currentProperty.pricePerSqft)} per sq.ft • All Inclusive Indicative
              </p>
            )}
            {monthlyEMI && (
              <p className="text-xs text-brand-700 font-bold mt-1">
                Estimated EMI: {formatIndianCurrency(monthlyEMI)}/month
              </p>
            )}
          </div>
        </div>

        {/* Mosaic Image Gallery (1 large + 4 grid) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 rounded-3xl overflow-hidden mb-12 shadow-sm">
          
          {/* Main Large Photo */}
          <div 
            onClick={() => {
              setModalPhotoIndex(0);
              setActivePhotoModal(true);
            }}
            className="md:col-span-2 h-80 sm:h-[450px] relative cursor-pointer group overflow-hidden"
          >
            <img
              src={images[0]}
              alt={currentProperty.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl">
              Main Exterior View
            </span>
          </div>

          {/* 4 Smaller Photos */}
          <div className="md:col-span-2 grid grid-cols-2 gap-3.5 h-80 sm:h-[450px]">
            {images.slice(1, 5).map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setModalPhotoIndex(idx + 1);
                  setActivePhotoModal(true);
                }}
                className="relative cursor-pointer group overflow-hidden h-full"
              >
                <img
                  src={imgUrl}
                  alt={`Photo ${idx + 2}`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                
                {/* View All Overlay on the 4th photo */}
                {idx === 3 && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white p-2 text-center">
                    <Sparkles className="w-6 h-6 text-amber-400 mb-1" />
                    <span className="text-xs sm:text-sm font-bold">View All Photos</span>
                    <span className="text-[11px] text-slate-300">({images.length} High-Res)</span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Main Content Layout: Left 8 cols, Right 4 cols (Agent & Visit card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Key Specifications Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <h2 className="text-xl font-bold font-display text-slate-900 mb-6">
                Property Specifications & Dimensions
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                
                <motion.div whileHover={{ y: -3, scale: 1.02 }} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 shadow-xs">
                    <BedDouble className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Bedrooms</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.bhk} BHK</span>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3, scale: 1.02 }} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Bath className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Bathrooms</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.bathrooms} Luxury Baths</span>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3, scale: 1.02 }} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Super Built-up</span>
                    <span className="text-sm font-bold text-slate-900">{formatIndianNumber(currentProperty.builtUpArea)} sq.ft</span>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3, scale: 1.02 }} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Carpet Area</span>
                    <span className="text-sm font-bold text-slate-900">{formatIndianNumber(currentProperty.carpetArea)} sq.ft</span>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3, scale: 1.02 }} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Facing Direction</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.facing || 'East Facing'}</span>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3, scale: 1.02 }} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Floor Level</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.floor || 'Higher Floor'}</span>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3, scale: 1.02 }} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Age of Property</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.ageOfProperty || 'Under 2 Years'}</span>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3, scale: 1.02 }} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Furnishing</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.furnishing || 'Semi-Furnished'}</span>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* 2. Description & Architectural Story */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <h2 className="text-xl font-bold font-display text-slate-900 mb-4">
                About this Residence
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                {currentProperty.description}
              </p>

              {/* Highlights Bullet List */}
              {currentProperty.highlights && (
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">
                    Key Architectural Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentProperty.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Amenities Checklist */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <h2 className="text-xl font-bold font-display text-slate-900 mb-6">
                Resort-Style Amenities & Infrastructure
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(currentProperty.amenities || []).map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-medium text-slate-800"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Floor Plans Interactive Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold font-display text-slate-900">
                    Sanctioned Architectural Floor Plans
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    RERA Approved 2D/3D layouts with optimized cross-ventilation.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveFloorPlan('3bhk')}
                    className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      activeFloorPlan === '3bhk'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {activeFloorPlan === '3bhk' && (
                      <motion.div
                        layoutId="activeFloorPlanPill"
                        className="absolute inset-0 bg-slate-900 rounded-xl shadow-xs"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{currentProperty.bhk} BHK Layout</span>
                  </button>
                  <button
                    onClick={() => setActiveFloorPlan('penthouse')}
                    className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      activeFloorPlan === 'penthouse'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {activeFloorPlan === 'penthouse' && (
                      <motion.div
                        layoutId="activeFloorPlanPill"
                        className="absolute inset-0 bg-slate-900 rounded-xl shadow-xs"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">Duplex / Terrace Level</span>
                  </button>
                </div>
              </div>

              {/* Floor Plan Diagram Canvas with Animated Blueprint Cross-Fade */}
              <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[320px] border border-slate-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFloorPlan}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-md border-2 border-dashed border-brand-500/40 rounded-xl p-6 bg-slate-950/60 backdrop-blur-md"
                  >
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4 text-xs font-bold text-sky-400">
                      <span>TYPE: {activeFloorPlan === '3bhk' ? `${currentProperty.bhk} BHK SIGNATURE` : 'UPPER SKY LEVEL'}</span>
                      <span>CARPET: {formatIndianNumber(activeFloorPlan === '3bhk' ? currentProperty.carpetArea : Math.round(currentProperty.carpetArea * 1.35))} SQ.FT</span>
                    </div>

                    {/* Architectural Blueprint representation */}
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 font-mono">
                      <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                        {activeFloorPlan === '3bhk' ? 'MASTER SUITE' : 'PENTHOUSE SUITE'}<br /><span className="text-white">{activeFloorPlan === '3bhk' ? "16' x 14'" : "20' x 16'"}</span>
                      </div>
                      <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                        {activeFloorPlan === '3bhk' ? 'LIVING / DINING' : 'OPEN SKY LOUNGE'}<br /><span className="text-white">{activeFloorPlan === '3bhk' ? "24' x 18'" : "28' x 20'"}</span>
                      </div>
                      <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                        {activeFloorPlan === '3bhk' ? 'BALCONY DECK' : 'INFINITY JACUZZI'}<br /><span className="text-sky-400">{activeFloorPlan === '3bhk' ? "18' x 8'" : "22' x 10'"}</span>
                      </div>
                      <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                        {activeFloorPlan === '3bhk' ? 'BEDROOM 2' : 'SKY GAZEBO'}<br /><span className="text-white">{activeFloorPlan === '3bhk' ? "14' x 12'" : "16' x 14'"}</span>
                      </div>
                      <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                        {activeFloorPlan === '3bhk' ? 'MODULAR KITCHEN' : 'BAR / PANTRY'}<br /><span className="text-white">{activeFloorPlan === '3bhk' ? "12' x 10'" : "14' x 10'"}</span>
                      </div>
                      <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                        {activeFloorPlan === '3bhk' ? 'POOJA / UTILITY' : 'TERRACE DECK'}<br /><span className="text-amber-400">{activeFloorPlan === '3bhk' ? "8' x 6'" : "24' x 12'"}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => showToast('Sanctioned PDF floor plans downloaded! 📥', 'success')}
                    className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CAD Floorplan (PDF)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 5. Locality & Nearby Landmarks */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <h2 className="text-xl font-bold font-display text-slate-900 mb-2">
                Locality & Neighborhood Connectivity
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Commute times to key metro stations, international airports, hospitals, and tech parks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(currentProperty.landmarks || [
                  { name: 'Nearest Metro Station', distance: '600 m' },
                  { name: 'International Airport', distance: '12 km' },
                  { name: 'Top International School', distance: '1.5 km' },
                  { name: 'Multi-Speciality Hospital', distance: '2.0 km' }
                ]).map((landmark, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm"
                  >
                    <span className="font-medium text-slate-800">{landmark.name}</span>
                    <span className="font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg">
                      {landmark.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Verified Advisor & Visit Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 space-y-6">
              
              {/* Schedule Visit & Contact Advisor Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md">
                <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100 mb-5">
                  <img
                    src={currentProperty.agentPhoto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'}
                    alt={currentProperty.agentName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-500/20 shadow-xs"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                      RERA Certified Advisor
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">
                      {currentProperty.agentName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Specialist • {currentProperty.city} Hub
                    </p>
                  </div>
                </div>

                {/* Direct Actions */}
                <div className="space-y-3 mb-6">
                  {/* Primary CTA: Proceed to Buy or Proceed to Rent */}
                  {currentProperty.purpose === 'rent' ? (
                    <div className="space-y-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openTransactionModal(currentProperty, 'rent')}
                        className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold py-3.5 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-700/25 cursor-pointer"
                      >
                        <Key className="w-4 h-4" />
                        <span>Proceed to Rent Property</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openTransactionModal(currentProperty, 'buy')}
                        className="w-full bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Building2 className="w-3.5 h-3.5 text-brand-600" />
                        <span>Proceed to Buy / Purchase Inquiry</span>
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openTransactionModal(currentProperty, 'buy')}
                        className="w-full bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-700 hover:from-brand-500 hover:to-indigo-600 text-white font-extrabold py-3.5 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-700/25 cursor-pointer"
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Proceed to Buy Property</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openTransactionModal(currentProperty, 'rent')}
                        className="w-full bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Key className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Proceed to Rent / Lease Inquiry</span>
                      </motion.button>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setScheduleModalProp(currentProperty)}
                    className="w-full bg-slate-900 hover:bg-brand-700 text-white font-bold py-3.5 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Private Site Visit</span>
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/919820144521?text=Hi, I am interested in ${encodeURIComponent(currentProperty.title)} on BharatNivas.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`tel:${currentProperty.agentPhone || '+919820144521'}`}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-brand-600" />
                    <span>Call Advisor ({currentProperty.agentPhone || '+91 98201 44521'})</span>
                  </motion.a>
                </div>

                {/* Developer Stamp */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Developer</span>
                    <span className="font-bold text-slate-900">{currentProperty.builder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">RERA Registration</span>
                    <span className="font-semibold text-brand-700 truncate max-w-[150px]">{currentProperty.reraId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Brokerage</span>
                    <span className="font-bold text-brand-600">0% (Zero)</span>
                  </div>
                </div>
              </div>

              {/* Mini EMI Breakdown Box */}
              {monthlyEMI && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
                  <h4 className="font-bold text-slate-900 text-sm mb-3">
                    Monthly Loan Payment
                  </h4>
                  <div className="text-2xl font-bold font-display text-brand-700 mb-2">
                    {formatIndianCurrency(monthlyEMI)} / mo
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Assumes 20% down payment ({formatIndianCurrency(currentProperty.price * 0.2)}) @ 8.5% p.a. for 20 years.
                  </p>
                  <button
                    onClick={() => {
                      navigateTo('home');
                    }}
                    className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
                  >
                    <span>Customize EMI with bank partners</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Similar Properties Showcase */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-8">
              Similar Verified Residences in {currentProperty.city}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* High-Resolution Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhotoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md"
          >
            <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
              <div>
                <h4 className="font-bold text-base sm:text-lg">{currentProperty.title}</h4>
                <p className="text-xs text-slate-400">Photo {modalPhotoIndex + 1} of {images.length}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActivePhotoModal(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <motion.div 
              key={modalPhotoIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative flex-1 flex items-center justify-center my-4 max-w-5xl mx-auto w-full"
            >
              <img
                src={images[modalPhotoIndex]}
                alt="Enlarged photo"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
                }}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 justify-center overflow-x-auto py-2">
              {images.map((img, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setModalPhotoIndex(i)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    modalPhotoIndex === i ? 'border-brand-500 scale-105 shadow-md' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
