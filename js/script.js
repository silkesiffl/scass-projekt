'use strict';

// Henter referencer til relevante elementer i DOM'en
const bars = document.querySelector("#bars");// Menu-knappen (hamburger/kryds)
const icon = document.querySelector("#bars > i");// Ikonet inde i knappen
const nav = document.querySelector("#menu");// Navigationens <ul>-element
const navLinks = nav.querySelectorAll("li > a");// Alle links i navigationen

// Funktion til at fange tastatur-fokus og styre navigation med Tab, Shift+Tab og Escape
const trapFocus = (e) => {
    // Hvis menuen IKKE er åben, gør intet
    if (!nav.classList.contains("show")) return;

    // Definer første og sidste element i fokus-rækkefølgen
    const first = bars;
    const last = navLinks[navLinks.length - 1];

    // Brugeren trykker TAB
    if (e.key === "Tab") {
        // SHIFT+TAB på første element → flyt fokus til sidste link
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); // Forhindrer standard Tab-rotation
            last.focus();       // Gør loopet komplet baglæns
        }

        // TAB på sidste element → flyt fokus tilbage til knappen (første)
        else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus(); // Fokus-loop fremad
        }
    }

    // Brugeren trykker ESCAPE → luk menuen og sæt fokus tilbage på knappen
     window.addEventListener("keyup", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
        nav.classList.remove("show");// Fjern 'show' → skjul menu

        icon.classList.add("fa-bars");// Skift ikon tilbage til hamburger
        icon.classList.remove("fa-xmark");

        bars.setAttribute("aria-expanded", "false");// Opdater ARIA-attribut: menuen er nu lukket
        bars.setAttribute("aria-label", "åben navigation"); // Opdater label for skærmlæsere
        bars.focus(); // Sæt fokus tilbage på knappen
    }
})};

// Funktion der åbner/lukker navigationen ved klik på bars-knappen
const openNav = () => {
    nav.classList.toggle("show"); // Vis/skjul menu via CSS-klasse

    icon.classList.toggle("fa-bars"); // Skift ikon (hamburger ↔ kryds)
    icon.classList.toggle("fa-xmark");

    // ARIA: opdater om menuen er åben/lukket
    const expanded = bars.getAttribute("aria-expanded") === "true";
    bars.setAttribute("aria-expanded", expanded ? "false" : "true");

    // ARIA: skift label afhængigt af tilstand
    const label = bars.getAttribute("aria-label") === "åben navigation";
    bars.setAttribute("aria-label", label ? "luk navigation" : "åben navigation");
};

// Tilføj klik-event til knappen → åbn/luk menuen
bars.addEventListener("click", openNav);

// Tilføj global keydown-lytter → styrer fokus-loop og ESC-luk
document.addEventListener("keydown", trapFocus);