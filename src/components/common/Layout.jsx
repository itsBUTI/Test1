import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Instagram, Facebook, Menu, X, Phone, Clock3, MapPin } from 'lucide-react';
import logo from '/src/images/autosallon-logo.jpg';

const navLinks = [
  { href: '/', label: 'Ballina' },
  { href: '/cars', label: 'Vetura' },
  { href: '/about', label: 'Rreth Nesh' },
  { href: '/contact', label: 'Kontakti' },
];

const navLinkClassName = ({ isActive }) =>
  `relative text-sm font-medium transition-colors after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[#6B0F0F] after:transition-transform ${
    isActive
      ? 'text-[#6B0F0F] after:scale-x-100'
      : 'text-[#3f3f3f] hover:text-[#6B0F0F] hover:after:scale-x-100'
  }`;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-black/5 bg-white/86 shadow-[0_16px_40px_rgba(17,17,17,0.08)] backdrop-blur-xl'
          : 'bg-white/64 backdrop-blur-lg'
      }`}
    >
      <nav className="site-container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Auto Salloni BMW" className="h-12 w-12 rounded-full object-cover shadow-md" />
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#6B0F0F]">
              Auto Salloni BMW
            </p>
            <p className="text-sm font-medium text-[#2b2b2b]">Prizren</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} to={link.href} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex">
          <Link to="/contact" className="btn-primary">
            Kontakto sot
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[#2b2b2b] shadow-sm transition-colors hover:border-[#6B0F0F]/30 hover:text-[#6B0F0F] md:hidden"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-black/5 bg-white/95 shadow-[0_20px_44px_rgba(17,17,17,0.08)] backdrop-blur-xl md:hidden">
          <div className="site-container space-y-3 py-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#f6eaea] text-[#6B0F0F]'
                      : 'text-[#3f3f3f] hover:bg-[#f6eaea] hover:text-[#6B0F0F]'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="btn-primary mt-2 inline-flex w-full items-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontakto sot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 bg-[#111111] text-[#d8d8d8]">
      <div className="site-container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.9fr_0.9fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Auto Salloni BMW" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c6a96b]">
                  Auto Salloni BMW
                </p>
                <p className="text-base font-medium text-white">Prizren</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#a8a8a8]">
              Automjete premium me udhëzim të besueshëm showroom-i dhe përvojë rafinëse të blerjes për shoferët që vlerësojnë cilësinë, transparencën dhe stilin.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f5f5f5] transition-colors hover:border-[#c6a96b]/40 hover:text-[#c6a96b]"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f5f5f5] transition-colors hover:border-[#c6a96b]/40 hover:text-[#c6a96b]"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Zgjidhni</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#a8a8a8]">
              <li><Link to="/" className="transition-colors hover:text-white">Ballina</Link></li>
              <li><Link to="/cars" className="transition-colors hover:text-white">Vetura</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-white">Rreth Nesh</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-white">Kontakti</Link></li>
            </ul>
          </div>

          <div className="space-y-4 text-sm text-[#a8a8a8]">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Kontakti</h3>
            <div className="flex items-start gap-3">
              <Phone size={16} className="mt-1 text-[#c6a96b]" />
              <div className="space-y-1">
                <a href="tel:+38344316881" className="block hover:text-white">
                  +383 (0) 44 316 881
                </a>
                <a href="tel:+38349316881" className="block hover:text-white">
                  +383 (0) 49 316 881
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 text-[#c6a96b]" />
              <p className="text-[#a8a8a8]">
                Rruga e Tiranës 18
                <br />
                Prizren 20000, Kosovë
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[#a8a8a8]">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Orari i punës</h3>
            <div className="flex items-start gap-3">
              <Clock3 size={16} className="mt-1 text-[#c6a96b]" />
              <div className="space-y-2">
                <p className="text-[#a8a8a8]">Hënë - Premte: 09:00 - 18:00</p>
                <p className="text-[#a8a8a8]">Shtunë: 10:00 - 16:00</p>
                <p className="text-[#a8a8a8]">Diel: Me porosi</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#8f8f8f] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Auto Salloni BMW – Prizren. Të gjitha të drejtat e rezervuara.</p>
          <p>Përvojë luksozë e showroom-it automobilistik për automjete premium.</p>
        </div>
      </div>
    </footer>
  );
}

export function StickyButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-40 md:hidden">
      <Link to="/contact" className="btn-primary px-5 py-3 shadow-[0_18px_34px_rgba(107,15,15,0.24)]">
        Kontakto
      </Link>
    </div>
  );
}
