class Tablero {


    constructor({ canvaCtx, altoCanvas, anchoCanvas, elementoCanva, anchoTablero, altoTablero, inicioTablero, inicioYTablero }, maxFilas, maxColumnas, anchoFichas, tipoJuego = 4, anchoCelda, altoCelda) {

        this.canvaCtx = canvaCtx;
        this.tablero = [];
        this.fichas = [];
        this.maxFilas = maxFilas;
        this.anchoTablero = anchoTablero;
        this.mouseDown = false;
        this.anchoFichas = anchoFichas;
        this.maxColumnas = maxColumnas;
        this.altoTablero = altoTablero;
        this.totalFichasPorJugador = (maxColumnas * maxFilas) / 2;
        this.elementoCanva = elementoCanva;
        this.inicioYTablero = inicioYTablero;
        this.inicioTablero = inicioTablero;
        this.fichasNecesarias = tipoJuego;
        this.tipoJuego = tipoJuego;
        this.altoCelda = altoCelda;//this.altoTablero / this.maxFilas;
        this.anchoCelda = anchoCelda;//this.anchoTablero / this.maxColumnas;
        this.altoCanvas = altoCanvas;
        this.eventosMouseUsado = false;
        this.anchoCanvas = anchoCanvas;
        this.turnoJugador = 1;
        this.fichaSeleccionada = null;
        this.tableroCargado = false;
        this.flechasTablero = [];
        this.imagenTablero = new Image();
        this.imagenTablero.src = 'images/4enlinea/celda.png';
        this.inicializarPosiciones();
    }



    inicializarPosiciones() {
        let posInicialY = this.inicioYTablero;
        for (let fila = 0; fila < this.maxFilas; fila++) {
            this.tablero[fila] = [];
            const posY = posInicialY + (this.altoCelda / 2);
            let posInicialX = this.inicioTablero;
            for (let columna = 0; columna < this.maxColumnas; columna++) {
                const posX = posInicialX + (this.anchoCelda / 2);
                this.tablero[fila].push({
                    posX: posX,
                    posY: posY,
                    ficha: null
                });
                posInicialX = posX + (this.anchoCelda / 2);
            }
            posInicialY = posY + (this.altoCelda / 2)
        }
    }

    inicializarTablero() {
        this.tablero = [];
        this.turnoJugador = 1;
        this.inicializarPosiciones();
        this.dibujarTablero();
        this.dibujarFlechas();
        this.inicializarFichas();
        this.dibujarFichas();
        this.moverFichas();
    }

    dibujarTablero() {
        this.canvaCtx.fillStyle = "#417D80"; // Poner imagen de fondo
        this.canvaCtx.fillRect(0, 0, this.anchoCanvas, this.altoCanvas);
        this.canvaCtx.fill();
        if (!this.tableroCargado)
            this.imagenTablero.onload = () => {
                this.tableroCargado = true;
                for (let i = 0; i < this.maxFilas; i++) {
                    for (let j = 0; j < this.maxColumnas; j++) {
                        this.canvaCtx.drawImage(this.imagenTablero, this.inicioTablero + (this.anchoCelda * j), this.inicioYTablero + (this.altoCelda * i), this.anchoCelda, this.altoCelda);
                    }
                }
            }
        else {
            for (let i = 0; i < this.maxFilas; i++) {
                for (let j = 0; j < this.maxColumnas; j++) {
                    this.canvaCtx.drawImage(this.imagenTablero, this.inicioTablero + (this.anchoCelda * j), this.inicioYTablero + (this.altoCelda * i), this.anchoCelda, this.altoCelda);
                }
            }
        }

    }


    dibujarFlechas() {
        this.canvaCtx.fillStyle = "black";
        let posInicial = this.inicioTablero;
        for (let i = 0; i < this.maxColumnas; i++) {
            const posX = posInicial + (this.anchoCelda / 2);
            const posYInicio = this.inicioYTablero - (this.anchoCelda / 2);
            const posYFinal = posYInicio + 8;
            this.canvaCtx.beginPath();
            this.canvaCtx.moveTo(posX - 10, posYInicio);
            this.canvaCtx.lineTo(posX + 10, posYInicio);
            this.canvaCtx.lineTo(posX, posYFinal);
            this.canvaCtx.stroke();
            this.canvaCtx.fill();
            this.canvaCtx.closePath();
            this.flechasTablero.push({ posXInicio: posX - 20, posXFinal: posX + 20, posYInicio: posYInicio, posYFinal: posYFinal });
            posInicial = posX + (this.anchoCelda / 2);
        }
    }

