document.addEventListener('DOMContentLoaded', () => {
    const languageSwitchers = document.querySelectorAll('.lang-switcher');
    
    const setLanguage = (lang) => {
        // Save the user's preference
        localStorage.setItem('language', lang);
        
        // Set the lang attribute on the HTML tag
        document.documentElement.lang = lang;

        // Update all text elements
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            if (translations[key] && translations[key][lang]) {
                el.innerHTML = translations[key][lang]; // Use innerHTML to support tags like <strong>
            }
        });
        
        // Update all placeholder attributes
        document.querySelectorAll('[data-placeholder-key]').forEach(el => {
            const key = el.getAttribute('data-placeholder-key');
            if (translations[key] && translations[key][lang]) {
                el.placeholder = translations[key][lang];
            }
        });
        
        // Update the active state of language buttons
        languageSwitchers.forEach(switcher => {
            if (switcher.getAttribute('data-lang') === lang) {
                switcher.classList.add('active-lang');
                switcher.classList.remove('inactive-lang');
            } else {
                switcher.classList.remove('active-lang');
                switcher.classList.add('inactive-lang');
            }
        });
    };

    languageSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = switcher.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });

    // On page load, check for saved language or default to English
    const currentLang = localStorage.getItem('language') || 'en';
    setLanguage(currentLang);
});