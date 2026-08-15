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

    // 2. Header Scroll Effect (throttled via rAF for mobile performance)
    const header = document.getElementById('header');
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                // 3. Back to Top Button
                if (backToTopBtn) {
                    if (window.scrollY > 500) {
                        backToTopBtn.classList.add('show');
                    } else {
                        backToTopBtn.classList.remove('show');
                    }
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');

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

    // 5. Removed JS floating boxes - moved to CSS for performance

    // 6. Contact Form Submission — Formspree
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const formSuccess = document.getElementById('formSuccess');
            const formError = document.getElementById('formError');

            // Loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جارٍ الإرسال...';
            }

            // Hide previous messages
            if (formSuccess) formSuccess.style.display = 'none';
            if (formError) formError.style.display = 'none';

            try {
                const formData = new FormData(quoteForm);
                const response = await fetch('https://formspree.io/f/xwpbgpob', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Success
                    quoteForm.reset();
                    window.location.href = 'thankyou.html';
                } else {
                    throw new Error('Server error');
                }
            } catch (err) {
                // Error
                if (formError) formError.style.display = 'block';
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'إرسال الطلب';
                }
            }
        });
    }

    // 7. Google Ads Conversion Tracking (WhatsApp and Tel Click Events)
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (anchor) {
            const href = anchor.getAttribute('href') || '';
            if (href.startsWith('tel:') || href.includes('wa.me')) {
                if (typeof gtag === 'function') {
                    gtag('event', 'conversion', {
                        'send_to': 'AW-18206092847/wYP3CIuM57scEK_cq-lD'
                    });
                    console.log('[Google Ads Tracking] Conversion event fired for: ', href);
                } else {
                    console.warn('[Google Ads Tracking] gtag is not defined.');
                }
            }
        }
    });
});
