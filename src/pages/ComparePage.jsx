import { Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { allAmenitiesList } from '../data/propertiesData';
import EmptyState from '../components/common/EmptyState';
import {
  Scale,
  X,
  Check,
  Minus,
  ExternalLink
} from 'lucide-react';

export default function ComparePage() {
  const { comparedProperties, removeFromCompare, clearCompare } = useProperties();

  if (comparedProperties.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState
            icon={Scale}
            title="No properties selected for comparison"
            description="You can compare up to 4 properties side-by-side. Click the scale icon on any property card while browsing."
            actionText="Browse Properties"
            onAction={() => (window.location.href = '/properties')}
          />
        </div>
      </div>
    );
  }

  // Common amenities to compare
  const comparisonAmenities = allAmenitiesList.slice(0, 10);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Scale className="w-4 h-4" />
              <span>Side-by-Side Analysis</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Compare Properties ({comparedProperties.length}/4)
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Compare pricing, architectural specs, and amenities across your shortlisted homes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition"
            >
              Clear All
            </button>
            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm"
            >
              <span>+ Add More</span>
            </Link>
          </div>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* Table Header: Property Cards */}
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-6 w-1/5 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-500 align-top">
                  Property Overview
                </th>
                {comparedProperties.map((prop) => (
                  <th key={prop.id} className="p-6 w-1/4 align-top">
                    <div className="relative group">
                      <button
                        onClick={() => removeFromCompare(prop.id)}
                        className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center shadow-md transition"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="aspect-16/10 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                        <img
                          src={prop.images?.[0]}
                          alt={prop.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1 mb-1">
                        {prop.title}
                      </h4>
                      <div className="text-lg font-black text-indigo-600 mb-2">
                        ${prop.price?.toLocaleString()}
                        {prop.purpose === 'rent' && (
                          <span className="text-xs font-normal text-slate-500"> /mo</span>
                        )}
                      </div>

                      <Link
                        to={`/property/${prop.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                      >
                        <span>View Details</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body Specs */}
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {/* Purpose */}
              <tr>
                <td className="p-4 px-6 bg-slate-50/50 font-semibold text-xs uppercase tracking-wider text-slate-500">
                  Purpose
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} className="p-4 px-6 font-semibold uppercase text-xs">
                    {prop.purpose === 'rent' ? 'For Rent' : 'For Sale'}
                  </td>
                ))}
              </tr>

              {/* Property Type */}
              <tr>
                <td className="p-4 px-6 bg-slate-50/50 font-semibold text-xs uppercase tracking-wider text-slate-500">
                  Type
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} className="p-4 px-6 font-medium">
                    {prop.type}
                  </td>
                ))}
              </tr>

              {/* Location */}
              <tr>
                <td className="p-4 px-6 bg-slate-50/50 font-semibold text-xs uppercase tracking-wider text-slate-500">
                  Location
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} className="p-4 px-6 text-xs font-medium text-slate-600">
                    {prop.city}, {prop.state}
                  </td>
                ))}
              </tr>

              {/* Bedrooms */}
              <tr>
                <td className="p-4 px-6 bg-slate-50/50 font-semibold text-xs uppercase tracking-wider text-slate-500">
                  Bedrooms
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} className="p-4 px-6 font-bold text-slate-900">
                    {prop.bedrooms} Beds
                  </td>
                ))}
              </tr>

              {/* Bathrooms */}
              <tr>
                <td className="p-4 px-6 bg-slate-50/50 font-semibold text-xs uppercase tracking-wider text-slate-500">
                  Bathrooms
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} className="p-4 px-6 font-bold text-slate-900">
                    {prop.bathrooms} Baths
                  </td>
                ))}
              </tr>

              {/* Area */}
              <tr>
                <td className="p-4 px-6 bg-slate-50/50 font-semibold text-xs uppercase tracking-wider text-slate-500">
                  Square Footage
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} className="p-4 px-6 font-bold text-slate-900">
                    {prop.area?.toLocaleString()} sqft
                  </td>
                ))}
              </tr>

              {/* Price / Sqft */}
              <tr>
                <td className="p-4 px-6 bg-slate-50/50 font-semibold text-xs uppercase tracking-wider text-slate-500">
                  Price / SqFt
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} className="p-4 px-6 font-medium text-slate-800">
                    ${prop.pricePerSqft || Math.round(prop.price / (prop.area || 1))} /sqft
                  </td>
                ))}
              </tr>

              {/* Garages */}
              <tr>
                <td className="p-4 px-6 bg-slate-50/50 font-semibold text-xs uppercase tracking-wider text-slate-500">
                  Parking / Garage
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} className="p-4 px-6 font-medium">
                    {prop.garages || 2} Cars
                  </td>
                ))}
              </tr>

              {/* Year Built */}
              <tr>
                <td className="p-4 px-6 bg-slate-50/50 font-semibold text-xs uppercase tracking-wider text-slate-500">
                  Year Built
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} className="p-4 px-6 font-medium">
                    {prop.yearBuilt || 2022}
                  </td>
                ))}
              </tr>

              {/* Amenities Breakdown */}
              {comparisonAmenities.map((amenity) => (
                <tr key={amenity}>
                  <td className="p-3 px-6 bg-slate-50/50 font-medium text-xs text-slate-600">
                    {amenity}
                  </td>
                  {comparedProperties.map((prop) => {
                    const hasAmenity = prop.amenities?.includes(amenity);
                    return (
                      <td key={prop.id} className="p-3 px-6">
                        {hasAmenity ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold">
                            <Check className="w-4 h-4 stroke-[3]" /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-300 text-xs">
                            <Minus className="w-4 h-4" /> No
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
