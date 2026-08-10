import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App, { preloadMatchingRoute } from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Wait for this route's code-split chunk before mounting. Every route is
// prerendered, so the page is already painted and interactive-looking; mounting
// a few ms later costs nothing visible. Mounting *early* does cost something —
// the Suspense boundary would client-render empty and drop the footer a full
// viewport. See preloadMatchingRoute in App.tsx.
const tree = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// NOTE: this is createRoot, not hydrateRoot, even though every route ships as
// prerendered HTML. Hydrating would be less main-thread work, but it currently
// fails with React error #418 (server/client mismatch) on every route except
// "/". The cause is that react-helmet-async v3 under React 19 renders <title>,
// <meta>, <link> and the JSON-LD <script> into the component tree rather than
// collecting them into helmetContext, so renderToString emits them inside
// #root and the client tree does not line up. Switching to hydrateRoot means
// fixing how per-page <head> content is produced first — until then createRoot
// re-renders over the markup, which is wasteful but correct.
preloadMatchingRoute(window.location.pathname).finally(() => {
  ReactDOM.createRoot(rootElement).render(tree);
});