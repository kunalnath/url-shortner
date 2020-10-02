const express = require('express')
const configureDB = require('./config/database')
const route = require('./config/routes')
const bodyParser = require('body-parser');
const useragent = require('express-useragent')
const app = express()
const port = 3055

configureDB()

app.use(express.json())

app.use(bodyParser.json())

app.use(useragent.express())

app.use(route)

app.get('/', function(req, res){
    res.send(req.useragent);
})

app.listen(port, () => {
    console.log('server running on port', port)
})