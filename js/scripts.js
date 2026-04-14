/* ===========================
   scripts.js — Danilo Cruz Portfolio
   =========================== */

// ─── Particles.js ───────────────────────────────────────────────────────────
window.addEventListener('load', function () {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color: { value: ['#4f8ef7', '#7c4dff', '#a78bfa'] },
        shape: { type: 'circle' },
        opacity: {
          value: 0.35,
          random: true,
          anim: { enable: true, speed: 0.6, opacity_min: 0.05, sync: false }
        },
        size: {
          value: 2.5,
          random: true,
          anim: { enable: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#4f8ef7',
          opacity: 0.1,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.3 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }
});

// ─── Typewriter ─────────────────────────────────────────────────────────────
const phrases = [
  'Flutter Developer',
  'Kotlin / Android Dev',
  'Node.js Developer',
  'Python Developer',
  'React Developer',
  'Full Stack Mobile'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 55 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

document.addEventListener('DOMContentLoaded', function () {
  if (typewriterEl) setTimeout(type, 600);
});

// ─── Scroll Dots Navigation ──────────────────────────────────────────────────
const sections = ['hero', 'projects', 'skills', 'experience', 'education', 'contact'];
const dots = document.querySelectorAll('.dot');

function updateDots() {
  const scrollY = window.scrollY + window.innerHeight / 3;

  sections.forEach((id, i) => {
    const section = document.getElementById(id);
    if (!section) return;
    const { offsetTop, offsetHeight } = section;

    if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
      dots.forEach(d => d.classList.remove('active'));
      if (dots[i]) dots[i].classList.add('active');
    }
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    const target = document.getElementById(sections[i]);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

window.addEventListener('scroll', updateDots, { passive: true });

// ─── Fade-in on Scroll ───────────────────────────────────────────────────────
function initFadeIn() {
  const targets = document.querySelectorAll(
    '.project-card, .skill-category, .experience-card, .hero-content, .contact-container, .section-title, .section-subtitle'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // stagger delay based on sibling index
          const siblings = Array.from(entry.target.parentElement.children);
          const delay = siblings.indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}

// ─── Skill Bars Animation ────────────────────────────────────────────────────
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-progress');

  // Save target widths and reset to 0
  bars.forEach(bar => {
    bar._targetWidth = bar.style.width;
    bar.style.width = '0';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          setTimeout(() => {
            bar.style.width = bar._targetWidth;
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => observer.observe(bar));
}

// ─── Contact Form → mailto ───────────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    const to = 'danilocruzss@icloud.com';
    const sub = encodeURIComponent(subject || `Contato via portfólio — ${name}`);
    const body = encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:${to}?subject=${sub}&body=${body}`;
    form.reset();
  });
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  initFadeIn();
  initSkillBars();
  initContactForm();
  updateDots();
});
