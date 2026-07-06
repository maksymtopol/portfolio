export function responsiveDropdownList() {
    const hamburger = document.getElementById('hamburger');
    const hamburgerInput = document.getElementById('hamburger-input');
    const hamburgerLabel = document.getElementById('hamburger-label');
    const headerMenuList = document.getElementById('header-menu-list');
    const headerButtons = document.getElementById('header-buttons');

    hamburgerInput.addEventListener('change', () => {
        if (hamburgerInput.checked) {
            hamburger.classList.add('active');
            hamburgerInput.classList.add('active');
            hamburgerLabel.classList.add('active');
            headerMenuList.classList.add('active');
            headerButtons.classList.add('active');
        } else {
            hamburger.classList.remove('active');
            hamburgerInput.classList.remove('active');
            hamburgerLabel.classList.remove('active');
            headerMenuList.classList.remove('active');
            headerButtons.classList.remove('active');
        }
    });
}