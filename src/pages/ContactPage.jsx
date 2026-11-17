import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = () => {
    toast.success('Your message has been received! Our concierge team will reply within 2 hours.');
    reset();
  };

  const faqs = [
    {
      q: 'What makes Havenly different from standard listing aggregators?',
      a: 'Havenly is a closed-loop luxury marketplace where every single listing is legally authenticated with local land registries, title audits, and verified high-resolution photography before going live.'
    },
    {
      q: 'Does Havenly charge any upfront listing or onboarding fees?',
      a: 'No. Property owners and developers can list their properties with zero upfront listing charges. Standard transaction representation fees are applied only upon successful escrow closing.'
    },
    {
      q: 'Can I schedule private virtual walkthroughs if I am outside the country?',
      a: 'Absolutely. We offer live 4K agent-guided video tours with interactive 3D floor plan review for domestic and international high-net-worth clients.'
    },
    {
      q: 'How are escrow deposits and contracts handled?',
      a: 'All transactions proceed through licensed third-party title and escrow companies in full compliance with local state and federal regulatory frameworks.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Concierge Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Connect With Our Advisors
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Our luxury real estate specialists are on standby to assist with property acquisition, private representations, or market appraisals.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white">Direct Advisory Desk</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Reach out directly via phone or email for confidential inquiries or off-market portfolio inquiries.
              </p>

              <div className="space-y-4 pt-2 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Global Headquarters</div>
                    <div className="text-slate-400 text-xs">
                      450 Lexington Avenue, Suite 2200, New York, NY 10017
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Direct Line</div>
                    <div className="text-slate-400 text-xs">+1 (800) 555-4283</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Private Inquiries</div>
                    <div className="text-slate-400 text-xs">concierge@havenly.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Advisory Desk Hours</div>
                    <div className="text-slate-400 text-xs">Monday – Sunday: 8:00 AM – 8:00 PM EST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office locations preview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs">
                Key Regional Offices
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 font-medium">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900">Manhattan, NY</div>
                  <div>Midtown East</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900">Beverly Hills, CA</div>
                  <div>Rodeo Collection</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900">Miami, FL</div>
                  <div>Brickell Arch</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900">Austin, TX</div>
                  <div>Downtown Congress</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Send an Advisory Request</h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your contact info and our senior advisory partners will follow up with you.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                  />
                  {errors.firstName && (
                    <p className="text-rose-500 text-xs mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                  />
                  {errors.lastName && (
                    <p className="text-rose-500 text-xs mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
                    })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                  />
                  {errors.email && (
                    <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Topic of Interest
                </label>
                <select
                  {...register('topic')}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                >
                  <option value="buy">Buying a Luxury Property</option>
                  <option value="sell">Listing / Selling a Property</option>
                  <option value="rent">Luxury Rental Inquiries</option>
                  <option value="commercial">Commercial & Development Opportunities</option>
                  <option value="media">Press & Media Relations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  {...register('message', { required: 'Message cannot be empty' })}
                  placeholder="Provide any details about location preferences, budget, or timeline..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                />
                {errors.message && (
                  <p className="text-rose-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="pt-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Common answers regarding our vetting process, escrow security, and representation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-indigo-600 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
