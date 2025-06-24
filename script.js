document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out',
    offset: 100
  });

  initNavigation();
  initScrollEffects();
  initContactForm();
  initProjectAnimations();
  initImageLoading();
  initCustomCursor();
  initScrollProgress();
  initParticles();
  initTypingAnimation();
  initFloatingActionButton();
  initIntersectionObserver();
  initMagneticEffects();
});

function initNavigation() {
  const nav = document.querySelector('.main-nav');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navUl = document.querySelector('.main-nav ul');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
  });

  mobileMenuToggle?.addEventListener('click', () => {
    navUl?.classList.toggle('mobile-menu-open');
    mobileMenuToggle.classList.toggle('open');
  });

  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navHeight = nav?.offsetHeight || 80;
        const targetPosition = targetSection.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        navUl?.classList.remove('mobile-menu-open');
        mobileMenuToggle?.classList.remove('open');
      }
    });
  });
}

function updateActiveNavLink() {
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id], header.about-hero');
  const fromTop = window.scrollY + 120;

  navLinks.forEach(link => link.classList.remove('active'));
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id') || 'about';
    
    if (sectionTop <= fromTop && sectionTop + sectionHeight > fromTop) {
      const activeLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
      activeLink?.classList.add('active');
    }
  });
}

function initScrollEffects() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const interactiveElements = document.querySelectorAll('a, button, .skill-badge, .project-card, .resume-btn');
  
  if (!cursor) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('active');
  });
  
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  
  document.addEventListener('mousedown', () => cursor.classList.add('click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('click'));
}

function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = scrollPercent + '%';
  });
}

function initParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    
    container.appendChild(particle);
    
    particle.addEventListener('animationend', () => {
      particle.remove();
      createParticle();
    });
  }
}

function initTypingAnimation() {
  const typingElements = document.querySelectorAll('[data-typing]');
  
  typingElements.forEach(element => {
    const text = element.dataset.typing || element.textContent;
    element.textContent = '';
    element.classList.add('typing-text');
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          element.classList.remove('typing-text');
        }, 1000);
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 500);
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(element);
  });
}

function initFloatingActionButton() {
  const fab = document.querySelector('.floating-action-btn');
  if (!fab) return;
  
  fab.addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      showToast('Let\'s get in touch! 🚀', 'success');
    }
  });
}

function showToast(message, type = 'success') {
  const container = document.querySelector('.toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });
}

function initMagneticEffects() {
  const magneticElements = document.querySelectorAll('.magnetic, .skill-badge, .project-btn');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.1;
      const moveY = y * 0.1;
      
      element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  });
}

function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, textarea');
  const submitBtn = form.querySelector('button[type="submit"]');
  
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearErrors);
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showToast('Message sent successfully! I\'ll get back to you soon. 📧', 'success');
        form.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      }, 2000);
    } else {
      showToast('Please fix the errors before submitting.', 'error');
    }
  });
  
  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    
    clearFieldError(field);
    
    if (field.required && !value) {
      showFieldError(field, 'This field is required');
      isValid = false;
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
      showFieldError(field, 'Please enter a valid email address');
      isValid = false;
    }
    
    return isValid;
  }
  
  function validateForm() {
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField({ target: input })) {
        isValid = false;
      }
    });
    return isValid;
  }
  
  function showFieldError(field, message) {
    field.classList.add('error');
    const errorEl = document.createElement('div');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    field.parentNode.appendChild(errorEl);
  }
  
  function clearFieldError(field) {
    field.classList.remove('error');
    const errorEl = field.parentNode.querySelector('.field-error');
    if (errorEl) errorEl.remove();
  }
  
  function clearErrors(e) {
    clearFieldError(e.target);
  }
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

function initImageLoading() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
    
    img.addEventListener('error', () => {
      console.warn(`Failed to load image: ${img.src}`);
      img.style.background = 'linear-gradient(135deg, var(--light-gray), var(--medium-gray))';
      img.alt = img.alt || 'Image not available';
    });
  });
}

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

const debouncedScroll = debounce(() => {
  updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

function logPerformance() {
  if (window.performance && console.time) {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    });
  }
}

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  logPerformance();
}

