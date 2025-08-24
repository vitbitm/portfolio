// Portfolio Application JavaScript - FIXED VERSION
class PortfolioApp {
    constructor() {
        this.isAdminMode = false;
        this.currentEditingElement = null;
        this.portfolioData = {
            "hero": {
                "name": "Виктор Мурахин",
                "title": "QA Engineer",
                "subtitle": "Начинающий специалист по обеспечению качества",
                "description": "Страстный тестировщик, стремящийся к созданию качественного программного обеспечения"
            },
            "about": {
                "text": "Я начинающий QA специалист с техническим образованием и страстью к обеспечению качества программного обеспечения. Изучаю современные методологии тестирования, инструменты автоматизации и стремлюсь развиваться в сфере контроля качества. Готов применять полученные знания на практике и расти профессионально в команде.",
                "experience": "6 месяцев изучения QA",
                "projects": "5+ учебных проектов",
                "education": "Курсы по тестированию ПО"
            },
            "skills": [
                {"name": "Мануальное тестирование", "level": 75},
                {"name": "Тест-кейсы", "level": 70},
                {"name": "Баг-репорты", "level": 80},
                {"name": "API тестирование", "level": 60},
                {"name": "SQL", "level": 50},
                {"name": "Автоматизация", "level": 40}
            ],
            "tools": [
                {"name": "Postman", "icon": "🔧"},
                {"name": "Jira", "icon": "🐛"},
                {"name": "TestRail", "icon": "📋"},
                {"name": "Chrome DevTools", "icon": "🛠️"},
                {"name": "Git", "icon": "📚"},
                {"name": "Selenium", "icon": "🤖"}
            ],
            "projects": [
                {
                    "title": "Тестирование веб-приложения",
                    "description": "Полное функциональное тестирование интернет-магазина с созданием тест-кейсов и баг-репортов",
                    "technologies": ["Manual Testing", "TestRail", "Jira"],
                    "status": "Завершен"
                },
                {
                    "title": "API тестирование",
                    "description": "Автоматизированное тестирование REST API с помощью Postman и Newman",
                    "technologies": ["Postman", "Newman", "API Testing"],
                    "status": "В процессе"
                },
                {
                    "title": "Автоматизация UI тестов",
                    "description": "Создание автоматизированных тестов для веб-интерфейса с использованием Selenium",
                    "technologies": ["Selenium", "Python", "pytest"],
                    "status": "Планируется"
                }
            ],
            "contact": {
                "email": "victor.murahin@email.com",
                "phone": "+7 (999) 123-45-67",
                "linkedin": "linkedin.com/in/victormurahin",
                "github": "github.com/victormurahin"
            }
        };
        
        this.credentials = {
            "login": "victormurahin",
            "password": "test"
        };

        console.log('PortfolioApp initialized');
        this.init();
    }

    init() {
        console.log('Starting initialization...');
        this.initScrollAnimations();
        this.initSkillAnimations();
        this.initAdminSystem();
        this.initSmoothScrolling();
        this.initTypingAnimation();
        this.animateShapes();
        this.initNavbarScrollEffect();
        this.initParallaxEffects();
        this.addButtonRippleEffects();
        console.log('Initialization completed');
    }

