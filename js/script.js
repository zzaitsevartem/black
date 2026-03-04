
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const updateThemeIcon = (isLight) => {
        themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    };

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        const isCurrentlyLight = body.classList.toggle('light-theme');
        localStorage.setItem('portfolio-theme', isCurrentlyLight ? 'light' : 'dark');
        updateThemeIcon(isCurrentlyLight);
    });

    const burgerMenu = document.querySelector('.burger-menu');
    const menuItems = document.querySelector('.menu-items');
    const burgerIcon = burgerMenu.querySelector('i');

    const toggleMenu = (show) => {
        menuItems.classList.toggle('active', show);
        burgerIcon.className = show ? 'fas fa-times' : 'fas fa-bars';
    };

    burgerMenu.addEventListener('click', () => {
        const isOpen = menuItems.classList.contains('active');
        toggleMenu(!isOpen);
    });

    document.querySelectorAll('.header-item').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

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

    const revealItems = document.querySelectorAll('section, .portfolio-item, .tech-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealItems.forEach(item => {
        item.classList.add('reveal-item');
        revealObserver.observe(item);
    });
});