let mokepones = [];
//clase mokepon
class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let ratigueya = new Mokepon("ratigueya", ".images/img1.png", 3);

ratigueya.ataques.push(
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "💧", id: "btn-agua " }
);

mokepones.push(ratigueya);

const seccionAtaque = document.getElementById("seleccionar-ataque");
const btnReinicarHidden = document.getElementById("btn-reiniciar");
const botonMascotaJugador = document.getElementById("btn-mascota");
const btnFuego = document.getElementById("btn-fuego");
const btnAgua = document.getElementById("btn-agua");
const btnTierra = document.getElementById("btn-tierra");
const btnReiniciar = document.getElementById("btn-reiniciar");

//Seleccionar mascota jugador
const seccionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);
const spanNmascotaJugador = document.getElementById("nMascota-jugador");
const inputHipodoge = document.getElementById("hipodoge");
const inputCapipepo = document.getElementById("capipepo");
const inputRatigueya = document.getElementById("ratigueya");

//seleccionar mascota enemigo
const spanNmascotaEnemigo = document.getElementById("nMascota-enemigo");

//combate
const spanVidasJugador = document.getElementById("vida-jugador");
const spanVidasEnemigo = document.getElementById("vida-enemigo");

//crear mensaje
const seccionMensajes = document.getElementById("result"); // <- es el id del resultado
const ADelJugador = document.getElementById("ataque-del-jugador");
const ADelEnemigo = document.getElementById("ataque-del-enemigo");

//crear mensaje final
//let seccionMensajes = document.getElementById("result"); <- se llama en la funcion de mensaje final

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

//contenedor de mokepones
const contenedorMokepones = document.getElementById("contenedor-tarjetas");

//opciones de mokepones
let opcionesDeMokepones;

/*let hipodoge = new Mokepon("hipodoge", "images/img2.png", 5);

hipodoge.ataques.push(
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-tierra " }
);
let capipepo = new Mokepon("capipepo", "images/img3.png", 3);

capipepo.ataques.push(
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💧", id: "btn-agua " }
);*/

console.log(mokepones);

//esconder la seccion de ataque

mokepones.forEach((mokepon) => {
  opcionesDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
  <label class="tarjeta-mokepon" for="capipepo">
    <p>Capipepo</p>
    <img src="images/img2.png" alt="capipepo" />
  </label>  `;
  contenedorMokepones.innerHTML = opcionesDeMokepones;
});

seccionAtaque.style.display = "none";

btnReinicarHidden.style.display = "none";
// aqui se dispara la funcion cuando le picamod al boton "seleccionar"
botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

btnFuego.addEventListener("click", ataqueFuego);

btnAgua.addEventListener("click", ataqueAgua);

btnTierra.addEventListener("click", ataqueTierra);

btnReiniciar.addEventListener("click", reiniciar);

function seleccionarMascotaJugador() {
  // deshabilitar la seccion de "seleccionar mascota"

  seccionSeleccionarMascota.style.display = "none";

  //habilitar el display de la seccion selecciona ataque
  seccionAtaque.style.display = "flex";

  // sacamos la referencia id desde el html "hipodoge" para añadir ese nombre en la seccion de ataque
  // una forma de hacer

  if (inputHipodoge.checked) {
    spanNmascotaJugador.innerHTML = "hipodoge";
  } else if (inputCapipepo.checked) {
    //otra forma de sacar el id "del span" y añadirla en el html con el nombre de la mascota seleccioanda
    spanNmascotaJugador.innerHTML = "capipepo";
  } else if (inputRatigueya.checked) {
    spanNmascotaJugador.innerHTML = "ratigueya";
  } else {
    alert("Elige una mascota");
  }

  // Selecciona mascota del ataque alaeatorio
  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  // Selecciona mascota del ataque alaeatorio
  let mascotaAleatorio = numneroAleatorio(1, 3);

  if (mascotaAleatorio == 1) {
    spanNmascotaEnemigo.innerHTML = "hipodoge";
  } else if (mascotaAleatorio == 2) {
    spanNmascotaEnemigo.innerHTML = "capipepo";
  } else if (mascotaAleatorio == 3) {
    spanNmascotaEnemigo.innerHTML = "ratigueya";
  }
}

function numneroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// funcion aque agua
function ataqueFuego() {
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
}

function ataqueAleatorioEnemigo() {
  ataqueAleatorio = numneroAleatorio(1, 3);
  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA";
  } else if (ataqueAleatorio == 3) {
    ataqueEnemigo = "TIERRA";
  }

  combate();
}

function combate() {
  if (ataqueJugador == ataqueEnemigo) {
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
  }
  revisarVidas();
}

function crearMensaje(resultado) {
  //añadir mensajes desde el js

  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  seccionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ADelJugador.appendChild(nuevoAtaqueDelJugador);
  ADelEnemigo.appendChild(nuevoAtaqueDelEnemigo);

  //let parrafo = document.createElement("p");
  /*parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + 
  ", la mascota del enemigo atacó con " +
    ataqueEnemigo +
    " - " +
    resultado;*/
}
function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("Felicitaciones Ganaste");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("Perdiste :(");
  }
}

function crearMensajeFinal(mesanjeFinal) {
  seccionMensajes.innerHTML = mesanjeFinal;

  //seccionMensajes.appendChild(parrafo); <- cuando se añade un parrafo, no se hace un appendChild

  btnFuego.disabled = true;

  btnAgua.disabled = true;

  btnTierra.disabled = true;

  btnReinicarHidden.style.display = "block";
}

function reiniciar() {
  location.reload();
}
