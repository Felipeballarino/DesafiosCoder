const express = require('express')
const app = express()
const productos = require('./Routes/productos')

app.use("/static" , express.static(__dirname + "/public"))
app.use(express.json())
app.use(express.urlencoded({
    encode:false
}))
app.use('/api/productos',productos)


app.listen(8080, ()=>{
    console.log("Listen PORT 8080")
})