// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission
const appointmentForm = document.getElementById('appointmentForm');
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formInputs = this.querySelectorAll('input, textarea');
    
    // Simple form validation
    let isValid = true;
    formInputs.forEach(input => {
        if (input.required && !input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const email = this.querySelector('input[type="email"]').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        this.querySelector('input[type="email"]').style.borderColor = '#ef4444';
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Phone validation
    const phone = this.querySelector('input[type="tel"]').value;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
        this.querySelector('input[type="tel"]').style.borderColor = '#ef4444';
        showNotification('Please enter a valid phone number.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Reset form
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        showNotification('Thank you! Your appointment request has been submitted. We will contact you soon.', 'success');
    }, 2000);
});

// Join Now Enhanced Functionality with Choice Dialog
const joinModal = document.getElementById('joinModal');
const openJoinModalBtn = document.querySelector('.community-btn');
const closeJoinModalBtn = document.getElementById('closeJoinModal');
const joinForm = document.getElementById('joinForm');

// Create choice modal for join options
function createChoiceModal() {
    const choiceModal = document.createElement('div');
    choiceModal.id = 'joinChoiceModal';
    choiceModal.className = 'modal';
    choiceModal.innerHTML = `
        <div class="modal-content choice-modal-content">
            <span class="close-modal" id="closeChoiceModal">&times;</span>
            <h2 class="modal-title">How would you like to join us?</h2>
            <div class="join-options">
                <div class="join-option" onclick="openQuickJoin()">
                    <div class="option-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3>Quick Join</h3>
                    <p>Fill out a simple form with basic information and join our community in minutes.</p>
                    <button class="option-btn">Quick Form</button>
                </div>
                <div class="join-option" onclick="openDetailedJoin()">
                    <div class="option-icon">
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                    <h3>Detailed Application</h3>
                    <p>Complete a comprehensive form with more details about your background and interests.</p>
                    <button class="option-btn">Full Application</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(choiceModal);
    return choiceModal;
}

// Direct navigation to join page when join now is clicked
if (openJoinModalBtn) {
    openJoinModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'join.html';
    });
}

// Quick join function (opens existing modal)
function openQuickJoin() {
    const choiceModal = document.getElementById('joinChoiceModal');
    choiceModal.classList.remove('show');
    
    setTimeout(() => {
        if (joinModal) {
            joinModal.classList.add('show');
        }
    }, 300);
}

// Detailed join function (navigates to join page)
function openDetailedJoin() {
    window.location.href = 'join.html';
}

// Also connect Get Started button to join page directly
const getStartedBtn = document.querySelector('.cta-button');
if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'join.html';
    });
}

// Original modal functionality
if (joinModal && closeJoinModalBtn) {
    closeJoinModalBtn.addEventListener('click', function() {
        joinModal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === joinModal) {
            joinModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

if (joinForm) {
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[name="name"]');
        const email = this.querySelector('input[name="email"]');
        const phone = this.querySelector('input[name="phone"]');
        let isValid = true;
        [name, email, phone].forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--error)';
                isValid = false;
            } else {
                input.style.borderColor = 'var(--primary-purple)';
            }
        });
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.style.borderColor = 'var(--error)';
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone.value) || phone.value.replace(/\D/g, '').length < 10) {
            phone.style.borderColor = 'var(--error)';
            showNotification('Please enter a valid phone number.', 'error');
            return;
        }
        if (!isValid) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Joining...';
        submitButton.disabled = true;
        setTimeout(() => {
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            joinModal.classList.remove('show');
            document.body.style.overflow = '';
            showNotification('Thank you for joining our community! We will contact you soon.', 'success');
        }, 1800);
    });
}
// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#22c55e';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        default:
            notification.style.backgroundColor = '#2563eb';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
window.addEventListener('load', () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .team-member, .stat-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000, suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.target);
                const suffix = stat.dataset.suffix || '';
                animateCounter(stat, target, 2000, suffix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

window.addEventListener('load', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Book appointment button functionality
document.querySelectorAll('.book-appointment-btn, .cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const bookingSection = document.querySelector('.booking');
        if (bookingSection) {
            const offsetTop = bookingSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// About page "Read more" button functionality
const aboutReadMoreBtn = document.querySelector('.about-btn');
if (aboutReadMoreBtn) {
    aboutReadMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'about.html';
    });
}

// Add loading animation to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Image lazy loading fallback for older browsers
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add hover effects to interactive elements
document.querySelectorAll('.service-card, .team-member').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close any open modals/notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Add focus indicators for accessibility
document.querySelectorAll('button, a, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-teal)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Print styles optimization
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

console.log('Loyal Home Nursing Care website loaded successfully! 🏥💜');
