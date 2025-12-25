const routerShow = require("express").Router()

const showsController = require("../controllers/shows")

// Sync Daya Tv Show
routerShow.get("/sync",showsController.getAllSyncShows)
routerShow.get("/last-sync",showsController.getLastSync)
routerShow.post("/sync",showsController.syncShows)

// Dashboard
routerShow.get('/dashboard',showsController.countDataDasboard) 

// CRUD Data TV Show
routerShow.get("/", showsController.getAllShows)
routerShow.post("/", showsController.createShows)
routerShow.patch("/:id", showsController.updateShows)
routerShow.get("/:id", showsController.detailShow)
routerShow.delete("/:id", showsController.deleteShow)

module.exports = routerShow