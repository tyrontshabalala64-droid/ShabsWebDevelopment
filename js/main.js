 // ===== HAMBURGER TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}

// ===== ACTIVE NAV LINK =====
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('#navMenu a');

    navLinksAll.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// ===== CONTACT FORM - WHATSAPP & EMAIL =====
const form = document.getElementById('contactForm');
const statusDiv = document.getElementById('formStatus');

if (form && statusDiv) {
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const subjectInput = document.getElementById('formSubject');
    const messageInput = document.getElementById('formMessage');
    const whatsappBtn = document.getElementById('sendWhatsApp');
    const emailBtn = document.getElementById('sendEmail');

    function showStatus(type, message) {
        statusDiv.className = 'form-status ' + type;
        statusDiv.style.display = 'block';
        statusDiv.textContent = message;
    }

    function clearStatus() {
        statusDiv.className = 'form-status';
        statusDiv.style.display = 'none';
        statusDiv.textContent = '';
    }

    function validateForm() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            showStatus('error', '❌ Please fill in all required fields (Name, Email, Message).');
            return false;
        }
        return { name, email, subject: subjectInput.value.trim(), message };
    }

    // ===== SEND VIA WHATSAPP =====
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearStatus();

            const data = validateForm();
            if (!data) return;

            const { name, email, subject, message } = data;

            const whatsappMessage = 
                `Hello Shabs Web Development!%0A%0A📝 *New Enquiry via Website*%0A%0A👤 *Name:* ${encodeURIComponent(name)}%0A📧 *Email:* ${encodeURIComponent(email)}%0A📌 *Subject:* ${encodeURIComponent(subject || 'General Enquiry')}%0A💬 *Message:* ${encodeURIComponent(message)}%0A%0A---%0APlease get back to me as soon as possible.`;

            const phoneNumber = '27738537751';
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

            showStatus('success', '✅ Opening WhatsApp... Please send the message to us.');
            form.reset();

            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 800);
        });
    }

    // ===== SEND VIA EMAIL =====
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearStatus();

            const data = validateForm();
            if (!data) return;

            const { name, email, subject, message } = data;

            const emailSubject = encodeURIComponent(subject || 'Enquiry from Shabs Web Development');
            const emailBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            const mailtoURL = `mailto:akanijoy@gmail.com?subject=${emailSubject}&body=${emailBody}`;

            showStatus('success', '✅ Opening your email client... Please send the message.');
            form.reset();

            setTimeout(() => {
                window.location.href = mailtoURL;
            }, 600);
        });
    }
}

// ===== INTERSECTION OBSERVER FOR SECTIONS =====
const sections = document.querySelectorAll('.industry-section');

if (sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class
                entry.target.classList.add('active');
                
                // Update header color based on section
                const header = document.querySelector('header');
                const logo = document.querySelector('.logo h1 span');
                const navLinks = document.querySelectorAll('nav ul li a');
                
                // Get the industry type from class
                const sectionClasses = entry.target.className;
                let accentColor = '#00d4ff'; // default
                
                if (sectionClasses.includes('industry-food')) accentColor = '#e85d04';
                else if (sectionClasses.includes('industry-electrical')) accentColor = '#00d4ff';
                else if (sectionClasses.includes('industry-salon')) accentColor = '#d946ef';
                else if (sectionClasses.includes('industry-mechanic')) accentColor = '#ef4444';
                else if (sectionClasses.includes('industry-tutoring')) accentColor = '#22d3ee';
                else if (sectionClasses.includes('industry-cleaning')) accentColor = '#34d399';
                else if (sectionClasses.includes('industry-clothing')) accentColor = '#f472b6';
                else if (sectionClasses.includes('industry-delivery')) accentColor = '#f59e0b';
                else if (sectionClasses.includes('industry-realestate')) accentColor = '#8b5cf6';
                else if (sectionClasses.includes('industry-fitness')) accentColor = '#ef4444';
                else if (sectionClasses.includes('industry-photography')) accentColor = '#9ca3af';
                else if (sectionClasses.includes('industry-healthcare')) accentColor = '#0ea5e9';
                else if (sectionClasses.includes('industry-hotel')) accentColor = '#f59e0b';
                else if (sectionClasses.includes('industry-it')) accentColor = '#06b6d4';
                else if (sectionClasses.includes('industry-construction')) accentColor = '#f97316';
                else if (sectionClasses.includes('industry-pets')) accentColor = '#10b981';
                else if (sectionClasses.includes('industry-events')) accentColor = '#ec4899';
                else if (sectionClasses.includes('industry-financial')) accentColor = '#14b8a6';
                else if (sectionClasses.includes('industry-travel')) accentColor = '#06b6d4';
                else if (sectionClasses.includes('industry-legal')) accentColor = '#6366f1';
                
                // Update header border color
                if (header) {
                    header.style.borderBottomColor = accentColor + '40';
                }
                
                // Update logo span color
                if (logo) {
                    logo.style.color = accentColor;
                }
                
                // Update nav links hover color
                navLinks.forEach(link => {
                    link.style.setProperty('--hover-color', accentColor);
                });
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== SCROLL INDICATOR FADE =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.5s ease';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ===== CAROUSEL SYSTEM =====
// Track all carousels
const carousels = {};

function initCarousel(id) {
    const track = document.getElementById('track-' + id);
    const indicators = document.querySelectorAll('#indicators-' + id + ' button');
    
    if (!track) return;
    
    const slides = track.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Store carousel data
    carousels[id] = {
        track,
        slides,
        currentIndex,
        totalSlides,
        indicators
    };
    
    // Update display
    updateCarousel(id);
}

function updateCarousel(id) {
    const carousel = carousels[id];
    if (!carousel) return;
    
    const { track, slides, currentIndex, totalSlides, indicators } = carousel;
    
    // Move track
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    if (indicators) {
        indicators.forEach((btn, i) => {
            btn.classList.toggle('active', i === currentIndex);
        });
    }
}

function goToSlide(id, index) {
    const carousel = carousels[id];
    if (!carousel) return;
    
    const { totalSlides } = carousel;
    
    // Wrap around
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    carousel.currentIndex = index;
    updateCarousel(id);
}

function nextSlide(id) {
    const carousel = carousels[id];
    if (!carousel) return;
    goToSlide(id, carousel.currentIndex + 1);
}

function prevSlide(id) {
    const carousel = carousels[id];
    if (!carousel) return;
    goToSlide(id, carousel.currentIndex - 1);
}

// ===== TOUCH/DRAG SUPPORT =====
function setupDragSupport(id) {
    const track = document.getElementById('track-' + id);
    if (!track) return;
    
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide(id);
            } else {
                prevSlide(id);
            }
        }
        isDragging = false;
    }, { passive: true });
}

// ===== INITIALIZE ALL CAROUSELS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all carousels
    const carouselIds = ['food', 'electrical', 'salon', 'clothing', 'delivery', 
                         'realestate', 'fitness', 'travel', 'healthcare', 'hotel',
                         'tutoring', 'cleaning', 'photography', 'it', 'construction',
                         'pets', 'events', 'financial', 'legal', 'mechanic'];
    
    carouselIds.forEach(id => {
        initCarousel(id);
        setupDragSupport(id);
    });
});

// ===== KEYBOARD SUPPORT =====
document.addEventListener('keydown', function(e) {
    // Find active carousel
    const activeSection = document.querySelector('.industry-section.active');
    if (!activeSection) return;
    
    const carousel = activeSection.querySelector('.demo-carousel');
    if (!carousel) return;
    
    // Extract ID from carousel
    const id = carousel.id.replace('carousel-', '');
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide(id);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide(id);
    }
});