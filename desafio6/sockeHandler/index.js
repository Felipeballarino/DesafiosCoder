const express = require("express");
const app = express();
const router = require("./routes/productos");

const Contenedor = require("./utils/funcProds")
const fileProduc = new Contenedor("productos", "ultimo");
const fileChat = new Contenedor("mensajes", "primero");

app.use(express.static(__dirname + "/public"));

const { engine } = require("express-handlebars");
app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    LayoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/components/",
  })
);


const http = require("http");
const port = process.PORT || 8080;
const server = http.createServer(app);



//Socket
const { Server } = require("socket.io");
const io = new Server(server);

//Coneccion Socket
io.on("connection", (socket) => {
  // Funciones del chat
  //Envio de array de mensajes al cliente
  socket.emit("mensage_back", fileChat.getAll());
  //Escuchar mensaje de conexion
  socket.on("message_client", (data) => {});
  //Escuchar chat con el cliente
  socket.on("dataMsn", (data) => {
    // msn.push(data);
    fileChat.save(data);
    io.sockets.emit("mensage_back", fileChat.getAll());
  });
  // Funciones del producto
  //Envio de array de mensajes al cliente
  socket.emit("productlist_back", fileProduc.getAll());
  //Escuchar mensaje de conexion
  socket.on("productlist_client", (data) => {});
  socket.on("addProds", (data) => {
    fileProduc.save(data);
    io.sockets.emit("productlist_back", fileProduc.getAll());
    
    const prodret = fileProduc.getAll();
    const lenghtcero = prodret.length > 0 ? true : false;
    render("index", { listProds: prodret, lenghtcero });
  });
  socket.on("deleteProds", (id) => {
    fileProduc.deleteById(id);
    io.sockets.emit("productlist_back", fileProduc.getAll());
  });
});

app.get("/", (req, res) => {
  // res.render("index", { viewForm: true });
  res.redirect(301, "/productos");
});

app.use("/productos", router);

server.listen(port, () => {
  console.log("Server run on port " + port);
});