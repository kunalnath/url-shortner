const mongoose = require('mongoose')
// const validator = require('validator')

const Schema = mongoose.Schema

const UrlShortenerSchema = new Schema({
    title : {
        type : String,
        required : true

    },
    originalUrl : {
        type : String,
        required : true

    },
    hashedUrl : {
        type : String

    },
    createdAt : {
        type : Date,
        default: Date.now
        
    },
    clicks : [
        {
            clickDateTime : Date,
            ipAddress : String,
            browser : String,
            platform : String,
            device : String
        }
    ]
})

const UrlShortener = mongoose.model('UrlShortener',UrlShortenerSchema)

module.exports = UrlShortener