/**
 * DEEPAK MISHRA - PORTFOLIO JAVASCRIPT
 * Features: Dark/Light Mode, ScrollSpy, Mobile Menu, Modals, Smooth Scroll, Form Handling, Toasts
 */

window.deepakScriptLoaded = true;

function initPortfolio() {
  if (window.deepakPortfolioInitialized) return;
  window.deepakPortfolioInitialized = true;
  // --- 1. THEME SWITCHER (DARK / LIGHT) ---
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('deepak-theme') || 'dark';
  if (savedTheme === 'light') {
    htmlRoot.setAttribute('data-theme', 'light');
  } else {
    htmlRoot.removeAttribute('data-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      if (currentTheme === 'light') {
        htmlRoot.removeAttribute('data-theme');
        localStorage.setItem('deepak-theme', 'dark');
        showToast('Switched to Dark Mode', 'info');
      } else {
        htmlRoot.setAttribute('data-theme', 'light');
        localStorage.setItem('deepak-theme', 'light');
        showToast('Switched to Light Mode', 'info');
      }
    });
  }

  // --- 2. STICKY NAVBAR SCROLL EFFECT ---
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar shadow on scroll
    if (navbar) {
      if (scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }, { passive: true });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 3. MOBILE MENU HAMBURGER & DRAWER ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileToggle?.classList.add('active');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    mobileMenu?.classList.add('open');
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileToggle?.classList.remove('active');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu?.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  mobileOverlay?.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- 4. SCROLLSPY (ACTIVE NAV INDICATOR) ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // --- 5. SCROLL REVEAL (INTERSECTION OBSERVER) ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if observer not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // --- 6. MODAL SYSTEM (PROJECTS & CERTIFICATES) ---
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const modalData = {
    'sms-spam': {
      title: 'Spam SMS Detection',
      category: 'Machine Learning & NLP',
      content: `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <p style="color:var(--text-secondary); line-height:1.7;">
            An ML-based project that analyzes SMS messages and classifies them as spam or legitimate messages. The project focuses on text preprocessing, feature extraction and classification.
          </p>
          <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
            <h4 style="color:var(--text-primary); font-size:0.95rem; margin-bottom:8px;">Core Pipeline Highlights</h4>
            <ul style="color:var(--text-secondary); padding-left:20px; font-size:0.9rem; line-height:1.6;">
              <li>Text Preprocessing: tokenization, punctuation removal, and stop words filtration.</li>
              <li>Feature Engineering: text vectorization using standard NLP methods.</li>
              <li>Classification: predictive model evaluation for distinguishing spam patterns.</li>
            </ul>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <span class="tech-badge">Python</span>
            <span class="tech-badge">Machine Learning</span>
            <span class="tech-badge">Natural Language Processing</span>
          </div>
          <div style="display:flex; gap:12px; margin-top:8px;">
            <a href="https://github.com/Deepakmishra2007" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" aria-label="View Deepak Mishra's GitHub profile">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              View on GitHub (Deepakmishra2007)
            </a>
          </div>
        </div>
      `
    },
    'credit-fraud': {
      title: 'Credit Card Fraud Detection',
      category: 'Machine Learning & Data Analysis',
      content: `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <p style="color:var(--text-secondary); line-height:1.7;">
            A machine learning project designed to identify potentially fraudulent credit card transactions using data preprocessing, analysis and classification techniques.
          </p>
          <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
            <h4 style="color:var(--text-primary); font-size:0.95rem; margin-bottom:8px;">Core Pipeline Highlights</h4>
            <ul style="color:var(--text-secondary); padding-left:20px; font-size:0.9rem; line-height:1.6;">
              <li>Data Preprocessing: Handling skewed transaction distributions and numerical scaling.</li>
              <li>Data Analysis: Examining correlation patterns between legitimate and anomalous records.</li>
              <li>Model Classification: Utilizing classification algorithms to flag irregular transaction patterns.</li>
            </ul>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <span class="tech-badge">Python</span>
            <span class="tech-badge">Machine Learning</span>
            <span class="tech-badge">Data Analysis</span>
          </div>
          <div style="display:flex; gap:12px; margin-top:8px;">
            <a href="https://github.com/Deepakmishra2007" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" aria-label="View Deepak Mishra's GitHub profile">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              View on GitHub (Deepakmishra2007)
            </a>
          </div>
        </div>
      `
    },
    'cert-1': {
      title: 'C++ Essentials 1',
      issuer: 'Cisco Networking Academy',
      content: `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="border-radius:10px; overflow:hidden; border:1px solid var(--border-color); background:#0f172a;">
            <img src="assets/certificates/cpp-essentials-1.png" alt="C++ Essentials 1 Certificate" style="width:100%; display:block;">
          </div>
          <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
            <p style="color:var(--text-primary); font-size:0.92rem; margin-bottom:4px;"><strong>Issuing Organization:</strong> Cisco Networking Academy &amp; C++ Institute</p>
            <p style="color:var(--accent-cyan); font-size:0.88rem; margin-bottom:4px;"><strong>Completion Date:</strong> 01 Nov 2025</p>
            <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:8px;">Offered through Networking Academy, validating foundational C++ syntax, control structures, and computational logic.</p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="assets/certificates/cpp-essentials-1.png" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">View Certificate</a>
            <a href="assets/certificates/cpp-essentials-1.png" download="cpp-essentials-1.png" class="btn btn-secondary btn-sm">Download Certificate</a>
          </div>
        </div>
      `
    },
    'cert-2': {
      title: 'C++ Programming Course',
      issuer: 'Infosys Springboard',
      content: `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="border-radius:10px; overflow:hidden; border:1px solid var(--border-color); background:#0f172a;">
            <img src="assets/certificates/infosys-cpp-programming.png" alt="Infosys C++ Programming Certificate" style="width:100%; display:block;">
          </div>
          <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
            <p style="color:var(--text-primary); font-size:0.92rem; margin-bottom:4px;"><strong>Issuing Organization:</strong> Infosys Springboard</p>
            <p style="color:var(--accent-cyan); font-size:0.88rem; margin-bottom:4px;"><strong>Completion Date:</strong> November 2, 2025</p>
            <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:8px;">Certified by Infosys in Object-Oriented Programming (OOP) paradigms, memory management, and structured C++ design.</p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="assets/certificates/infosys-cpp-programming.png" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">View Certificate</a>
            <a href="assets/certificates/infosys-cpp-programming.png" download="infosys-cpp-programming.png" class="btn btn-secondary btn-sm">Download Certificate</a>
          </div>
        </div>
      `
    },
    'cert-3': {
      title: 'Machine Learning Internship',
      issuer: 'CodSoft',
      content: `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="border-radius:10px; overflow:hidden; border:1px solid var(--border-color); background:#0f172a;">
            <img src="assets/certificates/codsoft-machine-learning-internship.png" alt="CodSoft Machine Learning Internship Certificate" style="width:100%; display:block;">
          </div>
          <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
            <p style="color:var(--text-primary); font-size:0.92rem; margin-bottom:4px;"><strong>Issuing Organization:</strong> CodSoft</p>
            <p style="color:var(--accent-cyan); font-size:0.88rem; margin-bottom:4px;"><strong>Completion Date:</strong> 28/05/2026 (Duration: 25/04/2026 – 25/05/2026)</p>
            <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:8px;">4-week virtual internship in Machine Learning demonstrating hands-on algorithm implementation and predictive analytics.</p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="assets/certificates/codsoft-machine-learning-internship.png" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">View Certificate</a>
            <a href="assets/certificates/codsoft-machine-learning-internship.png" download="codsoft-machine-learning-internship.png" class="btn btn-secondary btn-sm">Download Certificate</a>
          </div>
        </div>
      `
    },
    'cert-4': {
      title: 'HTML Essentials',
      issuer: 'Cisco Networking Academy',
      content: `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="border-radius:10px; overflow:hidden; border:1px solid var(--border-color); background:#0f172a;">
            <img src="assets/certificates/html-essentials.png" alt="HTML Essentials Certificate" style="width:100%; display:block;">
          </div>
          <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
            <p style="color:var(--text-primary); font-size:0.92rem; margin-bottom:4px;"><strong>Issuing Organization:</strong> Cisco Networking Academy &amp; JS Institute</p>
            <p style="color:var(--accent-cyan); font-size:0.88rem; margin-bottom:4px;"><strong>Completion Date:</strong> 15 May 2026</p>
            <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:8px;">Proficiency in semantic HTML structure, web accessibility guidelines, and modern web document architecture.</p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="assets/certificates/html-essentials.png" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">View Certificate</a>
            <a href="assets/certificates/html-essentials.png" download="html-essentials.png" class="btn btn-secondary btn-sm">Download Certificate</a>
          </div>
        </div>
      `
    },
    'cert-5': {
      title: 'Python Essentials 1',
      issuer: 'Cisco Networking Academy',
      content: `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="border-radius:10px; overflow:hidden; border:1px solid var(--border-color); background:#0f172a;">
            <img src="assets/certificates/python-essentials-1.png" alt="Python Essentials 1 Certificate" style="width:100%; display:block;">
          </div>
          <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
            <p style="color:var(--text-primary); font-size:0.92rem; margin-bottom:4px;"><strong>Issuing Organization:</strong> Cisco Networking Academy &amp; Python Institute</p>
            <p style="color:var(--accent-cyan); font-size:0.88rem; margin-bottom:4px;"><strong>Completion Date:</strong> 30 Oct 2025</p>
            <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:8px;">Validates mastery of Python syntax, data collections, conditional flow, loop structures, and modular functions.</p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="assets/certificates/python-essentials-1.png" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">View Certificate</a>
            <a href="assets/certificates/python-essentials-1.png" download="python-essentials-1.png" class="btn btn-secondary btn-sm">Download Certificate</a>
          </div>
        </div>
      `
    },
    'cert-6': {
      title: 'Coding Essentials: Learn Logic Building for Beginners',
      issuer: 'Scaler Topics',
      content: `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="border-radius:10px; overflow:hidden; border:1px solid var(--border-color); background:#0f172a;">
            <img src="assets/certificates/scaler-coding-essentials.png" alt="Scaler Certificate of Excellence" style="width:100%; display:block;">
          </div>
          <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
            <p style="color:var(--text-primary); font-size:0.92rem; margin-bottom:4px;"><strong>Issuing Organization:</strong> Scaler Topics</p>
            <p style="color:var(--accent-cyan); font-size:0.88rem; margin-bottom:4px;"><strong>Completion Date:</strong> 09 October 2025</p>
            <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:8px;">Awarded Certificate of Excellence for completing 23 video tutorials and 3 comprehensive modules in algorithmic logic building.</p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="assets/certificates/scaler-coding-essentials.png" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">View Certificate</a>
            <a href="assets/certificates/scaler-coding-essentials.png" download="scaler-coding-essentials.png" class="btn btn-secondary btn-sm">Download Certificate</a>
          </div>
        </div>
      `
    }
  };

  function openModal(id) {
    const data = modalData[id];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBody) modalBody.innerHTML = data.content;

    modalBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Bind all modal trigger buttons
  document.querySelectorAll('[data-modal-target]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-modal-target');
      openModal(targetId);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);

  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileMenu();
    }
  });

  // --- 7. CONTACT FORM LOGIC ---
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const message = messageInput?.value.trim() || '';

      if (!name || !email || !message) {
        showToast('Please fill in all fields before sending.', 'warning');
        return;
      }

      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'warning');
        return;
      }

      // Pre-fill mailto link as an accessible, real action
      const mailtoUrl = `mailto:deepakmishra92466@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

      showToast('Opening your email client to send your message...', 'success');

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      contactForm.reset();
    });
  }

  // --- 8. TOAST NOTIFICATION UTILITY ---
  window.showToast = function(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
    } else {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#38bdf8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}

