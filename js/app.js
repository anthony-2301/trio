// === FONCTIONS DE RÉSERVATION WHATSAPP ===
function reserverTableMenu() {
    const message = `Bonjour Le Trio ! Je viens de consulter votre carte et j'aimerais réserver une table. Pouvez-vous me donner plus d'informations ?`;
    window.open(`https://wa.me/243854115659?text=${encodeURIComponent(message)}`, '_blank');
}

function reserverWhatsApp() {
    const nom = document.getElementById('res-nom').value || 'Un client';
    const date = document.getElementById('res-date') ? document.getElementById('res-date').value : "Date non précisée";
    const type = document.getElementById('res-type').value;
    const message = `Bonjour Le Trio ! Je suis ${nom}. Je souhaite réserver : *${type}* pour le *${date}*. Pouvez-vous me confirmer la disponibilité ?`;
    window.open(`https://wa.me/0808806100?text=${encodeURIComponent(message)}`, '_blank');
}

// === GESTION DU PRELOADER ===
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.style.display = 'none';
    }, 800);
});

setTimeout(() => {
    if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
        setTimeout(() => { 
            const preloader = document.getElementById('preloader');
            if (preloader) preloader.style.display = 'none'; 
        }, 800);
    }
}, 8000);

// === ANIMATIONS & INTERACTIONS GLOBALES ===
document.addEventListener("DOMContentLoaded", () => {
    // Effet de la Navbar au scroll (pour index.html)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('bg-[#070707]/95', 'backdrop-blur-md', 'border-b', 'border-white/5', 'py-4');
                navbar.classList.remove('bg-transparent', 'border-transparent', 'py-6');
            } else {
                navbar.classList.add('bg-transparent', 'border-transparent', 'py-6');
                navbar.classList.remove('bg-[#070707]/95', 'backdrop-blur-md', 'border-b', 'border-white/5', 'py-4');
            }
        });
    }

    // Effet d'apparition au scroll (Reveal)
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

async function checkAppVersion() {
    try {
        // 1. Récupérer la version distante (le cache du navigateur pour ce fichier doit être désactivé ou court)
        const response = await fetch('version.json', { cache: 'no-store' });
        if (!response.ok) return;
        
        const data = await response.json();
        const serverVersion = data.version;
        
        // 2. Récupérer la version stockée chez le client
        const localVersion = localStorage.getItem('app_version');
        
        // 3. Comparer les versions
        if (localVersion !== serverVersion) {
            console.log("Nouvelle version détectée. Vidage du cache local...");
            
            // Vider le localStorage (ou supprimer les clés spécifiques de données)
            localStorage.clear();
            
            // Mettre à jour la version locale avec la nouvelle
            localStorage.setItem('app_version', serverVersion);
            
            // Optionnel : Forcer un rechargement complet depuis le serveur (bypass le cache du navigateur)
            window.location.reload(true);
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de la version :", error);
    }
}

// Lancer la vérification au chargement
document.addEventListener('DOMContentLoaded', checkAppVersion);