let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

//esconder la seccion de ataque

let seccionAtaque = document.getElementById("seleccionar-ataque");
seccionAtaque.style.display = "none";

let btnReinicarHidden = document.getElementById('btn-reiniciar')
btnReinicarHidden.style.display = 'none'

// aqui se dispara la funcion cuando le picamod al boton "seleccionar"

let botonMascotaJugador = document.getElementById("btn-mascota");
botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

let btnFuego = document.getElementById("btn-fuego");
btnFuego.addEventListener("click", ataqueFuego);

let btnAgua = document.getElementById("btn-agua");
btnAgua.addEventListener("click", ataqueAgua);

let btnTierra = document.getElementById("btn-tierra");
btnTierra.addEventListener("click", ataqueTierra);

let btnReiniciar = document.getElementById("btn-reiniciar");
btnReiniciar.addEventListener("click", reiniciar);

function seleccionarMascotaJugador() {
  // deshabilitar la seccion de "seleccionar mascota"
  let seccionSeleccionarMascota = document.getElementById("seleccionar-mascota");
  seccionSeleccionarMascota.style.display = "none";
  //habilitar el display de la seccion selecciona ataque
  seccionAtaque.style.display = "block";

  // sacamos la referencia id desde el html "hipodoge" para añadir ese nombre en la seccion de ataque
  // una forma de hacer
  let inputHipodoge = document.getElementById("hipodoge");
  let inputCapipepo = document.getElementById("capipepo");

  let spanNmascotaJugador = document.getElementById("nMascota-jugador");

  if (inputHipodoge.checked) {
    spanNmascotaJugador.innerHTML = "Hipodoge";
  } else if (inputCapipepo.checked) {
    //otra forma de sacar el id "del span" y añadirla en el html con el nombre de la mascota seleccioanda
    spanNmascotaJugador.innerHTML = "Capipepo";
  } else if (document.getElementById("ratigueya").checked) {
    document.getElementById("nMascota-jugador").innerHTML = "Ratigueya";
  } else {
    alert("Elige una mascota");
  }

  // Selecciona mascota del ataque alaeatorio
  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  // Selecciona mascota del ataque alaeatorio
  let mascotaAleatorio = numneroAleatorio(1, 3);
  let spanNmascotaEnemigo = document.getElementById("nMascota-enemigo");

  if (mascotaAleatorio == 1) {
    spanNmascotaEnemigo.innerHTML = "Hipodoge";
  } else if (mascotaAleatorio == 2) {
    spanNmascotaEnemigo.innerHTML = "capipepo";
  } else if (mascotaAleatorio == 3) {
    spanNmascotaEnemigo.innerHTML = "Ratigueya";
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
  let spanVidasJugador = document.getElementById("vida-jugador");
  let spanVidasEnemigo = document.getElementById("vida-enemigo");
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
  let seccionMensajes = document.getElementById("mensajes");

  let parrafo = document.createElement("p");
  parrafo.innerHTML =
    "Tu mascota atacó con " +
    ataqueJugador +
    ", la mascota del enemigo atacó con " +
    ataqueEnemigo +
    " - " +
    resultado;

  seccionMensajes.appendChild(parrafo);
}
function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("Felicitaciones Ganaste :)");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("Perdiste :(");
  }
  btnReinicarHidden.style.display = 'block'
}

function crearMensajeFinal(mesanjeFinal) {
  let seccionMensajes = document.getElementById("mensajes");

  let parrafo = document.createElement("p");
  parrafo.innerHTML = mesanjeFinal;

  seccionMensajes.appendChild(parrafo);

  btnFuego.disabled = true;

  btnAgua.disabled = true;

  btnTierra.disabled = true;
}

function reiniciar() {
  location.reload();
}
