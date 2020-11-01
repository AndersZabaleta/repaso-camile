const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let personas = [
  {
    nombre: "Ander",
    edad: 30,
  },
  {
    nombre: "Camile",
    edad: 22,
  },
];
app.get("/personas", function (req, res) {
  res.send(personas);
});

app.get("/personas/:nombre", function (req, res) {
  let nombre = req.params.nombre;
  let isThisPersona = false;
  for (let i = 0; i < personas.length; i++) {
    if (nombre === personas[i].nombre) {
      res.send(personas[i]);
      isThisPersona = true;
    }
  }
  if (isThisPersona === false) {
    res.send({ error: true, mensaje: "Esa persona no existe" });
  }
});

app.post("/anyadirPersona", function (req, res) {
  let name = req.body.nombre;
  let age = parseInt(req.body.edad);

  let persona = {
    nombre: name,
    edad: age,
  };
  personas.push(persona);

  res.send(personas);
});

app.put("/personas", function (req, res) {
  let nombre = req.body.nombre;
  let edad = req.body.edad;
  let identificador = req.body.identificador;
  let isEdited = false;

  for (let i = 0; i < personas.length; i++) {
    if (identificador === personas[i].nombre) {
      personas[i].nombre = nombre;
      personas[i].edad = edad;
      isEdited = true;
    }
  }

  isEdited ? res.send(personas) : res.send("error");
});

app.delete("/personas", function (req, res) {
  let nombre = req.body.nombre;
  let isDeleted = false;
  for (let i = 0; i < personas.length; i++) {
    if (personas[i].nombre === nombre) {
      personas.splice(i, 1);
      isDeleted = true;
    }
  }

  isDeleted ? res.send(personas) : res.send({ mensaje: "error" });
});

app.listen(3000);
