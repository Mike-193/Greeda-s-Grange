import { GALLERY, SITE } from '../data';

export default function Sanctuary() {
  const { sanctuary } = SITE;
  const featuredIds = new Set(GALLERY.featuredPhotoIds);
  const galleryPhotos = GALLERY.photos.filter((photo) => featuredIds.has(photo.id));
  const images = (galleryPhotos.length >= 3 ? galleryPhotos : GALLERY.photos).slice(0, 3);

  return (
    <section id="sanctuary" className="w-full py-24 px-4 max-w-7xl mx-auto border-t border-[#1e3d2f]/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="col-span-1 lg:col-span-5 grid grid-cols-2 gap-3 relative">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`${index === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'} rounded-2xl overflow-hidden border border-[#1e3d2f]/10 shadow-lg relative`}
            >
              <img
                src={image.src}
                alt={image.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[97%] hover:scale-[1.03] transition-transform duration-700"
              />
              {index === 2 && image.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-white font-serif text-sm font-bold">{image.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="col-span-1 lg:col-span-7 space-y-6 lg:pl-6 text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-[#c97d60] font-bold">{sanctuary.eyebrow}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1e3d2f]">
            {sanctuary.headingLines[0]} <br />
            {sanctuary.headingLines[1]}
          </h2>
          <div className="w-16 h-0.5 bg-[#c97d60] rounded"></div>

          {sanctuary.paragraphs.map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? 'text-sm md:text-base text-[#1c1a18]/85 leading-relaxed' : 'text-xs md:text-sm text-[#1c1a18]/70 leading-relaxed'}>
              {paragraph}
            </p>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {sanctuary.highlights.map((highlight) => (
              <div key={highlight.title} className="p-4 bg-white rounded-xl border border-[#1e3d2f]/10 shadow-xs">
                <h4 className="font-serif font-bold text-sm text-[#1e3d2f] mb-1">{highlight.title}</h4>
                <p className="text-[11.5px] text-stone-500 leading-relaxed">{highlight.text}</p>
              </div>
            ))}
          </div>

          <a
            href="/gallery"
            className="inline-flex items-center rounded-xl bg-[#1e3d2f] px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-md transition hover:bg-[#1e3d2f]/90"
          >
            View All Photos
          </a>
        </div>
      </div>
    </section>
  );
}
