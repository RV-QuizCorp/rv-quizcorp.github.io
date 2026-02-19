// Mobile nav toggle
const menuToggle = document.getElementById('menu-toggle');
const menuIcon = document.getElementById('menu-icon');
const mobileNav = document.getElementById('mobile-nav');

menuToggle.addEventListener('click', () => {
    const isOpen = !mobileNav.classList.contains('hidden');
    mobileNav.classList.toggle('hidden');
    menuIcon.className = isOpen ? 'fa-solid fa-bars text-xl' : 'fa-solid fa-xmark text-xl';
    menuToggle.setAttribute('aria-expanded', !isOpen);
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        menuIcon.className = 'fa-solid fa-bars text-xl';
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Active nav highlighting with IntersectionObserver
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, {
    rootMargin: '-20% 0px -80% 0px'
});

sections.forEach(section => navObserver.observe(section));

// Quiz category modals (dialog elements)
document.querySelectorAll('.portfolio-card[data-dialog]').forEach(card => {
    card.addEventListener('click', () => {
        const dialogId = card.getAttribute('data-dialog');
        const dialog = document.getElementById(dialogId);
        if (dialog) dialog.showModal();
    });
});

// Close dialog buttons
document.querySelectorAll('.dialog-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('dialog').close();
    });
});

// Close dialog on backdrop click
document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', e => {
        if (e.target === dialog) dialog.close();
    });
});

// Scroll-to-top button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        scrollTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
        scrollTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        scrollTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll animations with IntersectionObserver
const fadeElements = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));
