import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Share2, Mail } from 'lucide-react';
import SSMonogram from '../assets/SSMonogram';

/**
 * Responsive Navbar for Mobile, Tablet, and Desktop
 */
export default function Navbar({
  couple,
  activeSection,
  isMusicPlaying,
  onToggleMusic,
  onOpenShare,
  onOpenEnvelope,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'ಆಮಂತ್ರಣ (Patrika)', href: '#kannada-invitation' },
    { label: 'Our Story', href: '#story' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Venue', href: '#venue' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 select-none ${
          isScrolled
            ? 'bg-[#FAF6EF]/95 backdrop-blur-md shadow-sm border-b border-gold/30'
            : 'bg-gradient-to-b from-[#181310]/85 via-[#181310]/45 to-transparent text-white'
        }`}
      >
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] flex items-center justify-between">
          {/* Logo Brand: Vector SSMonogram */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 group min-h-[44px] py-1 cursor-pointer"
            aria-label="Sahana and Sameep Home"
          >
            <SSMonogram size={34} variant="gold" />
            <div className="flex flex-col">
              <span
                className={`font-serif text-sm sm:text-base tracking-[0.18em] font-semibold uppercase leading-none transition-colors ${
                  isScrolled ? 'text-charcoal-deep' : 'text-white drop-shadow-sm'
                }`}
              >
                Sahana &amp; Sameep
              </span>
              <span
                className={`text-[9.5px] uppercase tracking-widest font-sans transition-colors mt-0.5 ${
                  isScrolled ? 'text-gold-dark' : 'text-gold-light'
                }`}
              >
                Wedding Celebration
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Visible on Tablet/Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs uppercase tracking-[0.2em] font-sans font-semibold transition-all relative py-1 ${
                    isActive
                      ? isScrolled
                        ? 'text-gold-dark'
                        : 'text-gold-light'
                      : isScrolled
                      ? 'text-charcoal hover:text-gold-dark'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Icons: Invitation Reveal, Audio Toggle, Share, Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* View Invitation Modal Button */}
            <button
              onClick={onOpenEnvelope}
              title="View Invitation Card"
              aria-label="View Invitation Card"
              className={`min-h-[42px] px-3 rounded-full border transition-all flex items-center gap-1.5 active:scale-95 text-xs font-sans uppercase tracking-wider font-semibold ${
                isScrolled
                  ? 'border-gold/40 text-charcoal-deep hover:bg-gold/10'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span className="hidden sm:inline">Invitation</span>
            </button>

            {/* Background Music Toggle */}
            <button
              onClick={onToggleMusic}
              title={isMusicPlaying ? 'Pause music' : 'Play ambient wedding music'}
              aria-label={isMusicPlaying ? 'Pause ambient wedding music' : 'Play ambient wedding music'}
              className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center active:scale-95 ${
                isScrolled
                  ? 'border-gold/40 text-charcoal-deep hover:bg-gold/10'
                  : 'border-white/40 text-white hover:bg-white/10'
              } ${isMusicPlaying ? 'ring-2 ring-gold/40' : ''}`}
            >
              {isMusicPlaying ? (
                <div className="flex items-center gap-0.5">
                  <Volume2 className="w-4 h-4 text-gold animate-pulse" />
                  <span className="flex items-end gap-0.5 h-2.5">
                    <span className="w-0.5 h-1.5 bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 h-2.5 bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                  </span>
                </div>
              ) : (
                <VolumeX className="w-4 h-4 opacity-70" />
              )}
            </button>

            {/* Share / QR Modal Button */}
            <button
              onClick={onOpenShare}
              title="Share Invitation & QR Code"
              aria-label="Share Invitation & QR Code"
              className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center active:scale-95 ${
                isScrolled
                  ? 'border-gold/40 text-charcoal-deep hover:bg-gold/10'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
            >
              <Share2 className="w-4 h-4 text-gold" />
            </button>

            {/* Mobile Hamburger Toggle (Mobile/Tablet only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`md:hidden w-10 h-10 rounded-full border transition-all flex items-center justify-center active:scale-95 ${
                isScrolled
                  ? 'border-gold/40 text-charcoal-deep hover:bg-gold/10'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Modal */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-16 inset-x-4 max-w-[400px] mx-auto bg-[#FFFDF8] rounded-3xl border border-gold/40 shadow-2xl p-6 flex flex-col items-center gap-3 text-charcoal-deep animate-in fade-in slide-in-from-top-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <SSMonogram size={56} variant="gold" />
            <h4 className="font-serif text-lg tracking-[0.2em] font-medium text-charcoal-deep uppercase mt-1">
              Sahana &amp; Sameep
            </h4>
            <div className="w-16 h-[1px] bg-gold/40 my-1" />

            <nav className="w-full flex flex-col items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`w-full py-2.5 text-center text-xs uppercase tracking-[0.25em] font-sans font-medium rounded-xl transition-colors ${
                      isActive
                        ? 'bg-gold/15 text-gold-dark font-semibold'
                        : 'text-charcoal hover:bg-ivory-100 hover:text-gold-dark'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="w-full pt-3 mt-1 border-t border-gold/20 flex items-center justify-around">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnvelope();
                }}
                className="min-h-[44px] flex items-center gap-2 text-xs font-medium text-gold-dark px-3 py-2 rounded-lg hover:bg-gold/10"
              >
                <Mail className="w-4 h-4" />
                <span>View Invitation</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShare();
                }}
                className="min-h-[44px] flex items-center gap-2 text-xs font-medium text-gold-dark px-3 py-2 rounded-lg hover:bg-gold/10"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Invitation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
