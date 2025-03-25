document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate-fadeIn, .animate-slideInLeft, .animate-slideInRight');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = "1";
            }
        });
    };
    
    animateElements.forEach(element => {
        element.style.opacity = "0";
    });
    
    animateOnScroll();
    
    window.addEventListener('scroll', animateOnScroll);
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});