export function toggleTheme(themeSwitch, headerLogo, introMark) {
  const body = document.body;

  if (themeSwitch.checked) {
    body.classList.add('dark-theme');
    headerLogo.src = 'icons/myLogo-icons/logo-white.png';
    if (introMark) introMark.src = 'icons/myLogo-icons/logo-white.png';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-theme');
    headerLogo.src = 'icons/myLogo-icons/logo-black.png';
    if (introMark) introMark.src = 'icons/myLogo-icons/logo-black.png';
    localStorage.setItem('theme', 'light');
  }
}
