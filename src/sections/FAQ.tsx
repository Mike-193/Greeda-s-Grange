import { useState } from 'react';
import { FAQS, SITE } from '../data';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const { faqSection } = SITE;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-20 bg-[#f2ede4]/45 border-t border-[#1e3d2f]/5">
      <motion.div
        className="max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[#c97d60] font-bold font-mono">{faqSection.eyebrow}</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#1e3d2f] mt-2">
            {faqSection.heading}
          </h2>
          <p className="text-xs md:text-sm text-[#1c1a18]/65 mt-2">
            {faqSection.description}
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                id={`faq-item-${idx}`}
                key={idx}
                className="bg-white border border-[#1e3d2f]/10 rounded-xl overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif font-extrabold text-sm md:text-base text-[#1e3d2f] hover:bg-[#1e3d2f]/2 transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-[#c97d60] transition-transform duration-300 ${
                    isOpen ? 'transform rotate-180' : ''
                  }`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#1c1a18]/70 leading-relaxed border-t border-[#1e3d2f]/3">
                        <p>{faq.answer}</p>
                        <span className="text-[9px] font-mono text-[#c97d60] uppercase tracking-widest inline-block mt-3 bg-[#c97d60]/5 px-2 py-0.5 rounded">
                          {faqSection.categoryLabel} {faq.category}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
