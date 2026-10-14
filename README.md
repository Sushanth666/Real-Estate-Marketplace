<div align="center">

  <img src="public/favicon.svg" alt="BharatNivas Logo" width="84" height="84" />

  # BharatNivas 🇮🇳
  
  **Premier Real Estate & Luxury Living Marketplace**

  A responsive, high-performance Indian Real Estate Marketplace web application crafted with **React 19**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Tailored specifically for the Indian real estate ecosystem with Indian Rupee (₹ Lakhs & Crores) pricing, RERA compliance diligence, top Indian metropolises, verified builder profiles, and interactive financial tools.

</div>

---

## 🌟 Key Features

### 1. Indian Context & Localized Experiences
- **Indian Pricing System:** Seamlessly formats values into **₹ Lakhs** (e.g. ₹85 Lakh) and **₹ Crores** (e.g. ₹18.50 Cr) following standard Indian numbering notation.
- **Top Indian Metros & Corridors:** Pre-configured with major real estate hubs:
  - **Mumbai:** Worli, Bandra West, Juhu, Powai, Lower Parel
  - **Bengaluru:** Indiranagar, Whitefield, Hebbal, Sarjapur Road
  - **Delhi NCR:** Golf Course Road, DLF Phase 5, Vasant Vihar
  - **Hyderabad:** Jubilee Hills, Gachibowli, Financial District
  - **Pune:** Koregaon Park, Kalyani Nagar, Baner
  - **Goa:** Assagao, Anjuna, Candolim Portuguese heritage estates
  - **Kolkata:** New Town Eco Park, Ballygunge
  - **Chennai:** East Coast Road (ECR), Anna Nagar
- **RERA Compliance Diligence:** Dedicated state RERA registration badges (MahaRERA, K-RERA, HRERA, TS-RERA, WB-RERA, TN-RERA) for all properties and channel partners.

---

### 2. Search, Filters, Sorting & Pagination
- **Multi-facet Filter Engine:**
  - **Listing Purpose:** Buy vs Luxury Rent
  - **Metropolitan City:** Mumbai, Bengaluru, Delhi NCR, Hyderabad, Pune, Goa, Kolkata, Chennai
  - **Property Category:** Apartments, Luxury Villas, Sea-Facing Penthouses, Duplex Mansions, Independent Builder Floors
  - **BHK Selectors:** 1 BHK, 2 BHK, 3 BHK, 4 BHK, 5+ BHK
  - **Budget Range Slider:** Smooth slider from ₹50 Lakh up to ₹35+ Crores
  - **Possession Status:** Ready to Move, Under Construction, New Launch
  - **RERA Verified Only Toggle**
  - **Amenities Filter:** Swimming Pool, Clubhouse, 24/7 Security, Gymnasium, EV Charging, Private Elevator, Vastu Compliant, etc.
- **Sorting Options:** Featured / Signature First, Price: Low to High, Price: High to Low, Highest Rated, and Built-up Area (Sq.Ft).
- **View Toggle:** Seamlessly switch between **Grid View** and **List View**.
- **Pagination:** Clean page navigation with real-time result counters.

---

### 3. Comprehensive Property Detail Pages
- **Immersive Image Mosaic & Lightbox Gallery:** Hero mosaic with click-to-open full-screen high-resolution photo viewer.
- **Specifications & Metrics:** Super Built-up Area, Carpet Area, Floor number, Total floors, Facing direction (Vastu Compliant), Age of property, Furnishing status.
- **Sanctioned Architectural Floor Plans:** Interactive 2D/3D layout diagram with switchable BHK dimensions and instant PDF download mockup.
- **Neighborhood & Connectivity Guide:** Real distances to nearby Metro Stations, Airports, International Schools, and Hospitals.
- **Integrated EMI Calculator:** Pre-configured for the property's exact price with loan tenure and down payment sliders.
- **RERA Certified Advisor Card:** Direct **"Schedule Site Visit"**, **"WhatsApp Inquiry"**, and **"Call Advisor"** action triggers.

---

### 4. Saved Homes & Persistent Wishlist
- 1-click animated heart button on property cards and detail headers with Framer Motion tactile feedback.
- Persisted locally across browser sessions via `localStorage`.
- Dedicated Wishlist View showing total shortlisted portfolio value in ₹ Cr and quick compare triggers.

---

### 5. Side-by-Side Property Comparison Matrix
- Benchmark up to **4 properties** simultaneously.
- Floating bottom comparison bar with thumbnails and quick launch.
- Comprehensive matrix comparing:
  - Price & Rate per Sq.Ft
  - Monthly Estimated EMI
  - Super Built-up vs Carpet Area
  - BHK, Bathrooms, Balconies
  - Facing / Vastu direction
  - Builder / Developer
  - State RERA Registration ID
  - Side-by-side checklist of 9+ amenities with checkmarks and cross markers.

