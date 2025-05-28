console.log('Script loaded successfully');

// Test function to manually test navigation
function testNavigation() {
    console.log('Testing navigation...');
    const aboutSection = document.querySelector('#about');
    const projectsSection = document.querySelector('#projects');
    const contactSection = document.querySelector('#contact');
    
    console.log('About section:', aboutSection);
    console.log('Projects section:', projectsSection);
    console.log('Contact section:', contactSection);
    
    // Test scroll to about section
    if (aboutSection) {
        console.log('About section found, testing scroll...');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add test function to window for debugging
window.testNavigation = testNavigation;

// Check if device is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Parallax effect for project cards (only on desktop)
if (!isMobile) {
    const projectCards = document.querySelectorAll('.project-card');
    window.addEventListener('mousemove', e => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        projectCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;
            
            const angleX = (mouseY - cardY) / 30;
            const angleY = (mouseX - cardX) / -30;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
    });

    // Reset card transform on mouse leave
    projectCards.forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Typing effect with glitch
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    const originalText = glitchText.textContent;
    glitchText.textContent = '';
    glitchText.classList.add('typing');
    
    // Typing animation
    let i = 0;
    const typeSpeed = 150; // Milliseconds per character
    
    function typeWriter() {
        if (i < originalText.length) {
            glitchText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Typing complete, start glitch effect
            setTimeout(() => {
                glitchText.classList.remove('typing');
                glitchText.classList.add('typing-complete');
                
                // Start glitch interval after typing is done
                setInterval(() => {
                    glitchText.classList.add('glitch-effect');
                    setTimeout(() => {
                        glitchText.classList.remove('glitch-effect');
                    }, 200);
                }, 3000);
            }, 500);
        }
    }
    
    // Start typing after a brief delay
    setTimeout(() => {
        typeWriter();
    }, 1000);
}

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    threshold: isMobile ? 0.05 : 0.1, // Lower threshold for mobile
    rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            // Optional: Remove class to re-trigger animation when scrolling back up
            entry.target.classList.remove('in-view');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in, #projects, #about, #contact');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Found navigation links:', navLinks.length);
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Navigation clicked:', this.getAttribute('href'));
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                console.log('Target found:', targetId);
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.log('Target not found:', targetId);
            }
        });
    });
}

// Initialize smooth scrolling when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScrolling);
} else {
    initSmoothScrolling();
}

// Additional fallback for navigation
document.addEventListener('click', function(e) {
    // Check if clicked element is a navigation link
    if (e.target.closest('a[href^="#"]')) {
        const link = e.target.closest('a[href^="#"]');
        const href = link.getAttribute('href');
        
        console.log('Fallback navigation triggered for:', href);
        
        // Only handle internal navigation links
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                console.log('Fallback: scrolling to', href);
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
});

// Touch handling for mobile project cards
if (isMobile) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Form submission handling with modern feedback
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = document.querySelector('#send-button');
        const originalText = button.innerHTML;
        
        try {
            button.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate sending (replace with actual endpoint)
            await fetch('https://portfolio-backend-production-0a2b.up.railway.app/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            button.innerHTML = '<span>Sent!</span><i class="fas fa-check"></i>';
            button.classList.add('success');
            form.reset();
            
        } catch (error) {
            console.error('Error:', error);
            button.innerHTML = '<span>Error!</span><i class="fas fa-exclamation-circle"></i>';
            button.classList.add('error');
        } finally {
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.classList.remove('success', 'error');
            }, 3000);
        }
    });
}

// Navbar scroll effect (improved for mobile)
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    // On mobile, hide navbar more aggressively while scrolling down
    const threshold = isMobile ? 10 : 50;
    
    if (currentScroll > lastScroll && currentScroll > threshold && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Handle mobile orientation changes
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        // Force reflow to fix viewport height issues
        document.body.style.height = '100.1%';
        setTimeout(function() {
            document.body.style.height = '100%';
        }, 100);
    }, 500);
});

// Prevent context menu on touch devices for better UX
if (isMobile) {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
}

// Control running line visibility
const runningLine = document.querySelector('.running-line');
const homeSection = document.querySelector('#home');

function updateRunningLineVisibility() {
    if (homeSection) {
        const homeSectionRect = homeSection.getBoundingClientRect();
        const isInHomeSection = homeSectionRect.top <= 60 && homeSectionRect.bottom >= 0;
        
        if (!isInHomeSection) {
            runningLine.classList.add('hidden');
        } else {
            runningLine.classList.remove('hidden');
        }
    }
}

window.addEventListener('scroll', updateRunningLineVisibility);
window.addEventListener('resize', updateRunningLineVisibility);
// Initial check
updateRunningLineVisibility();
