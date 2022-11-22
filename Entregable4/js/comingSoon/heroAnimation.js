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

    const offsetHeader = headerElement.offsetTop;
    let isMoving = false;


    window.onscroll = function () {
        if (feature1) {
            animateCards();
            animateImages();
        }
        animateHeader();
    };


    function animateCards() {
        if (window.scrollY > 500 && window.scrollY < 1500 && !isMoving) {
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
                return scrollY <= 1600 && scrollY > 0;
            case 2:
                return scrollY > 1600 && scrollY <= 1950;
            case 3:
                return scrollY > 1950 && scrollY <= 2300;
            case 4:
                return scrollY > 2300 && scrollY <= 2350;
            default:
                break;
        }
    }

    function animateHeader() {
        if (window.scrollY > offsetHeader) {
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
//let scrollTimeOut = setTimeout(move ,2000)
//window.addEventListener("scroll", move)
window.addEventListener('scroll', move)
function move(){

        let scrolled = window.scrollY;
        let paralaxheight =paralax.clientHeight
        console.log(paralaxheight/3)
        sky.style.top =scrolled*0.8+'px'
        front.style.top =scrolled*1.1+'px'
        lara.style.left = scrolled*0.5+'px'
        lara.style.top=scrolled+'px'
        title.style.top=scrolled+'px'
        hojader.style.top=scrolled+'px'
        hojader.style.left= scrolled*2+'px'
        hojaizq.style.top=scrolled+'px'
        hojaizq.style.right=scrolled*2+'px'
        if((paralaxheight/3)<scrolled){
            title.style.visibility="hidden"
        }

     //paralax.style.top = scrolled +'px';

}
});