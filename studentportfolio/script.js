
// =====================================
// MAHELET'S PORTFOLIO NAVIGATION
// One section visible at a time
// =====================================

const sections = document.querySelectorAll(".page-section");
const navigationLinks = document.querySelectorAll(".nav-link");

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");

// DISPLAY THE SELECTED SECTION

function showPage(pageId) {

    const selectedPage = document.getElementById(pageId);

    // Check that the requested page exists
    if (!selectedPage || !selectedPage.classList.contains("page-section")) {
        return;
    }

    // Hide every section
    sections.forEach(section => {
        section.classList.remove("active-page");
    });

    // Show only the selected section
    selectedPage.classList.add("active-page");

    // Update the navigation highlight
    navigationLinks.forEach(link => {

        const isActive = link.dataset.page === pageId;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    // Close mobile navigation
    if (navbar) {
        navbar.classList.remove("open");
    }

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    }

    // Return to the top when changing sections
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Update the browser address
    history.replaceState(null, "", "#" + pageId);
}


// NAVIGATION LINKS

navigationLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const pageId = this.dataset.page;

        showPage(pageId);
    });

});


// BUTTONS THAT OPEN OTHER SECTIONS

const pageButtons = document.querySelectorAll("[data-go]");

pageButtons.forEach(button => {

    button.addEventListener("click", function() {

        const pageId = this.dataset.go;

        showPage(pageId);

    });

});


// MOBILE MENU

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function() {

        const isOpen = navbar.classList.toggle("open");

        this.setAttribute("aria-expanded", String(isOpen));

        this.textContent = isOpen ? "✕" : "☰";

    });

}


// OPEN THE HOME PAGE WHEN THE WEBSITE STARTS

document.addEventListener("DOMContentLoaded", function() {

    showPage("home");

});
