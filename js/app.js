


        function reserverWhatsApp() {
            const nom = document.getElementById('res-nom').value || 'Un client';
            const type = document.getElementById('res-type').value;
            const message = `Bonjour Le Trio ! Je suis ${nom}. Objet : ${type}. Pouvez-vous me renseigner ?`;
            window.open(`https://wa.me/243854115659?text=${encodeURIComponent(message)}`, '_blank');
        }

        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => { document.body.classList.add('loaded'); }, 1500);

            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    navbar.classList.add('bg-[#0A0A0A]/95', 'backdrop-blur-md', 'border-b', 'border-white/5', 'py-3');
                    navbar.classList.remove('bg-transparent', 'border-transparent', 'py-4', 'sm:py-6');
                } else {
                    navbar.classList.add('bg-transparent', 'border-transparent', 'py-4', 'sm:py-6');
                    navbar.classList.remove('bg-[#0A0A0A]/95', 'backdrop-blur-md', 'border-b', 'border-white/5', 'py-3');
                }
            });

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
    