"use strict";


document.addEventListener("DOMContentLoaded", () => {

    //juegos disponibles para comprar
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
            precio: 1600,
            img: "./images/aventura/minecraft.jpg",
            imgReady: "./images/aventura/minecraft ready.jpg"
        },
        {
            id: 3,
            nombre: 'Spiderman',
            precio: 1789,
            img: "./images/aventura/MarvelSpiderman.jpg",
            imgReady: "./images/aventura/MarvelSpiderman ready.jpg"
        },
        {
            id: 4,
            nombre: 'The Walking Dead',
            precio: 2500,
            img: "./images/aventura/the-walking-dead-the-final-season.jpg",
            imgReady: "./images/aventura/twd ready.jpg"
        },
        {
            id: 5,
            nombre: 'F1 2021',
            precio: 2578,
            img: "./images/carreras/f12021.jpg",
            imgReady: "./images/carreras/f1 2021 ready.jpg"
        },
        {
            id: 6,
            nombre: 'FORZA',
            precio: 10655,
            img: "./images/carreras/Forza-Horizon-5-Wallpapers-1.jpg",
            imgReady: "./images/carreras/forza ready.jpg"
        },
        {
            id: 7,
            nombre: 'Need For Speed',
            precio: 8642,
            img: "./images/carreras/needforspeedpayback.jpg",
            imgReady: "./images/carreras/need4speed ready.jpg"
        },
        {
            id: 8,
            nombre: 'PES 2013',
            precio: 160,
            img: "./images/deportes/pes2013.jpg",
            imgReady: "./images/deportes/pes ready.jpg"
        },
        {
            id: 9,
            nombre: 'Skate Story',
            precio: 1900,
            img: "./images/deportes/skatestory.jpg",
            imgReady: "./images/deportes/skate ready.jpg"
        },
        {
            id: 10,
            nombre: 'Turbo Golf Racing',
            precio: 500,
            img: "./images/deportes/turbogolfracing.jpg",
            imgReady: "./images/deportes/racing ready.jpg"
        },
        {
            id: 11,
            nombre: 'PAC-MAN',
            precio: 560,
            img: "./images/clasicos/Pacman.jpg",
            imgReady: "./images/clasicos/pacman ready.jpg"
        },
        {
            id: 12,
            nombre: 'Donkey Kong',
            precio: 1500,
            img: "./images/clasicos/Donkey-Kong.jpg",
            imgReady: "./images/clasicos/donkey ready.jpg"
        },
        {
            id: 13,
            nombre: 'Tetris',
            precio: 1000,
            img: "./images/clasicos/Tetris.png",
            imgReady: "./images/clasicos/tetris ready.jpg"
        }

    ]


    //Menu hamburguesa
    
    let inputToggle = document.getElementById("input-check");
    let menuToggle = document.getElementById("menu");
    inputToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("header-menu");
        menuToggle.classList.toggle("active");
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
        const btnComprar3 = document.querySelector("#btn-comprar3");
        const btnComprar4 = document.querySelector("#btn-comprar4");
        const btnComprar5 = document.querySelector("#btn-comprar5");
        const btnComprar6 = document.querySelector("#btn-comprar6");
        const btnComprar7 = document.querySelector("#btn-comprar7");
        const btnComprar8 = document.querySelector("#btn-comprar8");
        const btnComprar9 = document.querySelector("#btn-comprar9");
        const btnComprar10 = document.querySelector("#btn-comprar10");
        const btnComprar11 = document.querySelector("#btn-comprar11");
        const btnComprar12 = document.querySelector("#btn-comprar12");
        const btnComprar13 = document.querySelector("#btn-comprar13");


        if (btnComprar1) {
            btnComprar1.addEventListener("click", () => {
                if (!btnComprar1.classList.contains('btn-jugar-verde'))
                    mostrarModal(1);
            })
        }

        if (btnComprar2) {
            btnComprar2.addEventListener("click", () => {
                if (!btnComprar2.classList.contains('btn-jugar-verde'))
                    mostrarModal(2);
            })
        }

        if (btnComprar3) {
            btnComprar3.addEventListener("click", () => {
                if (!btnComprar3.classList.contains('btn-jugar-verde'))
                    mostrarModal(3);
            })
        }

        if (btnComprar4) {
            btnComprar4.addEventListener("click", () => {
                if (!btnComprar4.classList.contains('btn-jugar-verde'))
                    mostrarModal(4);
            })
        }

        if (btnComprar5) {
            btnComprar5.addEventListener("click", () => {
                if (!btnComprar5.classList.contains('btn-jugar-verde'))
                    mostrarModal(5);
            })
        }

        if (btnComprar6) {
            btnComprar6.addEventListener("click", () => {
                if (!btnComprar6.classList.contains('btn-jugar-verde'))
                    mostrarModal(6);
            })
        }

        if (btnComprar7) {
            btnComprar7.addEventListener("click", () => {
                if (!btnComprar7.classList.contains('btn-jugar-verde'))
                    mostrarModal(7);
            })
        }

        if (btnComprar8) {
            btnComprar8.addEventListener("click", () => {
                if (!btnComprar8.classList.contains('btn-jugar-verde'))
                    mostrarModal(8);
            })
        }

        if (btnComprar9) {
            btnComprar9.addEventListener("click", () => {
                if (!btnComprar9.classList.contains('btn-jugar-verde'))
                    mostrarModal(9);
            })
        }

        if (btnComprar10) {
            btnComprar10.addEventListener("click", () => {
                if (!btnComprar10.classList.contains('btn-jugar-verde'))
                    mostrarModal(10);
            })
        }

        if (btnComprar11) {
            btnComprar11.addEventListener("click", () => {
                if (!btnComprar11.classList.contains('btn-jugar-verde'))
                    mostrarModal(11);
            })
        }

        if (btnComprar12) {
            btnComprar12.addEventListener("click", () => {
                if (!btnComprar12.classList.contains('btn-jugar-verde'))
                    mostrarModal(12);
            })
        }

        if (btnComprar13) {
            btnComprar13.addEventListener("click", () => {
                if (!btnComprar13.classList.contains('btn-jugar-verde'))
                    mostrarModal(13);
            })
        }
    }

    const contenedorModal = document.querySelector("#modal-compra");

    //iniciar compra de juego con pop up
    function mostrarModal(idJuego) {
        // const tituloJuegoMobile = document.querySelector("#titulo-juego-mobile");
        // const tituloJuegoDesktop = document.querySelector("#titulo-juego-desktop");
        // const precioJuego = document.querySelector("#precio-juego");
        // const imagenCompraJuego = document.querySelector("#imagen-compra-juego");
        // if (contenedorModal)
        //     contenedorModal.classList.toggle("modal-compra-visible");
        const juego = juegos.find((valorJuego) => {
            return valorJuego.id == idJuego;
        });
        // if (tituloJuegoMobile)
        //     tituloJuegoMobile.innerHTML = `${juego.nombre} - $${juego.precio}`;
        // if (tituloJuegoDesktop)
        //     tituloJuegoDesktop.innerHTML = `${juego.nombre}`;
        // if (precioJuego)
        //     precioJuego.innerHTML = `$${juego.precio}`;


        // if (imagenCompraJuego) {
        //     imagenCompraJuego.setAttribute('src', juego.img);
        // }

        finalizarCompra(juego);
    }

    //cancelar compra de juego en pop up
    function cerrarModal() {
        const formularioCompra = document.querySelector("#form-compra");
        if (formularioCompra)
            formularioCompra.addEventListener('reset', () => {
                contenedorModal.classList.remove("modal-compra-visible");
            });
    }

    //finalizar compra de juego en pop up
    function finalizarCompra(juego) {
        // const formularioCompra = document.querySelector("#form-compra");
        const textoPrecioJuego = document.querySelector(`#texto-precio-juego-${juego.id}`);
        const imagenReadyJuego = document.querySelector(`#imagen-juego-${juego.id}`);

        const btnJugar = document.querySelector(`#btn-comprar${juego.id}`);
        // if (formularioCompra) {
        //     cerrarModal();
        //     formularioCompra.addEventListener('submit', (e) => {
        //         e.preventDefault();
        textoPrecioJuego.innerHTML = `Ready to play!!`;
        btnJugar.classList.remove('btn-comprar');
        btnJugar.classList.add('btn-jugar-verde');
        btnJugar.innerHTML = `<img src="./images/Polygon 1.svg" alt="play">Jugar`;
        if (imagenReadyJuego)
            imagenReadyJuego.setAttribute('src', juego.imgReady);
        // contenedorModal.classList.remove("modal-compra-visible");
        //     })
        // }

    }

    //conexion home con pagina 4 en linea
    function jugarCuatroLinea() {
        const btnComprarBatman = document.querySelector("#btn-comprar-batman");
        if (btnComprarBatman)
            btnComprarBatman.addEventListener('click', () => {
                window.open('cuatroenlinea.html', '_self')
            })
    }

    //conexion home con juego coming soon
    function verJuegoComingSoon() {
        const btnComingSoon = document.querySelector("#btn-masinfo");
        if (btnComingSoon)
            btnComingSoon.addEventListener('click', () => {
                window.open('comingSoon.html', '_self')
            })
    }

    //cambia estado de boton de reservar a reservado
    function actualizarBtnReservar() {
        const btnReservado = document.querySelector("#btn-reservar");
        const btnReservado2 = document.querySelector("#btn-reservar2");
        if (btnReservado) {
            btnReservado.addEventListener('click', () => {
                btnReservado.innerHTML = `Reservado`;
            })
        }
        if (btnReservado2) {
            btnReservado2.addEventListener('click', () => {
                btnReservado2.innerHTML = `Reservado`;

            })
        }
    }

    calcularPorcentajeCarga();
    comprarJuego();
    jugarCuatroLinea();
    verJuegoComingSoon();
    cerrarModal();
    actualizarBtnReservar();
})
