// homepage.js - Handles home page specific interactions

// Smooth scroll to sections
function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation active state
function setActiveNavLink() {
    const sections = ['home', 'features', 'how-it-works', 'pricing'];
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        const navLink = document.querySelector(`[data-nav="${section}"]`);
        
        if (element && navLink) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
}

// Smooth scroll for navigation links
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-nav');
            
            if (target === 'home') {
                scrollToTop();
            } else {
                const section = document.getElementById(target);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Animate feature cards on scroll
function initScrollAnimations() {
    const cards = document.querySelectorAll('.feature-card, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// Initialize all home page features
function initHomePage() {
    initNavigation();
    initScrollAnimations();
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', initHomePage);