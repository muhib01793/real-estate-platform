import MortgageCalculator from '../components/property/MortgageCalculator';
import { Calculator, HelpCircle, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MortgageCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial Planning Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Mortgage Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Calculate your monthly mortgage payments, adjust interest rates, and evaluate how down payments impact your long-term interest costs.
          </p>
        </div>

        {/* The Calculator */}
        <MortgageCalculator defaultPrice={1850000} />

        {/* Educational / Explanatory Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5 font-bold" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">1. Principal & Interest</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              The principal pays down the balance you borrowed, while the interest pays your lender for financing the loan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 font-bold" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">2. Property Taxes & Insurance</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Usually held in an escrow account and paid yearly on your behalf for municipal governance and hazard coverage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <HelpCircle className="w-5 h-5 font-bold" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">3. HOA & Maintenance</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Condominiums and gated luxury communities maintain common areas, security desks, pools, and shared elevators.
            </p>
          </div>
        </div>

        {/* CTA to Properties */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              Ready to find homes in your price range?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Filter verified properties by exact monthly budget and specifications.
            </p>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm shadow-md transition shrink-0"
          >
            <span>Search Properties Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
