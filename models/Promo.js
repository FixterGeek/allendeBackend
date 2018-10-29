const Schema = require('mongoose').Schema

const promoSchema = new Schema({
  stock:Number,
  name: String,
  price: Number,
  descript: String,
  isPromo:{
    type:Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = require('mongoose').model('Promo', promoSchema)