const header = document.querySelector("[data-header]");
const heroMedia = document.querySelector(".hero-media");
const revealItems = document.querySelectorAll(".reveal");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const updateParallax = () => {
  if (!heroMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const offset = Math.min(window.scrollY * 0.12, 54);
  heroMedia.style.setProperty("--parallax", `${offset}px`);
};

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach(item => {
  const rect = item.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    item.classList.add("is-visible");
  } else {
    observer.observe(item);
  }
});
updateHeader();
updateParallax();

window.addEventListener("scroll", () => {
  updateHeader();
  updateParallax();
}, { passive: true });
