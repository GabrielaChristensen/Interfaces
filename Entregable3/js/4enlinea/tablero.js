class Tablero {

    constructor({ canvaCtx, altoCanvas, anchoCanvas, elementoCanva, anchoTablero, altoTablero, inicioTablero, inicioYTablero }, maxFilas, maxColumnas, anchoFichas, tipoJuego = 4, anchoCelda, altoCelda, fichaJUno, fichaJDos) {

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
        this.altoCelda = altoCelda;
        this.anchoCelda = anchoCelda;
        this.altoCanvas = altoCanvas;
        this.eventosMouseUsado = false;
        this.mouseMove = false;
        this.maxColumnasFichas = 6;
        this.anchoCanvas = anchoCanvas;
        this.fichaSeleccionada = null;
        this.flechasTablero = [];
        this.ultimaPosicionFicha = null;
        this.tamañoTotalFichas = this.maxColumnasFichas * this.anchoFichas;
        this.fichaJUno = fichaJUno;
        this.fichaJDos = fichaJDos;
        this.juego = new Juego(this.tablero, this.maxFilas, this.maxColumnas, this.fichasNecesarias, 1);
        this.tiempoPorJuego = this.juego.getTiempoPorJuego();
        this.tiempoRestante = this.tiempoPorJuego;
        this.timerJuego = null;
        this.moverFichas();
        this.inicializarTimerJuego();
        this.backgroundImage = new Image();
        this.backgroundImage.src = "images/4enlinea/fondo-playa.png";
        this.backgroundImage.onload = () => {
            this.canvaCtx.drawImage(this.backgroundImage, 0, 0, this.anchoCanvas, this.altoCanvas);
        }
        this.imagenTablero = new Image();
        this.imagenTablero.src = 'images/4enlinea/celda.png';
        this.imagenTablero.onload = () => {
            this.dibujarTablero();
        }
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
        this.juego.setTablero(this.tablero);
    }

    inicializarTablero() {
        this.tablero = [];
        this.juego.setTablero(this.tablero);
        this.juego.setJugador(1);
        this.inicializarPosiciones();
        this.inicializarFichas();
        this.dibujarFondo();
    }

    inicializarEstado() {
        this.dibujarTablero();
        this.dibujarFlechas();
        this.dibujarFichas();
        this.mostrarTiempo();
    }


    dibujarFondo() {
        this.canvaCtx.clearRect(0, 0, this.anchoCanvas, this.altoCanvas);
        this.canvaCtx.drawImage(this.backgroundImage, 0, 0, this.anchoCanvas, this.altoCanvas);
        this.inicializarEstado();
    }

    dibujarTablero() {
        for (let i = 0; i < this.maxFilas; i++) {
            for (let j = 0; j < this.maxColumnas; j++) {
                this.canvaCtx.drawImage(this.imagenTablero, this.inicioTablero + (this.anchoCelda * j), this.inicioYTablero + (this.altoCelda * i), this.anchoCelda, this.altoCelda);
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

    getPosicionJ1(fila, columna) {
        const inicioX = (this.inicioTablero / 2) - (this.tamañoTotalFichas / 2) > 10 ?
            (this.inicioTablero / 2) - (this.tamañoTotalFichas / 2) :
            10;
        const posX = inicioX + ((columna) * this.anchoFichas);
        const posY = this.inicioYTablero + (fila * this.anchoFichas);
        return {
            posX,
            posY
        }
    }

    getPosicionJ2(fila, columna) {
        const tamañoFichasJ2 = (this.inicioTablero + this.anchoTablero) + (this.inicioTablero / 2);
        const inicioX = (tamañoFichasJ2) - (this.tamañoTotalFichas / 2);
        const posX = inicioX + ((columna + 1) * this.anchoFichas);
        const posY = this.inicioYTablero + (fila * this.anchoFichas);
        return {
            posX,
            posY
        }
    }

    inicializarFichasJ1() {
        let fila = 1;
        let columna = 0;
        let maxColumnas = 6;
        for (let fichaIndex = 1; fichaIndex <= this.totalFichasPorJugador; fichaIndex++) {
            const posiciones = this.getPosicionJ1(fila, columna);
            const ficha = new Ficha(posiciones, 1, this.canvaCtx, this.anchoFichas, this.fichaJUno);
            this.fichas.push(ficha);
            if (fichaIndex >= (fila * maxColumnas)) {
                fila++;
                columna = 0;
            } else columna++;
        }
    }

    inicializarFichasJ2() {
        let fila = 1;
        let columna = 0;
        for (let fichaIndex = 1; fichaIndex <= this.totalFichasPorJugador; fichaIndex++) {
            const posiciones = this.getPosicionJ2(fila, columna);
            const ficha = new Ficha(posiciones, 2, this.canvaCtx, this.anchoFichas, this.fichaJDos);
            this.fichas.push(ficha);
            if (fichaIndex >= (fila * this.maxColumnasFichas)) {
                fila++;
                columna = 0;
            } else columna++;
        }
    }

    moverFichas() {
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




    onMouseUp(e) {
        this.mouseDown = false;
        this.mouseMove = false;
        const columnaAInsertar = this.obtenerColumna({ posX: e.offsetX, posY: e.offsetY });
        if (columnaAInsertar === undefined || columnaAInsertar < 0 || this.juego.columnaLlena(columnaAInsertar)) {
            if (this.fichaSeleccionada !== null && this.fichaSeleccionada !== undefined) {
                const fichaSeleccionada = this.fichas[this.fichaSeleccionada];
                fichaSeleccionada.setPosicion(this.ultimaPosicionFicha);
                this.fichas[fichaSeleccionada] = fichaSeleccionada;
            }
            this.dibujarFondo();
        } else {
            if (columnaAInsertar !== undefined) {
                const posAInsertar = this.getPosAInsertar(columnaAInsertar);
                if (posAInsertar) {
                    const juegoTerminado = this.juego.juegoTerminado({ fila: posAInsertar.fila, columna: posAInsertar.columna });
                    this.tablero[posAInsertar.fila][posAInsertar.columna].ficha = posAInsertar.fichaAInsertar;
                    const turnoJugador = this.juego.getTurnoJugador() === 1 ? 2 : 1;
                    this.juego.setJugador(turnoJugador);
                    if (juegoTerminado) {
                        this.fichas = [];
                        this.inicializarTablero();
                    } else {
                        this.dibujarFondo();
                    }
                }
            }
        }
    }

    onMouseDown(event) {
        this.mouseDown = true;
        this.fichaSeleccionada = null;
        this.mouseMove = false;
        for (let i = 0; i < this.fichas.length; i++) {
            const ficha = this.fichas[i];

            if (ficha.estaSeleccionada({ mouseX: event.offsetX, mouseY: event.offsetY })) {
                if (ficha.getJugador() === this.juego.getTurnoJugador()) {
                    this.fichaSeleccionada = i;
                    this.ultimaPosicionFicha = ficha.getPosicion();
                    break;
                }
            }
        }

        if (this.fichaSeleccionada !== null && this.fichaSeleccionada !== undefined) {
            this.dibujarFondo();
        }

    }


    onMouseMove(event) {
        if (this.fichaSeleccionada !== null && this.mouseDown) {
            this.mouseMove = true;
            const ficha = this.fichas[this.fichaSeleccionada];
            ficha.setPosicion({ x: event.offsetX, y: event.offsetY })
            this.fichas[this.fichaSeleccionada] = ficha;
            this.dibujarFondo();
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
                if (this.fichaSeleccionada !== null && this.fichaSeleccionada !== undefined) {
                    const fichaAInsertar = this.fichas[this.fichaSeleccionada];
                    const posicionX = this.tablero[i][columna].posX;
                    const posicionY = this.tablero[i][columna].posY;
                    fichaAInsertar.setPosicion({ x: posicionX, y: posicionY });
                    this.fichas[this.fichaSeleccionada] = fichaAInsertar;
                    return { fila: i, columna: columna, fichaAInsertar };
                }
            }
        }
        return null;
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

    inicializarTimerJuego() {
        if (!this.timerJuego) {
            this.tiempoRestante = this.tiempoPorJuego;
            this.timerJuego = setInterval(() => {
                this.tiempoRestante--;
                console.log("tiempoRestante", this.tiempoRestante)
                if (this.tiempoRestante <= 0) this.terminarJuego();
                else this.dibujarFondo();
            }, 1000);
        }
    }

    obtenerTiempoRestanteFormateado() {
        let minutosRestantes = Math.floor(this.tiempoRestante / 60);
        let segundosRestantes = this.tiempoRestante - minutosRestantes * 60;
        if (minutosRestantes < 10) minutosRestantes = "0" + minutosRestantes;
        if (segundosRestantes < 10) segundosRestantes = "0" + (segundosRestantes);
        return {
            minutes: minutosRestantes, seconds: segundosRestantes
        }
    }

    terminarJuego() {
        this.canvaCtx.font = "30px Arial";
        this.canvaCtx.fillText("Se acabó el tiempo!", this.anchoTablero / 2, this.inicioYTablero);
        clearInterval(this.timerJuego);
        this.timerJuego = null;
        this.inicializarTimerJuego();
        this.dibujarFondo();
    }

    mostrarTiempo() {
        const tiempoRestanteFormateado = this.obtenerTiempoRestanteFormateado();
        this.canvaCtx.font = "30px Roboto";
        this.canvaCtx.fillStyle = "black";
        this.canvaCtx.fillText(`${tiempoRestanteFormateado.minutes}:${tiempoRestanteFormateado.seconds}`, this.anchoCanvas / 2 - 40, 45);
    }
}