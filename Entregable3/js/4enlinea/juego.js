class Juego {

    constructor(tablero, maxFilas, maxColumnas, fichasNecesarias, turnoJugador) {
        this.tablero = tablero;
        this.maxFilas = maxFilas;
        this.maxColumnas = maxColumnas;
        this.fichasNecesarias = fichasNecesarias;
        this.turnoJugador = turnoJugador;
        this.timeoutGeneral = 300;
    }

    setTurnoJugador(turnoJugador) {
        this.turnoJugador = turnoJugador;
    }

    setTablero(tablero) {
        this.tablero = tablero;
    }

    getTurnoJugador() {
        return this.turnoJugador;
    }

    getTiempoPorJuego() {
        return this.timeoutGeneral;
    }

    /**
     * Determina si el juego está terminado según la fila y columna seleccionada
     * @param {{fila, columna}} posiciones 
     * @returns 
     */
    juegoTerminado({ fila, columna }) {
        const chequearVertical = this.chequearVertical({ fila, columna });
        const chequearHorizontal = this.chequearHorizontal({ fila, columna });
        const chequearDiagonal = this.chequearDiagonal({ fila, columna });

        return (chequearVertical || chequearHorizontal || chequearDiagonal);

    }


    /**
     * Chequea si se el jugador ganó por hacer vertical en el tablero
     * @param {fila, columna} posiciones 
     * @returns 
     */
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

    /**
     * Chequea si se el jugador ganó por hacer horizontal en el tablero
     * @param {fila, columna} posiciones 
     * @returns 
     */
    chequearHorizontal({ fila, columna }) {
        const contadorHorizontalIzq = this.contadorIzquierdaHorizontal({ fila, columna });
        const contadorHorizontalDer = this.contadorDerechaHorizontal({ fila, columna });
        return contadorHorizontalIzq + contadorHorizontalDer >= this.fichasNecesarias;
    }

    /**
     * Devuelve la cantidad de fichas horizontales y a la derecha iguales consecutivas a la del jugador 
     * @param {fila, columna} posiciones 
     * @returns 
     */
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

    /**
   * Devuelve la cantidad de fichas horizontales y a la izquierda iguales consecutivas a la del jugador 
   * @param {fila, columna} posiciones 
   * @returns 
   */
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

    /**
    * Chequea si el jugador ganó por alguna de las diagonales 
    * @param {fila, columna} posiciones 
    * @returns 
    */
    chequearDiagonal({ fila, columna }) {
        const contadorDiagonalIzquierdaInferior = this.contadorDiagonalIzquierdaInferior({ fila, columna });
        const contadorDiagonalDerechaSuperior = this.contadorDiagonalDerechaSuperior({ fila, columna });

        const contadorDiagonalDerechaInferior = this.contadorDiagonalDerechaInferior({ fila, columna });
        const contadorDiagonalIzquierdaSuperior = this.contadorDiagonalIzquierdaSuperior({ fila, columna });

        return (contadorDiagonalDerechaInferior + contadorDiagonalIzquierdaSuperior >= this.fichasNecesarias) ||
            (contadorDiagonalIzquierdaInferior + contadorDiagonalDerechaSuperior >= this.fichasNecesarias);
    }

    /**
     * Devuelve la cantidad de fichas diagonales y a la derecha superior iguales consecutivas a la del jugador 
     * @param {fila, columna} posiciones 
     * @returns 
     */
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

    /**
    * Devuelve la cantidad de fichas diagonales y a la izquierda superior iguales consecutivas a la del jugador 
    * @param {fila, columna} posiciones 
    * @returns 
    */
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

    /**
    * Devuelve la cantidad de fichas diagonales y a la izquierda inferior iguales consecutivas a la del jugador 
    * @param {fila, columna} posiciones 
    * @returns 
    */
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

    /**
    * Devuelve la cantidad de fichas diagonales y a la derecha inferior iguales consecutivas a la del jugador 
    * @param {fila, columna} posiciones 
    * @returns 
    */
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

    /**
    * Determina si la columna esta llena en el tablero
     * @param {number} columnaAInsertar 
    * @returns 
     */
    columnaLlena(columnaAInsertar) {
        for (let fila = 0; fila < this.maxFilas; fila++) {
            if (!this.tablero[fila][columnaAInsertar].ficha) return false;
        }
        return true;
    }

    /**
     * Determina si el tablero esta lleno de fichas
     * @returns {boolean}
     */
    tableroCompleto() {
        for (let fila = 0; fila < this.maxFilas; fila++)
            for (let columna = 0; columna < this.maxColumnas; columna++) {
                if (!this.tablero[fila][columna].ficha)
                    return false;
            }
        return true;
    }
}