    inicializarFichas() {
        this.inicializarFichasJ1();
        this.inicializarFichasJ2();
    }

    getPosicionRandomJ1() {
        const limite1FichaXJ1 = 0 + this.anchoFichas;
        const limite2FichaXJ1 = this.inicioTablero - this.anchoFichas;

        const limite1FichaYJ1 = this.inicioYTablero + this.anchoFichas;
        const limite2FichaYJ1 = this.altoCanvas - this.inicioYTablero - this.anchoFichas;

        return {
            posX: Math.round(Math.random() * (limite2FichaXJ1 - limite1FichaXJ1 + 1) + limite1FichaXJ1),
            posY: Math.round(Math.random() * (limite2FichaYJ1 - limite1FichaYJ1 + 1) + limite1FichaYJ1),
        }
    }

    getPosicionRandomJ2() {
        const limite2FichaXJ2 = this.inicioTablero + this.anchoTablero + this.anchoFichas;
        const limite1FichaXJ2 = this.anchoCanvas - this.anchoFichas;

        const limite1FichaYJ2 = this.inicioYTablero + this.anchoFichas;
        const limite2FichaYJ2 = this.altoCanvas - this.inicioYTablero - this.anchoFichas;

        return {
            posX: Math.round(Math.random() * (limite2FichaXJ2 - limite1FichaXJ2 + 1) + limite1FichaXJ2),
            posY: Math.round(Math.random() * (limite2FichaYJ2 - limite1FichaYJ2 + 1) + limite1FichaYJ2),
        }
    }

    inicializarFichasJ1() {
        for (let fichaIndex = 0; fichaIndex < this.totalFichasPorJugador; fichaIndex++) {
            const posiciones = this.getPosicionRandomJ1();
            const ficha = new Ficha(posiciones, 1, this.canvaCtx, this.anchoFichas);
            this.fichas.push(ficha);
        }
    }

    inicializarFichasJ2() {
        for (let fichaIndex = 0; fichaIndex < this.totalFichasPorJugador; fichaIndex++) {
            const posiciones = this.getPosicionRandomJ2();
            const ficha = new Ficha(posiciones, 2, this.canvaCtx, this.anchoFichas);
            this.fichas.push(ficha);
        }
    }

    moverFichas() {
        if (!this.eventosMouseUsado) {
            this.elementoCanva.addEventListener('mousedown', (e) => {
                this.onMouseDown(e);
            })
            this.elementoCanva.addEventListener('mousemove', (e) => {
                this.onMouseMove(e);
            })
            this.elementoCanva.addEventListener('mouseup', (e) => {
                this.onMouseUp(e);
            })
        }
        this.eventosMouseUsado = true;
    }


    columnaLlena(columnaAInsertar) {
        for (let fila = 0; fila < this.maxFilas; fila++) {
            if (!this.tablero[fila][columnaAInsertar].ficha) return false;
        }
        return true;
    }

    onMouseUp(e) {
        this.mouseDown = false;
        debugger;
        const columnaAInsertar = this.obtenerColumna({ posX: e.offsetX, posY: e.offsetY });
        if (columnaAInsertar === undefined || columnaAInsertar < 0 || this.columnaLlena(columnaAInsertar)) {
            if (this.fichaSeleccionada) {
                const fichaSeleccionada = this.fichas[this.fichaSeleccionada];
                const posiciones = this.turnoJugador === 1 ? this.getPosicionRandomJ1() : this.getPosicionRandomJ2();
                fichaSeleccionada.setPosicion({ x: posiciones.posX, y: posiciones.posY });
                this.fichas[fichaSeleccionada] = fichaSeleccionada;
            }

            this.dibujarTablero();
            this.dibujarFlechas();
            this.dibujarFichas();
        } else {
            if (columnaAInsertar !== undefined) {
                const posAInsertar = this.getPosAInsertar(columnaAInsertar);
                if (posAInsertar) {
                    const juegoTerminado = this.juegoTerminado({ fila: posAInsertar.fila, columna: posAInsertar.columna });
                    this.tablero[posAInsertar.fila][posAInsertar.columna].ficha = posAInsertar.fichaAInsertar;
                    this.turnoJugador = this.turnoJugador === 1 ? 2 : 1;
                    if (juegoTerminado) {
                        this.fichas = [];
                        this.inicializarTablero();
                    } else {
                        this.dibujarTablero();
                        this.dibujarFlechas();
                        this.dibujarFichas();
                    }
                }
            }
        }
    }

