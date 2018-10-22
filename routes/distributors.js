const express = require('express')
const router = express.Router()
const Model = require('../models/Distributor')
const User = require('../models/User')
const {verifyToken} = require('../helpers/jwt')
const bcrypt                         = require('bcrypt')
const mailer                         = require('../helpers/mailer')
const QRCode                         = require('qrcode')

router.get('/', (req,res, next)=>{
    Model.find()
    .then(items=>res.status(200).json(items))
    .catch(e=>next(e))
})

router.post('/', (req,res, next)=>{
    Model.create(req.body)
    .then(item=>{
        //creamos usuario
        createUser(item)
        res.status(201).json(item)
    })
    .catch(e=>next(e))
})

router.get('/:id', (req,res, next)=>{
    Model.findById(req.params.id)
    .then(item=>res.status(200).json(item))
    .catch(e=>next(e))
})

router.put('/:id', (req,res, next)=>{
    Model.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(item=>res.status(200).json(item))
    .catch(e=>next(e))
})

router.delete('/:id', (req,res, next)=>{
    Model.findByIdAndRemove(req.params.id)
    .then(item=>res.status(200).json(item))
    .catch(e=>next(e))
})

function createUser(item){
    const {email} = item
    item.username = item.business_name
    delete item._id
    let h4$hP4$$ = bcrypt.hashSync(email, bcrypt.genSaltSync(7))
    User.register(item, h4$hP4$$)
    //User.register(req.body, req.body.password)
    .then(user => {
        console.log("nuevo user: ", user)
      link = `https://backendallende.herokuapp.com//profile/${user._id}`
      //link = `http://localhost:3001/profile/${_id}`
      //link = `https://${req.headers.host}/profile/${_id}`
      QRCode.toDataURL(link, (err, QR) => {
        if (err) throw err
        User.findByIdAndUpdate(user._id, { QR }, { new: true })
        .then(u => {
          mailer.welcomeMail(u.username, u.email, h4$hP4$$)
        })
      })
    })
    .catch(err => console.log("el erro: ", err))
}




module.exports = router