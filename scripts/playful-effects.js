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
      helper.classList.toggle("is-open");
    });

    document.body.appendChild(helper);
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
    document.querySelectorAll(".full-height").forEach((section) => {
      if (section.querySelector(".section-ambient")) {
        return;
      }

      const ambient = document.createElement("div");
      ambient.className = "section-ambient";
      ambient.setAttribute("aria-hidden", "true");
      section.prepend(ambient);
    });
  }

  function initPlayfulEffects() {
    createDaduHelper();
    createFloatingTechBadges();
    addSectionAmbientLayers();
  }

  document.addEventListener("portfolio:sections-ready", initPlayfulEffects);
})();
