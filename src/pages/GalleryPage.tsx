import { GALLERY } from '../data';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#1c1a18]">
      <header className="sticky top-0 z-20 border-b border-[#1e3d2f]/10 bg-[#faf7f2]/95 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-[#1e3d2f]">Greeda’s Grange</a>
          <a href="/" className="rounded-xl border border-[#1e3d2f]/15 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1e3d2f] hover:bg-[#1e3d2f]/5">
            Back to Grange
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="max-w-2xl mb-10">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#c97d60]">The Sanctuary</span>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#1e3d2f] md:text-6xl">{GALLERY.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-[#1c1a18]/70 md:text-base">{GALLERY.description}</p>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {GALLERY.photos.map((photo) => (
            <figure key={photo.id} className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-[#1e3d2f]/10 bg-white shadow-md">
              <img src={photo.src} alt={photo.alt} referrerPolicy="no-referrer" className="w-full object-cover transition duration-700 hover:scale-[1.02]" loading="lazy" />
              {photo.caption && <figcaption className="px-4 py-3 font-serif text-sm font-semibold text-[#1e3d2f]">{photo.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
