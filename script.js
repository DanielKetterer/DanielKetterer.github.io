// Progressive enhancement flag: reveal styles only apply when JS is running
document.documentElement.classList.add("js");

// Mobile nav toggle
var toggle = document.querySelector(".nav-toggle");
var nav = document.getElementById("site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Scroll reveal
var reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  var ro = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          ro.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach(function (el) { ro.observe(el); });
} else {
  reveals.forEach(function (el) { el.classList.add("in"); });
}

// Active section in nav
var sections = document.querySelectorAll("main section[id]");
var navLinks = document.querySelectorAll(".site-header nav a[href^='#']");
if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  var so = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach(function (s) { so.observe(s); });
}
