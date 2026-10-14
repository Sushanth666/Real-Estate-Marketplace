import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  Scale, 
  Check, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatIndianCurrency, formatIndianNumber, calculateEMI } from '../../utils/formatters';

export function PropertyCard({ property, layout = 'grid' }) {
  const { 
    isInWishlist, 
    toggleWishlist, 
    isInCompare, 
    toggleCompare, 
    viewPropertyDetail,
    setScheduleModalProp
  } = useMarketplace();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const isWishlisted = isInWishlist(property.id);
  const isCompared = isInCompare(property.id);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'];

  const [imgSrc, setImgSrc] = useState(images[activeImageIndex]);

  useEffect(() => {
    setImgSrc(images[activeImageIndex]);
  }, [activeImageIndex, images]);

  const handleImageError = () => {
    const nextIdx = (activeImageIndex + 1) % images.length;
    if (images[nextIdx] && images[nextIdx] !== imgSrc) {
      setImgSrc(images[nextIdx]);
    } else {
      setImgSrc('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80');
    }
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Gentle 3D perspective tilt
    setRotateX(((y - centerY) / centerY) * -4.5);
    setRotateY(((x - centerX) / centerX) * 4.5);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const emiMonthly = property.purpose === 'buy' 
    ? calculateEMI(property.price * 0.8, 8.5, 20) 
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateX,
        rotateY,
        transition: { type: 'spring', damping: 20, stiffness: 220 }
      }}
      exit={{ opacity: 0, scale: 0.96 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className={`group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-brand-300 transition-all duration-300 overflow-hidden flex glow-card ${
        layout === 'list' ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      {/* Property Image Container */}
      <div className={`relative overflow-hidden shimmer-wrapper ${
        layout === 'list' ? 'md:w-5/12 h-64 md:h-auto min-h-[260px]' : 'w-full h-64'
      }`}>
        <img
          src={imgSrc || images[0]}
          alt={property.title}
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 items-center z-10">
          {property.reraId && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-md bg-slate-950/85 text-sky-300 border border-sky-400/40 shadow-lg shadow-sky-950/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
              </span>
              <span>RERA Verified</span>
            </span>
          )}
          {property.featured && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-md bg-gradient-to-r from-amber-950/90 to-amber-900/90 text-amber-300 border border-amber-400/50 shadow-lg shadow-amber-950/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300/40 animate-pulse" />
              <span>Signature</span>
            </span>
          )}
        </div>

        {/* Top Right Quick Actions (Wishlist & Compare) */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
          {/* Compare Button */}
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(property.id);
            }}
            title={isCompared ? "Remove from comparison" : "Add to compare"}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
              isCompared
                ? 'bg-brand-600 text-white ring-2 ring-brand-400'
                : 'bg-black/45 hover:bg-black/70 text-white'
            }`}
          >
            {isCompared ? <Check className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
          </motion.button>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(property.id);
            }}
            title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
              isWishlisted
                ? 'bg-rose-500 text-white ring-2 ring-rose-300 shadow-rose-500/30'
                : 'bg-black/45 hover:bg-black/70 text-white'
            }`}
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.35, 1], rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.div>
          </motion.button>
        </div>

        {/* Bottom Image Overlay Details */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
          <div className="text-xs font-medium bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
            {property.propertyType} • {property.possession}
          </div>

          {/* Multiple Image Dots */}
          {images.length > 1 && (
            <div className="flex gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
              {images.slice(0, 4).map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeImageIndex === idx ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className={`p-5 flex flex-col justify-between flex-1 ${
        layout === 'list' ? 'md:p-6' : ''
      }`}>
        <div>
          {/* Price & EMI Section */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <div>
              <span className="text-2xl font-bold font-display text-slate-900 tracking-tight">
                {formatIndianCurrency(property.price)}
              </span>
              {property.purpose === 'rent' && (
                <span className="text-xs text-slate-500 font-medium ml-1">/ month</span>
              )}
            </div>
            {property.pricePerSqft && (
              <span className="text-xs text-slate-500 font-medium">
                ₹{formatIndianNumber(property.pricePerSqft)}/sqft
              </span>
            )}
          </div>

          {/* Estimated EMI */}
          {emiMonthly && (
            <p className="text-xs text-brand-700 font-medium mb-3 flex items-center gap-1">
              <span>EMI from {formatIndianCurrency(emiMonthly)}/mo</span>
              <span className="text-slate-400 font-normal">• 8.5% p.a.</span>
            </p>
          )}

          {/* Title & Locality */}
          <h3 
            onClick={() => viewPropertyDetail(property.id)}
            className="font-semibold text-slate-900 text-lg group-hover:text-brand-700 transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {property.title}
          </h3>

          <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-4 line-clamp-1">
            <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
            <span>{property.locality}, {property.city}</span>
          </p>

          {/* Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-slate-50/90 rounded-2xl border border-slate-100 text-slate-700 text-xs mb-4">
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-slate-500 shrink-0" />
              <div>
                <span className="font-semibold block text-slate-900">{property.bhk} BHK</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Bedrooms</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-x border-slate-200/80 px-2">
              <Bath className="w-4 h-4 text-slate-500 shrink-0" />
              <div>
                <span className="font-semibold block text-slate-900">{property.bathrooms}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Baths</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-1">
              <Maximize2 className="w-4 h-4 text-slate-500 shrink-0" />
              <div>
                <span className="font-semibold block text-slate-900">{formatIndianNumber(property.builtUpArea)}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Sq.Ft</span>
              </div>
            </div>
          </div>

          {/* Builder & Highlights summary (in list layout) */}
          {layout === 'list' && property.description && (
            <p className="text-xs text-slate-600 line-clamp-2 mb-4">
              {property.description}
            </p>
          )}
        </div>

        {/* Card Footer: Builder & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
              Developer
            </span>
            <span className="text-xs font-semibold text-slate-800 truncate block">
              {property.builder || 'Verified Private Owner'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScheduleModalProp(property)}
              className="text-xs font-semibold text-brand-700 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Visit</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => viewPropertyDetail(property.id)}
              className="text-xs font-semibold text-white bg-slate-900 hover:bg-brand-700 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm hover:shadow-brand-600/30 cursor-pointer"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
