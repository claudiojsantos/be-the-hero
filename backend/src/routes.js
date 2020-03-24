const express = require('express')
const ongController = require('./controllers/ongController')
const incidentController = require('./controllers/incidentController')
const profileController = require('./controllers/profileController')
const sessionController = require('./controllers/sessionController')
const routes = express.Router()

routes.get('/sessions', sessionController.create)

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create)

routes.post('/incident', incidentController.create)
routes.get('/incidents', incidentController.index)
routes.delete('/incident/:id', incidentController.delete)

routes.get('/profile', profileController.index)

module.exports = routes