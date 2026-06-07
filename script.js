// ===============================
// SCROLL PROGRESS BAR
// ===============================

window.addEventListener("scroll", () => {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrollPercent =
        (scrollTop / scrollHeight) * 100;

    document.getElementById("progress-bar").style.width =
        scrollPercent + "%";
});


// ===============================
// ACTIVE NAV LINK ON SCROLL
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.clientHeight;

        if (
            pageYOffset >= sectionTop
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {
            link.classList.add("active");
        }
    });
});


// ===============================
// HEADER SHADOW ON SCROLL
// ===============================

const header =
    document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 25px rgba(0,0,0,.3)";

    } else {

        header.style.boxShadow = "none";
    }
});


// ===============================
// COUNTER ANIMATION
// ===============================

const counters =
    document.querySelectorAll(".stat-box h2");

const speed = 100;

const startCounter = () => {

    counters.forEach(counter => {

        const target =
            parseInt(
                counter.innerText
                    .replace("+", "")
                    .replace("%", "")
            );

        let count = 0;

        const increment =
            target / speed;

        const updateCounter = () => {

            if (count < target) {

                count += increment;

                counter.innerText =
                    Math.ceil(count);

                setTimeout(
                    updateCounter,
                    20
                );

            } else {

                const original =
                    counter.dataset.original;

                counter.innerText =
                    original;
            }
        };

        updateCounter();
    });
};


// save original values

counters.forEach(counter => {

    counter.dataset.original =
        counter.innerText;
});


// trigger once

let counterStarted = false;

window.addEventListener("scroll", () => {

    const stats =
        document.querySelector(".stats");

    if (!stats) return;

    const statsTop =
        stats.offsetTop - 300;

    if (
        window.scrollY > statsTop &&
        !counterStarted
    ) {

        startCounter();

        counterStarted = true;
    }
});


// ===============================
// SMOOTH FADE IN ANIMATION
// ===============================

const observer =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "show"
                );
            }
        });

    }, {
        threshold: 0.2
    });

document
    .querySelectorAll(
        ".service-card,.stat-box,.testimonial-card,.portfolio-card"
    )
    .forEach(el => {

        el.classList.add("hidden");

        observer.observe(el);
    });