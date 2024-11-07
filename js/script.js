document.addEventListener('DOMContentLoaded', function () {

    // GSAP Match Media
    let mm = gsap.matchMedia(),
        breakPoint = 899;

    const isSafari = () => {
        return (
            ~navigator.userAgent.indexOf('Safari') &&
            navigator.userAgent.indexOf('Chrome') < 0
        );
    };

    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            );
        },
    };

    if (isMobile.any()) {
        document.querySelector('body').classList.add('v-mobile');
        document.querySelector('html').classList.add('v-mobile');
    } else {
        document.querySelector('body').classList.add('v-desk');
        document.querySelector('html').classList.add('v-desk');
    }

    //menuToggle
    document.querySelectorAll('.menu__toggle').forEach(item => {
        item.addEventListener('click', function (e) {
            document.querySelectorAll('.menu__toggle').forEach(element => {
                element.classList.toggle('_active-menu');
            })
            document.querySelector('.menu__box').classList.toggle('_active-menu');
            document.body.classList.toggle('_lock');
        });
    })

    // const subMenuTrigger = document.querySelectorAll('.has_submenu');
    // subMenuTrigger.forEach(trigger => {
    //     trigger.addEventListener('click', function () {
    //         if (isMobile.any()) {
    //             const submenu = trigger.querySelectorAll('.menu__submenu');
    //             const tl = gsap.timeline({
    //                 defaults: { duration: 0.2, ease: 'power4.inOut' },
    //             });

    //             if (trigger.classList.contains('_active')) {
    //                 tl.to(submenu[0], { opacity: 0 }).to(submenu[0], { height: 0, paddingBottom: 0 })
    //                 trigger.classList.remove('_active');
    //             } else {
    //                 tl.to(submenu[0], { height: 'auto', paddingBottom: '30px' }).to(submenu[0], { opacity: 1 })
    //                 trigger.classList.add('_active');
    //             }
    //         }
    //     })
    // })


    // Anchor
    const anchors = document.querySelectorAll('[data-goto]');
    if (anchors.length > 0) {
        anchors.forEach(anch => {
            anch.addEventListener('click', function (event) {
                event.preventDefault();

                document.querySelectorAll('.menu__toggle').forEach(item => {
                    item.classList.remove('_active-menu');
                })

                document.querySelector('.menu__box').classList.remove('_active-menu');
                document.body.classList.remove('_lock');

                var targetElement = document.querySelector(anch.getAttribute('data-goto'));
                console.log(targetElement)
                if (isMobile.any()) {
                    animateScrollTo(targetElement.getBoundingClientRect().top + 1, 500);
                } else {
                    animateScrollTo(targetElement.getBoundingClientRect().top + 1, 500);
                }
            });
        })
    }


    function animateScrollTo(to, duration) {
        var start = window.pageYOffset;
        var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        var animation = requestAnimationFrame(scroll);

        function scroll() {
            var now = 'now' in window.performance ? performance.now() : new Date().getTime();
            var time = Math.min(1, (now - startTime) / duration);

            window.scroll(0, start + (to - start) * time);

            if (time < 1) {
                animation = requestAnimationFrame(scroll);
            }
        }
    }

    // Random letters animation
    const shakedText = document.querySelectorAll('.shake');

    if (!isMobile.any()) {
        if (shakedText.length > 0) {
            shakedText.forEach((item) => {
                // set item width
                item.style.width = item.offsetWidth + 'px';
                item.style.maxWidth = item.offsetWidth + 'px';
                item.style.minWidth = item.offsetWidth + 'px';

                splitText(item);

                item.addEventListener('mouseenter', () => { randomizeLetter(item); })
            })
        }
    }

    function splitText(item) {
        let itemText = item.innerHTML;


        if (itemText) {
            const itemTextWrapper = document.createElement('span');

            itemText = item.innerHTML.trim();
            item.innerHTML = "";

            itemText.split("").forEach((letter) => {
                const letterWrapper = document.createElement('span');

                letterWrapper.classList.add('shake-letter');
                letterWrapper.dataset.letter = letter;
                letterWrapper.innerHTML = letter;

                itemTextWrapper.append(letterWrapper);
            })

            item.append(itemTextWrapper);
        }
    }

    function randomizeLetter(item) {
        const letters = item.querySelectorAll('.shake-letter');
        const lettersCount = letters.length;
        const intervalTime = 500 / lettersCount;

        letters.forEach((letter) => {
            if (letter.innerHTML != " ") {
                letter.innerHTML = getRandomLetters(1);
            }
        })

        let iteration = 0;

        let interval = setInterval(() => {
            if (iteration < lettersCount) {
                letters[iteration].innerHTML = letters[iteration].dataset.letter;
                iteration++;
            } else[
                clearInterval(interval)
            ]
        }, intervalTime)

    }

    function getRandomLetters(length) {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789#$@';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    // END | Random letters animation



    // Animation Title 
    var textElement = document.querySelectorAll('.animated-title span');

    textElement.forEach((span => {
        const textArray = span.innerText.split('');
        span.innerHTML = '';

        textArray.forEach((char, index) => {
            const charElement = document.createElement('span');
            charElement.classList.add('char')

            if (char == "/n" || char == "\n") {
                charElement.innerHTML = '<div>';
            } else {
                charElement.innerHTML = char;
            }

            span.appendChild(charElement);
        });

    }))

    var animateTitle = function animateTitle(entry) {
        var chars = entry.querySelectorAll('.char');
        chars.forEach(function (_char) {

            const variant = Math.floor(Math.random() * 4);

            _char.addEventListener(
                'mouseover',
                function (e) {
                    gsap.to(e.target, {
                        transformOrigin: '50% 50%',
                        rotationZ: variant % 2 ? -25 : 25,
                        scale: 1.1
                    });
                }
            )
            _char.addEventListener(
                'mouseout',
                function (e) {
                    gsap.to(e.target, {
                        transformOrigin: '50% 50%',
                        rotationZ: 0,
                        scale: 1
                    });
                }
            )

            return gsap.set(_char.parentNode, {
                perspective: 1000
            });
        });
        gsap.fromTo(chars, {
            'will-change': 'opacity, transform',
            transformOrigin: '50% 0%',
            opacity: 0,
            rotationX: -90,
            z: -200
        }, {
            ease: 'power1',
            opacity: 1,
            stagger: 0.05,
            rotationX: 0,
            z: 0
        });
    };

    var bannerTitle = document.querySelector('.banner__title');

    if (bannerTitle) {
        animateTitle(bannerTitle);
    }
    // END | Animation Title


    // OnScroll Animation

    // END | OnScroll Animation


    // Benefits Counter Animation
    const setItemsWidth = (items) => {
        if (items.length > 0) {
            items.forEach(item => {
                item.style.maxWidth = 'unset';
                item.style.minWidth = 'unset';

                item.style.maxWidth = item.offsetWidth + 'px';
                item.style.minWidth = item.offsetWidth + 'px';
            })
        }
    }

    const benefitsItems = document.querySelectorAll(".benefits-item__title");

    setItemsWidth(benefitsItems);

    gsap.from('.benefits-item__title span', {
        textContent: 0,
        duration: 3,
        ease: "power4.out",
        snap: { textContent: 1 },
        stagger: 0.5,
    });

    window.addEventListener('resize', function (event) {
        setItemsWidth(benefitsItems);
    }, true);
    // END | Benefits Counter Animation


    // Image Card Animation

    let mouseX = 0;
    let mouseY = 0;
    let width = 137;
    let height = 137;

    function mousePX() {
        return mouseX / width;
    };
    function mousePY() {
        return mouseY / height;
    };

    const cardElements = document.querySelectorAll('.tools-image');

    cardElements.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            mouseX = e.pageX - card.offsetLeft - width / 2;
            mouseY = e.pageY - card.offsetTop - height / 2;

            const rX = mousePX() * 30;
            const rY = mousePY() * -30;
            card.children[0].style.transform = `rotateY(${rX}deg) rotateX(${rY}deg)`

            const tX = mousePX() * -40;
            const tY = mousePY() * -40;

            card.children[0].transform = `translateX(${tX}px) translateY(${tY}px)`;
        })

        card.addEventListener('mouseleave', function (e) {
            mouseX = 0;
            mouseY = 0;

            const rX = mousePX() * 30;
            const rY = mousePY() * -30;
            card.children[0].style.transform = `rotateY(${rX}deg) rotateX(${rY}deg)`

            const tX = mousePX() * -40;
            const tY = mousePY() * -40;

            card.children[0].transform = `translateX(${tX}px) translateY(${tY}px)`;
        })
    })

    // END | Image Card Animation


    // Benefits Animation
    const benefitItem1 = document.querySelector('.benefits-item-1');
    if (benefitItem1) {
        benefitItem1.addEventListener('mouseenter', () => {
            const tl = gsap.timeline({});
            tl.to('.benefits-item-1 .benefits-item__title, .benefits-item-1 .benefits-item__text', { opacity: 0, duration: 0 })
                .to('.benefits-item-1 .benefits-item-hover', { display: "flex", duration: 0 })
                .fromTo('.benefits-item-1 .benefits-item-hover__text', { scale: 0 }, { scale: 1, duration: 0, delay: 0 })
                .fromTo('.benefits-item-1 .benefits-item-hover-image__title', { scale: 0 }, { scale: 1, duration: 0.15, delay: 0.05 })
        })
        benefitItem1.addEventListener('mouseleave', () => {
            const tl = gsap.timeline({});
            tl.to('.benefits-item-1 .benefits-item__title, .benefits-item-1 .benefits-item__text', { opacity: 1, duration: 0 })
                .to('.benefits-item-1 .benefits-item-hover', { display: "none", duration: 0 })
        })
    }

    const benefitItem2 = document.querySelector('.benefits-item-2');
    if (benefitItem2) {
        benefitItem2.addEventListener('mouseenter', () => {
            const tl = gsap.timeline({});
            tl.to('.benefits-item-2 .benefits-item__title, .benefits-item-2 .benefits-item__text', { opacity: 0, duration: 0 })
                .to('.benefits-item-2 .benefits-item-hover', { display: "flex", duration: 0 })
                .fromTo('.benefits-item-2 .benefits-item-hover__text', { scale: 0 }, { scale: 1, duration: 0, delay: 0 })
                .fromTo('.benefits-item-2 .benefits-item-hover-image-bg__item.item-1', { scale: 0, left: 0, bottom: 0 }, { scale: 1, left: -134, bottom: -72, duration: 0.05, delay: 0 })
                .fromTo('.benefits-item-2 .benefits-item-hover-image-bg__item.item-2', { scale: 0, right: 0, bottom: 0 }, { scale: 1, right: -70, bottom: -60, duration: 0.05, delay: 0 })
                .fromTo('.benefits-item-2 .benefits-item-hover-image__title', { scale: 0 }, { scale: 1, duration: 0.15, delay: 0.01 })
        })
        benefitItem2.addEventListener('mouseleave', () => {
            const tl = gsap.timeline({});
            tl.to('.benefits-item-2 .benefits-item__title, .benefits-item-2 .benefits-item__text', { opacity: 1, duration: 0 })
                .to('.benefits-item-2 .benefits-item-hover', { display: "none", duration: 0 })
        })
    }

    const benefitItem3 = document.querySelector('.benefits-item-3');
    if (benefitItem3) {
        benefitItem3.addEventListener('mouseenter', () => {
            const tl = gsap.timeline({});
            tl.to('.benefits-item-3 .benefits-item__title, .benefits-item-3 .benefits-item__text', { opacity: 0, duration: 0 })
                .to('.benefits-item-3 .benefits-item-hover', { display: "flex", duration: 0 })
                .fromTo('.benefits-item-3 .benefits-item-hover__text', { scale: 0 }, { scale: 1, duration: 0, delay: 0 })
                .fromTo('.benefits-item-3 .benefits-item-hover-image-bg__item.item-1', { scale: 0, left: 50, top: 0 }, { scale: 1, left: 0, top: -72, duration: 0.05, delay: 0 })
                .fromTo('.benefits-item-3 .benefits-item-hover-image-bg__item.item-4', { scale: 0, right: 50, bottom: 0 }, { scale: 1, right: 0, bottom: -62, duration: 0.05, delay: 0 })
                .fromTo('.benefits-item-3 .benefits-item-hover-image-bg__item.item-2', { scale: 0, right: 50, top: 0 }, { scale: 1, right: 0, top: -72, duration: 0.05, delay: 0 })
                .fromTo('.benefits-item-3 .benefits-item-hover-image-bg__item.item-3', { scale: 0, left: 50, bottom: 0 }, { scale: 1, left: 0, bottom: -82, duration: 0.05, delay: 0 })
                .fromTo('.benefits-item-3 .benefits-item-hover-image__title', { scale: 0 }, { scale: 1, duration: 0.15, delay: 0 })
        })
        benefitItem3.addEventListener('mouseleave', () => {
            const tl = gsap.timeline({});
            tl.to('.benefits-item-3 .benefits-item__title, .benefits-item-3 .benefits-item__text', { opacity: 1, duration: 0 })
                .to('.benefits-item-3 .benefits-item-hover', { display: "none", duration: 0 })
        })
    }

    // END | Benefits Animation

    // FIAT Animation   
    const fiatTitleTrigger = document.querySelector('.fiat__title .title-trigger');
    if (fiatTitleTrigger) {
        const fiatCarVissible = document.querySelector('.fiat-car .vissible');
        const fiatCarHover = document.querySelector('.fiat-car .hover');

        const tlEnter = gsap.timeline({});


        let isTlEnterActive = false;
        let isTlLeaveActive = false;

        fiatTitleTrigger.addEventListener('mouseenter', () => {
            if (!tlEnter.isActive() || !isTlLeaveActive) {
                isTlEnterActive = true;
                isTlLeaveActive = false;

                tlEnter.to(fiatCarVissible, { scale: 0, duration: 0.05 })
                    .to(fiatCarHover, { scale: 0.8, x: 0 })
                    .to('.fiat-car-text', { opacity: 1, duration: 0.4, delay: 0.05 });
            }
        })


        fiatTitleTrigger.addEventListener('mouseleave', () => {
            if (isTlEnterActive) {
                isTlLeaveActive = true;
                isTlEnterActive = false;

                tlEnter.to(fiatCarHover, { scale: 0, duration: 0.05 })
                    .to(fiatCarVissible, { scale: 1, duration: 0.05 })
                    .to(fiatCarHover, { x: 400, duration: 0 })
                    .to('.fiat-car-text', { opacity: 0, duration: 0 });
            }
        })

        const fiatCarSmoke1 = document.querySelector('.fiat-car-smoke-1');
        const fiatCarSmoke2 = document.querySelector('.fiat-car-smoke-2');

        gsap.fromTo(fiatCarSmoke1, { scale: 0.28, top: 0, left: "45%" }, { scale: 0, left: "70%", top: -40, duration: 2, repeat: -1 })
        gsap.fromTo(fiatCarSmoke2, { scale: 0.28, top: 0, left: "45%" }, { scale: 0, left: "70%", top: -40, delay: 1, duration: 2, repeat: -1 })
    }

    // END | FIAT Animation   


    //  SCROLL TRIGGER ANIMATIONS

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch(".shake.shake-on-scroll", {
        onEnter: (elements, triggers) => {
            elements.forEach((item) => {
                randomizeLetter(item);
            })
        }
    });
    ScrollTrigger.batch(".fadeInLeft", {
        start: "top 120%",
        onEnter: (elements, triggers) => {
            gsap.to(elements, { opacity: 1, x: 0, stagger: 0.15, delay: 0.1 });
        }
    });
    ScrollTrigger.batch(".fadeInUp", {
        start: "top 120%",
        onEnter: (elements, triggers) => {
            gsap.to(elements, { opacity: 1, y: 0, stagger: 0.15, delay: 0.1 });
        }
    });
    ScrollTrigger.batch(".fadeInRight", {
        start: "top 120%",
        onEnter: (elements, triggers) => {
            gsap.to(elements, { opacity: 1, x: 0, stagger: 0.15, delay: 0.1 });
        }
    });
    ScrollTrigger.batch(".zoomIn", {
        start: "top 120%",
        onEnter: (elements, triggers) => {
            gsap.to(elements, { opacity: 1, scale: 1, stagger: 0.15, delay: 0.1 });
        },
    });

    var businessTitle = document.querySelector('.business-individual__title');
    ScrollTrigger.batch(businessTitle, {
        onEnter: (elements, triggers) => {
            animateTitle(businessTitle);
        }
    });

    const sections = document.querySelectorAll('section');

    if (sections.length > 0) {
        sections.forEach((section => {
            const tl = gsap.timeline({});

            tl.fromTo(section.querySelectorAll('._section-bg'), { top: "-=50" }, { top: "+=70", delay: 0 }, 0);

            ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                end: "100%",
                animation: tl,
                scrub: 1,
                pinSpacing: false,
            })
        }))

    }

    const benefitsSection = document.querySelector('.benefits');

    if (benefitsSection) {
        const tl = gsap.timeline({});

        tl.fromTo('.banner-image', { bottom: 0 }, { bottom: 70, delay: 0 }, 0);

        tl.fromTo('.banner-bg__item', {}, { top: "+=40", delay: 0 }, 0);

        tl.fromTo(benefitsSection, {
            translateY: 0,
        }, { translateY: -130, duration: 1 }, 0);

        ScrollTrigger.create({
            trigger: benefitsSection,
            start: "top bottom",
            end: "+=100%",
            animation: tl,
            scrub: 1,
            pinSpacing: false
        })
    }

    const reasonsSection = document.querySelector('.reasons');

    if (reasonsSection) {

        mm.add(
            {
                isDesktop: `(min-width: ${breakPoint + 1}px)`,
                isMobile: `(max-width: ${breakPoint}px)`,
                reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
                let { isDesktop, isMobile, reduceMotion } = context.conditions;

                const tl = gsap.timeline({});

                tl.fromTo('.reasons-bg-item', {}, { top: "+=40", delay: 0 }, 0);

                tl.from('.reasons__header', {
                    translateX: "-100%",
                    duration: 1,
                }).to({}, {})

                ScrollTrigger.create({
                    trigger: reasonsSection,
                    start: "top bottom",
                    end: isDesktop ? "+=85%" : "+=50%",
                    animation: tl,
                    scrub: 1,
                    pinSpacing: false
                })
                return () => { };
            }
        );


    }

    const transitionSection = document.querySelector('.transition');

    if (transitionSection) {

        mm.add(
            {
                isDesktop: `(min-width: ${breakPoint + 1}px)`,
                isMobile: `(max-width: ${breakPoint}px)`,
                reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
                let { isDesktop, isMobile, reduceMotion } = context.conditions;

                const tl = gsap.timeline({
                    ease: 'power4.out'
                });


                tl.fromTo(transitionSection, { zIndex: 1 }, { zIndex: 2, duration: 0.01 }, 0)
                tl.fromTo(
                    '#image',
                    { scale: 1, translateY: 0 },
                    { scale: isDesktop ? "40" : "50", translateY: "100vh" },
                    0)

                ScrollTrigger.create({
                    trigger: '#image',
                    start: isDesktop ? "220% bottom" : "220% bottom",
                    end: "",
                    animation: tl,
                    scrub: 1,
                    pinSpacing: false,
                    // end: () => `+=${document.querySelector(".manual-bg").offsetHeight}`,

                })

                return () => { };
            }
        )
    }

    if (!isMobile.any()) {
        const sectorsSection = document.querySelector('.sectors');
        const sectorItems = document.querySelectorAll('.sectors-item');
        const sectorItemsImage = document.querySelectorAll('.sectors-item__image');

        if (sectorItems.length > 0) {
            sectorItems.forEach((item, index) => {
                item.addEventListener('mousemove', (e) => {
                    sectorItemsImage[index].style.display = "block";
                    sectorItemsImage[index].style.setProperty('--image-position-x', `${e.pageX - sectorsSection.offsetLeft}px`);
                    sectorItemsImage[index].style.setProperty('--image-position-y', `${e.pageY - sectorsSection.offsetTop}px`);
                    console.log(e)
                });
                item.addEventListener('mouseleave', (e) => {
                    sectorItemsImage[index].style.display = "none";
                })
            })
        }
    }

    const manualSection = document.querySelector('.manual');

    if (manualSection) {
        const tl = gsap.timeline({});

        tl.fromTo('.manual-bg__wrapper', { height: "0%" }, { height: "100%", delay: 0 }, 0);

        ScrollTrigger.create({
            trigger: '.manual-bg',
            start: "100px bottom",
            end: () => `+=${document.querySelector(".manual-bg").offsetHeight}`,
            animation: tl,
            scrub: 1,
            pinSpacing: false,
        })

        const tl2 = gsap.timeline({ ease: 'none' });

        tl2.fromTo(manualSection, { positon: "fixed", bottom: 0 }, {}, 0);

        ScrollTrigger.create({
            trigger: manualSection,
            start: "bottom bottom",
            end: "+=100%",
            animation: tl2,
            scrub: 1,
            pin: true,
            pinSpacing: false,
        })
    }


    const requestSection = document.querySelector('.request');
    if (requestSection) {
        const tl = gsap.timeline({});

        tl.fromTo(requestSection, { "--background-gradient": "0%" }, { '--background-gradient': "100%" }, 0);

        ScrollTrigger.create({
            trigger: requestSection,
            start: "top 80%",
            end: "100% bottom",
            animation: tl,
            scrub: 1,
            pinSpacing: false,
        })
    }

    const stepsSection = document.querySelector('.steps');
    if (stepsSection) {
        const tl = gsap.timeline({ ease: 'none' });

        tl.fromTo('.steps-right-bg__mask', { height: "100%" }, { height: "0%" }, 0);

        ScrollTrigger.create({
            trigger: '.steps-right-bg__mask',
            start: "100px 80%",
            end: "120% bottom",
            animation: tl,
            scrub: 1,
            pinSpacing: false,
        })
    }
    //  END SCROLL TRIGGER ANIMATIONS

    // Footer
    const footer = document.querySelector('.footer');
    const footerWrapper = document.querySelector('.footer__wrapper');

    if (footer) {
        footer.style.height = footerWrapper.offsetHeight + 'px';

        window.addEventListener('resize', function (event) {
            footer.style.height = footerWrapper.offsetHeight + 'px';
            setItemsWidth(benefitsItems);
        }, true);

        const tl = gsap.timeline({});

        tl.fromTo(footerWrapper, { y: '-60%' }, { y: '0%' }, 0);

        ScrollTrigger.create({
            trigger: footer,
            start: "top bottom",
            end: "+70% bottom",
            animation: tl,
            scrub: 1,
            pinSpacing: false,
        })
    }

    // END | Footer


    // 	---------ROKET------------------- 

    // a few helper functions...

    // for creating the inner elements of an SVG, https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
    const createSVGElement = s =>
        document.createElementNS("http://www.w3.org/2000/svg", s);

    // alias the querySelector
    _$ = s => document.querySelector(s);

    // used to easily give a number between x and y
    const randomRange = (min, max) => Math.random() * (max - min) + min;

    // generate a <circle> element with a random radius and x and y position
    const createCircle = () => {
        const _$circle = createSVGElement("circle");
        _$circle.setAttribute("r", randomRange(0.5, 2));
        _$circle.setAttribute("fill", "#AAB7C4");
        _$circle.setAttribute("cx", randomRange(0, 75));
        _$circle.setAttribute("cy", randomRange(0, 75));
        return _$circle;
    };

    // grab some of the DOM elements needed
    const _$rocket = _$("#rocket-icon");
    const _$top = _$rocket.querySelector("*");
    const _$flame = _$(".flame");

    // generate a set of a transforms that randomly scales the width and height
    // of the rocket’s flame
    const flicker = Array.from({ length: 20 }).map(() => ({
        transform: `scale(${randomRange(0.9, 1.2)}, ${randomRange(0.9, 1.2)})`,
    }));
    _$flame.animate(flicker, { duration: 750, iterations: Infinity });

    // create and insert the stars (circles) to the SVG
    const _$stars = Array.from({ length: 10 }).map(() => createCircle());
    _$stars.forEach(_$star =>
        _$rocket.insertBefore(_$star, _$top)
    );

    // animate the stars
    const across = [
        { cx: "75px", fillOpacity: 0 },
        { fillOpacity: 1 },
        { cx: "0", fillOpacity: 0 },
    ];
    _$stars.forEach(_$star => {
        const duration = randomRange(1000, 2000);
        _$star.animate(across, { duration, iterations: Infinity });
    });


    // Get the button:
    let rocketScroll = document.getElementById("rocket");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            rocketScroll.style.opacity = 1;
        } else {
            rocketScroll.style.opacity = 0;
            setTimeout(() => {
                rocketScroll.style.transform = 'rotate(-90deg)';
            }, 300);
        }
    };

    document.getElementById('rocket').addEventListener('click', function () {
        this.style.transform = 'rotate(-90deg) translateX(100vh)';

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // 	--------- END | ROKET------------------- 

    // CUSTOM SELECT

    const selectElement = document.querySelectorAll('.business-select');

    if (selectElement.length > 0) {
        selectElement.forEach(selector => {

            const selectorType = selector.dataset.type;
            const customSelectList = document.querySelector(`${selectorType} .custom-select__list`);
            const customSelectHeader = document.querySelector(`${selectorType} .custom-select__header`);
            const customSelectHeaderText = customSelectHeader.querySelector('span');
            console.log(selectElement)

            // Populate custom select list
            Array.from(selector.options).forEach(function (option) {
                const customSelectItem = document.createElement('p');
                customSelectItem.className = 'custom-select-item';
                customSelectItem.textContent = option.textContent;
                customSelectList.appendChild(customSelectItem);
            });

            // Toggle custom select list
            customSelectHeader.addEventListener('click', function () {
                customSelectList.classList.toggle('visible');
            });

            // Handle custom select item click
            customSelectList.addEventListener('click', function (event) {
                if (event.target.classList.contains('custom-select-item')) {
                    const selectedItem = event.target;

                    // Remove active class from all items
                    document.querySelectorAll('.custom-select-item').forEach(function (item) {
                        item.classList.remove('_active');
                    });

                    // Add active class to clicked item
                    selectedItem.classList.add('_active');

                    // Update custom select header
                    customSelectHeader.classList.add('_selected');
                    customSelectHeaderText.textContent = selectedItem.textContent;

                    // Hide custom select list
                    customSelectList.classList.remove('visible');
                }
            });

        })
    }





    // END | CUSTOM SELECT



    //popup`s appear
    // $('.popup .popup__close').click(function (e) {
    //     $(this).parent().parent().removeClass('_active-popup')
    //     $('body').removeClass('_lock')
    // })
    // $('.popup .popup__bg').click(function (e) {
    //     $(this).parent().removeClass('_active-popup')
    //     $('body').removeClass('_lock')
    // })
    // $('.open-popup__order').click(function (e) {
    //     e.preventDefault()

    //     $('.popup-order').addClass('_active-popup')
    //     $('body').addClass('_lock')

    //     $('.menu__toggle').removeClass('_active-menu')
    //     $('.menu__box').removeClass('_active-menu')
    // })
    // $('.popup__close').click(function (e) {
    //     //$(this).parent().parent().removeClass('_avtive-popup')
    //     // $('.popup-order .order__item ')[0].pause()
    // })
    // $('.popup__bg').click(function (e) {
    //     //$(this).parent().parent().removeClass('_avtive-popup')
    //     // $('.popup-order .order__item ')[0].pause()
    // })

    document.querySelectorAll('.popup .popup__close').forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function () {
            closeBtn.closest('.popup').classList.remove('_active-popup');
            document.body.classList.remove('_lock');
        });
    });

    document.querySelectorAll('.popup .popup__bg').forEach(function (bg) {
        bg.addEventListener('click', function () {
            bg.closest('.popup').classList.remove('_active-popup');
            document.body.classList.remove('_lock');
        });
    });

    document.querySelectorAll('.open-popup__order').forEach(function (openBtn) {
        openBtn.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector('.popup-order').classList.add('_active-popup');
            document.body.classList.add('_lock');

            document.querySelector('.menu__toggle').classList.remove('_active-menu');
            document.querySelector('.menu__box').classList.remove('_active-menu');
        });
    });
    
    document.querySelectorAll('form').forEach(function (submit) {
        submit.addEventListener('submit', function (e) {
            e.preventDefault();

            document.querySelector('.popup-order').classList.remove('_active-popup');
            document.querySelector('.popup-success').classList.add('_active-popup');
            document.body.classList.add('_lock');

            document.querySelector('.menu__toggle').classList.remove('_active-menu');
            document.querySelector('.menu__box').classList.remove('_active-menu');
        });
    });

});