"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const boardCanvas = document.getElementById("board");
    debugger;
    const boardCtx = boardCanvas.getContext("2d");
    const MAXFILAS = 9;
    const MAXCOLUMNAS = 10;
    const altoCanvas = boardCanvas.clientHeight;
    const fichasNecesarias = 4;
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
            inicioYTablero: altoCanvas - altoTablero - 5
        }, MAXFILAS, MAXCOLUMNAS, 40, 7, anchoCelda, altoCelda);
        tablero.inicializarTablero();
    }

    inicializarJuego();
})


