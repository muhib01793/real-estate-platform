import { Link } from 'react-router-dom';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';

export default function CompareFloatingBar() {
  const { comparedProperties, removeFromCompare, clearCompare } = useProperties();

  if (comparedProperties.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-fade-in">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-3 sm:p-4 border border-slate-700/80 flex items-center justify-between gap-4">
        {/* Left Side: Thumbnail previews */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-amber-400 shrink-0">
            <Scale className="w-4 h-4" />
            <span>Compare ({comparedProperties.length}/4)</span>
          </div>

          <div className="flex items-center gap-2">
            {comparedProperties.map((prop) => (
              <div key={prop.id} className="relative group shrink-0">
                <img
                  src={prop.images?.[0]}
                  alt={prop.title}
                  className="w-11 h-11 rounded-lg object-cover border border-slate-600"
                />
                <button
                  onClick={() => removeFromCompare(prop.id)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-white text-[10px] hover:bg-rose-600 shadow-xs"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-slate-400 hover:text-white px-2 py-1.5 transition"
          >
            Clear
          </button>
          <Link
            to="/compare"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
