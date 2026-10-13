import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProperties } from '../data/propertiesData';
import { realEstateAgents } from '../data/agentsData';

const MarketplaceContext = createContext();

const WISHLIST_STORAGE_KEY = 'bharatnivas_wishlist';
const CUSTOM_PROPERTIES_KEY = 'bharatnivas_custom_props';
const USER_STORAGE_KEY = 'bharatnivas_user';

export function MarketplaceProvider({ children }) {
  // Properties state (combines default + user-submitted)
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_PROPERTIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...initialProperties];
      }
    } catch (e) {
      console.error(e);
    }
    return initialProperties;
  });

  // Wishlist state (persisted)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['prop-tn-1', 'prop-tn-2'];
    } catch (e) {
      return ['prop-tn-1', 'prop-tn-2'];
    }
  });

  // Compare state (up to 4 items)
  const [compareList, setCompareList] = useState(['prop-tn-1', 'prop-tn-2']);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Navigation & View state
  // views: 'home' | 'listings' | 'detail' | 'agents' | 'wishlist' | 'compare'
  const [currentView, setCurrentView] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'
  const [isPostPropertyOpen, setIsPostPropertyOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [scheduleModalProp, setScheduleModalProp] = useState(null);
  const [selectedAgentModal, setSelectedAgentModal] = useState(null);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Sync Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Sync User to LocalStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Filters State
  const defaultFilters = {
    searchTerm: '',
    selectedCity: 'all',
    purpose: 'all', // 'all', 'buy', 'rent'
    propertyType: 'all',
    bhk: 'all',
    minPrice: 0,
    maxPrice: 350000000,
    possession: 'all',
    verifiedOnly: false,
    furnishing: 'all',
    amenities: [],
    sortBy: 'featured' // 'featured', 'price-asc', 'price-desc', 'rating', 'area-desc'
  };

  const [filters, setFilters] = useState(defaultFilters);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Wishlist Actions
  const toggleWishlist = (propertyId) => {
    setWishlist(prev => {
      const exists = prev.includes(propertyId);
      if (exists) {
        showToast('Property removed from your Wishlist', 'info');
        return prev.filter(id => id !== propertyId);
      } else {
        showToast('Added to your Wishlist ❤️', 'success');
        return [...prev, propertyId];
      }
    });
  };

  const isInWishlist = (propertyId) => wishlist.includes(propertyId);

  // Compare Actions
  const toggleCompare = (propertyId) => {
    setCompareList(prev => {
      if (prev.includes(propertyId)) {
        showToast('Removed from comparison list', 'info');
        return prev.filter(id => id !== propertyId);
      }
      if (prev.length >= 4) {
        showToast('You can compare a maximum of 4 properties at a time', 'warning');
        return prev;
      }
      showToast('Added to property comparison table', 'success');
      return [...prev, propertyId];
    });
  };

  const removeFromCompare = (propertyId) => {
    setCompareList(prev => prev.filter(id => id !== propertyId));
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison cleared', 'info');
  };

  const isInCompare = (propertyId) => compareList.includes(propertyId);

  // View Navigation
  const viewPropertyDetail = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view, extra = null) => {
    setCurrentView(view);
    if (view === 'listings' && extra?.city) {
      updateFilter('selectedCity', extra.city);
    }
    if (view === 'listings' && extra?.purpose) {
      updateFilter('purpose', extra.purpose);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add User-Submitted Property
  const addNewProperty = (propertyData) => {
    const newProperty = {
      ...propertyData,
      id: `prop-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      featured: true,
      ageOfProperty: 'Just Listed',
      reraId: propertyData.reraId || `RERA/OWNER/${Math.floor(100000 + Math.random() * 900000)}`,
      agentId: 'agent-1',
      agentName: currentUser?.name || 'Verified Direct Owner',
      agentPhone: currentUser?.phone || '+91 98200 11223',
      agentPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    };

    setProperties(prev => [newProperty, ...prev]);

    // Save in localStorage
    try {
      const existingSaved = JSON.parse(localStorage.getItem(CUSTOM_PROPERTIES_KEY) || '[]');
      localStorage.setItem(CUSTOM_PROPERTIES_KEY, JSON.stringify([newProperty, ...existingSaved]));
    } catch (e) {
      console.error(e);
    }

    showToast('🎉 Property listed successfully! Now live across India.', 'success');
    viewPropertyDetail(newProperty.id);
  };

  // User Auth
  const loginUser = (user) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${user.name}! 🇮🇳`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  // Filtered Properties Computation
  const filteredProperties = properties.filter(prop => {
    // Search Term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(term);
      const matchCity = prop.city.toLowerCase().includes(term);
      const matchLocality = prop.locality.toLowerCase().includes(term);
      const matchBuilder = prop.builder?.toLowerCase().includes(term);
      if (!matchTitle && !matchCity && !matchLocality && !matchBuilder) return false;
    }

    // City
    if (filters.selectedCity !== 'all') {
      if (prop.city.toLowerCase() !== filters.selectedCity.toLowerCase()) return false;
    }

    // Purpose (buy / rent)
    if (filters.purpose !== 'all') {
      if (prop.purpose !== filters.purpose) return false;
    }

    // Property Type
    if (filters.propertyType !== 'all') {
      if (prop.propertyType.toLowerCase() !== filters.propertyType.toLowerCase()) return false;
    }

    // BHK
    if (filters.bhk !== 'all') {
      if (filters.bhk === '5+') {
        if (prop.bhk < 5) return false;
      } else {
        if (prop.bhk !== parseInt(filters.bhk, 10)) return false;
      }
    }

    // Price
    if (prop.price < filters.minPrice || prop.price > filters.maxPrice) {
      return false;
    }

    // Possession
    if (filters.possession !== 'all') {
      if (prop.possession !== filters.possession) return false;
    }

    // Furnishing
    if (filters.furnishing !== 'all') {
      if (prop.furnishing !== filters.furnishing) return false;
    }

    // Verified Only
    if (filters.verifiedOnly) {
      if (!prop.reraId) return false;
    }

    // Amenities (all selected amenities must be present)
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity =>
        prop.amenities && prop.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (filters.sortBy === 'area-desc') return (b.builtUpArea || 0) - (a.builtUpArea || 0);
    // default 'featured'
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  // Current Selected Property
  const currentProperty = properties.find(p => p.id === selectedPropertyId) || properties[0];

  return (
    <MarketplaceContext.Provider value={{
      properties,
      filteredProperties,
      currentProperty,
      selectedPropertyId,
      wishlist,
      compareList,
      currentUser,
      currentView,
      filters,
      agents: realEstateAgents,
      toastMessage,
      isAuthModalOpen,
      authModalMode,
      isPostPropertyOpen,
      isCompareModalOpen,
      scheduleModalProp,
      selectedAgentModal,
      // setters and actions
      updateFilter,
      resetFilters,
      toggleWishlist,
      isInWishlist,
      toggleCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      viewPropertyDetail,
      navigateTo,
      addNewProperty,
      loginUser,
      logoutUser,
      setIsAuthModalOpen,
      setAuthModalMode,
      setIsPostPropertyOpen,
      setIsCompareModalOpen,
      setScheduleModalProp,
      setSelectedAgentModal,
      showToast
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
