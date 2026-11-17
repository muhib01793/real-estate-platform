# 🏡 Havenly — Luxury Real Estate & Property Marketplace

Havenly is a modern, high-performance real estate frontend web application built with **React 19**, **Tailwind CSS v4**, **Vite**, **React Router v7**, and **Lucide Icons**. It offers a seamless experience for buyers, renters, and property owners.

---

## ✨ Features

- **🏠 Comprehensive Property Exploration**:
  - Browse verified luxury houses, penthouses, villas, modern townhouses, and commercial real estate.
  - Multi-criteria search filters: purpose (Buy / Rent), property type, price ranges, bedrooms, bathrooms, and luxury amenities.
  - Switch between **Grid View**, **List View**, and **Interactive Map View**.

- **🔍 Property Details & Immersive Experience**:
  - Full-resolution photo gallery with an interactive fullscreen lightbox slider.
  - Detailed property specs: bedrooms, bathrooms, square footage, price/sqft, and year built.
  - Comprehensive luxury amenities checklist (Pool, Wine Cellar, Private Spa, Smart Home, etc.).
  - **Interactive Location Map**: Simulated vector map with zoom controls and neighborhood points of interest (Schools, Transit, Dining, Health).
  - **Embedded Mortgage Calculator**: Live calculations for principal, interest, taxes, and HOA dues.
  - **Schedule a Tour**: Book in-person or live video tours with date & time selection.
  - **Direct Agent Contact**: Reach listing brokers directly via quick call, email, or message forms.

- **➕ List Your Property (`/add-property`)**:
  - Multi-field property listing form powered by `react-hook-form`.
  - **Live Card Preview**: See the card change in real-time as you type.
  - Persists new listings to local storage and updates the global catalogue immediately.

- **⚖️ Side-by-Side Property Comparison (`/compare`)**:
  - Compare up to 4 properties side-by-side on price, specs, area, and amenities.
  - Sticky floating comparison drawer for quick access.

- **❤️ Favorites Wishlist (`/favorites`)**:
  - Bookmark favorite homes with animated feedback, saved across sessions.

- **📊 Management Dashboard (`/dashboard`)**:
  - Track your active listings, booked tour appointments, sent inquiries, and saved homes in one centralized place.

- **💡 Mortgage Calculator Hub (`/calculator`)**:
  - Standalone financial planning tool with interactive sliders and cost breakdown charts.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/muhib01793/real-estate-platform.git
   cd real-estate-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
real-estate-platform/
├── public/                 # Static assets (favicons, icons)
├── src/
│   ├── assets/             # Brand logos & imagery
│   ├── components/
│   │   ├── common/         # PropertyCard, Badge, EmptyState, Pagination
│   │   ├── compare/        # CompareFloatingBar
│   │   ├── home/           # HeroSection, FeaturedSection, CategoryGrid, Testimonials
│   │   ├── layout/         # Navbar, Footer
│   │   └── property/       # PropertyGallery, PropertyMap, MortgageCalculator, TourScheduleModal
│   ├── context/            # PropertyContext (global state, filters, favorites, bookings)
│   ├── data/               # Mock properties data, testimonials, partner brokers
│   ├── pages/              # Home, Properties, Details, AddProperty, Compare, Dashboard, About, Contact
│   ├── App.jsx             # Routes & layout wrapper
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind CSS v4 entry
├── package.json
└── vite.config.js
```

---

## 📄 License

MIT License. Designed and built with ❤️.
