/* ==================================================
   NAVBAR OPEN / CLOSE
================================================== */
const container = document.querySelector(".container");
const openNavbarIcon = document.querySelector(".open-navbar-icon");
const closeNavbarIcon = document.querySelector(".close-navbar-icon");

openNavbarIcon.addEventListener("click", () => {
  container.classList.add("change");
});

closeNavbarIcon.addEventListener("click", () => {
  container.classList.remove("change");
});

/* ==================================================
   NAV LINK BACKGROUND COLORS
================================================== */
const colors = ["#6495ed", "#7fffd4", "#ffa07a", "#f08080", "#afeeee"];
let index = 0;

document.querySelectorAll(".nav-link").forEach(link => {
  link.style.backgroundColor = colors[index++ % colors.length];
});


/* ==================================================
   TOUR CARD FLIP (FRONT ↔ BACK)
================================================== */
document.querySelectorAll(".navigation-button").forEach(button => {
  button.addEventListener("click", () => {
    button.closest(".card").classList.toggle("change");
  });
});

/* ==================================================
   BOOKING MODAL OPEN / CLOSE
================================================== */
const modal = document.getElementById("bookingModal");
const tourInput = document.getElementById("tourName");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".book-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const tourName = btn.closest(".card").querySelector(".tour-name").innerText;
    tourInput.value = tourName;
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

/* ==================================================
   TOAST NOTIFICATION
================================================== */
function showToast(message, success = true) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.background = success ? "#28a745" : "#dc3545";

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/* ==================================================
   LOADING SPINNER FUNCTIONS
================================================== */
const loader = document.getElementById("loader");

function showLoader() {
  loader.style.display = "flex";
}

function hideLoader() {
  loader.style.display = "none";
}

/* ==================================================
   BOOKING FORM SUBMIT (EMAILJS ENABLED)
================================================== */
document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = e.target[1].value.trim();
  const email = e.target[2].value.trim();
  const tour = tourInput.value;

  if (!name || !email) {
    showToast("Please fill all required fields", false);
    return;
  }

  emailjs.send("service_llq0iiv", "template_djnz9pm", {
    tour_name: tour,
    user_name: name,
    user_email: email
  })
  .then(() => {
    showToast("🎉 Booking confirmed! Email sent");
    modal.style.display = "none";
    e.target.reset();
  })
  .catch(() => {
    showToast("❌ Email failed. Try again.", false);
  });
});

/* ==================================================
   CONTACT FORM VALIDATION
================================================== */
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = contactForm.querySelector("input[type='text']").value.trim();
  const email = contactForm.querySelector("input[type='email']").value.trim();

  if (!name || !email) {
    showToast("Please enter Name & Email", false);
    return;
  }

  showToast("✔ Message sent successfully");
  contactForm.reset();
});

/* ==================================================
   ACTIVE NAV LINK ON SCROLL
================================================== */
const sections = document.querySelectorAll("header, section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 250;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ==================================================
   AUTO CLOSE NAVBAR AFTER LINK CLICK
================================================== */
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    container.classList.remove("change");
  });
});

/* ==================================================
   TOUR SEARCH + FILTER + SORT (MERGED ✅)
================================================== */
const searchInput = document.getElementById("tourSearch");
const difficultyFilter = document.getElementById("difficultyFilter");
const priceFilter = document.getElementById("priceFilter");
const tourContainer = document.querySelector(".cards-wrapper");
let tourCards = Array.from(document.querySelectorAll(".card"));

function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const difficultyValue = difficultyFilter.value;

  tourCards.forEach(card => {
    const tourName = card.querySelector(".tour-name").textContent.toLowerCase();
    const cardDifficulty = card.dataset.difficulty;

    const matchesSearch = tourName.includes(searchValue);
    const matchesDifficulty =
      !difficultyValue || cardDifficulty === difficultyValue;

    card.style.display =
      matchesSearch && matchesDifficulty ? "block" : "none";
  });
}

function sortTours() {
  const priceValue = priceFilter.value;
  if (!priceValue) return;

  tourCards.sort((a, b) => {
    const priceA = parseInt(a.dataset.price);
    const priceB = parseInt(b.dataset.price);

    return priceValue === "low"
      ? priceA - priceB
      : priceB - priceA;
  });

  tourCards.forEach(card => tourContainer.appendChild(card));
}

searchInput.addEventListener("keyup", applyFilters);
difficultyFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("change", sortTours);

/* ==================================================
   PROJECT FEATURES SCROLL ANIMATION
================================================== */
const featureItems = document.querySelectorAll(".project-features li");

const featureObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.2 }
);

featureItems.forEach(item => {
  item.style.opacity = "0";
  item.style.transform = "translateY(30px)";
  item.style.transition = "all 0.6s ease";
  featureObserver.observe(item);
});

/* ==================================================
   🌙 DARK MODE TOGGLE
================================================== */
const darkModeToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.innerText = "☀️ Light Mode";
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    darkModeToggle.innerText = "☀️ Light Mode";
  } else {
    localStorage.setItem("darkMode", "disabled");
    darkModeToggle.innerText = "🌙 Dark Mode";
  }
});
