const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "",
        database: "productoscoder"
    },
    pool: { min: 2, max: 8 }
});

knex.schema.createTableIfNotExists("productos", (table) => {
    table.increments('id').primary()
    table.string("title")
    table.string('price')
    table.string("imageurl")
    table.string("feccarga")
})
    .then(() => {
        console.log("Conexion y tabla creada")
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = knex