import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="text-center max-w-lg bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
        <span className="text-6xl font-black text-indigo-600 tracking-tight block mb-2">
          404
        </span>
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          Page Not Found
        </h2>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          The property, page, or resource you are seeking doesn't exist or has been relocated to another address.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/properties"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition"
          >
            <Search className="w-4 h-4" />
            <span>Explore Properties</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
