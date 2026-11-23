const TOTAL_PHOTOS = 18;

const customCaptions = {
  1: "M.S. Dhoni — Iconic moments and timeless composure.",
  7: "Jersey No. 07 — A number etched in Indian cricket history.",
  18: "Legacy in motion — Inspiring generations on and off the field."
};

const slides = Array.from({ length: TOTAL_PHOTOS }, (_, idx) => {
  const num = idx + 1;
  return {
    src: `images/msd${num}.jpeg`,
    alt: `M.S. Dhoni photo ${num}`,
    caption: customCaptions[num] || ``
  };
});

const slideImage = document.getElementById("slide-image");
const slideCaption = document.getElementById("slide-caption");
const prevBtn = document.getElementById("prev-slide");
const nextBtn = document.getElementById("next-slide");
const toggleBtn = document.getElementById("toggle-slide");

let currentIndex = 0;
let isPlaying = true;
let timerId = null;

let transitionTimeout = null;

function renderSlide(index) {
  if (!slideImage || !slides.length) return;
  currentIndex = (index + slides.length) % slides.length;
  const item = slides[currentIndex];

  clearTimeout(transitionTimeout);
  slideImage.classList.add("is-transitioning");

  transitionTimeout = setTimeout(() => {
    slideImage.src = item.src;
    slideImage.alt = item.alt;
    if (slideCaption) {
      slideCaption.textContent = item.caption;
      slideCaption.style.display = item.caption ? "block" : "none";
    }
    if (slideImage.complete) {
      requestAnimationFrame(() => {
        slideImage.classList.remove("is-transitioning");
      });
    } else {
      slideImage.onload = () => {
        requestAnimationFrame(() => {
          slideImage.classList.remove("is-transitioning");
        });
      };
    }
  }, 220);
}

function nextSlide() {
  renderSlide(currentIndex + 1);
}

function prevSlide() {
  renderSlide(currentIndex - 1);
}

function startSlideshow() {
  stopSlideshow();
  timerId = setInterval(nextSlide, 5000);
  isPlaying = true;
  if (toggleBtn) toggleBtn.textContent = "Pause";
}

function stopSlideshow() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  isPlaying = false;
  if (toggleBtn) toggleBtn.textContent = "Play";
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevSlide();
    if (isPlaying) startSlideshow();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    if (isPlaying) startSlideshow();
  });
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    if (isPlaying) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });
}

renderSlide(0);
startSlideshow();