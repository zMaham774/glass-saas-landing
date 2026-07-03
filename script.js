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

// ============ Animated counters ============
const counters = document.querySelectorAll('.counter');

function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = Math.floor(eased * target);
        el.textContent = value.toLocaleString() + suffix;
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target.toLocaleString() + suffix;
        }
    }
    requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

counters.forEach((el) => counterObserver.observe(el));

// ============ Magnetic button interaction ============
const magneticBtns = document.querySelectorAll('.btn-magnetic');

magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ============ Pricing billing toggle ============
const billToggle = document.getElementById('billToggle');
const billLabelMonthly = document.getElementById('billLabelMonthly');
const billLabelYearly = document.getElementById('billLabelYearly');
const priceValues = document.querySelectorAll('.price-value');
const priceCards = document.querySelectorAll('.pricing-card');

if (billToggle) {
    billToggle.addEventListener('click', () => {
        const isYearly = billToggle.getAttribute('aria-checked') === 'true';
        const next = !isYearly;
        billToggle.setAttribute('aria-checked', next ? 'true' : 'false');

        billLabelMonthly.classList.toggle('text-text', !next);
        billLabelMonthly.classList.toggle('text-muted', next);
        billLabelYearly.classList.toggle('text-text', next);
        billLabelYearly.classList.toggle('text-muted', !next);

        priceValues.forEach((el) => {
            const amount = next ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
            el.style.opacity = '0';
            setTimeout(() => {
                el.textContent = '$' + amount;
                el.style.opacity = '1';
            }, 120);
        });

        // update the "Billed monthly/yearly" helper text
        document.querySelectorAll('.billed-text').forEach((el) => {
            el.textContent = next ? 'Billed yearly' : 'Billed monthly';
        });
    });
}

// ============ FAQ accordion ============
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // close all other items (single-open accordion)
        faqItems.forEach((other) => {
            other.classList.remove('is-open');
            other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
            item.classList.add('is-open');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});