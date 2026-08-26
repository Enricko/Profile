import { useEffect, useState } from 'react';

const PROJECT_PREFIX = '#/project/';

function parseHash(hash) {
  if (hash.startsWith(PROJECT_PREFIX)) {
    return { name: 'case-study', slug: decodeURIComponent(hash.slice(PROJECT_PREFIX.length)) };
  }
  return { name: 'home', hash };
}

/** Minimal hash-based router: `#/project/:slug` renders a case-study page, anything else is the one-page layout. */
export function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

export function projectHref(slug) {
  return `${PROJECT_PREFIX}${encodeURIComponent(slug)}`;
}
