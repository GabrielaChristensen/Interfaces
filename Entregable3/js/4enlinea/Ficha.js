"use strict";

class Ficha {
    constructor({ posX, posY }, jugador, canvaCtx, tamañoFicha) {
        this.posX = posX;
        this.posY = posY;
        this.jugador = jugador;
        this.imagenCargada = false;
        this.tamañoFicha = tamañoFicha;
        this.canvaCtx = canvaCtx;

    }

    dibujarFicha() {
        this.imagenFicha = new Image();

        // this.canvaCtx.beginPath();
        // this.canvaCtx.arc(this.posX + this.tamañoFicha / 2, this.tamañoFicha + this.tamañoFicha / 2, this.tamañoFicha / 2, 0, Math.PI * 2);
        // this.canvaCtx.closePath();
        if (this.jugador === 1) {
            this.imagenFicha.src = "images/4enlinea/Ficha-brujula.png";
        } else {
            this.imagenFicha.src = "images/4enlinea/Ficha-calavera.png";
        }
        if (!this.imagenCargada)
            this.imagenFicha.onload = () => {
                this.imagenCargada = true;
                this.canvaCtx.drawImage(this.imagenFicha, this.posX - (this.tamañoFicha / 2), this.posY - (this.tamañoFicha / 2), this.tamañoFicha, this.tamañoFicha);
                this.canvaCtx.closePath();
            }
        else {
            this.canvaCtx.drawImage(this.imagenFicha, this.posX - (this.tamañoFicha / 2), this.posY - (this.tamañoFicha / 2), this.tamañoFicha, this.tamañoFicha);
            this.canvaCtx.closePath();
        }
    }


    setPosicion({ x, y }) {
        this.posX = x;
        this.posY = y;
    }

    getPosicion() {
        return {
            x: this.posX,
            y: this.posY
        }
    }

    estaSeleccionada({ mouseX, mouseY }) {
        let _x = this.posX - mouseX;
        let _y = this.posY - mouseY;
        let sqrt = Math.sqrt(_x * _x + _y * _y);
        return sqrt < (this.tamañoFicha / 2);
    }

    getJugador() {
        return this.jugador;
    }


}