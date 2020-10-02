
const express = require('express')
const router = express.Router()
const UrlShortenerController = require('../app/controllers/UrlShortenerController')

router.get('/api/urls',UrlShortenerController.list)
router.get('/api/urls/:id',UrlShortenerController.show)
router.post('/api/urls',UrlShortenerController.create)
router.put('/api/urls/:id',UrlShortenerController.update)
router.get('/api/:code',UrlShortenerController.redirect)

module.exports = router