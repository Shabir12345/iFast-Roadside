import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackPhoneCall, trackFormSubmit, trackEmailClick, GA4_ID } from './analytics';

describe('trackPhoneCall', () => {
  let gtag: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    gtag = vi.fn();
    vi.stubGlobal('window', { gtag });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const ga4Events = () =>
    gtag.mock.calls.filter(
      ([kind, name]) => kind === 'event' && name === 'phone_call_click'
    );

  const adsConversions = () =>
    gtag.mock.calls.filter(
      ([kind, name]) => kind === 'event' && name === 'conversion'
    );

  it('sends exactly one GA4 event carrying the click location', () => {
    trackPhoneCall('header_desktop_call');

    expect(ga4Events()).toHaveLength(1);
    expect(ga4Events()[0][2]).toMatchObject({
      send_to: GA4_ID,
      call_location: 'header_desktop_call',
    });
  });

  it('defaults call_location when no label is given', () => {
    trackPhoneCall();

    expect(ga4Events()[0][2].call_location).toBe('call_button_click');
  });

  it('still fires both Google Ads conversions', () => {
    trackPhoneCall('footer_contact_call');

    const sendTos = adsConversions().map((call) => call[2].send_to);
    expect(sendTos).toEqual([
      'AW-18054263913/3WFRCOmMsqUcEOno-KBD',
      'AW-18177365102/QOiKCIjwrrMcEO6o0ttD',
    ]);
  });

  it('does not throw when gtag is unavailable', () => {
    vi.stubGlobal('window', {});
    expect(() => trackPhoneCall('header_desktop_call')).not.toThrow();
  });
});

describe('trackFormSubmit', () => {
  let gtag: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    gtag = vi.fn();
    vi.stubGlobal('window', { gtag });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const formEvents = () =>
    gtag.mock.calls.filter(([kind, name]) => kind === 'event' && name === 'form_submit');

  it('sends a GA4 form_submit carrying the form name and outcome', () => {
    trackFormSubmit('contact_form', 'success');

    expect(formEvents()).toHaveLength(1);
    expect(formEvents()[0][2]).toMatchObject({
      send_to: GA4_ID,
      form_name: 'contact_form',
      form_outcome: 'success',
    });
  });

  it('records a failed submission distinctly so broken forms are visible', () => {
    trackFormSubmit('contact_form', 'error');

    expect(formEvents()[0][2].form_outcome).toBe('error');
  });

  it('does NOT fire a Google Ads conversion, which is reserved for calls', () => {
    trackFormSubmit('contact_form', 'success');

    const conversions = gtag.mock.calls.filter(
      ([kind, name]) => kind === 'event' && name === 'conversion'
    );
    expect(conversions).toHaveLength(0);
  });

  it('does not throw when gtag is unavailable', () => {
    vi.stubGlobal('window', {});
    expect(() => trackFormSubmit('contact_form', 'success')).not.toThrow();
  });
});

describe('trackEmailClick', () => {
  let gtag: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    gtag = vi.fn();
    vi.stubGlobal('window', { gtag });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends a GA4 email_click carrying the click location', () => {
    trackEmailClick('footer_email');

    const events = gtag.mock.calls.filter(
      ([kind, name]) => kind === 'event' && name === 'email_click'
    );
    expect(events).toHaveLength(1);
    expect(events[0][2]).toMatchObject({
      send_to: GA4_ID,
      click_location: 'footer_email',
    });
  });

  it('does not throw when gtag is unavailable', () => {
    vi.stubGlobal('window', {});
    expect(() => trackEmailClick('footer_email')).not.toThrow();
  });
});
