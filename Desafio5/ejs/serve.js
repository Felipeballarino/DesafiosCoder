const express = require("express")
const app = express()
const multer = require("multer")
const Contenedor = require("../desafio_2")
const file = new Contenedor("productos.txt")



app.set("views", "./views")
app.set('view engine', 'ejs');
app.use("/static", express.static(__dirname + "./views"))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

let storage = multer.diskStorage({         //almacenamiento
    destination: function (req, file, cb) { // Va a setear la carpeta donde se van a guardar mis archivs que vamos a subir por multer
        cb(null, "upload") // recibe un valor nulo y el nombre de la carpeta donde se van a guardar
    },
    filename: function (req, file, cb) { // como va a ir guardandolos
        cb(null, file.originalname) // recibe un valor nulo y el nombre del archivo o el parametro file
    }
})
let upload = multer({ storage })


//
app.get("/", (req, res) => {
    res.render('index')
})

app.get("/productos", async (req, res) => {
    const arr = await file.getAll()
    res.render('productos', {
        data: JSON.parse(arr)
    })
})

app.post('/', upload.single("foto"), async (req, res) => {
    const Contenedor1 = require("../desafio_2")
    const file = new Contenedor1("productos.txt")

    // const arr = await file.getAll()
    const objNew = {
        "title": req.body.nombre,
        "price": req.body.precio,
        "thumbnail": req.file.originalname
    }
    // arr.push(objNew)
    file.save(objNew)
    res.render("landing")
})
app.listen(8080, () => {
    console.log("Listen 8080")
})