    // Get nested property from object using dot notation
    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => {
            if (current && typeof current === 'object') {
                return current[key];
            }
            return undefined;
        }, obj);
    }

    // Set nested property using dot notation
    setNestedProperty(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key]) current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = value;
    }

    // Initialize scroll animations using Intersection Observer
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    
                    // Animate skill progress bars when skills section is visible
                    if (entry.target.id === 'skills') {
                        setTimeout(() => this.animateSkillBars(), 300);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });

        // Observe sections for animation
        const sections = document.querySelectorAll('section');
        sections.forEach(section => observer.observe(section));

        // Observe individual elements
        const animatedElements = document.querySelectorAll('.stat-item, .skill-item, .tool-item, .project-card, .contact-item');
        animatedElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    }

    // Initialize skill progress bar animations
    initSkillAnimations() {
        this.updateSkillBars();
    }

    updateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            const skill = this.portfolioData.skills[index];
            if (skill) {
                const progressBar = item.querySelector('.skill-progress');
                const percentage = item.querySelector('.skill-percentage');
                if (progressBar && percentage) {
                    percentage.textContent = `${skill.level}%`;
                    progressBar.setAttribute('data-width', skill.level);
                }
            }
        });
    }

    animateSkillBars() {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
        });
    }

    // Initialize admin system - FIXED VERSION
    initAdminSystem() {
        console.log('Initializing admin system...');
        
        const adminBtn = document.getElementById('adminBtn');
        const loginModal = document.getElementById('loginModal');
        const loginForm = document.getElementById('loginForm');
        const modalClose = document.getElementById('modalCloseBtn');
        const modalOverlay = document.querySelector('.modal-overlay');
        const logoutBtn = document.getElementById('logoutBtn');
        const adminPanel = document.getElementById('adminPanel');
        const loginError = document.getElementById('loginError');

        if (!adminBtn) {
            console.error('Admin button not found!');
            return;
        }

        if (!loginModal) {
            console.error('Login modal not found!');
            return;
        }

        console.log('Admin system elements found, attaching events...');

        // Show login modal when admin button is clicked
        adminBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Admin button clicked');
            loginModal.classList.remove('hidden');
            loginError.classList.add('hidden');
            // Focus on username field
            const usernameField = document.getElementById('username');
            if (usernameField) {
                setTimeout(() => usernameField.focus(), 100);
            }
        });

        // Hide login modal functions
        const hideModal = () => {
            console.log('Hiding login modal');
            loginModal.classList.add('hidden');
            loginForm.reset();
            loginError.classList.add('hidden');
        };

        // Close modal events
        if (modalClose) {
            modalClose.addEventListener('click', (e) => {
                e.preventDefault();
                hideModal();
            });
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', hideModal);
        }

        // Handle login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login form submitted');
                
                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value.trim();
                
                console.log('Attempting login with username:', username);
                
                if (username === this.credentials.login && password === this.credentials.password) {
                    console.log('Login successful');
                    this.enableAdminMode();
                    hideModal();
                } else {
                    console.log('Login failed');
                    loginError.classList.remove('hidden');
                    // Clear password field
                    document.getElementById('password').value = '';
                }
            });
        }

        // Handle logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Logout button clicked');
                this.disableAdminMode();
            });
        }

        // Handle escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !loginModal.classList.contains('hidden')) {
                hideModal();
            }
        });

        console.log('Admin system initialization completed');
    }

    // Enable admin editing mode - ENHANCED VERSION
    enableAdminMode() {
        console.log('Enabling admin mode...');
        this.isAdminMode = true;
        document.body.classList.add('admin-mode');
        
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.classList.remove('hidden');
        }
        
        // Make elements editable
        const editableElements = document.querySelectorAll('.editable');
        console.log(`Found ${editableElements.length} editable elements`);
        
        editableElements.forEach((element, index) => {
            console.log(`Setting up editable element ${index}:`, element.getAttribute('data-field'));
            
            // Remove any existing event listeners to avoid duplicates
            element.removeEventListener('dblclick', this.handleDoubleClick);
            
            // Add double-click event listener
            element.addEventListener('dblclick', (e) => this.handleDoubleClick(e));
            
            // Add visual indication
            element.style.cursor = 'pointer';
        });

        this.showNotification('Режим редактирования активирован! Двойной клик для редактирования текста.');
        console.log('Admin mode enabled successfully');
    }

    // Handle double-click on editable elements
    handleDoubleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!this.isAdminMode) {
            console.log('Not in admin mode, ignoring double-click');
            return;
        }

        const element = e.target.closest('.editable');
        if (!element) {
            console.log('No editable element found');
            return;
        }

        console.log('Double-click on editable element:', element.getAttribute('data-field'));
        this.makeEditable(element);
    }

    // Disable admin mode
    disableAdminMode() {
        console.log('Disabling admin mode...');
        this.isAdminMode = false;
        document.body.classList.remove('admin-mode');
        
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.classList.add('hidden');
        }
        
        // Remove editing capabilities and reset cursor
        const editableElements = document.querySelectorAll('.editable');
        editableElements.forEach(element => {
            element.removeEventListener('dblclick', this.handleDoubleClick);
            element.classList.remove('editing');
            element.contentEditable = false;
            element.style.cursor = 'default';
        });

        // Stop any current editing
        if (this.currentEditingElement) {
            this.stopEditing(this.currentEditingElement, false);
        }

        this.showNotification('Режим редактирования отключен');
        console.log('Admin mode disabled successfully');
    }

    // Make element editable - ENHANCED VERSION
    makeEditable(element) {
        if (!this.isAdminMode) {
            console.log('Cannot make editable - not in admin mode');
            return;
        }

        // If another element is being edited, stop editing it first
        if (this.currentEditingElement && this.currentEditingElement !== element) {
            this.stopEditing(this.currentEditingElement, true);
        }

        console.log('Making element editable:', element.getAttribute('data-field'));
        
        this.currentEditingElement = element;
        const originalText = element.textContent.trim();
        
        element.classList.add('editing');
        element.contentEditable = true;
        element.focus();

        // Select all text
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // Create save and cancel functions
        const saveEdit = () => {
            console.log('Saving edit...');
            this.stopEditing(element, true);
        };

        const cancelEdit = () => {
            console.log('Cancelling edit...');
            element.textContent = originalText;
            this.stopEditing(element, false);
        };

        // Handle blur (save)
        const handleBlur = (e) => {
            // Small delay to allow other events to process first
            setTimeout(() => {
                if (element.classList.contains('editing')) {
                    saveEdit();
                }
            }, 100);
        };

        // Handle keydown events
        const handleKeydown = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                saveEdit();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cancelEdit();
            }
        };

        // Add event listeners
        element.addEventListener('blur', handleBlur, { once: true });
        element.addEventListener('keydown', handleKeydown);

        // Store event handlers for cleanup
        element._handleBlur = handleBlur;
        element._handleKeydown = handleKeydown;
    }

    // Stop editing an element
    stopEditing(element, save = true) {
        if (!element) return;

        console.log('Stopping edit, save:', save);
        
        element.classList.remove('editing');
        element.contentEditable = false;
        
        // Clean up event listeners
        if (element._handleBlur) {
            element.removeEventListener('blur', element._handleBlur);
            delete element._handleBlur;
        }
        if (element._handleKeydown) {
            element.removeEventListener('keydown', element._handleKeydown);
            delete element._handleKeydown;
        }

        if (save) {
            const field = element.getAttribute('data-field');
            const newValue = element.textContent.trim();
            
            if (field && newValue) {
                console.log(`Saving field ${field} with value:`, newValue);
                this.setNestedProperty(this.portfolioData, field, newValue);
                
                // Special handling for skills
                if (field.startsWith('skills.') && field.endsWith('.name')) {
                    const skillIndex = parseInt(field.split('.')[1]);
                    if (this.portfolioData.skills[skillIndex]) {
                        const skillItem = document.querySelector(`[data-skill="${this.portfolioData.skills[skillIndex].name}"]`);
                        if (skillItem) {
                            skillItem.setAttribute('data-skill', newValue);
                        }
                    }
                }
                
                this.showNotification('Изменения сохранены!');
                console.log('Data saved successfully');
            }
        }

        this.currentEditingElement = null;
    }

    // Initialize smooth scrolling for navigation links
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Smooth scrolling for hero buttons
        const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize typing animation
    initTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (typingElement) {
            // Reset animation if needed
            setTimeout(() => {
                typingElement.style.borderRight = '3px solid transparent';
            }, 4000);
        }
    }

    // Animate floating shapes
    animateShapes() {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            // Random animation delay
            shape.style.animationDelay = `${index * 2}s`;
        });
    }

    // Show notification
    showNotification(message, type = 'success') {
        console.log(`Showing notification: ${message} (${type})`);
        
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        
        if (!notification || !notificationText) {
            console.error('Notification elements not found');
            return;
        }
        
        notificationText.textContent = message;
        notification.className = `notification ${type === 'error' ? 'error' : ''}`;
        notification.classList.remove('hidden');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    // Navbar scroll effect
    initNavbarScrollEffect() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // Initialize parallax effects
    initParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Add ripple effects to buttons
    addButtonRippleEffects() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                // Add ripple styles
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.pointerEvents = 'none';
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting Portfolio App');
    
    try {
        const app = new PortfolioApp();
        
        // Store app instance globally for debugging
        window.portfolioApp = app;
        console.log('Portfolio App initialized successfully');
        
        // Add additional interactive features
        console.log('Adding interactive features...');
        
        // Add hover effects to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add loading animation fade out
        setTimeout(() => {
            document.body.style.opacity = '1';
            console.log('Loading animation completed');
        }, 100);
        
    } catch (error) {
        console.error('Error initializing Portfolio App:', error);
    }
});

// Utility functions for enhanced UX
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll to top functionality
window.addEventListener('scroll', debounce(() => {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }
}, 100));

// Global error handler for debugging
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Log when all resources are loaded
window.addEventListener('load', () => {
    console.log('All resources loaded - Portfolio ready');
});

console.log('Portfolio App script loaded');