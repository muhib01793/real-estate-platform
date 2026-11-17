import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Calendar, Video, UserCheck, CheckCircle2 } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';

const getTomorrowDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const getTodayDate = () => new Date().toISOString().split('T')[0];

export default function TourScheduleModal({ property, isOpen, onClose }) {
  const { addTourBooking } = useProperties();
  const [tourType, setTourType] = useState('in-person'); // 'in-person' | 'video'
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM');

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
      date: getTomorrowDate(),
      notes: ''
    }
  });

  if (!isOpen || !property) return null;

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM'
  ];

  const onSubmit = (data) => {
    addTourBooking({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.images?.[0],
      tourType,
      timeSlot: selectedTimeSlot,
      ...data
    });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              Schedule a Private Tour
            </h3>
            <p className="text-xs text-slate-300 truncate max-w-sm mt-0.5">
              {property.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Tour Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tour Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTourType('in-person')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold transition ${
                  tourType === 'in-person'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>In-Person Walkthrough</span>
              </button>
              <button
                type="button"
                onClick={() => setTourType('video')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold transition ${
                  tourType === 'video'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Live Video Tour</span>
              </button>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Preferred Date
            </label>
            <input
              type="date"
              min={getTodayDate()}
              {...register('date', { required: 'Please select a date' })}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
            />
            {errors.date && (
              <p className="text-rose-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Time Window
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`py-2 px-1 text-xs font-semibold rounded-lg border transition ${
                    selectedTimeSlot === slot
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. David Harrison"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
              />
              {errors.name && (
                <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="david@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email format'
                    }
                  })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
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
                  placeholder="+1 (555) 000-0000"
                  {...register('phone', { required: 'Phone is required' })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600"
                />
                {errors.phone && (
                  <p className="text-rose-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Special Requests or Questions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Any specific rooms or questions you want to focus on?"
                {...register('notes')}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-600 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-indigo-600/20 transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Appointment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
