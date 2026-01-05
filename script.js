
// =================== Navbar section ===================
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. SCROLL SPY (Highlight Navbar Links on Scroll)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // -100 offset for fixed navbar height
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // 2. CLOSE MOBILE MENU ON CLICK
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navItems = document.querySelectorAll('.nav-link, .btn-primary'); // Links + Book Button

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if mobile menu is open
            if (navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        });
    });

});

// ================================= Service Read More ==================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Select all service descriptions
    const descriptions = document.querySelectorAll('.service-desc');
    const charLimit = 160;

    descriptions.forEach(desc => {
        const fullText = desc.innerText;

        if (fullText.length > charLimit) {
            // Find the nearest space after 160 chars to avoid cutting words
            let cutOffPoint = fullText.lastIndexOf(' ', charLimit);
            if (cutOffPoint === -1) cutOffPoint = charLimit;

            const visibleText = fullText.substring(0, cutOffPoint);
            const hiddenText = fullText.substring(cutOffPoint);

            // Rebuild HTML structure
            desc.innerHTML = `
                ${visibleText}<span class="dots">...</span><span class="more-text d-none">${hiddenText}</span>
                <br>
                <button class="btn btn-link text-decoration-none text-primary-custom fw-bold p-0 mt-2 read-more-toggle">
                    Read More <i class="fas fa-arrow-right ms-1"></i>
                </button>
            `;
        }
    });

    // Event Delegation for dynamically added buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.read-more-toggle')) {
            const btn = e.target.closest('.read-more-toggle');
            const cardBody = btn.closest('.card-body');
            const dots = cardBody.querySelector('.dots');
            const moreText = cardBody.querySelector('.more-text');

            if (moreText.classList.contains('d-none')) {
                // Expand
                moreText.classList.remove('d-none');
                dots.classList.add('d-none');
                btn.innerHTML = 'Read Less <i class="fas fa-arrow-up ms-1"></i>';
            } else {
                // Collapse
                moreText.classList.add('d-none');
                dots.classList.remove('d-none');
                btn.innerHTML = 'Read More <i class="fas fa-arrow-right ms-1"></i>';
            }
        }
    });

});

// --- LIGHTBOX FUNCTIONALITY ---
function openLightbox(element) {
    // 1. Get the image source from the clicked element
    const imgElement = element.querySelector('img');
    const imgSrc = imgElement.src;

    // 2. Set the modal image source
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = imgSrc;

    // 3. Open the Bootstrap Modal
    const myModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    myModal.show();
}
