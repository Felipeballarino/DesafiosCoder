const fs = require("fs");
const knex = require("../db")

class Contenedor {
  constructor(nombre, posicion) {
    this.pathname = nombre;
    this.posicion = posicion;
    // recupera los datos del txt y lo convierte en un array de objetos
    knex.from(this.pathname).select("*")
      .then((resp) => { this.json = resp })
      .catch((err) => {
        console.log(err)
      })
    // try {
    //   this.json = JSON.parse(fs.readFileSync(this.pathname, "utf-8"));
    // } catch (error) {
    //   this.json = null;
    // }
  }

  // escribirArchivo(dato) {
  //   dato = dato ? JSON.stringify(dato) : "";
  //   try {
  //     fs.writeFileSync(this.pathname, `${dato}`);
  //   } catch (error) {
  //     return `Error al escribir el archivo: ${error}`;
  //   }
  // }

  save(obj) {
    if (this.json) {
      obj.feccarga = new Date().toISOString()
      knex(this.pathname).insert(obj)
        .then(() => {
          console.log("Tabla Modificada")
        }).catch((err) => {
          console.log(err)
        })
    }



  }
  getById(id) {
    if (this.json) {
      knex(this.pathname).select("*").where({ id: id })
        .then((resp) => { resp })
        .catch((err) => {
          console.log(err)
        })
    }
    return null;
  }

  getAll() {
    knex.from(this.pathname).select("*")
    .then((resp) =>{this.json= resp} )
    .catch((err) => {
      console.log(err)
    })
    return this.json
  }

  deleteById(id) {
    if (this.json) {
      knex(this.pathname).where({ id: id }).del()
        .then(() => { mensaje: "prodcuto borrado" })
        .catch((err) => {
          console.log(err)
        })
    }
    return "No hay datos en el archivo";
  }

  deleteAll() {
    knex.from(this.pathname).select("*").del()
      .then(() => { mensaje: "prodcutos borrado" })
      .catch((err) => {
        console.log(err)
      })
  }

}
module.exports = Contenedor;

//const obj_Data = {
//  nombre: "Alumno",
//  apellido: "Alumno sur",
//  libros: [
//    { nombre: "Harry Poter", autor: "J.K. Rowling" },
//    { nombre: "El Señor de los Anillos", autor: "J.R.R. Tolkien" },
//    { nombre: "El Alquimista", autor: "Paulo Coelho" },
//  ],
//  mascotas: ["perro", "gato", "gato"],
//};
//const contenedor = new Contenedor("Entregable2");