// Sunflower Plumbing — Main Site JS

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuToggle.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      menuToggle.querySelector('i').className = 'fas fa-bars';
    }
  });
}

// Highlight active nav link
(function() {
  const path = window.location.pathname;
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === path || (path.startsWith(a.getAttribute('href')) && a.getAttribute('href') !== '/')) {
      a.classList.add('active');
    }
  });
})();

// FAQ accordion (used on contact/about pages)
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span>';
    const data = Object.fromEntries(new FormData(contactForm));
    try {
      // TODO: Wire to GHL form endpoint when available
      // const res = await fetch('ENDPOINT', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) });
      console.log('Form data:', data);
      setTimeout(() => {
        btn.innerHTML = '<span>Sent! We\'ll be in touch.</span>';
        contactForm.reset();
      }, 800);
    } catch (err) {
      btn.innerHTML = '<span>Error &mdash; please call us at (316) 333-6326</span>';
      btn.disabled = false;
      setTimeout(() => { btn.innerHTML = originalHTML; btn.disabled = false; }, 4000);
    }
  });
}
