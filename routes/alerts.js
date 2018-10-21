const express = require('express')
const router = express.Router()
const Alert = require('../models/Alert')
const {verifyToken} = require('../helpers/jwt')

router.get('/', (req,res, next)=>{
    Alert.find({active:true})
    .then(alerts=>res.status(200).json(alerts))
    .catch(e=>next(e))
})

router.post('/', (req,res, next)=>{
    Alert.create(req.body)
    .then(alert=>res.status(200).json(alert))
    .catch(e=>next(e))
})

router.get('/:id', verifyToken, (req,res, next)=>{
    Alert.findById(req.params.id)
    .then(alert=>res.status(200).json(alert))
    .catch(e=>next(e))
})

router.put('/:id', verifyToken, (req,res, next)=>{
    Alert.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(alert=>res.status(200).json(alert))
    .catch(e=>next(e))
})

router.delete('/:id', verifyToken, (req,res, next)=>{
    Alert.findByIdAndRemove(req.params.id)
    .then(alert=>res.status(200).json(alert))
    .catch(e=>next(e))
})




module.exports = router