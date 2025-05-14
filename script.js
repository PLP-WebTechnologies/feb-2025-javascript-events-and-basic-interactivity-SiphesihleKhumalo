document.addEventListener("DOMContentLoaded", () => {
  // 1. Event Handling 🎈
  const changeTextButton = document.getElementById("changeTextButton");
  const heroHeading = document.getElementById("heroHeading");
  const workItems = document.querySelectorAll(".work-item");
  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const messageInput = document.getElementById("messageInput");
  const formFeedback = document.getElementById("formFeedback");
  const imageGallery = document.querySelector(".image-gallery");
  const galleryImages = document.querySelectorAll(".gallery-image");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;
  let longPressTimer;

  // Button click ✅ - Change Hero Heading Text
  if (changeTextButton && heroHeading) {
    changeTextButton.addEventListener("click", () => {
      heroHeading.textContent = "Welcome to our Awesome Portfolio!";
    });
  }

  // Hover effects ✅ - Add a visual cue on work items
  workItems.forEach((item) => {
    const originalText = item.querySelector(".work-description").textContent;
    const hoverText = item.getAttribute("data-hover-text") || "View Project";

    item.addEventListener("mouseover", () => {
      item.classList.add("hovered");
      item.querySelector(".work-description").textContent = hoverText;
    });

    item.addEventListener("mouseout", () => {
      item.classList.remove("hovered");
      item.querySelector(".work-description").textContent = originalText;
    });
  });

  // Keypress detection ✅ - Log key presses on the document
  document.addEventListener("keypress", (event) => {
    console.log(`Key pressed: ${event.key}`);
  });

  // Bonus: A secret action for a long press 🤫 - Change About Us text
  const aboutSection = document.getElementById("about");
  const aboutText = document.getElementById("aboutText");
  if (aboutSection && aboutText) {
    aboutSection.addEventListener("mousedown", () => {
      longPressTimer = setTimeout(() => {
        aboutText.textContent =
          "Secret action triggered! You held the mouse down on 'About Us'.";
        aboutSection.classList.add("long-pressed");
        setTimeout(() => {
          aboutText.textContent =
            "We are a group of passionate developers who love creating beautiful and functional web applications. Our goal is to provide the best user experience possible while delivering high-quality code.";
          aboutSection.classList.remove("long-pressed");
        }, 3000);
      }, 2000); // 2 seconds for long press
    });

    aboutSection.addEventListener("mouseup", () => {
      clearTimeout(longPressTimer);
    });

    aboutSection.addEventListener("mouseleave", () => {
      clearTimeout(longPressTimer);
    });
  }

  // 2. Interactive Elements 🎮

  // A button that changes text or color (already implemented with changeTextButton)

  // An image gallery or slideshow
  if (imageGallery && galleryImages.length > 0 && prevBtn && nextBtn) {
    function showImage(index) {
      galleryImages.forEach((img) => img.classList.remove("active"));
      galleryImages[index].classList.add("active");
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showImage(currentIndex);
    }

    function prevImage() {
      currentIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(currentIndex);
    }

    showImage(currentIndex); // Show the initial image
    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);

    // Bonus: Add some animation using JS or CSS ✨ (CSS for hover, JS for gallery)
    // You can add CSS transitions to .gallery-image for a smoother slideshow.
  }

  // 3. Form Validation 📋✅
  if (contactForm && nameInput && emailInput && messageInput && formFeedback) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission
      let isValid = true;
      formFeedback.textContent = ""; // Clear previous feedback

      // Required field checks
      if (!nameInput.value.trim()) {
        formFeedback.textContent += "Name is required. ";
        isValid = false;
      }
      if (!emailInput.value.trim()) {
        formFeedback.textContent += "Email is required. ";
        isValid = false;
      }
      if (!messageInput.value.trim()) {
        formFeedback.textContent += "Message is required. ";
        isValid = false;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() && !emailRegex.test(emailInput.value)) {
        formFeedback.textContent += "Invalid email format. ";
        isValid = false;
      }

      if (isValid) {
        formFeedback.textContent = "Message sent successfully!";
        contactForm.reset(); // Clear the form
      }
    });
  }
});
