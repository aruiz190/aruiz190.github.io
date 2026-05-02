document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");
  const contactForm = document.querySelector(".contact-form");
  const formMessage = document.getElementById("formMessage");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    body.classList.add("light");

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", "true");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light");

      const isLight = body.classList.contains("light");

      localStorage.setItem("theme", isLight ? "light" : "dark");
      themeToggle.setAttribute("aria-pressed", isLight ? "true" : "false");
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (backToTop) {
      if (scrollTop > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  const revealElements = document.querySelectorAll(
    ".section-heading, .project-card, .timeline-card, .skill-group, .contact-card, .contact-form, .highlight-card, .resume-viewer, .resume-actions"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      if (formMessage) {
        formMessage.textContent = "Sending message...";
      }
    });
  }
});
