import { agentsList } from '../../src/data/testimonialsData';
import { Sparkles, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Havenly</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Redefining High-End Real Estate Through Architecture & Intelligence.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Founded with an uncompromising commitment to architectural distinction, Havenly serves as the global destination for buying, leasing, and representing the finest residences.
          </p>
        </div>

        {/* Narrative / Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
              alt="Havenly Architecture"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
                Established 2018
              </span>
              <h4 className="text-xl font-bold">New York • Los Angeles • Miami • London</h4>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              A Bespoke Platform Built on Integrity & Architectural Legacy.
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Traditional real estate is often burdened by disjointed data, opaque listings, and transactional brokers. Havenly was conceived as the antidote: a curated tech-forward marketplace that pairs vetted architectural pedigree with transparent financial intelligence.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Whether you are acquiring a coastal estate in Malibu or expanding an institutional commercial portfolio in Manhattan, our concierge team works hand-in-godd glove with you until close.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <div className="text-2xl font-black text-indigo-600">$3.2B+</div>
                <div className="text-xs text-slate-500 font-medium">Closed Volume</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <div className="text-2xl font-black text-indigo-600">99.4%</div>
                <div className="text-xs text-slate-500 font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Managing Partners & Agents */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
              Executive Leadership
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Meet Our Senior Partners
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Licensed broker authorities with decades of combined transaction advisory in prime markets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agentsList.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 text-center"
              >
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4 border-2 border-indigo-100 shadow-sm"
                />
                <h4 className="text-lg font-bold text-slate-900">{agent.name}</h4>
                <p className="text-xs text-indigo-600 font-semibold mb-3">{agent.title}</p>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                  {agent.bio}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>{agent.soldCount} Sold</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-slate-900">{agent.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
