"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const boardCanvas = document.getElementById("board");
    const boardCtx = boardCanvas.getContext("2d");
    const MAXFILAS = 9;
    const MAXCOLUMNAS = 10;
    const altoCanvas = boardCanvas.clientHeight;
    const anchoCelda = 40;
    const altoCelda = 40;
    const anchoTablero = anchoCelda * MAXCOLUMNAS;
    const altoTablero = altoCelda * MAXFILAS;
    const anchoCanvas = boardCanvas.clientWidth;
    const inicioTablero = (anchoCanvas / 2) - (anchoTablero / 2);


    const buttonTry = document.querySelector("#try-button")

    buttonTry.addEventListener('click', () => {
        inicializarJuego();
    })


    function inicializarJuego() {
        const tablero = new Tablero({
            canvaCtx: boardCtx,
            anchoCanvas: anchoCanvas,
            altoCanvas,
            anchoTablero: anchoTablero,
            altoTablero,
            inicioTablero: inicioTablero,
            elementoCanva: boardCanvas,
            inicioYTablero: altoCanvas - altoTablero - 25
        }, MAXFILAS, MAXCOLUMNAS, 40, 7, anchoCelda, altoCelda, fichaSelecionJuno(), fichaSelecionJdos());

        tablero.inicializarTablero();
        document.getElementById("modal-cuatroenlinea").style.visibility = "hidden";

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
