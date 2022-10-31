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
        }, MAXFILAS, MAXCOLUMNAS, 40, 7, anchoCelda, altoCelda);
        const backgroundImage = new Image();
        backgroundImage.src = "images/4enlinea/fondo-playa.png";
        // backgroundImage.onload = () => {
        //     boardCtx.drawImage(backgroundImage, 0, 0, anchoCanvas, altoCanvas);
        tablero.inicializarTablero();
        // }
    }

    inicializarJuego();
})


