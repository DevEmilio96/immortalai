// Attende che il documento sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    // Gestisce lo scorrimento fluido per i link di navigazione
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Aggiunge il timestamp al copyright nel footer
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        timestampElement.textContent = now.toLocaleDateString('it-IT', options);
    }
    
    // Aggiunge effetto di animazione all'header durante lo scorrimento
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = '#fff';
        }
    });
    
    // Funzionalità di cambio lingua
    const languageBtns = document.querySelectorAll('.lang-btn');
    let currentLang = 'en'; // Lingua predefinita: inglese
    
    // Funzione per cambiare la lingua di tutti gli elementi con attributi data-en/data-it
    function switchLanguage(lang) {
        // Salva la lingua selezionata in localStorage
        localStorage.setItem('preferredLanguage', lang);
        currentLang = lang;
        
        // Aggiorna lo stato dei pulsanti di lingua
        languageBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.id === `lang-${lang}`) {
                btn.classList.add('active');
            }
        });
        
        // Cambia il testo di tutti gli elementi tradotti
        document.querySelectorAll('[data-en][data-it]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
        
        // Aggiorna l'attributo lang dell'HTML
        document.documentElement.lang = lang;
        
        // Formattazione del timestamp in base alla lingua
        if (timestampElement) {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            
            const locale = lang === 'en' ? 'en-US' : 'it-IT';
            timestampElement.textContent = now.toLocaleDateString(locale, options);
        }
    }
    
    // Aggiunge event listener ai pulsanti di lingua
    languageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.id.replace('lang-', '');
            switchLanguage(lang);
        });
    });
    
    // Controlla se c'è una preferenza di lingua salvata
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        switchLanguage(savedLang);
    }
    
    // Aggiungi il pulsante del menu mobile e la sua funzionalità
    const header_container = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    
    // Crea il pulsante del menu mobile
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    
    // Inserisce il pulsante solo in modalità mobile (verrà mostrato tramite CSS)
    header_container.insertBefore(mobileMenuBtn, nav);
    
    // Evento di click per il pulsante del menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });
    
    // Chiude il menu quando si fa clic su un link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        });
    });
});
