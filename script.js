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
    strings: [
      "DevOps Associate Intern",
      "DevSecOps Learner",
      "Java Full Stack Developer",
    ],
    typeSpeed: 100,
    backSpeed: 150,
    loop: true,
  });
}

function initHeroThreeScene() {
  const mount = document.getElementById("heroThreeScene");

  if (!mount || !window.THREE) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  const group = new THREE.Group();
  const particleCount = window.innerWidth < 768 ? 80 : 150;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const colorA = new THREE.Color("#88c0d0");
  const colorB = new THREE.Color("#a3be8c");
  const colorC = new THREE.Color("#ffffff");
  const mouse = { x: 0, y: 0 };

  for (let i = 0; i < particleCount; i += 1) {
    const index = i * 3;
    const radius = 2.2 + Math.random() * 4.8;
    const angle = Math.random() * Math.PI * 2;
    const height = (Math.random() - 0.5) * 5.5;
    const color = i % 3 === 0 ? colorA : i % 3 === 1 ? colorB : colorC;

    positions[index] = Math.cos(angle) * radius;
    positions[index + 1] = height;
    positions[index + 2] = Math.sin(angle) * radius;
    colors[index] = color.r;
    colors[index + 1] = color.g;
    colors[index + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: window.innerWidth < 768 ? 0.055 : 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
  });
  const points = new THREE.Points(geometry, material);

  const linePositions = [];

  for (let i = 0; i < particleCount - 8; i += 4) {
    const current = i * 3;
    const next = (i + 7) * 3;

    linePositions.push(
      positions[current],
      positions[current + 1],
      positions[current + 2],
      positions[next],
      positions[next + 1],
      positions[next + 2]
    );
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePositions, 3)
  );
  const lineMaterial = new THREE.LineBasicMaterial({
    color: "#88c0d0",
    transparent: true,
    opacity: 0.16,
  });
  const connectionLines = new THREE.LineSegments(lineGeometry, lineMaterial);

  const coreGeometry = new THREE.IcosahedronGeometry(1.05, 1);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: "#a3be8c",
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  core.position.set(2.35, 0.15, 0);

  const ringGeometry = new THREE.TorusGeometry(2.85, 0.006, 8, 160);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: "#88c0d0",
    transparent: true,
    opacity: 0.28,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2.35;

  const secondaryRing = new THREE.Mesh(ringGeometry.clone(), ringMaterial.clone());
  secondaryRing.material.color = new THREE.Color("#a3be8c");
  secondaryRing.material.opacity = 0.2;
  secondaryRing.rotation.x = Math.PI / 3.2;
  secondaryRing.rotation.y = Math.PI / 4;

  group.add(points);
  group.add(connectionLines);
  group.add(ring);
  group.add(secondaryRing);
  group.add(core);
  group.position.x = window.innerWidth < 992 ? 0.6 : 1.35;
  scene.add(group);
  camera.position.z = 7.5;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  mount.appendChild(renderer.domElement);

  function resize() {
    const width = mount.clientWidth || 1;
    const height = mount.clientHeight || 1;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function handlePointerMove(event) {
    const rect = mount.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  }

  function animate() {
    group.rotation.y += prefersReducedMotion ? 0 : 0.0017;
    group.rotation.x += prefersReducedMotion ? 0 : 0.0007;
    group.rotation.y += (mouse.x * 0.08 - group.rotation.y) * 0.006;
    group.rotation.x += (-mouse.y * 0.08 - group.rotation.x) * 0.006;
    core.rotation.x += prefersReducedMotion ? 0 : 0.003;
    core.rotation.y -= prefersReducedMotion ? 0 : 0.004;
    ring.rotation.z -= prefersReducedMotion ? 0 : 0.0013;
    secondaryRing.rotation.z += prefersReducedMotion ? 0 : 0.001;
    renderer.render(scene, camera);

    if (!prefersReducedMotion) {
      requestAnimationFrame(animate);
    }
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", handlePointerMove, { passive: true });
  resize();
  animate();
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

  function updateScrollTopButton() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      scrollableHeight > 0 ? Math.min(scrollTop / scrollableHeight, 1) : 0;

    scrollTopBtn.classList.toggle("is-visible", scrollTop > 120);
    scrollTopBtn.style.setProperty("--scroll-progress", `${progress * 360}deg`);
  }

  scrollTopBtn.addEventListener("click", () => {
    scrollTopBtn.classList.add("is-clicked");
    window.scrollTo({ top: 0, behavior: "smooth" });

    window.setTimeout(() => {
      scrollTopBtn.classList.remove("is-clicked");
    }, 450);
  });

  updateScrollTopButton();
  window.addEventListener("scroll", updateScrollTopButton, { passive: true });
  window.addEventListener("resize", updateScrollTopButton);
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
  document.dispatchEvent(new CustomEvent("portfolio:sections-ready"));
  initHeroThreeScene();
  initAos();
  initTypedText();
  initCursor();
  initScrollTopButton();
  initGalleryTilt();
  initActiveNavLinks();
  initContextMenuGuard();
}

initPortfolio();
