/**
 * Define Global Variables
 */
const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 */
// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to add or remove active class from navigation menu
function toggleActiveClass(index) {
  const navLinks = document.querySelectorAll('.menu__link');
  navLinks.forEach((link, i) => {
    if (i === index) {
      link.classList.add('nav-active');
    } else {
      link.classList.remove('nav-active');
    }
  });
}

/**
 * End Helper Functions
 * Begin Main Functions
 */
// Build the navigation menu
function buildNav() {
  // Create a document fragment to optimize performance
  const fragment = document.createDocumentFragment();

  // Loop through sections to build the navigation menu dynamically
  sections.forEach((section) => {
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');
    navLink.textContent = section.getAttribute('data-nav');
    navLink.classList.add('menu__link');

    // Scroll to section on link click
    navLink.addEventListener('click', (event) => {
      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth' });
    });

    navItem.appendChild(navLink);
    fragment.appendChild(navItem);
  });

  navbarList.appendChild(fragment);
}

// Callback function for the Intersection Observer
function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = Array.from(sections).indexOf(entry.target);
      toggleActiveClass(index);
    }
  });
}

/**
 * End Main Functions
 * Begin Events
 */
// Build the navigation menu
document.addEventListener('DOMContentLoaded', buildNav);

// Set sections as active while scrolling
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);
sections.forEach((section) => {
  observer.observe(section);
});
