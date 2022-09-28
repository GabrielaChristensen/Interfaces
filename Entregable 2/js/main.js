"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let desplegable = document.querySelector(".menu-navbar");
    let btnMenu = document.querySelector(".menu-hamburguesa");
    btnMenu.addEventListener("click", () => {
        console.log('test', desplegable);
        desplegable.classList.toggle("menu-navbar-visible");
    })
})