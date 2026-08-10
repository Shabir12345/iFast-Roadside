/**
 * Runs `fn` when the browser is idle, falling back to a timer where
 * requestIdleCallback is unavailable (Safari before 17). Returns a cancel
 * function.
 *
 * Used to keep non-urgent work — warming route chunks, refreshing the live
 * review count — off the critical path during page load.
 */
export const onIdle = (fn: () => void, timeout = 3000): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(fn, { timeout });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(fn, Math.min(timeout, 2000));
  return () => window.clearTimeout(id);
};
