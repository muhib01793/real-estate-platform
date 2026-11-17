import { useForm } from 'react-hook-form';
import { Phone, Mail, Star, MessageSquare, Send, Calendar } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';

export default function ContactAgentCard({ property, onOpenTourModal }) {
  const { addInquiry } = useProperties();
  const agent = property?.agent || {
    name: 'Elena Rostova',
    agency: 'Havenly Luxury Estates',
    phone: '+1 (310) 555-0192',
    email: 'elena.rostova@havenly.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    reviewCount: 42
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: `Hello, I am interested in "${property?.title || 'this property'}" and would like to receive additional details.`
    }
  });

  const onSubmit = (data) => {
    addInquiry({
      propertyId: property?.id,
      propertyTitle: property?.title,
      agentName: agent.name,
      ...data
    });
    reset({
      name: '',
      email: '',
      phone: '',
      message: `Hello, I am interested in "${property?.title || 'this property'}".`
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sticky top-28 space-y-6">
      {/* Agent Profile Header */}
      <div className="flex items-center gap-4">
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-100 shadow-sm shrink-0"
        />
        <div className="overflow-hidden">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block">
            Listing Agent
          </span>
          <h4 className="text-lg font-bold text-slate-900 truncate">{agent.name}</h4>
          <p className="text-xs text-slate-500 truncate">{agent.agency}</p>
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-slate-800">{agent.rating}</span>
            <span className="text-slate-400">({agent.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${agent.phone}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white text-xs font-semibold text-slate-700 transition"
        >
          <Phone className="w-3.5 h-3.5 text-indigo-600" />
          <span>Call Agent</span>
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white text-xs font-semibold text-slate-700 transition"
        >
          <Mail className="w-3.5 h-3.5 text-indigo-600" />
          <span>Email</span>
        </a>
      </div>

      {/* Tour CTA */}
      {onOpenTourModal && (
        <button
          type="button"
          onClick={onOpenTourModal}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition active:scale-[0.98]"
        >
          <Calendar className="w-4 h-4 text-indigo-400" />
          <span>Schedule Private Tour</span>
        </button>
      )}

      {/* Inquiry Form */}
      <div className="pt-4 border-t border-slate-100">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
          Send Direct Message
        </h5>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
            />
            {errors.name && (
              <p className="text-rose-500 text-[11px] mt-0.5">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
              })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
            />
            {errors.email && (
              <p className="text-rose-500 text-[11px] mt-0.5">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Your Phone Number"
              {...register('phone', { required: 'Phone is required' })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
            />
            {errors.phone && (
              <p className="text-rose-500 text-[11px] mt-0.5">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <textarea
              rows={3}
              {...register('message', { required: 'Message cannot be empty' })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600 resize-none"
            />
            {errors.message && (
              <p className="text-rose-500 text-[11px] mt-0.5">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition active:scale-[0.98]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}
