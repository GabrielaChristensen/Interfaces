"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const boardCanvas = document.querySelector("#board");
    const contenedorCanvas = document.querySelector("#contenedor-board");

    const modal = document.querySelector("#modal-cuatroenlinea");
    const modalfichasIguales = document.querySelector("#ModalfichasIguales");
    const contenedorInicio = document.querySelector("#contenedor-inicio");
    const buttoncomenzar = document.querySelector("#btn-comenzar");
    const buttonStart = document.querySelector("#Start-button");
    const buttonrestart = document.querySelector('#btn-reiniciar');

    const boardCtx = boardCanvas.getContext("2d");

    const altoCanvas = boardCanvas.clientHeight;
    const anchoCelda = 40;
    const altoCelda = 40;
    const anchoCanvas = boardCanvas.clientWidth;
    let tipoJuego = 4;
    let nombreJugador1 = "Jugador 1";
    let nombreJugador2 = "Jugador 2";
    let tablero = null;

    /**
     * Al hacer click en el btn comenzar se abre el modal para elegir las opciones de juego
     */
    buttoncomenzar.addEventListener('click', () => {
        modal.style.display = "flex";
        contenedorInicio.style.display = "none";
    })

    /**
     * Se inicia el juego con los nombres de jugadores, tipo de juego seleccionado y fichas seleccionadas distintas
     */
    buttonStart.addEventListener('click', () => {
        if (!checkFichaDistintas()) {
            nombreJugador1 = document.getElementById("POneName").value ? document.getElementById("POneName").value : "Jugador 1";
            nombreJugador2 = document.getElementById("PTwoName").value ? document.getElementById("PTwoName").value : "Jugador 2";
            tipoDeJuegoSeleccionado();
            modal.style.display = "none";
            modalfichasIguales.style.display = "none";
            contenedorCanvas.style.display = "flex";
            contenedorInicio.style.display = 'none';
            buttonrestart.style.visibility = "visible";
            inicializarJuego();
        } else {
            modalfichasIguales.style.display = "flex";
            setTimeout(hiddenModal, 2000);

        }
    })


    /**
     * Reinicia el juego permitiendo elegir nuevas opciones
     */
    buttonrestart.addEventListener('click', () => {
        modal.style.display = "flex";
        contenedorCanvas.style.display = "none";
    })


    /**
     * Inicializa el juego segun los parametros usados por el jugador
     */
    function inicializarJuego() {

        if (!tablero) {
            tablero = new Tablero({
                canvaCtx: boardCtx,
                anchoCanvas: anchoCanvas,
                altoCanvas,
                elementoCanva: boardCanvas,
            }, tipoJuego, anchoCelda, altoCelda, fichaSelecionJuno(), fichaSelecionJdos(), nombreJugador1, nombreJugador2);
        } else {
            tablero.setFichaJ1(fichaSelecionJuno());
            tablero.setFichaJ2(fichaSelecionJdos());
            tablero.setNombreJ1(nombreJugador1);
            tablero.setNombreJ2(nombreJugador2);
            tablero.setTipoJuego(tipoJuego);
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
                        fichaseleccionada = "images/4enlinea/Ficha-brujula.png";
                        return fichaseleccionada;
                    case "2":
                        fichaseleccionada = "images/4enlinea/Ficha-calavera.png";
                        return fichaseleccionada;
                    case "3":
                        fichaseleccionada = "images/4enlinea/Ficha-catalejos.png";
                        return fichaseleccionada;
                    case "4":
                        fichaseleccionada = "images/4enlinea/Ficha-espadas.png";
                        return fichaseleccionada;
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
                        fichaseleccionada = "images/4enlinea/Ficha-brujula.png";
                        return fichaseleccionada;
                    case "2":
                        fichaseleccionada = "images/4enlinea/Ficha-calavera.png";
                        return fichaseleccionada;
                    case "3":
                        fichaseleccionada = "images/4enlinea/Ficha-catalejos.png";
                        return fichaseleccionada;
                    case "4":
                        fichaseleccionada = "images/4enlinea/Ficha-espadas.png";
                        return fichaseleccionada;
                }
            };
        }
    }

    /**
     * comprueba si se han elegido las mismas fichas
     * @returns {boolean}
     */
    function checkFichaDistintas() {
        return fichaSelecionJuno() == fichaSelecionJdos();
    }

    /**
     * Define el tipo de juego (4,5,6,7 en linea)
     * @return {int}
     */
    function tipoDeJuegoSeleccionado() {
        let tipoDeJuegoSeleccionado = document.tipoDeJuegoform
        for (let i = 0; i < tipoDeJuegoSeleccionado.length; i++) {
            if (tipoDeJuegoSeleccionado[i].checked) {
                switch (tipoDeJuegoSeleccionado[i].value) {
                    case "4":
                        tipoJuego = 4;
                        break
                    case "5":
                        tipoJuego = 5;
                        break
                    case "6":
                        tipoJuego = 6;
                        break
                    case "7":
                        tipoJuego = 7;
                        break
                }
            }
        }
    }

    /**
    * Esconde el mensaje de fichas iguales
    */
    function hiddenModal() {
        modalfichasIguales.style.display = "none";
    }
})
