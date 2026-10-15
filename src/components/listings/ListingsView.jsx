import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { PropertyCard } from '../common/PropertyCard';
import { FilterSidebar } from './FilterSidebar';

export function ListingsView() {
  const { 
    filteredProperties, 
    filters, 
    updateFilter, 
    resetFilters 
  } = useMarketplace();

  const [layout, setLayout] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  // Active filter count
  const activeFiltersList = [];
  if (filters.selectedCity !== 'all') activeFiltersList.push({ key: 'selectedCity', val: filters.selectedCity, label: `City: ${filters.selectedCity}` });
  if (filters.purpose !== 'all') activeFiltersList.push({ key: 'purpose', val: 'all', label: `Purpose: ${filters.purpose}` });
  if (filters.propertyType !== 'all') activeFiltersList.push({ key: 'propertyType', val: 'all', label: `Type: ${filters.propertyType}` });
  if (filters.bhk !== 'all') activeFiltersList.push({ key: 'bhk', val: 'all', label: `${filters.bhk} BHK` });
  if (filters.verifiedOnly) activeFiltersList.push({ key: 'verifiedOnly', val: false, label: 'RERA Verified' });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-slate-700">Properties in India</span>
            {filters.selectedCity !== 'all' && (
              <>
                <span>/</span>
                <span className="text-brand-700">{filters.selectedCity}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            {filters.selectedCity !== 'all' 
              ? `Luxury Real Estate in ${filters.selectedCity}` 
              : 'Explore Verified Properties Across India'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse through RERA-certified apartments, penthouses, and gated villas with instant site visit scheduling.
          </p>
        </div>

        {/* Search & Control Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Search Input Bar */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city, locality, builder or title..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
            {filters.searchTerm && (
              <button
                onClick={() => updateFilter('searchTerm', '')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Filter Button (mobile), Sort Dropdown & Layout Toggles */}
          <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-3 flex-wrap">
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              <span>Filters {activeFiltersList.length > 0 && `(${activeFiltersList.length})`}</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                <option value="featured">Featured / Signature First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="area-desc">Built-up Area (Sq.Ft)</option>
              </select>
            </div>

            {/* Layout Switch (Grid / List) with animated layoutId pill */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
              <button
                onClick={() => setLayout('grid')}
                className={`relative p-1.5 rounded-lg transition-colors cursor-pointer ${
                  layout === 'grid' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Grid layout"
              >
                {layout === 'grid' && (
                  <motion.div
                    layoutId="listingsLayoutPill"
                    className="absolute inset-0 bg-white rounded-lg shadow-xs"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <LayoutGrid className="w-4 h-4 relative z-10" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`relative p-1.5 rounded-lg transition-colors cursor-pointer ${
                  layout === 'list' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="List layout"
              >
                {layout === 'list' && (
                  <motion.div
                    layoutId="listingsLayoutPill"
                    className="absolute inset-0 bg-white rounded-lg shadow-xs"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <List className="w-4 h-4 relative z-10" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Tags with AnimatePresence */}
        {activeFiltersList.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-xs text-slate-400 font-semibold">Active:</span>
            <AnimatePresence>
              {activeFiltersList.map((item) => (
                <motion.span
                  key={item.label}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-800 border border-brand-200/80 px-3 py-1 rounded-full text-xs font-semibold shadow-2xs"
                >
                  <span>{item.label}</span>
                  <button
                    onClick={() => updateFilter(item.key, item.val)}
                    className="hover:text-brand-950 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
            <button
              onClick={resetFilters}
              className="text-xs text-slate-500 hover:text-rose-600 font-semibold underline underline-offset-2 ml-1 cursor-pointer transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main Layout Grid (Sidebar + Listings) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar />
          </div>

          {/* Right Listings Container */}
          <div className="lg:col-span-3">
            
            {/* Header Result Count */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-5 px-1">
              <span>
                Showing <strong>{filteredProperties.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, filteredProperties.length)}</strong> of <strong>{filteredProperties.length}</strong> homes
              </span>
              <span>100% Verified RERA Data</span>
            </div>

            {/* Properties List / Grid */}
            {filteredProperties.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-4">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 mb-2">
                  No Properties Match Your Search
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                  We couldn't find any homes matching your current filter criteria. Try expanding your price range, selecting another city, or resetting filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <motion.div 
                layout 
                className={`grid gap-6 ${
                  layout === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1'
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {paginatedProperties.map(property => (
                    <motion.div
                      key={property.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                    >
                      <PropertyCard property={property} layout={layout} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(p => Math.max(p - 1, 1));
                    const sc = document.getElementById('main-scroll-container');
                    if (sc) sc.scrollTo({ top: 0, behavior: 'smooth' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {(() => {
                  const pages = [];
                  if (totalPages <= 7) {
                    for (let i = 1; i <= totalPages; i++) pages.push(i);
                  } else if (currentPage <= 4) {
                    pages.push(1, 2, 3, 4, 5, '...', totalPages);
                  } else if (currentPage >= totalPages - 3) {
                    pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                  } else {
                    pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                  }

                  return pages.map((page, idx) => {
                    if (page === '...') {
                      return (
                        <span key={`dots-${idx}`} className="w-8 h-10 flex items-center justify-center text-slate-400 font-bold">
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          const sc = document.getElementById('main-scroll-container');
                          if (sc) sc.scrollTo({ top: 0, behavior: 'smooth' });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                          currentPage === page
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  });
                })()}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(p => Math.min(p + 1, totalPages));
                    const sc = document.getElementById('main-scroll-container');
                    if (sc) sc.scrollTo({ top: 0, behavior: 'smooth' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filters Slide-in Modal */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl z-10"
            >
              <FilterSidebar 
                isMobile={true} 
                onCloseMobile={() => setMobileFilterOpen(false)} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
