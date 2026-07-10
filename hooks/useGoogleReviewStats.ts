import { useEffect, useState } from 'react';
import { GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from '../constants';

// Live Google review stats, pulled from the same Featurable widget that powers
// the reviews section (components/GoogleReviews.tsx). This keeps the "X Reviews"
// badges overlaid on the hero images in sync with the real Google Business
// Profile count, instead of drifting from a hardcoded number.
//
// The Featurable public API exposes the bare widget UUID (no `featurable-`
// prefix). If the fetch fails for any reason, we fall back to the constants in
// constants.tsx so the badges always render a sensible number.
const FEATURABLE_API =
  'https://api.featurable.com/v1/widgets/9ff590b7-3128-4d17-a845-bc80f70b5313';

export interface GoogleReviewStats {
  count: number;
  rating: number;
}

const FALLBACK: GoogleReviewStats = {
  count: GOOGLE_REVIEWS_COUNT,
  rating: GOOGLE_RATING,
};

// Module-level cache so multiple badges on the same page share one request and
// the number stays put across client-side route changes.
let cached: GoogleReviewStats | null = null;
let inFlight: Promise<GoogleReviewStats> | null = null;

const fetchStats = (): Promise<GoogleReviewStats> => {
  if (cached) return Promise.resolve(cached);
  if (inFlight) return inFlight;

  inFlight = fetch(FEATURABLE_API)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((data) => {
      const count = Number(data?.totalReviewCount);
      const rawRating = Number(data?.averageRating);
      const stats: GoogleReviewStats = {
        count: Number.isFinite(count) && count > 0 ? count : FALLBACK.count,
        // API returns e.g. 4.900000095367432 — clamp to one decimal.
        rating:
          Number.isFinite(rawRating) && rawRating > 0
            ? Math.round(rawRating * 10) / 10
            : FALLBACK.rating,
      };
      cached = stats;
      return stats;
    })
    .catch(() => FALLBACK)
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
};

export const useGoogleReviewStats = (): GoogleReviewStats => {
  const [stats, setStats] = useState<GoogleReviewStats>(cached ?? FALLBACK);

  useEffect(() => {
    let alive = true;
    fetchStats().then((s) => {
      if (alive) setStats(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  return stats;
};
