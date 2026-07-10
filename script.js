// ============================================================
// Shared site behavior: nav toggle, lightbox, filters, forms
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded!");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    document.querySelectorAll(".lightbox-link").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            lightboxImg.src = link.href;
            lightbox.classList.add("active");
        });
    });

    lightbox.addEventListener("click", e => {
        if (e.target === lightbox || e.target.classList.contains("close")) {
            lightbox.classList.remove("active");
        }
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            lightbox.classList.remove("active");
        }
    });
});

  // ---- Mobile nav toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navPill = document.querySelector('.nav-pill');
  if (navToggle && navPill) {
    navToggle.addEventListener('click', () => {
      const isOpen = navPill.classList.toggle('open');
      navToggle.textContent = isOpen ? 'CLOSE' : 'MENU';
    });
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
