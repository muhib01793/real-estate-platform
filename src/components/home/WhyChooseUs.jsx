import { ShieldCheck, TrendingUp, Headphones, Video, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Verified Title & Due Diligence',
      description: 'Every listing on Havenly undergoes stringent deed authentication, structural audits, and legal verification.'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Financial & Valuation Intelligence',
      description: 'Real-time neighborhood comps, historical capital appreciation indices, and rental yield forecasting.'
    },
    {
      icon: Headphones,
      title: 'Dedicated White-Glove Advisory',
      description: 'Personalized guidance from licensed senior brokers who understand high-net-worth real estate transactions.'
    },
    {
      icon: Video,
      title: '4K Immersive Tours & Drone Surveys',
      description: 'Inspect properties from anywhere across the globe with interactive spatial walkthroughs.'
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text & Benefits */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-2">
                The Havenly Standard
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Designed for Discerning Buyers & Elite Property Owners.
              </h2>
              <p className="text-slate-300 text-base mt-4 leading-relaxed">
                We combine industry-leading data analytics with tailored concierge advisory to eliminate friction in modern real estate acquisition.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{b.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{b.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Home Interior"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />

              {/* Floating Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-white">$3.2 Billion+</div>
                  <div className="text-xs text-slate-300">Transaction volume executed</div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Closed Cleanly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
