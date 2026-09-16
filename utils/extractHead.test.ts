import { describe, it, expect } from 'vitest';
import { extractHead } from './extractHead';

describe('extractHead', () => {
  it('splits leading title/meta/link tags from the rest of the markup', () => {
    const html =
      '<title>Page Title</title>' +
      '<meta name="description" content="desc"/>' +
      '<link rel="canonical" href="https://example.com/"/>' +
      '<div id="app"><p>content</p></div>';

    const { head, body } = extractHead(html);

    expect(head).toBe(
      '<title>Page Title</title>' +
        '<meta name="description" content="desc"/>' +
        '<link rel="canonical" href="https://example.com/"/>'
    );
    expect(body).toBe('<div id="app"><p>content</p></div>');
  });

  it('leaves a JSON-LD script tag in the body, since React does not hoist scripts', () => {
    const html =
      '<title>Page Title</title>' +
      '<div id="app"><script type="application/ld+json">{"a":1}</script></div>';

    const { head, body } = extractHead(html);

    expect(head).toBe('<title>Page Title</title>');
    expect(body).toBe(
      '<div id="app"><script type="application/ld+json">{"a":1}</script></div>'
    );
  });

  it('returns an empty head when no hoistable tags are present', () => {
    const html = '<div id="app">no head tags here</div>';

    const { head, body } = extractHead(html);

    expect(head).toBe('');
    expect(body).toBe(html);
  });

  it('handles multiple meta and link tags in any order', () => {
    const html =
      '<meta property="og:title" content="A"/>' +
      '<meta property="og:type" content="article"/>' +
      '<link rel="canonical" href="https://example.com/x"/>' +
      '<div>rest</div>';

    const { head, body } = extractHead(html);

    expect(head).toBe(
      '<meta property="og:title" content="A"/>' +
        '<meta property="og:type" content="article"/>' +
        '<link rel="canonical" href="https://example.com/x"/>'
    );
    expect(body).toBe('<div>rest</div>');
  });
});
