class Tablero {

    constructor({ canvaCtx, altoCanvas, anchoCanvas, elementoCanva }, tipoJuego, anchoCelda, altoCelda, fichaJUno, fichaJDos, nombreJ1, nombreJ2) {
        this.canvaCtx = canvaCtx;
        this.tablero = [];
        this.fichas = [];
        this.tipoJuego = tipoJuego;
        this.altoCelda = altoCelda;
        this.anchoCelda = anchoCelda;
        this.anchoCanvas = anchoCanvas;
        this.calcularTamañoTablero();
        this.mouseDown = false;
        this.anchoFichas = anchoCelda;
        this.elementoCanva = elementoCanva;
        this.fichasNecesarias = tipoJuego;
        this.altoCanvas = altoCanvas;
        this.mouseMove = false;
        this.maxColumnasFichas = 6;
        this.fichaSeleccionada = null;
        this.flechasTablero = [];
        this.ultimaPosicionFicha = null;
        this.tamañoTotalFichas = this.maxColumnasFichas * this.anchoFichas;
        this.fichaJUno = fichaJUno;
        this.fichaJDos = fichaJDos;
        this.nombreJ1 = nombreJ1;
        this.nombreJ2 = nombreJ2;
        this.tiempoRestante = this.tiempoPorJuego;
        this.timerJuego = null;
        this.moverFichas();
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
        this.juegoTerminado = false;
    }

    setFichaJ1(tipoFicha) {
        this.fichaJUno = tipoFicha;
    }

    setFichaJ2(tipoFicha) {
        this.fichaJDos = tipoFicha;
    }

    setNombreJ1(nombre) {
        this.nombreJ1 = nombre;
    }


    setNombreJ2(nombre) {
        this.nombreJ2 = nombre;
    }

    setTipoJuego(tipoJuego) {
        this.tipoJuego = tipoJuego;
    }

    /**
     * Calcula el tamaño de las filas y columnas en base al tipo de juego
     */
    calcularTamañoTablero() {
        switch (this.tipoJuego) {
            case 4:
                this.maxFilas = 6;
                this.maxColumnas = 7;
                break;
            case 5:
                this.maxFilas = 7;
                this.maxColumnas = 8;
                break;
            case 6:
                this.maxFilas = 8;
                this.maxColumnas = 9;
                break;
            case 7:
                this.maxFilas = 9;
                this.maxColumnas = 10;
                break;
            default:
                this.maxFilas = 6;
                this.maxColumnas = 7;
                break;
        }
        this.anchoTablero = this.anchoCelda * this.maxColumnas;
        this.altoTablero = this.altoCelda * this.maxFilas;
        this.inicioTablero = (this.anchoCanvas / 2) - (this.anchoTablero / 2);
        // El inicio del tablero en el eje Y cambia si es de 4 o 5 en linea para que quede mejor distrubuido en el canvas
        this.inicioYTablero = this.tipoJuego === 4 || this.tipoJuego === 5 ? (this.altoCanvas / 2) - (this.altoTablero / 2) + 25
            : this.altoCanvas - this.altoTablero - 25;
        this.totalFichasPorJugador = (this.maxFilas * this.maxColumnas) / 2;
        this.fichasNecesarias = this.tipoJuego;
        this.juego = new Juego(this.tablero, this.maxFilas, this.maxColumnas, this.fichasNecesarias, 1);
        this.tiempoPorJuego = this.juego.getTiempoPorJuego();

    }

    /**
     * Inicializa todas las posiciones del tablero (posX y posY del canvas y la ficha en nulo)
     */
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

    /**
     * Inicializa el tablero completo
     */
    inicializarTablero() {
        setTimeout(() => {
            this.tablero = [];
            this.calcularTamañoTablero();
            this.juegoTerminado = false;
            this.fichas = [];
            this.juego.setTablero(this.tablero);
            clearInterval(this.timerJuego);
            this.timerJuego = null;
            this.inicializarTimerJuego();
            this.juego.setTurnoJugador(1);
            this.inicializarPosiciones();
            this.inicializarFichas();
            this.dibujarFondo();
        }, 200)
    }

