const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

toggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  header.style.boxShadow =
    window.scrollY > 16 ? "0 4px 24px rgba(17, 24, 39, 0.06)" : "none";
});

const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
);

revealElements.forEach((el) => observer.observe(el));

function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll("[data-count]").forEach((num) => {
          animateCounter(num, parseInt(num.dataset.count, 10));
        });
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll(".stats-glass-row, .hero").forEach((el) => {
  if (el.querySelector("[data-count]")) counterObserver.observe(el);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinkItems.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { threshold: 0.3, rootMargin: "-70px 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
  }
});

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
