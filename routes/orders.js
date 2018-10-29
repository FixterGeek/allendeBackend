const express = require('express')
const router = express.Router()
const Model = require('../models/Order')
const Distributor = require('../models/Distributor')
const {verifyToken} = require('../helpers/jwt')

router.get('/', verifyToken, (req,res, next)=>{
    Model.find({active:true})
    .then(items=>res.status(200).json(items))
    .catch(e=>next(e))
})

router.post('/', verifyToken, (req,res, next)=>{
    const {order} = req.body
    //distribuidor
    Distributor.findById(req.user.distributor)
    .then(dist=>{
        order.discount = dist.discount
        order.subtotal = order.products.reduce((acc, p)=>{
            return acc + p.total
        },0)
        order.total = order.subtotal - (order.subtotal*(order.discount / 100))
        order.distributor = req.user.distributor
        return Model.create(order)
    })
    .then(item=>res.status(200).json(item))
    .catch(e=>next(e))
})

router.get('/:id', verifyToken, (req,res, next)=>{
    Model.findById(req.params.id)
    .then(item=>res.status(200).json(item))
    .catch(e=>next(e))
})

router.put('/:id', verifyToken, (req,res, next)=>{
    Model.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(item=>res.status(200).json(item))
    .catch(e=>next(e))
})

router.delete('/:id', verifyToken, (req,res, next)=>{
    Model.findByIdAndRemove(req.params.id)
    .then(item=>res.status(200).json(item))
    .catch(e=>next(e))
})




module.exports = router