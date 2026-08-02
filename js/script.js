(() => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const overlay = document.getElementById("lightbox-overlay");
  const triggers = Array.from(document.querySelectorAll("[data-lightbox]"));

  if (
    !lightbox ||
    !lightboxImg ||
    !lightboxCaption ||
    !closeBtn ||
    !prevBtn ||
    !nextBtn ||
    !overlay ||
    triggers.length === 0
  ) {
    return;
  }

  let currentIndex = 0;

  const showImage = (index) => {
    const normalized = (index + triggers.length) % triggers.length;
    const trigger = triggers[normalized];

    lightboxImg.src = trigger.getAttribute("data-src") || trigger.getAttribute("src") || "";
    lightboxImg.alt = trigger.getAttribute("alt") || "";
    lightboxCaption.textContent = trigger.getAttribute("data-caption") || "";
    currentIndex = normalized;
  };

  const openLightbox = (index) => {
    showImage(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  triggers.forEach((trigger, index) => {
    trigger.style.cursor = "zoom-in";
    trigger.addEventListener("click", () => openLightbox(index));
  });

  closeBtn.addEventListener("click", closeLightbox);
  overlay.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });
})();
