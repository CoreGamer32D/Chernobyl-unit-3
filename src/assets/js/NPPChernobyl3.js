document.addEventListener("DOMContentLoaded", function () {
    const animateElements = document.querySelectorAll(".animate-fadeIn, .animate-slideInLeft, .animate-slideInRight");
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;

    const animateOnScroll = function () {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };

    animateElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    animateOnScroll();

    window.addEventListener("scroll", () => {
        animateOnScroll();

        let currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            navbar.style.transform = "translateY(-100%)";
            navbar.style.opacity = "0";
        } else {
            navbar.style.transform = "translateY(0)";
            navbar.style.opacity = "1";
        }
        lastScrollY = currentScrollY;
    });

    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    // Smooth Page Transitions
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.6s ease-in-out";
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);

    document.querySelectorAll("a").forEach(link => {
        if (link.host === window.location.host && link.pathname !== window.location.pathname) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                document.body.style.opacity = "0";
                setTimeout(() => {
                    window.location.href = link.href;
                }, 600);
            });
        }
    });
});

var viewCountElement = document.getElementById('viewCount');

function getViewCount() {
    return parseInt(localStorage.getItem('pageViews') || '0');
}

function incrementViewCount() {
    var currentViews = getViewCount() + 1;
    localStorage.setItem('pageViews', currentViews.toString());
    viewCountElement.textContent = currentViews;
}

window.addEventListener('load', incrementViewCount);