    /**
     * Inicializa el estado del juego
     */
    inicializarEstado() {
        this.flechasTablero = [];
        this.dibujarTablero();
        this.dibujarFlechas();
        this.dibujarFichas();
        this.mostrarTiempo();
        this.mostrarTurnoJugador();
    }

    /**
     * Dibuja el fondo del canvas y luego inicializa el estado del juego
     */
    dibujarFondo() {
        this.canvaCtx.clearRect(0, 0, this.anchoCanvas, this.altoCanvas);
        this.canvaCtx.drawImage(this.backgroundImage, 0, 0, this.anchoCanvas, this.altoCanvas);
        this.inicializarEstado();
    }

    /**
     * Dibuja el tablero del X en linea
     */
    dibujarTablero() {
        for (let i = 0; i < this.maxFilas; i++) {
            for (let j = 0; j < this.maxColumnas; j++) {
                this.canvaCtx.drawImage(this.imagenTablero, this.inicioTablero + (this.anchoCelda * j), this.inicioYTablero + (this.altoCelda * i), this.anchoCelda, this.altoCelda);
            }
        }
    }

    /**
     * Dibuja las flechas apuntadoras de cada columna
     */
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

    /**
     * Inicializa las fichas de cada jugador
     */
    inicializarFichas() {
        this.inicializarFichasJ1();
        this.inicializarFichasJ2();
    }

    /**
     * Obtiene las posiciones de la ficha del jugador 1
     * @param {number} fila fila donde esta la ficha
     * @param {number} columna columna donde esta la ficha
     * @returns {posX, posY} posiciones del jugador 1
     */
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

    /**
     * Obtiene las posiciones de la ficha del jugador 2
     * @param {number} fila fila donde esta la ficha
     * @param {number} columna columna donde esta la ficha
     * @returns {posX, posY} posiciones del jugador 2
    */
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

    /**
     * Inicializa todas las fichas del jugador 1
     */
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

    /**
    * Inicializa todas las fichas del jugador 2
    */
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

    /**
     * Maneja los eventos del mouse
     */
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

