$(document).ready(function () {

    /* ================= MENU ================= */
    const $menu = $('#menu');
    const $navbar = $('.navbar');

    $menu.click(function () {
        $(this).toggleClass('fa-times');
        $navbar.toggleClass('nav-toggle');
    });

    // Debounce/Throttle scroll logic to prevent layout thrashing
    $(window).on('scroll load', function () {
        $menu.removeClass('fa-times');
        $navbar.removeClass('nav-toggle');

        const top = $(window).scrollTop();

        // Scroll Spy
        $('section').each(function () {
            const $this = $(this);
            const height = $this.outerHeight();
            const offset = $this.offset().top - 200;
            const id = $this.attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $navbar.find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    /* ================= SMOOTH SCROLL ================= */
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        const target = $(this).attr('href');
        
        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 500, 'linear');
        }
    });

    /* ================= TAB VISIBILITY TITLE ================= */
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Jigar Sable";
            $("#favicon").attr("href", "assets/images/favicon.png");
        } else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });

    /* ================= TYPED JS ================= */
    new Typed(".typing-text", {
        strings: [
            "Electronics Engineer", 
            "PCB Design Engineer", 
            "PCB Designer & Maintainer", 
            "PCB Analyser & Troubleshooter"
        ],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500
    });

    /* ================= FETCH SKILLS & PROJECTS ================= */
    async function fetchData(type = "skills") {
        try {
            const url = type === "skills" ? "skills.json" : "./projects/projects.json";
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Could not fetch data for ${type}:`, error);
        }
    }

    function showSkills(skills) {
        if (!skills) return;
        const skillHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}">
                <span>${skill.name}</span>
            </div>
        </div>`).join("");
        
        const container = document.getElementById("skillsContainer");
        if(container) container.innerHTML = skillHTML;
    }

    function showProjects(projects) {
        if (!projects) return;
        let projectHTML = "";

        projects
            .filter(project => project.category !== "android")
            .slice(0, 10)
            .forEach(project => {
                projectHTML += `
                <div class="box tilt">
                    <img draggable="false" src="assets/images/projects/${project.image}.png" alt="${project.name}">
                    <div class="content">
                        <div class="tag"><h3>${project.name}</h3></div>
                        <div class="desc">
                            <p>${project.desc}</p>
                            <div class="btns">
                                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                                <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                            </div>
                        </div>
                    </div>
                </div>`;
            });

        const workContainer = document.querySelector("#work .box-container");
        if (workContainer) {
            workContainer.innerHTML = projectHTML;
            // Initialize Tilt specifically on the freshly injected elements
            VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
            // Initialize Reveal explicitly on the freshly injected elements
            srtop.reveal('.work .box', { interval: 200 });
        }
    }

    // Load asynchronous UI data
    fetchData().then(showSkills);
    fetchData("projects").then(showProjects);

    /* ================= SCROLL REVEAL INITIALIZATION ================= */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    // Global reveal targets
    srtop.reveal('.home .content h3, .home .content p, .home .content .btn', { delay: 200 });
    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .linkedin, .home .telegram, .home .instagram, .home .dev', { interval: 600 });
    srtop.reveal('.home .github', { interval: 800 });
    srtop.reveal('.home .twitter', { interval: 1000 });

    srtop.reveal('.about .content h3, .about .content .tag, .about .content p, .about .content .box-container, .about .content .resumebtn', { delay: 200 });
    
    srtop.reveal('.skills .container', { interval: 200 });
    srtop.reveal('.skills .container .bar', { delay: 400 });

    srtop.reveal('.education .box', { interval: 200 });
    srtop.reveal('.experience .timeline', { delay: 400 });
    srtop.reveal('.experience .timeline .container', { interval: 400 });

    srtop.reveal('.contact .container, .contact .container .form-group', { delay: 400 });

    /* ================= PRELOADER FIXED ================= */
    setTimeout(() => {
        const loader = document.querySelector('.loader-container');
        if (loader) loader.classList.add('fade-out');
    }, 2500);

    /* ================= DEVTOOLS EXTRA SECURITY ================= */
    document.onkeydown = function (e) {
        if (e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(String.fromCharCode(e.keyCode))) ||
            (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))) {
            return false;
        }
    };
});

/* ================= TAWK CHAT ================= */
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/69cdd0cc525f481c3ab1ce45/1jl5vf8ov';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
