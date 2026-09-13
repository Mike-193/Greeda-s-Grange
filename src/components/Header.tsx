import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Menu, X, Compass, MapPin, Heart, ChevronRight, Clock, BedDouble, Mountain, Star, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE, ROOMS } from '../data';

const trustMetricIconMap: { [key: string]: any } = {
  BedDouble,
  Mountain,
  Star,
};

export default function Header({ onBookNowClick }: { onBookNowClick: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [curTime, setCurTime] = useState('');
  const fixedHeaderRef = useRef<HTMLDivElement>(null);

  const { brand, nav: navContent, hero } = SITE;
  const currentMonthKey = String(new Date().getMonth() + 1).padStart(2, '0');
  const seasonalNotice = brand.seasonal.enabled
    ? `Season: ${brand.seasonal.title}`
    : (brand.seasonalNotices[currentMonthKey] || Object.values(brand.seasonalNotices)[0]);

  // Curated hero carousel: homestay interiors/exteriors plus Attappadi/Western Ghats
  // scenery. Keeping this data here means the landing page remains data-driven
  // without adding another dependency.
  const slideshowImages = [
    { src: hero.mainImage.src, alt: hero.mainImage.alt, caption: hero.mainImage.caption, sub: hero.mainImage.captionSub },
    { src: hero.polaroidImage.src, alt: hero.polaroidImage.alt, caption: hero.polaroidImage.caption, sub: hero.polaroidImage.captionSub },
    ...SITE.sanctuary.images.map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.overlayLabel || 'Attappadi Sanctuary',
      sub: 'Western Ghats • Kerala',
    })),
    ...ROOMS.map((room) => ({
      src: room.image,
      alt: room.name,
      caption: room.name,
      sub: 'A stay at Greeda’s Grange',
    })),
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  // Advance automatically every 4 seconds. Pausing on hover lets guests inspect
  // an image without the carousel moving underneath them.
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  useEffect(() => {
    if (isHeroHovered) return;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideshowImages.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [isHeroHovered, slideshowImages.length]);

  // Keep track of scroll position for a glassmorphism header effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soft real-time clock to show Grange local time in index bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  // Measure the real rendered height of the fixed ribbon+nav block so page
  // content is pushed down by exactly the right amount at every breakpoint,
  // whether the ribbon wraps to one or two lines.
  useLayoutEffect(() => {
    const el = fixedHeaderRef.current;
    if (!el) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
    };

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobileMenuOpen]);

  return (
    <header className="relative w-full">
      {/* Fixed ribbon + nav block: kept together so the nav is always positioned
          directly beneath the ribbon, regardless of how tall the ribbon renders. */}
      <div ref={fixedHeaderRef} className="fixed top-0 inset-x-0 z-40">
        {/* Upper info-ticker: stacks to two rows on mobile so nothing overlaps the nav below it */}
        <div
          id="grange-marquee"
          className="w-full bg-[#1e3d2f] text-[#faf7f2] px-4 py-2 border-b border-[#2d493a] flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center text-[11px] sm:text-xs font-mono tracking-wider"
        >
          <span className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="inline-block w-2 h-2 rounded-full bg-[#c97d60] animate-pulse flex-shrink-0"></span>
            <span>{seasonalNotice}</span>
          </span>
          <div className="flex justify-center sm:justify-end items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#c97d60] flex-shrink-0" />
              <span>Local Time: {curTime || '8:16 PM'}</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#c97d60] flex-shrink-0" />
              <span>{brand.locationShort}</span>
            </span>
          </div>
        </div>

        {/* Main glass-effects navbar */}
        <nav
          id="main-nav"
          className={`w-full transition-all duration-500 border-b ${
            isScrolled
              ? 'bg-[#faf7f2]/90 backdrop-blur-md shadow-lg border-[#1e3d2f]/10 py-3'
              : 'bg-[#faf7f2]/55 backdrop-blur-sm border-[#1e3d2f]/5 py-4'
          }`}
        >
          <div className="px-4 sm:px-6 flex justify-between items-center max-w-7xl mx-auto">
            {/* Logo brand */}
            <a href="#" className="flex flex-col items-start leading-none group">
              <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-[#1e3d2f] transition-colors group-hover:text-[#c97d60]">
                {brand.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c97d60] mt-0.5">
                {brand.tagline}
              </span>
            </a>

            {/* Desktop link menu */}
            <ul className="hidden md:flex items-center gap-8">
              {navContent.menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-[#1c1a18]/80 hover:text-[#1e3d2f] transition-all relative py-1 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:bg-[#c97d60] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Prompt action button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={onBookNowClick}
                className="px-5 py-2.5 bg-[#1e3d2f] hover:bg-[#1e3d2f]/90 text-[#faf7f2] font-semibold text-xs font-mono uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
              >
                {navContent.bookButtonLabel}
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-[#1e3d2f] hover:bg-[#1e3d2f]/5 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Spacer pushing page content below the fixed ribbon+nav block, kept in sync via --header-h */}
      <div style={{ height: 'var(--header-h, 100px)' }} aria-hidden="true" />

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#faf7f2] border-l border-[#1e3d2f]/10 z-50 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="font-serif text-lg font-bold text-[#1e3d2f]">{navContent.mobileDrawerTitle}</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 text-[#1c1a18] hover:bg-[#1e3d2f]/5 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <ul className="flex flex-col gap-5">
                  {navContent.menuItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base font-serif font-medium text-[#1c1a18] hover:text-[#1e3d2f] transition-all flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="w-4 h-4 text-[#c97d60]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-[#1e3d2f]/10">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookNowClick();
                  }}
                  className="w-full py-3 bg-[#1e3d2f] text-[#faf7f2] rounded-xl font-mono text-xs uppercase tracking-widest font-bold text-center"
                >
                  {navContent.bookButtonLabel}
                </button>
                <p className="text-[10px] text-center text-[#1c1a18]/40 mt-4 font-mono">
                  {navContent.mobileFooterNote}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Body */}
      <section
        id="hero-body"
        className="w-full pt-8 pb-16 md:py-16 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12"
      >
        {/* Copywriting Column */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 bg-[#1e3d2f]/5 px-3.5 py-1.5 rounded-full text-[#1e3d2f] font-mono text-[11px] font-medium tracking-wide mb-6">
            <Compass className="w-3.5 h-3.5 text-[#c97d60] animate-spin" style={{ animationDuration: '6s' }} />
            <span>{hero.badge}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1c1a18] leading-[1.1] mb-6">
            {hero.headingLines[0]} <br className="hidden sm:inline" />
            <span className="text-[#1e3d2f] italic font-normal">{hero.headingLines[1]}</span> {hero.headingLines[2]}
          </h1>

          <p className="text-base text-[#1c1a18]/75 leading-relaxed mb-8 max-w-lg">
            {hero.paragraph}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onBookNowClick}
              className="px-8 py-3.5 bg-[#1e3d2f] text-[#faf7f2] font-semibold text-sm rounded-xl hover:bg-[#c97d60] transition-colors shadow-lg shadow-[#1e3d2f]/10 text-center cursor-pointer font-mono uppercase tracking-wider"
            >
              {hero.primaryCta}
            </button>
            <a
              href="#sanctuary"
              className="px-6 py-3.5 bg-transparent border border-[#1e3d2f]/15 hover:border-[#1e3d2f]/40 text-[#1c1a18] font-medium text-sm rounded-xl transition-all text-center flex items-center justify-center gap-2 font-mono uppercase tracking-wider text-xs"
            >
              {hero.secondaryCta}
            </a>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-3 gap-6 border-t border-[#1e3d2f]/10 pt-8 mt-12 w-full max-w-md">
            {hero.trustMetrics.map((metric) => {
              const IconComp = trustMetricIconMap[metric.icon] || HelpCircle;
              return (
                <div key={metric.label}>
                  <IconComp className="w-4 h-4 text-[#c97d60] mb-1.5" />
                  <p className="font-serif text-2xl font-bold text-[#1e3d2f]">{metric.value}</p>
                  <p className="text-[11px] font-mono text-[#1c1a18]/60 uppercase tracking-wider mt-1">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Image Collage Column */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center">
          <div className="relative w-full aspect-square max-w-md sm:max-w-xl flex items-center justify-center">

            {/* Background geometric grid overlay */}
            <div className="absolute inset-4 rounded-3xl border border-[#1e3d2f]/5 bg-[#1e3d2f]/2 -z-10 transform rotate-3 scale-105"></div>

            {/* Hero image carousel: one clean focal image, same editorial palette */}
            <div
              className="absolute w-[82%] aspect-[4/5] sm:aspect-square overflow-hidden rounded-3xl border-[8px] border-[#faf7f2] shadow-2xl z-10"
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => setIsHeroHovered(false)}
            >
              <img
                key={slideshowImages[activeSlide].src}
                src={slideshowImages[activeSlide].src}
                alt={slideshowImages[activeSlide].alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[8%] brightness-95 animate-fade-in"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e3d2f]/80 via-[#1e3d2f]/25 to-transparent pt-16 px-5 pb-5">
                <p className="font-serif font-bold text-sm text-white">{slideshowImages[activeSlide].caption}</p>
                <p className="text-[9px] font-mono text-white/75 uppercase tracking-wider mt-1">
                  {slideshowImages[activeSlide].sub}
                </p>
              </div>

              {/* Previous / next controls */}
              <button
                type="button"
                aria-label="Previous homestay image"
                onClick={() => setActiveSlide((current) => (current - 1 + slideshowImages.length) % slideshowImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#faf7f2]/90 text-[#1e3d2f] shadow-md flex items-center justify-center hover:bg-[#c97d60] hover:text-white transition-colors"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next homestay image"
                onClick={() => setActiveSlide((current) => (current + 1) % slideshowImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#faf7f2]/90 text-[#1e3d2f] shadow-md flex items-center justify-center hover:bg-[#c97d60] hover:text-white transition-colors"
              >
                ›
              </button>

              {/* Slide indicators */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {slideshowImages.map((image, index) => (
                  <button
                    key={`${image.src}-${index}`}
                    type="button"
                    aria-label={`Show image ${index + 1}`}
                    onClick={() => setActiveSlide(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeSlide ? 'w-6 bg-[#c97d60]' : 'w-1.5 bg-white/70 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Tiny accent medal */}
            <div className="absolute top-2 left-2 z-20 w-20 h-20 bg-[#c97d60] rounded-full flex flex-col justify-center items-center text-center p-2 text-white shadow-lg animate-bounce" style={{ animationDuration: '4s' }}>
              <Heart className="w-4 h-4 text-white fill-white mb-0.5" />
              <span className="text-[8px] font-mono uppercase tracking-wider font-bold leading-none">{hero.medalLabel}</span>
            </div>

          </div>
        </div>
      </section>
    </header>
  );
}
