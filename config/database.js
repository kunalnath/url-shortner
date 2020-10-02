const mongoose = require('mongoose')

const configureDB = () =>{
    //database conf
    mongoose.connect('mongodb://localhost:27017/url-shortener-june',{ useNewUrlParser: true ,  useUnifiedTopology: true })
    .then(()=>{
        console.log('connected to db')

    })
    .catch((err)=>{
        console.log(err)

    })
}

module.exports = configureDB