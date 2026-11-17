import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/common/PropertyCard';
import PropertyFilterBar from '../components/property/PropertyFilterBar';
import PropertyMap from '../components/property/PropertyMap';
import Pagination from '../components/common/Pagination';
import EmptyState from '../components/common/EmptyState';
import { LayoutGrid, List, Map, Sparkles } from 'lucide-react';

export default function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const { filteredProperties, setFilters, resetFilters } = useProperties();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list' | 'map'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync URL search params on mount
  useEffect(() => {
    const purpose = searchParams.get('purpose');
    const location = searchParams.get('location');
    const type = searchParams.get('type');

    if (purpose || location || type) {
      setFilters((prev) => ({
        ...prev,
        ...(purpose ? { purpose } : {}),
        ...(location ? { location } : {}),
        ...(type ? { type } : {})
      }));
    }
  }, [searchParams, setFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProperties = filteredProperties.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Inventory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Discover Verified Real Estate
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse our exclusive portfolio of luxury homes, architectural estates, and prime commercial assets.
          </p>
        </div>

        {/* Filter Bar */}
        <PropertyFilterBar onFilterChange={() => setCurrentPage(1)} />

        {/* Results Bar: Count & View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="text-sm font-semibold text-slate-700">
            Showing{' '}
            <span className="text-indigo-600 font-bold">
              {filteredProperties.length}
            </span>{' '}
            {filteredProperties.length === 1 ? 'property' : 'properties'} available
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1 bg-white rounded-xl border border-slate-200 flex items-center shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-indigo-50 text-indigo-600 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'list'
                    ? 'bg-indigo-50 text-indigo-600 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'map'
                    ? 'bg-indigo-50 text-indigo-600 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Map & Grid View"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Map View Mode */}
        {viewMode === 'map' && filteredProperties.length > 0 && (
          <div className="mb-8">
            <PropertyMap
              property={filteredProperties[0]}
              height="h-[400px]"
            />
          </div>
        )}

        {/* Content Section */}
        {filteredProperties.length === 0 ? (
          <EmptyState
            title="No properties match your criteria"
            description="We couldn't find any listings matching your specific combination of filters. Try widening your price range or resetting your search."
            actionText="Reset All Filters"
            onAction={resetFilters}
          />
        ) : (
          <>
            <div
              className={
                viewMode === 'list'
                  ? 'flex flex-col space-y-6'
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
              }
            >
              {paginatedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  layout={viewMode === 'list' ? 'list' : 'grid'}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
