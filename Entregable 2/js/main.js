"use strict";




document.addEventListener("DOMContentLoaded", () => {

    const juegos = [
        {
            id: 1,
            nombre: 'God of War',
            precio: 1599,
            img: "./images/godofwar.jpg",
            imgReady: ""
        },
        {
            id: 2,
            nombre: 'Minecraft',
            precio: 1599,
            img: "./images/aventura/minecraft.jpg",
            imgReady: ""
        }
    ]

    //menu hamburguesa
    let desplegable = document.querySelector(".menu-navbar");
    let btnMenu = document.querySelector(".menu-hamburguesa");
    btnMenu.addEventListener("click", () => {
        desplegable.classList.toggle("menu-navbar-visible");
    })

    //porcentaje de avance de carga
    function calcularPorcentajeCarga() {
        let porcentaje = 0;
        const textPorcentaje = document.querySelector("#porcentaje-carga");
        if (textPorcentaje) {
            const contenedorCarga = document.querySelector("#contenedor-carga");
            const intervalo = setInterval(() => {
                if (porcentaje < 100) {
                    porcentaje = porcentaje + 10;
                    textPorcentaje.innerHTML = `${porcentaje}%`;
                }
            }, 500);
            setTimeout(() => {
                clearInterval(intervalo);
                contenedorCarga.classList.toggle("contenedor-carga-hidden");
            }, 5000);
        }
    }

    //modal de compra de juego con tarjeta
    function comprarJuego() {
        const btnComprar1 = document.querySelector("#btn-comprar1");
        const btnComprar2 = document.querySelector("#btn-comprar2");


        if (btnComprar1) {
            btnComprar1.addEventListener("click", () => {
                mostrarModal(1);
            })
        }

        if (btnComprar2) {
            btnComprar2.addEventListener("click", () => {
                mostrarModal(2);
            })
        }

    }
    const contenedorModal = document.querySelector("#modal-compra");

    function mostrarModal(idJuego) {
        const tituloJuegoMobile = document.querySelector("#titulo-juego-mobile");
        const tituloJuegoDesktop = document.querySelector("#titulo-juego-desktop");

        const imagenCompraJuego = document.querySelector("#imagen-compra-juego");
        contenedorModal.classList.toggle("modal-compra-visible");
        const juego = juegos.find((valorJuego) => {
            return valorJuego.id == idJuego;
        });

        tituloJuegoMobile.innerHTML = `${juego.nombre} $${juego.precio}`;
        tituloJuegoDesktop.innerHTML = `${juego.nombre} $${juego.precio}`;

        if (imagenCompraJuego) {
            imagenCompraJuego.setAttribute('src', juego.img);
        }
    }

    function cerrarModal() {
        const cerrarModal = document.querySelector("#cerrar-modal");
        cerrarModal.addEventListener('click', () => {
            contenedorModal.classList.toggle("modal-compra-visible");
        });
    }

    // calcularPorcentajeCarga();
    comprarJuego();
    cerrarModal();
})
