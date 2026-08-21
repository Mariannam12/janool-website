document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const languageButton = document.getElementById("languageButton");
    const year = document.getElementById("year");

    let currentLanguage = "hy";


    /* =====================================================
       YEAR
    ===================================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       HEADER
    ===================================================== */

    function updateHeader() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMenu() {

        mobileMenu.classList.remove("active");
        menuButton.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuButton.setAttribute(
            "aria-label",
            "Open menu"
        );

    }


    function openMenu() {

        mobileMenu.classList.add("active");
        menuButton.classList.add("active");

        document.body.classList.add("menu-open");

        menuButton.setAttribute(
            "aria-label",
            "Close menu"
        );

    }


    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    /* =====================================================
       LANGUAGE
       Armenian opens first.
    ===================================================== */

    function setLanguage(language) {

        currentLanguage = language;

        document.documentElement.lang =
            language;

        const elements =
            document.querySelectorAll(
                "[data-hy][data-en]"
            );


        elements.forEach(element => {

            const text =
                element.getAttribute(
                    `data-${language}`
                );

            if (text) {
                element.textContent = text;
            }

        });


        /*
          If Armenian is active,
          button says EN because clicking it
          switches the site to English.

          If English is active,
          button says ՀՅ.
        */

        languageButton.textContent =
            language === "hy"
                ? "EN"
                : "ՀՅ";

    }


    languageButton.addEventListener(
        "click",
        () => {

            if (currentLanguage === "hy") {
                setLanguage("en");
            } else {
                setLanguage("hy");
            }

        }
    );


    /*
       ALWAYS start in Armenian.
    */

    setLanguage("hy");


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute("href");

                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetID
                        );

                    if (!target) return;

                    event.preventDefault();

                    closeMenu();

                    const headerHeight =
                        header.offsetHeight;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================================
       IMAGE ERROR FALLBACK
    ===================================================== */

    document
        .querySelectorAll(
            ".hero-image, .image-card img, .editorial-image img, .gallery-item img"
        )
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    /*
                      No ugly broken-image icon if a photo
                      hasn't been added yet.
                    */

                    image.style.opacity = "0";

                    if (image.parentElement) {

                        image.parentElement.style.background =
                            "linear-gradient(135deg, #201c19, #8d7565)";

                    }

                }
            );

        });


    /* =====================================================
       ESC CLOSES MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =====================================================
       DESKTOP RESIZE SAFETY
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 950) {
                closeMenu();
            }

        }
    );

});