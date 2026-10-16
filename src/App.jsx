// BharatNivas Application Root
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';

// Home Views
import { HeroSection } from './components/home/HeroSection';
import { QuickCitySelector } from './components/home/QuickCitySelector';
import { FeaturedProperties } from './components/home/FeaturedProperties';
import { EmiCalculatorWidget } from './components/home/EmiCalculatorWidget';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { Testimonials } from './components/home/Testimonials';

// Other Main Views
import { ListingsView } from './components/listings/ListingsView';
import { CitiesView } from './components/cities/CitiesView';
import { PropertyDetailView } from './components/detail/PropertyDetailView';
import { WishlistView } from './components/wishlist/WishlistView';
import { AgentsView } from './components/agents/AgentsView';
import { CompareView } from './components/comparison/CompareView';

// Modals & Floating Bars
import { ComparisonBar } from './components/comparison/ComparisonBar';
import { AuthModal } from './components/auth/AuthModal';
import { PostPropertyModal } from './components/post-property/PostPropertyModal';
import { ScheduleVisitModal } from './components/detail/ScheduleVisitModal';
import { PropertyTransactionModal } from './components/transaction/PropertyTransactionModal';

function MainContent() {
  const marketplace = useMarketplace();
  const { currentView } = marketplace;

  if (typeof window !== 'undefined') {
    window.__marketplace = marketplace;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50">
      {/* Top Navigation - Full width across screen, scrollbar does NOT enter navbar */}
      <Navbar />

      {/* Main Scrollable View Area - The scrollbar starts strictly below the navbar */}
      <div 
        id="main-scroll-container" 
        className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth flex flex-col"
      >
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {currentView === 'home' && (
                <>
                  <HeroSection />
                  <QuickCitySelector />
                  <FeaturedProperties />
                  <EmiCalculatorWidget />
                  <WhyChooseUs />
                  <Testimonials />
                </>
              )}

              {currentView === 'cities' && <CitiesView />}
              {currentView === 'listings' && <ListingsView />}
              {currentView === 'detail' && <PropertyDetailView />}
              {currentView === 'wishlist' && <WishlistView />}
              {currentView === 'compare' && <CompareView />}
              {currentView === 'agents' && <AgentsView />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>

      {/* Modals & Popups */}
      <AuthModal />
      <PostPropertyModal />
      <ScheduleVisitModal />
      <PropertyTransactionModal />
      <ComparisonBar />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <MarketplaceProvider>
      <MainContent />
    </MarketplaceProvider>
  );
}
