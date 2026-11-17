import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { allAmenitiesList } from '../data/propertiesData';
import PropertyCard from '../components/common/PropertyCard';
import {
  Building2,
  MapPin,
  Maximize2,
  Image as ImageIcon,
  Check,
  PlusCircle,
  Eye,
  CheckCircle2
} from 'lucide-react';

export default function AddPropertyPage() {
  const navigate = useNavigate();
  const { addProperty } = useProperties();
  const [selectedAmenities, setSelectedAmenities] = useState([
    'Swimming Pool',
    'Smart Home System',
    'Gated Security'
  ]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: 'Modern Sunset Hillcrest Villa',
      tagline: 'Stunning panoramic views with bespoke architectural detailing',
      purpose: 'sale',
      type: 'Villa',
      price: 2450000,
      address: '10800 Sunset Boulevard',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90077',
      bedrooms: 4,
      bathrooms: 4.5,
      area: 4500,
      garages: 2,
      yearBuilt: 2023,
      description:
        'A newly constructed modern marvel offering high ceilings, floor-to-ceiling glass doors, an entertainer\'s outdoor terrace, gourmet Italian kitchen, and serene master sanctuary.',
      imageUrl1:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      imageUrl2:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      ownerName: 'Alexander Hayes',
      ownerPhone: '+1 (310) 555-8821',
      ownerEmail: 'alexander.hayes@havenly.com'
    }
  });

  const formValues = watch();

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const previewProperty = {
    id: 'preview-temp',
    title: formValues.title || 'Your Property Title',
    price: Number(formValues.price) || 1200000,
    purpose: formValues.purpose || 'sale',
    type: formValues.type || 'House',
    status: 'New',
    featured: true,
    address: formValues.address || '123 Luxury Way',
    city: formValues.city || 'Los Angeles',
    state: formValues.state || 'CA',
    zip: formValues.zip || '90001',
    bedrooms: Number(formValues.bedrooms) || 3,
    bathrooms: Number(formValues.bathrooms) || 2.5,
    area: Number(formValues.area) || 3200,
    garages: Number(formValues.garages) || 2,
    description: formValues.description,
    images: [
      formValues.imageUrl1 ||
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      formValues.imageUrl2 ||
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: selectedAmenities,
    agent: {
      name: formValues.ownerName || 'Direct Listing',
      agency: 'Verified Owner',
      phone: formValues.ownerPhone || '+1 (555) 000-0000',
      email: formValues.ownerEmail || 'contact@havenly.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      reviewCount: 1
    }
  };

  const onSubmit = (data) => {
    const images = [data.imageUrl1];
    if (data.imageUrl2) images.push(data.imageUrl2);

    const newProperty = addProperty({
      title: data.title,
      tagline: data.tagline,
      purpose: data.purpose,
      type: data.type,
      price: Number(data.price),
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      bedrooms: Number(data.bedrooms),
      bathrooms: Number(data.bathrooms),
      area: Number(data.area),
      garages: Number(data.garages),
      yearBuilt: Number(data.yearBuilt),
      description: data.description,
      images,
      amenities: selectedAmenities,
      agent: {
        name: data.ownerName,
        phone: data.ownerPhone,
        email: data.ownerEmail,
        agency: 'Direct Owner Listing',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        reviewCount: 1
      }
    });

    navigate(`/property/${newProperty.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
            Seller & Agent Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            List Your Property on Havenly
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Reach serious buyers, investors, and high-end tenants worldwide. Fill out the details below to publish your listing instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 cols) */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Card 1: Core Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  1. Basic Information
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    placeholder="e.g. The Grand Horizon Modern Villa"
                  />
                  {errors.title && (
                    <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tagline or Highlight *
                  </label>
                  <input
                    type="text"
                    {...register('tagline')}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    placeholder="e.g. Unobstructed ocean views and private infinity pool"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Listing Purpose
                    </label>
                    <select
                      {...register('purpose')}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    >
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Property Type
                    </label>
                    <select
                      {...register('type')}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    >
                      <option value="Villa">Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Price ($ USD) *
                    </label>
                    <input
                      type="number"
                      {...register('price', { required: 'Price is required' })}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    />
                    {errors.price && (
                      <p className="text-rose-500 text-xs mt-1">{errors.price.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Location */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  2. Location Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      {...register('address', { required: 'Address is required' })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                      placeholder="e.g. 10800 Sunset Boulevard"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      {...register('city', { required: 'City is required' })}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                      placeholder="e.g. Los Angeles"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        {...register('state', { required: 'State is required' })}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                        placeholder="CA"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Zip Code *
                      </label>
                      <input
                        type="text"
                        {...register('zip', { required: 'Zip is required' })}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                        placeholder="90077"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Specifications */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Maximize2 className="w-5 h-5 text-indigo-600" />
                  3. Specifications
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      {...register('bedrooms')}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      {...register('bathrooms')}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Area (SqFt)
                    </label>
                    <input
                      type="number"
                      {...register('area')}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Garages
                    </label>
                    <input
                      type="number"
                      {...register('garages')}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Year Built
                    </label>
                    <input
                      type="number"
                      {...register('yearBuilt')}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Property Description *
                  </label>
                  <textarea
                    rows={4}
                    {...register('description', { required: 'Description is required' })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    placeholder="Describe the architectural highlights, views, interior materials, master suite, etc."
                  />
                  {errors.description && (
                    <p className="text-rose-500 text-xs mt-1">{errors.description.message}</p>
                  )}
                </div>
              </div>

              {/* Card 4: Amenities */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  4. Amenities & Features
                </h3>

                <p className="text-xs text-slate-500">
                  Select all the high-end amenities that apply to this property:
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {allAmenitiesList.map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card 5: Images & Media */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-indigo-600" />
                  5. High-Resolution Photos
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Exterior Image URL *
                  </label>
                  <input
                    type="url"
                    {...register('imageUrl1', { required: 'At least one photo URL is required' })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    placeholder="https://..."
                  />
                  {errors.imageUrl1 && (
                    <p className="text-rose-500 text-xs mt-1">{errors.imageUrl1.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Secondary Interior Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    {...register('imageUrl2')}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Card 6: Contact Info */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                  6. Contact & Listing Authority
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      {...register('ownerName', { required: 'Name is required' })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('ownerPhone', { required: 'Phone is required' })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('ownerEmail', { required: 'Email is required' })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-base shadow-xl shadow-indigo-600/25 transition"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Publish Property Listing</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Sticky Preview (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>Live Listing Card Preview</span>
            </div>

            <PropertyCard property={previewProperty} />

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
              <strong>💡 Pro Tip:</strong> High quality architectural photography with clean descriptions drives 4x higher inquiry volumes and faster closings.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
