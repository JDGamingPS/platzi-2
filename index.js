const express = require("express");

// hace una copia del servidor "referencia"
const app = express();
const jugadores = [];

class Jugador{
    constructor(id){
        this.id = id
    }
}


// require = req = peticion, respuesta = res
app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id) // <- el servidor responde "Hola"
})

app.listen(8080, () => {
  console.log("servidor funcionando");
});
