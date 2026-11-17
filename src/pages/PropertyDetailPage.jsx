import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyGallery from '../components/property/PropertyGallery';
import PropertyMap from '../components/property/PropertyMap';
import MortgageCalculator from '../components/property/MortgageCalculator';
import ContactAgentCard from '../components/property/ContactAgentCard';
import TourScheduleModal from '../components/property/TourScheduleModal';
import SimilarProperties from '../components/property/SimilarProperties';
import Badge from '../components/common/Badge';
import {
  Bed,
  Bath,
  Maximize2,
  Car,
  Calendar,
  MapPin,
  Heart,
  Scale,
  Share2,
  CheckCircle2,
  ChevronRight,
  Building
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const {
    properties,
    toggleFavorite,
    isFavorite,
    addToCompare,
    removeFromCompare,
    comparedProperties
  } = useProperties();

  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  const property = useMemo(() => {
    return properties.find((p) => p.id === id || p.slug === id);
  }, [properties, id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Property Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">
            The property you are looking for might have been sold, removed, or the link is expired.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition"
          >
            Browse Available Properties
          </Link>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(property.id);
  const isCompared = comparedProperties.some((p) => p.id === property.id);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price);

  const isRent = property.purpose === 'rent';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Property link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 overflow-hidden">
          <Link to="/" className="hover:text-indigo-600 transition shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/properties" className="hover:text-indigo-600 transition shrink-0">
            Properties
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-slate-800 font-semibold truncate">{property.title}</span>
        </div>

        {/* Gallery */}
        <div className="mb-8">
          <PropertyGallery images={property.images} title={property.title} />
        </div>

        {/* Header & Primary Info */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            {/* Title & Location */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shadow-xs ${
                    isRent ? 'bg-sky-600' : 'bg-indigo-600'
                  }`}
                >
                  {isRent ? 'For Rent' : 'For Sale'}
                </span>
                <Badge variant="indigo">{property.type}</Badge>
                {property.status && <Badge variant="amber">{property.status}</Badge>}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {property.title}
              </h1>

              <p className="flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  {property.address}, {property.city}, {property.state} {property.zip}
                </span>
              </p>
            </div>

            {/* Price & Action Icons */}
            <div className="flex flex-col sm:items-end gap-3 shrink-0">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {formattedPrice}
                {isRent && <span className="text-base font-normal text-slate-500"> / month</span>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                  title="Share Property"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    isCompared ? removeFromCompare(property.id) : addToCompare(property)
                  }
                  className={`p-2.5 rounded-xl border transition ${
                    isCompared
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                  title={isCompared ? 'Remove from compare' : 'Compare property'}
                >
                  <Scale className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavorite(property.id)}
                  className={`p-2.5 rounded-xl border transition ${
                    isFav
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                  title={isFav ? 'Remove from saved' : 'Save property'}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <Bed className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <div className="text-base font-bold text-slate-900">{property.bedrooms}</div>
              <div className="text-[11px] text-slate-500 uppercase font-medium">Bedrooms</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <Bath className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <div className="text-base font-bold text-slate-900">{property.bathrooms}</div>
              <div className="text-[11px] text-slate-500 uppercase font-medium">Bathrooms</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <Maximize2 className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <div className="text-base font-bold text-slate-900">
                {property.area?.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 uppercase font-medium">Sq Ft</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <Car className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <div className="text-base font-bold text-slate-900">{property.garages || 2}</div>
              <div className="text-[11px] text-slate-500 uppercase font-medium">Garages</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <Calendar className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <div className="text-base font-bold text-slate-900">{property.yearBuilt || 2022}</div>
              <div className="text-[11px] text-slate-500 uppercase font-medium">Year Built</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <Building className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <div className="text-base font-bold text-slate-900">
                ${property.pricePerSqft || Math.round(property.price / (property.area || 1))}
              </div>
              <div className="text-[11px] text-slate-500 uppercase font-medium">Price / SqFt</div>
            </div>
          </div>
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Details, Amenities, Location Map, Mortgage Calculator */}
          <div className="lg:col-span-8 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Property Overview</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities & Features */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Features & Luxury Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Map */}
            <PropertyMap property={property} height="h-[380px]" />

            {/* Mortgage Calculator */}
            {!isRent && (
              <MortgageCalculator defaultPrice={property.price} />
            )}
          </div>

          {/* Right Column: Agent & Inquiry Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <ContactAgentCard
              property={property}
              onOpenTourModal={() => setIsTourModalOpen(true)}
            />
          </div>
        </div>

        {/* Similar Properties */}
        <SimilarProperties currentProperty={property} />
      </div>

      {/* Tour Booking Modal */}
      <TourScheduleModal
        property={property}
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />
    </div>
  );
}
