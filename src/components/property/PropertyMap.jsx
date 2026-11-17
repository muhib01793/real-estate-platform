import { useState } from 'react';
import {
  MapPin,
  Navigation,
  School,
  Train,
  ShoppingBag,
  Coffee,
  Hospital,
  ZoomIn,
  ZoomOut,
  ExternalLink
} from 'lucide-react';

export default function PropertyMap({ property, height = 'h-96' }) {
  const [activeLayer, setActiveLayer] = useState('streets'); // 'streets' | 'satellite'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activePoiFilter, setActivePoiFilter] = useState('all');

  const { city = 'City', state = 'State', address = 'Address' } = property || {};

  // Nearby points of interest
  const pois = [
    { name: 'Montessori Elementary Academy', type: 'school', distance: '0.4 mi', icon: School },
    { name: 'Metro Express Transit Hub', type: 'transit', distance: '0.8 mi', icon: Train },
    { name: 'Whole Foods & Organic Market', type: 'shopping', distance: '0.6 mi', icon: ShoppingBag },
    { name: 'Artisan Coffee Roasters', type: 'dining', distance: '0.3 mi', icon: Coffee },
    { name: 'Regional Medical Center', type: 'health', distance: '1.2 mi', icon: Hospital }
  ];

  const filteredPois =
    activePoiFilter === 'all'
      ? pois
      : pois.filter((p) => p.type === activePoiFilter);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address}, ${city}, ${state}`
  )}`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Map Control Bar */}
      <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Interactive Location & Neighborhood</h4>
            <p className="text-xs text-slate-400">
              {address}, {city}, {state}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Layer switcher */}
          <div className="flex bg-slate-800 rounded-lg p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveLayer('streets')}
              className={`px-2.5 py-1 rounded-md transition ${
                activeLayer === 'streets' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-300'
              }`}
            >
              Streets
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('satellite')}
              className={`px-2.5 py-1 rounded-md transition ${
                activeLayer === 'satellite' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-300'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* External Google Maps Link */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition"
          >
            <span>Open Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Map Canvas / Simulated Visual Vector Map */}
      <div className={`relative ${height} w-full overflow-hidden select-none ${
        activeLayer === 'satellite' ? 'bg-slate-950' : 'bg-slate-100'
      }`}>
        {/* Vector Map Illustration */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* SVG Map Grid and Roads */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke={activeLayer === 'satellite' ? '#1e293b' : '#e2e8f0'}
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />

            {/* Simulated River / Waterway */}
            <path
              d="M 0 180 Q 200 240 400 190 T 800 220 T 1200 170"
              fill="none"
              stroke={activeLayer === 'satellite' ? '#0369a1' : '#bae6fd'}
              strokeWidth="24"
              strokeLinecap="round"
            />

            {/* Roads */}
            <path
              d="M 50 0 L 50 600 M 280 0 L 280 600 M 550 0 L 550 600 M 820 0 L 820 600"
              stroke={activeLayer === 'satellite' ? '#334155' : '#cbd5e1'}
              strokeWidth="14"
            />
            <path
              d="M 0 100 L 1200 100 M 0 280 L 1200 280 M 0 440 L 1200 440"
              stroke={activeLayer === 'satellite' ? '#334155' : '#cbd5e1'}
              strokeWidth="14"
            />

            {/* Main Avenue */}
            <path
              d="M 0 350 Q 300 260 600 350 T 1200 320"
              fill="none"
              stroke={activeLayer === 'satellite' ? '#475569' : '#f8fafc'}
              strokeWidth="18"
              strokeDasharray="4 2"
            />
          </svg>

          {/* Center Property Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group">
            <div className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xl flex items-center gap-1.5 animate-bounce">
              <MapPin className="w-3.5 h-3.5 fill-current" />
              <span>{property?.title || 'Selected Property'}</span>
            </div>
            <div className="w-4 h-4 bg-indigo-600 rotate-45 -mt-2 shadow-md" />
            <div className="w-8 h-2.5 bg-black/25 rounded-full blur-xs mt-1" />
          </div>

          {/* Neighborhood POI pins */}
          {filteredPois.map((poi, idx) => {
            const positions = [
              { top: '35%', left: '38%' },
              { top: '65%', left: '60%' },
              { top: '40%', left: '68%' },
              { top: '60%', left: '32%' },
              { top: '25%', left: '55%' }
            ];
            const pos = positions[idx % positions.length];
            const Icon = poi.icon;

            return (
              <div
                key={poi.name}
                style={pos}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-200 shadow-md text-[11px] font-medium text-slate-800"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate max-w-[110px]">{poi.name}</span>
                <span className="text-[10px] font-bold text-indigo-600">({poi.distance})</span>
              </div>
            );
          })}
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2))}
            className="p-2 hover:bg-slate-100 text-slate-700 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-200" />
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
            className="p-2 hover:bg-slate-100 text-slate-700 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* POI category filter bar */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-200/80 text-xs">
          <button
            type="button"
            onClick={() => setActivePoiFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              activePoiFilter === 'all'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActivePoiFilter('school')}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              activePoiFilter === 'school'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Schools
          </button>
          <button
            type="button"
            onClick={() => setActivePoiFilter('transit')}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              activePoiFilter === 'transit'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Transit
          </button>
          <button
            type="button"
            onClick={() => setActivePoiFilter('dining')}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              activePoiFilter === 'dining'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dining
          </button>
        </div>
      </div>
    </div>
  );
}