---

### 6. RERA Certified Advisors Directory
- Accredited advisors across Mumbai, Bengaluru, Delhi NCR, Goa, Hyderabad, and Kolkata.
- Experience metrics, total closed transaction volumes (₹ Cr), star ratings, languages spoken, and specializations.
- Interactive **"Book Private Consultation"** modal.

---

### 7. "Post Property FREE" Owner & Builder Wizard
- 3-step interactive submission wizard:
  - Step 1: Listing purpose (Sell/Rent), Property category, City, and Locality.
  - Step 2: BHK, Bathrooms, Built-up area, Carpet area, Price in INR, Possession status, and Vastu orientation.
  - Step 3: Amenities checklist, custom description, and instant live marketplace card preview!
- Newly published properties instantly go live in the marketplace and persist in `localStorage`.

---

### 8. Authentication UI
- Modal with **Indian Mobile OTP Flow (+91)**:
  - 10-digit mobile number input
  - Simulated 6-digit OTP verification with auto-fill demo code (`842100`)
  - Role selection: **Home Buyer**, **Property Owner**, or **Channel Partner / Agent**
- Alternate Email & Password authentication.
- User profile state with dropdown menu and saved homes count.

---

## 📱 Responsive Design Across Devices

The entire platform is built with mobile-first Tailwind CSS classes and tested across Desktop, Tablet, and Mobile viewports:

| Device View | Viewport Size | Screenshot |
| :--- | :--- | :--- |
| **Desktop** | 1280 x 800 | `screenshots/desktop_view.png` |
| **Tablet** | 768 x 1024 | `screenshots/tablet_view.png` |
| **Mobile** | 390 x 844 | `screenshots/mobile_view.png` |
| **Property Detail** | 1280 x 800 | `screenshots/property_detail.png` |
| **Comparison Matrix** | 1280 x 800 | `screenshots/comparison_matrix.png` |

---

## 🛠️ Technology Stack

- **Frontend Library:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Motion & Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Outfit](https://fonts.google.com/specimen/Outfit) via Google Fonts

---

## 🚀 Setup & Local Execution Instructions

### Prerequisites
- Node.js version 18+ or 20+ installed
- npm version 9+ or 10+ installed

### Steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "Real Estate Marketplace"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/` or `http://localhost:5174/`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist/` directory.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Guide

### Deploying to Vercel:
1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com/) and click **"New Project"**.
3. Import the GitHub repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **"Deploy"**.

### Deploying to Netlify:
1. Drag and drop the `dist/` folder into the Netlify dashboard, OR connect via GitHub.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

---

## 📋 End-of-Day (EOD) Progress Update

**Date:** 13-Oct-2026  
**Developer:** Antigravity AI Assistant for Akash Barik  
**Project:** Indian Real Estate Marketplace (BharatNivas)  

### Completed Tasks:
- [x] Initialized modern Vite + React.js project architecture with customized Tailwind CSS design system.
- [x] Created authentic Indian real estate dataset across 8 metropolitan cities (Mumbai, Bengaluru, Delhi NCR, Hyderabad, Pune, Goa, Kolkata, Chennai) with INR pricing (₹ Lakhs & Crores), RERA IDs, and landmarks.
- [x] Developed responsive landing page featuring Hero search engine, city highlights, featured residences, live EMI calculator widget, and testimonials.
- [x] Built property listing page with search, multi-facet filtering (purpose, city, BHK, budget slider, possession, verified only, amenities), sorting, grid/list view toggle, and pagination.
- [x] Implemented comprehensive property detail page with mosaic gallery, lightbox viewer, specifications, architectural floor plans, landmarks, and contact advisor card.
- [x] Implemented Wishlist with persistent `localStorage` storage and badge counter.
- [x] Built side-by-side Property Comparison Matrix modal supporting up to 4 properties with floating quick launcher.
- [x] Created RERA Certified Advisors directory with consultation booking modal.
- [x] Implemented secure Email and Password authentication modal with registration redirect and role selector.
- [x] Created "Post Property FREE" 3-step wizard with real-time live preview and immediate marketplace listing sync.
- [x] Verified build output (`npm run build`) and tested interactive flows via browser automation.
- [x] Captured high-resolution screenshots for Desktop, Tablet, and Mobile views.

### Ongoing Work:
- Deployment to cloud hosting (Vercel / Netlify / GitHub Pages).

### Blockers:
- None. All core features and UI requirements are working without issues.
