// ============================================================
// Shared site behavior: nav toggle, lightbox, filters, forms
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // LIGHTBOX
    // ========================================================

    const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const links = [...document.querySelectorAll(".lightbox-link")];

let currentIndex = 0;

function showImage(index){

    currentIndex = index;

    lightboxImg.src = links[index].href;

    lightbox.classList.add("show");

}

links.forEach((link,index)=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        showImage(index);

    });

});

    document.querySelector(".lightbox-next").addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= links.length){
        currentIndex = 0;
    }

    showImage(currentIndex);

});

document.querySelector(".lightbox-prev").addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = links.length - 1;
    }

    showImage(currentIndex);

});

    document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("show")) return;

    if(e.key === "ArrowRight"){

        document.querySelector(".lightbox-next").click();

    }

    if(e.key === "ArrowLeft"){

        document.querySelector(".lightbox-prev").click();

    }

    if(e.key === "Escape"){

      if (e.key === "Escape") {
    closeLightbox();
}

});

    function closeLightbox() {
    lightbox.classList.remove("show");
}

lightbox.addEventListener("click", (e) => {
    if (
        e.target === lightbox ||
        e.target.classList.contains("lightbox-close")
    ) {
        closeLightbox();
    }
});


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

    const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const formData = new FormData(contactForm);

        const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {

            contactForm.reset();

            document.getElementById("success-message").style.display = "block";

        } else {

            alert("Sorry, something went wrong. Please try again.");
        }

        

    });

}
    

});
