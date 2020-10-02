const UrlShortener = require('../models/UrlShortener')
const sh = require('shorthash')

const UrlShortenerController = {}

UrlShortenerController.list = (req,res) => {
    UrlShortener.find()
    .then((urls)=>{
        res.json(urls)
    })
    .catch((err)=>{
        res.json(err)
    })
}

UrlShortenerController.create = (req,res) => {
    const body = req.body

    const ipAddress = req.ip
    const browser = req.useragent.browser
    const platform = req.useragent.platform
    const device = req.useragent.isDesktop ? 'desktop' : 'mobile'
    
    const shUrl = sh.unique(body.originalUrl)
    const bodyRes ={
        title : body.title,
        originalUrl : body.originalUrl,
        hashedUrl : shUrl,
        createdAt : body.createdAt,
        clicks : [
            {
                clickDateTime : new Date(),
                ipAddress : ipAddress,
                browser : browser,
                platform : platform,
                device : device
            }
        ]
    }
    const urlShortener = new UrlShortener(bodyRes)
    urlShortener.save()
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err)
    })
}

UrlShortenerController.show = (req,res) => {
    const id = req.params.id
    UrlShortener.findById(id)
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err)
    })
}

UrlShortenerController.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    const shUrl = sh.unique(body.originalUrl)
    const bodyRes ={
        title : body.title,
        originalUrl : body.originalUrl,
        hashedUrl : shUrl,
        createdAt : body.createdAt
    }
    UrlShortener.findByIdAndUpdate(id,bodyRes,{new:true})
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err)
    })
}

UrlShortenerController.redirect = (req,res) => {
    
    const hashedUrl = req.params.code
    const clickDateTime= new Date()
    const ipAddress = req.ip
    const browser = req.useragent.browser
    const platform = req.useragent.platform
    const device = req.useragent.isDesktop ? 'desktop' : 'mobile'
    const clicks = [{ clickDateTime , ipAddress , browser , platform , device }]

    // console.log(ipAddress,browser,platform,device)

    UrlShortener.findOne({hashedUrl})
    .then((response)=>{
        if(response){
            UrlShortener.findByIdAndUpdate(
                {_id : response._id},
                {
                    $push:{
                        clicks
                    }
                }
            )
            .then((response)=>{
                // console.log(response)
                res.redirect(response.originalUrl)
            })
            .catch((err)=>{
                res.json(err)
            })
        }
        else{
            res.status(404).json('Invalid url')
        }
    })

    .catch((err)=>{
        res.json(err)
    })
}

module.exports = UrlShortenerController