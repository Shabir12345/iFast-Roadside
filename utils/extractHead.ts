/**
 * Splits the string returned by renderToString into the metadata React 19
 * hoists (title/meta/link — always emitted first, even under the legacy
 * renderToString API, confirmed empirically against this React version) and
 * the remaining markup that belongs inside #root.
 *
 * <script type="application/ld+json"> is NOT hoisted by React and stays
 * wherever it was rendered in the tree — that's fine, Google accepts JSON-LD
 * in <body> as well as <head>.
 */
const HOISTED_TAG = /^(?:<title>[\s\S]*?<\/title>|<meta[^>]*\/>|<link[^>]*\/>)/;

export function extractHead(html: string): { head: string; body: string } {
  let head = '';
  let body = html;
  let match: RegExpMatchArray | null;
  while ((match = body.match(HOISTED_TAG))) {
    head += match[0];
    body = body.slice(match[0].length);
  }
  return { head, body };
}
