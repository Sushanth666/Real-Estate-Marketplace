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
  ExternalLink,
  Info
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
    showToast
  } = useMarketplace();

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
      
      {/* Top Navigation & Breadcrumb */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigateTo('listings')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-brand-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Listings</span>
          </motion.button>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleCompare(currentProperty.id)}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCompared ? 'In Compare' : 'Compare'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleWishlist(currentProperty.id)}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isWishlisted ? 'Saved' : 'Save'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
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
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                    <BedDouble className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Bedrooms</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.bhk} BHK</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Bath className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Bathrooms</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.bathrooms} Luxury Baths</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Super Built-up</span>
                    <span className="text-sm font-bold text-slate-900">{formatIndianNumber(currentProperty.builtUpArea)} sq.ft</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Carpet Area</span>
                    <span className="text-sm font-bold text-slate-900">{formatIndianNumber(currentProperty.carpetArea)} sq.ft</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Facing Direction</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.facing || 'East Facing'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Floor Level</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.floor || 'Higher Floor'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Age of Property</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.ageOfProperty || 'Under 2 Years'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Furnishing</span>
                    <span className="text-sm font-bold text-slate-900">{currentProperty.furnishing || 'Semi-Furnished'}</span>
                  </div>
                </div>

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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFloorPlan('3bhk')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeFloorPlan === '3bhk'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {currentProperty.bhk} BHK Layout
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFloorPlan('penthouse')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeFloorPlan === 'penthouse'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Duplex / Terrace Level
                  </motion.button>
                </div>
              </div>

              {/* Floor Plan Diagram Canvas */}
              <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[320px] border border-slate-800">
                <div className="w-full max-w-md border-2 border-dashed border-brand-500/40 rounded-xl p-6 bg-slate-950/60 backdrop-blur-md">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4 text-xs font-bold text-sky-400">
                    <span>TYPE: {activeFloorPlan === '3bhk' ? `${currentProperty.bhk} BHK SIGNATURE` : 'UPPER SKY LEVEL'}</span>
                    <span>CARPET: {formatIndianNumber(currentProperty.carpetArea)} SQ.FT</span>
                  </div>

                  {/* Architectural Blueprint representation */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 font-mono">
                    <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                      MASTER SUITE<br /><span className="text-white">16' x 14'</span>
                    </div>
                    <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                      LIVING / DINING<br /><span className="text-white">24' x 18'</span>
                    </div>
                    <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                      BALCONY DECK<br /><span className="text-sky-400">18' x 8'</span>
                    </div>
                    <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                      BEDROOM 2<br /><span className="text-white">14' x 12'</span>
                    </div>
                    <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                      MODULAR KITCHEN<br /><span className="text-white">12' x 10'</span>
                    </div>
                    <div className="border border-slate-800 p-3 rounded-lg bg-slate-900">
                      POOJA / UTILITY<br /><span className="text-amber-400">8' x 6'</span>
                    </div>
                  </div>
                </div>

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
