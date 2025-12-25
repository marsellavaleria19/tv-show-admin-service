const routerAll = require("express").Router()

routerAll.use("/shows",require("./shows"))
routerAll.use("/category", require("./category"))

module.exports = routerAll