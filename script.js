// Smooth scrolling for navigation links
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

// Create animated particle background
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';

    const colors = [
        'rgba(255, 255, 255, 0.3)',
        'rgba(6, 182, 212, 0.4)', // Cyan
        'rgba(217, 70, 239, 0.4)'  // Fuchsia
    ];

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        particlesContainer.appendChild(particle);
    }

    hero.appendChild(particlesContainer);
}

// Add particle float animation to CSS dynamically
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    .particles-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 1;
    }
    
    @keyframes float-particle {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(0.8);
            opacity: 0.6;
        }
        33% { 
            transform: translateY(-20px) translateX(10px) scale(1);
            opacity: 1;
        }
        66% { 
            transform: translateY(-10px) translateX(-15px) scale(0.9);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyle);

// Enhanced mobile menu toggle with animations
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
navLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Enhanced navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;

    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        const parallax = scrolled * 0.3;
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// Enhanced animate elements on scroll with stagger effect
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animated');
            }, index * 150); // Stagger animation
        }
    });
}, observerOptions);

// Observe all elements and initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Create particle background
    createParticles();

    // Setup scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .app-showcase, .security-feature, .tech-item, .download-app');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    // Enhanced phone animations with 3D effect
    const phones = document.querySelectorAll('.phone');
    phones.forEach((phone, index) => {
        phone.style.opacity = '0';
        phone.style.transform = 'translateY(60px) rotateX(15deg) rotateY(15deg) scale(0.9)';
        phone.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        setTimeout(() => {
            phone.style.opacity = '1';
            phone.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        }, index * 300 + 800);
    });

    // Add mouse parallax effect to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20; // Reduced sensitivity
            const rotateY = (centerX - x) / 20;

            card.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        });
    });
});

// Enhanced loading animation for download buttons
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <div class="btn-text"><span class="btn-subtitle">Preparing</span><span class="btn-title">Download...</span></div>';
        btn.style.pointerEvents = 'none';
        btn.style.transform = 'scale(0.95)';
        btn.style.background = 'var(--text-main)';
        btn.style.color = 'var(--bg-dark)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.pointerEvents = 'auto';
            btn.style.transform = 'scale(1)';
            btn.style.background = '';
            btn.style.color = '';

            // Enhanced notification
            showNotification('🚀 Coming soon! Apps will be available on the App Store and Google Play.');
        }, 2500);
    });

    // Add ripple effect
    btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;

        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Enhanced notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
        color: white;
        padding: 1.2rem 1.8rem;
        border-radius: 16px;
        box-shadow: 
            0 20px 40px -10px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        z-index: 10000;
        transform: translateX(400px) scale(0.8);
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-width: 320px;
        font-weight: 600;
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(400px) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Phone mockup animations
document.addEventListener('DOMContentLoaded', () => {
    const phones = document.querySelectorAll('.phone');

    phones.forEach((phone, index) => {
        phone.style.opacity = '0';
        phone.style.transform = 'translateY(50px) rotateY(15deg)';
        phone.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            phone.style.opacity = '1';
            phone.style.transform = 'translateY(0) rotateY(0)';
        }, index * 200 + 500);
    });
});

// Add hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Security layer animation
document.addEventListener('DOMContentLoaded', () => {
    const securityLayers = document.querySelectorAll('.security-layer');

    securityLayers.forEach((layer, index) => {
        layer.style.opacity = '0';
        layer.style.transform = 'translateY(30px)';
        layer.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            layer.style.opacity = '1';
            layer.style.transform = 'translateY(0)';
        }, index * 200 + 1000);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const parallax = scrolled * 0.5;

    if (hero) {
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;

    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 1000);
});

// Add floating animation to app icons and hamburger animations
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.style.animation = 'float 3s ease-in-out infinite';
});

// Add essential CSS for animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
        background: #6366f1;
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
        background: #6366f1;
    }
    
    .hamburger span {
        transition: all 0.3s ease;
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .animated {
        animation: fadeInScale 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    @keyframes fadeInScale {
        0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(enhancedStyles);