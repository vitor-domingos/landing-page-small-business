document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling ---
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const hrefAttribute = link.getAttribute('href');

            // Ensure it's a link to an ID on the *current* page, not just "#"
            if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault(); // Prevent default jump behavior

                const targetElement = document.querySelector(hrefAttribute);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' // Aligns the top of the target element to the top of the viewport
                    });
                }
            }
        });
    });

    // --- Fade-in Animation on Scroll using Intersection Observer ---
    const sectionsToFade = document.querySelectorAll('.feature-section, .success-section, .cta-section'); // Select all sections you want to animate

    // Add the initial class to hide them before JS runs (optional, CSS handles it)
    sectionsToFade.forEach(section => {
        section.classList.add('fade-in-section');
    });

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is now visible
                entry.target.classList.add('is-visible');
                // Optional: Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
            // No 'else' needed if we only want fade-in once
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    sectionsToFade.forEach(section => {
        intersectionObserver.observe(section);
    });

}); // End DOMContentLoaded