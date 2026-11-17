import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/common/PropertyCard';
import EmptyState from '../components/common/EmptyState';
import { Heart, Scale } from 'lucide-react';

export default function FavoritesPage() {
  const { savedPropertiesList, addToCompare } = useProperties();

  const handleCompareAll = () => {
    savedPropertiesList.slice(0, 4).forEach((prop) => {
      addToCompare(prop);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
              <Heart className="w-4 h-4 fill-current" />
              <span>Personal Wishlist</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Saved Properties
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {savedPropertiesList.length} {savedPropertiesList.length === 1 ? 'property' : 'properties'} saved for future reference.
            </p>
          </div>

          {savedPropertiesList.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCompareAll}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition shadow-xs"
              >
                <Scale className="w-4 h-4 text-amber-500" />
                <span>Compare Saved (Up to 4)</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {savedPropertiesList.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="You haven't saved any properties yet"
            description="Browse our portfolio of luxury residences and click the heart icon on any card to save it to your personal shortlist."
            actionText="Discover Properties"
            onAction={() => (window.location.href = '/properties')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {savedPropertiesList.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
