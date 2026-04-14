document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     THEME (ALL PAGES)
  ========================= */
  const body = document.body;
  const lightThemeBtn = document.getElementById("lightThemeBtn");
  const darkThemeBtn = document.getElementById("darkThemeBtn");

  const savedTheme = localStorage.getItem("homepageTheme");
  if (savedTheme) {
    body.classList.remove("light-theme", "dark-theme");
    body.classList.add(savedTheme);
  }

  if (lightThemeBtn) {
    lightThemeBtn.addEventListener("click", function () {
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
      localStorage.setItem("homepageTheme", "light-theme");
    });
  }

  if (darkThemeBtn) {
    darkThemeBtn.addEventListener("click", function () {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
      localStorage.setItem("homepageTheme", "dark-theme");
    });
  }

  /* =========================
     BACK TO TOP (HOME)
  ========================= */
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* =========================
     CLOCK (HOME)
  ========================= */
  const clock = document.getElementById("clock");

  if (clock) {
    function updateClock() {
      const now = new Date();
      clock.textContent =
        now.toLocaleDateString() + " | " + now.toLocaleTimeString();
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* =========================
     REVIEWS SLIDER (HOME)
  ========================= */
  const reviewsTrack = document.getElementById("reviewsTrack");
  const reviewNextBtn = document.getElementById("reviewNextBtn");

  if (reviewsTrack && reviewNextBtn) {
    let currentIndex = 0;

    reviewNextBtn.addEventListener("click", function () {
      const cards = reviewsTrack.querySelectorAll(".review-card");
      if (cards.length === 0) return;

      const cardWidth = cards[0].offsetWidth + 16;
      currentIndex++;

      if (currentIndex >= cards.length) currentIndex = 0;

      reviewsTrack.style.transform =
        "translateX(-" + (currentIndex * cardWidth) + "px)";
    });
  }

  /* =========================
     ABOUT PAGE (SORT TEACHERS)
  ========================= */
  const sortSelect = document.getElementById("sortTeachers");
  const teachersContainer = document.getElementById("teachersContainer");

  if (sortSelect && teachersContainer) {

    const teacherCards = Array.from(
      teachersContainer.querySelectorAll(".teacher-card")
    );

    function renderCards(cards) {
      teachersContainer.innerHTML = "";
      cards.forEach(card => teachersContainer.appendChild(card));
    }

    function shuffleCards(cards) {
      const shuffled = [...cards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    function sortTeachers(type) {
      let sorted = [...teacherCards];

      if (type === "random") {
        sorted = shuffleCards(sorted);
      } else if (type === "az") {
        sorted.sort((a, b) =>
          a.dataset.name.localeCompare(b.dataset.name)
        );
      } else if (type === "za") {
        sorted.sort((a, b) =>
          b.dataset.name.localeCompare(a.dataset.name)
        );
      } else if (type === "exp-low") {
        sorted.sort((a, b) =>
          Number(a.dataset.experience) - Number(b.dataset.experience)
        );
      } else if (type === "exp-high") {
        sorted.sort((a, b) =>
          Number(b.dataset.experience) - Number(a.dataset.experience)
        );
      }

      renderCards(sorted);
    }

    sortTeachers("random");

    sortSelect.addEventListener("change", function () {
      sortTeachers(sortSelect.value);
    });
  }

});