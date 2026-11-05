// Native anchors keep the page usable even without JavaScript.
const header = document.querySelector('.pf-bar');
const links = [...document.querySelectorAll('.pf-nav a[href^="#"]')];
const sections = links.map(link => document.querySelector(link.hash));

function updateNavigation() {
  const threshold = header.getBoundingClientRect().height + 90;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    current = sections.at(-1);
  }
  for (const link of links) {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

function updateHeader() {
  document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
  updateNavigation();
}

let pending = false;
window.addEventListener('scroll', () => {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    updateNavigation();
    pending = false;
  });
}, { passive: true });
new ResizeObserver(updateHeader).observe(header);
window.addEventListener('load', updateHeader);
document.querySelector('#year').textContent = new Date().getFullYear();
