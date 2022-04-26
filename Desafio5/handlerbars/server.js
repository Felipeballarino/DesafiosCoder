
const express = require("express")
const app = express()
const multer = require("multer")
const { engine } = require("express-handlebars")
const Contenedor1 = require("../desafio_2")
    const file = new Contenedor1("productos.txt")

app.set("view engine", "hbs") // motor de plantillas
app.set("views", "./views") // donde se van a guardar
// app.use(express.static("public"))

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





//seteamos handlerbar con express
app.engine("hbs", engine({     //recibe la extencion de el archivo y el handlerbar
    extname: "hbs", // nombre de la extencion
    layoutDir: __dirname + "/views/layouts  ", // arhivo handlerbar que envuenve todo el html
    defaultLayout: "main.hbs",
    partialsDir: __dirname + "/views/partials" //avisa la creacion de componentes
}))


app.get("/", (req, res) => {
    res.render("index")

    //res.sendFille busca la carpeta publica
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

app.listen(8080, () => {
    console.log("listen port 8080")
})