/* Gentle Hands Reflexology — interactions */
(function () {
    "use strict";

    var header   = document.querySelector(".site-header");
    var toggle   = document.getElementById("navToggle");
    var nav      = document.getElementById("nav");
    var toTop     = document.getElementById("toTop");
    var yearEl   = document.getElementById("year");

    /* current year in footer */
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

    /* ---- sticky header state + back-to-top ---- */
    function onScroll() {
        var y = window.scrollY || window.pageYOffset;
        if (header) { header.classList.toggle("scrolled", y > 40); }
        if (toTop)  { toTop.classList.toggle("show", y > 600); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---- mobile menu ---- */
    var backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);

    function closeMenu() {
        if (!nav) return;
        nav.classList.remove("open");
        if (toggle) {
            toggle.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open menu");
        }
        backdrop.classList.remove("show");
        document.body.classList.remove("nav-open");
    }

    function openMenu() {
        if (!nav) return;
        nav.classList.add("open");
        if (toggle) {
            toggle.classList.add("open");
            toggle.setAttribute("aria-expanded", "true");
            toggle.setAttribute("aria-label", "Close menu");
        }
        backdrop.classList.add("show");
        document.body.classList.add("nav-open");
    }

    if (toggle) {
        toggle.addEventListener("click", function () {
            nav.classList.contains("open") ? closeMenu() : openMenu();
        });
    }
    backdrop.addEventListener("click", closeMenu);

    /* close menu after tapping a link, and on Escape */
    if (nav) {
        nav.addEventListener("click", function (e) {
            if (e.target.closest("a")) { closeMenu(); }
        });
    }
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { closeMenu(); }
    });

    /* ---- scroll reveal ---- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add("visible"); });
    }
})();
