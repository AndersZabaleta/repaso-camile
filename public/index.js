fetch("/personas")
  .then(function (respuesta) {
    return respuesta.json();
  })
  .then(function (datos) {
    let mensaje = "";
    for (let i = 0; i < datos.length; i++) {
      mensaje += `
          <h1>${datos[i].nombre}</h1>
          <p>Edad: ${datos[i].edad}
          `;
    }

    document.getElementById("div1").innerHTML = mensaje;
  });

function buscarPersona() {
  let nombre = document.getElementById("nombre").value;
  fetch(`/personas/${nombre}`)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      if (datos.error) {
        window.alert(datos.mensaje);
      } else {
        document.getElementById("div1").innerHTML = `
          <h1>${datos.nombre}</h1>
          <p>Edad: ${datos.edad}</p>
          `;
      }
    });
}

function anyadir() {
  let nombre = document.getElementById("nombre").value;
  let edad = document.getElementById("edad").value;

  let persona = {
    nombre: nombre,
    edad: edad,
  };

  fetch("/anyadirPersona", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(persona),
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      console.log(datos);
    });
}

function editar() {
  let identificador = document.getElementById("identificador").value;
  let nombre = document.getElementById("nombreNuevo").value;
  let edad = document.getElementById("edadNueva").value;

  let persona = {
    identificador: identificador,
    nombre: nombre,
    edad: edad,
  };

  fetch("/personas", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(persona),
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      console.log(datos);
    });
}

function borrar() {
  let nombre = document.getElementById("nombre").value;

  let borrar = {
    nombre: nombre,
  };
  fetch("/personas", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(borrar),
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      console.log(datos);
    });
}
