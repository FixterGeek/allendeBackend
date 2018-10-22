const express = require('express')
const router = express.Router()
const Model = require('../models/Promo')
const {verifyToken} = require('../helpers/jwt')

router.get('/', (req,res, next)=>{
    Model.find()
    .then(items=>res.status(200).json(items))
    .catch(e=>next(e))
})

router.post('/', (req,res, next)=>{
    Model.create(req.body)
    .then(item=>res.status(200).json(item))
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




module.exports = router