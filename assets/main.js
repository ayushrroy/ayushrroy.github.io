const header = document.querySelector('.pf-bar');
const links = [...document.querySelectorAll('.pf-nav a[data-section]')];
const sections = links.map(link => document.getElementById(link.dataset.section));
const routeLinks = [...document.querySelectorAll('a[data-section]')];

function updateNavigation() {
  const threshold = header.getBoundingClientRect().height + 90;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  }
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) current = sections.at(-1);
  for (const link of links) {
    if (link.dataset.section === current.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

function updateHeader() {
  document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
  updateNavigation();
}

function showRoute() {
  const requestedPath = location.pathname.replace(/\/$/, '') || '/about';
  const path = requestedPath === '/timeline' ? '/news' : requestedPath;
  const legacy = location.hash && document.getElementById(location.hash.slice(1));
  const link = links.find(item => legacy ? item.dataset.section === legacy.id : item.pathname === path);
  if (!link) return;
  history.replaceState(null, '', link.pathname);
  document.getElementById(link.dataset.section).scrollIntoView({behavior: 'instant', block: 'start'});
  updateNavigation();
}

for (const link of routeLinks) {
  link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (location.pathname !== link.pathname || location.hash) history.pushState(null, '', link.pathname);
    document.getElementById(link.dataset.section).scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
  });
}

let pending = false;
addEventListener('scroll', () => {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => { updateNavigation(); pending = false; });
}, {passive: true});
new ResizeObserver(updateHeader).observe(header);
addEventListener('load', () => { updateHeader(); showRoute(); });
addEventListener('popstate', showRoute);
addEventListener('hashchange', showRoute);
document.querySelector('#year').textContent = new Date().getFullYear();
