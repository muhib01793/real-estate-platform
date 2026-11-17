import { Link } from 'react-router-dom';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Heart,
  Scale,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';

export default function PropertyCard({ property, layout = 'grid' }) {
  const { toggleFavorite, isFavorite, addToCompare, removeFromCompare, comparedProperties } =
    useProperties();

  const isFav = isFavorite(property.id);
  const isCompared = comparedProperties.some((p) => p.id === property.id);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price);

  const isRent = property.purpose === 'rent';

  if (layout === 'list') {
    return (
      <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="relative md:w-80 lg:w-96 shrink-0 h-64 md:h-auto overflow-hidden">
          <Link to={`/property/${property.id}`} className="block h-full">
            <img
              src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </Link>
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none md:hidden" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase text-white shadow-xs ${
                isRent ? 'bg-sky-600' : 'bg-indigo-600'
              }`}
            >
              {isRent ? 'For Rent' : 'For Sale'}
            </span>
            {property.status && (
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                {property.status}
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={() => (isCompared ? removeFromCompare(property.id) : addToCompare(property))}
              className={`p-2 rounded-full backdrop-blur-md transition shadow-md ${
                isCompared
                  ? 'bg-amber-500 text-white'
                  : 'bg-white/85 text-slate-700 hover:bg-white hover:text-amber-600'
              }`}
              title={isCompared ? 'Remove from compare' : 'Add to compare'}
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-2 rounded-full backdrop-blur-md transition shadow-md ${
                isFav
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/85 text-slate-700 hover:bg-white hover:text-rose-600'
              }`}
              title={isFav ? 'Remove from saved' : 'Save property'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                {property.type}
              </span>
              <span className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
                {formattedPrice}
                {isRent && <span className="text-sm font-normal text-slate-500"> /mo</span>}
              </span>
            </div>

            <Link to={`/property/${property.id}`} className="block group-hover:text-indigo-600 transition">
              <h3 className="text-lg lg:text-xl font-bold text-slate-900 line-clamp-1">
                {property.title}
              </h3>
            </Link>

            <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 mb-3">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                {property.address}, {property.city}, {property.state}
              </span>
            </p>

            <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
              {property.description}
            </p>
          </div>

          <div>
            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-slate-700 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{property.area?.toLocaleString()} sqft</span>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2">
                <img
                  src={property.agent?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={property.agent?.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <span className="text-xs font-medium text-slate-600 truncate max-w-[120px]">
                  {property.agent?.name}
                </span>
              </div>

              <Link
                to={`/property/${property.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition group/btn"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid Layout
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <Link to={`/property/${property.id}`} className="block w-full h-full">
          <img
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase text-white shadow-xs ${
              isRent ? 'bg-sky-600' : 'bg-indigo-600'
            }`}
          >
            {isRent ? 'For Rent' : 'For Sale'}
          </span>
          {property.featured && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500 text-white shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={() => (isCompared ? removeFromCompare(property.id) : addToCompare(property))}
            className={`p-2 rounded-full backdrop-blur-md transition shadow-md ${
              isCompared
                ? 'bg-amber-500 text-white'
                : 'bg-white/85 text-slate-700 hover:bg-white hover:text-amber-600'
            }`}
            title={isCompared ? 'Remove from comparison' : 'Add to compare'}
          >
            <Scale className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`p-2 rounded-full backdrop-blur-md transition shadow-md ${
              isFav
                ? 'bg-rose-500 text-white'
                : 'bg-white/85 text-slate-700 hover:bg-white hover:text-rose-600'
            }`}
            title={isFav ? 'Remove from saved' : 'Save property'}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Type & City Floating Pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/80 backdrop-blur-sm text-white">
            {property.type} • {property.city}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {formattedPrice}
              {isRent && <span className="text-xs font-normal text-slate-500"> / month</span>}
            </div>
            {property.pricePerSqft && (
              <span className="text-[11px] font-medium text-slate-500">
                ${property.pricePerSqft}/sqft
              </span>
            )}
          </div>

          {/* Title */}
          <Link to={`/property/${property.id}`} className="block group-hover:text-indigo-600 transition mb-1">
            <h3 className="font-bold text-slate-900 text-base line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Address */}
          <p className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">
              {property.address}, {property.city}, {property.state} {property.zip}
            </span>
          </p>
        </div>

        <div>
          {/* Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100 text-slate-700 text-xs font-medium">
            <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
              <Bed className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5" title={`${property.area} Square Feet`}>
              <Maximize2 className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{property.area?.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* Agent & Detail Link */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <img
                src={property.agent?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                alt={property.agent?.name}
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
              />
              <span className="text-xs text-slate-600 truncate max-w-[110px]">
                {property.agent?.name}
              </span>
            </div>

            <Link
              to={`/property/${property.id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition group/btn"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
