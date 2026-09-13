import { SITE } from '../data';
import { MapPin, Phone, Mail, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const { brand, footer, locationSection } = SITE;

  return (
    <footer className="w-full bg-[#1e3d2f] text-[#faf7f2] pt-20 pb-10 border-t border-[#2d493a]">
      <motion.div
        className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2d493a]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Col 1: Branding and Philosophy */}
        <div className="md:col-span-5 space-y-4 text-left">
          <h4 className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
            {brand.name}
          </h4>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#c97d60] block font-bold">
            {brand.establishedLabel}
          </span>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
            {footer.tagline}
          </p>
          <div className="flex gap-2 text-[#c97d60]">
            <Compass className="w-4 h-4 flex-shrink-0 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">{brand.heritageBadge}</span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="md:col-span-3 text-left">
          <h5 className="font-mono text-xs uppercase tracking-widest text-[#c97d60] mb-4 font-bold">{footer.roomsHeading}</h5>
          <ul className="space-y-3.5 text-xs text-slate-300">
            <li><a href="#rooms" className="hover:text-white transition-colors">Room 1</a></li>
            <li><a href="#rooms" className="hover:text-white transition-colors">Room 2</a></li>
            <li><a href="#rooms" className="hover:text-white transition-colors">Room 3</a></li>
            <li><a href="#rooms" className="hover:text-white transition-colors">Room 4</a></li>
          </ul>
        </div>

        {/* Col 3: Contact & Direct Location */}
        <div className="md:col-span-4 text-left space-y-4">
          <h5 className="font-mono text-xs uppercase tracking-widest text-[#c97d60] mb-2 font-bold">{footer.contactHeading}</h5>
          <div className="space-y-3 text-xs text-slate-300">
            <a
              href={locationSection.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 hover:text-white hover:underline transition-all"
            >
              <MapPin className="w-4 h-4 text-[#c97d60] flex-shrink-0 mt-0.5" />
              <span>{footer.address}</span>
            </a>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#c97d60] flex-shrink-0" />
              <span>{footer.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#c97d60] flex-shrink-0" />
              <span>{footer.email}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer legal & build ticker */}
      <div className="max-w-7xl mx-auto px-4 pt-10 flex flex-col sm:flex-row justify-between items-center text-center gap-4 text-[11px] font-mono text-slate-400">
        <p>© {new Date().getFullYear()} {footer.copyrightSuffix}</p>
        <div className="flex items-center gap-4">
          {footer.legalLinks.map((link, idx) => (
            <span key={link} className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">{link}</a>
              {idx < footer.legalLinks.length - 1 && <span>•</span>}
            </span>
          ))}
          <span>•</span>
          <div className="text-[10px] text-stone-500 font-mono tracking-tighter">
            {footer.madeWithNote}
          </div>
        </div>
      </div>
    </footer>
  );
}
