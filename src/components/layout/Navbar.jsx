import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Building2,
  Heart,
  Scale,
  PlusCircle,
  Menu,
  X,
  LayoutDashboard
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites, comparedProperties } = useProperties();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:bg-indigo-700 transition">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition">
                Havenly<span className="text-indigo-600">.</span>
              </span>
              <p className="text-[11px] font-medium tracking-wider uppercase text-slate-500 -mt-1">
                Luxury Real Estate
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Icons & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Compare Button */}
            <Link
              to="/compare"
              className="relative p-2.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition"
              title="Compare Properties"
            >
              <Scale className="w-5 h-5" />
              {comparedProperties.length > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-amber-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {comparedProperties.length}
                </span>
              )}
            </Link>

            {/* Saved / Favorites Button */}
            <Link
              to="/favorites"
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Dashboard */}
            <Link
              to="/dashboard"
              className="p-2.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition"
              title="Agent & Buyer Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
            </Link>

            {/* List Property CTA Button */}
            <Link
              to="/add-property"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-md shadow-indigo-600/25 hover:bg-indigo-700 active:scale-[0.98] transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Property</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/favorites"
              className="relative p-2 text-slate-700"
              title="Saved"
            >
              <Heart className="w-6 h-6" />
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-hidden"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 text-base font-medium rounded-lg ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
            >
              <LayoutDashboard className="w-5 h-5 text-indigo-600" />
              Dashboard
            </Link>
            <Link
              to="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-500" />
                Compare Properties
              </div>
              {comparedProperties.length > 0 && (
                <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-800 font-bold rounded-full">
                  {comparedProperties.length}
                </span>
              )}
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/add-property"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
            >
              <PlusCircle className="w-5 h-5" />
              <span>List Your Property</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
