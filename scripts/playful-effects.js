(function () {
  function createDaduHelper() {
    if (document.querySelector(".dadu-helper")) {
      return;
    }

    const helper = document.createElement("button");
    helper.className = "dadu-helper";
    helper.type = "button";
    helper.setAttribute("aria-label", "Say hello");
    helper.innerHTML = `
      <span class="dadu-bubble">Hello, need help?</span>
      <span class="dadu-body">
        <span class="dadu-head">
          <span class="dadu-hair"></span>
          <span class="dadu-face">
            <span class="dadu-eye dadu-eye-left"></span>
            <span class="dadu-eye dadu-eye-right"></span>
            <span class="dadu-moustache"></span>
            <span class="dadu-smile"></span>
          </span>
        </span>
        <span class="dadu-hand">Hi</span>
      </span>
    `;

    helper.addEventListener("click", () => {
      const contactSection = document.getElementById("contact");

      helper.classList.add("is-open");

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    document.body.appendChild(helper);
  }

  function createGlobalToolStream() {
    if (document.querySelector(".global-tool-stream")) {
      return;
    }

    const tools = [
      { label: "Docker", icon: "devicon-docker-plain colored" },
      { label: "Kubernetes", icon: "devicon-kubernetes-plain colored" },
      { label: "Terraform", icon: "devicon-terraform-plain colored" },
      { label: "AWS", icon: "devicon-amazonwebservices-plain-wordmark tech-icon-aws" },
      { label: "Jenkins", icon: "devicon-jenkins-plain colored" },
      { label: "Argo CD", icon: "fa-solid fa-infinity tech-icon-argocd" },
      { label: "GitHub Actions", icon: "fa-brands fa-github tech-icon-actions" },
    ];
    const layer = document.createElement("div");
    layer.className = "global-tool-stream";
    layer.setAttribute("aria-hidden", "true");

    tools.forEach((tool, index) => {
      const item = document.createElement("span");
      item.className = "global-tool-chip";
      item.style.setProperty("--top", `${10 + ((index * 13) % 74)}vh`);
      item.style.setProperty("--delay", `${-index * 1.35}s`);
      item.style.setProperty("--speed", `${7 + (index % 3)}s`);
      item.innerHTML = `<i class="${tool.icon}"></i><span>${tool.label}</span>`;
      layer.appendChild(item);
    });

    document.body.appendChild(layer);
  }

  function createFloatingTechBadges() {
    const section = document.getElementById("technologies");

    if (!section || section.querySelector(".tech-float-layer")) {
      return;
    }

    const cards = [...section.querySelectorAll(".tech-card")].slice(0, 22);
    const layer = document.createElement("div");
    layer.className = "tech-float-layer";
    layer.setAttribute("aria-hidden", "true");

    cards.forEach((card, index) => {
      const icon = card.querySelector(".iconbox i");
      const label = card.querySelector("h5");

      if (!icon || !label) {
        return;
      }

      const badge = document.createElement("span");
      badge.className = "tech-float-badge";
      badge.style.setProperty("--x", `${8 + ((index * 17) % 82)}%`);
      badge.style.setProperty("--delay", `${-(index % 9) * 1.7}s`);
      badge.style.setProperty("--duration", `${14 + (index % 7) * 2}s`);
      badge.style.setProperty("--drift", `${index % 2 === 0 ? 32 : -32}px`);
      badge.innerHTML = `${icon.outerHTML}<span>${label.textContent.trim()}</span>`;
      layer.appendChild(badge);
    });

    section.prepend(layer);
  }

  function addSectionAmbientLayers() {
    const accentMap = {
      home: "fa-solid fa-code-branch",
      about: "fa-solid fa-user-gear",
      technologies: "fa-solid fa-cubes",
      "coding-achievements": "fa-solid fa-terminal",
      "achievements-gallery": "fa-solid fa-trophy",
      "certificates-gallery": "fa-solid fa-award",
      services: "fa-solid fa-cloud-arrow-up",
      work: "fa-solid fa-diagram-project",
      contact: "fa-solid fa-paper-plane",
    };

    document.querySelectorAll(".full-height").forEach((section, index) => {
      if (section.querySelector(".section-ambient")) {
        return;
      }

      const ambient = document.createElement("div");
      const accent = document.createElement("div");
      const iconClass = accentMap[section.id] || "fa-solid fa-cube";

      ambient.className = "section-ambient";
      ambient.setAttribute("aria-hidden", "true");
      accent.className = "section-3d-accent";
      accent.style.setProperty("--spin-delay", `${-index * 0.6}s`);
      accent.setAttribute("aria-hidden", "true");
      accent.innerHTML = `
        <span class="section-3d-ring"></span>
        <span class="section-3d-cube"><i class="${iconClass}"></i></span>
      `;
      section.prepend(ambient);
      section.prepend(accent);
    });
  }

  function initPlayfulEffects() {
    createDaduHelper();
    createGlobalToolStream();
    createFloatingTechBadges();
    addSectionAmbientLayers();
  }

  document.addEventListener("portfolio:sections-ready", initPlayfulEffects);
})();
