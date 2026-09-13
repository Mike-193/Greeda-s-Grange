import { useState } from 'react';
import { AMENITIES, SITE } from '../data';
import { AmenityItem } from '../types';
import { Flame, Sparkles, Coffee, Wifi, Compass, HelpCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: { [key: string]: any } = {
  Flame: Flame,
  Sparkles: Sparkles,
  Coffee: Coffee,
  Wifi: Wifi,
  Compass: Compass,
};

export default function Amenities() {
  const content = SITE.amenitiesSection;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedAmenityId, setSelectedAmenityId] = useState<string>(AMENITIES[0].id);

  // Filter list by selected category
  const filteredAmenities = AMENITIES.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  // Retrieve current active detail object
  const activeDetail = AMENITIES.find((item) => item.id === selectedAmenityId) || AMENITIES[0];

  return (
    <section id="amenities" className="w-full py-24 bg-[#faf7f2]">
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

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {content.categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value);
                // Select first in the filtered category array by default so something is always highlighted
                const firstFiltered = AMENITIES.find(
                  (item) => cat.value === 'all' || item.category === cat.value
                );
                if (firstFiltered) setSelectedAmenityId(firstFiltered.id);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-[#1e3d2f] text-[#faf7f2] shadow-md'
                  : 'bg-[#1e3d2f]/5 text-[#1e3d2f] hover:bg-[#1e3d2f]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Panel / Bento Detail Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Quick select directory list */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-3">
            {filteredAmenities.map((item: AmenityItem) => {
              const IconComp = iconMap[item.icon] || HelpCircle;
              const isCurrentlySelected = selectedAmenityId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedAmenityId(item.id)}
                  className={`flex items-start text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isCurrentlySelected
                      ? 'bg-white border-[#1e3d2f] shadow-md ring-1 ring-[#1e3d2f]/50'
                      : 'bg-white/40 hover:bg-white border-[#1e3d2f]/5 hover:border-[#1e3d2f]/15'
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg mr-4 overflow-hidden relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 flex items-center justify-center ${
                      isCurrentlySelected ? 'bg-[#c97d60]/40' : 'bg-[#1e3d2f]/30'
                    }`}>
                      <IconComp className="w-7 h-7 text-white flex-shrink-0" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1e3d2f] mb-0.5">{item.title}</h4>
                    <p className="text-xs text-[#1c1a18]/60 line-clamp-1">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Immersive spotlight detail visualizer */}
          <div className="col-span-1 lg:col-span-7 bg-[#1e3d2f]/5 border border-[#1e3d2f]/10 rounded-2xl overflow-hidden flex flex-col relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDetail.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                {/* Spotlight banner image */}
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <img
                    src={activeDetail.image}
                    alt={activeDetail.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e3d2f]/85 via-[#1e3d2f]/10 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3.5">
                    <div className="p-3 bg-[#1e3d2f] text-[#faf7f2] rounded-xl shadow-sm">
                      {(() => {
                        const IconComponent = iconMap[activeDetail.icon] || HelpCircle;
                        return <IconComponent className="w-6 h-6" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#c97d60] font-bold">
                        {content.spotlightEyebrow} • {activeDetail.category}
                      </span>
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-white">
                        {activeDetail.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                  <p className="text-sm md:text-base text-[#1c1a18]/80 leading-relaxed mb-8 max-w-xl">
                    {activeDetail.description}
                  </p>

                  <div>
                    <p className="font-mono text-[10px] uppercase font-bold text-[#1c1a18]/45 tracking-widest mb-3">
                      {content.highlightsLabel}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeDetail.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2.5 text-xs text-[#1e3d2f] font-medium bg-white/70 backdrop-blur-xs px-3 py-2 rounded-lg border border-[#1e3d2f]/5">
                          <Check className="w-4 h-4 text-[#c97d60] stroke-[3]" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
