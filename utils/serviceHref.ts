/**
 * Canonical internal URL for a service.
 *
 * `mobile-mechanic` lives at the top-level `/mobile-mechanic` (a bespoke landing
 * page, and the only service page currently earning meaningful organic
 * impressions). `/service/mobile-mechanic` is a duplicate that Google refused to
 * index and is 301'd away — so internal links must point at the canonical URL
 * directly rather than bouncing through the redirect.
 */
export const serviceHref = (id: string): string =>
  id === 'mobile-mechanic' ? '/mobile-mechanic' : `/service/${id}`;
