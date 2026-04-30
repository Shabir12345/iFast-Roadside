declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GTAG_ID = 'AW-18054263913';

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
  } else {
    console.warn('Google Tag (gtag) not initialized. Click tracked but not sent.');
  }
};

/**
 * Special helper for tracking phone calls.
 */
export const trackPhoneCall = (label = 'call_button_click') => {
  trackConversion('call_click', label);
};
