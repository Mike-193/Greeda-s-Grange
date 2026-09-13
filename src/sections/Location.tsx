import { SITE } from '../data';
import { motion } from 'motion/react';

export default function Location() {
  const { locationSection } = SITE;

  return (
    <section id="location" className="w-full py-20 bg-white border-t border-[#1e3d2f]/15 relative">
      <motion.div
        className="max-w-7xl mx-auto px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Copywriting Column */}
          <div className="col-span-1 lg:col-span-5 space-y-6 text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#c97d60] font-bold">{locationSection.eyebrow}</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#1e3d2f]">
              {locationSection.headingLines[0]} <br />
              {locationSection.headingLines[1]}
            </h2>
            <div className="w-16 h-0.5 bg-[#c97d60] rounded"></div>
            <p className="text-sm md:text-base text-[#1c1a18]/80 leading-relaxed">
              {locationSection.paragraph}
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-5 bg-[#faf7f2] rounded-xl border border-[#1e3d2f]/10 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-[#c97d60]">{locationSection.plusCodeLabel}</span>
                <p className="font-serif text-base font-bold text-[#1e3d2f] mt-1">{locationSection.plusCode}</p>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {locationSection.plusCodeHint}
                </p>
              </div>

              <div className="flex gap-4">
                <a
                  href={locationSection.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-5 py-3.5 bg-[#1e3d2f] hover:bg-[#c97d60] text-white font-mono text-xs font-bold uppercase tracking-widest text-center rounded-xl transition-all shadow-md active:scale-[0.98]"
                >
                  {locationSection.mapsButtonLabel}
                </a>
              </div>
            </div>
          </div>

          {/* Google Map iframe Embed Column */}
          <div className="col-span-1 lg:col-span-7">
            <div className="w-full bg-[#f2ede4] rounded-2xl overflow-hidden border border-[#1e3d2f]/15 shadow-xl aspect-[16/10] relative group animate-fade-in-up">
              <iframe
                title="Greeda Grange Attappadi Location Map"
                src={locationSection.mapEmbedUrl}
                className="w-full h-full border-0 grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 pointer-events-auto"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Overlay details panel */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-[#1e3d2f]/10 shadow-md flex justify-between items-center">
                <div>
                  <h4 className="font-serif font-bold text-xs text-[#1e3d2f]">{locationSection.overlayTitle}</h4>
                  <p className="text-[9px] font-mono text-[#1c1a18]/65 uppercase tracking-wider mt-0.5">{locationSection.overlayAddress}</p>
                </div>
                <a
                  href={locationSection.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#c97d60] hover:bg-[#1e3d2f] text-white font-mono text-[9px] font-bold uppercase tracking-widest rounded-lg transition-colors"
                >
                  {locationSection.directionsButtonLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
