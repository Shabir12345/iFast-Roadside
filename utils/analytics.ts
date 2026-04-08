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
    window.gtag('event', 'conversion', {
      'send_to': `AW-18054263913/hHrJCPzimZgcEOno-KBD`,
      'transaction_id': '',
      'event_callback': () => {
        console.log(`Conversion tracked: ${action} with label ${label || 'default'}`);
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
