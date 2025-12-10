// ===== PAGE NAVIGATION =====
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update active nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
}

// ===== CAROUSEL FUNCTIONALITY =====
const carousels = {
    'about-carousel': 0,
    'hobbies-carousel': 0,
    'websites-carousel': 0,
    'projects-carousel': 0,
    'contact-carousel': 0
};

function changeSlide(carouselId, n) {
    carousels[carouselId] += n;
    showSlide(carouselId);
}

function currentSlide(carouselId, n) {
    carousels[carouselId] = n;
    showSlide(carouselId);
}

function showSlide(carouselId) {
    const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.parentElement.querySelectorAll('.carousel-dot');
    let index = carousels[carouselId];

    // Loop carousel
    if (index >= slides.length) {
        carousels[carouselId] = 0;
        index = 0;
    }
    if (index < 0) {
        carousels[carouselId] = slides.length - 1;
        index = slides.length - 1;
    }

    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// ===== CUSTOM CURSOR FUNCTIONALITY =====
const cursor = document.getElementById('cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor with smooth trailing effect
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Make cursor grow on hover of clickable elements
const clickableElements = document.querySelectorAll('a, button, .visit-btn, nav a, .carousel-button, .carousel-dot');
clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft') {
        // Navigate to previous carousel slide
        const activeCarousel = document.querySelector('.carousel-slide.active');
        if (activeCarousel) {
            const carouselContainer = activeCarousel.closest('.carousel');
            const carouselId = carouselContainer.getAttribute('data-carousel');
            changeSlide(carouselId, -1);
        }
    } else if (e.key === 'ArrowRight') {
        // Navigate to next carousel slide
        const activeCarousel = document.querySelector('.carousel-slide.active');
        if (activeCarousel) {
            const carouselContainer = activeCarousel.closest('.carousel');
            const carouselId = carouselContainer.getAttribute('data-carousel');
            changeSlide(carouselId, 1);
        }
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.info-card, .website-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== ACTIVE PAGE ON LOAD =====
window.addEventListener('load', () => {
    // Show home page by default
    const homePage = document.getElementById('home');
    if (homePage) {
        homePage.classList.add('active');
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c✨ Welcome to Etia\'s Portfolio! ✨', 'color: #ff6b9d; font-size: 16px; font-weight: bold;');
console.log('%cMade with HTML, CSS, and JavaScript', 'color: #ff8fb3; font-size: 14px;');