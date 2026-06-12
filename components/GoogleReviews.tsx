import React from 'react';
import { Star } from 'lucide-react';
import { GOOGLE_REVIEWS, GOOGLE_REVIEWS_URL, GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from '../constants';

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

const GoogleReviews: React.FC = () => {
  return (
    <section id="google-reviews" className="bg-white py-16 border-y border-gray-100">
      <div className="container mx-auto px-4">
        {/* Header: aggregate rating + Google branding */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <GoogleG className="w-8 h-8" />
            <span className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">Google Reviews</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl font-black text-brand-dark leading-none">{GOOGLE_RATING}</span>
            <div className="flex flex-col items-start">
              <Stars rating={5} size={20} />
              <span className="text-sm font-semibold text-gray-500 mt-1">
                Based on {GOOGLE_REVIEWS_COUNT}+ Google reviews
              </span>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {GOOGLE_REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(11,30,54,0.06)] flex flex-col"
            >
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
              <p className="text-gray-600 text-sm leading-relaxed mt-3">{review.content}</p>
            </div>
          ))}
        </div>

        {/* CTA button → Google reviews panel */}
        <div className="flex justify-center mt-10">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-brand-dark hover:bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-base md:text-lg transition-all duration-300 shadow-[0_10px_30px_rgba(11,30,54,0.2)] transform hover:-translate-y-1"
          >
            <span className="bg-white rounded-full p-1.5 group-hover:scale-110 transition-transform">
              <GoogleG className="w-5 h-5" />
            </span>
            Check Out All Our Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
