import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../../context/PropertyContext';
import PropertyCard from '../common/PropertyCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedSection() {
  const { properties } = useProperties();
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'sale' | 'rent'

  const featuredList = useMemo(() => {
    return properties
      .filter((p) => {
        if (filterMode === 'sale') return p.purpose === 'sale';
        if (filterMode === 'rent') return p.purpose === 'rent';
        return true;
      })
      .slice(0, 6);
  }, [properties, filterMode]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Luxury Properties
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <div className="p-1 bg-slate-100 rounded-xl flex items-center text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterMode === 'all'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Highlights
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('sale')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterMode === 'sale'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('rent')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterMode === 'rent'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Rent
              </button>
            </div>

            <Link
              to="/properties"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition pl-2"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredList.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Mobile View All CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/properties"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-md"
          >
            <span>Explore All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
