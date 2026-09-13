import { useState, useEffect, FormEvent } from 'react';
import { Review } from '../types';
import { INITIAL_REVIEWS, ROOMS, SITE } from '../data';
import { Star, MessageSquare, Send, Heart, Sparkles, Smile, Filter, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FeedbackReviews() {
  const content = SITE.reviewsSection;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [author, setAuthor] = useState('');
  const [stayedIn, setStayedIn] = useState(ROOMS[0].name);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [isReplying, setIsReplying] = useState(false);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  // Load reviews from local storage, fallback to static defaults
  useEffect(() => {
    const stored = localStorage.getItem('grange_reviews');
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('grange_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const handlePublishReview = (e: FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    const newReviewId = `rev-${Date.now()}`;
    const newReview: Review = {
      id: newReviewId,
      author: author.trim(),
      rating,
      date: new Date().toISOString().split('T')[0],
      text: text.trim(),
      stayedIn,
    };

    // Calculate simulated host reply from Greeda based on text clues
    setIsReplying(true);
    let replyText = `Thank you so much for the lovely review, ${author}! It was a joy having you at the Grange, and we hope you return shortly!`;
    const lowercaseText = text.toLowerCase();
    const stayedInRoom = ROOMS.find((r) => r.name === stayedIn);

    if (lowercaseText.includes('bread') || lowercaseText.includes('breakfast') || lowercaseText.includes('food') || lowercaseText.includes('bake')) {
      replyText = `Oh, thank you ${author}! The breakfast sourdough starter has been thriving since my grandmother nurtured it. I make sure to pull it out of the oven right at dawn so it stays hot on your doorstep.`;
    } else if (lowercaseText.includes('kid') || lowercaseText.includes('family')) {
      replyText = `It was wonderful hosting your family at ${stayedIn}! Having little feet running through the paddock is always my favorite thing of the season.`;
    } else if (lowercaseText.includes('shout') || lowercaseText.includes('cider') || lowercaseText.includes('drink')) {
      replyText = `The orchard elderberry cider is dry-aged directly in our basement barrels. So thrilled you enjoyed a glass under the canopy, ${author}!`;
    } else if (stayedInRoom) {
      replyText = `Thank you ${author}! ${stayedIn} has so much character, and I hope you got to enjoy the quiet mountain views. Such a romantic escape.`;
    }

    // Deliver reply after a delightful small timeout to simulate cozy hostess writing
    setTimeout(() => {
      newReview.hostReply = replyText;
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem('grange_reviews', JSON.stringify(updatedReviews));
      setIsReplying(false);
    }, 1200);

    // Reset fields
    setAuthor('');
    setText('');
    setRating(5);
  };

  const filteredReviews = reviews.filter(
    (r) => filterRating === 'all' || r.rating === filterRating
  );

  return (
    <section id="reviews" className="w-full py-24 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-full mb-16">
          <div className="text-center md:text-left max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#c97d60] font-bold">{content.eyebrow}</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1e3d2f] mt-2 mb-4">
              {content.heading}
            </h2>
            <p className="text-sm md:text-base text-[#1c1a18]/70 leading-relaxed">
              {content.description}
            </p>
          </div>

          {content.googleReviewsUrl && (
            <a
              href={content.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-auto md:mx-0 px-4 py-2.5 rounded-lg text-[10px] font-mono uppercase tracking-widest font-bold border border-[#1e3d2f]/20 text-[#1e3d2f] hover:bg-[#1e3d2f] hover:text-white transition-all flex items-center gap-1.5 w-fit"
            >
              <span>{content.googleReviewsLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Main Grid: Form Left vs Feed Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="guestbook-deck">

          {/* Form Column */}
          <div className="col-span-1 lg:col-span-4 bg-white border border-[#1e3d2f]/10 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#1e3d2f]/5">
              <MessageSquare className="w-5 h-5 text-[#c97d60]" />
              <h3 className="font-serif font-bold text-base text-[#1e3d2f]">{content.formTitle}</h3>
            </div>

            <form onSubmit={handlePublishReview} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1c1a18]/55 mb-1.5 font-bold">
                  {content.nameLabel}
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder={content.namePlaceholder}
                  className="w-full bg-[#faf7f2] border border-[#1e3d2f]/10 p-2.5 rounded-lg text-xs text-[#1c1a18] focus:outline-none focus:ring-1 focus:ring-[#1e3d2f]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1c1a18]/55 mb-1.5 font-bold">
                    {content.roomLabel}
                  </label>
                  <select
                    value={stayedIn}
                    onChange={(e) => setStayedIn(e.target.value)}
                    className="w-full bg-[#faf7f2] border border-[#1e3d2f]/10 p-2.5 rounded-lg text-[11px] text-[#1c1a18] focus:outline-none focus:ring-1 focus:ring-[#1e3d2f]"
                  >
                    {ROOMS.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1c1a18]/55 mb-1.5 font-bold">
                    {content.ratingLabel}
                  </label>
                  {/* Visual interactive rating pills */}
                  <div className="flex bg-[#faf7f2] rounded-lg p-1 border border-[#1e3d2f]/10 justify-between items-center h-[34px]">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setRating(val)}
                        className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                          rating >= val ? 'text-amber-500 font-extrabold' : 'text-stone-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1c1a18]/55 mb-1.5 font-bold">
                  {content.textLabel}
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={content.textPlaceholder}
                  rows={4}
                  className="w-full bg-[#faf7f2] border border-[#1e3d2f]/10 p-2.5 rounded-lg text-xs text-[#1c1a18] focus:outline-none focus:ring-1 focus:ring-[#1e3d2f] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isReplying}
                className="w-full py-3 bg-[#1e3d2f] hover:bg-[#c97d60] text-white rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
              >
                {isReplying ? (
                  <>
                    <Smile className="w-3.5 h-3.5 animate-bounce" />
                    <span>{content.submittingLabel}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>{content.submitLabel}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Feed Column */}
          <div className="col-span-1 lg:col-span-8 space-y-6">

            {/* Filter bar */}
            <div className="flex items-center justify-between bg-white border border-[#1e3d2f]/5 px-4 py-3 rounded-xl flex-wrap gap-2 shadow-xs">
              <span className="text-xs text-[#1c1a18]/60 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#1e3d2f]" />
                <span>{content.filterLabel}</span>
              </span>
              <div className="flex gap-1.5">
                {['all', 5, 4].map((val) => (
                  <button
                    key={val}
                    onClick={() => setFilterRating(val as any)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      filterRating === val
                        ? 'bg-[#1e3d2f] text-white'
                        : 'bg-[#1e3d2f]/5 text-[#1e3d2f] hover:bg-[#1e3d2f]/10'
                    }`}
                  >
                    {val === 'all' ? 'All' : `${val} ★`}
                  </button>
                ))}
              </div>
            </div>

            {/* List feeds */}
            <div className="space-y-6 max-h-[620px] overflow-y-auto pr-2">
              <AnimatePresence mode="popLayout">
                {filteredReviews.length === 0 ? (
                  <div className="text-center py-12 bg-[#1e3d2f]/5 rounded-xl border border-dashed border-[#1e3d2f]/10">
                    <p className="text-sm text-[#1c1a18]/60 font-serif italic">{content.emptyStateText}</p>
                  </div>
                ) : (
                  filteredReviews.map((rev) => (
                    <motion.div
                      layout
                      key={rev.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-6 bg-white border border-[#1e3d2f]/10 rounded-2xl shadow-sm relative space-y-4"
                    >
                      {/* Star and Stay info */}
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h4 className="font-serif font-black text-base text-[#1e3d2f]">{rev.author}</h4>
                          <span className="text-[10px] font-mono text-[#c97d60] bg-[#c97d60]/5 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                            {content.stayedInPrefix} {rev.stayedIn}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex text-amber-500">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-3.5 h-3.5 ${
                                  idx < rev.rating ? 'fill-amber-500' : 'text-stone-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[9px] font-mono text-[#1c1a18]/40 mt-1">{rev.date}</span>
                        </div>
                      </div>

                      {/* Text */}
                      <p className="text-xs md:text-sm text-[#1c1a18]/80 leading-relaxed italic pr-4">
                        “{rev.text}”
                      </p>

                      {/* Greeda's Response Box */}
                      {rev.hostReply && (
                        <div className="bg-[#1e3d2f]/5 border border-[#1e3d2f]/10 rounded-xl p-4 ml-4 md:ml-8 relative">
                          {/* Heart token */}
                          <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-xs p-1.5 rounded-full border border-[#1e3d2f]/10 text-[#c97d60]">
                            <Heart className="w-3 h-3 fill-[#c97d60]" />
                          </div>

                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="font-serif font-bold text-xs text-[#1e3d2f]">{content.hostReplyName}</span>
                            <span className="text-[8px] font-mono text-[#c97d60] border border-[#c97d60] px-1.5 py-0.2 rounded leading-none uppercase">{content.hostReplyTag}</span>
                          </div>

                          <p className="text-xs text-[#1e3d2f] leading-relaxed">
                            {rev.hostReply}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
