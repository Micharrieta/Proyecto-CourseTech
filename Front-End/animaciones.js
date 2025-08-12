function animationOutViewport(selector, animation) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(...animation.split(' '));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
    });
}

