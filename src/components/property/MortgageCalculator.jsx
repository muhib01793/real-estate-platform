import { useState, useMemo } from 'react';
import { Calculator, Percent } from 'lucide-react';

export default function MortgageCalculator({ defaultPrice = 1200000 }) {
  const [homePrice, setHomePrice] = useState(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2); // % per year
  const [homeInsurance, setHomeInsurance] = useState(1200); // $ per year
  const [hoaFee, setHoaFee] = useState(250); // $ per month

  // Calculated values
  const downPaymentAmount = useMemo(() => {
    return (homePrice * downPaymentPercent) / 100;
  }, [homePrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return Math.max(0, homePrice - downPaymentAmount);
  }, [homePrice, downPaymentAmount]);

  const monthlyPrincipalAndInterest = useMemo(() => {
    if (loanAmount <= 0) return 0;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    if (monthlyRate === 0) return loanAmount / totalPayments;

    const payment =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    return isNaN(payment) ? 0 : payment;
  }, [loanAmount, interestRate, loanTermYears]);

  const monthlyPropertyTax = useMemo(() => {
    return (homePrice * (propertyTaxRate / 100)) / 12;
  }, [homePrice, propertyTaxRate]);

  const monthlyInsurance = useMemo(() => {
    return homeInsurance / 12;
  }, [homeInsurance]);

  const totalMonthlyPayment = useMemo(() => {
    return Math.round(
      monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance + Number(hoaFee || 0)
    );
  }, [monthlyPrincipalAndInterest, monthlyPropertyTax, monthlyInsurance, hoaFee]);

  // Breakdown percentages
  const piPercent = totalMonthlyPayment > 0 ? (monthlyPrincipalAndInterest / totalMonthlyPayment) * 100 : 0;
  const taxPercent = totalMonthlyPayment > 0 ? (monthlyPropertyTax / totalMonthlyPayment) * 100 : 0;
  const insPercent = totalMonthlyPayment > 0 ? (monthlyInsurance / totalMonthlyPayment) * 100 : 0;
  const hoaPercent = totalMonthlyPayment > 0 ? (Number(hoaFee || 0) / totalMonthlyPayment) * 100 : 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <Calculator className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Mortgage & Payment Estimator
          </h3>
          <p className="text-xs text-slate-500">
            Estimate your monthly mortgage payments and financing breakdown
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Home Price Input & Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">Home Price</label>
              <span className="text-sm font-bold text-slate-900">
                ${homePrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={15000000}
              step={25000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
            />
          </div>

          {/* Down Payment (% and $) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-sm font-bold text-indigo-600">
                ${Math.round(downPaymentAmount).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
            />
          </div>

          {/* Interest Rate & Loan Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Interest Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="15"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full pl-3 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                />
                <Percent className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Loan Term
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600 cursor-pointer"
              >
                <option value={30}>30 Years (Fixed)</option>
                <option value={20}>20 Years (Fixed)</option>
                <option value={15}>15 Years (Fixed)</option>
                <option value={10}>10 Years (Fixed)</option>
              </select>
            </div>
          </div>

          {/* Taxes & HOA */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Property Tax (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Insurance ($/yr)
              </label>
              <input
                type="number"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                HOA Fees ($/mo)
              </label>
              <input
                type="number"
                value={hoaFee}
                onChange={(e) => setHoaFee(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Calculation Output Card */}
        <div className="lg:col-span-5 bg-linear-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-indigo-300 font-semibold mb-1">
              Estimated Monthly Payment
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              ${totalMonthlyPayment.toLocaleString()}
              <span className="text-sm font-normal text-slate-300"> / month</span>
            </div>

            {/* Visual stacked bar */}
            <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex mb-6">
              <div
                style={{ width: `${piPercent}%` }}
                className="bg-indigo-500 transition-all duration-300"
                title={`Principal & Interest: ${Math.round(piPercent)}%`}
              />
              <div
                style={{ width: `${taxPercent}%` }}
                className="bg-sky-400 transition-all duration-300"
                title={`Property Tax: ${Math.round(taxPercent)}%`}
              />
              <div
                style={{ width: `${insPercent}%` }}
                className="bg-amber-400 transition-all duration-300"
                title={`Home Insurance: ${Math.round(insPercent)}%`}
              />
              <div
                style={{ width: `${hoaPercent}%` }}
                className="bg-rose-400 transition-all duration-300"
                title={`HOA Dues: ${Math.round(hoaPercent)}%`}
              />
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-slate-300">Principal & Interest</span>
                </span>
                <span className="font-bold text-white">
                  ${Math.round(monthlyPrincipalAndInterest).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className="text-slate-300">Property Taxes</span>
                </span>
                <span className="font-bold text-white">
                  ${Math.round(monthlyPropertyTax).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-slate-300">Homeowners Insurance</span>
                </span>
                <span className="font-bold text-white">
                  ${Math.round(monthlyInsurance).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="text-slate-300">HOA & Maintenance</span>
                </span>
                <span className="font-bold text-white">
                  ${Math.round(Number(hoaFee || 0)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Loan Amount: ${loanAmount.toLocaleString()}</span>
            <span>Total Payments: {loanTermYears * 12} mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
