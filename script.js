async function loadIncludes() {
  const includeNodes = [...document.querySelectorAll("[data-include]")];

  await Promise.all(
    includeNodes.map(async (node) => {
      const file = node.getAttribute("data-include");

      try {
        const response = await fetch(file);

        if (!response.ok) {
          throw new Error(`Unable to load ${file}`);
        }

        node.outerHTML = await response.text();
      } catch (error) {
        console.error(error);
        node.innerHTML = "";
      }
    })
  );
}

function initAos() {
  if (!window.AOS) {
    return;
  }

  AOS.init({
    offset: 120,
    delay: 0,
    duration: 700,
    easing: "ease",
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom",
  });
}

function initTypedText() {
  const target = document.querySelector(".mytext");

  if (!target || !window.Typed) {
    return;
  }

  new Typed(".mytext", {
    strings: ["Java Full Stack Developer", "Spring Framework Specialist"],
    typeSpeed: 100,
    backSpeed: 150,
    loop: true,
  });
}

function initCursor() {
  const cursorDot = document.querySelector(".cursor-dot");

  if (!cursorDot) {
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;

  document.addEventListener("mouseleave", () => {
    cursorDot.classList.add("hidden");
  });

  document.addEventListener("mouseenter", () => {
    cursorDot.classList.remove("hidden");
  });

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animateCursor() {
    dotX += (mouseX - dotX) * 0.1;
    dotY += (mouseY - dotY) * 0.1;
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

function initScrollTopButton() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (!scrollTopBtn) {
    return;
  }

  window.addEventListener("scroll", () => {
    const isVisible =
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
    scrollTopBtn.style.display = isVisible ? "block" : "none";
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initGalleryTilt() {
  document.querySelectorAll(".gallery-card").forEach((card) => {
    const wrapper = card.querySelector(".img-3d-wrapper");

    if (!wrapper) {
      return;
    }

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -(y - centerY) / 10;
      const rotateY = (x - centerX) / 10;

      wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      wrapper.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });
}

function initActiveNavLinks() {
  const sectionLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');
  const pageSections = [...sectionLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!pageSections.length) {
    return;
  }

  function setActiveSectionLink() {
    const scrollPoint = window.scrollY + window.innerHeight * 0.35;
    let activeId = pageSections[0].id;

    pageSections.forEach((section) => {
      if (section.offsetTop <= scrollPoint) {
        activeId = section.id;
      }
    });

    sectionLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
  }

  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse.show");

      if (navbarCollapse && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });

  setActiveSectionLink();
  window.addEventListener("scroll", setActiveSectionLink, { passive: true });
}

function initContextMenuGuard() {
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    alert("Right-click is disabled on this page.");
  });
}

async function initPortfolio() {
  await loadIncludes();
  initAos();
  initTypedText();
  initCursor();
  initScrollTopButton();
  initGalleryTilt();
  initActiveNavLinks();
  initContextMenuGuard();
}

initPortfolio();
