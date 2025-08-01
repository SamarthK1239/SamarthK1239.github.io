// Traditional Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeCopyFunctionality();
    initializeAnimations();
    initializeMobileMenu();
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active navigation item on scroll
    const sections = document.querySelectorAll('.section[id]');
    const navItems = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Copy to clipboard functionality for contact information
function initializeCopyFunctionality() {
    const copyableElements = document.querySelectorAll('.contact-hidden');
    
    copyableElements.forEach(element => {
        element.addEventListener('click', async function() {
            const hiddenContent = this.querySelector('.hidden-content');
            if (hiddenContent) {
                const textToCopy = hiddenContent.textContent.trim();
                
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    showCopyConfirmation(this);
                } catch (err) {
                    // Fallback for older browsers
                    fallbackCopyToClipboard(textToCopy, this);
                }
            }
        });
    });
}

// Show copy confirmation
function showCopyConfirmation(element) {
    element.classList.add('contact-copied');
    
    setTimeout(() => {
        element.classList.remove('contact-copied');
    }, 2000);
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text, element) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyConfirmation(element);
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = navLinks.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const animatedElements = document.querySelectorAll('.section, .project-card, .accomplishment-item, .cert-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Typewriter effect for hero subtitle
    typewriterEffect();
}

// Typewriter effect
function typewriterEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid #00ffff';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            // Blinking cursor effect
            setInterval(() => {
                subtitle.style.borderRight = subtitle.style.borderRight === 'none' ? '2px solid #00ffff' : 'none';
            }, 500);
        }
    }, 100);
}

// Terminal-style console messages
function initializeConsoleMessages() {
    const messages = [
        '$ whoami',
        'Samarth Khatri - Full Stack Developer',
        '$ cat /dev/interests',
        'AI/ML, Cloud Computing, Web Development',
        '$ echo "Welcome to my portfolio!"',
        'Welcome to my portfolio!',
        '$ ls -la achievements/',
        'AWS Certified Cloud Practitioner',
        'Google IT Support Professional',
        'Multiple hackathon wins',
        '$ pwd',
        '/home/samarth/portfolio',
        '$ _'
    ];

    let currentMessage = 0;
    const consoleLog = () => {
        if (currentMessage < messages.length) {
            console.log(messages[currentMessage]);
            currentMessage++;
        }
    };

    // Display console messages with delay
    setInterval(consoleLog, 1000);
}

// Add terminal-style console messages
initializeConsoleMessages();

// Scroll progress indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00ff00, #00ffff);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress indicator
initializeScrollProgress();

// Easter egg: Konami code
function initializeKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Matrix-style rain effect
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 35);
    
    // Remove after 10 seconds
    setTimeout(() => {
        clearInterval(matrixInterval);
        document.body.removeChild(canvas);
        console.log('🎉 Easter egg deactivated! You found the secret!');
    }, 10000);
    
    console.log('🎮 Matrix mode activated! Enjoy the show!');
}

// Initialize Konami code
initializeKonamiCode();

// Performance monitoring
function initializePerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
    });
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Add CSS for active navigation states and mobile menu
const additionalStyles = `
    .nav-link.active {
        color: #00ffff !important;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 60px;
            right: -100%;
            width: 250px;
            height: calc(100vh - 60px);
            background: #1a1a1a;
            flex-direction: column;
            padding: 2rem 1rem;
            transition: right 0.3s ease;
            border-left: 1px solid #333;
        }
        
        .nav-links.active {
            right: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Export functions for potential external use
window.portfolioFunctions = {
    initializeNavigation,
    initializeCopyFunctionality,
    initializeAnimations,
    initializeMobileMenu,
    showCopyConfirmation
};
