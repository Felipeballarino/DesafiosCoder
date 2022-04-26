
const fs = require("fs")

class Contenedor {

    constructor(fileName) {
        this.fileName = fileName
        this.stock = []

    }


    save(objeto) {
        //agrego el objeto al array
        this.stock.push(objeto)
        //Intento  LEER el archivo 
        fs.readFile(`../${this.fileName}`, "utf-8", (error, contenido) => {
            //si no lo encuentra lo CREA
            if (error) {
                fs.writeFile(`../${this.fileName}`, JSON.stringify(this.stock, null, ' '), (error) => {
                    if (error) {
                        console.log("HUBO UN ERROR", error)
                    } else {
                        console.log("ARCHIVO CREADO CORRECTAMENTE")
                    }
                })

                //si lo encuentra lo EDITA
            } else {
                const dataFile = JSON.parse(contenido)
                //agrega el nuevo objeto al archivo
                this.stock.unshift(...dataFile)
                this.stock.forEach((element, i) => {
                    element.id = i
                });

                fs.writeFile(`../${this.fileName}`, JSON.stringify(this.stock, null, ' '), (error) => {
                    if (error) {
                        console.log("HUBO UN ERROR EN LA EDICION", error)
                    } else {
                        console.log("ARCHIVO EDITADO CORRECTAMENTE")
                    }
                })
            }
        })


    }

    getById(id) {

        fs.readFile(`../${this.fileName}`, "utf-8", (error, contenido) => {
            if (error) {
                console.log("error")
            } else {
                const dataFile = JSON.parse(contenido)
                const respuesta = dataFile.filter(e => e.id == id)
                if (respuesta) {
                    return respuesta
                } else {
                    console.log("No existe procucto con ese id")
                }
            }
        })

    }

    getAll() {
        try {
           return fs.readFileSync(`../${this.fileName}`, "utf-8")
        } catch (error) {
            return error
        }
    }

    deleteById(id) {
        fs.readFile(`../${this.fileName}`, "utf-8", (error, contenido) => {
            if (error) {
                console.log("error")
            } else {
                const dataFile = JSON.parse(contenido)
                const respuesta = dataFile.filter(e => e.id != id)
                fs.writeFile(`../${this.fileName}`, JSON.stringify(respuesta, null, ' '), error => {
                    if (error) {
                        console.log("No se pudo eliminar el producto")
                    } else {
                        console.log("Producto eliminado")
                    }
                })

            }
        })
    }


    deleteAll() {
        fs.readFile(`../${this.fileName}`, "utf-8", (error, contenido) => {
            if (error) {
                console.log("error")
            } else {

                fs.writeFile(`../${this.fileName}`, JSON.stringify([]), error => {
                    if (error) {
                        console.log("No se pudo eliminar el producto")
                    } else {
                        console.log("Productos eliminados")
                    }
                })

            }
        })

    }


}

module.exports = Contenedor;
// const producto = new Contenedor("productos.txt")


// producto.save({ "title": "Calculadora", "price": 123.56, "thumbnail": "https://es.wikipedia.org/wiki/Imagen#/media/Archivo:Image_created_with_a_mobile_phone.png", "id": 2 }, { "title": "Globo", "price": 343.45, "thumbnail": "https://es.wikipedia.org/wiki/Imagen#/media/Archivo:Image_created_with_a_mobile_phone.png", "id": 3 })

// producto.getById(4) // true
// producto.getById(10) //false

// producto.getAll()


// producto.deleteById(2)

// producto.deleteAll()