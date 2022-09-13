


const seccionAtaque = document.getElementById("seleccionar-ataque");
const btnReinicarHidden = document.getElementById("btn-reiniciar");
const botonMascotaJugador = document.getElementById("btn-mascota");

const btnReiniciar = document.getElementById("btn-reiniciar");
const contenedorDeAtaques = document.getElementById('contenedor-de-ataques')

//Seleccionar mascota jugador
const seccionSeleccionarMascota = document.getElementById(
    "seleccionar-mascota"
);
const spanNmascotaJugador = document.getElementById("nMascota-jugador");


//seleccionar mascota enemigo
const spanNmascotaEnemigo = document.getElementById("nMascota-enemigo");

//combate
const spanVidasJugador = document.getElementById("vida-jugador");
const spanVidasEnemigo = document.getElementById("vida-enemigo");

//crear mensaje
const seccionMensajes = document.getElementById("result"); // <- es el id del resultado
const ADelJugador = document.getElementById("ataque-del-jugador");
const ADelEnemigo = document.getElementById("ataque-del-enemigo");

// mapa con canvas
const seccionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')


//crear mensaje final
//let seccionMensajes = document.getElementById("result"); <- se llama en la funcion de mensaje final

let inputRatigueya
let inputHipodoge
let inputCapipepo

let mascotaJugador
let ataquesMokepon

let btnFuego
let btnAgua
let btnTierra

let arrayBotones = []
//let ataqueMascotaJugador = []

let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0

let ataqueJugador = [];
let ataqueEnemigo = [];
let vidasJugador = 3;
let vidasEnemigo = 3;

// canvas
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "/images/mapamoke.png"
let mascotaJugadorObjeto
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

// clase Mascota------------------------------------------
let mokepones = [];
//clase mokepon
class Mokepon {
    constructor(nombre, foto, vida, avatarMascota, x = 10, y = 10) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 40
        this.alto = 40
        this.x = numneroAleatorio(0, mapa.width - this.ancho)
        this.y = numneroAleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = avatarMascota
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto

        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "images/img2.png", 7, "/images/hipodoge.png");
hipodoge.ataques.push(
    { nombre: "💧", id: "btn-agua" },
    { nombre: "💧", id: "btn-agua" },
    { nombre: "💧", id: "btn-agua" },
    { nombre: "🔥", id: "btn-fuego" },
    { nombre: "🌱", id: "btn-tierra " }
);

let capipepo = new Mokepon("Capipepo", "images/img3.png", 3, "/images/capipepo.png");

capipepo.ataques.push(
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "🔥", id: "btn-fuego" },
    { nombre: "💧", id: "btn-agua " }
);

let ratigueya = new Mokepon("Ratigueya", "images/img1.png", 3, "/images/ratigueya.png");

ratigueya.ataques.push(
    { nombre: "🔥", id: "btn-fuego" },
    { nombre: "🔥", id: "btn-fuego" },
    { nombre: "🔥", id: "btn-fuego" },
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "💧", id: "btn-agua " }

);

// enemigos

let ratigueyaEnemigo = new Mokepon("Ratigueya", "images/img1.png", 5, "/images/ratigueya.png", 200, 190);
let hipodogeEnemigo = new Mokepon("Hipodoge", "images/img2.png", 5, "/images/hipodoge.png", 80, 120);
let capipepoEnemigo = new Mokepon("Capipepo", "images/img3.png", 5, "/images/capipepo.png", 150, 95);
ratigueyaEnemigo.ataques.push(
    { nombre: "🔥", id: "btn-fuego" },
    { nombre: "🔥", id: "btn-fuego" },
    { nombre: "🔥", id: "btn-fuego" },
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "💧", id: "btn-agua " }
);
hipodogeEnemigo.ataques.push(
    { nombre: "💧", id: "btn-agua" },
    { nombre: "💧", id: "btn-agua" },
    { nombre: "💧", id: "btn-agua" },
    { nombre: "🔥", id: "btn-fuego" },
    { nombre: "🌱", id: "btn-tierra " }
);
capipepoEnemigo.ataques.push(
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "🌱", id: "btn-tierra" },
    { nombre: "🔥", id: "btn-fuego" },
    { nombre: "💧", id: "btn-agua " }
);

//--------------------------------------------

let mascotaElegida = []




