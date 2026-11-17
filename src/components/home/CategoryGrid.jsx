import { useNavigate } from 'react-router-dom';
import { useProperties } from '../../context/PropertyContext';
import { ArrowRight, Palmtree, Sparkles, Building2, Home, Layers, Briefcase } from 'lucide-react';

export default function CategoryGrid() {
  const navigate = useNavigate();
  const { setFilters } = useProperties();

  const categories = [
    {
      title: 'Ultra-Luxury Villas',
      type: 'Villa',
      count: '142 Properties',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      icon: Palmtree,
      description: 'Private infinity pools, gated grounds, and coastal views.'
    },
    {
      title: 'Skyline Penthouses',
      type: 'Penthouse',
      count: '86 Properties',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      icon: Sparkles,
      description: 'Double-height ceilings and panoramic city light terraces.'
    },
    {
      title: 'Architectural Houses',
      type: 'House',
      count: '320 Properties',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      icon: Home,
      description: 'Modern cantilevered estates with resort-style living.'
    },
    {
      title: 'Prime Apartments',
      type: 'Apartment',
      count: '510 Properties',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      icon: Building2,
      description: 'Centrally located residences with five-star club amenities.'
    },
    {
      title: 'Historic Townhouses',
      type: 'Townhouse',
      count: '95 Properties',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
      icon: Layers,
      description: 'Restored brownstones with private landscaped courtyards.'
    },
    {
      title: 'Commercial Assets',
      type: 'Commercial',
      count: '64 Properties',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      icon: Briefcase,
      description: 'LEED certified corporate headquarters and tech campuses.'
    }
  ];

  const handleSelectCategory = (type) => {
    setFilters((prev) => ({
      ...prev,
      type
    }));
    navigate('/properties');
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
              Curated Portfolios
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore by Architectural Style
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-md mt-3 md:mt-0">
            From hillside modernist villas to prime urban duplexes, discover real estate matched to your exacting aesthetic standards.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                onClick={() => handleSelectCategory(cat.type)}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/90 transition-colors" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.count}</span>
                </div>

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                    {cat.description}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-1 transition">
                    <span>Browse Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
