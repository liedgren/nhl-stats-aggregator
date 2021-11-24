// Import express
const express = require('express')
// Import books-controller
const matchRoutes = require('./../controllers/controller.js')
// Create router
const router = express.Router()

router.post('/getMatches', matchRoutes.getMatches)

module.exports = router