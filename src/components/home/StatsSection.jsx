import { platformStats } from '../../data/testimonialsData';

export default function StatsSection() {
  return (
    <section className="py-12 bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-indigo-500/50">
          {platformStats.map((stat, idx) => (
            <div key={stat.label} className={idx > 0 ? 'pt-6 lg:pt-0' : ''}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-indigo-100">{stat.label}</div>
              <div className="text-xs text-indigo-200 mt-0.5">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
