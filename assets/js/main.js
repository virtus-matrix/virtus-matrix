document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Remove Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, 1000);

    // 2. Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // 3. Dynamic Navbar Background on Scroll
    const navbar = document.getElementById('mainNav');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            scrollTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            scrollTopBtn.classList.remove('show');
        }
    });

    // 4. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Close mobile menu if open
                const bsCollapse = new bootstrap.Collapse(document.getElementById('navbarNav'), {toggle: false});
                bsCollapse.hide();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Populate Dynamic Project Cards
    const projectsContainer = document.getElementById('dynamic-projects-container');
    if (projectsContainer && typeof projectsData !== 'undefined') {
        let delay = 100;
        projectsData.forEach((project) => {
            const col = document.createElement('div');
            col.className = 'col-lg-3 col-md-6';
            col.setAttribute('data-aos', 'fade-up');
            col.setAttribute('data-aos-delay', delay.toString());

            col.innerHTML = `
                <div class="glass-card p-4 h-100 d-flex flex-column">
                    <div class="mb-3">
                        <i class="fas ${project.icon} fa-2x text-primary"></i>
                    </div>
                    <h5 class="text-white mb-2">${project.title}</h5>
                    <span class="badge bg-primary bg-opacity-25 text-primary mb-3 align-self-start">${project.stack}</span>
                    <p class="small flex-grow-1">${project.description}</p>
                </div>
            `;
            projectsContainer.appendChild(col);
            delay += 50; // Stagger animation
        });
    }

    // 6. Set Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();
});