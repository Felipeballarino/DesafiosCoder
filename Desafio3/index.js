const express = require('express')
const fs = require('fs')
const app = express();
const PORT = 8080


app.get('/productos', (req, res) => {
    fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
        const data = JSON.parse(contenido)
        res.send({
            menssage: "Array con todos los productos disponibles",
            data: data
        })
    })
})

app.get('/productoRandom', (req, res) => {
    fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
        const data = JSON.parse(contenido)
        let indice = Math.floor(Math.random()* data.length)
        let newPrdouct = data[indice]
        res.send({
            menssage: "Array con un producto al azaar",
            data: newPrdouct
        })
    })

})




app.listen(PORT, () => {
    console.log("Listen port 8080")
})