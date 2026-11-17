import { Link } from 'react-router-dom';
import { PlusCircle, PhoneCall } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-14 overflow-hidden shadow-2xl">
          {/* Subtle Decorative Elements */}
          <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -top-12 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 block mb-3">
              Direct Property Marketplace
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Are You a Homeowner or Developer?
            </h2>
            <p className="text-slate-200 text-base sm:text-lg mb-8 leading-relaxed font-normal">
              List your property on Havenly to reach qualified high-net-worth buyers and renters worldwide with zero upfront listing fees.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/add-property"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-xl hover:bg-slate-100 active:scale-95 transition"
              >
                <PlusCircle className="w-4 h-4 text-indigo-600" />
                <span>List Your Property Free</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold text-sm transition"
              >
                <PhoneCall className="w-4 h-4 text-indigo-300" />
                <span>Speak with an Advisor</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
