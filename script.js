// ============ Navbar scroll state ============
const navbar = document.getElementById('navbar');

function updateNavbar() {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}
updateNavbar();
window.addEventListener('scroll', updateNavbar, { passive: true });

// ============ Scroll progress bar ============
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// ============ Mobile menu toggle ============
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

// ============ Scroll reveal (IntersectionObserver) ============
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-reveal-delay');
                if (delay) {
                    el.style.transitionDelay = delay + 'ms';
                }
                el.classList.add('in-view');
                revealObserver.unobserve(el);
            }
        });
    },
    { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));