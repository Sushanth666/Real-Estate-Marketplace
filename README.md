<!-- BharatNivas Release -->
<div align="center">

  <img src="public/favicon.svg" alt="BharatNivas Logo" width="84" height="84" />

  # BharatNivas 🇮🇳
  ### Premier Indian Luxury Real Estate Marketplace

  [![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.1-0055FF?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)
  [![Playwright](https://img.shields.io/badge/Playwright-1.64-2EAD33?style=flat&logo=playwright&logoColor=white)](https://playwright.dev/)

  A modern, high-performance web application engineered specifically for the Indian luxury residential ecosystem. Built with **React 19**, **Vite**, **Tailwind CSS**, and **Framer Motion**, BharatNivas delivers an authentic Indian real estate experience with native Indian Rupee (₹ Lakhs & Crores) valuation, state-level RERA compliance verification, prime metropolitan corridors, interactive financial tools, and side-by-side property comparisons.

</div>

---

## 📖 Project Overview

### What is BharatNivas?
**BharatNivas** is a full-featured, responsive proptech marketplace designed to solve the common challenges of Indian home buyers, NRI investors, luxury tenants, and property owners. Traditional real estate portals in India are often cluttered with unverified listings, invasive broker spam, and generic non-localized financial tools. 

BharatNivas redefines this experience by providing:
- **100% RERA Diligence:** Every listing is tied to certified state RERA registration databases (e.g., TN-RERA, MahaRERA, K-RERA, HRERA, TS-RERA, WB-RERA), eliminating spam and ghost listings.
- **Authentic Indian Valuation & Context:** Native Indian numbering system formatting (**₹ Lakhs** and **₹ Crores**), carpet area vs. super built-up transparency, and Vastu orientation compliance.
- **Curated Metros & Regional Corridors:** Handpicked properties across 12 prime Indian metropolitan hubs, with prominent spotlight on Tamil Nadu (Chennai, Coimbatore, Madurai), Mumbai, Bengaluru, Delhi NCR, Hyderabad, Pune, Goa, Kolkata, Kochi, and Ahmedabad.
- **Empowered Home Seekers:** Built-in interactive financial planning (EMI loan calculator), sanctioned architectural 2D floor plans, private site visit booking, persistent shortlists with total portfolio valuation, and a 4-way side-by-side comparison matrix.

---

## 🌟 Key Features & Functional Modules

### 1. 🇮🇳 Authentic Indian Context & Pricing Engine
- **Native Denominations:** Automatic formatting for Indian financial conventions (`₹85,000 / mo`, `₹3.63 Cr`, `₹4,500/sqft`).
- **12 Metropolitan Hubs:** 
  - **Tamil Nadu:** Chennai (Boat Club Rd, Poes Garden, ECR, Anna Nagar), Coimbatore (Race Course, RS Puram), Madurai (KK Nagar).
  - **West India:** Mumbai (Worli, Bandra, Juhu, Lower Parel), Pune (Koregaon Park, Baner), Ahmedabad (Sabarmati).
  - **South India:** Bengaluru (Indiranagar, Whitefield, Hebbal), Hyderabad (Jubilee Hills, Gachibowli), Kochi (Marine Drive).
  - **North & East India:** Delhi NCR (Golf Course Rd, DLF Phase 5), Kolkata (New Town, Ballygunge), Goa (Assagao, Anjuna).
- **RERA Compliance Badges:** Prominent verified certification IDs, reducing transaction friction and ensuring regulatory transparency.

### 2. 🔍 Advanced Multi-Criteria Filter & Search Engine
- **Flexible Filter Controls:**
  - **Listing Type:** Buy vs. Luxury Rent.
  - **City & Micro-Market:** 12 Indian metros with instant locality switching.
  - **Property Categories:** Luxury Apartments, Gated Golf Villas, Sea-Facing Penthouses, Modern Sky Duplexes, Independent Builder Floors.
  - **Configuration (BHK):** 1 BHK, 2 BHK, 3 BHK, 4 BHK, 5+ BHK.
  - **Interactive Budget Slider:** Ranging from ₹50 Lakh up to ₹35+ Crores.
  - **Possession Timelines:** Ready to Move, Under Construction, New Launch.
  - **Amenities Filter:** Swimming Pool, Clubhouse, 24/7 Security, Gymnasium, EV Charging, Private Elevator, Vastu Compliant.
- **Sorting & View Layouts:** Sort by Featured, Price (Low to High / High to Low), Rating, and Area; toggle seamlessly between responsive Grid and List layouts.

### 3. 🏡 Immersive Property Detail Views
- **Photo Mosaic & Gallery:** Rich photo mosaic with full-page high-resolution presentation.
- **Architectural Specifications:** Super built-up area, carpet area, floor level, total floors, age of property, furnishing status, and Vastu direction.
- **Sanctioned 2D Floor Plans:** Interactive floor layout viewer with room-by-room dimensions (Master Suite, Living/Dining, Balcony Deck, Pooja room) and CAD PDF download trigger.
- **Neighborhood Transit & Connectivity:** Travel times and exact distances to nearby Metro stations, International Airports, and Super Specialty Hospitals.
- **Private Inspection Booking:** Schedule physical in-person visits or live HD WhatsApp video tours with preferred date and time slot selection.

### 4. ⚖️ 4-Way Side-by-Side Comparison Matrix
- Benchmark up to **4 residences simultaneously**.
- Floating comparison bar with quick removal, badge counters, and one-click matrix launcher.
- Direct row-by-row comparisons:
  - Price & Rate per Sq.Ft
  - Estimated Monthly EMI
  - Carpet Area & Built-up Area
  - BHK, Bathrooms & Balconies
  - Possession Date & Developer Name
  - State RERA Registration Number
  - 9+ Feature and Amenity Checklist indicators.

### 5. 🧮 Interactive Home Loan EMI Calculator
- Dynamic financial widget powered by standard Indian banking interest formulas:
  $$EMI = \frac{P \times r \times (1 + r)^n}{(1 + r)^n - 1}$$
- Real-time sliders for Loan Amount (₹20 Lakh to ₹10 Crore), Interest Rate (7.5% to 14%), and Tenure (5 to 30 years).
- Visual breakdown bar displaying Principal vs. Total Interest payable.
- Instant pre-approved loan partner integration (SBI Home Loans, HDFC Bank, ICICI Bank, Axis Bank).

### 6. ❤️ Saved Homes & Shortlist Portfolio
- 1-click heart toggle with animated Framer Motion micro-interactions.
- Shortlist data saved persistently in browser `localStorage`.
- Portfolio valuation counter calculating total shortlisted asset value in ₹ Crores.

### 7. 👔 RERA Accredited Advisors Directory
- Vetted regional specialists across major Indian zones.
- Real advisor metrics: Closed deal volumes (₹420+ Cr), years of local experience, advisory hub locations, and direct contact options (Private Consultation, Call, WhatsApp).

### 8. 📝 "Post Property FREE" Owner & Builder Wizard
- Streamlined 3-step listing creation wizard:
  1. Purpose, property type, city, and micro-locality.
  2. BHK, bathrooms, built-up area, carpet area, price in INR, and Vastu orientation.
  3. Amenities selection, title description, and instant live marketplace card preview.
- Newly listed properties immediately sync into the marketplace catalog and persist across sessions.

---

## 📸 Responsive Showcase & Screenshots

BharatNivas is thoroughly tested across three primary device form factors:
- **Desktop:** 1440 × 900
- **Tablet:** 768 × 1024
- **Mobile:** 390 × 844

| # | Screen / View Description | Desktop (1440×900) | Tablet (768×1024) | Mobile (390×844) |
| :-: | :--- | :---: | :---: | :---: |
| **01** | **Home Page** (Hero, City Corridors, Verified Homes, EMI Calculator, Testimonials, Footer) | [Desktop 01](screenshots/desktop/01_home_page.png) | [Tablet 01](screenshots/tablet/01_home_page.png) | [Mobile 01](screenshots/mobile/01_home_page.png) |
| **02** | **Listings Catalog** (Multi-filter Sidebar, Sort Dropdown, Cards Grid, Pagination) | [Desktop 02](screenshots/desktop/02_listings_catalog.png) | [Tablet 02](screenshots/tablet/02_listings_catalog.png) | [Mobile 02](screenshots/mobile/02_listings_catalog.png) |
| **03** | **Top Cities Hub** (12 Indian Metro Corridors, State Pills, Project Counts) | [Desktop 03](screenshots/desktop/03_top_cities.png) | [Tablet 03](screenshots/tablet/03_top_cities.png) | [Mobile 03](screenshots/mobile/03_top_cities.png) |
| **04** | **Property Detail** (Photo Mosaic, Specs, 2D Floor Plan, Locality Connectivity, Advisor) | [Desktop 04](screenshots/desktop/04_property_detail.png) | [Tablet 04](screenshots/tablet/04_property_detail.png) | [Mobile 04](screenshots/mobile/04_property_detail.png) |
| **05** | **Schedule Visit Modal** (Mode Selector, Date Chips, Time Slot, Confirmation) | [Desktop 05](screenshots/desktop/05_schedule_visit_modal.png) | [Tablet 05](screenshots/tablet/05_schedule_visit_modal.png) | [Mobile 05](screenshots/mobile/05_schedule_visit_modal.png) |
| **06** | **Saved Wishlist** (Shortlist Portfolio Metric, Saved Property Cards) | [Desktop 06](screenshots/desktop/06_saved_wishlist.png) | [Tablet 06](screenshots/tablet/06_saved_wishlist.png) | [Mobile 06](screenshots/mobile/06_saved_wishlist.png) |
| **07** | **RERA Advisors Directory** (Accredited Advisors, Deal Metrics, Consultation Trigger) | [Desktop 07](screenshots/desktop/07_rera_advisors.png) | [Tablet 07](screenshots/tablet/07_rera_advisors.png) | [Mobile 07](screenshots/mobile/07_rera_advisors.png) |
| **08** | **Auth Modal — Sign In** (Email/Password, Mobile Flow, Role Switcher) | [Desktop 08](screenshots/desktop/08_auth_modal_login.png) | [Tablet 08](screenshots/tablet/08_auth_modal_login.png) | [Mobile 08](screenshots/mobile/08_auth_modal_login.png) |
| **09** | **Auth Modal — Register** (Full Name, Phone, Role: Buyer / Owner / Advisor) | [Desktop 09](screenshots/desktop/09_auth_modal_register.png) | [Tablet 09](screenshots/tablet/09_auth_modal_register.png) | [Mobile 09](screenshots/mobile/09_auth_modal_register.png) |
| **10** | **Post Property Wizard** (3-Step Creation Wizard with Live Card Preview) | [Desktop 10](screenshots/desktop/10_post_property_modal.png) | [Tablet 10](screenshots/tablet/10_post_property_modal.png) | [Mobile 10](screenshots/mobile/10_post_property_modal.png) |
| **11** | **Comparison Matrix Modal** (Side-by-side Attribute Benchmark Table) | [Desktop 11](screenshots/desktop/11_comparison_matrix_modal.png) | [Tablet 11](screenshots/tablet/11_comparison_matrix_modal.png) | [Mobile 11](screenshots/mobile/11_comparison_matrix_modal.png) |
| **12** | **Mobile Navigation Menu** (Slide-out Responsive Drawer with Badges) | *N/A (Desktop Bar)* | [Tablet 12](screenshots/tablet/12_mobile_navigation_menu.png) | [Mobile 12](screenshots/mobile/12_mobile_navigation_menu.png) |

---

## 🏗️ Project Architecture & Directory Structure

```plaintext
Real Estate Marketplace/
├── public/                      # Static assets & icons
│   ├── favicon.svg              # BharatNivas brand favicon
│   └── images/
│       └── cities/              # High-res local imagery for 12 Indian metros
├── screenshots/                 # Multi-device responsive captures
│   ├── desktop/                 # Desktop viewport captures (1440x900)
│   ├── tablet/                  # Tablet viewport captures (768x1024)
│   └── mobile/                  # Mobile viewport captures (390x844)
├── src/
│   ├── components/
│   │   ├── agents/              # RERA Certified Advisors views & consultation modal
│   │   ├── auth/                # Sign In & Registration modals
│   │   ├── cities/              # Top Cities corridor directory
│   │   ├── common/              # Navbar, Footer, PropertyCard, Toast, Floating Bars
│   │   ├── comparison/          # Side-by-side comparison matrix modal & launcher bar
│   │   ├── detail/              # Property detail page, floor plans, schedule visit modal
│   │   ├── home/                # Hero section, city selector, featured homes, EMI calculator
│   │   ├── listings/            # Multi-facet filters, sorting controls, listings grid
│   │   ├── post-property/       # 3-step property submission wizard
│   │   └── wishlist/            # Saved homes & portfolio valuation summary
│   ├── context/
│   │   └── MarketplaceContext.jsx # Global state (filters, wishlist, compare, auth, active view)
│   ├── data/
│   │   ├── agentsData.js        # RERA advisors data
│   │   ├── citiesData.js        # 12 Indian metropolitan corridors data
│   │   ├── propertiesData.js    # Comprehensive Indian real estate property catalog
│   │   └── testimonialsData.js  # Client testimonials & reviews
│   ├── utils/
│   │   └── formatters.js        # INR currency formatting (Lakhs & Crores), EMI formulas
│   ├── App.jsx                  # Main application root with view routing & navigation
│   ├── index.css                # Custom Tailwind utilities, animations, and typography
│   └── main.jsx                 # React DOM mount point
├── package.json                 # Dependencies & project scripts
├── tailwind.config.js           # Customized brand palette, display fonts & shadows
└── vite.config.js               # Vite build configuration
```

---

## 💻 Tech Stack & Tools

| Technology | Category | Description |
| :--- | :--- | :--- |
| **[React 19](https://react.dev/)** | UI Framework | Component-driven frontend with hooks and context state management |
| **[Vite 8](https://vitejs.dev/)** | Build Tool | Ultra-fast development server and optimized rollup production bundling |
| **[Tailwind CSS v3](https://tailwindcss.com/)** | Styling | Utility-first responsive CSS framework with custom design tokens |
| **[Framer Motion](https://www.framer.com/motion/)** | Animations | Hardware-accelerated transitions, interactive gestures, and modals |
| **[Lucide React](https://lucide.dev/)** | Iconography | Clean, consistent UI icons |
| **[Playwright](https://playwright.dev/)** | Automation | End-to-end browser automation for multi-device screenshot capture |
| **[Google Fonts](https://fonts.google.com/)** | Typography | Modern display fonts: *Plus Jakarta Sans* & *Outfit* |

---

## ⚡ Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Launch

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sushanth666/Real-Estate-Marketplace.git
   cd "Real Estate Marketplace"
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Production-ready files will be bundled into the `dist/` directory.


---

## 📄 License & Compliance

- **RERA Compliance Notice:** All property records, RERA registration numbers, and advisor credentials displayed in this project are curated for demonstration of standard Indian real estate compliance frameworks.
- **Open Source:** Released under the MIT License.
