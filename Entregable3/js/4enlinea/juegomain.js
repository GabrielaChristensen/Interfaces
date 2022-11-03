"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const boardCanvas = document.getElementById("board");
    const modal = document.getElementById("modal-cuatroenlinea");
    const buttonTry = document.querySelector("#try-button");
    const buttonrestart = document.querySelector('#btn-reiniciar');

    const boardCtx = boardCanvas.getContext("2d");

    const altoCanvas = boardCanvas.clientHeight;
    const anchoCelda = 40;
    const altoCelda = 40;
    const anchoCanvas = boardCanvas.clientWidth;
    const tipoJuego = 4;
    let tablero = null;



    buttonTry.addEventListener('click', () => {
        inicializarJuego();
    })

    //reinicia el juego permitiendo elegir nuevas opciones
    buttonrestart.addEventListener('click', () => {
        modal.style.visibility = "visible";
    })


    function inicializarJuego() {
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
        modal.style.visibility = "hidden";
        tablero.inicializarTablero();

    }

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
