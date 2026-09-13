import { FLORA_FAUNA, SITE } from '../data';
import { FloraFaunaItem } from '../types';
import { Leaf, PawPrint, ArrowUpRight } from 'lucide-react';

export default function FloraFauna() {
  const content = SITE.floraFaunaSection;

  return (
    <section id="flora-fauna" className="w-full py-24 bg-[#f2ede4]/40 border-y border-[#1e3d2f]/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#c97d60] font-bold">{content.eyebrow}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1e3d2f] mt-2 mb-4">
            {content.heading}
          </h2>
          <p className="text-sm md:text-base text-[#1c1a18]/70 leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Catalogue Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLORA_FAUNA.map((item: FloraFaunaItem) => (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl bg-[#faf7f2] border border-[#1e3d2f]/10 shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-[#1e3d2f]/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.localName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1e3d2f] p-2 rounded-full text-white shadow-md">
                  {item.category === 'flora' ? (
                    <Leaf className="w-3.5 h-3.5" />
                  ) : (
                    <PawPrint className="w-3.5 h-3.5" />
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-serif text-lg font-bold text-[#1e3d2f]">{item.localName}</h3>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#c97d60] font-semibold italic mt-0.5">
                  {content.scientificNameLabel}: {item.scientificName}
                </p>
                {item.description && (
                  <p className="text-xs text-[#1c1a18]/70 leading-relaxed mt-3">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Full catalogue CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="/flora-fauna"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1e3d2f] text-[#faf7f2] font-mono text-[10px] uppercase tracking-widest font-bold shadow-md hover:bg-[#c97d60] transition-all active:scale-[0.98]"
          >
            View all flora & fauna
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
