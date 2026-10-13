import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  MapPin, 
  Home, 
  IndianRupee, 
  ShieldCheck, 
  Check, 
  X
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatIndianCurrency } from '../../utils/formatters';
import { indianCities } from '../../data/citiesData';

export function FilterSidebar({ isMobile = false, onCloseMobile = () => {} }) {
  const { filters, updateFilter, resetFilters } = useMarketplace();

  const propertyTypes = ['Apartment', 'Luxury Villa', 'Individual House', 'Penthouse', 'Duplex', 'Builder Floor'];
  const allAmenities = [
    'Swimming Pool',
    'Clubhouse',
    '24/7 Security',
    'Gymnasium',
    'EV Charging',
    'Private Elevator',
    'Vastu Compliant',
    'Power Backup',
    'Tennis Court',
    'Landscaped Gardens'
  ];

  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities || [];
    if (current.includes(amenity)) {
      updateFilter('amenities', current.filter(a => a !== amenity));
    } else {
      updateFilter('amenities', [...current, amenity]);
    }
  };

  return (
    <aside className={`bg-white rounded-3xl border border-slate-200/90 p-6 space-y-6 shadow-xs ${
      isMobile ? 'h-full overflow-y-auto' : ''
    }`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-600" />
          <h3 className="font-bold text-slate-900 text-base">Filters</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-slate-500 hover:text-brand-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          {isMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Purpose (Buy vs Rent) */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Listing Type
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'all', label: 'All' },
            { id: 'buy', label: 'Buy' },
            { id: 'rent', label: 'Rent' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => updateFilter('purpose', item.id)}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                filters.purpose === item.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. City */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand-600" />
          <span>City / Metro</span>
        </label>
        <select
          value={filters.selectedCity}
          onChange={(e) => updateFilter('selectedCity', e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Top Indian Metros</option>
          {indianCities.map(city => (
            <option key={city.id} value={city.name}>{city.name} ({city.state})</option>
          ))}
        </select>
      </div>

      {/* 3. BHK Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Bedrooms (BHK)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {['all', '1', '2', '3', '4', '5+'].map(bhk => (
            <button
              key={bhk}
              onClick={() => updateFilter('bhk', bhk)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filters.bhk === bhk
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {bhk === 'all' ? 'Any' : `${bhk} BHK`}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Property Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-brand-600" />
          <span>Property Type</span>
        </label>
        <div className="space-y-1.5">
          <button
            onClick={() => updateFilter('propertyType', 'all')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              filters.propertyType === 'all'
                ? 'bg-brand-50 text-brand-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Property Types
          </button>
          {propertyTypes.map(type => (
            <button
              key={type}
              onClick={() => updateFilter('propertyType', type)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                filters.propertyType === type
                  ? 'bg-brand-50 text-brand-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Budget Range in INR */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5 text-brand-600" />
            <span>Max Budget (₹)</span>
          </label>
          <span className="text-xs font-bold text-brand-700">
            {formatIndianCurrency(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="5000000"
          max="350000000"
          step="5000000"
          value={filters.maxPrice}
          onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>₹50 Lakh</span>
          <span>₹15 Cr</span>
          <span>₹35+ Cr</span>
        </div>
      </div>

      {/* 6. Possession Status */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Possession Status
        </label>
        <select
          value={filters.possession}
          onChange={(e) => updateFilter('possession', e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">Any Possession</option>
          <option value="Ready to Move">Ready to Move</option>
          <option value="Under Construction">Under Construction</option>
          <option value="New Launch">New Launch</option>
        </select>
      </div>

      {/* 7. Verified Only Toggle */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span className="text-xs font-bold text-slate-800">
              RERA Verified Only
            </span>
          </div>
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 accent-brand-600 cursor-pointer"
          >
          </input>
        </label>
      </div>

      {/* 8. Amenities Checklist */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Amenities
        </label>
        <div className="space-y-2">
          {allAmenities.slice(0, 7).map(amenity => {
            const isChecked = (filters.amenities || []).includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none"
              >
                <div
                  onClick={() => handleAmenityToggle(amenity)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-brand-600 border-brand-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3" />}
                </div>
                <span onClick={() => handleAmenityToggle(amenity)}>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
