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

// glitch typing effect
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    const originalText = glitchText.textContent;
    glitchText.textContent = '';
    glitchText.classList.add('typing');
    
    let i = 0;
    const typeSpeed = 150; // ms per character
    
    function typeWriter() {
        if (i < originalText.length) {
            glitchText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // start glitch effect after typing is done
            setTimeout(() => {
                glitchText.classList.remove('typing');
                glitchText.classList.add('typing-complete');
                
                // Trigger fade-in animations for post-text and descriptions
                const postText = document.querySelector('.post-text');
                const desc1 = document.querySelector('.desc1');
                const desc2 = document.querySelector('.desc2');
                
                // Fade in post-text first
                if (postText) {
                    setTimeout(() => {
                        postText.classList.add('fade-in');
                    }, 200);
                }
                
                // Fade in descriptions after post-text completes (post-text takes 0.8s to fade in)
                if (desc1) {
                    setTimeout(() => {
                        desc1.classList.add('fade-in');
                    }, 1200); // 200ms + 800ms (post-text animation) + 200ms gap
                }
                
                if (desc2) {
                    setTimeout(() => {
                        desc2.classList.add('fade-in');
                    }, 1600); // 1200ms + 400ms stagger
                }
                
                setInterval(() => {
                    glitchText.classList.add('glitch-effect');
                    setTimeout(() => {
                        glitchText.classList.remove('glitch-effect');
                    }, 200);
                }, 3000);
            }, 500);
        }
    }
    
    setTimeout(() => {
        typeWriter();
    }, 1000);
}

const observerOptions = {
    root: null,
    threshold: isMobile ? 0.05 : 0.1,
    rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
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

// fallback for navigation
document.addEventListener('click', function(e) {
    // check if clicked element is a navigation link
    if (e.target.closest('a[href^="#"]')) {
        const link = e.target.closest('a[href^="#"]');
        const href = link.getAttribute('href');
        
        // console.log('Fallback navigation triggered for:', href);
        
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                // console.log('Fallback: scrolling to', href);
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
});

// touch handling for mobile project cards
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

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    const threshold = isMobile ? 10 : 50;
    
    if (currentScroll > lastScroll && currentScroll > threshold && !navbar.classList.contains('scroll-down')) {
        // scroll down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // scroll up
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

// send message request to backend server
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = document.querySelector('#send-button');
        const originalText = button.innerHTML;
        
        try {
            button.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            // get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // fetch request from backend server endpoint
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
