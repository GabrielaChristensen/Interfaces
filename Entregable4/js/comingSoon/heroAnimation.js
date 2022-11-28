"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const feature1 = document.getElementById("feature1");
    const feature2 = document.getElementById("feature2");
    const feature3 = document.getElementById("feature-tec1");
    const feature4 = document.getElementById("feature-tec2");
    const feature5 = document.getElementById("feature-tec3");
    const imgLara1 = document.getElementById('imgLara1');
    const imgLara2 = document.getElementById('imgLara2');
    const imgLara3 = document.getElementById('imgLara3');
    const imgLara4 = document.getElementById('imgLara4');
    const prrf1 = document.getElementById('parrafo1');
    const prrf2 = document.getElementById('parrafo2');
    const prrf3 = document.getElementById('parrafo3');
    const prrf4 = document.getElementById('parrafo4');
    const headerElement = document.getElementById("header");
    const menuElement = document.getElementById("menuToggle");
    const userProfileElement = document.getElementById("userProfile");
    const logoElement = document.getElementById("logo");

    //Personajes scroll

    let laraImg = document.querySelector("#lara-img");
    let laraPoints = document.querySelector("#lara-points");
    let laraName = document.querySelector("#lara-name");

    let johanaImg = document.querySelector("#johana-img");
    let johanaPoints = document.querySelector("#johana-points");
    let johanaName = document.querySelector("#johana-name");

    let maxImg = document.querySelector("#max-img");
    let maxPoints = document.querySelector("#max-points");
    let maxName = document.querySelector("#max-name");

    let pedroImg = document.querySelector("#pedro-img");
    let pedroPoints = document.querySelector("#pedro-points");
    let pedroName = document.querySelector("#pedro-name");

    const offsetHeader = headerElement.offsetTop;
    let isMoving = false;


    window.onscroll = function () {

        var valueY = window.scrollY;
        if (feature1) {

            laraImg.style.left = valueY * 1.5 + 'px';
            laraPoints.style.left = -valueY * 1.8 + 'px';
            laraName.style.left = -valueY * 2.1 + 'px';


            johanaImg.style.left = valueY * 1 + 'px';
            johanaPoints.style.left = -valueY * 1 + 'px';
            johanaName.style.left = -valueY * 1.2 + 'px';

            maxImg.style.left = valueY * 1.45 + 'px';
            maxPoints.style.left = -valueY * 0.95 + 'px';
            maxName.style.left = -valueY * 1.3 + 'px';

            pedroImg.style.left = valueY * 1.1 + 'px';
            pedroPoints.style.left = -valueY * 1 + 'px';
            pedroName.style.left = -valueY * 0.7 + 'px';


        }



        if (feature1) {
            animateCards();
            animateImages();
        }
        animateHeader();
    };


    function animateCards() {
        if (window.scrollY > 750 && window.scrollY < 2500 && !isMoving) {
            isMoving = true;
            feature1.classList.toggle('fgeneros');
            feature2.classList.toggle('fgeneros');
            feature3.classList.toggle('ftecnicas');
            feature4.classList.toggle('ftecnicas');
            feature5.classList.toggle('ftecnicas');
            setTimeout(() => {
                isMoving = false;
            }, 2000);
        }
    }

    function animateImages() {
        const imgLara1Visible = visibleElement(1, window.scrollY);
        const imgLara2Visible = visibleElement(2, window.scrollY);
        const imgLara3Visible = visibleElement(3, window.scrollY);
        const imgLara4Visible = visibleElement(4, window.scrollY);

        if (imgLara1Visible) {
            imgLara1.classList.remove('imgOculta');
            imgLara2.classList.add('imgOculta');
            imgLara3.classList.add('imgOculta');
            imgLara4.classList.add('imgOculta');
            prrf1.classList.remove('parrafo-oculto');
            prrf2.classList.add('parrafo-oculto');
            prrf3.classList.add('parrafo-oculto');
            prrf4.classList.add('parrafo-oculto');
        } else {
            if (imgLara2Visible) {
                imgLara1.classList.add('imgOculta');
                imgLara2.classList.remove('imgOculta');
                imgLara3.classList.add('imgOculta');
                imgLara4.classList.add('imgOculta');
                prrf1.classList.add('parrafo-oculto');
                prrf2.classList.remove('parrafo-oculto');
                prrf3.classList.add('parrafo-oculto');
                prrf4.classList.add('parrafo-oculto');
            } else {
                if (imgLara3Visible) {
                    imgLara1.classList.add('imgOculta');
                    imgLara2.classList.add('imgOculta');
                    imgLara3.classList.remove('imgOculta');
                    imgLara4.classList.add('imgOculta');
                    prrf1.classList.add('parrafo-oculto');
                    prrf2.classList.add('parrafo-oculto');
                    prrf3.classList.remove('parrafo-oculto');
                    prrf4.classList.add('parrafo-oculto');
                } else if (imgLara4Visible) {
                    imgLara1.classList.add('imgOculta');
                    imgLara2.classList.add('imgOculta');
                    imgLara3.classList.add('imgOculta');
                    imgLara4.classList.remove('imgOculta');
                    prrf1.classList.add('parrafo-oculto');
                    prrf2.classList.add('parrafo-oculto');
                    prrf3.classList.add('parrafo-oculto');
                    prrf4.classList.remove('parrafo-oculto');
                }
            }
        }
    }

    function visibleElement(elemento = 1, scrollY) {
        switch (elemento) {
            case 1:
                return scrollY <= 2400 && scrollY > 0;
            case 2:
                return scrollY > 2400 && scrollY <= 2550;
            case 3:
                return scrollY > 2850 && scrollY <= 3100;
            case 4:
                return scrollY > 3100 && scrollY <= 3350;
            default:
                break;
        }
    }

    function animateHeader() {
        if (window.pageYOffset > offsetHeader) {
            headerElement.classList.add('header-sticky');
            logoElement.classList.add('logo-sticky');
            userProfileElement.classList.add('userProfile-sticky');
            menuElement.classList.add('menu-sticky');
        } else {
            headerElement.classList.remove('header-sticky');
            logoElement.classList.remove('logo-sticky');
            userProfileElement.classList.remove('userProfile-sticky');
            menuElement.classList.remove('menu-sticky');
        }
    }

    /**
     * Paralax
     */
    let paralax = document.getElementById("CS-paralax");
    let hojader = document.getElementById("hojasder");
    let hojaizq = document.getElementById("hojasizq");
    let sky = document.getElementById("CS-back");
    let front = document.getElementById("CS-front");
    let lara = document.getElementById("CS-main");
    let title = document.getElementById("CS-title");
    let humo = document.getElementById("CS-humo")
    let coomingsoon = document.getElementById('texto-juego-coming-soon')
    window.addEventListener('scroll', move)
    function move() {
        if (paralax) {

            let scrolled = window.scrollY;
            let paralaxheight = paralax.clientHeight
            sky.style.top = scrolled * 0.8 + 'px'
            front.style.top = scrolled * 1.1 + 'px'
            lara.style.left = scrolled * 0.5 + 'px'
            lara.style.top = scrolled + 'px'
            title.style.top = scrolled + 'px'
            humo.style.top = scrolled + 'px'
            coomingsoon.style.top = 180 + scrolled + 'px'
            hojader.style.top = scrolled + 'px'
            hojader.style.left = scrolled * 2 + 'px'
            hojaizq.style.top = scrolled + 'px'
            hojaizq.style.right = scrolled * 2 + 'px'
            if ((paralaxheight / 6) < scrolled) {
                title.classList.remove('CS-titleapper')
                title.classList.add('CS-titlevanish')
                coomingsoon.classList.add('coomingsoonapper')
                coomingsoon.classList.remove('coomingsoonvanish')
            }
            if ((paralaxheight / 6) > scrolled) {
                title.classList.remove('CS-titlevanish')
                title.classList.add('CS-titleapper')
                coomingsoon.classList.remove('coomingsoonapper')
                coomingsoon.classList.add('coomingsoonvanish')
            }
        }
    }
    /**Carousel */
    let next = document.getElementById("next")
    let prev = document.getElementById("prev")
    let carousel = document.getElementById("CS-carousel")
    if (next) {
        next.addEventListener('click', scrolltoright)
    }
    if (prev) {
        prev.addEventListener('click', scrolltoleft)
    }
    function scrolltoright() {
        carousel.scrollBy({
            top: 0,
            left: 400,
            behavior: 'smooth'
        })
    }
    function scrolltoleft() {
        carousel.scrollBy({
            top: 0,
            left: -400,
            behavior: 'smooth'
        })
    }


});
