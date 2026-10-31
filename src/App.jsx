import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Central Wedding Configuration
import { weddingConfig } from './config/wedding';

// UI Components
import LoadingScreen from './components/LoadingScreen';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KannadaInvitation from './components/KannadaInvitation';
import FloatingRing from './components/FloatingRing';
import Story from './components/Story';
import Events from './components/Events';
import Countdown from './components/Countdown';
import Venue from './components/Venue';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import FamilyMessage from './components/FamilyMessage';
import TravelStay from './components/TravelStay';
import DressCode from './components/DressCode';
import Footer from './components/Footer';
import ShareModal from './components/ShareModal';

// Guest Personalization & Audio Synthesizer
import { getGuestFromUrl, formatGuestGreeting } from './utils/guestPersonalization';
import { weddingAudio } from './utils/audioSynth';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [guestName, setGuestName] = useState('');

  // Extract personalized guest name from URL e.g. ?guest=Kushal%20%26%20Family or ?to=...
  useEffect(() => {
    const guest = getGuestFromUrl();
    if (guest) {
      setGuestName(guest);
    }
  }, []);

  // Initialize audio handler
  useEffect(() => {
    if (weddingConfig.music && weddingConfig.music.enabled) {
      weddingAudio.init(weddingConfig.music.src);
    }

    // Auto-pause when tab is hidden, resume when tab is active
    const handleVisibilityChange = () => {
      if (document.hidden && isMusicPlaying) {
        weddingAudio.pause();
      } else if (!document.hidden && isMusicPlaying) {
        weddingAudio.play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isMusicPlaying]);

  // Section scroll spy to highlight active link
  useEffect(() => {
    const sections = ['home', 'kannada-invitation', 'story', 'events', 'gallery', 'venue', 'rsvp'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMusic = () => {
    const newState = weddingAudio.toggle();
    setIsMusicPlaying(newState);
  };

  const handleEnterWebsite = () => {
    setShowIntro(false);
    // Optional gentle music start if user allows
    if (!isMusicPlaying && weddingConfig.music?.autoPlayPrompt) {
      const started = weddingAudio.play();
      setIsMusicPlaying(started);
    }
  };

  const guestGreeting = formatGuestGreeting(guestName);

  return (
    <div className="min-h-screen bg-[#181310] flex justify-center selection:bg-gold-light selection:text-charcoal-deep">
      {/* Responsive Wedding Canvas: 100% on Mobile, up to max-w-7xl on Tablet & Desktop */}
      <div className="w-full max-w-7xl min-h-screen bg-[#FAF6EF] text-[#352C28] font-sans relative overflow-x-hidden shadow-2xl flex flex-col">
        {/* 1. Loading Screen */}
        <AnimatePresence>
          {loading && (
            <LoadingScreen onComplete={() => setLoading(false)} />
          )}
        </AnimatePresence>

        {/* 2. Modern Cinematic Wedding Reveal Opening */}
        <AnimatePresence>
          {!loading && showIntro && (
            <CinematicIntro
              wedding={weddingConfig}
              guestGreeting={guestGreeting}
              onComplete={handleEnterWebsite}
            />
          )}
        </AnimatePresence>

        {/* 3. Main Full Wedding Website */}
        <Navbar
          couple={weddingConfig.couple}
          activeSection={activeSection}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          onOpenShare={() => setIsShareOpen(true)}
          onOpenEnvelope={() => setShowIntro(true)}
        />

        <main className="flex-1">
          {/* Section 6: Hero Section */}
          <Hero
            couple={weddingConfig.couple}
            dateFormats={weddingConfig.dateFormats}
            muhurtha={weddingConfig.muhurtha}
            venue={weddingConfig.venue}
            onOpenInvitation={() => setShowIntro(true)}
            onViewDetails={() => {
              const target = document.querySelector('#kannada-invitation') || document.querySelector('#story');
              target?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Section: Traditional Kannada Wedding Invitation */}
          <KannadaInvitation />

          {/* 3D Wedding Element A: Floating Interlocking Rings */}
          <FloatingRing />

          {/* Section 7: Our Story Section */}
          <Story story={weddingConfig.story} />

          {/* Section 9: Wedding Events Section with Interactive 3D Flip Cards */}
          <Events events={weddingConfig.events} />

          {/* Section 8: Wedding Countdown */}
          <Countdown
            targetDate={weddingConfig.weddingDate}
            timeZone={weddingConfig.timeZone}
            subtitle={weddingConfig.countdown?.subtitle}
            quote={weddingConfig.countdown?.quote}
          />

          {/* Section 10: Venue & Directions with High-Resolution Lightbox */}
          <Venue venue={weddingConfig.venue} />

          {/* Section 11: Photo Gallery & Lightbox */}
          <Gallery gallery={weddingConfig.gallery} />

          {/* Section 12: RSVP Form */}
          <RSVP rsvpConfig={weddingConfig.rsvp} couple={weddingConfig.couple} guestName={guestName} />

          {/* Section 13: Note From Our Families */}
          <FamilyMessage familyNote={weddingConfig.familyNote} />

          {/* Section 14: Travel & Stay Information */}
          <TravelStay travel={weddingConfig.travel} />

          {/* Section 15: Dress Code Section with Interactive 3D Flip Cards */}
          <DressCode dressCode={weddingConfig.dressCode} />
        </main>

        {/* Section 18: Footer & Thank You */}
        <Footer
          couple={weddingConfig.couple}
          thankYou={weddingConfig.thankYou}
          onOpenEnvelope={() => setShowIntro(true)}
        />

        {/* Section 17: Share & QR Code Dialog */}
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          shareConfig={weddingConfig.share}
          couple={weddingConfig.couple}
        />
      </div>
    </div>
  );
}
