"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const boardCanvas = document.querySelector("#board");
    const contenedorCanvas = document.querySelector("#contenedor-board");

    const modal = document.querySelector("#modal-cuatroenlinea");
    const contenedorInicio = document.querySelector("#contenedor-inicio");
    const buttoncomenzar = document.querySelector("#btn-comenzar");
    const buttonTry = document.querySelector("#try-button");
    const buttonrestart = document.querySelector('#btn-reiniciar');

    const boardCtx = boardCanvas.getContext("2d");

    const altoCanvas = boardCanvas.clientHeight;
    const anchoCelda = 40;
    const altoCelda = 40;
    const anchoCanvas = boardCanvas.clientWidth;
    const tipoJuego = 4;
    let tablero = null;


    //al hacer click en el btn comenzar se abre el modal para elegir las opciones de juego
    buttoncomenzar.addEventListener('click', () => {
        modal.style.visibility = "visible";
    })

    buttonTry.addEventListener('click', () => {
        contenedorInicio.style.display = "none";
        contenedorCanvas.style.display = "flex";
        buttonrestart.style.visibility = "visible";
        inicializarJuego();
    })

    //reinicia el juego permitiendo elegir nuevas opciones
    buttonrestart.addEventListener('click', () => {
        modal.style.visibility = "visible";
        contenedorCanvas.style.display = "flex";
    })


    /**
     * Inicializa el juego segun los parametros usados por el jugador
     */
    function inicializarJuego() {
        modal.style.visibility = "hidden";
        if (!tablero) {
            tablero = new Tablero({
                canvaCtx: boardCtx,
                anchoCanvas: anchoCanvas,
                altoCanvas,
                elementoCanva: boardCanvas,
            }, tipoJuego, anchoCelda, altoCelda, fichaSelecionJuno(), fichaSelecionJdos());
        } else {
            tablero.setFichaJ1(fichaSelecionJuno());
            tablero.setFichaJ2(fichaSelecionJdos());
            //tablero.setTipoJuego();
        }
        tablero.inicializarTablero();

    }

    /**
     * Determina la ficha que eligio el jugador 1
     * @returns {string}
     */
    function fichaSelecionJuno() {
        let fichaJUno = document.fichaJuno
        let fichaseleccionada = "";
        for (let i = 0; i < fichaJUno.length; i++) {
            if (fichaJUno[i].checked) {
                switch (fichaJUno[i].value) {
                    case "1":
                        fichaseleccionada = "images/4enlinea/Ficha-brujula.png"
                        return fichaseleccionada
                    case "2":
                        fichaseleccionada = "images/4enlinea/Ficha-calavera.png";
                        return fichaseleccionada
                    case "3":
                        fichaseleccionada = "images/4enlinea/Ficha-catalejos.png"
                        return fichaseleccionada
                    case "4":
                        fichaseleccionada = "images/4enlinea/Ficha-espadas.png"
                        return fichaseleccionada
                }
            };
        }
    }

    /**
     * Determina la ficha que eligio el jugador 2
     * @returns {string}
     */
    function fichaSelecionJdos() {
        let fichaJUno = document.fichaJdos
        let fichaseleccionada = "";
        for (let i = 0; i < fichaJUno.length; i++) {
            if (fichaJUno[i].checked) {
                switch (fichaJUno[i].value) {
                    case "1":
                        fichaseleccionada = "images/4enlinea/Ficha-brujula.png"
                        return fichaseleccionada
                    case "2":
                        fichaseleccionada = "images/4enlinea/Ficha-calavera.png";
                        return fichaseleccionada
                    case "3":
                        fichaseleccionada = "images/4enlinea/Ficha-catalejos.png"
                        return fichaseleccionada
                    case "4":
                        fichaseleccionada = "images/4enlinea/Ficha-espadas.png"
                        return fichaseleccionada
                }
            };
        }
    }

})
