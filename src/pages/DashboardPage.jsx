import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/common/PropertyCard';
import {
  LayoutDashboard,
  Building2,
  Heart,
  Calendar,
  MessageSquare,
  PlusCircle,
  Trash2,
  Clock,
  UserCheck
} from 'lucide-react';

export default function DashboardPage() {
  const { properties, deleteProperty, savedPropertiesList, tourBookings, inquiries } =
    useProperties();
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'tours' | 'inquiries' | 'saved'

  // Listings owned or added by user
  const myListings = properties.filter((p) => p.agent?.agency === 'Direct Owner Listing' || p.id.startsWith('prop-'));

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <LayoutDashboard className="w-4 h-4" />
              <span>Management Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Client & Owner Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track your property listings, scheduled tours, and broker inquiries in one place.
            </p>
          </div>

          <Link
            to="/add-property"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ List New Property</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            onClick={() => setActiveTab('listings')}
            className={`p-5 rounded-2xl border cursor-pointer transition ${
              activeTab === 'listings'
                ? 'bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Available Listings</span>
              <Building2 className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{myListings.length}</div>
          </div>

          <div
            onClick={() => setActiveTab('tours')}
            className={`p-5 rounded-2xl border cursor-pointer transition ${
              activeTab === 'tours'
                ? 'bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Booked Tours</span>
              <Calendar className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{tourBookings.length}</div>
          </div>

          <div
            onClick={() => setActiveTab('inquiries')}
            className={`p-5 rounded-2xl border cursor-pointer transition ${
              activeTab === 'inquiries'
                ? 'bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Sent Inquiries</span>
              <MessageSquare className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{inquiries.length}</div>
          </div>

          <div
            onClick={() => setActiveTab('saved')}
            className={`p-5 rounded-2xl border cursor-pointer transition ${
              activeTab === 'saved'
                ? 'bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Saved Homes</span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">{savedPropertiesList.length}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 mb-6 flex gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'listings'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Manage Listings ({myListings.length})
          </button>
          <button
            onClick={() => setActiveTab('tours')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'tours'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Tour Appointments ({tourBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'inquiries'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'saved'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Saved ({savedPropertiesList.length})
          </button>
        </div>

        {/* Tab 1: Listings */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            {myListings.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
                <p className="text-slate-500 text-sm mb-4">You have no active listings.</p>
                <Link
                  to="/add-property"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  Create Your First Listing
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map((prop) => (
                  <div key={prop.id} className="relative group">
                    <PropertyCard property={prop} />
                    <button
                      onClick={() => deleteProperty(prop.id)}
                      className="absolute top-3 right-14 z-20 p-2 rounded-full bg-white/90 text-rose-600 hover:bg-rose-600 hover:text-white transition shadow-md"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Booked Tours */}
        {activeTab === 'tours' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            {tourBookings.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm">
                No tour appointments scheduled yet. Schedule one on any property details page!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {tourBookings.map((tour) => (
                  <div key={tour.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {tour.propertyImage && (
                        <img
                          src={tour.propertyImage}
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                      )}
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase bg-indigo-50 text-indigo-700 mb-1">
                          {tour.tourType === 'video' ? 'Live Video Tour' : 'In-Person Tour'}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base">{tour.propertyTitle}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-indigo-600" /> {tour.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-indigo-600" /> {tour.timeSlot}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right sm:self-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <UserCheck className="w-3.5 h-3.5" /> Confirmed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            {inquiries.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm">
                No message inquiries sent yet. Reach out to agents from any listing page!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        Inquiry regarding: <span className="text-indigo-600">{inq.propertyTitle}</span>
                      </h4>
                      <span className="text-xs text-slate-400">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Sent to Agent: <strong>{inq.agentName}</strong>
                    </p>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                      "{inq.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Saved */}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPropertiesList.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
