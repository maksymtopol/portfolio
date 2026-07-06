let targetPercent = 50;
let currentPercent = 50;

export function skillsAnimation() {
  const left = document.querySelector('.skills__approach');
  const right = document.querySelector('.skills__stack');
  const leftSpan = document.querySelector('.skills__approach-title');
  const rightSpan = document.querySelector('.skills__stack-title');
  const leftImages = left.querySelectorAll('.skills__approach-chip');
  const rightImages = right.querySelectorAll('img');

  function animate() {
    currentPercent += (targetPercent - currentPercent) * 0.1;

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

    if (window.innerWidth > 768) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

export function setTargetPercent(percent) {
  targetPercent = percent;
}
