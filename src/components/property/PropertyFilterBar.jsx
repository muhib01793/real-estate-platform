import { useState } from 'react';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { allAmenitiesList } from '../../data/propertiesData';

export default function PropertyFilterBar({ onFilterChange }) {
  const { filters, setFilters, resetFilters } = useProperties();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
    if (onFilterChange) onFilterChange();
  };

  const toggleAmenity = (amenity) => {
    setFilters((prev) => {
      const exists = prev.amenities.includes(amenity);
      const newAmenities = exists
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: newAmenities };
    });
  };

  const hasActiveFilters =
    filters.keyword ||
    filters.location ||
    filters.purpose !== 'all' ||
    filters.type !== 'all' ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.bedrooms !== 'all' ||
    filters.bathrooms !== 'all' ||
    filters.amenities.length > 0 ||
    filters.sortBy !== 'featured';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 mb-8 transition-all">
      {/* Primary Row: Keyword, Location, Purpose, Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Keyword Search */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Search Keywords
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Modern, Pool, View"
              value={filters.keyword}
              onChange={(e) => handleInputChange('keyword', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
            />
          </div>
        </div>

        {/* Location Search */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            City or State
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Malibu, New York"
              value={filters.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
            />
          </div>
        </div>

        {/* Purpose: Buy / Rent */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Purpose
          </label>
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleInputChange('purpose', 'all')}
              className={`py-1.5 rounded-lg transition ${
                filters.purpose === 'all'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('purpose', 'sale')}
              className={`py-1.5 rounded-lg transition ${
                filters.purpose === 'sale'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('purpose', 'rent')}
              className={`py-1.5 rounded-lg transition ${
                filters.purpose === 'rent'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rent
            </button>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Property Type
          </label>
          <div className="relative">
            <select
              value={filters.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition appearance-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="House">Houses</option>
              <option value="Apartment">Apartments</option>
              <option value="Villa">Villas</option>
              <option value="Penthouse">Penthouses</option>
              <option value="Townhouse">Townhouses</option>
              <option value="Commercial">Commercial</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Advanced Toggle & Sort Row */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/70 hover:bg-indigo-100/70 px-3 py-1.5 rounded-lg transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Hide Detailed Filters' : 'More Filters (Price, Beds, Amenities)'}</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs font-medium text-slate-500">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => handleInputChange('sortBy', e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden focus:border-indigo-600 cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Built</option>
            <option value="area-desc">Largest Area (sqft)</option>
          </select>
        </div>
      </div>

      {/* Advanced Panel (Price range, Bedrooms, Bathrooms, Amenities) */}
      {showAdvanced && (
        <div className="mt-5 pt-5 border-t border-slate-200/80 space-y-5 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Min Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Minimum Price ($)
              </label>
              <input
                type="number"
                placeholder="No min"
                value={filters.minPrice}
                onChange={(e) => handleInputChange('minPrice', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Maximum Price ($)
              </label>
              <input
                type="number"
                placeholder="No max"
                value={filters.maxPrice}
                onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
              />
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bedrooms
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
              >
                <option value="all">Any Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5+">5+ Bedrooms</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bathrooms
              </label>
              <select
                value={filters.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
              >
                <option value="all">Any Bathrooms</option>
                <option value="1">1+ Bathroom</option>
                <option value="2">2+ Bathrooms</option>
                <option value="3">3+ Bathrooms</option>
                <option value="4+">4+ Bathrooms</option>
              </select>
            </div>
          </div>

          {/* Amenities Multi-select Pills */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Must-Have Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {allAmenitiesList.slice(0, 14).map((amenity) => {
                const isSelected = filters.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
