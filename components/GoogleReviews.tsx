import React, { useEffect, useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { GOOGLE_REVIEWS } from '../constants';
import { GoogleReview } from '../types';

// Featurable live-reviews widget. Auto-syncs from the Google Business Profile,
// so new reviews appear here with no code changes. If it fails to load, we fall
// back to the static GOOGLE_REVIEWS cards below so visitors always see proof.
const FEATURABLE_WIDGET_ID = 'featurable-9ff590b7-3128-4d17-a845-bc80f70b5313';
const FEATURABLE_SCRIPT_SRC = 'https://featurable.com/assets/bundle.js';

// Multicolor Google "G" mark (lucide has no brand logo).
const GoogleG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.97 21.97 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

const Stars: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => (
  <div className="flex gap-0.5 text-brand-yellow">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={size} fill={i < rating ? 'currentColor' : 'none'} className={i < rating ? '' : 'text-gray-300'} />
    ))}
  </div>
);

// Roughly 3 clamped lines; anything longer gets a "Read more" toggle.
const CLAMP_THRESHOLD = 160;

const ReviewCard: React.FC<{ review: GoogleReview }> = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.content.length > CLAMP_THRESHOLD;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(11,30,54,0.06)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-lg">
            {review.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-brand-dark leading-tight">{review.name}</h3>
            <span className="text-xs text-gray-400">{review.timeAgo}</span>
          </div>
        </div>
        <GoogleG className="w-5 h-5 flex-shrink-0" />
      </div>
      <Stars rating={review.rating} />
      <p
        className="text-gray-600 text-sm leading-relaxed mt-3"
        style={
          isLong && !expanded
            ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }
            : undefined
        }
      >
        {review.content}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-dark hover:text-brand-yellow transition-colors self-start"
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read more'}
          <ChevronDown size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
};

const GoogleReviews: React.FC = () => {
  // false = try the live widget; true = the widget failed, show static cards.
  const [widgetFailed, setWidgetFailed] = useState(false);

  useEffect(() => {
    // Re-inject the loader on every mount. Dynamically-created <script> elements
    // always execute when appended, so this re-scans the widget div on each
    // client-side route change (Home -> /service/:id) where the same component
    // remounts but the bundle wouldn't otherwise re-run.
    setWidgetFailed(false);
    const script = document.createElement('script');
    script.src = FEATURABLE_SCRIPT_SRC;
    script.async = true;
    script.charset = 'UTF-8';
    script.onerror = () => setWidgetFailed(true);
    document.body.appendChild(script);

    // If the widget hasn't rendered anything after a grace period, fall back.
    const timer = window.setTimeout(() => {
      const el = document.getElementById(FEATURABLE_WIDGET_ID);
      if (!el || el.childElementCount === 0) {
        setWidgetFailed(true);
      }
    }, 8000);

    return () => {
      window.clearTimeout(timer);
      script.remove();
    };
  }, []);

  return (
    <section id="google-reviews" className="bg-white py-16 border-y border-gray-100">
      <div className="container mx-auto px-4">
        {/* Live Google reviews via Featurable — auto-updates, no code changes.
            The widget renders its own rating header, so we don't duplicate it. */}
        {!widgetFailed && (
          <div className="max-w-6xl mx-auto min-h-[520px] md:min-h-[420px]">
            <div id={FEATURABLE_WIDGET_ID} data-featurable-async />
          </div>
        )}

        {/* Fallback: static cards, shown only if the live widget fails to load. */}
        {widgetFailed && GOOGLE_REVIEWS.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
          {GOOGLE_REVIEWS.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default GoogleReviews;
