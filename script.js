AOS.init();

AOS.init({
  // Settings that can be overridden on per-element basis, by data-aos-* attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

// gallery hover effect
<script>
  document.querySelectorAll('.gallery-card').forEach(card => {
    const wrapper = card.querySelector('.img-3d-wrapper');

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -(y - centerY) / 10;
      const rotateY = (x - centerX) / 10;

      wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      wrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
</script>

