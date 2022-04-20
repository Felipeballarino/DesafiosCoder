const express = require("express")

const { Router } = express

const router = new Router()


let arr = [
    {
        title: "agua ",
        price: 200,
        thumbnail: "foto",
        id: 0
    },
    {
        title: "papel ",
        price: 150,
        thumbnail: "foto",
        id: 1
    },
]

router.get("/", (req, res) => {
    res.send(arr)
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const resp = arr.filter(e => e.id == id)
    resp.length >= 1 ? res.send(resp) : res.send({ error: "producto no encontrado" })
})

router.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;
    let newProduct = {
        "title": title,
        "price": price,
        "thumbnail": thumbnail,
        "id": arr.length
    }
    if (title && price && thumbnail) {
        arr.push(newProduct)
        res.send({
            mensaje: "Post exitoso",
            data: newProduct
        })
    } else {
        res.send({ msg: 'Faltan datos, vuelve a intentarlo' })
    }
})

router.put("/:id", (req, res) => {
    const { title, price, thumbnail } = req.body
    let id = req.params.id
    let index = arr.findIndex(p => p.id == id)
    let body = req.body
    let updateProduct = { id: id, ...body }
    if (title && price && thumbnail) {
        arr[index] = updateProduct;
        res.send(updateProduct)
    } else {
        res.send({
            Alerta: "No puedes dejar campos vacios",
            mensaje: "Asegurate que halla title, price y thumbnail"
        })
    }
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    arr = arr.filter(p => p.id != id)
    res.send({
        mensaje: "Produto eliminado",
        data: arr
    })
})


module.exports = router