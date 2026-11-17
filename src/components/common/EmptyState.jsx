import { SearchX } from 'lucide-react';

export default function EmptyState({
  title = 'No properties found',
  description = 'Try adjusting your search criteria, clearing some filters, or exploring our suggested categories.',
  actionText = 'Reset Filters',
  onAction,
  icon: Icon = SearchX
}) {
  return (
    <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-300 max-w-xl mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
