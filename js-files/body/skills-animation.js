let targetPercent = 50;
let currentPercent = 50;
let rafId = null;
let elements = null;

export function skillsAnimation() {
  const left = document.querySelector('.skills__approach');
  const right = document.querySelector('.skills__stack');

  elements = {
    left,
    right,
    leftSpan: document.querySelector('.skills__approach-title'),
    rightSpan: document.querySelector('.skills__stack-title'),
    leftImages: left.querySelectorAll('.skills__approach-chip'),
    rightImages: right.querySelectorAll('img'),
  };

  startLoop();
}

function startLoop() {
  if (rafId === null && elements) {
    rafId = requestAnimationFrame(animate);
  }
}

function animate() {
  rafId = null;

  currentPercent += (targetPercent - currentPercent) * 0.1;
  if (Math.abs(targetPercent - currentPercent) < 0.1) {
    currentPercent = targetPercent;
  }

  const { left, right, leftSpan, rightSpan, leftImages, rightImages } =
    elements;

  const leftWidth = 100 - currentPercent;
  const rightWidth = currentPercent;

  left.style.width = `${leftWidth}%`;
  right.style.width = `${rightWidth}%`;

  leftSpan.classList.toggle('hidden', leftWidth <= 25);
  rightSpan.classList.toggle('hidden', rightWidth <= 25);

  leftImages.forEach((img) => {
    img.classList.toggle('hidden', leftWidth <= 45);
    img.classList.toggle('big', leftWidth >= 75);
  });

  rightImages.forEach((img) => {
    img.classList.toggle('hidden', rightWidth <= 45);
    img.classList.toggle('big', rightWidth >= 75);
  });

  if (currentPercent !== targetPercent && window.innerWidth > 768) {
    rafId = requestAnimationFrame(animate);
  }
}

export function setTargetPercent(percent) {
  targetPercent = percent;
  startLoop();
}
