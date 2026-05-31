document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if(mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            // Close other items
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 5. Generate Floating Boxes in Hero Section
    const floatingBoxesContainer = document.getElementById('floatingBoxes');
    if (floatingBoxesContainer) {
        for (let i = 0; i < 6; i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            
            // Randomize position, size and animation delay
            const size = Math.random() * 50 + 30; // 30px to 80px
            const left = Math.random() * 90; // 0% to 90%
            const delay = Math.random() * 5; // 0s to 5s
            const duration = Math.random() * 10 + 15; // 15s to 25s
            
            box.style.width = `${size}px`;
            box.style.height = `${size}px`;
            box.style.left = `${left}%`;
            box.style.animationDelay = `${delay}s`;
            box.style.animationDuration = `${duration}s`;
            
            // Random icon inside box for moving vibe
            box.innerHTML = '<i class="fa-solid fa-box" style="color: rgba(255,255,255,0.5); font-size: ' + (size/2) + 'px; display: flex; align-items: center; justify-content: center; height: 100%;"></i>';
            
            floatingBoxesContainer.appendChild(box);
        }
    }

    // 6. Contact Form Submission
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Show alert (In real app, this would send an API request)
            alert(`شكراً لك ${name}! تم استلام طلبك وسنتواصل معك قريباً على الرقم ${phone}.`);
            
            // Reset form
            quoteForm.reset();
        });
    }
});
