const express = require('express')
const fs = require('fs')
const app = express();
const PORT = 8080

const Contenedor = require("./desafio_2.js")
const file = new Contenedor("productos.txt")


app.get('/productos', async (req, res) => {
    const product = file.getAll()
    // console.log(producto)
    res.send({
        menssage: "Array con todos los productos disponibles",
        data: JSON.parse(product)
    })
})

app.get('/productoRandom', (req, res) => {
    const procucto = file.getAll()
    const data = JSON.parse(procucto)
    let indice = Math.floor(Math.random() * data.length)
    let newPrdouct = data[indice]
    res.send({
        menssage: "Array con un producto al azaar",
        data: newPrdouct
    })
})




app.listen(PORT, () => {
    console.log("Listen port 8080")
})