    onMouseDown(event) {
        this.mouseDown = true;
        this.fichaSeleccionada = null;
        for (let i = 0; i < this.fichas.length; i++) {
            const ficha = this.fichas[i];

            if (ficha.estaSeleccionada({ mouseX: event.offsetX, mouseY: event.offsetY })) {
                if (ficha.getJugador() === this.turnoJugador) {
                    this.fichaSeleccionada = i;
                    break;
                }
            }
        }
        this.dibujarTablero();
        this.dibujarFlechas();
        this.dibujarFichas();
    }


    onMouseMove(event) {
        if (this.fichaSeleccionada !== null && this.mouseDown) {
            const ficha = this.fichas[this.fichaSeleccionada];
            ficha.setPosicion({ x: event.offsetX, y: event.offsetY })
            this.fichas[this.fichaSeleccionada] = ficha;
            this.dibujarTablero();
            this.dibujarFlechas();
            this.dibujarFichas();
        }
    }


    dibujarFichas() {
        for (let i = 0; i < this.fichas.length; i++) {
            const fichaActual = this.fichas[i];
            fichaActual.dibujarFicha();
        }
    }


    getPosAInsertar(columna) {
        for (let i = this.maxFilas - 1; i >= 0; i--) {
            if (this.tablero[i][columna] && !this.tablero[i][columna].ficha) {
                const fichaAInsertar = this.fichas[this.fichaSeleccionada];
                const posicionX = this.tablero[i][columna].posX;
                const posicionY = this.tablero[i][columna].posY;
                fichaAInsertar.setPosicion({ x: posicionX, y: posicionY });
                this.fichas[this.fichaSeleccionada] = fichaAInsertar;
                return { fila: i, columna: columna, fichaAInsertar };
            }
        }
        return null;
    }

    juegoTerminado({ fila, columna }) {
        const chequearVertical = this.chequearVertical({ fila, columna });
        const chequearHorizontal = this.chequearHorizontal({ fila, columna });
        const chequearDiagonal = this.chequearDiagonal({ fila, columna });
        const ganoVer = chequearVertical;
        const ganoHor = chequearHorizontal;
        const ganoDiag = chequearDiagonal;



        if (chequearVertical || chequearHorizontal || chequearDiagonal) {
            let msg = '';
            if (ganoVer) msg += 'Vertical'
            if (ganoHor) msg += 'Horizontal'
            if (ganoDiag) msg += 'Diagonal'

            window.alert(`Jugador ${this.turnoJugador} ganó por ${msg}!`);
            this.turnoJugador = 1;
            return true;
        }
    }

    obtenerColumna({ posX, posY }) {
        for (let i = 0; i < this.flechasTablero.length; i++) {
            const flecha = this.flechasTablero[i];
            if ((posX >= flecha.posXInicio && posX <= flecha.posXFinal) && (posY >= flecha.posYInicio && posY <= flecha.posYFinal)) {
                return i;
            }
        }
        return -1;
    }

    chequearVertical({ fila, columna }) {
        if (fila === this.maxFilas - 1 || (this.maxFilas - this.fichasNecesarias) < fila)
            return false;
        let contador = 1;
        let iteradorFila = fila + 1;
        let mismoJugador = true;
        while (mismoJugador && iteradorFila < this.maxFilas) {
            const ficha = this.tablero[iteradorFila][columna].ficha;
            if (ficha && ficha.getJugador() === this.turnoJugador) {
                contador++;
                if (contador >= this.fichasNecesarias) return true;
            }
            else {
                contador--;
                mismoJugador = false;
            }
            iteradorFila++;
        }
        return false;
    }

    chequearHorizontal({ fila, columna }) {
        const contadorHorizontalIzq = this.contadorIzquierdaHorizontal({ fila, columna });
        const contadorHorizontalDer = this.contadorDerechaHorizontal({ fila, columna });
        return contadorHorizontalIzq + contadorHorizontalDer >= this.fichasNecesarias;
    }

