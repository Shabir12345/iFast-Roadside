declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GTAG_ID = 'AW-18054263913';
export const GTAG_ID_2 = 'AW-18177365102';
export const GA4_ID = 'G-J8Z9MYFLY5';

/**
 * Tracks a Google Ads conversion event.
 * @param action - the conversion action name (e.g. 'call_click')
 * @param label - optional conversion label from the Google Ads UI (e.g. 'ABCD123')
 */
export const trackConversion = (action: string, label?: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // Generate a unique transaction ID per conversion event.
    // Google requires this to be non-empty; for phone calls we use a
    // timestamp + random suffix to ensure uniqueness and prevent double-counting.
    const transactionId = `call_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    window.gtag('event', 'conversion', {
      'send_to': `AW-18054263913/3WFRCOmMsqUcEOno-KBD`,
      'transaction_id': transactionId,
      'event_callback': () => {
        console.log(`Conversion tracked: ${action} | label: ${label || 'default'} | txn: ${transactionId}`);
      }
    });

    window.gtag('event', 'conversion', {
      'send_to': 'AW-18177365102/QOiKCIjwrrMcEO6o0ttD',
      'transaction_id': transactionId,
    });
  } else {
    console.warn('Google Tag (gtag) not initialized. Click tracked but not sent.');
  }
};

/**
 * Special helper for tracking phone calls.
 *
 * Fires two things for two different consumers:
 *   - Google Ads conversions, which feed live campaign bidding.
 *   - A GA4 event, which is what the Mission Control reporting reads. The
 *     `call_location` parameter is the only signal saying which page produced
 *     the call, so it must be sent, not just logged.
 */
export const trackPhoneCall = (label = 'call_button_click') => {
  trackConversion('call_click', label);

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'phone_call_click', {
      send_to: GA4_ID,
      call_location: label,
    });
  }
};
