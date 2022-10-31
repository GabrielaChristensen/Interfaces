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
        this.altoCelda = altoCelda;
        this.anchoCelda = anchoCelda;
        this.altoCanvas = altoCanvas;
        this.imagenFondoCargada = false;
        this.eventosMouseUsado = false;
        this.anchoCanvas = anchoCanvas;
        this.fichaSeleccionada = null;
        this.tableroCargado = false;
        this.flechasTablero = [];
        this.juego = new Juego(this.tablero, this.maxFilas, this.maxColumnas, this.fichasNecesarias, 1);
        this.moverFichas();

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


    dibujarFondo() {
        const backgroundImage = new Image();
        backgroundImage.src = "images/4enlinea/fondo-playa.png";
        if (!this.imagenFondoCargada)
            backgroundImage.onload = () => {
                this.canvaCtx.drawImage(backgroundImage, 0, 0, this.anchoCanvas, this.altoCanvas);
                this.imagenFondoCargada = true;
                this.dibujarTablero();
                this.dibujarFlechas();
                this.dibujarFichas();
            }
        else {
            this.canvaCtx.drawImage(backgroundImage, 0, 0, this.anchoCanvas, this.altoCanvas);
            this.dibujarTablero();
            this.dibujarFlechas();
            this.dibujarFichas();
        }
    }

    dibujarTablero() {
        this.imagenTablero = new Image();
        this.imagenTablero.src = 'images/4enlinea/celda.png';
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
        const columnaAInsertar = this.obtenerColumna({ posX: e.offsetX, posY: e.offsetY });
        if (columnaAInsertar === undefined || columnaAInsertar < 0 || this.juego.columnaLlena(columnaAInsertar)) {
            if (this.fichaSeleccionada) {
                const fichaSeleccionada = this.fichas[this.fichaSeleccionada];
                const posiciones = this.juego.getTurnoJugador() === 1 ? this.getPosicionRandomJ1() : this.getPosicionRandomJ2();
                fichaSeleccionada.setPosicion({ x: posiciones.posX, y: posiciones.posY });
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
        for (let i = 0; i < this.fichas.length; i++) {
            const ficha = this.fichas[i];

            if (ficha.estaSeleccionada({ mouseX: event.offsetX, mouseY: event.offsetY })) {
                if (ficha.getJugador() === this.juego.getTurnoJugador()) {
                    this.fichaSeleccionada = i;
                    break;
                }
            }
        }

        if (this.fichaSeleccionada) {
            this.dibujarFondo();
        }

    }


    onMouseMove(event) {
        if (this.fichaSeleccionada !== null && this.mouseDown) {
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
                if (this.fichaSeleccionada) {
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

}