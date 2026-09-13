import { Leaf, PawPrint, ArrowLeft, Sprout, Bird } from 'lucide-react';
import { FLORA_FAUNA, SITE } from '../data';
import { useMemo, useState } from 'react';

export default function FloraFaunaPage() {
  const [filter, setFilter] = useState<'all' | 'flora' | 'fauna'>('all');
  const content = SITE.floraFaunaSection;

  const items = useMemo(
    () => filter === 'all' ? FLORA_FAUNA : FLORA_FAUNA.filter(item => item.category === filter),
    [filter]
  );

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1a18] font-sans">
      {/* Same visual language as the landing page, but with a focused page header. */}
      <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#1e3d2f]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-[#1e3d2f] group-hover:text-[#c97d60] transition-colors">
              {SITE.brand.name}
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#c97d60] mt-1">
              {SITE.brand.tagline}
            </span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1e3d2f]/15 text-[#1e3d2f] hover:bg-[#1e3d2f] hover:text-[#faf7f2] transition-all font-mono text-[10px] uppercase tracking-widest font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Grange
          </a>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#c97d60] font-bold">
            {content.eyebrow}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1e3d2f] mt-2 mb-5">
            {content.heading}
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-[#1c1a18]/70 leading-relaxed">
            {content.description}
          </p>

          <div className="mt-8 flex justify-center gap-2 flex-wrap">
            {[
              { value: 'all' as const, label: 'All Neighbours', icon: Sprout },
              { value: 'flora' as const, label: 'Flora', icon: Leaf },
              { value: 'fauna' as const, label: 'Fauna', icon: Bird },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold transition-all ${
                  filter === value
                    ? 'bg-[#1e3d2f] text-[#faf7f2] shadow-md'
                    : 'bg-white text-[#1e3d2f] border border-[#1e3d2f]/10 hover:border-[#1e3d2f]/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[#1e3d2f]/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.localName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1e3d2f]/70 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-[#1e3d2f] text-white px-2.5 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-wider font-bold">
                    {item.category === 'flora' ? <Leaf className="w-3 h-3" /> : <PawPrint className="w-3 h-3" />}
                    {item.category}
                  </div>
                </div>

                <div className="p-5 flex-1">
                  <h2 className="font-serif text-xl font-bold text-[#1e3d2f]">{item.localName}</h2>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#c97d60] font-semibold italic mt-1">
                    {content.scientificNameLabel}: {item.scientificName}
                  </p>
                  <p className="text-sm text-[#1c1a18]/70 leading-relaxed mt-4">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-[#1e3d2f]/10 bg-[#f2ede4]/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#c97d60] font-bold">
              A living sanctuary
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#1e3d2f] mt-2">
              Leave the hills as wild as you found them.
            </h2>
            <p className="text-sm text-[#1c1a18]/65 leading-relaxed mt-3 max-w-2xl mx-auto">
              The catalogue is only a glimpse of the biodiversity around Greeda’s Grange.
              Slow walks, quiet observation, and respectful distance help protect this shared habitat.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
