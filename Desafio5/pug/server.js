const express = require ('express')
const app = express()
const multer = require("multer")

const Contenedor1 = require("../desafio_2")
const file = new Contenedor1("productos.txt")

// app.use("/static", express.static(__dirname + "/public"))
// app.use(express.urlencoded({extended:false}))
// app.use(express.json())


app.set("views", "./views")
app.set("view engine", "pug")


let storage = multer.diskStorage({         //almacenamiento
    destination: function (req, file, cb) { // Va a setear la carpeta donde se van a guardar mis archivs que vamos a subir por multer
        cb(null, "upload") // recibe un valor nulo y el nombre de la carpeta donde se van a guardar
    },
    filename: function (req, file, cb) { // como va a ir guardandolos
        cb(null, file.originalname) // recibe un valor nulo y el nombre del archivo o el parametro file
    }
})
let upload = multer({ storage })


app.get("/", (req, res) => {
    res.render("index")
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

app.get('/productos', async (req, res) => {
    const productos = await file.getAll()
    console.log()
    res.render("productos",{data:JSON.parse(productos)})
})

app.listen(8080, ()=>{
    console.log("Listen Port 8080")
})