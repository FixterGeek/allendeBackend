const Schema = require('mongoose').Schema

const productSchema = new Schema({
  stock:Number,
  fermentation:String,
  alc_vol: String,
  ibus:String,
  color:String,
  aroma:String,
  sabor: String,
  elab_time: String,
  temp:String,
  pairing: String,
  name: String,
  price: String,
  photoURL: String,
  active:{
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

module.exports = require('mongoose').model('Product', productSchema)