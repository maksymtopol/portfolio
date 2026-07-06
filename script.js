import { toggleTheme } from './js-files/header/switch-header.js';
import { dropdownList } from '/js-files/header/language-dropdown-list.js';
import { responsiveDropdownList } from '/js-files/header/responsive-dropdown-list.js';
import { skillsAnimation, setTargetPercent } from '/js-files/body/skills-animation.js';
import { initScrollReveal } from '/js-files/body/scroll-reveal.js';
import { initWorkLightbox } from '/js-files/body/work-lightbox.js';
import { initContactForm } from '/js-files/body/contact-form.js';
import { initLanguage } from '/js-files/i18n/i18n.js';



document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header').classList.add('show');

  initLanguage();
  initScrollReveal();
  initWorkLightbox();
  initContactForm();

  const left = document.querySelector('.skills__approach');
  const right = document.querySelector('.skills__stack');
  const skillsContainer = document.querySelector('.skills__container');

  if (left && right && skillsContainer) {
    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setTimeout(() => {
        left.classList.add('active');
        right.classList.add('active');
        skillsAnimation();
      }, 600);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      trigger();
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              trigger();
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      io.observe(skillsContainer);
    }
  }
});


const themeSwitch = document.getElementById('theme-switch-checkbox');
const headerLogo = document.getElementById('img-header-logo');
const introMark = document.getElementById('intro-mark');

function applyInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    headerLogo.src = 'icons/myLogo-icons/logo-white.png';
    if (introMark) introMark.src = 'icons/myLogo-icons/logo-white.png';
    themeSwitch.checked = true;
  }
}

document.addEventListener('DOMContentLoaded', applyInitialTheme);

themeSwitch.addEventListener('change', () => {
  toggleTheme(themeSwitch, headerLogo, introMark);
});

dropdownList();
responsiveDropdownList();



const container = document.querySelector('.skills__container');

if (container) {
  container.addEventListener('mousemove', (e) => {
    setTargetPercent((e.clientX / window.innerWidth) * 100);
  });

  container.addEventListener('mouseleave', () => {
    setTargetPercent(50);
  });
}