    contadorDerechaHorizontal({ fila, columna }) {
        let iteradorColumna = columna + 1;
        let contador = 1;
        let mismoJugador = true;
        while (mismoJugador && iteradorColumna < this.maxColumnas) {
            const ficha = this.tablero[fila][iteradorColumna].ficha;
            if (ficha && ficha.getJugador() === this.turnoJugador) {
                contador++;
                if (contador === this.fichasNecesarias) return contador;
            }
            else {
                contador--;
                mismoJugador = false;
            }
            iteradorColumna++;
        }
        return contador;
    }

    contadorIzquierdaHorizontal({ fila, columna }) {
        let iteradorColumna = columna - 1;
        let contador = 1;
        let mismoJugador = true;
        while (mismoJugador && iteradorColumna >= 0) {
            const ficha = this.tablero[fila][iteradorColumna].ficha;
            if (ficha && ficha.getJugador() === this.turnoJugador) {
                contador++;
                if (contador === this.fichasNecesarias) return contador;
            } else {
                contador--;
                mismoJugador = false;
            }
            iteradorColumna--;
        }
        return contador;
    }

    chequearDiagonal({ fila, columna }) {
        const contadorDiagonalIzquierdaInferior = this.contadorDiagonalIzquierdaInferior({ fila, columna });
        const contadorDiagonalDerechaSuperior = this.contadorDiagonalDerechaSuperior({ fila, columna });

        const contadorDiagonalDerechaInferior = this.contadorDiagonalDerechaInferior({ fila, columna });
        const contadorDiagonalIzquierdaSuperior = this.contadorDiagonalIzquierdaSuperior({ fila, columna });

        return (contadorDiagonalDerechaInferior + contadorDiagonalIzquierdaSuperior >= this.fichasNecesarias) ||
            (contadorDiagonalIzquierdaInferior + contadorDiagonalDerechaSuperior >= this.fichasNecesarias);
    }


    contadorDiagonalDerechaSuperior({ fila, columna }) {
        let iteradorFila = fila - 1;
        let iteradorColumna = columna + 1;
        let mismoJugador = true;
        let contador = 1;
        while (mismoJugador && iteradorFila >= 0 && iteradorColumna < this.maxColumnas) {
            const ficha = this.tablero[iteradorFila][iteradorColumna].ficha;
            if (ficha && ficha.getJugador() === this.turnoJugador) {
                contador++;
                if (contador === this.fichasNecesarias) return contador;
            }
            else {
                contador--;
                mismoJugador = false;
            }
            iteradorFila--;
            iteradorColumna++;
        }
        return contador;
    }

    contadorDiagonalIzquierdaSuperior({ fila, columna }) {
        let iteradorFila = fila - 1;
        let iteradorColumna = columna - 1;
        let mismoJugador = true;
        let contador = 1;
        while (mismoJugador && iteradorFila >= 0 && iteradorColumna >= 0) {
            const ficha = this.tablero[iteradorFila][iteradorColumna].ficha;
            if (ficha && ficha.getJugador() === this.turnoJugador) {
                contador++;
                if (contador == this.fichasNecesarias) return contador;
            } else {
                contador--;
                mismoJugador = false;
            }
            iteradorFila--;
            iteradorColumna--;
        }
        return contador;
    }

    contadorDiagonalIzquierdaInferior({ fila, columna }) {
        let iteradorFila = fila + 1;
        let iteradorColumna = columna - 1;
        let mismoJugador = true;
        let contador = 1;
        while (mismoJugador && iteradorFila < this.maxFilas && iteradorColumna >= 0) {
            const ficha = this.tablero[iteradorFila][iteradorColumna].ficha;
            if (ficha && ficha.getJugador() === this.turnoJugador) {
                contador++;
                if (contador == this.fichasNecesarias) return contador;
            } else {
                contador--;
                mismoJugador = false;
            }
            iteradorFila++;
            iteradorColumna--;
        }
        return contador;
    }

    contadorDiagonalDerechaInferior({ fila, columna }) {
        let iteradorFila = fila + 1;
        let iteradorColumna = columna + 1;
        let mismoJugador = true;
        let contador = 1;
        while (mismoJugador && iteradorFila < this.maxFilas && iteradorColumna < this.maxColumnas) {
            const ficha = this.tablero[iteradorFila][iteradorColumna].ficha;
            if (ficha && ficha.getJugador() === this.turnoJugador) {
                contador++;
                if (contador == this.fichasNecesarias) return contador;
            } else {
                contador--;
                mismoJugador = false;
            }
            iteradorFila++;
            iteradorColumna++;
        }
        return contador;
    }
}