const express = require('express')
const router = express.Router()
const Model = require('../models/Client')
const ClientOrder = require('../models/ClientOrder')
const {verifyToken} = require('../helpers/jwt')

router.get('/orders', verifyToken, (req,res,next)=>{
    ClientOrder.find({distributor:req.user._id})
    .then(items=>res.status(200).json(items))
    .catch(e=>next(e))
})

router.get('/', verifyToken, (req,res, next)=>{
    Model.find({active:true})
    .then(items=>res.status(200).json(items))
    .catch(e=>next(e))
})

router.post('/', verifyToken, (req,res, next)=>{
    Model.create(req.body)
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