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

    const fd = new FormData(contactForm);
    const payload = {
      firstName: fd.get('firstName') || fd.get('first_name') || fd.get('name')?.split(' ')[0] || '',
      lastName:  fd.get('lastName')  || fd.get('last_name')  || fd.get('name')?.split(' ').slice(1).join(' ') || '',
      phone:     fd.get('phone') || '',
      email:     fd.get('email') || '',
      service:   fd.get('service') || '',
      message:   fd.get('message') || '',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Server error');

      // Fire GTM dataLayer event for generate_lead conversion
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'form_submit_success', form_type: 'contact_form' });
      if (typeof window.fathom !== 'undefined') { window.fathom.trackEvent('form submit - contact_form'); }

      btn.innerHTML = '<span>Sent! We\'ll be in touch shortly.</span>';
      contactForm.reset();

    } catch (err) {
      console.error('Form submission error:', err);
      btn.innerHTML = '<span>Error &mdash; please call us at (316) 333-6326</span>';
      btn.disabled = false;
      setTimeout(() => { btn.innerHTML = originalHTML; btn.disabled = false; }, 4000);
    }
  });
}

// HouseCall Pro booking widget — intercept #hcpro clicks and open modal
document.addEventListener('click', function(e) {
  const link = e.target.closest('a[href="#hcpro"]');
  if (!link) return;
  e.preventDefault();
  if (typeof HCPWidget !== 'undefined' && HCPWidget.openModal) {
    HCPWidget.openModal();
  } else {
    // Widget not loaded yet — fall back to direct booking URL
    window.open(
      'https://online-booking.housecallpro.com/book/Sunflower-Plumbing--Reliable-Dirtworks?token=cbc0ca9936ec4f589da40d02d6f05a11',
      '_blank'
    );
  }
});
