"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const boardCanvas = document.querySelector("#board");
    const contenedorCanvas = document.querySelector("#contenedor-board");

    const modal = document.querySelector("#modal-cuatroenlinea");
    const ModalfichasIguales = document.querySelector("#ModalfichasIguales");
        const contenedorInicio = document.querySelector("#contenedor-inicio");
    const buttoncomenzar = document.querySelector("#btn-comenzar");
    const buttonStart = document.querySelector("#Start-button");
    const buttonrestart = document.querySelector('#btn-reiniciar');

    const boardCtx = boardCanvas.getContext("2d");

    const altoCanvas = boardCanvas.clientHeight;
    const anchoCelda = 40;
    const altoCelda = 40;
    const anchoCanvas = boardCanvas.clientWidth;
    let tipoJuego = 4;
    let NombreJugador1 = "Jugador 1";
    let NombreJugador2 = "Jugador 2";
    let tablero = null;


    //al hacer click en el btn comenzar se abre el modal para elegir las opciones de juego
    buttoncomenzar.addEventListener('click', () => {
        modal.style.visibility = "visible";
        contenedorInicio.style.display = "none";
    })

    buttonStart.addEventListener('click', () => {
        if(checkFichaDistintas()== false){
        NombreJugador1 = String(document.getElementById("POneName").value) ;
        NombreJugador2 = String(document.getElementById("PTwoName").value) ;
        tipoDeJuegoSeleccionado();
        contenedorCanvas.style.display = "flex";
        buttonrestart.style.visibility = "visible";
        modal.style.visibility = "hidden";
        setTimeout(inicializarJuego,3500);
        
        }else{
            ModalfichasIguales.style.visibility="visible";
            
            setTimeout(hiddenModal, 1000); 

        }
    })


    //reinicia el juego permitiendo elegir nuevas opciones
    buttonrestart.addEventListener('click', () => {
        modal.style.visibility = "visible";
        //contenedorCanvas.style.display = "flex";
    })


    /**
     * Inicializa el juego segun los parametros usados por el jugador
     */
    function inicializarJuego() {
        
        if (!tablero) {
            tablero = new Tablero({
                canvaCtx: boardCtx,
                anchoCanvas: anchoCanvas,
                altoCanvas,
                elementoCanva: boardCanvas,
            }, tipoJuego, anchoCelda, altoCelda, fichaSelecionJuno(), fichaSelecionJdos(),NombreJugador1,NombreJugador2);
            tablero.test();
        } else {
            tablero.setFichaJ1(fichaSelecionJuno());
            tablero.setFichaJ2(fichaSelecionJdos());
            tablero.setTipoJuego(tipoJuego);
        }
        tablero.inicializarTablero();

    }

    /**
     * Determina la ficha que eligio el jugador 1
     * @returns {string}
     */
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

    /**
     * Determina la ficha que eligio el jugador 2
     * @returns {string}
     */
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
    /**
     * comprueba si se han elegido las mismas fichas
     * @returns {boolean}
     */
    function checkFichaDistintas(){
        if(fichaSelecionJuno() == fichaSelecionJdos()){       
            return true
        }
        else{
        return false
    }

    }
    /**
     * Define el tipo de juego (4,5,6,7 en linea)
     * @return {int}
     */
    function tipoDeJuegoSeleccionado() {
        let tipoDeJuegoSeleccionado = document.tipoDeJuegoform
        let fichaseleccionada = "";
        for (let i = 0; i < tipoDeJuegoSeleccionado.length; i++) {
            console.log(tipoDeJuegoSeleccionado[i]);
            if(tipoDeJuegoSeleccionado[i].checked){
                switch(tipoDeJuegoSeleccionado[i].value){
                    case "4":
                    tipoJuego = 4;
                    break
                    case "5":
                    tipoJuego = 5;
                    break
                    case "6":
                    tipoJuego = 6;
                    break
                    case "7":
                    tipoJuego = 7;
                    break
                }
            }
        }
    }
    /**
     * Esconde el modal de fichas iguales
     */
    function hiddenModal(){
        ModalfichasIguales.style.visibility ="hidden"
    }

})
