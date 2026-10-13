import React from 'react';
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
import { PropertyDetailView } from './components/detail/PropertyDetailView';
import { WishlistView } from './components/wishlist/WishlistView';
import { AgentsView } from './components/agents/AgentsView';

// Modals & Floating Bars
import { ComparisonModal } from './components/comparison/ComparisonModal';
import { ComparisonBar } from './components/comparison/ComparisonBar';
import { AuthModal } from './components/auth/AuthModal';
import { PostPropertyModal } from './components/post-property/PostPropertyModal';
import { ScheduleVisitModal } from './components/detail/ScheduleVisitModal';

function MainContent() {
  const { currentView } = useMarketplace();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
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

        {currentView === 'listings' && <ListingsView />}
        {currentView === 'detail' && <PropertyDetailView />}
        {currentView === 'wishlist' && <WishlistView />}
        {currentView === 'agents' && <AgentsView />}
      </main>

      {/* Modals & Popups */}
      <AuthModal />
      <PostPropertyModal />
      <ComparisonModal />
      <ScheduleVisitModal />
      <ComparisonBar />
      <Toast />

      {/* Global Footer */}
      <Footer />
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
