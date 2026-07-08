// ============================================================
// Shared site behavior: nav toggle, lightbox, filters, forms
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile nav toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navPill = document.querySelector('.nav-pill');
  if (navToggle && navPill) {
    navToggle.addEventListener('click', () => {
      const isOpen = navPill.classList.toggle('open');
      navToggle.textContent = isOpen ? 'CLOSE' : 'MENU';
    });
  }

  // ---- Lightbox for Work gallery ----
  const lightbox = document.getElementById('lightbox');
  const lightboxInner = document.querySelector('.lightbox-inner');
  document.querySelectorAll('[data-lightbox-trigger]').forEach(card => {
    card.addEventListener('click', () => {
      if (!lightbox) return;
      const title = card.dataset.title || '';
      const meta = card.dataset.meta || '';
      const desc = card.dataset.desc || '';
      const svg = card.querySelector('.art-thumb svg');
      lightboxInner.innerHTML = `
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <div class="art-thumb">${svg ? svg.outerHTML : ''}</div>
        <span class="eyebrow">${meta}</span>
        <h3 style="margin-bottom:8px;">${title}</h3>
        <p style="margin:0;">${desc}</p>
      `;
      lightbox.classList.add('open');
      lightboxInner.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    });
  });
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }
  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('open');
  }

  // ---- Work page category filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        filterCards.forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ---- Shop: "Inquire" buttons pre-fill the inquiry form ----
  const inquiryField = document.getElementById('inquiry-piece');
  document.querySelectorAll('[data-inquire]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (inquiryField) {
        inquiryField.value = btn.dataset.inquire;
        document.getElementById('inquiry-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        inquiryField.closest('form')?.querySelector('input[name="name"]')?.focus({ preventScroll: true });
      }
      showToast(`Added "${btn.dataset.inquire}" to your inquiry`);
    });
  });

  // ---- Form submission feedback (static site: no backend) ----
  document.querySelectorAll('form[data-static-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      // mailto forms still navigate normally; just show a friendly confirmation first
      showToast('Opening your email app to send this...');
    });
  });

  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }
});
