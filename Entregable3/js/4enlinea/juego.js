class Juego {

    constructor(tablero, maxFilas, maxColumnas, fichasNecesarias, turnoJugador) {
        this.tablero = tablero;
        this.maxFilas = maxFilas;
        this.maxColumnas = maxColumnas;
        this.fichasNecesarias = fichasNecesarias;
        this.turnoJugador = turnoJugador;
    }

    setJugador(turnoJugador) {
        this.turnoJugador = turnoJugador;
    }

    setTablero(tablero) {
        this.tablero = tablero;
    }

    getTurnoJugador() {
        return this.turnoJugador;
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


    columnaLlena(columnaAInsertar) {
        for (let fila = 0; fila < this.maxFilas; fila++) {
            if (!this.tablero[fila][columnaAInsertar].ficha) return false;
        }
        return true;
    }
}