import { useMemo } from 'react';
import { useProperties } from '../../context/PropertyContext';
import PropertyCard from '../common/PropertyCard';
import { Sparkles } from 'lucide-react';

export default function SimilarProperties({ currentProperty }) {
  const { properties } = useProperties();

  const similarList = useMemo(() => {
    if (!currentProperty) return [];
    return properties
      .filter(
        (p) =>
          p.id !== currentProperty.id &&
          (p.type === currentProperty.type || p.city === currentProperty.city)
      )
      .slice(0, 3);
  }, [properties, currentProperty]);

  if (similarList.length === 0) return null;

  return (
    <div className="pt-12 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Recommendations
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Similar Properties You May Like
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarList.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