    /**
     * Maneja el evento "onmouseup"
     * @param {Event} e 
     */
    onMouseUp(e) {
        this.mouseDown = false;
        this.mouseMove = false;
        if (!this.juegoTerminado) {
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
                        const empate = this.juego.tableroCompleto();
                        if (juegoTerminado || empate) {
                            this.juegoTerminado = true;
                            this.dibujarFondo();
                            this.mostrarResultado(empate);
                            clearInterval(this.timerJuego);
                        } else {
                            const turnoJugador = this.juego.getTurnoJugador() === 1 ? 2 : 1;
                            this.juego.setTurnoJugador(turnoJugador);
                            this.dibujarFondo();
                        }
                    }
                }
            }
        }
    }

    /**
     * Muestra el resultado final en el canvas
     * @param {boolean} empate termino en empate?
     */
    mostrarResultado(empate = false) {
        let mensaje = '';
        let posX = this.inicioTablero + 80;
        if (empate) {
            posX += 50;
            mensaje = "Empate!";
        }
        else if (this.juego.getTurnoJugador() == 1) { mensaje = `Ganó ${this.nombreJ1}!`; }
        else { mensaje = `Ganó ${this.nombreJ2}!`; }
        this.canvaCtx.fillStyle = "rgba(1, 1, 1, 0.70)";
        this.canvaCtx.fillRect(0, (this.altoCanvas / 2) - 50, this.anchoCanvas, 100);
        this.canvaCtx.font = "30px Roboto";
        this.canvaCtx.fillStyle = "white";
        this.canvaCtx.fillText(mensaje, posX, (this.altoCanvas / 2) + 10);
    }

    /**
     * Maneja el evento "onmousedown"
     * @param {Event} event 
     */
    onMouseDown(event) {
        this.mouseDown = true;
        this.fichaSeleccionada = null;
        this.mouseMove = false;
        if (!this.juegoTerminado) {
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
    }

    /**
    * Maneja el evento "onMouseMove"
    * @param {Event} event 
    */
    onMouseMove(event) {
        if (this.fichaSeleccionada !== null && this.mouseDown) {
            this.mouseMove = true;
            const ficha = this.fichas[this.fichaSeleccionada];
            ficha.setPosicion({ x: event.offsetX, y: event.offsetY })
            this.fichas[this.fichaSeleccionada] = ficha;
            this.dibujarFondo();
        }
    }

    /**
     * Dibuja todas las fichas en el tablero
     */
    dibujarFichas() {
        for (let i = 0; i < this.fichas.length; i++) {
            const fichaActual = this.fichas[i];
            fichaActual.dibujarFicha();
        }
    }

    /**
     * Obtiene la posicion de la ficha a insertar en el tablero
     * @param {number} columna columna a buscar
     * @returns {fila, columna, fichaAInsertar}
     */
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


    /**
     * Obtiene la columna en base a la posicion del mouse
     * @param {{posX, posY}} {posX, posY} posiciones del mouse
     * @returns 
     */
    obtenerColumna({ posX, posY }) {
        for (let i = 0; i < this.flechasTablero.length; i++) {
            const flecha = this.flechasTablero[i];
            if ((posX >= flecha.posXInicio && posX <= flecha.posXFinal) && (posY >= (flecha.posYInicio - 20) && posY <= flecha.posYFinal + 10)) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Inicializa el timer del juego
     */
    inicializarTimerJuego() {
        if (!this.timerJuego) {
            this.tiempoRestante = this.tiempoPorJuego;
            this.timerJuego = setInterval(() => {
                this.tiempoRestante--;
                if (this.tiempoRestante <= 0) this.terminarJuego();
                else this.dibujarFondo();
            }, 1000);
        }
    }

    /**
     * Obtiene el tiempo a mostrar
     * @returns {minutos, segundos}
     */
    obtenerTiempoRestanteFormateado() {
        let minutosRestantes = Math.floor(this.tiempoRestante / 60);
        let segundosRestantes = this.tiempoRestante - minutosRestantes * 60;
        if (minutosRestantes < 10) minutosRestantes = "0" + minutosRestantes;
        if (segundosRestantes < 10) segundosRestantes = "0" + (segundosRestantes);
        return {
            minutos: minutosRestantes, segundos: segundosRestantes
        }
    }

    /**
     * Termina el juego si se acabo el tiempo de juego
     */
    terminarJuego() {
        this.canvaCtx.fillStyle = "rgba(1, 1, 1, 0.70)";
        this.canvaCtx.fillRect(0, (this.altoCanvas / 2) - 50, this.anchoCanvas, 100);
        this.canvaCtx.font = "30px Roboto";
        this.canvaCtx.fillStyle = "white";
        this.canvaCtx.fillText("Se acabó el tiempo!", this.inicioTablero + 20, (this.altoCanvas / 2) + 10);
        clearInterval(this.timerJuego);
        this.timerJuego = null;
        this.juegoTerminado = true;
    }

    /**
     * Muestra el tiempo restante en el canvas
     */
    mostrarTiempo() {
        if (this.timerJuego) {
            const tiempoRestanteFormateado = this.obtenerTiempoRestanteFormateado();
            this.canvaCtx.font = "30px Roboto";
            this.canvaCtx.fillStyle = "black";
            this.canvaCtx.fillText(`${tiempoRestanteFormateado.minutos}:${tiempoRestanteFormateado.segundos}`, this.anchoCanvas / 2 - 40, 45);
        }
    }


    /**
     * Muestra el turno de cada jugador en el canvas
     */
    mostrarTurnoJugador() {
        if (this.juego.getTurnoJugador() == 1) {
            this.canvaCtx.font = "25px Roboto";
            this.canvaCtx.fillStyle = "#236467";
            this.canvaCtx.fillText(`Turno ${this.nombreJ1}`, 50, 45);
        }
        else {
            this.canvaCtx.font = "25px Roboto";
            this.canvaCtx.fillStyle = "#236467";
            this.canvaCtx.fillText(`Turno ${this.nombreJ2}`, this.anchoCanvas - 225, 45);
        }
    }
}