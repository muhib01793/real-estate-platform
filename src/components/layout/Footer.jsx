import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  Award
} from 'lucide-react';
import { toast } from 'react-toastify';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Thank you for subscribing to Havenly Exclusive Insights!');
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Havenly<span className="text-indigo-400">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Discover verified architectural masterpieces, luxury residences, and premium commercial investments across the most coveted destinations worldwide.
            </p>
            <div className="space-y-2 pt-2 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>450 Lexington Avenue, Suite 2200, New York, NY 10017</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+1 (800) 555-4283 (Mon-Sun: 8am - 8pm EST)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>concierge@havenly.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/properties" className="hover:text-white transition">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/properties?purpose=sale" className="hover:text-white transition">
                  Homes for Sale
                </Link>
              </li>
              <li>
                <Link to="/properties?purpose=rent" className="hover:text-white transition">
                  Luxury Rentals
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-white transition">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition">
                  Compare Listings
                </Link>
              </li>
              <li>
                <Link to="/add-property" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
                  + List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Top Locations
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/properties?location=Malibu" className="hover:text-white transition">
                  Malibu, California
                </Link>
              </li>
              <li>
                <Link to="/properties?location=New%20York" className="hover:text-white transition">
                  New York, Manhattan
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Beverly%20Hills" className="hover:text-white transition">
                  Beverly Hills, CA
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Miami" className="hover:text-white transition">
                  Miami & Brickell
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Austin" className="hover:text-white transition">
                  Austin, Texas
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Aspen" className="hover:text-white transition">
                  Aspen, Colorado
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Market Intelligence
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive curated off-market luxury listings, quarterly price indices, and architecture features.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-3 pr-10 py-2.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center justify-center transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Privacy
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Verified Data
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Havenly Real Estate Technologies, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-300 transition">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition">
              Contact & Support
            </Link>
            <span className="hover:text-slate-300 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-slate-300 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
