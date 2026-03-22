document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Fade-in Animation on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded in to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // If mobile menu is open, close it
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
                
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Auto-slide for Team Grid
    const teamGrid = document.querySelector('.team-grid');
    if (teamGrid) {
        let isUserInteracting = false;
        
        teamGrid.addEventListener('touchstart', () => isUserInteracting = true, {passive: true});
        teamGrid.addEventListener('touchend', () => {
            setTimeout(() => isUserInteracting = false, 2000); // Resume auto-scroll after 2s
        }, {passive: true});
        teamGrid.addEventListener('mouseenter', () => isUserInteracting = true);
        teamGrid.addEventListener('mouseleave', () => isUserInteracting = false);

        setInterval(() => {
            // Check if grid is horizontally scrollable and user isn't interacting
            if (teamGrid.scrollWidth > teamGrid.clientWidth && !isUserInteracting) {
                const maxScrollLeft = teamGrid.scrollWidth - teamGrid.clientWidth;
                
                // If at the end, scroll back to start
                if (teamGrid.scrollLeft >= maxScrollLeft - 10) {
                    teamGrid.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Compute exact scroll position for the next card
                    const firstCard = teamGrid.querySelector('.team-card');
                    const cardWidth = firstCard ? firstCard.offsetWidth : teamGrid.clientWidth;
                    const gap = parseInt(window.getComputedStyle(teamGrid).gap) || 24;
                    const itemWidth = cardWidth + gap;
                    
                    // Determine current slide based on scroll position
                    let currentSlide = Math.round(teamGrid.scrollLeft / itemWidth);
                    let nextSlide = currentSlide + 1;
                    
                    teamGrid.scrollTo({ left: nextSlide * itemWidth, behavior: 'smooth' });
                }
            }
        }, 3000);
    }
});
