// ============================================================
// Shared site behavior: nav toggle, lightbox, filters, forms
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // LIGHTBOX
    // ========================================================

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (lightbox && lightboxImg) {

        document.querySelectorAll(".lightbox-link").forEach(link => {

            link.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("clicked");
                lightboxImg.src = this.href;
                lightbox.classList.add("open");
            });

        });

        function closeLightbox() {
            lightbox.classList.remove("open");
        }

        lightbox.addEventListener("click", function (e) {

            // Close when clicking the dark background
            if (e.target === lightbox) {
                closeLightbox();
            }

            // Close when clicking the X
         if (e.target.classList.contains("lightbox-close")) {
    closeLightbox();
         }
        });

        document.addEventListener("keydown", function (e) {

            if (e.key === "Escape") {
                closeLightbox();
            }

        });

    }


    // ========================================================
    // MOBILE MENU
    // ========================================================

    const navToggle = document.querySelector(".nav-toggle");
    const navPill = document.querySelector(".nav-pill");

    if (navToggle && navPill) {

        navToggle.addEventListener("click", () => {

            const isOpen = navPill.classList.toggle("open");
            navToggle.textContent = isOpen ? "CLOSE" : "MENU";

        });

    }


    // ========================================================
    // WORK PAGE FILTERS
    // ========================================================

    const filterBtns = document.querySelectorAll(".filter-btn");
    const filterCards = document.querySelectorAll("[data-category]");

    if (filterBtns.length) {

        filterBtns.forEach(btn => {

            btn.addEventListener("click", () => {

                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const category = btn.dataset.filter;

                filterCards.forEach(card => {

                    if (
                        category === "all" ||
                        card.dataset.category === category
                    ) {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }

                });

            });

        });

    }


    // ========================================================
    // SHOP INQUIRY BUTTONS
    // ========================================================

    const inquiryField = document.getElementById("inquiry-piece");

    document.querySelectorAll("[data-inquire]").forEach(btn => {

        btn.addEventListener("click", () => {

            if (inquiryField) {

                inquiryField.value = btn.dataset.inquire;

                document
                    .getElementById("inquiry-form-section")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }

            showToast(`Added "${btn.dataset.inquire}" to your inquiry`);

        });

    });


    // ========================================================
    // FORM FEEDBACK
    // ========================================================

    document.querySelectorAll("form[data-static-form]").forEach(form => {

        form.addEventListener("submit", () => {

            showToast("Opening your email app to send this...");

        });

    });


    // ========================================================
    // TOAST MESSAGE
    // ========================================================

    function showToast(message) {

        let toast = document.querySelector(".toast");

        if (!toast) {

            toast = document.createElement("div");
            toast.className = "toast";
            document.body.appendChild(toast);

        }

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(window.__toastTimer);

        window.__toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2600);

    }

});
