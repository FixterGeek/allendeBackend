const express = require('express')
const router = express.Router()
const Model = require('../models/Distributor')
const Order = require('../models/Order')
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


//Distributor dashboard

router.get('/profile', verifyToken, (req,res,next)=>{
    const {user} = req
    User.findById(user._id)
    .populate('distributor')
    .lean()
    .exec()
        .then(user=>{
            Order.find({distributor:user._id})
            .then(orders=>{
                // if(!orders || orders.length < 1) return res.status(200).json(user)
                const creditUsed = orders.reduce((acc, order)=>acc+order.total,0)
                user.credit_available = user.credit_amount - creditUsed
                user.save()
                return res.status(200).json(user)
            })
            res.status(200).json(user)
        })
        .catch(e=>next(e))
})

router.post('/profile', verifyToken, (req,res,next)=>{
    const {user} = req
    delete req.body.credit_amount
    delete req.body.credit_days
    delete req.body.discount
    delete req.body.business_name
    delete req.body.rfc

    Model.findByIdAndUpdate(user.distributor, req.body, {new:true})
        .then(profile=>{
            res.status(200).json(profile)
        })
        .catch(e=>next(e))
})

//Distributor dashboard

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
    const nuevo = {
        username: item.business_name,
        email: item.email,
        distributor: item._id
    }
    console.log("fuck: ", nuevo)
    let h4$hP4$$ = bcrypt.hashSync(email, bcrypt.genSaltSync(7))
    User.register(nuevo, h4$hP4$$)
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