import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialProperties } from '../data/propertiesData';
import { toast } from 'react-toastify';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  // Load properties with localStorage persistence for user additions
  const [properties, setProperties] = useState(() => {
    try {
      const stored = localStorage.getItem('havenly_properties');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load properties from localStorage', e);
    }
    return initialProperties;
  });

  // Save properties to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('havenly_properties', JSON.stringify(properties));
    } catch (e) {
      console.error('Failed to save properties to localStorage', e);
    }
  }, [properties]);

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('havenly_favorites');
      return stored ? JSON.parse(stored) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('havenly_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => {
      const exists = prev.includes(propertyId);
      if (exists) {
        toast.info('Removed from saved properties');
        return prev.filter((id) => id !== propertyId);
      } else {
        toast.success('Added to saved properties!');
        return [...prev, propertyId];
      }
    });
  };

  const isFavorite = (propertyId) => favorites.includes(propertyId);

  // Comparison state (Max 4 properties)
  const [comparedProperties, setComparedProperties] = useState([]);

  const addToCompare = (property) => {
    if (comparedProperties.some((p) => p.id === property.id)) {
      toast.info('Property is already in comparison list');
      return;
    }
    if (comparedProperties.length >= 4) {
      toast.warning('You can compare a maximum of 4 properties at a time.');
      return;
    }
    setComparedProperties((prev) => [...prev, property]);
    toast.success(`Added "${property.title}" to compare`);
  };

  const removeFromCompare = (propertyId) => {
    setComparedProperties((prev) => prev.filter((p) => p.id !== propertyId));
    toast.info('Removed from comparison');
  };

  const clearCompare = () => {
    setComparedProperties([]);
  };

  // Add new property
  const addProperty = (newPropData) => {
    const slug = newPropData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProperty = {
      ...newPropData,
      id: `prop-${Date.now()}`,
      slug,
      status: 'New',
      featured: false,
      yearBuilt: newPropData.yearBuilt || new Date().getFullYear(),
      pricePerSqft:
        newPropData.area && newPropData.price
          ? Math.round(Number(newPropData.price) / Number(newPropData.area))
          : 0,
      coordinates: newPropData.coordinates || { lat: 34.0522, lng: -118.2437 },
      agent: newPropData.agent || {
        id: 'user-agent',
        name: 'Direct Property Owner',
        agency: 'Private Seller',
        phone: '+1 (800) 555-0199',
        email: 'owner@havenly.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        rating: 5.0,
        reviewCount: 1
      }
    };

    setProperties((prev) => [newProperty, ...prev]);
    toast.success('Property listed successfully!');
    return newProperty;
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
    setComparedProperties((prev) => prev.filter((p) => p.id !== id));
    toast.info('Property listing removed');
  };

  // Tour Bookings
  const [tourBookings, setTourBookings] = useState(() => {
    try {
      const stored = localStorage.getItem('havenly_tour_bookings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addTourBooking = (bookingData) => {
    const booking = {
      id: `tour-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    setTourBookings((prev) => [booking, ...prev]);
    try {
      localStorage.setItem('havenly_tour_bookings', JSON.stringify([booking, ...tourBookings]));
    } catch (e) {
      console.error(e);
    }
    toast.success('Tour scheduled! An agent will confirm with you shortly.');
  };

  // Inquiries
  const [inquiries, setInquiries] = useState(() => {
    try {
      const stored = localStorage.getItem('havenly_inquiries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addInquiry = (inquiryData) => {
    const inquiry = {
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...inquiryData
    };
    setInquiries((prev) => [inquiry, ...prev]);
    try {
      localStorage.setItem('havenly_inquiries', JSON.stringify([inquiry, ...inquiries]));
    } catch (e) {
      console.error(e);
    }
    toast.success('Inquiry sent successfully to the listing agent!');
  };

  // Filter States
  const defaultFilters = {
    keyword: '',
    location: '',
    purpose: 'all', // 'all' | 'sale' | 'rent'
    type: 'all',    // 'all' | 'House' | 'Apartment' | 'Villa' | etc.
    minPrice: '',
    maxPrice: '',
    bedrooms: 'all',
    bathrooms: 'all',
    amenities: [],
    sortBy: 'featured' // 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'area-desc'
  };

  const [filters, setFilters] = useState(defaultFilters);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Filtered Properties memoized
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Keyword search
      if (filters.keyword.trim()) {
        const query = filters.keyword.toLowerCase();
        const matchTitle = prop.title.toLowerCase().includes(query);
        const matchDesc = prop.description?.toLowerCase().includes(query);
        const matchAddress = prop.address?.toLowerCase().includes(query);
        const matchCity = prop.city?.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchAddress && !matchCity) return false;
      }

      // Location search
      if (filters.location.trim()) {
        const loc = filters.location.toLowerCase();
        const matchCity = prop.city.toLowerCase().includes(loc);
        const matchState = prop.state.toLowerCase().includes(loc);
        const matchAddress = prop.address.toLowerCase().includes(loc);
        if (!matchCity && !matchState && !matchAddress) return false;
      }

      // Purpose (Buy/Rent)
      if (filters.purpose !== 'all' && prop.purpose !== filters.purpose) {
        return false;
      }

      // Property Type
      if (filters.type !== 'all' && prop.type.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }

      // Price Range
      if (filters.minPrice !== '' && prop.price < Number(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice !== '' && prop.price > Number(filters.maxPrice)) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'all') {
        const bedNum = Number(filters.bedrooms);
        if (filters.bedrooms === '5+' ? prop.bedrooms < 5 : prop.bedrooms !== bedNum) {
          return false;
        }
      }

      // Bathrooms
      if (filters.bathrooms !== 'all') {
        const bathNum = Number(filters.bathrooms);
        if (filters.bathrooms === '4+' ? prop.bathrooms < 4 : prop.bathrooms < bathNum) {
          return false;
        }
      }

      // Amenities (Must have all selected amenities)
      if (filters.amenities.length > 0) {
        const hasAll = filters.amenities.every((amenity) =>
          prop.amenities?.includes(amenity)
        );
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return (b.yearBuilt || 0) - (a.yearBuilt || 0);
      if (filters.sortBy === 'area-desc') return (b.area || 0) - (a.area || 0);
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [properties, filters]);

  // Saved Properties Objects
  const savedPropertiesList = useMemo(() => {
    return properties.filter((p) => favorites.includes(p.id));
  }, [properties, favorites]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        savedPropertiesList,
        favorites,
        toggleFavorite,
        isFavorite,
        comparedProperties,
        addToCompare,
        removeFromCompare,
        clearCompare,
        addProperty,
        deleteProperty,
        tourBookings,
        addTourBooking,
        inquiries,
        addInquiry,
        filters,
        setFilters,
        resetFilters
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
