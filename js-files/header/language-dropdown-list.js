export function dropdownList() {
    const languageDropdown = document.getElementById('button-language-dropdown');
    const languageBlockContent = document.getElementById('language-block-content');
    const languageBlockList = document.getElementById('language-block-content-list');
    const updateDropdownStyles = () => {
        const isChecked = languageDropdown.checked;
        const isMobile = window.innerWidth <= 768;

        if (isChecked) {
            languageBlockList.classList.add('active');

            if (isMobile) {
                languageBlockContent.classList.add('adaptiveActive');
            } else {
                languageBlockContent.classList.add('topActive');
            }

        } else if(isMobile) {
            languageBlockList.classList.remove('active');
            languageBlockContent.classList.remove('adaptiveActive');
        } else {
            languageBlockList.classList.remove('active');
            languageBlockContent.classList.remove('topActive');
        }
    };
    
    languageDropdown.addEventListener('change', updateDropdownStyles);
    
    window.addEventListener('resize', updateDropdownStyles);

    updateDropdownStyles();
}