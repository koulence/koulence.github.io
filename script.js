document.addEventListener('DOMContentLoaded', () => {
    
    /* 1. STICKY HEADER SCROLL EFFECT */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* 2. AUTO-SELECT CATEGORY IN CONTACT FORM */
    const selectButtons = document.querySelectorAll('.select-service-btn');
    const serviceSelect = document.getElementById('serviceSelect');

    selectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedService = button.getAttribute('data-service');
            if (serviceSelect && selectedService) {
                serviceSelect.value = selectedService;
                
                // Zvýraznění formuláře
                const formContainer = document.querySelector('.lead-form');
                formContainer.style.borderColor = '#C5A059';
                setTimeout(() => {
                    formContainer.style.borderColor = 'var(--border-color)';
                }, 1500);
            }
        });
    });

    /* 3. PORTFOLIO FILTERING */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* 4. ANIMACE POČÍTADEL (STATS COUNTER) */
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200;
            const increment = target / speed;

            const updateCount = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;

            if (sectionPos < screenPos && !animated) {
                animateCounters();
                animated = true;
            }
        }
    });

    /* 5. FORM SUBMISSION (DEMO HANDLER) */
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Odesílám...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Děkuji za vaši poptávku! Budu vás kontaktovat během následujících 24 hodin.');
                leadForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }
});