//contenedor de mokepones
const contenedorMokepones = document.getElementById("contenedor-tarjetas");

//opciones de mokepones
let opcionesDeMokepones;

mokepones.push(ratigueya, hipodoge, capipepo);

//esconder la seccion de ataque
seccionAtaque.style.display = "none";

seccionVerMapa.style.display = 'none'

//console.log(mokepones);
//injectamos codigo al html y despues apuntamos a los ids
mokepones.forEach((mokepon) => {
    opcionesDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
  <label class="tarjeta-mokepon" for=${mokepon.nombre}>
    <p>${mokepon.nombre}</p>
    <img src=${mokepon.foto} alt=${mokepon.nombre} />
  </label>  `;
    contenedorMokepones.innerHTML += opcionesDeMokepones;

    inputRatigueya = document.getElementById('Ratigueya')
    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    //console.log(inputRatigueya);

});



btnReinicarHidden.style.display = "none";
// aqui se dispara la funcion cuando le picamod al boton "seleccionar"
botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

unirseAlJuego()



// hasta este punto no existe estos botones en el html
/* btnFuego.addEventListener("click", ataqueFuego);

btnAgua.addEventListener("click", ataqueAgua);

btnTierra.addEventListener("click", ataqueTierra); */

btnReiniciar.addEventListener("click", reiniciar);

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            //console.log(res);
            if (res.ok) {
                res.text() //<- lo convierte en tipo texto, pro si quisieramos un JSON pones json()
                    .then(function (respuesta) {
                        console.log(respuesta);
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    // deshabilitar la seccion de "seleccionar mascota"

    seccionSeleccionarMascota.style.display = "none";

    //habilitar el display de la seccion selecciona ataque
    //seccionAtaque.style.display = "flex"; <- lo dejamos comentado pr el momento

    // seccion ver mapa con canvas




    // sacamos la referencia id desde el html "hipodoge" para añadir ese nombre en la seccion de ataque
    // una forma de hacer

    if (inputRatigueya.checked) {
        console.log(inputRatigueya);
        spanNmascotaJugador.innerHTML = inputRatigueya.id; //<- es de tipo objeto
        mascotaJugador = inputRatigueya.id


    } else if (inputHipodoge.checked) {
        //otra forma de sacar el id "del span" y añadirla en el html con el nombre de la mascota seleccioanda
        spanNmascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanNmascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id
    } else {
        alert("Elige una mascota");
    }

    //extraer ataques
    extraerAtaques(mascotaJugador)

    seccionVerMapa.style.display = 'flex'

    iniciarMapa()

    // Selecciona mascota del ataque alaeatorio
    //seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
    let ataquesM
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataquesM = mokepones[i].ataques
        }
    }
    //console.log(ataquesM);
    mosrtarAtaques(ataquesM)

}

function mosrtarAtaques(ataquesM) {
    ataquesM.forEach((ataque) => {
        ataquesMokepon = `
        <button  id=${ataque.id} class="btn-de-ataque btn-ataque" >${ataque.nombre}</button>
        `

        contenedorDeAtaques.innerHTML += ataquesMokepon
    })

    btnFuego = document.getElementById('btn-fuego')
    btnAgua = document.getElementById('btn-agua')
    btnTierra = document.getElementById('btn-tierra')

    arrayBotones = document.querySelectorAll('.btn-ataque') //<- trae todo lo que tengo la clase y todas sus etiquetas

    //console.log(arrayBotones)

    //hasta este punto ya existe los ids de los sigioentes botones

    /*  btnFuego.addEventListener("click", ataqueFuego);
 
     btnAgua.addEventListener("click", ataqueAgua);
 
     btnTierra.addEventListener("click", ataqueTierra); */
}

function secuenciaAtaque() {
    // validar los botones
    arrayBotones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            //console.log(e);
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '🌱') {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
                boton.disabled = true
            }

            ataqueAleatorioEnemigo()

        })
    })
}


function seleccionarMascotaEnemigo(enemigo) {
    // Selecciona mascota del ataque alaeatorio
    //let mascotaAleatorio = numneroAleatorio(0, mokepones.length - 1);

    /* if (mascotaAleatorio == 1) {
        spanNmascotaEnemigo.innerHTML = "Ratigueya";
    } else if (mascotaAleatorio == 2) {
        spanNmascotaEnemigo.innerHTML = "Capipepo";
    } else if (mascotaAleatorio == 3) {
        spanNmascotaEnemigo.innerHTML = "Hipodoge";
    } */

    //optimizando
    spanNmascotaEnemigo.innerHTML = enemigo.nombre
    //ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    ataquesMokeponEnemigo = enemigo.ataques
    console.log(enemigo.nombre);
    secuenciaAtaque()
}

function numneroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// funcion aque agua
/* function ataqueFuego() {
    ataqueJugador = "FUEGO";
    ataqueAleatorioEnemigo();
    //alert(ataqueJugador)
}

function ataqueAgua() {
    ataqueJugador = "AGUA";
    ataqueAleatorioEnemigo();
    //alert(ataqueJugador)
}

function ataqueTierra() {
    ataqueJugador = "TIERRA";
    ataqueAleatorioEnemigo();
    //alert(ataqueJugador)
} */

function ataqueAleatorioEnemigo() {
    //console.log("araques enemigo", );
    let ataqueAleatorio = numneroAleatorio(0, ataquesMokeponEnemigo.length - 1);
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO');
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA');
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo.push('TIERRA');
    }
    console.log(ataqueEnemigo)

    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }

    //array jugador

}

function ambosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate() {
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            ambosOponentes(i, i)
            crearMensaje("empate");
        } else if (
            (ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA") ||
            (ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO") ||
            (ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA")
        ) {
            ambosOponentes(i, i)
            crearMensaje("ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador

        } else {
            ambosOponentes(i, i)
            crearMensaje('Perdiste')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }

        /* if (ataqueJugador == ataqueEnemigo) {
            crearMensaje("empate");
        } else if (
            (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") ||
            (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") ||
            (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA")
        ) {
            crearMensaje("ganste");
            vidasEnemigo--;
            spanVidasEnemigo.innerHTML = vidasEnemigo;
        } else {
            crearMensaje("perdiste");
            vidasJugador--;
            spanVidasJugador.innerHTML = vidasJugador;
        } */
        revisarVictorias();
    }

    function crearMensaje(resultado) {
        //añadir mensajes desde el js

        let nuevoAtaqueDelJugador = document.createElement("p");
        let nuevoAtaqueDelEnemigo = document.createElement("p");

        seccionMensajes.innerHTML = resultado;
        nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
        nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

        ADelJugador.appendChild(nuevoAtaqueDelJugador);
        ADelEnemigo.appendChild(nuevoAtaqueDelEnemigo);

        //let parrafo = document.createElement("p");
        /*parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + 
        ", la mascota del enemigo atacó con " +
          ataqueEnemigo +
          " - " +
          resultado;*/
    }
    function revisarVictorias() {
        if (victoriasJugador == victoriasEnemigo) {
            crearMensajeFinal("Esto fue un empate");
        } else if (victoriasJugador > victoriasEnemigo) {
            crearMensajeFinal('Felicitaciones Ganaste!!');
        } else {
            crearMensajeFinal('Perdiste');
        }
    }

    function crearMensajeFinal(mesanjeFinal) {
        seccionMensajes.innerHTML = mesanjeFinal;

        //seccionMensajes.appendChild(parrafo); <- cuando se añade un parrafo, no se hace un appendChild

        /* btnFuego.disabled = true;

        btnAgua.disabled = true;

        btnTierra.disabled = true; */

        btnReinicarHidden.style.display = "block";
    }

}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height) //<- hace que se pinte una sola ves cuando movemos el personajes
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    ratigueyaEnemigo.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }

}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function accionMovimiento(evento) {
    //console.log(evento.key);
    switch (evento.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break;
    }
}

function iniciarMapa() {
    mapa.width = 320
    mapa.height = 240
    //console.log(mascotaJugador);
    mascotaJugadorObjeto = getObjetoMascota(mascotaJugador)
    //console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)

    //usando el teclado para mover al personaje
    window.addEventListener('keydown', accionMovimiento)

    window.addEventListener('keyup', detenerMovimiento)
}

function getObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {

            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }

    detenerMovimiento()

    //limpiar el set inervalo
    clearInterval(intervalo)
    //mostrar la seccion de ataque
    seccionAtaque.style.display = "flex";
    seccionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo);
    //alert("hay colicion" + enemigo.nombre)
}

function reiniciar() {
    location.reload();
}