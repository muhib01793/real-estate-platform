import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, DollarSign, ShieldCheck, Star } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';

export default function HeroSection() {
  const navigate = useNavigate();
  const { setFilters } = useProperties();

  const [activeTab, setActiveTab] = useState('sale'); // 'sale' | 'rent' | 'Commercial'
  const [locationInput, setLocationInput] = useState('');
  const [typeInput, setTypeInput] = useState('all');
  const [priceInput, setPriceInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      purpose: activeTab === 'Commercial' ? 'all' : activeTab,
      type: activeTab === 'Commercial' ? 'Commercial' : typeInput,
      location: locationInput,
      maxPrice: priceInput
    }));
    navigate('/properties');
  };

  const handleQuickTagClick = (tagLocation, tagType) => {
    setFilters((prev) => ({
      ...prev,
      location: tagLocation,
      type: tagType || 'all'
    }));
    navigate('/properties');
  };

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden py-20 lg:py-28">
      {/* Background Graphic & Glows */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Architecture"
          className="w-full h-full object-cover opacity-20 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-900/80 to-slate-900" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-300 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Over 4,500+ Verified Luxury Properties Listed</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white mb-6">
            Find Your Next <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 via-white to-sky-300">
              Architectural Sanctuary.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Discover bespoke luxury villas, duplex penthouses, and prime real estate investments with transparent valuations and dedicated concierge service.
          </p>
        </div>

        {/* Search Box Card */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-3 sm:p-5 shadow-2xl border border-white/20 text-slate-800">
          {/* Tabs: Buy / Rent / Commercial */}
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('sale')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'sale'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Buy Property
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rent')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'rent'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Rent Luxury
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('Commercial')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'Commercial'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Commercial
            </button>
          </div>

          {/* Search Inputs Grid */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Location */}
            <div className="p-2 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:border-indigo-600 focus-within:bg-white transition">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                Location
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                <input
                  type="text"
                  placeholder="Malibu, New York, Miami..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="p-2 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:border-indigo-600 focus-within:bg-white transition">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                Property Type
              </label>
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-indigo-600 shrink-0" />
                <select
                  value={typeInput}
                  onChange={(e) => setTypeInput(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Any Type</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="House">Single Family</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Townhouse">Townhouse</option>
                </select>
              </div>
            </div>

            {/* Max Budget */}
            <div className="p-2 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:border-indigo-600 focus-within:bg-white transition">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                Max Budget
              </label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-600 shrink-0" />
                <select
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="">Any Budget</option>
                  <option value="1500000">Up to $1.5M</option>
                  <option value="3000000">Up to $3.0M</option>
                  <option value="5000000">Up to $5.0M</option>
                  <option value="10000000">Up to $10.0M</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition"
            >
              <Search className="w-4 h-4" />
              <span>Explore Listings</span>
            </button>
          </form>

          {/* Quick Tag suggestions */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Trending:</span>
            <button
              onClick={() => handleQuickTagClick('Malibu', 'Villa')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-medium transition"
            >
              Malibu Ocean Villas
            </button>
            <button
              onClick={() => handleQuickTagClick('New York', 'Penthouse')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-medium transition"
            >
              Manhattan Penthouses
            </button>
            <button
              onClick={() => handleQuickTagClick('Miami', 'Apartment')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-medium transition"
            >
              Miami Waterfront
            </button>
            <button
              onClick={() => handleQuickTagClick('Aspen', 'Villa')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-medium transition"
            >
              Aspen Alpine Chalets
            </button>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-slate-400 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>100% Title Verified Listings</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-current" />
            <span>4.9 / 5.0 Buyer Satisfaction</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span>Zero Hidden Broker Fees</span>
          </div>
        </div>
      </div>
    </div>
  );
}
